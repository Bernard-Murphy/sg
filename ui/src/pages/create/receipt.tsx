import { motion, AnimatePresence } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import {
  payTypes,
  type PayType,
  type ReceiptFormValues,
} from "@/lib/createTypes";
import { useApp } from "@/App";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedButton from "@/components/animated-button";
import Spinner from "@/components/ui/spinner";

/**
 * Receipt form
 * Rendered on the create page and on the file page (edit form)
 */

export default function ReceiptForm() {
  const {
    createFormValues,
    setCreateFormValues,
    submitCreateForm,
    categoriesWorking,
  } = useApp();
  const r: ReceiptFormValues = createFormValues.receiptFormValues;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreateFormValues({
      ...createFormValues,
      receiptFormValues: {
        ...createFormValues.receiptFormValues,
        [e.target.name as keyof typeof r]: e.target.value,
      },
    });
  };

  const working = categoriesWorking.includes("receipt");

  return (
    <form onSubmit={submitCreateForm} className="w-full">
      <motion.div
        transition={t.transition}
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={t.normalize}
        exit={{
          y: 40,
          opacity: 0,
        }}
        className="mt-8 flex flex-col sm:flex-row justify-between sm:items-center sm:space-x-2 w-full"
      >
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Payment Type</label>
          <Select
            value={r.payType}
            onValueChange={(e: string) => {
              console.log("value change", e);
              if (e)
                handleChange({
                  target: {
                    name: "payType",
                    value: e,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
            }}
          >
            <SelectTrigger className="w-full capitalize">
              <SelectValue placeholder="Select" className="text-white" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
              <SelectGroup>
                {payTypes.map((payType: PayType) => (
                  <SelectItem
                    className="capitalize"
                    key={payType}
                    value={payType}
                  >
                    {payType}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 mt-8 sm:mt-0">
          <label className="block text-sm font-medium mb-2">
            Loan Amount ($)
          </label>
          <input
            type="number"
            value={r.payAmount}
            onChange={handleChange}
            name="payAmount"
            min={1}
            className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
      </motion.div>
      <motion.div
        transition={t.transition}
        exit={{
          opacity: 0,
          y: 60,
        }}
        animate={t.normalize}
        initial={{
          opacity: 0,
          y: 60,
        }}
        className="mt-4"
      >
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          name="description"
          placeholder="Enter Description"
          value={r.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
        />
      </motion.div>
      <motion.div
        transition={t.transition}
        initial={{
          y: 80,
          opacity: 0,
        }}
        animate={t.normalize}
        exit={{
          y: 80,
          opacity: 0,
        }}
        className="mt-4 flex justify-between items-center space-x-2"
      >
        <AnimatedButton
          className="w-full sm:w-auto"
          variant="success"
          disabled={working}
          type="submit"
        >
          <AnimatePresence mode="wait">
            {working ? (
              <motion.div
                transition={t.transition}
                exit={t.fade_out_scale_1}
                animate={t.normalize}
                initial={t.fade_out}
                key="working"
                className="flex items-center justify-center"
              >
                <Spinner size="sm" className="mr-2" />
                Working
              </motion.div>
            ) : (
              <motion.div
                transition={t.transition}
                exit={t.fade_out_scale_1}
                animate={t.normalize}
                initial={t.fade_out}
                key="not-working"
              >
                Submit
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedButton>
      </motion.div>
    </form>
  );
}
