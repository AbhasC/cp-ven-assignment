import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "../../hooks/useAppTheme";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="group fixed right-4 top-4 z-3 flex size-11 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-surface/80 text-text shadow-lg shadow-black/5 backdrop-blur-md transform transition-all duration-300 hover:-translate-y-0.5 hover:border-text/30 hover:bg-surface hover:shadow-xl hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:translate-y-0 active:scale-95 active:shadow-md sm:right-6 sm:top-6"
      onClick={() => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      }}
    >
      <span className="relative flex size-5 items-center justify-center">
        {theme === "light" ? (
          <SunIcon
            size={20}
            weight="regular"
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        ) : (
          <MoonStarsIcon
            size={20}
            weight="regular"
            className="transition-transform duration-300 group-hover:-rotate-12"
          />
        )}
      </span>
    </button>
  );
};
