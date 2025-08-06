import { Routes, Route } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import OtpVerificationForm from "../pages/OtpVerificationForm";
import HomePage from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/otp-verification" element={<OtpVerificationForm />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};


export default AppRoutes;