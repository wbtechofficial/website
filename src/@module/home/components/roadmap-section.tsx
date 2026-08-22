import Image from "next/image";
import styles from "./roadmap-section.module.css";

const STEPS = [
  {
    id: "discover",
    number: "01",
    title: "Discover the scene",
    description:
      "Explore regional news, open-source projects, emerging startups, community events, and the people building across Salt Lake, New Town, Siliguri, and beyond.",
    image: "/roadmap/discover.jpg",
    imageAlt:
      "Explorer with a telescope studying a glowing map of connected tech hubs",
    align: "left" as const,
    tiltClass: styles.step1,
  },
  {
    id: "join",
    number: "02",
    title: "Join the network",
    description:
      "Create your profile, showcase your skills and tech stack, connect with fellow builders, and take your place among 1,200+ people growing the west-bengal.tech community.",
    image: "/roadmap/join.jpg",
    imageAlt:
      "Community members greeting each other beside a verified profile card",
    align: "right" as const,
    tiltClass: styles.step2,
  },
  {
    id: "contribute",
    number: "03",
    title: "Share & contribute",
    description:
      "Publish your projects, contribute to local open-source initiatives, speak at meetups, share what you've learned, and mentor the next generation of builders.",
    image: "/roadmap/contribute.jpg",
    imageAlt:
      "Developer sitting on a laptop with floating git branches and pull requests",
    align: "left" as const,
    tiltClass: styles.step3,
  },
  {
    id: "grow",
    number: "04",
    title: "Get discovered",
    description:
      "Put your work in front of Bengal startups, companies, and hiring teams. Build your reputation in public, discover new opportunities, and let your work travel further than you do.",
    image: "/roadmap/grow.jpg",
    imageAlt:
      "Builder in a teal spotlight with a rocket and a rising career ladder",
    align: "right" as const,
    tiltClass: styles.step4,
  },
];

function ArrowMarker({ id }: { id: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 14 14"
      refX="12"
      refY="7"
      markerWidth="40"
      markerHeight="40"
      orient="auto"
      markerUnits="userSpaceOnUse"
    >
      <path className={styles.arrowHead} d="M1 1.2 L13 7 L1 12.8 L4 7 Z" />
    </marker>
  );
}

function DesktopConnector({
  className,
  path,
  markerId,
}: {
  className: string;
  path: string;
  markerId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1580 1000"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <ArrowMarker id={markerId} />
      </defs>
      <path className={styles.path} d={path} markerEnd={`url(#${markerId})`} />
    </svg>
  );
}

function MobileConnector({
  className,
  markerId,
}: {
  className: string;
  markerId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 1000"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 14 14"
          refX="11"
          refY="7"
          markerWidth="30"
          markerHeight="30"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path className={styles.arrowHead} d="M1 1.2 L13 7 L1 12.8 L4 7 Z" />
        </marker>
      </defs>
      <path
        className={styles.path}
        d="M 24 350
       C 24 410, 30 440, 24 480
       C 18 520, 30 550, 24 590
       C 24 605, 24 615, 24 630"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
}

const LTR_PATH =
  "M 430 345 C 470 410, 450 555, 580 600 C 690 630, 600 786, 860 786";
const RTL_PATH =
  "M 1140 345 C 1110 510, 1340 555, 920 620 C 760 680, 880 786, 720 786";

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className={styles.section}
      aria-labelledby="roadmap-heading"
    >
      <div className={styles.glowLayer} aria-hidden="true">
        <div className={styles.glowTop} />
        <div className={styles.glowBottom} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.kicker}>
            <span className={styles.kickerDot} aria-hidden="true" />
            west-bengal.tech // the journey
          </div>
          <h2 id="roadmap-heading" className={styles.title}>
            Your path into Bengal&apos;s{" "}
            <span className={styles.titleAccent}>tech network</span>
          </h2>
          <p className={styles.subtitle}>
            Four steps from discovering the scene to getting on the radar of
            startups and hiring teams — a premium product journey for every
            engineer in West Bengal.
          </p>
        </header>

        <div className={styles.track}>
          {STEPS.map((step) => (
            <article
              key={step.id}
              className={`${step.align === "left" ? styles.stepLeft : styles.stepRight} ${step.tiltClass}`}
              aria-labelledby={`roadmap-step-${step.id}`}
            >
              <div className={styles.card}>
                <span className={styles.badge}>{step.number}</span>
                <h3 id={`roadmap-step-${step.id}`} className={styles.stepTitle}>
                  {step.title}
                </h3>
                <p className={styles.stepCopy}>{step.description}</p>
              </div>
              <figure className={styles.visual}>
                <div className={styles.frame}>
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    width={640}
                    height={640}
                    className={styles.frameImg}
                    sizes="(max-width: 767px) 108px, (max-width: 1024px) 140px, 180px"
                  />
                </div>
              </figure>
            </article>
          ))}

          <DesktopConnector
            className={styles.connector12}
            path={LTR_PATH}
            markerId="roadmap-arrow-12"
          />
          <DesktopConnector
            className={styles.connector23}
            path={RTL_PATH}
            markerId="roadmap-arrow-23"
          />
          <DesktopConnector
            className={styles.connector34}
            path={LTR_PATH}
            markerId="roadmap-arrow-34"
          />

          <MobileConnector
            className={styles.mobile12}
            markerId="roadmap-arrow-m12"
          />
          <MobileConnector
            className={styles.mobile23}
            markerId="roadmap-arrow-m23"
          />
          <MobileConnector
            className={styles.mobile34}
            markerId="roadmap-arrow-m34"
          />
        </div>
      </div>
    </section>
  );
}
