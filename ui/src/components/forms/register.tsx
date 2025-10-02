export interface RegisterFormValues {
  username: string;
  password: string;
  password2: string;
  // avatar: File | undefined;
}

export interface RegisterFormProps {
  formValues: RegisterFormValues;
  setFormValues: (val: RegisterFormValues) => void;
}

export default function RegisterForm({
  formValues,
  setFormValues,
}: RegisterFormProps) {
  console.log(formValues, setFormValues);

  return <></>;
}
