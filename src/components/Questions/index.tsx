import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QUESTION_CONCEPTS } from "./constants";
import { QuestionConcept } from "./QuestionConcept";
import { MicroLabel } from "../../common-components/MicroLabel";
import { IconStickySection } from "../../common-components/IconStickySection";
import { QuestionMarkIcon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export const Questions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const firstQuestionRef = useRef<HTMLHeadingElement>(null);
  const secondQuestionRef = useRef<HTMLHeadingElement>(null);
  const conceptsRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const concepts =
        conceptsRef.current?.querySelectorAll<HTMLElement>(".question-concept");
      if (!concepts?.length) return;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const leftReveal = [
        eyebrowRef.current,
        firstQuestionRef.current,
        secondQuestionRef.current,
        conceptsRef.current,
      ].filter(Boolean);
      const rightReveal = [stickerRef.current].filter(Boolean);
      if (prefersReducedMotion) {
        gsap.set([...leftReveal, ...rightReveal], {
          xPercent: 0,
          clearProps: "transform",
        });
        return;
      }
      gsap.set(leftReveal, {
        xPercent: -100,
        willChange: "transform",
      });
      gsap.set(rightReveal, {
        xPercent: 100,
        willChange: "transform",
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
          defaults: {
            duration: 0.9,
            ease: "power3.out",
          },
        })
        .to(
          leftReveal,
          {
            xPercent: 0,
          },
          0,
        )
        .to(
          rightReveal,
          {
            xPercent: 0,
          },
          0,
        );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-2 w-full overflow-clip px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-18 lg:px-16 lg:py-20"
      id="questions"
    >
      <div className="mx-auto w-full max-w-400">
        <div className="flex w-full flex-col gap-12 lg:flex-row-reverse lg:gap-16">
          <div className="flex h-fit flex-col gap-12 lg:sticky lg:top-20">
            <IconStickySection Icon={QuestionMarkIcon} elemRef={stickerRef} />
          </div>
          <div className="min-w-0 flex-1">
            <p
              ref={eyebrowRef}
              className="w-fit font-mono text-xs font-semibold uppercase tracking-[0.24em] text-text-muted sm:text-sm sm:tracking-[0.28em] md:text-[15px]"
            >
              <MicroLabel text="THE QUESTION" />
            </p>
            <div className="mt-20 text-left sm:mt-28 md:mt-36">
              <h2
                ref={firstQuestionRef}
                className="max-w-6xl font-display text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.82] tracking-[-0.06em] text-text-muted"
              >
                If biology becomes
                <br />
                programmable...
              </h2>
              <h3
                ref={secondQuestionRef}
                className="mt-12 max-w-5xl font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-text sm:mt-16 md:mt-20"
              >
                What will we choose
                <br />
                to create?
              </h3>
            </div>
            <div
              ref={conceptsRef}
              className="mt-20 flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-4 sm:mt-28 sm:gap-x-10 sm:gap-y-6 md:mt-36 md:gap-x-14"
            >
              {QUESTION_CONCEPTS.map((label, index) => (
                <QuestionConcept key={label} label={label} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
