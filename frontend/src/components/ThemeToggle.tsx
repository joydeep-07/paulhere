import React from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../redux/themeSlice";
import type { RootState, AppDispatch } from "../redux/store";

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const mode = useSelector((state: RootState) => state.theme.mode);

  const isDark = mode === "dark";

  const handleToggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxDistanceX = Math.max(x, window.innerWidth - x);
    const maxDistanceY = Math.max(y, window.innerHeight - y);

    const endRadius = Math.hypot(maxDistanceX, maxDistanceY) * 1.15;

    if (!document.startViewTransition) {
      dispatch(toggleTheme());
      return;
    }

    const transition = document.startViewTransition(() => {
      dispatch(toggleTheme());
    });

    try {
      await transition.ready;

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1000,
          easing: "cubic-bezier(0.1, 0.9, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch {
      // Ignore transition errors
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {isDark ? <SunMedium size={22} /> : <MoonStar size={22} />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
