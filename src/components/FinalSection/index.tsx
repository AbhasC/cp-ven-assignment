import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MicroLabel } from "../../common-components/MicroLabel";
import { microcopyItems } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export const FinalSection = ({ isDummy = false }: { isDummy?: Boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const headingLines =
        headingRef.current?.querySelectorAll<HTMLElement>(".final-line");
      if (!headingLines) return;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const leftReveal = [eyebrowRef.current].filter(Boolean);
      const rightReveal = [
        ...Array.from(headingLines),
        statementRef.current,
        ctaRef.current,
        microcopyRef.current,
      ].filter(Boolean);
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
          headingLines,
          {
            xPercent: 0,
            stagger: 0.12,
          },
          0.05,
        )
        .to(
          statementRef.current,
          {
            xPercent: 0,
          },
          0.2,
        )
        .to(
          ctaRef.current,
          {
            xPercent: 0,
          },
          0.3,
        )
        .to(
          microcopyRef.current,
          {
            xPercent: 0,
          },
          0.35,
        );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-2 flex h-screen w-full items-center overflow-hidden px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16"
      id={isDummy ? "final-dummy" : "final"}
    >
      <div className="mx-auto flex w-full flex-col">
        <p
          ref={eyebrowRef}
          className="w-fit text-left font-mono text-xs font-semibold uppercase tracking-[0.24em] text-text-muted sm:text-sm sm:tracking-[0.28em] md:text-[15px]"
        >
          <MicroLabel text="THE FUTURE OF BIOTECHNOLOGY" />
        </p>
        <div className="mt-16 flex flex-col items-center text-center sm:mt-20 md:mt-24">
          <h2
            ref={headingRef}
            className="max-w-7xl font-display text-[clamp(4rem,10vw,10rem)] font-semibold leading-[0.85] tracking-[-0.06em]"
          >
            <span className="final-line block text-text">We can edit</span>
            <span className="final-line block text-text">life.</span>
          </h2>
          <div className="mt-12 max-w-4xl sm:mt-16 md:mt-20">
            <p
              ref={statementRef}
              className="font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.9] tracking-[-0.065em] text-text-muted"
            >
              Now we decide what comes next.
            </p>
          </div>
          <div className="mt-12 sm:mt-16 md:mt-20">
            <span
              ref={ctaRef}
              className="inline-flex w-fit items-center gap-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text sm:text-sm"
            >
              Appreciate the science
            </span>
          </div>
        </div>
        <p
          ref={microcopyRef}
          className="mt-16 ml-auto w-fit text-right font-mono text-xs font-semibold uppercase tracking-[0.28em] text-text-muted sm:mt-24 sm:text-sm"
        >
          {microcopyItems.map((item, index) => (
            <span key={index}>
              {index > 0 && <span aria-hidden="true"> · </span>}
              <MicroLabel text={item} />
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};
