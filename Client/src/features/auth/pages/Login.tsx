import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import FormError from "@/components/ui/FormError";
import Input from "../../../../components/ui/Input";
import CustomLoader from "@/components/CustomLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/ui/Button";
import Checkbox from "../../../../components/ui/Checkbox";
import AuthPageWrapper from "../../components/auth/AuthPageWrapper";
import { useLoginMutation } from "../../hooks/auth/useLoginMutation";
import { loginSchema, LoginInput } from "../../validation/auth/login.schema";

const Login: React.FC = () => {
  const [serverError, setServerError] = useState<string>("");
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setServerError("");
      },
      onError: (error: any) => {
        setServerError(error.message || "Something went wrong");
      },
    });
  };

  return (
    <AuthPageWrapper
      title="Welcome back"
      subtitle="New to FlixList?"
      linkText="Sign up"
      linkHref="/auth/signup"
      error={serverError}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-1">
            Email or username
          </label>
          <Input
            type="text"
            placeholder="Enter your email or username"
            {...register("identifier")}
            inputSize="sm"
          />
          <FormError message={errors.identifier?.message || ""} />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-1">
            Password
          </label>
          <Input
            type="password"
            password
            placeholder="Enter your password"
            {...register("password")}
            inputSize="sm"
          />
          <FormError message={errors.password?.message} />
        </div>

        <Button
          variant="auth"
          size="sm"
          type="submit"
          disabled={loginMutation.isPending}
          // className="flex justify-center items-center"
        >
          {loginMutation.isPending ? <CustomLoader /> : "Log in"}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-between text-zinc-300 text-sm">
        <Checkbox label="Remember me" variant="emerald" />
        <Link to="/auth/forgot-password" className="hover:text-emerald-500">
          Trouble logging in?
        </Link>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-center gap-4"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </Button>
      </div>

      <p className="mt-6 text-center text-zinc-300 text-sm">
        How we keep your movie data safe
      </p>
    </AuthPageWrapper>
  );
};

export default Login;
