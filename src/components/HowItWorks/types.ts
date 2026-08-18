import type { RefObject } from "react";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type DNASequence = readonly string[];

export type DNASequenceProps = {
  sequence: string[];
  className?: string;
  sequenceRef: RefObject<HTMLSpanElement | null>;
};
