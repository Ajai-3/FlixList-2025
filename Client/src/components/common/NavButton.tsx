import React from 'react';

interface NavButtonProps {
  name: string;
  bgColor: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ name, bgColor }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold tracking-wider text-md mx-1 ${bgColor ? "bg-main-color-2 text-white" : "bg-transparent text-main-color-2"} transition-transform duration-200 hover:scale-110 active:scale-95 animate-slide-down`}
    >
      {name}
    </button>
  );
};

export default NavButton;
