import { motion } from "framer-motion";

const AppLoader = () => {
  const letters = ["F", "L", "I", "X", "L", "I", "S", "T"];

  return (
    <div className="flex flex-col items-center justify-center h-screen text-main-color-3 overflow-hidden">
      <div className="flex space-x-1 mb-12">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-5xl font-bold relative"
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              color: [
                "rgba(255,255,255,0.3)",
                "var(--main-color-3)",
                "var(--main-color-3)",
              ],
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <div className="w-64 h-1 bg-main-color-4 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-zinc-800"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: 0 }}
        />
      </div>
    </div>
  );
};

export default AppLoader;
