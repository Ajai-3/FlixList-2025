import React from "react";
import clsx from "clsx";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "emerald" | "outline" | "subtle";
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  variant = "emerald",
  label,
  className,
  ...props
}) => {
  const base =
    "h-4 w-4 rounded appearance-none cursor-pointer transition focus:outline-none focus:ring-2";

  const variants = {
    emerald:
      "bg-zinc-900 border border-main-color-4 checked:bg-main-color-3 checked:border-main-color-3 focus:ring-main-color-3",

    outline:
      "bg-zinc-900 border border-zinc-600 checked:bg-zinc-700 checked:border-zinc-300 focus:ring-zinc-400",

    subtle:
      "bg-zinc-900 border border-zinc-800 checked:bg-zinc-800 checked:border-zinc-600 focus:ring-zinc-600",
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-zinc-200">
      <input
        type="checkbox"
        className={clsx(base, variants[variant], className)}
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
