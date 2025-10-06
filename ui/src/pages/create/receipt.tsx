import { motion } from "framer-motion";
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

export default function ReceiptForm() {
  const { createFormValues, setCreateFormValues, submitCreateForm } = useApp();
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

  return (
    <form onSubmit={submitCreateForm}>
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
        className="mt-8 flex justify-between items-center space-x-2"
      >
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Payment Type</label>
          <Select
            value={r.payType}
            onValueChange={(e: string) =>
              handleChange({
                target: {
                  name: "payType",
                  value: e,
                },
              } as React.ChangeEvent<HTMLInputElement>)
            }
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
        <div className="flex-1">
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
        <AnimatedButton type="submit">Submit</AnimatedButton>
      </motion.div>
    </form>
  );
}
