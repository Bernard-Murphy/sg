"use client";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, createContext, useContext, useEffect } from "react";
import Navbar from "./components/navbar";
import CreatePage from "./pages/create";
import Test from "./pages/test";
import { Toaster } from "./components/ui/sonner";
import FilesPage from "./pages/files";
import File from "./pages/files/file";
import axios from "axios";
import AuthModal from "./components/auth-modal";
import { type LoginFormValues } from "./components/forms/login";
import { type RegisterFormValues } from "./components/forms/register";

interface User {
  username: string;
  avatar?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  authWorking: boolean;
  setAuthWorking: (option: boolean) => void;
}

const testUser: User = {
  username: "bernard",
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
  const location = useLocation();
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(testUser);
  const [authWorking, setAuthWorking] = useState<boolean>(true);
  const [authModalForm, setAuthModalForm] = useState<"login" | "register">(
    "login"
  );
  const [authModalShown, setAuthModalShown] = useState<boolean>(false);
  const [loginFormValues, setLoginFormValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });
  const [registerFormValues, setRegisterFormValues] =
    useState<RegisterFormValues>({
      username: "",
      password: "",
      password2: "",
    });

  const authInit = () => {
    axios
      .get(process.env.REACT_APP_API + "/auth/init")
      .then(() => {})
      .catch((err) => {
        console.log("authInit error", err);
      })
      .finally(() => setAuthWorking(false));
  };

  useEffect(() => {
    authInit();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        authWorking,
        setAuthWorking,
      }}
    >
      <div className="min-h-screen transition-colors duration-300 overflow-hidden flex flex-col bg-gray-900 text-white">
        <Navbar />
        <AuthModal
          authModalForm={authModalForm}
          authModalShown={authModalShown}
          loginFormValues={loginFormValues}
          setLoginFormValues={setLoginFormValues}
          registerFormValues={registerFormValues}
          setRegisterFormValues={setRegisterFormValues}
        />
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route index element={<CreatePage />} />
            <Route path="files" element={<FilesPage />}>
              <Route path=":file" element={<File />} />
            </Route>
            <Route path="test" element={<Test />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </AnimatePresence>
        <Toaster position="bottom-right" richColors />
      </div>
    </AppContext.Provider>
  );
}
