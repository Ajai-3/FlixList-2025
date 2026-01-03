const AppLoader = () => {
  const letters = ["F", "L", "I", "X", "L", "I", "S", "T"];

  return (
    <div className="flex flex-col items-center justify-center h-screen text-main-color-3 overflow-hidden">
      <div className="flex space-x-1 mb-12">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="text-5xl font-bold relative animate-letter-pulse"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="w-64 h-1 bg-main-color-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-800 animate-bar-grow origin-left"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default AppLoader;
