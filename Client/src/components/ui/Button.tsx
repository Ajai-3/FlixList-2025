import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "auth" | "outline" | "subtle";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = true,
  disabled,
  className,
  children,
  ...props
}) => {
  const base =
    "flex justify-center items-center rounded-lg font-semibold transition-all focus:outline-none active:scale-[0.98]";

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-5 py-4 text-base",
  };

  const variants = {
    primary: "bg-main-color-4 text-white hover:bg-emerald-500",

    auth: "bg-emerald-500 text-white hover:bg-main-color-4 shadow-lg hover:shadow-emerald-500/50 cursor-pointer",

    outline:
      "border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10",

    subtle:
      "bg-zinc-900 text-emerald-400 border border-zinc-700 hover:bg-zinc-800",
  };

  const disabledStyles =
    "opacity-50 cursor-not-allowed hover:none active:scale-100 shadow-none";

  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        fullWidth && "w-full",
        disabled && disabledStyles,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
