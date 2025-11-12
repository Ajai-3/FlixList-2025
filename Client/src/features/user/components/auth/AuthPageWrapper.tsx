import React from "react";
import { Link } from "react-router-dom";
import { Popcorn } from "lucide-react";

interface AuthPageProps {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const AuthPageWrapper: React.FC<AuthPageProps> = ({
  title,
  subtitle,
  linkText,
  linkHref,
  children,
  icon = <Popcorn className="w-8 h-8 text-main-color-3" />,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-4 sm:mb-10">
        <div className="flex items-center justify-center mb-4">
          {icon}
          <h1 className="text-4xl font-bold text-white ml-2">FlixList</h1>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-zinc-400 text-sm">
          {subtitle}{" "}
          <Link
            to={linkHref}
            className="font-semibold text-main-color-3 hover:text-main-color-4"
          >
            {linkText}
          </Link>
        </p>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
};

export default AuthPageWrapper;
