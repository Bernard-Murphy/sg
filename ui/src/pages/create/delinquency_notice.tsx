import { motion, AnimatePresence } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { useApp } from "@/App";
import { type DelinquencyNoticeFormValues } from "@/lib/createTypes";
import DatePicker from "@/components/datepicker";
import AnimatedButton from "@/components/animated-button";
import Spinner from "@/components/ui/spinner";

export interface DelinquencyNoticeFormProps {
  fromEditPage?: boolean;
}

export default function DelinquencyNoticeForm({
  fromEditPage,
}: DelinquencyNoticeFormProps) {
  const {
    createFormValues,
    setCreateFormValues,
    submitCreateForm,
    categoriesWorking,
  } = useApp();

  const d: DelinquencyNoticeFormValues =
    createFormValues.delinquencyNoticeFormValues;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreateFormValues({
      ...createFormValues,
      delinquencyNoticeFormValues: {
        ...createFormValues.delinquencyNoticeFormValues,
        [e.target.name as keyof typeof d]: e.target.value,
      },
    });
  };

  const setDate = (d: Date) => {
    setCreateFormValues({
      ...createFormValues,
      delinquencyNoticeFormValues: {
        ...createFormValues.delinquencyNoticeFormValues,
        delinquencyDate: d,
      },
    });
  };

  const working = categoriesWorking.includes("delinquency_notice");

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
        className="mt-8"
      >
        <label className="block text-sm font-medium mb-2">
          Property Full Address
        </label>
        <input
          type="text"
          value={d.propertyFullAddress}
          onChange={handleChange}
          name="propertyFullAddress"
          placeholder="Enter Address"
          className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none mb-2"
        />
      </motion.div>
      <motion.div
        transition={t.transition}
        initial={{
          y: 60,
          opacity: 0,
        }}
        animate={t.normalize}
        exit={{
          y: 60,
          opacity: 0,
        }}
        className="mt-4 flex justify-between items-center space-x-2"
      >
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Delinquency Date
          </label>
          <DatePicker
            date={d.delinquencyDate}
            setDate={setDate}
            className="w-full"
            buttonClasses="w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Loan Amount ($)
          </label>
          <input
            type="number"
            value={d.loanAmount}
            onChange={handleChange}
            min={1}
            name="loanAmount"
            className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
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
        className="mt-4"
      >
        <AnimatedButton disabled={working} type="submit">
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
