import type { PossibilityCardProps } from "./types";

export const PossibilityCard = ({
  ind,
  title,
  label,
}: PossibilityCardProps & { ind: number }) => {
  return (
    <article
      className="flex h-screen w-[88vw] shrink-0 flex-col justify-between border-2 border-text/10 px-6 py-12 sm:w-[72vw] sm:px-10 sm:py-16 lg:w-[58vw] lg:px-16 lg:py-20"
      key={ind}
    >
      <div className="flex items-start justify-between gap-8">
        <span className="font-mono text-xs font-medium tracking-[0.2em] text-text-muted sm:text-sm">
          {`0${ind + 1}`}
        </span>
        <span className="max-w-45 text-right font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-text-muted sm:max-w-none sm:text-xs sm:tracking-[0.22em]">
          {label}
        </span>
      </div>
      <h3 className="max-w-5xl font-display text-[clamp(2.75rem,5vw,6rem)] font-semibold leading-[1.1] tracking-[-0.065em] text-text">
        {title}
      </h3>
      <div className="h-px w-full bg-text/10" />
    </article>
  );
};
