import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner";
import useAuth from "./hooks/useAuth";

const HomePage = lazy(() => import("./pages/Home/home-page"));
const RegisterPage = lazy(() => import("./pages/Auth/register-page"));
const LoginPage = lazy(() => import("./pages/Auth/login-page"));

export default function App() {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </main>
    );
  }

  return (
    <main>
      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!isAuth ? <RegisterPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!isAuth ? <LoginPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Suspense>
    </main>
  );
}
