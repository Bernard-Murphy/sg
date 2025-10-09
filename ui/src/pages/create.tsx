"use client";
import { AnimatePresence, motion } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { useApp, type Category } from "@/App";
import iconMap from "@/lib/iconMap";
import AnimatedButton from "@/components/animated-button";
import { useEffect } from "react";
import { createFormInitialValues, formMap } from "@/lib/createTypes";

export interface CreatePageProps {}

export interface FileFormValues {}

// const api = process.env.REACT_APP_API;

export default function CreatePage({}: CreatePageProps) {
  const { categorySelected, setCategorySelected, setCreateFormValues } =
    useApp();
  const categories: Category[] = ["delinquency_notice", "statement", "receipt"];

  useEffect(() => {
    setCreateFormValues(createFormInitialValues);
    setCategorySelected("delinquency_notice");
  }, []);

  const FormComponent: React.ElementType = formMap.get(
    categorySelected
  ) as React.ElementType;

  return (
    <motion.div
      transition={t.transition}
      exit={t.fade_out_scale_1}
      animate={t.normalize}
      initial={t.fade_out_scale_1}
      className="container mx-auto px-2 sm:px-6 pt-8 py-0 sm:py-8 flex-1"
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
              className={`flex flex-grow sm:flex-grow-0 justify-center sm:justify-start items-center px-4 py-3 rounded-md transition-all cursor-pointer ${
                categorySelected === category
                  ? "bg-blue-900 text-white"
                  : "hover:text-white hover:bg-white/10 text-gray-300"
              }`}
              type="button"
            >
              <span className="sm:mr-2">{iconMap.get(category)}</span>
              <span className="sm:block hidden capitalize">
                {category.replace("_", " ")}
              </span>
            </AnimatedButton>
          ))}
        </div>
      </motion.div>
      <motion.div
        transition={t.transition}
        exit={{
          opacity: 0,
          y: 30,
        }}
        animate={t.normalize}
        initial={t.normalize}
      >
        <AnimatePresence mode="wait">
          <FormComponent key={categorySelected} />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
