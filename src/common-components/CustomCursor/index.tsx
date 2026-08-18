import { useEffect, useRef } from "react";

import gsap from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchOnly =
      navigator.maxTouchPoints > 0 &&
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches;
    if (isTouchOnly) return;
    const cursor = cursorRef.current;
    const mark = markRef.current;
    const wave = waveRef.current;
    const lens = lensRef.current;
    if (!cursor || !mark || !wave || !lens) return;
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!supportsHover) return;
    const style = document.createElement("style");
    style.textContent = `
      html.custom-cursor,
      html.custom-cursor * {
        cursor: none !important;
      }
      .custom-cursor-click {
        color: #ef4444 !important;
        filter:
          drop-shadow(0 0 3px rgba(239, 68, 68, 1))
          drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))
          drop-shadow(0 0 16px rgba(239, 68, 68, 0.45));
      }
      .custom-cursor-click .cursor-element {
        background-color: #ef4444 !important;
      }
      .custom-cursor-click .cursor-ring,
      .custom-cursor-click .cursor-wave {
        border-color: #ef4444 !important;
      }
    `;
    document.head.appendChild(style);
    document.documentElement.classList.add("custom-cursor");
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.16,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.16,
      ease: "power3.out",
    });
    const lensXTo = gsap.quickTo(lens, "x", {
      duration: 0.16,
      ease: "power3.out",
    });
    const lensYTo = gsap.quickTo(lens, "y", {
      duration: 0.16,
      ease: "power3.out",
    });
    const handlePointerMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      lensXTo(event.clientX);
      lensYTo(event.clientY);
    };
    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest(
        "a, button, input, textarea, select, label, [role='button'], [data-cursor='pointer']",
      );
      gsap.to(mark, {
        scale: interactive ? 1.15 : 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };
    const handlePointerDown = () => {
      gsap.killTweensOf(mark);
      gsap.killTweensOf(wave);
      mark.classList.add("custom-cursor-click");
      gsap.to(mark, {
        scale: 0.9,
        duration: 0.12,
        ease: "power2.out",
      });
      gsap.fromTo(
        wave,
        {
          scale: 1,
          opacity: 0.85,
        },
        {
          scale: 3,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
        },
      );
    };
    const handlePointerUp = () => {
      mark.classList.remove("custom-cursor-click");
      gsap.to(mark, {
        scale: 1,
        duration: 0.45,
        ease: "back.out(2)",
      });
    };
    const handlePointerLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.2,
      });
      gsap.to(lens, {
        opacity: 0,
        duration: 0.2,
      });
    };
    const handlePointerEnter = () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.2,
      });
      gsap.to(lens, {
        opacity: 1,
        duration: 0.2,
      });
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    document.documentElement.addEventListener("mouseenter", handlePointerEnter);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handlePointerEnter,
      );
      document.documentElement.classList.remove("custom-cursor");
      style.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={lensRef}
        className="pointer-events-none fixed left-0 top-0 z-[5] size-12 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{
          backdropFilter: "invert(1)",
          WebkitBackdropFilter: "invert(1)",
        }}
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[6] size-16 transform -translate-x-1/2 -translate-y-1/2 text-bg will-change-transform"
      >
        <div ref={markRef} className="relative size-full will-change-transform">
          <span className="cursor-element absolute left-1/2 top-1/2 size-[7px] transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg" />
          <span className="cursor-element absolute left-[calc(50%+9px)] top-1/2 h-px w-[13px] -translate-y-1/2 bg-bg" />
          <span className="cursor-element absolute right-[calc(50%+9px)] top-1/2 h-px w-[13px] -translate-y-1/2 bg-bg" />
          <span className="cursor-element absolute left-1/2 top-[calc(50%+9px)] h-[13px] w-px -translate-x-1/2 bg-bg" />
          <span className="cursor-element absolute bottom-[calc(50%+9px)] left-1/2 h-[13px] w-px -translate-x-1/2 bg-bg" />
          <span className="cursor-ring absolute left-1/2 top-1/2 size-8 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-bg" />
          <span
            ref={waveRef}
            className="cursor-wave absolute left-1/2 top-1/2 size-8 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-bg opacity-0"
          />
        </div>
      </div>
    </>
  );
};
