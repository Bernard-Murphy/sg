import { motion, AnimatePresence } from "framer-motion";
import { transitions as t } from "@/lib/utils";
import { useApp } from "@/App";
import AnimatedButton from "@/components/animated-button";
import {
  loanPaymentInitialValues,
  type LoanPayment,
  type StatementFormValues,
} from "@/lib/createTypes";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { Plus } from "lucide-react";
import PaymentDialog from "./paymentDialog";
import { dolHR } from "@/lib/methods";
import Spinner from "@/components/ui/spinner";

export default function StatementForm() {
  const [paymentSelected, setPaymentSelected] = useState<LoanPayment | null>(
    null
  );
  const {
    createFormValues,
    setCreateFormValues,
    submitCreateForm,
    categoriesWorking,
    screenWidth,
  } = useApp();
  const s: StatementFormValues = createFormValues.statementFormValues;

  const payments: LoanPayment[] = s.payments;

  const newPayment = () => {
    setPaymentSelected({
      ...loanPaymentInitialValues,
      key: uuid(),
      new: true,
      modalShown: true,
    });
  };

  const setPaymentModalShown = (option: boolean) => {
    if (paymentSelected)
      setPaymentSelected({
        ...paymentSelected,
        modalShown: option,
      });
  };

  useEffect(() => {
    if (paymentSelected && !paymentSelected?.modalShown)
      setPaymentSelected({
        ...loanPaymentInitialValues,
        key: uuid(),
      });
  }, [paymentSelected?.modalShown]);

  const savePayment = () => {
    if (!paymentSelected) return;

    const newPayment = {
      payDate: paymentSelected.payDate,
      payAmount: paymentSelected.payAmount,
      payType: paymentSelected.payType,
      key: paymentSelected.key,
    };

    if (paymentSelected?.new) {
      setCreateFormValues({
        ...createFormValues,
        statementFormValues: {
          ...createFormValues.statementFormValues,
          payments: [
            newPayment,
            ...createFormValues.statementFormValues.payments,
          ],
        },
      });
    } else {
      setCreateFormValues({
        ...createFormValues,
        statementFormValues: {
          ...createFormValues.statementFormValues,
          payments: [
            ...createFormValues.statementFormValues.payments.map((payment) => {
              let updatedPayment = {
                ...payment,
              };
              if (payment.key === newPayment.key) {
                updatedPayment = {
                  ...newPayment,
                };
              }

              return updatedPayment;
            }),
          ],
        },
      });
    }
    setPaymentSelected({
      ...paymentSelected,
      modalShown: false,
    });
  };

  const removePayment = () => {
    if (!paymentSelected) return;

    setPaymentSelected({
      ...paymentSelected,
      modalShown: false,
    });
    setCreateFormValues({
      ...createFormValues,
      statementFormValues: {
        ...createFormValues.statementFormValues,
        payments: [
          ...createFormValues.statementFormValues.payments.filter(
            (payment) => payment.key !== paymentSelected.key
          ),
        ],
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreateFormValues({
      ...createFormValues,
      statementFormValues: {
        ...createFormValues.statementFormValues,
        [e.target.name as keyof typeof s]: e.target.value,
      },
    });
  };

  const working = categoriesWorking.includes("statement");

  function SubmitButton() {
    return (
      <div className="mt-4">
        <AnimatedButton
          disabled={working}
          type="submit"
          className="w-full sm:w-auto"
          variant="success"
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
      </div>
    );
  }

  const motionAxis: "x" | "y" = screenWidth > 640 ? "x" : "y";

  return (
    <form onSubmit={submitCreateForm}>
      <PaymentDialog
        setModalShown={setPaymentModalShown}
        payment={paymentSelected}
        setPayment={setPaymentSelected}
        save={savePayment}
        remove={removePayment}
      />
      <div className="mt-8 flex flex-1 flex-col sm:flex-row sm:justify-between space-x-5 overflow-visible">
        <motion.div
          transition={t.transition}
          initial={{
            y: -20,
            opacity: 0,
          }}
          animate={t.normalize}
          exit={{
            y: -20,
            opacity: 0,
          }}
          className="mb-6 w-full sm:w-auto"
        >
          <p className="font-bold text-xl mb-2 sm:hidden text-center capitalize">
            Statement
          </p>
          <hr className="sm:hidden" />
        </motion.div>
        <motion.div
          transition={t.transition}
          initial={{
            [motionAxis]: -40,
            opacity: 0,
          }}
          animate={t.normalize}
          exit={{
            [motionAxis]: -40,
            opacity: 0,
          }}
          className="flex-1 w-full w-auto"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Property Full Address
            </label>
            <input
              type="text"
              value={s.propertyFullAddress}
              onChange={handleChange}
              name="propertyFullAddress"
              placeholder="Enter Address"
              className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none mb-2"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Balance ($)
            </label>
            <input
              type="number"
              value={s.balance}
              onChange={handleChange}
              min={0}
              name="balance"
              className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="hidden sm:block">
            <SubmitButton />
          </div>
          <hr className="block sm:hidden my-8 w-full" />
        </motion.div>
        <motion.div
          transition={t.transition}
          initial={{
            [motionAxis]: 40,
            opacity: 0,
          }}
          animate={t.normalize}
          exit={{
            [motionAxis]: 40,
            opacity: 0,
          }}
          className="flex-1"
        >
          <div>
            <div className="flex justify-between items-start sm:items-center mb-4">
              <h4 className="text-2xl font-bold">Payments</h4>
              <AnimatedButton
                disabled={working}
                onClick={newPayment}
                className="flex justify-between items-center"
              >
                <Plus />
                {/* <Plus className="mr-2" />
                <span>New</span> */}
              </AnimatedButton>
            </div>
            {payments.length ? (
              payments.map((payment: LoanPayment) => {
                return (
                  <motion.div
                    key={payment.key}
                    transition={t.transition}
                    initial={t.fade_out}
                    animate={t.normalize}
                    exit={t.fade_out}
                  >
                    <AnimatedButton
                      onClick={() =>
                        setPaymentSelected({
                          ...payment,
                          modalShown: true,
                        })
                      }
                      variant="custom"
                      className={`flex justify-between w-full text-left px-4 py-3 rounded-lg cursor-pointer ${
                        paymentSelected?.key === payment.key
                          ? "bg-blue-900 text-white"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                      type="button"
                    >
                      <div className="flex-1">
                        <p className="font-bold">{dolHR(payment.payAmount)}</p>
                        <p>{payment.payType}</p>
                      </div>
                      <div className="text-right text-gray-300">
                        {moment(payment.payDate).format("MMMM Do YYYY, h:mm a")}
                      </div>
                    </AnimatedButton>
                  </motion.div>
                );
              })
            ) : (
              <h5 className="font-bold text-center text-xl my-8 sm:mt-16">
                No payments found
              </h5>
            )}
          </div>
          <div className="block sm:hidden mt-5">
            <SubmitButton />
          </div>
        </motion.div>
      </div>
    </form>
  );
}
