import { useApp } from "@/App";
import { motion } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { type UserFile } from "@/App";
import AnimatedButton from "@/components/animated-button";
import iconMap from "@/lib/iconMap";
import { abbreviatedText } from "@/lib/methods";
import moment from "moment";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function FileList() {
  const { user, fileSelected, setFileSelected, screenWidth } = useApp();

  return (
    <motion.div
      transition={t.transition}
      exit={t.fade_out_left}
      animate={t.normalize}
      initial={t.fade_out_left}
      className="w-1/4 scrollbar-hidden"
    >
      {user?.files
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .map((file: UserFile) => {
          return (
            <div key={file.key}>
              <AnimatedButton
                type="button"
                onClick={() =>
                  setFileSelected({
                    ...file,
                  })
                }
                variant="custom"
                className={`flex flex-col sm:flex-row items-center w-full sm:text-left px-4 py-3 rounded-lg cursor-pointer sm:space-x-2 ${
                  fileSelected?.key === file.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="mb-2 sm:mb-0">
                      {iconMap.get(file.category)}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="capitalize">
                        {file.category.replace("_", " ")}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <span>
                  {abbreviatedText(
                    moment(file.timestamp).format(
                      screenWidth > 1024
                        ? "MMMM Do YYYY, h:mm a"
                        : screenWidth > 640
                        ? "MMMM Do YYYY"
                        : "l"
                    ),
                    25
                  )}
                </span>
              </AnimatedButton>
            </div>
          );
        })}
    </motion.div>
  );
}
