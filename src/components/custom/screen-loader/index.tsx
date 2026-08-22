"use client";

import { useScreenLoaderAnimation } from "@/hooks/use-screenloder-animation";
import "./screen-loader.css";

export default function ScreenLoader({
  onComplete,
}: {
  className?: string;
  onComplete?: () => void;
}) {
  const {
    overlayRef,
    stageRef,
    wordWRef,
    wordBRef,
    wordTRef,
    dividerRef,
    logoRef,
  } = useScreenLoaderAnimation(onComplete);

  return (
    <div className="wbt-intro-overlay" ref={overlayRef}>
      <div className="wbt-intro-stage" ref={stageRef}>
        <div className="wbt-intro-logo" ref={logoRef}>
          <img
            className="wbt-logo-light"
            src="/brand-logo/west-bengal-tech-short-dark.svg"
            alt="WBT Logo"
          />
          <img
            className="wbt-logo-dark"
            src="/brand-logo/west-bengal-tech-short-light.svg"
            alt="WBT Logo"
          />
        </div>

        <div className="wbt-intro-divider" ref={dividerRef} />

        <div className="wbt-intro-text">
          <div className="wbt-intro-word wbt-word-west" ref={wordWRef}>
            WEST
          </div>
          <div className="wbt-intro-word wbt-word-bengal" ref={wordBRef}>
            BENGAL
          </div>
          <div className="wbt-intro-word wbt-word-tech" ref={wordTRef}>
            TECH
          </div>
        </div>
      </div>
    </div>
  );
}
