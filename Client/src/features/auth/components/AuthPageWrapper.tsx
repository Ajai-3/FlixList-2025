import React from "react";
import { Popcorn } from "lucide-react";
import FormError from "@/components/ui/FormError";
import AuthLinkLine from "@/components/ui/AuthLinkLine";

interface AuthPageProps {
  title: string;
  error: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const AuthPageWrapper: React.FC<AuthPageProps> = ({
  title,
  error,
  subtitle,
  linkText,
  linkHref,
  children,
  icon = <Popcorn className="w-8 h-8 text-main-color-3" />,
}) => {
  console.log(error);
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-4 sm:mb-4">
        <div className="flex items-center justify-center mb-2">
          {icon}
          <h1 className="text-4xl font-bold text-white ml-2">FlixList</h1>
        </div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <AuthLinkLine
          text={subtitle}
          linkText={linkText}
          linkTo={linkHref}
          mtClass="mt-1"
        />
      </div>

      <FormError className="text-center" message={error} size="lg" />

      <div className="px-8 py-4">{children}</div>
    </div>
  );
};

export default AuthPageWrapper;
