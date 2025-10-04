import { useApp } from "@/App";
import { motion } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { type UserFile } from "@/App";
import AnimatedButton from "@/components/animated-button";
import iconMap from "@/lib/iconMap";
import { abbreviatedText } from "@/lib/methods";

export default function FileList() {
  const { user, fileSelected, setFileSelected } = useApp();

  return (
    <motion.div
      transition={t.transition}
      exit={t.fade_out_left}
      animate={t.normalize}
      initial={t.fade_out_left}
      className="w-1/4 overflow-x-hidden scrollbar-hidden"
    >
      {user?.files
        .sort((a, b) => b.id - a.id)
        .map((file: UserFile) => {
          return (
            <div key={file.key}>
              <AnimatedButton
                onClick={() =>
                  setFileSelected({
                    ...file,
                  })
                }
                variant="custom"
                className={`flex items-center w-full text-left px-4 py-3 rounded-lg cursor-pointer space-x-2 ${
                  fileSelected?.key === file.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {iconMap.get(file.category)}
                <span className="profile-menu-item-text">
                  {abbreviatedText(file.key, 25)}
                </span>
              </AnimatedButton>
            </div>
          );
        })}
    </motion.div>
  );
}
