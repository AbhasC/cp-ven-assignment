import type { ScaleStatProps } from "./types";

export const ScaleStat = ({ value, unit, description }: ScaleStatProps) => {
  return (
    <article className="scale-stat flex border-t border-text/15 py-10 sm:items-end sm:justify-between sm:gap-12 sm:py-14 lg:py-16">
      <div>
        <p className="font-display text-[clamp(4.5rem,10vw,10rem)] font-semibold leading-[0.75] tracking-[-0.04em] text-text">
          {value}
        </p>
        <p className="mt-4 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-text-muted sm:text-base">
          {unit}
        </p>
      </div>
      <p className="group relative mt-8 text-end font-body text-lg leading-[1.2] transition-colors duration-300 ease-out sm:mt-0 sm:text-xl md:text-2xl">
        <span className="relative inline text-text-muted group-hover:text-text duration-300">
          {description}
          <span className="absolute bottom-[-0.15em] left-0 h-px w-full origin-left scale-x-0 bg-text transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </span>
      </p>
    </article>
  );
};
