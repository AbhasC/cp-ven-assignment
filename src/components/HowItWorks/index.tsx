import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  bottomEnd,
  bottomMid,
  bottomModified,
  bottomStart,
  GUIDE_SEQUENCE,
  steps,
  topEnd,
  topMid,
  topModified,
  topStart,
} from "./constants";
import { DNASequenceMapper } from "./DNASequenceMapper";
import { MicroLabel } from "../../common-components/MicroLabel";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const casRef = useRef<HTMLDivElement>(null);
  const cutRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const topStartRef = useRef<HTMLSpanElement>(null);
  const topMidRef = useRef<HTMLSpanElement>(null);
  const topModifiedRef = useRef<HTMLSpanElement>(null);
  const topEndRef = useRef<HTMLSpanElement>(null);
  const bottomStartRef = useRef<HTMLSpanElement>(null);
  const bottomMidRef = useRef<HTMLSpanElement>(null);
  const bottomModifiedRef = useRef<HTMLSpanElement>(null);
  const bottomEndRef = useRef<HTMLSpanElement>(null);
  const targetTopDividerRef = useRef<HTMLDivElement>(null);
  const targetBottomDividerRef = useRef<HTMLDivElement>(null);
  const editTopDividerRef = useRef<HTMLDivElement>(null);
  const editBottomDividerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index: number) => {
    const tl = timelineRef.current;
    const st = tl?.scrollTrigger;
    if (!tl || !st) return;
    const labels = ["find", "target", "edit", "rewrite"];
    const label = labels[index];
    if (tl.labels[label] === undefined) return;
    setActiveStep(index);
    const scrollPosition = st.labelToScroll(label);
    gsap.to(window, {
      scrollTo: {
        y: scrollPosition,
        autoKill: false,
      },
      duration: 0.45,
      ease: "power2.out",
      overwrite: true,
    });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const sequenceBases =
        sequenceRef.current?.querySelectorAll<HTMLElement>(".sequence-base");
      if (!sequenceBases) return;
      gsap.set(sequenceRef.current, {
        opacity: 1,
        y: 0,
      });
      gsap.set(sequenceBases, {
        opacity: 1,
        y: 0,
      });
      gsap.set([topModifiedRef.current, bottomModifiedRef.current], {
        opacity: 0,
      });
      gsap.set(
        [
          targetTopDividerRef.current,
          editTopDividerRef.current,
          targetBottomDividerRef.current,
          editBottomDividerRef.current,
        ],
        {
          scaleY: 0,
        },
      );
      gsap.set([targetTopDividerRef.current, editTopDividerRef.current], {
        transformOrigin: "top center",
      });
      gsap.set([targetBottomDividerRef.current, editBottomDividerRef.current], {
        transformOrigin: "bottom center",
      });
      gsap.set(guideRef.current, {
        opacity: 0,
        y: 18,
      });
      gsap.set(casRef.current, {
        opacity: 0,
        y: 18,
        scale: 0.96,
      });
      gsap.set(cutRef.current, {
        opacity: 0,
        scaleY: 0,
        transformOrigin: "center center",
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      timelineRef.current = tl;
      tl.to({}, { duration: 0.3 })
        .addLabel("find")
        .to(guideRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .addLabel("target")
        .to(
          [targetTopDividerRef.current, editTopDividerRef.current],
          {
            scaleY: 1,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          [targetBottomDividerRef.current, editBottomDividerRef.current],
          {
            scaleY: 1,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<",
        )
        .to({}, { duration: 0.35 })
        .to(casRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "power2.out",
        })
        .addLabel("edit")
        .to({}, { duration: 0.3 })
        .to(cutRef.current, {
          opacity: 1,
          scaleY: 1,
          duration: 0.35,
          ease: "power2.inOut",
        })
        .to(topMidRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(bottomMidRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(topModifiedRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(bottomModifiedRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .addLabel("rewrite")
        .to(
          [targetTopDividerRef.current, editTopDividerRef.current],
          {
            scaleY: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          [targetBottomDividerRef.current, editBottomDividerRef.current],
          {
            scaleY: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<",
        )
        .to({}, { duration: 0.45 });
      const labelTimes = [
        tl.labels.find,
        tl.labels.target,
        tl.labels.edit,
        tl.labels.rewrite,
      ];
      let previousStep = -1;
      const updateActiveStep = () => {
        const time = tl.time();
        let nextStep = 0;
        for (let index = 0; index < labelTimes.length; index++) {
          if (time >= labelTimes[index]) {
            nextStep = index;
          }
        }
        if (nextStep === previousStep) return;
        previousStep = nextStep;
        setActiveStep(nextStep);
      };
      tl.eventCallback("onUpdate", updateActiveStep);
      updateActiveStep();
      ScrollTrigger.refresh();
      return () => {
        tl.eventCallback("onUpdate", null);
        tl.scrollTrigger?.kill();
        tl.kill();
        timelineRef.current = null;
      };
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-2 flex min-h-screen w-full items-center overflow-clip px-5 sm:px-8 lg:px-12 pt-4"
      id="how-it-works"
    >
      <div className="my-auto flex min-h-fit w-full flex-col justify-between">
        <div className="mb-4 flex items-end justify-between gap-8 sm:mb-6 lg:mb-8">
          <div>
            <p className="mb-5 w-fit font-mono text-xs font-semibold uppercase tracking-[0.28em] text-text-muted sm:mb-6 sm:text-sm">
              <MicroLabel text="HOW IT WORKS" />
            </p>
            <h2 className="max-w-5xl font-display text-[clamp(2.5rem,4vw,5rem)] font-semibold leading-[0.82] tracking-[-0.07em] text-text">
              Find. Target. Edit. Rewrite.
            </h2>
          </div>
          <span
            ref={counterRef}
            className="shrink-0 pb-1 font-mono text-xs font-medium uppercase tracking-[0.22em] text-text-muted sm:text-sm"
          >
            {`0${activeStep + 1} / 04`}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(170px,0.55fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl p-2 backdrop-blur-xs sm:grid-cols-4 lg:flex lg:flex-col lg:gap-6 lg:px-4">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => handleStepClick(index)}
                  className={`group block w-full text-left transition-colors duration-300 ${
                    isActive ? "text-text" : "text-text-muted"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] font-medium tracking-[0.2em] sm:text-xs">
                      {step.number}
                    </span>
                    <h3 className="font-display text-2xl font-semibold leading-none tracking-[-0.04em] sm:text-3xl">
                      {step.title}
                    </h3>
                  </div>
                  <span
                    className={`mt-2 block h-px origin-left bg-current transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                  <p className="mt-3 hidden max-w-52 font-body leading-relaxed sm:block">
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>
          <div ref={stageRef} className="min-w-0">
            <div className="mb-4 flex items-center justify-between px-1 sm:mb-5">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-text-muted sm:text-sm">
                DNA TARGET
              </span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted sm:text-xs">
                DOUBLE STRAND
              </span>
            </div>
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-2xl border border-text/15 bg-surface/5 p-4 backdrop-blur-sm md:p-6 lg:p-8"
            >
              <div
                ref={sequenceRef}
                className="relative flex flex-col justify-center"
              >
                <div className="mx-auto w-full max-w-5xl">
                  <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-5">
                    <div className="flex flex-col justify-between py-2 font-mono text-[9px] text-text-muted sm:py-3 sm:text-xs">
                      <span className="mt-[7px]">5'</span>
                      <span className="mb-[7px]">3'</span>
                    </div>
                    <div className="min-w-0">
                      <div className="grid grid-cols-10 gap-1 sm:gap-2 lg:gap-3">
                        <DNASequenceMapper
                          sequence={topStart}
                          sequenceRef={topStartRef}
                          className="col-span-3 grid-cols-3"
                        />
                        <div className="relative col-span-4">
                          <DNASequenceMapper
                            sequence={topMid}
                            sequenceRef={topMidRef}
                            className="grid-cols-4"
                          />
                          <DNASequenceMapper
                            sequence={topModified}
                            sequenceRef={topModifiedRef}
                            className="absolute inset-0 grid-cols-4"
                          />
                          <div
                            ref={targetTopDividerRef}
                            className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-text/30"
                          />
                          <div
                            ref={editTopDividerRef}
                            className="pointer-events-none absolute right-0 top-0 h-full w-px origin-top scale-y-0 bg-text/30"
                          />
                        </div>
                        <DNASequenceMapper
                          sequence={topEnd}
                          sequenceRef={topEndRef}
                          className="col-span-3 grid-cols-3"
                        />
                      </div>
                      <div className="my-3 h-px bg-text/10 sm:my-4" />
                      <div className="grid grid-cols-10 gap-1 sm:gap-2 lg:gap-3">
                        <DNASequenceMapper
                          sequence={bottomStart}
                          sequenceRef={bottomStartRef}
                          className="col-span-3 grid-cols-3"
                        />
                        <div className="relative col-span-4">
                          <DNASequenceMapper
                            sequence={bottomMid}
                            sequenceRef={bottomMidRef}
                            className="grid-cols-4"
                          />
                          <DNASequenceMapper
                            sequence={bottomModified}
                            sequenceRef={bottomModifiedRef}
                            className="absolute inset-0 grid-cols-4"
                          />
                          <div
                            ref={targetBottomDividerRef}
                            className="pointer-events-none absolute left-0 top-0 h-full w-px origin-bottom scale-y-0 bg-text/30"
                          />
                          <div
                            ref={editBottomDividerRef}
                            className="pointer-events-none absolute right-0 top-0 h-full w-px origin-bottom scale-y-0 bg-text/30"
                          />
                        </div>
                        <DNASequenceMapper
                          sequence={bottomEnd}
                          sequenceRef={bottomEndRef}
                          className="col-span-3 grid-cols-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-between sm:flex-col">
                    <div className="mt-6 flex justify-center sm:mt-11">
                      <div
                        ref={guideRef}
                        className="flex flex-col items-center"
                      >
                        <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted sm:text-[10px]">
                          GUIDE RNA
                        </span>
                        <div className="rounded-full border border-text/35 bg-surface/20 px-5 py-2.5 backdrop-blur-sm sm:px-7 sm:py-3">
                          <div className="flex gap-1.5 sm:gap-2">
                            {GUIDE_SEQUENCE.map((base, index) => (
                              <span
                                key={`guide-${index}`}
                                className="font-mono text-xs font-semibold tracking-[0.12em] text-text sm:text-sm"
                              >
                                {base}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center sm:mt-5">
                      <div
                        ref={casRef}
                        className="flex w-38 flex-col items-center justify-between rounded-xl border border-text/25 bg-surface/10 px-5 py-3 backdrop-blur-sm sm:w-52 sm:py-4"
                      >
                        <span className="font-mono text-sm font-semibold uppercase tracking-[0.28em] text-text sm:text-base">
                          Cas9
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted sm:text-[10px]">
                          NUCLEASE
                        </span>
                      </div>
                    </div>
                    <div
                      ref={cutRef}
                      className="pointer-events-none absolute left-1/2 top-[44%] h-16 w-px transform -translate-x-1/2 sm:h-20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col space-y-1 text-end font-mono uppercase tracking-[0.2em] text-text-muted">
          <div className="flex flex-col items-end gap-3 text-right text-[16px]">
            <span className="group relative w-fit cursor-default font-mono tracking-[0.22em] text-text-muted transition-colors duration-300 hover:text-text">
              BILLIONS OF LETTERS
              <span className="absolute -bottom-1 right-0 h-px w-0 bg-text transition-[width] duration-300 group-hover:w-full" />
            </span>
            <span className="group relative w-fit cursor-default font-mono tracking-[0.22em] text-text-muted transition-colors duration-300 hover:text-text">
              ONE TARGET
              <span className="absolute -bottom-1 right-0 h-px w-0 bg-text transition-[width] duration-300 group-hover:w-full" />
            </span>
            <span className="group relative flex w-fit cursor-default items-center justify-end font-mono font-semibold tracking-[0.22em] text-text transition-colors duration-300 hover:gap-3">
              <span className="h-px w-0 bg-text transition-[width] duration-300 group-hover:w-5" />
              A DIRECTED INTERVENTION
              <span className="h-px w-0 bg-text transition-[width] duration-300 group-hover:w-5" />
              <span className="absolute -bottom-1 right-0 h-px w-0 bg-text transition-[width] duration-300 group-hover:w-full" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
