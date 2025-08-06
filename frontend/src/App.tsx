import "./App.css";
import HomePage from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import OtpVerificationForm from "./pages/OtpVerificationForm";
import RegisterForm from "./pages/RegisterForm";

function App() {
  return (
    // <RegisterForm onRegisterSuccess={(email: string) => console.log(email)} onSwitchToLogin={() => console.log('switch to login')} />
    // <LoginForm onLoginSuccess={(email: string) => console.log(email)} onSwitchToRegister={() => console.log('switch to register')} />
    // <OtpVerificationForm email="kk@gmail.com" onOtpVerified={() => console.log("otp verified")} onResendOtp={() => console.log("resend otp")} />
    <HomePage />
  );
}

export default App;
