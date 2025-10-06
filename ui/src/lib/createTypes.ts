export interface DelinquencyNoticeFormValues {
  propertyFullAddress: string;
  loanAmount: number;
  delinquencyDate: Date;
}

export type PayType = "cash" | "check" | "card";

export const payTypes: PayType[] = ["cash", "check", "card"];

export interface LoanPayment {
  new?: boolean;
  key?: string;
  modalShown?: boolean;
  payDate: Date;
  payAmount: number;
  payType: PayType;
}

export interface StatementFormValues {
  propertyFullAddress: string;
  payments: LoanPayment[];
  balance: number;
}

export interface ReceiptFormValues {
  description: string;
  payAmount: number;
  payType: PayType;
}

export interface CreateFormValues {
  delinquencyNoticeFormValues: DelinquencyNoticeFormValues;
  statementFormValues: StatementFormValues;
  receiptFormValues: ReceiptFormValues;
}

export const createFormInitialValues: CreateFormValues = {
  delinquencyNoticeFormValues: {
    propertyFullAddress: "",
    loanAmount: 0,
    delinquencyDate: new Date(),
  },
  statementFormValues: {
    propertyFullAddress: "",
    payments: [],
    balance: 0,
  },
  receiptFormValues: {
    description: "",
    payAmount: 0,
    payType: "cash",
  },
};

export const loanPaymentInitialValues: LoanPayment = {
  payDate: new Date(),
  payAmount: 0,
  payType: "cash",
};
