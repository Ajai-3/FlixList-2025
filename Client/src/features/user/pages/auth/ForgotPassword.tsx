import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import FormError from "@/components/ui/FormError";
import React, { useState, useEffect } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLinkLine from "@/components/ui/AuthLinkLine";
import AuthPageWrapper from "../../components/auth/AuthPageWrapper";
import { useForgotPasswordMutation } from "../../hooks/auth/useForgotPasswordMutation";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "../../validation/auth/forgotPassword.shcema";
import CustomLoader from "@/components/CustomLoader";

const COOLDOWN_SECONDS = 120;

const ForgotPassword: React.FC = () => {
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useForgotPasswordMutation();

  const onSubmit = (data: ForgotPasswordInput) => {
    const identifier = data.identifier;
    forgotPasswordMutation.mutate(identifier, {
      onSuccess: (data) => {
        setServerError("")
        setMessage(data.message);
        startCooldown();
        reset();
      },
      onError: (error: any) => {
        setServerError(error.message || "Something went wrong");
      },
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("reset_email_cooldown");
    if (!saved) return;

    const expiresAt = parseInt(saved, 10);
    const remaining = Math.floor((expiresAt - Date.now()) / 1000);

    if (remaining > 0) setCooldown(remaining);
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((sec) => {
        if (sec - 1 <= 0) localStorage.removeItem("reset_email_cooldown");
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const startCooldown = () => {
    const expireTime = Date.now() + COOLDOWN_SECONDS * 1000;
    localStorage.setItem("reset_email_cooldown", expireTime.toString());
    setCooldown(COOLDOWN_SECONDS);
  };

  return (
    <AuthPageWrapper
      title="Forgot Password"
      error={serverError}
      subtitle=""
      linkText=""
      linkHref=""
      icon={<Mail className="w-8 h-8 text-main-color-3" />}
    >
      <p
        className={`${
          message ? "text-main-color-3" : "text-zinc-400"
        } text-sm mb-6 text-center`}
      >
        {message ? message : "Enter your email to receive reset instructions."}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-1">
            Email or Username
          </label>

          <Input
            type="text"
            placeholder="Enter your email or username"
            inputSize="sm"
            {...register("identifier")}
          />
          <FormError message={errors?.identifier?.message || ""} />
        </div>

        <Button
          variant="auth"
          size="sm"
          type="submit"
          disabled={
            cooldown > 0 ||
            Boolean(errors.identifier) ||
            forgotPasswordMutation.isPending
          }
          className={cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""}
        >
          {forgotPasswordMutation.isPending ? (
            <CustomLoader />
          ) : cooldown > 0 ? (
            `Resend in ${cooldown}s`
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      <AuthLinkLine
        text="Remember your password?"
        linkText="Sign in"
        linkTo="/auth/login"
      />
    </AuthPageWrapper>
  );
};

export default ForgotPassword;
