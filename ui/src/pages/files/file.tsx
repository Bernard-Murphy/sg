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
import { Copy, SquarePen, Trash2, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteConfirmDialog from "./deleteConfirmDialog";
import {
  createFormInitialValues,
  formMap,
  categoryFormMap,
  type CreateFormValues,
  type LoanPayment,
} from "@/lib/createTypes";
import Spinner from "@/components/ui/spinner";

/**
 * Right side of the files page when a file is selected
 * 2 views - File PDF embed and the file edit form
 */

export default function FileComponent() {
  const {
    fileSelected,
    setCreateFormValues,
    categoriesWorking,
    setCategorySelected,
  } = useApp();
  const [deleteDialogShown, setDeleteDialogShown] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [file, setFile] = useState<UserFile | null>(fileSelected);

  useEffect(() => {
    if (fileSelected) {
      const thisFile = {
        ...fileSelected,
      };
      setFile(thisFile);
      let formValues = JSON.parse(thisFile.formValues);
      if (formValues.delinquencyDate)
        formValues.delinquencyDate = new Date(formValues.delinquencyDate);
      if (formValues.payments)
        formValues.payments = formValues.payments.map(
          (payment: LoanPayment) => ({
            ...payment,
            payDate: new Date(payment.payDate),
          })
        );
      setCreateFormValues({
        ...createFormInitialValues,
        [categoryFormMap.get(thisFile.category) as keyof CreateFormValues]: {
          ...formValues,
        },
      });
      setCategorySelected(thisFile.category);
    }
  }, []);

  useEffect(() => {
    if (!fileSelected) setDeleteDialogShown(false);
  }, [fileSelected?.id]);

  useEffect(() => {
    if (!categoriesWorking.length) setIsEditing(false);
  }, [categoriesWorking]);

  if (!file) return <></>;

  const fileSrc = process.env.REACT_APP_ASSET_LOCATION + "/" + file.key;
  const FormComponent: React.ElementType = formMap.get(
    file.category
  ) as React.ElementType;

  return (
    <motion.div
      initial={t.fade_out_right}
      animate={t.normalize}
      exit={t.fade_out_right}
      transition={t.transition}
      className="h-full w-full flex flex-col"
      key={file?.id}
    >
      <DeleteConfirmDialog
        dialogShown={deleteDialogShown}
        setDialogShown={setDeleteDialogShown}
      />
      <div className="flex flex-col-reverse sm:flex-row justify-between items-end sm:items-center w-full">
        <div className="text-gray-300">
          {moment(file.timestamp).format("MMMM Do YYYY, h:mm a")}
        </div>
        <div className="flex space-x-4 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full my-1">
                <AnimatedButton
                  variant="custom"
                  type="button"
                  className="w-full px-0 py-0"
                  onClick={() => copyText(fileSrc)}
                  noRipple={true}
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
                  noRipple={true}
                  type="button"
                >
                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.div
                        transition={t.transition}
                        initial={t.fade_out_scale_1}
                        animate={t.normalize}
                        exit={t.fade_out_scale_1}
                        key="cancel"
                      >
                        <CircleX />
                      </motion.div>
                    ) : (
                      <motion.div
                        transition={t.transition}
                        initial={t.fade_out_scale_1}
                        animate={t.normalize}
                        exit={t.fade_out_scale_1}
                        key="edit"
                      >
                        <SquarePen />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AnimatedButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isEditing ? "Cancel" : "Edit"}</p>
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
                  noRipple={true}
                  type="button"
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
            initial={t.fade_out_scale_1}
            className="flex-1"
            key="isEditing"
          >
            <AnimatePresence mode="wait">
              <FormComponent key={file.category} fromEditPage={true} />
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            transition={t.transition}
            exit={t.fade_out_scale_1}
            animate={t.normalize}
            initial={t.fade_out}
            className="flex-1 overflow-clip relative w-full"
            key="isNotEditing"
          >
            <div className="absolute h-full w-full flex items-center justify-center">
              <Spinner hashColor="#eee" />
            </div>
            <embed
              className="h-full w-full absolute"
              type="application/pdf"
              src={fileSrc}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
