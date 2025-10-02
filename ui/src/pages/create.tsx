"use client";
import { motion } from "framer-motion";
import { transitions as t } from "@/lib/utils";

export interface CreatePageProps {}

// const api = process.env.REACT_APP_API;

export default function CreatePage({}: CreatePageProps) {
  return (
    <motion.div
      transition={t.transition}
      exit={t.fade_out_scale_1}
      animate={t.normalize}
      initial={t.fade_out}
      className="container mx-auto px-6 py-8 flex-1"
    >
      Create
    </motion.div>
  );
}
