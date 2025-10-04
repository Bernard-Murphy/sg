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

export type Category = "delinquency_notice" | "statement" | "receipt";

export interface UserFile {
  id: number;
  category: Category;
  key: string;
  timestamp: string;
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
  const [user, setUser] = useState<User | null>(null);
  const [fileSelected, setFileSelected] = useState<UserFile | null>(null);
  // const [user, setUser] = useState<User | null>(testUser);
  const [categorySelected, setCategorySelected] =
    useState<Category>("delinquency_notice");
  const [authWorking, setAuthWorking] = useState<boolean>(true);
  const [callbackUrl, setCallbackUrl] = useState<string>("/");
  const [loginFormValues, setLoginFormValues] =
    useState<LoginFormValues>(blankLoginValues);
  const [registerFormValues, setRegisterFormValues] =
    useState<RegisterFormValues>(blankRegisterValues);
  const [createFormValues, setCreateFormValues] = useState<CreateFormValues>(
    createFormInitialValues
  );

  const authInit = () => {
    axios
      .get(process.env.REACT_APP_API + "/auth/init")
      .then((res) => {
        console.log(res.data);
        setUser(testUser as User);
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
      .finally(() => setAuthWorking(false));
  };

  useEffect(() => {
    authInit();
  }, []);

  useEffect(() => {
    if (!user?.username) {
      if (!["/login", "/register"].includes(location.pathname))
        setCallbackUrl(location.pathname);
      navigate("/login");
    } else navigate(callbackUrl);
    setLoginFormValues(blankLoginValues);
    setRegisterFormValues(blankRegisterValues);
  }, [user?.username]);

  const handleAuthSubmit = () => {
    console.log(loginFormValues);
    console.log(registerFormValues);
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
      }}
    >
      <div className="h-screen transition-colors duration-300 bg-gray-900 text-white">
        {!user && authWorking ? (
          <div className="h-full w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                transition={t.transition}
                exit={{
                  opacity: 0,
                  y: -30,
                }}
                animate={t.normalize}
                initial={{
                  opacity: 0,
                  y: -30,
                }}
                key={user?.id}
                className="h-full overflow-hidden flex flex-col"
              >
                {user && <Navbar />}
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
              </motion.div>
            </AnimatePresence>

            <Toaster position="bottom-right" richColors />
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}
