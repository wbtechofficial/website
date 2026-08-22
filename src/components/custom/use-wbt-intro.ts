"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface WbtIntroRefs {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  stageRef: React.RefObject<HTMLDivElement | null>;
  wordWRef: React.RefObject<HTMLDivElement | null>;
  wordBRef: React.RefObject<HTMLDivElement | null>;
  wordTRef: React.RefObject<HTMLDivElement | null>;
  dividerRef: React.RefObject<HTMLDivElement | null>;
  logoRef: React.RefObject<HTMLDivElement | null>;
}

const DIVIDER_HEIGHT = "clamp(80px, 18vw, 200px)";

function getDividerGlow(isDark: boolean) {
  return {
    hot: isDark
      ? "0 0 10px rgba(240,192,64,0.8), 0 0 24px rgba(240,192,64,0.4), 0 0 45px rgba(240,192,64,0.15)"
      : "0 0 10px rgba(11,160,156,0.7), 0 0 24px rgba(11,160,156,0.35), 0 0 45px rgba(11,160,156,0.12)",
    base: isDark
      ? "0 0 6px rgba(240,192,64,0.5), 0 0 14px rgba(240,192,64,0.25)"
      : "0 0 6px rgba(11,160,156,0.4), 0 0 14px rgba(11,160,156,0.2)",
  };
}

function buildTimeline(
  refs: WbtIntroRefs,
  isDark: boolean,
  onComplete: (() => void) | undefined,
): gsap.core.Timeline {
  const { overlayRef, stageRef, wordWRef, wordBRef, wordTRef, dividerRef, logoRef } = refs;
  const overlay = overlayRef.current!;
  const stage = stageRef.current!;
  const wordW = wordWRef.current!;
  const wordB = wordBRef.current!;
  const wordT = wordTRef.current!;
  const divider = dividerRef.current!;
  const logo = logoRef.current!;

  const glow = getDividerGlow(isDark);

  // Reset
  gsap.set([wordW, wordB, wordT], { clearProps: "all" });
  gsap.set([divider, logo, stage, overlay], { clearProps: "all" });

  // Initial states
  gsap.set(wordW, { opacity: 0, x: "-10vw", filter: "blur(10px)" });
  gsap.set(wordB, { opacity: 0, y: "-5vh", filter: "blur(10px)" });
  gsap.set(wordT, { opacity: 0, x: "6vw", filter: "blur(10px)" });
  gsap.set(divider, { height: 0, opacity: 0 });
  gsap.set(logo, { opacity: 0, x: "-10vw", rotation: 180, scale: 0.3, filter: "blur(12px)" });
  gsap.set(overlay, { autoAlpha: 1 });
  gsap.set(stage, { scale: 1, opacity: 1 });

  const tl = gsap.timeline({ onComplete });

  // ── PHASE 1: Words fly in ──
  tl.to(wordW, { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }, 0.1);
  tl.to(wordB, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }, 1);
  tl.to(wordT, { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }, 1.8);

  // ── PHASE 2: Divider draws in ──
  tl.to(divider, { opacity: 1, duration: 0.2, ease: "power1.out" }, 0.8);
  tl.to(divider, { height: DIVIDER_HEIGHT, duration: 0.6, ease: "power2.out" }, 0.8);
  tl.to(divider, { boxShadow: glow.hot, duration: 0.3, ease: "power1.in" }, 1.2);

  // ── PHASE 3: Logo spins in ──
  tl.to(logo, { x: 0, rotation: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, 0.5);

  // ── PHASE 4: Breathing divider glow ──
  tl.to(divider, { boxShadow: glow.base, duration: 0.3, ease: "sine.inOut" }, 1.8);
  tl.to(divider, { boxShadow: glow.hot, duration: 0.3, ease: "sine.inOut" }, 2.1);

  // ── PHASE 5: Outro — zoom + fade ──
  tl.to(stage, { scale: 12, duration: 1.1, ease: "expo.in" }, 3);
  tl.to(stage, { opacity: 0, duration: 0.8, ease: "power3.in" }, 3);
  tl.to(overlay, { background: isDark ? "rgba(10,14,20,0)" : "rgba(245,245,245,0)", duration: 0.6, ease: "power1.in" }, 3.5);

  // ── PHASE 6: Hide overlay ──
  tl.set(overlay, { autoAlpha: 0 }, 4.2);

  return tl;
}

export function useWbtIntro(onComplete?: () => void) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wordWRef = useRef<HTMLDivElement>(null);
  const wordBRef = useRef<HTMLDivElement>(null);
  const wordTRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const refs: WbtIntroRefs = { overlayRef, stageRef, wordWRef, wordBRef, wordTRef, dividerRef, logoRef };
    const allMounted = Object.values(refs).every((r) => r.current !== null);
    if (!allMounted) return;

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const tl = buildTimeline(refs, isDark, () => onCompleteRef.current?.());

    return () => {
      tl.kill();
    };
  }, []);

  return { overlayRef, stageRef, wordWRef, wordBRef, wordTRef, dividerRef, logoRef };
}
