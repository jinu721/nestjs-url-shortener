import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import OtpVerificationForm from "../pages/OtpVerificationForm";
import HomePage from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import AuthGuardRoute from "./AuthGuardRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<AuthGuardRoute />}>
        <Route element={<AuthPage />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="verify-otp" element={<OtpVerificationForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
