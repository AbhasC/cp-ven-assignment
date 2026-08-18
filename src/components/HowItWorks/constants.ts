import type { DNASequence, ProcessStep } from "./types";

export const topStart = ["G", "A", "T"];

export const topMid = ["C", "G", "A", "T"];

export const topEnd = ["C", "G", "A"];

export const bottomStart = ["C", "T", "A"];

export const bottomMid = ["G", "C", "T", "A"];

export const bottomEnd = ["G", "C", "T"];

export const topModified = ["G", "C", "T", "A"];

export const bottomModified = ["C", "G", "A", "T"];

export const GUIDE_SEQUENCE: DNASequence = ["G", "C", "T", "A"];

export const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Find",
    description:
      "A guide RNA is designed to recognize a specific DNA sequence.",
  },
  {
    number: "02",
    title: "Target",
    description:
      "The guide RNA directs the CRISPR protein to the matching DNA target.",
  },
  {
    number: "03",
    title: "Edit",
    description:
      "The DNA is cut or modified, depending on the editing system being used.",
  },
  {
    number: "04",
    title: "Rewrite",
    description:
      "Cellular repair or the editing machinery produces the intended genetic change.",
  },
];
