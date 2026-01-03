import React, { useState } from "react";

const NavMenu: React.FC = () => {
    const [active, setActive] = useState("Home")

  const navLists: string[] = ["Home", "Movies", "Series", "Anime", "WatchList"];

  return (
    <div className="flex list-none text-md font-semibold gap-4">
      {navLists.map((item, i) => (
        <li
        onClick={() => setActive(item)}
          key={i}
          className={`cursor-pointer tracking-wider hover:text-main-color-2 hover:scale-110 transition-all duration-300 ${active === item ? "text-main-color-2" : ""} animate-slide-down`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {item.toUpperCase()}
        </li>
      ))}
    </div>
  );
};

export default NavMenu;
