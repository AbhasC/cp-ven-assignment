import type { HistoryItemProps } from "./types";

export const HistoryItem = ({ text }: HistoryItemProps) => {
  return (
    <p className="history-item group relative w-fit cursor-default font-display text-lg font-medium tracking-[-0.03em] text-text-muted transition-all duration-300 ease-in-out hover:scale-[1.04] hover:text-text sm:text-xl md:text-2xl">
      <span className="pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-[50%] bg-text opacity-0 blur-md transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-[0.08]" />
      <span className="relative z-10 after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-all after:duration-300 after:ease-in-out group-hover:after:scale-x-100">
        {text}
      </span>
    </p>
  );
};
