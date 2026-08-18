import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BIOLOGICAL_SCALE, SCALE_STATS } from "./constants";
import { BiologicalStat } from "./BiologicalStat";
import { ScaleStat } from "./ScaleState";
import { MicroLabel } from "../../common-components/MicroLabel";
import { IconStickySection } from "../../common-components/IconStickySection";
import { DnaIcon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export const Impact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const stickerRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const statementMainRef = useRef<HTMLParagraphElement>(null);
  const statementSubRef = useRef<HTMLParagraphElement>(null);
  const finalBlockRef = useRef<HTMLDivElement>(null);
  const finalMainRef = useRef<HTMLParagraphElement>(null);
  const finalAccentRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const stats =
        statsRef.current?.querySelectorAll<HTMLElement>(".scale-stat");
      const scaleItems =
        scaleRef.current?.querySelectorAll<HTMLElement>(".scale-item");
      if (!stats?.length || !scaleItems?.length) return;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const leftReveal = [eyebrowRef.current, scaleRef.current].filter(Boolean);
      const rightReveal = [
        statsRef.current,
        statementRef.current,
        finalBlockRef.current,
        stickerRef.current,
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
            start: "top 72%",
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
      gsap.to(statementMainRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: statementMainRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(statementSubRef.current, {
        yPercent: -2,
        ease: "none",
        scrollTrigger: {
          trigger: statementSubRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(finalMainRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: finalMainRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(finalAccentRef.current, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: finalAccentRef.current,
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
      className="relative z-2 w-full overflow-clip px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-18 lg:px-16 lg:py-20"
      id="impact"
    >
      <div className="mx-auto w-full max-w-400">
        <p
          ref={eyebrowRef}
          className="w-fit font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-text-muted sm:text-xs lg:text-sm"
        >
          <MicroLabel text="THE SCALE OF BIOLOGY" />
        </p>
        <div
          ref={statsRef}
          className="mt-[clamp(4rem,10vw,9rem)] flex flex-col"
        >
          {SCALE_STATS.map((stat, index) => (
            <ScaleStat
              key={index}
              value={stat.value}
              unit={stat.unit}
              description={stat.description}
            />
          ))}
        </div>
        <div
          ref={scaleRef}
          className="mt-16 border-t border-text/15 pt-[clamp(2rem,4vw,3.5rem)]"
        >
          <div className="flex flex-wrap items-center gap-x-[clamp(0.75rem,2vw,1.75rem)] gap-y-4">
            {BIOLOGICAL_SCALE.map((item, index) => (
              <BiologicalStat
                key={index}
                item={item}
                showArrow={index < BIOLOGICAL_SCALE.length - 1}
              />
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col w-full grid-cols-1 lg:flex-row-reverse lg:justify-between gap-12 lg:gap-16">
          <div className="flex h-fit flex-col gap-12 lg:sticky lg:top-20">
            <IconStickySection Icon={DnaIcon} elemRef={stickerRef} />
          </div>
          <div ref={statementRef} className="min-w-0 lg:max-w-[70vw]">
            <p
              ref={statementMainRef}
              className="font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-text"
            >
              We started with a sequence.
            </p>
            <p
              ref={statementSubRef}
              className="mt-[clamp(1.5rem,3vw,2.5rem)] font-display text-[clamp(2.25rem,5vw,5rem)] font-medium leading-[0.9] tracking-[-0.065em] text-text-muted"
            >
              Now we're learning to think at the scale of cells, organisms, and
              ecosystems.
            </p>
            <div
              ref={finalBlockRef}
              className="mt-[clamp(5rem,10vw,10rem)] border-t border-text/15 pt-[clamp(2rem,4vw,3.5rem)]"
            >
              <p
                ref={finalMainRef}
                className="font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-text"
              >
                The unit of engineering is no longer a machine.
              </p>
              <p
                ref={finalAccentRef}
                className="mt-[clamp(1.5rem,3vw,2.5rem)] font-display text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-text"
              >
                It's life itself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
