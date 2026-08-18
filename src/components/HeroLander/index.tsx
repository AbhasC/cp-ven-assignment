import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eyebrowItems, microcopyItems } from "./constants";
import { MicroLabel } from "../../common-components/MicroLabel";

gsap.registerPlugin(ScrollTrigger);

export const HeroLander = ({ isDummy = false }: { isDummy?: Boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);
  const microcopyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const leftElements = [
        eyebrowRef.current,
        titleRef.current,
        copyRef.current,
        ctaRef.current,
      ];
      const rightElements = [microcopyRef.current];
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) {
        gsap.set([...leftElements, ...rightElements], {
          clearProps: "all",
        });
        return;
      }
      gsap.set(leftElements, {
        xPercent: -100,
      });
      gsap.set(rightElements, {
        xPercent: 100,
      });
      gsap
        .timeline({
          defaults: {
            duration: 1.1,
            ease: "power3.out",
          },
        })
        .to(
          leftElements,
          {
            xPercent: 0,
          },
          0,
        )
        .to(
          rightElements,
          {
            xPercent: 0,
          },
          0,
        );
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        })
        .to(
          titleRef.current,
          {
            yPercent: -8,
            ease: "none",
          },
          0,
        )
        .to(
          copyRef.current,
          {
            yPercent: -4,
            opacity: 0.75,
            ease: "none",
          },
          0,
        )
        .to(
          ctaRef.current,
          {
            yPercent: -2,
            opacity: 0.6,
            ease: "none",
          },
          0,
        )
        .to(
          microcopyRef.current,
          {
            yPercent: 10,
            ease: "none",
          },
          0,
        );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-2 flex min-h-screen w-full items-center overflow-hidden px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32"
      id={isDummy ? "hero-dummy" : "hero"}
    >
      <div className="mx-auto w-full">
        <div className="flex max-w-6xl flex-col">
          <p
            ref={eyebrowRef}
            className="mb-6 w-fit font-mono text-xs font-semibold uppercase tracking-[0.24em] text-text-muted sm:mb-8 sm:text-sm sm:tracking-[0.28em] md:text-[15px]"
          >
            {eyebrowItems.map((item, index) => (
              <span key={item}>
                {index > 0 && <span aria-hidden="true"> · </span>}
                <MicroLabel text={item} />
              </span>
            ))}
          </p>
          <h1
            ref={titleRef}
            className=" w-fit font-display text-[clamp(4rem,15vw,13rem)] font-semibold leading-[0.78] tracking-[-0.07em] text-text sm:text-[clamp(5rem,12vw,11rem)] md:text-[clamp(6rem,11vw,12rem)] lg:text-[clamp(7rem,10vw,13rem)]"
          >
            <span className="block">We can</span>
            <span className="block [-webkit-text-stroke:1.5px_currentColor]">
              edit life.
            </span>
          </h1>
          <div
            ref={copyRef}
            className="mt-10 w-fit max-w-2xl font-body sm:mt-14 md:mt-16 lg:mt-20"
          >
            <p className="text-lg font-medium leading-[1.4] tracking-[-0.02em] text-text-muted sm:text-xl md:text-2xl lg:text-3xl">
              For billions of years, evolution wrote the code.
            </p>
            <p className="mt-2 text-lg font-semibold leading-[1.4] tracking-[-0.02em] text-text sm:mt-3 sm:text-xl md:text-2xl lg:text-3xl">
              Now we have an editor.
            </p>
          </div>
          <div className="mt-9 w-fit sm:mt-11 md:mt-12 lg:mt-14">
            <span
              ref={ctaRef}
              className="group inline-flex w-fit cursor-pointer items-center gap-3 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-text sm:gap-4 sm:text-sm md:text-base md:tracking-[0.2em]"
              onClick={() => {
                window.scrollBy({
                  top: window.innerHeight - window.scrollY,
                  behavior: "smooth",
                });
              }}
            >
              <span>Explore the science</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-y-1 sm:text-lg">
                ↓
              </span>
            </span>
          </div>
        </div>
        <p
          ref={microcopyRef}
          className="absolute bottom-6 p-3 w-fit font-mono font-semibold uppercase tracking-[0.22em] text-text-muted sm:bottom-8 sm:left-auto sm:right-8 sm:text-sm sm:tracking-[0.26em] md:right-10 md:text-[15px] lg:right-16"
        >
          {microcopyItems.map((item, index) => (
            <span key={item}>
              {index > 0 && <span aria-hidden="true"> · </span>}
              <MicroLabel text={item} />
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};
