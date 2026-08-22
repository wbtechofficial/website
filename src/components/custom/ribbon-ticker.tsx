"use client";

import React from "react";

export default function RibbonTicker() {
  const items = [
    "React Kolkata",
    "Open Source Collaboration",
    "Deep-Tech Startups",
    "Developer Careers",
    "Student Mentorship",
    "Regional Builders",
    "Sector V, Kolkata",
  ];

  // Repeat items to ensure continuous scrolling
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-[#051633] border-y border-white/5 py-3.5 select-none z-20">
      {/* CSS Scrolling Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}} />
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee-track flex gap-12 items-center">
          {repeatedItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest font-bold text-white/80">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-none bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
