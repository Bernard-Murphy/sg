import { useApp, type UserFile } from "@/App";
import { motion, AnimatePresence } from "framer-motion";
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
import DelinquencyNoticeForm from "../create/delinquency_notice";
import ReceiptForm from "../create/receipt";
import StatementForm from "../create/statement";

const formMap = new Map([
  ["delinquency_notice", <DelinquencyNoticeForm key="delinquency_notice" />],
  ["receipt", <ReceiptForm key="receipt" />],
  ["statement", <StatementForm key="statement" />],
]);

export default function FileComponent() {
  const { fileSelected } = useApp();
  const [deleteDialogShown, setDeleteDialogShown] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
      <DeleteConfirmDialog
        dialogShown={deleteDialogShown}
        setDialogShown={setDeleteDialogShown}
      />
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
                  onClick={() => setIsEditing(!isEditing)}
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
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            transition={t.transition}
            exit={t.fade_out_scale_1}
            animate={t.normalize}
            initial={t.fade_out}
            className="flex-1 overflow-x-hidden overflow-y-auto"
            key="isEditing"
          >
            <div className="flex justify-end items-center space-x-4">
              <AnimatedButton
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Save Changes
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </AnimatedButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            transition={t.transition}
            exit={t.fade_out_scale_1}
            animate={t.normalize}
            initial={t.fade_out}
            className="flex-1 overflow-x-hidden overflow-y-auto"
            key="isNotEditing"
          >
            <embed
              className="h-full w-full"
              type="application/pdf"
              src={fileSrc}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
