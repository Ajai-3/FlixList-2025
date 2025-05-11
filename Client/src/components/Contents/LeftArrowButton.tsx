import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface ButtonProps {
  onClick: () => void;
}

const LeftArrowButton: React.FC<ButtonProps> = ({ onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <>
      <button
        className="p-1 bg-gray-500/40 hover:bg-main-color-2 rounded-md cursor-pointer transition-colors duration-200"
        onClick={handleClick}
        aria-label="Scroll left"
      >
        <KeyboardArrowLeftIcon sx={{ fontSize: 34 }} />
      </button>
    </>
  );
};

export default LeftArrowButton;
