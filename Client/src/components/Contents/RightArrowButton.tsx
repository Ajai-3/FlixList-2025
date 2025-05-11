import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const RightArrowButton: React.FC = () => {
  return (
    <>
      <button className="p-1 bg-gray-500/40 rounded-md">
        <KeyboardArrowRightIcon sx={{ fontSize: 34 }} />
      </button>
    </>
  );
};

export default RightArrowButton;
