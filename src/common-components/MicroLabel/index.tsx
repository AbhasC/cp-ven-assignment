import type { MicroLabelProps } from "./types";

export const MicroLabel = ({ text, className = "" }: MicroLabelProps) => {
  return (
    <span
      className={`micro-label group relative inline-flex overflow-visible cursor-default items-center justify-center ${className}`}
    >
      <span
        aria-hidden="true"
        className="micro-label-halo pointer-events-none absolute -inset-7.5 z-0 rounded-[25%] bg-text"
      />
      <span
        className="relative text-[13px] md:text-[15px] lg:text-[17px] z-10 inline-block text-text-muted group-hover:text-text group-hover:scale-[1.1]"
        style={{ transition: "all 0.3s ease" }}
      >
        {text}
      </span>
    </span>
  );
};
