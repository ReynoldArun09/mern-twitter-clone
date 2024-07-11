import {
  AuthContainer,
  AuthContent,
  AuthFooter,
  AuthHeader,
} from "../../components/Auth";
import RegisterForm from "../../forms/register-form";

export default function RegisterPage() {
  return (
    <AuthContainer>
      <AuthHeader />
      <AuthContent>
        <RegisterForm />
        <AuthFooter type="register"/>
      </AuthContent>
    </AuthContainer>
  );
}
