export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginFormProps {
  formValues: LoginFormValues;
  setFormValues: (val: LoginFormValues) => void;
}

export default function LoginForm({
  formValues,
  setFormValues,
}: LoginFormProps) {
  console.log(formValues, setFormValues);
  return <></>;
}
