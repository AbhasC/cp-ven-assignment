import type { Proof } from "./types";

export const ProofCard = ({ proof, ind }: { proof: Proof; ind: number }) => {
  return (
    <article className="proof-card group min-h-64 cursor-default bg-surface/40 px-6 py-7 opacity-70 transition-all duration-500 hover:bg-surface hover:opacity-100 sm:min-h-72 sm:px-8 sm:py-9 lg:min-h-80 lg:px-10 lg:py-10">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-6">
          <span className="proof-number font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text-muted sm:text-sm">
            {`0${ind + 1}`}
          </span>
          <span className="proof-category font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted sm:text-xs">
            {proof.category}
          </span>
        </div>
        <p className="proof-content mt-16 max-w-xl font-display text-2xl font-medium leading-[1.05] tracking-[-0.035em] text-text sm:mt-20 sm:text-3xl lg:text-4xl">
          {proof.content}
        </p>
      </div>
    </article>
  );
};
