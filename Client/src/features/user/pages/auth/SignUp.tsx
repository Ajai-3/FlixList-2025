import React, { useState } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import AuthPageWrapper from "../../components/auth/AuthPageWrapper";

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
    <AuthPageWrapper
      title="Create your account"
      subtitle="Already have an account?"
      linkText="Sign in"
      linkHref="/auth/login"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-2">
            Name
          </label>
          <Input
            name="name"
            placeholder="Enter your name"
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
            placeholder="Enter your email"
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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            inputSize="sm"
          />
        </div>

        <Button variant="auth" size="sm">
          Create Account
        </Button>
      </form>
    </AuthPageWrapper>
  );
};

export default SignUp;
