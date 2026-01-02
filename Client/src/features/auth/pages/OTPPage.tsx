import { Shield } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormError from "@/components/ui/FormError";
import Input from "../../../../components/ui/Input";
import CustomLoader from "@/components/CustomLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/ui/Button";
import { useOtpMutation } from "../../hooks/auth/useOtpMutation";
import AuthPageWrapper from "../../components/auth/AuthPageWrapper";
import { otpSchema, OtpInput } from "../../validation/auth/otp.schema";
import { useResendOtpMutation } from "../../hooks/auth/useResendOtpMutation";

const OTPPage: React.FC = () => {
  const otpMutation = useOtpMutation();
  const resendMutation = useResendOtpMutation();
  const [cooldown, setCooldown] = React.useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
  });

  const otpValues = watch();

  // run timer if cooldown > 0
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((c) => {
        const next = c - 1;
        if (next <= 0) localStorage.removeItem("otpCooldown");
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  useEffect(() => {
    const saved = localStorage.getItem("otpCooldown");
    if (saved) {
      const expires = Number(saved);
      const remaining = Math.floor((expires - Date.now()) / 1000);
      if (remaining > 0) setCooldown(remaining);
    }
  }, []);

  useEffect(() => {
    const firstInput =
      document.querySelector<HTMLInputElement>("input[data-otp]");
    firstInput?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value.replace(/\D/g, ""); // only digits
    const fieldName = `otp${index + 1}` as keyof OtpInput;
    setValue(fieldName, val, { shouldValidate: true });

    if (val && index < 5) {
      const inputs =
        document.querySelectorAll<HTMLInputElement>("input[data-otp]");
      inputs[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputs =
      document.querySelectorAll<HTMLInputElement>("input[data-otp]");
    if (e.key === "Backspace") {
      const fieldName = `otp${index + 1}` as keyof OtpInput;
      if (otpValues[fieldName]) {
        setValue(fieldName, "", { shouldValidate: true });
      } else if (index > 0) {
        const prevField = `otp${index}` as keyof OtpInput;
        setValue(prevField, "", { shouldValidate: true });
        inputs[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) inputs[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) inputs[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    paste.split("").forEach((char, i) => {
      const fieldName = `otp${i + 1}` as keyof OtpInput;
      setValue(fieldName, char, { shouldValidate: true });
    });
    const inputs =
      document.querySelectorAll<HTMLInputElement>("input[data-otp]");
    inputs[Math.min(paste.length, 5)]?.focus();
  };

  const handleResend = () => {
    if (cooldown > 0) return;

    const email = localStorage.getItem("pending_email");
    if (!email) {
      console.error("No email found for resend OTP");
      return;
    }

    resendMutation.mutate(email, {
      onSuccess: () => {
        const expiry = Date.now() + 60 * 1000;
        localStorage.setItem("otpCooldown", expiry.toString());
        setCooldown(60);
      },
    });
  };

  const onSubmit = (data: OtpInput) => {
    const otp = Object.values(data).join("");
    otpMutation.mutate(otp);
  };

  const formError = errors.root?.message || Object.values(errors)?.[0]?.message;

  return (
    <AuthPageWrapper
      title="Verify your account"
      subtitle="Remember your password?"
      linkText="Sign in"
      linkHref="/auth/login"
      error=""
      icon={<Shield className="w-8 h-8 text-main-color-3" />}
    >
      <p className="text-zinc-400 text-sm mb-6 text-center">
        Enter the 6-digit verification code sent to your email
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center gap-2">
          {Array.from({ length: 6 }).map((_, index) => {
            const fieldName = `otp${index + 1}` as keyof OtpInput;
            const isError = !!errors[fieldName];
            return (
              <Input
                key={index}
                {...register(fieldName)}
                maxLength={1}
                className="w-8 h-12 text-center"
                inputSize="sm"
                data-otp
                variant={isError ? "error" : "default"}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                autoComplete="one-time-code"
              />
            );
          })}
        </div>
        <FormError message={formError} />

        <Button
          variant="auth"
          size="sm"
          type="submit"
          className="mt-6"
          disabled={
            otpMutation.isPending || Object.values(otpValues).some((v) => !v)
          }
        >
          {otpMutation.isPending ? <CustomLoader /> : "Verify Code"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-zinc-400 text-sm">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || resendMutation.isPending}
            className={`font-semibold ${
              cooldown > 0
                ? "text-zinc-500 cursor-not-allowed"
                : "text-emerald-500 hover:text-emerald-600"
            }`}
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
          </button>
        </p>
      </div>
    </AuthPageWrapper>
  );
};

export default OTPPage;
