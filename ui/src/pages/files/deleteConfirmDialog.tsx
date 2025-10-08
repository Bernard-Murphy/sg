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

export interface DeleteConfirmDialogProps {
  dialogShown: boolean;
}

export default function DeleteConfirmDialog({
  dialogShown,
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
              className="flex flex-col justify-center items-center"
            >
              <Spinner size="lg" hashColor="#eee" />
              <h5 className="text-center text-3xl mt-5 text-white">Working</h5>
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
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteFile}>
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
