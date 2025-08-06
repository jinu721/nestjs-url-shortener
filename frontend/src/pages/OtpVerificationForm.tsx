import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";

interface OtpVerificationProps {
  email: string;
  onOtpVerified: () => void;
  onResendOtp: () => void;
}

const OtpVerificationForm: React.FC<OtpVerificationProps> = ({
  email,
  onOtpVerified,
  onResendOtp,
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await new Promise((res) => setTimeout(res, 1000)); // Fake API call
      onOtpVerified(); // Success
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendTimer(60);
    setOtp("");
    setError("");
    onResendOtp();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
        <p className="text-gray-600 mt-2">
          Enter the 6-digit OTP sent to <strong>{email}</strong>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="OTP"
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          error={error}
          placeholder="Enter 6-digit OTP"
          icon={Lock}
        />

        <Button type="submit" loading={loading} className="w-full" size="lg">
          Verify OTP
        </Button>

        <div className="text-center text-sm text-gray-600">
          {resendTimer > 0 ? (
            <span>
              Resend OTP in <strong>{resendTimer}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OtpVerificationForm;
