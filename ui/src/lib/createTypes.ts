export interface DelinquencyNoticeFormValues {
  propertyFullAddress: string;
  loanAmount: number;
  delinquencyDate: Date;
}

export type PayType = "cash" | "check" | "card";

export interface LoanPayment {
  payDate: Date;
  payAmount: number;
  payType: PayType;
  balance: number;
}

export interface StatementFormValues {
  propertyFullAddress: string;
  payments: LoanPayment[];
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
  },
  receiptFormValues: {
    description: "",
    payAmount: 0,
    payType: "cash",
  },
};
