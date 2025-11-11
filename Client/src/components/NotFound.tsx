import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const NotFound = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      glow: number;
      twinkle: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 4 + 2;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.7 + 0.3,
        glow: Math.random() * 30 + 20,
        twinkle: Math.random() * 0.02,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        const twinkleOpacity =
          p.opacity + Math.sin(Date.now() * p.twinkle + i) * 0.3;

        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 4
        );
        gradient.addColorStop(0, `rgba(16, 185, 129, ${twinkleOpacity * 0.6})`);
        gradient.addColorStop(
          0.4,
          `rgba(5, 150, 105, ${twinkleOpacity * 0.4})`
        );
        gradient.addColorStop(1, `rgba(6, 78, 59, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(16, 185, 129, ${twinkleOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(110, 231, 183, ${twinkleOpacity * 1.2})`;
        ctx.beginPath();
        ctx.arc(
          p.x - p.size * 0.3,
          p.y - p.size * 0.3,
          p.size * 0.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-white px-4 select-none"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none -z-10"
      />

      <h1 className="relative text-9xl md:text-9xl lg:text-[12rem] font-black tracking-tighter bg-gradient-to-r from-main-color-3 via-main-color-4 to-main-color-3 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
        404
      </h1>

      <div className="mt-8 text-center space-y-4">
        <p className="text-2xl md:text-4xl font-light text-gray-300">
          Scene Not Found
        </p>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed">
          The reel you're looking for has been cut from the final edit. This
          page never made it to the big screen.
        </p>
        <p className="text-main-color-3 font-medium text-lg">
          Lights, camera,{" "}
          <span className="underline decoration-wavy">action</span> — back to
          the main feature!
        </p>
      </div>

      <Link
        to="/"
        className="group relative mt-10 px-8 py-4 bg-gradient-to-r from-main-color-3 to-main-color-4 rounded-full font-semibold text-white transition-all duration-300 hover:from-main-color-4 hover:to-main-color-3 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:scale-105 overflow-hidden"
      >
        <span className="relative z-10">Back to Home</span>
        <span className="absolute inset-0 rounded-full bg-main-color-3 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl"></span>
      </Link>

      <div className="fixed top-20 left-20 w-4 h-4 bg-main-color-3 rounded-full opacity-60 animate-ping shadow-lg"></div>
      <div
        className="fixed bottom-32 right-32 w-3 h-3 bg-main-color-4 rounded-full opacity-70 animate-ping shadow-2xl"
        style={{ animationDelay: "1.2s" }}
      ></div>
      <div
        className="fixed top-1/3 right-1/4 w-2 h-2 bg-main-color-3 rounded-full opacity-80 animate-ping"
        style={{ animationDelay: "2.4s" }}
      ></div>
      <div className="fixed bottom-1/4 left-1/3 w-5 h-5 bg-main-color-4 rounded-full opacity-30 animate-pulse blur-md"></div>
    </div>
  );
};

export default NotFound;