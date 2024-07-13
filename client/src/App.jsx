import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner";
import useAuth from "./hooks/useAuth";

const HomePage = lazy(() => import("./pages/Home/home-page"));
const RegisterPage = lazy(() => import("./pages/Auth/register-page"));
const LoginPage = lazy(() => import("./pages/Auth/login-page"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const RightPanel = lazy(() => import("./components/RightPanel"));
const NotificationPage = lazy(() =>
  import("./pages/Notification/notification-page")
);
const ProfilePage = lazy(() => import("./pages/Profile/profile-page"));

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
    <main className="flex max-w-6xl mx-auto">
      <Suspense fallback={<div className="h-screen flex m-auto"><LoadingSpinner size="lg" /></div>}>
        {isAuth && <Sidebar />}
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
          <Route
            path="/notification"
            element={isAuth ? <NotificationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
        {isAuth && <RightPanel />}
      </Suspense>
    </main>
  );
}
