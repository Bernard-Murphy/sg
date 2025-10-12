"use client";

import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { useApp } from "@/App";
import AnimatedButton from "./animated-button";
import Spinner from "./ui/spinner";
import axios from "axios";

/**
 * Navbar will only be displayed if the user is logged in
 * On left will be the logo. Clicking this will take the user to the home page where documents can be generated
 * On right, 2 buttons - User tooltip and logout
 * Clicking the user tooltip will take the user to the files page, which lists the user's files, if any
 * Clicking the Logout button will log the user out, hide the navbar, and navigate to the login page
 */

const api = process.env.REACT_APP_API;

export default function Navbar() {
  const { user, setUser, authWorking, setAuthWorking } = useApp();

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthWorking(true);
    axios
      .get(api + "/auth/logout")
      .catch((err) => {
        console.log("logout error", err);
      })
      .finally(() => {
        setAuthWorking(false);
        setUser(null);
      });
  };

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

        <div className="flex justify-end items-center space-x-1">
          <AnimatedButton
            variant="custom"
            onClick={() => navigate("/files")}
            className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer"
          >
            {user?.avatar ? (
              <img
                src={user?.avatar || "/blank-avatar.png"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                {user?.username.charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </AnimatedButton>
          <AnimatedButton
            className="text-left px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-700 disabled:bg-gray-500 hover:text-red-400"
            variant="custom"
            disabled={authWorking}
            onClick={handleLogout}
          >
            <AnimatePresence mode="wait">
              {authWorking ? (
                <motion.div
                  transition={t.transition}
                  exit={t.fade_out_scale_1}
                  animate={t.normalize}
                  initial={t.fade_out}
                  key="working"
                  className="flex items-center justify-center"
                >
                  <Spinner size="sm" className="mr-2" />
                  Working
                </motion.div>
              ) : (
                <motion.div
                  transition={t.transition}
                  exit={t.fade_out_scale_1}
                  animate={t.normalize}
                  initial={t.fade_out}
                  key="not-working"
                >
                  Logout
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedButton>
        </div>
      </div>
    </nav>
  );
}
