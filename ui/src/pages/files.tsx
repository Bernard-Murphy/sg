"use client";
import { motion } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { Outlet } from "react-router-dom";

export interface FilesPageProps {}

// const api = process.env.REACT_APP_API;

export default function FilesPage({}: FilesPageProps) {
  return (
    <motion.div
      transition={t.transition}
      exit={t.fade_out_scale_1}
      animate={t.normalize}
      initial={t.fade_out}
      className="container mx-auto px-6 py-8 flex-1"
    >
      Files
      <Outlet />
    </motion.div>
  );
}
