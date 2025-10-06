"use client";

import type React from "react";
import { transitions as t } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedButton from "@/components/animated-button";
import { useApp } from "@/App";
import Spinner from "@/components/ui/spinner";
import { UserRoundPlus } from "lucide-react";

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginFormProps {
  handleSubmit: () => void;
}

export default function LoginPage({ handleSubmit }: LoginFormProps) {
  const { authWorking, loginFormValues, setLoginFormValues } = useApp();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setLoginFormValues({
      ...loginFormValues,
      [e.target.name as keyof typeof loginFormValues]: e.target.value,
    });

  return (
    <motion.div
      transition={t.transition}
      exit={t.fade_out_scale_1}
      animate={t.normalize}
      initial={t.fade_out}
      className="container mx-auto px-6 py-8 max-w-md flex-1"
    >
      <motion.h1
        transition={t.transition}
        exit={{
          opacity: 0,
          y: 40,
        }}
        animate={t.normalize}
        initial={{
          opacity: 0,
          y: -40,
        }}
        className="text-2xl font-bold text-center mb-8"
      >
        Login
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          transition={t.transition}
          exit={{
            opacity: 0,
            y: 55,
          }}
          animate={t.normalize}
          initial={{
            opacity: 0,
            y: -55,
          }}
        >
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={loginFormValues.username}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </motion.div>

        <motion.div
          transition={t.transition}
          exit={{
            opacity: 0,
            y: 70,
          }}
          animate={t.normalize}
          initial={{
            opacity: 0,
            y: -70,
          }}
        >
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={loginFormValues.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </motion.div>
        <motion.div
          transition={t.transition}
          exit={{
            opacity: 0,
            y: 85,
          }}
          animate={t.normalize}
          initial={{
            opacity: 0,
            y: -85,
          }}
        >
          <AnimatedButton
            disabled={authWorking}
            type="submit"
            className="w-full"
          >
            <AnimatePresence mode="wait">
              {authWorking ? (
                <motion.div
                  transition={t.transition}
                  exit={{
                    opacity: 0,
                  }}
                  animate={t.normalize}
                  initial={{
                    opacity: 0,
                  }}
                  className="flex items-center justify-center"
                  key="working"
                >
                  <Spinner className="me-2" size="sm" />
                  Working
                </motion.div>
              ) : (
                <motion.div
                  transition={t.transition}
                  exit={{
                    opacity: 0,
                  }}
                  animate={t.normalize}
                  initial={{
                    opacity: 0,
                  }}
                  className="flex items-center justify-center"
                  key="login"
                >
                  Submit
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedButton>
        </motion.div>

        <motion.div
          transition={t.transition}
          exit={{
            opacity: 0,
            y: 100,
          }}
          animate={t.normalize}
          initial={{
            opacity: 0,
            y: -100,
          }}
        >
          <Link to="/register">
            <AnimatedButton
              type="button"
              variant="ghost"
              className="mt-4 mx-auto  flex items-center justify-center"
            >
              <UserRoundPlus className="mr-2" />
              Create Account
            </AnimatedButton>
          </Link>
        </motion.div>
      </form>
    </motion.div>
  );
}
