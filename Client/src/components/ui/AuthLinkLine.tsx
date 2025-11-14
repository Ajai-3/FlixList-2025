import React from "react";
import { Link } from "react-router-dom";

interface AuthLinkLineProps {
  text: string; 
  linkText: string; 
  linkTo: string; 
  mtClass?: string; 
  className?: string; 
}

const AuthLinkLine: React.FC<AuthLinkLineProps> = ({
  text,
  linkText,
  linkTo,
  mtClass = "mt-4",
  className,
}) => {
  return (
    <p
      className={`text-zinc-400 text-sm text-center ${mtClass} ${
        className || ""
      }`}
    >
      {text}{" "}
      <Link
        to={linkTo}
        className="font-semibold text-main-color-3 hover:text-main-color-4"
      >
        {linkText}
      </Link>
    </p>
  );
};

export default AuthLinkLine;
