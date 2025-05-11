import React, { useState } from "react";
import { motion } from "framer-motion";

const NavMenu: React.FC = () => {
    const [active, setActive] = useState("Home")

  const navLists: string[] = ["Home", "Movies", "Series", "Anime", "WatchList"];

  return (
    <div className="flex list-none text-md font-semibold gap-4">
      {navLists.map((item, i) => (
        <motion.li
        onClick={() => setActive(item)}
          key={i}
          className={`cursor-pointer  tracking-wider hover:text-main-color-2 ${active === item ? "text-main-color-2" : ""}`}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.1,
            delay: i * 0.1,
            type: "spring",
            stiffness: 200,
          }}
        >
          {item.toUpperCase()}
        </motion.li>
      ))}
    </div>
  );
};

export default NavMenu;
