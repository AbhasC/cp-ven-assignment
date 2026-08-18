import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MicroLabel } from "../../common-components/MicroLabel";
import { historyItems } from "./constants";
import { HistoryItem } from "./HistoryItem";
import { IconStickySection } from "../../common-components/IconStickySection";
import { CodeIcon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export const Breakthrough = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const stickerRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const changeRef = useRef<HTMLHeadingElement>(null);
  const breakthroughRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const leftReveal = [eyebrowRef.current, stickerRef.current];
      const rightReveal = [
        headingRef.current,
        historyRef.current,
        changeRef.current,
        breakthroughRef.current,
        finalRef.current,
      ];
      if (prefersReducedMotion) {
        gsap.set([...leftReveal, ...rightReveal], {
          xPercent: 0,
          clearProps: "transform",
        });
        return;
      }
      gsap.set(leftReveal, {
        xPercent: -100,
      });
      gsap.set(rightReveal, {
        xPercent: 100,
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
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
      gsap.to(headingRef.current, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(historyRef.current, {
        yPercent: -2,
        ease: "none",
        scrollTrigger: {
          trigger: historyRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(changeRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: changeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(breakthroughRef.current, {
        yPercent: -2,
        ease: "none",
        scrollTrigger: {
          trigger: breakthroughRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(finalRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: finalRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-2 min-h-screen w-full overflow-clip px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-18 lg:px-16 lg:py-20"
      id="breakthrough"
    >
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 items-start gap-14 sm:gap-20 lg:grid-cols-[0.7fr_1.9fr] lg:gap-24">
          <div className="flex h-fit flex-col gap-12 lg:sticky lg:top-[80px]">
            <p
              ref={eyebrowRef}
              className="w-fit font-mono text-xs font-semibold uppercase tracking-[0.24em] text-text-muted sm:text-sm sm:tracking-[0.28em] md:text-[15px]"
            >
              <MicroLabel text="THE BREAKTHROUGH" />
            </p>
            <IconStickySection Icon={CodeIcon} elemRef={stickerRef} />
          </div>
          <div className="min-w-0">
            <div className="overflow-hidden">
              <h2
                ref={headingRef}
                className="max-w-5xl font-display text-[clamp(3.25rem,10vw,8rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-text sm:text-[clamp(4rem,8vw,8rem)] md:text-[clamp(5rem,7vw,8rem)]"
              >
                For most of history,
                <br />
                genes were untouchable.
              </h2>
            </div>
            <div
              ref={historyRef}
              className="mt-10 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-5 sm:mt-14 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-6 lg:mt-16"
            >
              {historyItems.map((item, index) => (
                <HistoryItem text={item} key={index} />
              ))}
            </div>
            <div className="mt-16 overflow-hidden sm:mt-20 md:mt-24 lg:mt-28">
              <h3
                ref={changeRef}
                className="max-w-5xl font-space text-[clamp(3.75rem,8vw,7rem)] font-bold leading-[0.8] tracking-[-0.075em] text-text sm:text-[clamp(4.5rem,7vw,7rem)]"
              >
                But we couldn't alter it.
              </h3>
            </div>
            <div className="mt-16 sm:mt-20 md:mt-24">
              <div
                ref={breakthroughRef}
                className="border-t border-text/15 pt-6 sm:pt-8"
              >
                <h3 className="mt-4 font-display text-[clamp(3.25rem,9vw,7rem)] font-semibold leading-[0.82] tracking-[-0.07em] text-text sm:mt-5">
                  CRISPR changed that.
                </h3>
                <p className="mt-6 max-w-3xl font-body text-lg leading-[1.55] text-text-muted sm:mt-7 sm:text-xl md:text-2xl">
                  CRISPR began as a defense mechanism in bacteria. Scientists
                  learned to repurpose it into a programmable system for
                  targeting and editing DNA.
                </p>
                <p className="mt-5 max-w-3xl font-body text-xl font-semibold leading-[1.4] tracking-[-0.02em] text-text sm:mt-6 sm:text-2xl md:text-3xl">
                  A system evolved by bacteria became a tool for rewriting
                  genomes.
                </p>
              </div>
            </div>
            <div className="mt-12 overflow-hidden sm:mt-16 md:mt-20">
              <p
                ref={finalRef}
                className="max-w-4xl font-display text-2xl font-medium leading-[1.05] tracking-[-0.04em] text-text sm:text-3xl md:text-4xl lg:text-5xl"
              >
                What evolution built over billions of years, we learned to
                program.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
