import type { CapabilityCardProps } from "./types";

export const CapabilityCard = ({
  title,
  description,
  ind,
}: CapabilityCardProps & { ind: number }) => {
  return (
    <article className="flex h-[62vh] w-[78vw] max-w-180 shrink-0 flex-col justify-between rounded-2xl border border-text/15 bg-surface/5 p-6 backdrop-blur-sm sm:h-[60vh] sm:w-[58vw] sm:p-8 lg:h-[62vh] lg:w-[42vw] lg:p-10">
      <div className="flex items-center justify-end">
        <span className="font-mono text-[10px] text-text-muted sm:text-xs">
          {`0${ind + 1}/04`}
        </span>
      </div>
      <div>
        <h3 className="max-w-xl font-display text-[clamp(2.25rem,4vw,4.5rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-text">
          {title}
        </h3>
        <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-text-muted sm:mt-6 sm:text-base lg:text-lg">
          {description}
        </p>
      </div>
      <div className="h-px w-full bg-text/10" />
    </article>
  );
};
