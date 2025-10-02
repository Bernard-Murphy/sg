import LoginForm, { type LoginFormValues } from "./forms/login";
import RegisterForm, { type RegisterFormValues } from "./forms/register";

export interface AuthModalProps {
  authModalForm: "login" | "register";
  authModalShown: boolean;
  loginFormValues: LoginFormValues;
  setLoginFormValues: (val: LoginFormValues) => void;
  registerFormValues: RegisterFormValues;
  setRegisterFormValues: (val: RegisterFormValues) => void;
}

export default function AuthModal({
  authModalForm,
  authModalShown,
  loginFormValues,
  setLoginFormValues,
  registerFormValues,
  setRegisterFormValues,
}: AuthModalProps) {
  console.log(authModalShown);
  return (
    <>
      {authModalForm === "login" ? (
        <LoginForm
          formValues={loginFormValues}
          setFormValues={setLoginFormValues}
        />
      ) : (
        <RegisterForm
          formValues={registerFormValues}
          setFormValues={setRegisterFormValues}
        />
      )}
    </>
  );
}
