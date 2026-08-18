import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { InfiniteScrollProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

export const InfiniteScroller = ({
  children,
  topClone,
  bottomClone,
}: InfiniteScrollProps) => {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const correctingRef = useRef(false);
  const initializedRef = useRef(false);
  const lastScrollYRef = useRef(0);

  useLayoutEffect(() => {
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!top || !bottom) return;
    const getTopCloneHeight = () => top.offsetHeight;
    const getBottomCloneStart = () => bottom.offsetTop;
    const getMainContentHeight = () =>
      getBottomCloneStart() - getTopCloneHeight();
    const jumpToMainStart = (overshoot: number) => {
      if (correctingRef.current) return;
      correctingRef.current = true;
      window.scrollTo({
        top: getTopCloneHeight() + overshoot,
        behavior: "instant",
      });
      requestAnimationFrame(() => {
        ScrollTrigger.update();
        correctingRef.current = false;
        lastScrollYRef.current = window.scrollY;
      });
    };
    const jumpToMainEnd = (overshoot: number) => {
      if (correctingRef.current) return;
      correctingRef.current = true;
      window.scrollTo({
        top: getTopCloneHeight() + getMainContentHeight() - overshoot,
        behavior: "instant",
      });
      requestAnimationFrame(() => {
        ScrollTrigger.update();
        correctingRef.current = false;
        lastScrollYRef.current = window.scrollY;
      });
    };
    const handleScroll = () => {
      if (correctingRef.current || !initializedRef.current) return;
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollYRef.current;
      const scrollingUp = currentScrollY < lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;
      const topCloneHeight = getTopCloneHeight();
      const mainContentHeight = getMainContentHeight();
      const mainStart = topCloneHeight;
      const mainEnd = mainStart + mainContentHeight;
      if (scrollingDown && currentScrollY >= mainEnd) {
        const overshoot = currentScrollY - mainEnd;
        jumpToMainStart(overshoot);
        return;
      }
      if (scrollingUp && currentScrollY <= mainStart) {
        const overshoot = mainStart - currentScrollY;
        jumpToMainEnd(overshoot);
      }
    };
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
    resizeObserver.observe(top);
    resizeObserver.observe(bottom);
    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    requestAnimationFrame(() => {
      initializedRef.current = true;
      lastScrollYRef.current = window.scrollY;
      ScrollTrigger.refresh();
    });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={topRef} className="w-full" aria-hidden="true" data-infinite-top>
        {topClone}
      </div>
      <div className="w-full">{children}</div>
      <div ref={bottomRef} className="w-full" aria-hidden="true">
        {bottomClone}
      </div>
    </div>
  );
};
