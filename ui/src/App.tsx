"use client";

import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { transitions as t } from "./lib/utils";
import { useState, createContext, useContext, useEffect } from "react";
import Navbar from "./components/navbar";
import CreatePage from "./pages/create";
import Test from "./pages/test";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import FilesPage from "./pages/files";
import axios from "axios";
import Spinner from "@/components/ui/spinner";
import LoginPage, { type LoginFormValues } from "./pages/login";
import RegisterPage, { type RegisterFormValues } from "./pages/register";
import testUser from "@/lib/testUser";
import {
  createFormInitialValues,
  type CreateFormValues,
} from "./lib/createTypes";
import {
  login_schema,
  register_schema,
  delinquency_notice_schema,
  statement_schema,
  receipt_schema,
} from "@/lib/validations";

export type Category = "delinquency_notice" | "statement" | "receipt";

const authHost = process.env.REACT_APP_AUTH_HOST;
const api = process.env.REACT_APP_API_ROOT;

export interface UserFile {
  id: string;
  userId?: string;
  category: Category;
  key: string;
  timestamp: string;
  formValues: string;
}

export interface User {
  id?: number;
  username: string;
  files: UserFile[];
  avatar?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  authWorking: boolean;
  setAuthWorking: (option: boolean) => void;
  loginFormValues: LoginFormValues;
  setLoginFormValues: (vals: LoginFormValues) => void;
  registerFormValues: RegisterFormValues;
  setRegisterFormValues: (vals: RegisterFormValues) => void;
  fileSelected: UserFile | null;
  setFileSelected: (file: UserFile) => void;
  categorySelected: Category;
  setCategorySelected: (cat: Category) => void;
  createFormValues: CreateFormValues;
  setCreateFormValues: (vals: CreateFormValues) => void;
  submitCreateForm: (e?: React.FormEvent) => void;
  categoriesWorking: Category[];
  setCategoriesWorking: (categories: Category[]) => void;
  filesDeleting: string[];
  deleteFile: () => void;
}

const blankLoginValues: LoginFormValues = {
  username: "",
  password: "",
};

const blankRegisterValues: RegisterFormValues = {
  username: "",
  password: "",
  password2: "",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [user, setUser] = useState<User | null>(null);
  const [fileSelected, setFileSelected] = useState<UserFile | null>(null);
  const [categoriesWorking, setCategoriesWorking] = useState<Category[]>([]);
  const [filesDeleting, setFilesDeleting] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(testUser);
  const [categorySelected, setCategorySelected] =
    useState<Category>("delinquency_notice");
  const [authWorking, setAuthWorking] = useState<boolean>(false);
  const [callbackUrl, setCallbackUrl] = useState<string>("/");
  const [loginFormValues, setLoginFormValues] =
    useState<LoginFormValues>(blankLoginValues);
  const [registerFormValues, setRegisterFormValues] =
    useState<RegisterFormValues>(blankRegisterValues);
  const [createFormValues, setCreateFormValues] = useState<CreateFormValues>(
    createFormInitialValues
  );
  const [initialized, setInitialized] = useState<boolean>(false);

  const authInit = () => {
    axios
      .get(authHost + "/init")
      .then((res) => {
        console.log(res.data);
        if (!res?.data?.user) {
          console.log("response", res);
          throw "Unexpected response";
        }

        setUser(res.data.user as User);
      })
      .catch((err) => {
        console.log("authInit error", err);
        toast.error(
          "An error occurred during auth initialization. Check the console for more details.",
          {
            position: "bottom-right",
            duration: 2000,
          }
        );
      })
      .finally(() => setInitialized(true));
  };

  useEffect(() => {
    authInit();
  }, []);

  useEffect(() => {
    if (!user?.username) {
      if (!["/login", "/register"].includes(location.pathname))
        setCallbackUrl(location.pathname);
      navigate("/login");
    } else if (!user.files.length) navigate("/");
    else navigate(callbackUrl);
    setLoginFormValues(blankLoginValues);
    setRegisterFormValues(blankRegisterValues);
  }, [user?.username]);

  const handleAuthSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!["/login", "/register"].includes(location.pathname)) return;
    setAuthWorking(true);

    try {
      const isLogin = location.pathname === "/login";
      const formValues = isLogin ? loginFormValues : registerFormValues;

      const validator = isLogin ? login_schema : register_schema;
      const authEndpoint = isLogin ? "/login" : "/register";
      validator.validateSync(formValues, {
        abortEarly: false,
      });
      const res = await axios.post(authHost + authEndpoint, formValues);

      if (!res?.data?.user) {
        console.log(res);
        throw "Unexpected response";
      }

      setUser(res.data.user as User);
    } catch (err: any) {
      console.log(err, "auth error");
      toast.error(
        err?.inner
          ? err.inner[0].message
          : "An error occurred. Check the console for more details.",
        {
          position: "top-center",
          duration: 2000,
        }
      );
    } finally {
      setAuthWorking(false);
    }
  };

  const submitCreateForm = async (e?: React.FormEvent) => {
    try {
      if (!user) return;
      if (e) e?.preventDefault();
      console.log(createFormValues);
      const category = categorySelected;
      setCategoriesWorking([...categoriesWorking, category]);
      let response: any;
      let newFile: UserFile;
      switch (category) {
        case "delinquency_notice":
          delinquency_notice_schema.validateSync(
            createFormValues.delinquencyNoticeFormValues,
            {
              abortEarly: false,
            }
          );
          response = await axios.post(api + "/files", {
            category: "delinquency_notice",
            values: createFormValues.delinquencyNoticeFormValues,
          });
          newFile = response.data.file;
          setCreateFormValues({
            ...createFormInitialValues,
            delinquencyNoticeFormValues:
              createFormInitialValues.delinquencyNoticeFormValues,
          });
          break;
        case "statement":
          statement_schema.validateSync(createFormValues.statementFormValues, {
            abortEarly: false,
          });
          response = await axios.post(api + "/files", {
            category: "statement",
            values: createFormValues.statementFormValues,
          });
          newFile = response.data.file;
          setCreateFormValues({
            ...createFormInitialValues,
            statementFormValues: createFormInitialValues.statementFormValues,
          });
          break;
        case "receipt":
          receipt_schema.validateSync(createFormValues.receiptFormValues, {
            abortEarly: false,
          });
          response = await axios.post(api + "/files", {
            category: "receipt",
            values: createFormValues.receiptFormValues,
          });
          newFile = response.data.file;
          setCreateFormValues({
            ...createFormInitialValues,
            receiptFormValues: createFormInitialValues.receiptFormValues,
          });
          break;
        default:
          throw `OOB category ${category}`;
      }
      if (!newFile) {
        console.log(newFile, response);
        throw "Server did not return a file";
      }

      setUser({
        ...user,
        files: [newFile, ...user.files],
      });
      setFileSelected(newFile);
      navigate("/files");
    } catch (err: any) {
      toast.error(
        err?.inner
          ? err.inner[0].message
          : "An unknown error occurred. Check the console for more details.",
        {
          position: "top-center",
          duration: 2000,
        }
      );
    }
    setCategoriesWorking(
      categoriesWorking.filter((c) => c !== categorySelected)
    );
  };

  const deleteFile = async () => {
    if (!fileSelected || !user) return;

    const deleteId = fileSelected.id;
    setFilesDeleting([...filesDeleting, deleteId]);
    try {
      const response = await axios.delete(api + "/files/" + deleteId);
      console.log(response);

      setFileSelected(null);
      setUser({
        ...user,
        files: user.files.filter((file) => file.id !== deleteId),
      });
    } catch (err: any) {
      toast.error(
        err?.inner
          ? err.inner[0].message
          : "An unknown error occurred. Check the console for more details.",
        {
          position: "top-center",
          duration: 2000,
        }
      );
    }
    setFilesDeleting(filesDeleting.filter((file) => file !== deleteId));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        authWorking,
        setAuthWorking,
        loginFormValues,
        setLoginFormValues,
        registerFormValues,
        setRegisterFormValues,
        fileSelected,
        setFileSelected,
        categorySelected,
        setCategorySelected,
        createFormValues,
        setCreateFormValues,
        submitCreateForm,
        categoriesWorking,
        setCategoriesWorking,
        filesDeleting,
        deleteFile,
      }}
    >
      <div className="h-screen transition-colors duration-300 bg-gray-900 text-white">
        {!initialized ? (
          <div className="h-full w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="h-full overflow-hidden flex flex-col">
              <AnimatePresence mode="wait">
                {user && (
                  <motion.div
                    transition={t.transition}
                    initial={{
                      height: 0,
                    }}
                    animate={{
                      height: "auto",
                    }}
                    exit={{
                      height: 0,
                    }}
                    key={user?.id}
                    className="overflow-hidden"
                  >
                    <Navbar />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <Routes key={location.pathname} location={location}>
                  <Route index element={<CreatePage />} />
                  <Route
                    path="login"
                    element={<LoginPage handleSubmit={handleAuthSubmit} />}
                  />
                  <Route
                    path="register"
                    element={<RegisterPage handleSubmit={handleAuthSubmit} />}
                  />
                  <Route path="files" element={<FilesPage />} />
                  <Route path="test" element={<Test />} />
                  <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
              </AnimatePresence>
            </div>

            <Toaster position="bottom-right" richColors />
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}
