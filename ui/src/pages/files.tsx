"use client";
import { motion, AnimatePresence } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useApp } from "@/App";
import AnimatedButton from "@/components/animated-button";
import { House } from "lucide-react";
import FileList from "./files/list";
import FileComponent from "./files/file";
import React from "react";

export interface FilesPageProps {}

export default function FilesPage({}: FilesPageProps) {
  const { user, fileSelected } = useApp();

  return (
    <motion.div
      transition={t.transition}
      exit={t.fade_out_scale_1}
      animate={t.normalize}
      initial={t.fade_out_scale_1}
      className="container mx-auto px-4 py-8 h-full flex-1 flex overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!user?.files.length ? (
          <motion.div
            transition={t.transition}
            exit={t.fade_out_scale_1}
            animate={t.normalize}
            initial={t.fade_out}
            className="h-full w-full flex justify-center items-center"
            key="no-files"
          >
            <div className="pb-48 flex flex-col items-center">
              <h5>No files found</h5>
              <Link to="/" className="mt-4">
                <AnimatedButton
                  variant="ghost"
                  className="flex justify-center"
                  type="button"
                >
                  <House />
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            transition={t.transition}
            exit={t.fade_out_scale_1}
            animate={t.normalize}
            initial={t.fade_out_scale_1}
            className="flex flex-col w-full h-full space-x-4"
            key="files"
          >
            <h1 className="text-center text-2xl pb-4">Files</h1>
            <div className="flex w-full flex-1 space-x-4">
              <FileList />
              <motion.div
                initial={t.fade_out_right}
                animate={t.normalize}
                exit={t.fade_out_right}
                transition={t.transition}
                className="h-full flex-1"
              >
                <AnimatePresence mode="wait">
                  {fileSelected ? (
                    <FileComponent key={fileSelected.id} />
                  ) : (
                    <React.Fragment key="no"></React.Fragment>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
