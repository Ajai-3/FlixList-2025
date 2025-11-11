import { Shield } from "lucide-react";
import React, { useState, useEffect } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import AuthPageWrapper from "../../components/auth/AuthPageWrapper";

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const firstInput = document.querySelector<HTMLInputElement>("input[data-otp]");
    firstInput?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, "");
    
    if (val) {
      let newOtp = otp.split("");
      newOtp[index] = val;
      setOtp(newOtp.join(""));

      if (index < 5) {
        const inputs = document.querySelectorAll<HTMLInputElement>("input[data-otp]");
        inputs[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        let newOtp = otp.split("");
        newOtp[index] = "";
        setOtp(newOtp.join(""));
      } else if (index > 0) {
        let newOtp = otp.split("");
        newOtp[index - 1] = "";
        setOtp(newOtp.join(""));
        
        const inputs = document.querySelectorAll<HTMLInputElement>("input[data-otp]");
        inputs[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      const inputs = document.querySelectorAll<HTMLInputElement>("input[data-otp]");
      inputs[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      const inputs = document.querySelectorAll<HTMLInputElement>("input[data-otp]");
      inputs[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    
    if (paste) {
      setOtp(paste);
      
      setTimeout(() => {
        const inputs = document.querySelectorAll<HTMLInputElement>("input[data-otp]");
        const focusIndex = Math.min(paste.length, 5);
        inputs[focusIndex]?.focus();
      }, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      console.log("otp", otp)
    }
  };

  const isOTPComplete = otp.length === 6;

  return (
    <AuthPageWrapper
      title="Verify your account"
      subtitle=""
      linkText=""
      linkHref=""
      icon={<Shield className="w-8 h-8 text-emerald-500" />}
    >
      <p className="text-zinc-400 text-sm mb-6 text-center">
        Enter the 6-digit verification code sent to your email
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center gap-3">
          {Array.from({ length: 6 }).map((_, index) => {
            const value = otp[index] || "";
            return (
              <Input
                key={index}
                value={value}
                maxLength={1}
                inputSize="sm"
                className="text-center text-xl font-semibold"
                data-otp
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                autoComplete="one-time-code"
              />
            );
          })}
        </div>

        <Button 
          variant="auth" 
          size="sm" 
          type="submit"
          disabled={!isOTPComplete}
        >
          Verify Code
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-zinc-400 text-sm">
          Didn't receive the code?{" "}
          <button
            type="button"
            className="font-semibold text-emerald-500 hover:text-emerald-600"
          >
            Resend
          </button>
        </p>
      </div>
    </AuthPageWrapper>
  );
};

export default OTPPage;