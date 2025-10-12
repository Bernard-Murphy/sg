import * as y from "yup";

/**
 * These functions are the yup validations for the request bodies of all the endpoints that have them.
 *
 * https://yup-docs.vercel.app/docs/intro
 */

export const login_schema = y.object().shape({
  username: y
    .string()
    .max(1024, "Invalid username or password")
    .required("Please enter a username"),
  password: y
    .string()
    .max(1024, "Invalid username or password")
    .required("Please enter a password"),
});

export const register_schema = y.object().shape({
  username: y
    .string()
    .min(4, "Username is too short (Min: 4 chars)")
    .max(32, "Username is too long (Max: 32 chars)")
    .matches(/^[a-zA-Z0-9-_]+$/, "Username must be alphanumeric")
    .required("Please enter a username"),
  password: y
    .string()
    .max(32, "Password is too long (Max: 32 chars)")
    .required("Please enter a password"),
  password2: y.string().oneOf([y.ref("password")], "Passwords do not match"),
});

export const delinquency_notice_schema = y.object().shape({
  propertyFullAddress: y
    .string()
    .max(528, "Property address is too long (Max: 512 chars")
    .required("Please enter a property address"),
  loanAmount: y
    .number()
    .min(1, "Loan amount must be greater than zero")
    .max(9999999999, "Please enter a smaller loan amount")
    .required("Please enter a loan amount"),
  delinquencyDate: y.date().required("Please enter a delinquency date"),
});

export const loan_payment_schema = y.object().shape({
  payDate: y.date().required("Please enter a pay date"),
  payAmount: y
    .number()
    .min(1, "Pay amount must be greater than zero")
    .max(9999999999, "Please enter a smaller pay amount")
    .required("Please enter a pay amount"),
  payType: y
    .string()
    .oneOf(["cash", "check", "card"], "Invalid payment type")
    .required(),
});

export const statement_schema = y.object().shape({
  propertyFullAddress: y
    .string()
    .max(528, "Property address is too long (Max: 512 chars")
    .required("Please enter a property address"),
  payments: y
    .array()
    .of(loan_payment_schema)
    .min(1, "Please enter at least 1 payment")
    .max(50, "Too many payments (Max: 50)")
    .required(),
  balance: y
    .number()
    .min(0)
    .max(9999999999, "Please enter a lower balance")
    .required(),
});

export const receipt_schema = y.object().shape({
  description: y
    .string()
    .max(1024, "Please enter a shorter description")
    .required("Please enter a description"),
  payAmount: y
    .number()
    .min(1, "Pay amount must be greater than zero")
    .max(9999999999, "Please enter a smaller pay amount")
    .required("Please enter a pay amount"),
  payType: y.string().oneOf(["cash", "check", "card"], "Invalid payment type"),
});
