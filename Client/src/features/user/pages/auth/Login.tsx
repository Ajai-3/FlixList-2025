import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import Checkbox from "../../../../components/ui/Checkbox";
import AuthPageWrapper from "../../components/auth/AuthPageWrapper";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <AuthPageWrapper
      title="Welcome back"
      subtitle="New to FlixList?"
      linkText="Sign up"
      linkHref="/auth/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-2">
            Your email address
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            inputSize="sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-2">
            Your password
          </label>
          <Input
            name="password"
            type="password"
            password
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            inputSize="sm"
          />
        </div>

        <Button variant="auth" size="sm">
          Log in
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-between text-zinc-300 text-sm">
        <Checkbox label="Remember me" variant="emerald" />
        <a href="/auth/forgot-password" className="hover:text-emerald-500">
          Trouble logging in?
        </a>
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
