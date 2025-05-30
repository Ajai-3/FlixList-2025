import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface ButtonProps {
  onClick: () => void;
}

const RightArrowButton: React.FC<ButtonProps> = ({ onClick }) => {
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
        aria-label="Scroll right"
      >
        <KeyboardArrowRightIcon sx={{ fontSize: 32 }} />
      </button>
    </>
  );
};

export default RightArrowButton;
