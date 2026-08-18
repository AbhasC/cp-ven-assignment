import type { DNASequenceProps } from "./types";

export const DNASequenceMapper = ({
  sequence,
  className = "",
  sequenceRef,
}: DNASequenceProps) => {
  return (
    <span ref={sequenceRef} className={`grid ${className}`}>
      {sequence.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="sequence-base flex h-10 items-center justify-center border-b border-text/15 font-mono text-sm font-semibold text-text sm:h-12 sm:text-base lg:h-14 lg:text-lg"
        >
          {letter}
        </span>
      ))}
    </span>
  );
};
