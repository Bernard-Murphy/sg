"use client";

import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/App";
import AnimatedButton from "./animated-button";
import Spinner from "./ui/spinner";
// import axios from "axios";

// const api = process.env.REACT_APP_API;

export default function Navbar() {
  const {
    user,
    // setUser,
    authWorking,
    // setAuthWorking
  } = useApp();

  const navigate = useNavigate();

  // const handleLogout = () => {
  //   setAuthWorking(true);
  //   axios
  //     .get(api + "/auth/logout")
  //     .catch((err) => {
  //       console.log("logout error", err);
  //     })
  //     .finally(() => {
  //       navigate("/");
  //       setAuthWorking(false);
  //       setUser(null);
  //     });
  // };

  return (
    <nav className="bg-black/20 backdrop-blur-sm border-white/10 px-6 py-4">
      <div className="flex justify-between items-center">
        <div style={{ alignSelf: "center", height: "48px" }}>
          <Link
            to="/"
            className="text-lg font-medium transition-colors duration-200"
          >
            <AnimatedButton
              variant="custom"
              className="p-0 rounded-lg cursor-pointer"
            >
              <img src="/icons/android-chrome-48x48.png" />
            </AnimatedButton>
          </Link>
        </div>

        <div style={{ zIndex: 5000 }} className="relative">
          <AnimatePresence mode="wait">
            {authWorking ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="spinner"
                className="flex items-center justify-center"
              >
                <Spinner size="sm" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="options"
              >
                <AnimatePresence mode="wait">
                  {user ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key="user"
                    >
                      <AnimatedButton
                        variant="custom"
                        onClick={() => navigate("/files")}
                        className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer"
                      >
                        {user.avatar ? (
                          <img
                            src={user.avatar || "/blank-avatar.png"}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </AnimatedButton>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key="options"
                    >
                      <AnimatedButton
                        className="text-left px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-700 disabled:bg-gray-500 hover:text-blue-400"
                        variant="custom"
                      >
                        Login / Register
                      </AnimatedButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
