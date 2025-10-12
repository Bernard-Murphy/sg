import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApp } from "@/App";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "@/components/ui/spinner";
import { transitions as t } from "@/lib/utils";

/**
 * Alert dialog that prompts the user to confirm whether the user wants to delete a file
 */

export interface DeleteConfirmDialogProps {
  dialogShown: boolean;
  setDialogShown: (option: boolean) => void;
}

export default function DeleteConfirmDialog({
  dialogShown,
  setDialogShown,
}: DeleteConfirmDialogProps) {
  const { fileSelected, deleteFile, filesDeleting } = useApp();

  const working: boolean = filesDeleting.includes(fileSelected?.id || "");
  return (
    <AlertDialog open={dialogShown}>
      <AlertDialogContent className="bg-gray-900">
        <AnimatePresence mode="wait">
          {working ? (
            <motion.div
              key="working"
              transition={t.transition}
              initial={t.fade_out}
              animate={t.normalize}
              exit={t.fade_out}
              className="flex flex-col justify-center items-center p-5"
            >
              <Spinner size="md" hashColor="#eee" />
              <h5 className="text-center text-2xl mt-5 text-white">Deleting</h5>
            </motion.div>
          ) : (
            <motion.div
              key="not-working"
              transition={t.transition}
              initial={t.fade_out}
              animate={t.normalize}
              exit={t.fade_out}
            >
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">
                  Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white">
                  This will permanently delete the document
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDialogShown(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="my-4 sm:my-0 bg-red-700"
                  onClick={deleteFile}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </AlertDialogContent>
    </AlertDialog>
  );
}
