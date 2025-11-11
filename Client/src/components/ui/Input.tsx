import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "subtle" | "error";
  inputSize?: "sm" | "md" | "lg";
  rightElement?: React.ReactNode;
  password?: boolean;
}

const Input: React.FC<InputProps> = ({
  variant = "default",
  inputSize = "md",
  password = false,
  rightElement,
  className,
  ...props
}) => {
  const [show, setShow] = useState(false);

  const base =
    "w-full rounded-lg text-white placeholder-zinc-500 transition-all focus:outline-none";

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-5 py-4 text-lg",
  };

  const variants = {
    default:
      "bg-zinc-950 border border-zinc-700 focus:ring-2 focus:ring-main-color-3 focus:border-transparent",
    subtle: "bg-zinc-900 border border-zinc-800 focus:border-emain-color-4",
    error: "bg-zinc-950 border border-red-500 focus:ring-2 focus:ring-red-600",
  };

  const type = password ? (show ? "text" : "password") : props.type;

  return (
    <div className="relative">
      <input
        {...props}
        type={type}
        className={clsx(
          base,
          sizes[inputSize],
          variants[variant],
          (password || rightElement) && "pr-12",
          className
        )}
      />

      {password && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-main-color-3 hover:text-main-color-4"
        >
          {show ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      )}

      {!password && rightElement && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default Input;
