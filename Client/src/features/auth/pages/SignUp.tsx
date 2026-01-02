import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormError from "@/components/ui/FormError";
import Input from "../../../../components/ui/Input";
import CustomLoader from "@/components/CustomLoader";
import Button from "../../../../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthPageWrapper from "../../components/auth/AuthPageWrapper";
import { useRegisterMutation } from "../../hooks/auth/useRegisterMutation";
import {
  RegisterInput,
  registerSchema,
} from "../../validation/auth/register.schema";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    registerMutation.mutate(data, {
      onSuccess: (_, variables) => {
        setServerError("");
        localStorage.setItem("pending_email", variables.email);
        // Set cooldown time to 60 seconds
        const expires = Date.now() + 60 * 1000;
        localStorage.setItem("otpCooldown", expires.toString());
        navigate("/auth/verify-otp");
      },
      onError: (error: any) => {
        setServerError(error.message || "Something went wrong");
      },
    });
  };

  return (
    <AuthPageWrapper
      title="Create your account"
      subtitle="Already have an account?"
      linkText="Sign in"
      linkHref="/auth/login"
      error={serverError}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-1">
            Name
          </label>
          <Input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            inputSize="sm"
          />
          <FormError message={errors.name?.message || ""} />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-1">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            inputSize="sm"
          />
          <FormError message={errors.email?.message || ""} />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-1">
            Password
          </label>
          <Input
            type="password"
            password
            placeholder="Create a password"
            {...register("password")}
            inputSize="sm"
          />
          <FormError message={errors.password?.message || ""} />
        </div>

        <Button variant="auth" size="sm" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? <CustomLoader /> : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-zinc-300 text-sm">
        Your details are safe with us.
      </p>
    </AuthPageWrapper>
  );
};

export default SignUp;
