import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

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

  const handleResend = () => {
    if (cooldown > 0) return;
    console.log("Resending email to:", email);
    startCooldown();
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-main-color-3" />
          <h1 className="text-4xl font-bold text-white ml-2">FlixList</h1>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">Forgot Password</h2>
        <p className="text-zinc-400 text-sm">
          Enter your email to receive reset instructions.
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-200 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputSize="sm"
            />
          </div>

          <Button
            variant="auth"
            size="sm"
            type={cooldown > 0 ? "button" : "submit"}
            onClick={cooldown > 0 ? handleResend : undefined}
            disabled={cooldown > 0} // Disable button during cooldown
            className={cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""}
          >
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Send Reset Link"}
          </Button>
        </form>

        <div className="text-center mt-4 text-zinc-400 text-sm">
          Remember your password?{" "}
          <a
            href="/auth/login"
            className="font-semibold text-main-color-3 hover:text-emerald-600"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
