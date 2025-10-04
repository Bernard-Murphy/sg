"use client";
import { AnimatePresence, motion } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { useApp, type Category } from "@/App";
import iconMap from "@/lib/iconMap";
import AnimatedButton from "@/components/animated-button";
import DelinquencyNoticeForm from "./create/delinquency_notice";
import ReceiptForm from "./create/receipt";
import StatementForm from "./create/statement";

export interface CreatePageProps {}

export interface FileFormValues {}

const formMap = new Map([
  ["delinquency_notice", <DelinquencyNoticeForm key="delinquency_notice" />],
  ["receipt", <ReceiptForm key="receipt" />],
  ["statement", <StatementForm key="statement" />],
]);

// const api = process.env.REACT_APP_API;

export default function CreatePage({}: CreatePageProps) {
  const { categorySelected, setCategorySelected } = useApp();
  const categories: Category[] = ["delinquency_notice", "statement", "receipt"];

  return (
    <motion.div
      transition={t.transition}
      exit={t.fade_out_scale_1}
      animate={t.normalize}
      initial={t.fade_out_scale_1}
      className="container mx-auto px-6 py-8 flex-1"
    >
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
      >
        <h1 className="text-center text-3xl mb-4">New Document</h1>
        <div className="flex space-x-1 bg-black/20 rounded-lg p-1">
          {categories.map((category: Category) => (
            <AnimatedButton
              variant="custom"
              key={category}
              onClick={() => setCategorySelected(category)}
              className={`flex items-center px-4 py-3 rounded-md transition-all cursor-pointer ${
                categorySelected === category
                  ? "bg-blue-600 text-white"
                  : "hover:text-white hover:bg-white/10 text-gray-300"
              }`}
            >
              <span className="mr-2">{iconMap.get(category)}</span>
              <span className="capitalize">{category.replace("_", " ")}</span>
            </AnimatedButton>
          ))}
        </div>
      </motion.div>
      <AnimatePresence mode="wait">
        {formMap.get(categorySelected)}
      </AnimatePresence>
    </motion.div>
  );
}
