import { Mail } from "lucide-react";
import React, { useState, useEffect } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import AuthPageWrapper from "../../components/auth/AuthPageWrapper";

const COOLDOWN_SECONDS = 60;

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);

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
      setCooldown((sec) => sec - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const startCooldown = () => {
    const expireTime = Date.now() + COOLDOWN_SECONDS * 1000;
    localStorage.setItem("reset_email_cooldown", expireTime.toString());
    setCooldown(COOLDOWN_SECONDS);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Send reset link to:", email);
    startCooldown();
  };

  return (
    <AuthPageWrapper
      title="Forgot Password"
      subtitle=""
      linkText=""
      linkHref=""
      icon={<Mail className="w-8 h-8 text-main-color-3" />}
    >
      <p className="text-zinc-400 text-sm mb-6 text-center">
        Enter your email to receive reset instructions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-200 mb-2">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputSize="sm"
          />
        </div>

        <Button
          variant="auth"
          size="sm"
          type="submit"
          disabled={cooldown > 0}
          className={cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Send Reset Link"}
        </Button>
      </form>

      <p className="text-zinc-400 text-sm text-center mt-4">
        Remember your password?{" "}
        <a
          href="/auth/login"
          className="font-semibold text-main-color-3 hover:text-main-color-4"
        >
          Sign in
        </a>
      </p>
    </AuthPageWrapper>
  );
};

export default ForgotPassword;
