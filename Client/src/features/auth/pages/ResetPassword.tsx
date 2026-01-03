import { Shield } from "lucide-react";
import React, { useState } from "react";
import FormError from "@/components/ui/FormError";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLinkLine from "@/components/ui/AuthLinkLine";
import AuthPageWrapper from "@/features/auth/components/AuthPageWrapper";

const ResetPassword: React.FC = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwords.password || !passwords.confirmPassword) return;
    if (passwords.password !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

  };

  const isFormComplete =
    passwords.password.length > 0 && passwords.confirmPassword.length > 0;

  return (
    <AuthPageWrapper
      title="Reset your password"
      error=""
      subtitle=""
      linkText=""
      linkHref=""
      icon={<Shield className="w-8 h-8 text-emerald-500" />}
    >
      <p className="text-zinc-400 text-sm mb-6 text-center">
        Enter your new password below
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-1">
            Password
          </label>
          <Input
            type="password"
            password
            name="password"
            value={passwords.password}
            onChange={handleChange}
            placeholder="New Password"
            autoComplete="new-password"
            inputSize="sm"
          />
          <FormError message={false || ""} />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-1">
            Conform Password
          </label>
          <Input
            type="password"
            password
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            autoComplete="new-password"
            inputSize="sm"
          />
          <FormError message={false || ""} />
        </div>

        <Button
          variant="auth"
          size="sm"
          type="submit"
          disabled={!isFormComplete}
        >
          Reset Password
        </Button>
      </form>
      <AuthLinkLine
        text="Remembered your password?"
        linkText="Sign in"
        linkTo="/auth/login"
        mtClass="mt-4"
      />
    </AuthPageWrapper>
  );
};

export default ResetPassword;
