import {
  AuthContainer,
  AuthContent,
  AuthFooter,
  AuthHeader,
} from "../../components/Auth";
import LoginForm from "../../forms/login-form";

export default function LoginPage() {
  return (
    <AuthContainer>
      <AuthHeader />
      <AuthContent>
        <LoginForm />
        <AuthFooter type="login" />
      </AuthContent>
    </AuthContainer>
  );
}
