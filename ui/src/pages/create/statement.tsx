import { motion } from "framer-motion";
import { transitions as t } from "@/lib/utils";

export default function StatementForm() {
  return (
    <motion.div
      initial={t.fade_out_scale_1}
      animate={t.normalize}
      exit={t.fade_out_scale_1}
      transition={t.transition}
    >
      STATEMENT
    </motion.div>
  );
}
