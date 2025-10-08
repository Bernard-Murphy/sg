import { useApp } from "@/App";
import { motion } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import moment from "moment";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { copyText } from "@/lib/methods";
import AnimatedButton from "@/components/animated-button";
import { Copy, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteConfirmDialog from "./deleteConfirmDialog";

export default function FileComponent() {
  const { fileSelected } = useApp();
  const [deleteDialogShown, setDeleteDialogShown] = useState<boolean>(false);

  useEffect(() => {
    if (!fileSelected) setDeleteDialogShown(false);
  }, [fileSelected?.id]);

  if (!fileSelected) return <></>;

  const fileSrc = process.env.REACT_APP_ASSET_LOCATION + "/" + fileSelected.key;

  return (
    <motion.div
      initial={t.fade_out_right}
      animate={t.normalize}
      exit={t.fade_out_right}
      transition={t.transition}
      className="h-full w-full flex flex-col"
    >
      <DeleteConfirmDialog dialogShown={deleteDialogShown} />
      <div className="flex justify-between items-center">
        <div className="text-gray-300">
          {moment(fileSelected.timestamp).format("MMMM Do YYYY, h:mm a")}
        </div>
        <div className="flex space-x-4 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full my-1">
                <AnimatedButton
                  variant="custom"
                  className="w-full px-0 py-0"
                  onClick={() => copyText(fileSrc)}
                >
                  <Copy />
                </AnimatedButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full my-1">
                <AnimatedButton
                  variant="custom"
                  className="w-full px-0 py-0"
                  onClick={() => copyText(fileSrc)}
                >
                  <SquarePen />
                </AnimatedButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full my-1">
                <AnimatedButton
                  variant="custom"
                  className="w-full px-0 py-0"
                  onClick={() => setDeleteDialogShown(true)}
                >
                  <Trash2 />
                </AnimatedButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <hr className="my-2" />
      <embed
        className="flex-1 w-full overflow-x-hidden overflow-y-auto"
        type="application/pdf"
        src={fileSrc}
      />
    </motion.div>
  );
}
