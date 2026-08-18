import { type Icon } from "@phosphor-icons/react";
import type { RefObject } from "react";

export const IconStickySection = ({
  elemRef,
  Icon,
}: {
  elemRef: RefObject<HTMLSpanElement | null>;
  Icon: Icon;
}) => {
  return (
    <span
      ref={elemRef}
      className="flex relative w-full max-w-35 sm:max-w-50 aspect-square rounded-full icon-sticker-cont"
    >
      <span className="flex absolute top-0 left-0 rounded-full w-full h-full border-4 border-border-dna icon-sticker-halo z-0" />
      <span className="flex relative w-full h-full rounded-full border-4 border-border-dna overflow-clip z-1 transform duration-300 hover:scale-[1.1] bg-bg">
        <span className="flex flex-col gap-3 z-0">
          {Array.from({ length: 10 }).map((_, ind) => {
            return (
              <span key={ind} className="flex gap-3 items-center">
                <span
                  className={`flex h-[10px] shrink-0 rounded-full bg-text ${ind % 2 === 0 ? `w-[50px]` : `w-[30px]`}`}
                />
                <span
                  className={`flex h-[10px] shrink-0 rounded-full bg-text ${ind % 2 === 1 ? `w-[50px]` : `w-[30px]`}`}
                />
                <span
                  className={`flex h-[10px] shrink-0 rounded-full bg-text ${ind % 2 === 0 ? `w-[50px]` : `w-[30px]`}`}
                />
                <span
                  className={`flex h-[10px] shrink-0 rounded-full bg-text ${ind % 2 === 1 ? `w-[50px]` : `w-[30px]`}`}
                />
                <span
                  className={`flex h-[10px] shrink-0 rounded-full bg-text ${ind % 2 === 0 ? `w-[50px]` : `w-[30px]`}`}
                />
                <span
                  className={`flex h-[10px] shrink-0 rounded-full bg-text ${ind % 2 === 1 ? `w-[50px]` : `w-[30px]`}`}
                />
              </span>
            );
          })}
        </span>
        <span className="absolute z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 sm:p-4 bg-bg rounded-full border-4 border-border-dna-strong">
          <Icon className="text-text w-10 h-10 sm:w-12 sm:h-12" />
        </span>
      </span>
    </span>
  );
};
