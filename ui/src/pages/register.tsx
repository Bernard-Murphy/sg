import type React from "react";
import { transitions as t } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedButton from "@/components/animated-button";
import { useApp } from "@/App";
import Spinner from "@/components/ui/spinner";

const api = process.env.REACT_APP_API;

export interface RegisterFormValues {
  username: string;
  password: string;
  password2: string;
  // avatar: File | undefined;
}

export interface RegisterFormProps {
  handleSubmit: () => void;
}

export default function RegisterPage({ handleSubmit }: RegisterFormProps) {
  const { authWorking, registerFormValues, setRegisterFormValues } = useApp();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setRegisterFormValues({
      ...registerFormValues,
      [e.target.name as keyof typeof registerFormValues]: e.target.value,
    });

  return (
    <motion.div
      transition={t.transition}
      exit={t.fade_out_scale_1}
      animate={t.normalize}
      initial={t.fade_out}
      className="container mx-auto px-6 py-8 max-w-md h-full overflow-clip flex-1"
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
        Register
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          transition={t.transition}
          exit={{
            opacity: 0,
            y: 50,
          }}
          animate={t.normalize}
          initial={{
            opacity: 0,
            y: -50,
          }}
        >
          <label className="block text-sm font-medium mb-2">Username *</label>
          <input
            type="text"
            name="username"
            value={registerFormValues.username}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </motion.div>

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
          <label className="block text-sm font-medium mb-2">Password *</label>
          <input
            type="password"
            name="password"
            value={registerFormValues.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </motion.div>

        <motion.div
          transition={t.transition}
          exit={{
            opacity: 0,
            y: 60,
          }}
          animate={t.normalize}
          initial={{
            opacity: 0,
            y: -60,
          }}
        >
          <label className="block text-sm font-medium mb-2">
            Re-enter Password *
          </label>
          <input
            type="password"
            name="password2"
            value={registerFormValues.password2}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </motion.div>

        <motion.div
          transition={t.transition}
          exit={{
            opacity: 0,
            y: 75,
          }}
          animate={t.normalize}
          initial={{
            opacity: 0,
            y: -75,
          }}
        >
          <AnimatedButton
            type="submit"
            className="w-full"
            disabled={authWorking}
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
                  key="not-working"
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
            y: 85,
          }}
          animate={t.normalize}
          initial={{
            opacity: 0,
            y: -85,
          }}
          className="text-center mb-6"
        >
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Already have an account? Login
          </Link>
        </motion.div>
      </form>
    </motion.div>
  );
}
