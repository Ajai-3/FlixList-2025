import React from "react";

interface FormErrorProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const FormError: React.FC<FormErrorProps> = ({
  size = "sm",
  message = " ",
  className = "",
}) => {
  const minHeightClass = size === "lg" ? "min-h-[1.5rem]" : "min-h-[1rem]";

  return (
    <p
      className={`${sizeClasses[size]} text-red-500 mt-1 ${minHeightClass} ${className}`}
    >
      {message}
    </p>
  );
};

export default FormError;
