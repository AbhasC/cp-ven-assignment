import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { proofs } from "./constants";
import { ProofCard } from "./ProofCard";
import { MicroLabel } from "../../common-components/MicroLabel";
import { IconStickySection } from "../../common-components/IconStickySection";
import { AtomIcon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export const Proofs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const stickerRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const questionOneRef = useRef<HTMLHeadingElement>(null);
  const questionTwoRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const cards =
        cardsRef.current?.querySelectorAll<HTMLElement>(".proof-card");
      if (!cards) return;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const leftReveal = [eyebrowRef.current, stickerRef.current];
      const rightReveal = [
        headingRef.current,
        cardsRef.current,
        transitionRef.current,
        questionOneRef.current,
        questionTwoRef.current,
      ];
      if (prefersReducedMotion) {
        gsap.set([...leftReveal, ...rightReveal], {
          xPercent: 0,
          opacity: 1,
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
      gsap.set(
        [
          eyebrowRef.current,
          headingRef.current,
          ...Array.from(cards),
          transitionRef.current,
          questionOneRef.current,
          questionTwoRef.current,
        ],
        {
          willChange: "transform, opacity",
        },
      );
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
      gsap.to(cardsRef.current, {
        yPercent: -2,
        ease: "none",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(transitionRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: transitionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(questionOneRef.current, {
        yPercent: -2,
        ease: "none",
        scrollTrigger: {
          trigger: questionOneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(questionTwoRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: questionTwoRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      cards.forEach((card) => {
        const number = card.querySelector<HTMLElement>(".proof-number");
        const category = card.querySelector<HTMLElement>(".proof-category");
        const content = card.querySelector<HTMLElement>(".proof-content");
        const enter = () => {
          gsap.to(card, {
            y: -4,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
          gsap.to(number, {
            opacity: 1,
            x: 3,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
          gsap.to(category, {
            opacity: 1,
            x: -3,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
          gsap.to(content, {
            x: 4,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        };
        const leave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
          gsap.to(number, {
            opacity: 0.7,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
          gsap.to(category, {
            opacity: 0.7,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
          gsap.to(content, {
            x: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        };
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        card.addEventListener("focusin", enter);
        card.addEventListener("focusout", leave);
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-2 w-full overflow-clip px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-18 lg:px-16 lg:py-20"
      id="proofs"
    >
      <div className="mx-auto w-full max-w-400">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.7fr_1.9fr] lg:gap-24">
          <div className="flex h-fit flex-col gap-12 lg:sticky lg:top-[80px]">
            <p
              ref={eyebrowRef}
              className="w-fit font-mono text-xs font-semibold uppercase tracking-[0.24em] text-text-muted sm:text-sm sm:tracking-[0.28em] md:text-[15px]"
            >
              <MicroLabel text="THIS IS REAL" />
            </p>
            <IconStickySection Icon={AtomIcon} elemRef={stickerRef} />
          </div>
          <div className="min-w-0">
            <h2
              ref={headingRef}
              className="max-w-5xl font-display text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.82] tracking-[-0.07em] text-text sm:text-[clamp(4.5rem,8vw,8rem)]"
            >
              This isn't
              <br />
              science fiction.
            </h2>
            <div
              ref={cardsRef}
              className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-text/10 bg-text/10 sm:mt-24 sm:grid-cols-2"
            >
              {proofs.map((proof, index) => (
                <ProofCard key={index} ind={index} proof={proof} />
              ))}
            </div>
            <div
              ref={transitionRef}
              className="mt-12 border-t border-text/15 pt-10 sm:mt-14 sm:pt-14 md:mt-16"
            >
              <div className="max-w-5xl">
                <h3
                  ref={questionOneRef}
                  className="font-display text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-text-muted"
                >
                  We stopped asking biology what it does.
                </h3>
                <h3
                  ref={questionTwoRef}
                  className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.84] tracking-[-0.07em] text-text sm:mt-12"
                >
                  We started asking what it could do.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
