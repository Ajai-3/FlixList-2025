import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Popcorn } from "lucide-react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import Checkbox from "../../../../components/ui/Checkbox";

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
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-4">
          <Popcorn className="w-8 h-8 text-main-color-3" />
          <h1 className="text-4xl font-bold text-white ml-2">FlixList</h1>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-zinc-400 text-sm">
          New to FlixList?{" "}
          <a
            href="/auth/signup"
            className="font-semibold text-main-color-3 hover:text-main-color-4"
          >
            Sign up
          </a>
        </p>
      </div>

      {/* Form */}
      <div className="p-8 shadow-md">
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
            <div className="relative">
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
          </div>

          <Button variant="auth" size="sm">
            Log in
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between text-zinc-300 text-sm">
          <Checkbox label="Remember me" variant="emerald" />

          <a href="/auth/forgot-password" className="hover:text-main-color-3">
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
      </div>

      <p className="mt-6 text-center text-zinc-300 text-sm">
        How we keep your movie data safe
      </p>
    </div>
  );
};

export default Login;
