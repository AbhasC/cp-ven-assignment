import type { QuestionConceptProps } from "./types";

export const QuestionConcept = ({ label }: QuestionConceptProps) => {
  return (
    <span className="question-concept group relative cursor-pointer font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted transition-colors duration-300 hover:text-text sm:text-xs md:text-sm">
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-text transition-transform scale-x-0 duration-300 group-hover:scale-x-100" />
    </span>
  );
};
