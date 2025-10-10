import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { payTypes, type PayType, type LoanPayment } from "@/lib/createTypes";
import AnimatedButton from "@/components/animated-button";
import DatePicker from "@/components/datepicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export interface PaymentDialogProps {
  payment: LoanPayment | null;
  setPayment: (payment: LoanPayment) => void;
  setModalShown: (option: boolean) => void;
  save: () => void;
  remove: () => void;
}

export default function PaymentDialog({
  payment,
  setPayment,
  setModalShown,
  save,
  remove,
}: PaymentDialogProps) {
  const [datePickerOpen, setDatepickerOpen] = useState<boolean>(false);
  if (!payment) return <></>;
  return (
    <Dialog
      open={payment.modalShown}
      onOpenChange={(option: boolean) => {
        if (!datePickerOpen) setModalShown(option);
      }}
    >
      <DialogContent className="bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>
            {payment.new ? "New Payment" : "Edit Payment"}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full mb-4">
          <label className="block text-sm font-medium mb-2">Pay Date</label>
          <DatePicker
            date={payment.payDate}
            setDate={(date: Date) =>
              setPayment({
                ...payment,
                payDate: date,
              })
            }
            className="w-full"
            buttonClasses="w-full"
            setOpenParent={setDatepickerOpen}
          />
        </div>
        <div className="w-full mb-4">
          <label className="block text-sm font-medium mb-2">Payment Type</label>
          <Select
            value={payment.payType}
            onValueChange={(e: PayType) => {
              if (e)
                setPayment({
                  ...payment,
                  payType: e,
                });
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
        <div className="w-full mb-4">
          <label className="block text-sm font-medium mb-2">
            Payment Amount ($)
          </label>
          <input
            type="number"
            value={payment.payAmount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPayment({
                ...payment,
                payAmount: Number(e.target.value),
              })
            }
            name="payAmount"
            min={1}
            className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        <DialogFooter className="flex flex-row justify-between items-center">
          <div>
            {!payment?.new && payment?.modalShown && (
              <AnimatedButton
                variant="destructive"
                type="button"
                onClick={remove}
              >
                Remove
              </AnimatedButton>
            )}
          </div>
          <div className="flex flex-1 justify-end items-center space-x-2">
            <AnimatedButton type="button" onClick={save}>
              Save
            </AnimatedButton>
            <AnimatedButton
              onClick={() => setModalShown(false)}
              variant="secondary"
              type="button"
            >
              Close
            </AnimatedButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
