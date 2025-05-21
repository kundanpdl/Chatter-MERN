import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { authStore } from "./store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { themeStore } from "./store/themeStore";

const App = () => {
  // Destructure states from zustand store.
  const { authUser, checkUser, checkingAuth } = authStore();

  // Automatically checking users authentication status
  // as soon as the application is launched.
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const { theme } = themeStore();

  console.log("authuser:", authUser);

  if (checkingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/settings"
          element={
            authUser ? <SettingsPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={
            authUser ? <ProfilePage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
