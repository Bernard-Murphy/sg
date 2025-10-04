"use client";
import { motion, AnimatePresence } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useApp } from "@/App";
import AnimatedButton from "@/components/animated-button";
import { House } from "lucide-react";
import FileList from "./files/list";
import FileComponent from "./files/file";

export interface FilesPageProps {}

// const api = process.env.REACT_APP_API;

export default function FilesPage({}: FilesPageProps) {
  const { user, fileSelected } = useApp();
  return (
    <div className="container mx-auto px-4 py-8 h-full flex-1 flex overflow-hidden">
      {!user?.files.length ? (
        <motion.div
          transition={t.transition}
          exit={t.fade_out_scale_1}
          animate={t.normalize}
          initial={t.fade_out}
          className="h-full w-full flex justify-center items-center"
        >
          <div className="pb-48 flex flex-col items-center">
            <h5>No files found</h5>
            <Link to="/" className="mt-4">
              <AnimatedButton variant="ghost" className="flex justify-center">
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
          className="flex w-full h-full space-x-2"
        >
          <FileList />
          <motion.div
            initial={t.fade_out_right}
            animate={t.normalize}
            exit={t.fade_out_right}
            transition={t.transition}
            className="h-full flex-1"
          >
            <AnimatePresence mode="wait">
              {fileSelected && <FileComponent key={fileSelected.id} />}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
