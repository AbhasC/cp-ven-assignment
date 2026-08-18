import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CapabilityCard } from "./CapabilityCard";
import { PossibilityCard } from "./PossibilityCard";
import { ArrowCircleRightIcon } from "@phosphor-icons/react";
import { capabilities, possibilities } from "./constants";
import { MicroLabel } from "../../common-components/MicroLabel";

gsap.registerPlugin(ScrollTrigger);

export const Capabilities = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-2 flex min-h-screen w-full items-center overflow-hidden"
      id="capabilities"
    >
      <div ref={trackRef} className="flex h-fit w-max">
        <div className="flex h-screen shrink-0 flex-col justify-center px-5 sm:px-8 lg:px-12 mr-12">
          <div className="mx-auto w-full max-w-400">
            <p className="mb-5 w-fit font-mono text-xs font-semibold uppercase tracking-[0.28em] text-text-muted sm:mb-6 sm:text-sm">
              <MicroLabel text="CAPABILITIES" />
            </p>
            <h2 className="max-w-5xl font-display text-[clamp(2.5rem,4vw,5rem)] font-semibold leading-[0.82] tracking-[-0.07em] text-text">
              One tool.
              <br />
              <span className="block max-w-50 wrap-break-word sm:max-w-none">
                Countless possibilities.
              </span>
            </h2>
          </div>
        </div>
        <div className="flex h-screen shrink-0 items-center gap-5 px-5 sm:gap-8 sm:px-8 lg:gap-12 lg:px-12">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={index} ind={index} {...capability} />
          ))}
        </div>
        <div className="flex h-screen shrink-0 flex-col justify-center px-5 sm:px-8 lg:px-12 mr-12">
          <div className="mx-auto w-full max-w-400">
            <p className="mb-5 w-fit font-mono text-xs font-semibold uppercase tracking-[0.28em] text-text-muted sm:mb-6 sm:text-sm">
              WHAT WOULD YOU DESIGN?
            </p>
            <span className="flex items-center gap-10">
              <h2 className="max-w-5xl font-display text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.82] tracking-[-0.07em] text-text">
                A few
                <br />
                ideas
              </h2>
              <ArrowCircleRightIcon size={64} className="text-text" />
            </span>
          </div>
        </div>
        {possibilities.map((possibility, index) => (
          <PossibilityCard key={index} ind={index} {...possibility} />
        ))}
        <div className="relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden px-5 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[min(82vw,82vh,900px)] w-[min(82vw,82vh,900px)] transform -translate-x-1/2 -translate-y-1/2 rounded-full border-3 border-text/10" />
            <div className="absolute left-1/2 top-1/2 h-[min(62vw,62vh,700px)] w-[min(62vw,62vh,700px)] transform -translate-x-1/2 -translate-y-1/2 rounded-full border-3 border-text/10" />
            <div className="absolute left-1/2 top-1/2 h-[min(42vw,42vh,480px)] w-[min(42vw,42vh,480px)] transform -translate-x-1/2 -translate-y-1/2 rounded-full border-3 border-text/10" />
            <div className="absolute left-1/2 top-1/2 h-[min(22vw,22vh,250px)] w-[min(22vw,22vh,250px)] transform -translate-x-1/2 -translate-y-1/2 rounded-full border-3 border-text/10" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-text sm:h-2.5 sm:w-2.5" />
            <div className="absolute left-1/2 top-[calc(100%+5vw)] h-[min(110vw,110vh,1200px)] w-[min(110vw,110vh,1200px)] transform -translate-x-1/2 rounded-full border-[clamp(3px,0.45vw,7px)] border-border-strong backdrop-blur-sm sm:top-[calc(100%+8vw)] lg:top-[calc(100%+12vw)]" />
          </div>
          <div className="relative z-10 flex w-full max-w-[1800px] flex-col items-center text-center">
            <p className="mb-5 font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-text-muted sm:mb-7 sm:text-xs lg:mb-8 lg:text-sm">
              THE ULTIMATE POSSIBILITY
            </p>
            <h2 className="max-w-[10ch] font-display text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-text sm:max-w-[11ch] lg:max-w-6xl">
              A human designed
              <br />
              <span className="text-text-muted">for another planet.</span>
            </h2>
            <p className="mt-6 max-w-[28rem] px-2 font-body text-[13px] leading-relaxed text-text-muted sm:mt-8 sm:px-0 sm:text-base lg:mt-10 lg:max-w-xl lg:text-lg">
              If we can engineer biology for the world we know, what could we
              build for the worlds we don't?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
