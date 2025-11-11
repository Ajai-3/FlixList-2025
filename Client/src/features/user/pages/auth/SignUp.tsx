import React, { useState } from "react";
import { Popcorn } from "lucide-react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up data:", formData);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-4">
          <Popcorn className="w-8 h-8 text-emerald-500" />
          <h1 className="text-4xl font-bold text-white ml-2">FlixList</h1>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          Create your account
        </h2>
        <p className="text-zinc-400 text-sm">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="font-semibold text-emerald-500 hover:text-emerald-600"
          >
            Sign in
          </a>
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">
              Name
            </label>
            <Input
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              inputSize="sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              inputSize="sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">
              Password
            </label>
            <Input
              name="password"
              password
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              inputSize="sm"
            />
          </div>

          <Button variant="auth" size="sm">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
