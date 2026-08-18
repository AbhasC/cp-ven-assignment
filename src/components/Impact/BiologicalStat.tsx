import type { BiologicalScaleProps } from "./types";

export const BiologicalStat = ({
  item,
  showArrow = true,
}: BiologicalScaleProps) => {
  return (
    <div className="flex items-center gap-x-3 sm:gap-x-5 md:gap-x-7">
      <span className="scale-item font-mono text-sm font-semibold uppercase tracking-[0.14em] text-text sm:text-base md:text-lg">
        {item}
      </span>
      {showArrow && (
        <span className="scale-item font-mono text-sm text-text-muted sm:text-base md:text-lg">
          →
        </span>
      )}
    </div>
  );
};
