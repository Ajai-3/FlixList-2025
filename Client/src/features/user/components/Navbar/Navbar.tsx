import React from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import NavButton from "./NavButton";
import NavInput from "./NavInput";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-2 sm:px-10 md:px-20 py-2 pt-4 z-50">
      <div className="flex gap-20 items-center">
        <Logo />
         <NavMenu />
      </div>

     
      <div className="flex gap-4 items-center">
        <NavInput />
        <NavButton name={"SIGN IN"} bgColor={false} />
        <NavButton name={"SIGN UP"} bgColor={true} />
      </div>
    </div>
  );
};

export default Navbar;
