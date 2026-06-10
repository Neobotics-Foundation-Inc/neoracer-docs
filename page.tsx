import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  TickMargin,
  ChromeBadge,
  DashList,
} from '@/components/docs/Editorial';
import {
  ScrollReveal,
  AnimatedDataFlowDiagram,
} from '@/components/docs/Interactive';
import IntentHoverCard from '@/components/docs/IntentHoverCard';
import PopularRow from '@/components/docs/PopularRow';
import PitLaneNav, { PitLaneSection } from '@/components/docs/PitLaneNav';

export const metadata: Metadata = {
  title: 'NeoRacer Docs, from sealed box to autonomous lap',
  description:
    'Documentation for the NeoRacer V1 autonomous racing kit. A five-page getting started path, plus the full Python API and ROS 2 reference for researchers.',
};

/* ─────────────────────────────────────────────────────────────────────────
 * /docs landing page
 *
 * Editorial layout: massive Kernel headlines, ghost numerals, tick-mark
 * margins, FIG-labelled diagrams. The section nav is staged as a pit lane
 * with the CarSprite parking in front of wherever the reader is headed.
 * ─────────────────────────────────────────────────────────────────────── */

const intentCards: {
  badge: string;
  title: string;
  body: string;
  href: string;
  accent: string;
  pad: string;
  variant: 'red' | 'blue';
}[] = [
  {
    badge: 'Just unboxed?',
    title: 'Getting started',
    body: "Five short pages and you're driving. Unbox, charge, install the driver, first drive, first program.",
    href: '/docs/getting-started/unbox',
    accent: NB.neoboticsRed,
    pad: '5 pages',
    variant: 'red',
  },
  {
    badge: 'Know what you need?',
    title: 'Python + ROS 2 reference',
    body: 'The full racecar-neo-library API, every ROS 2 topic, and the F1TENTH parity matrix.',
    href: '/docs/api-reference/python/lidar',
    accent: NB.tarmacBlue,
    pad: 'API · ROS 2',
    variant: 'blue',
  },
];

/* Bay order mirrors the sidebar. Counts are the real page counts in nav.ts;
   update both together when a page ships. */
const pitLane: PitLaneSection[] = [
  { title: 'Getting Started', href: '/docs/getting-started/unbox', pages: 5 },
  { title: 'Hardware', href: '/docs/hardware/overview', pages: 13 },
  { title: 'Build', href: '/docs/build/overview', pages: 1 },
  { title: 'Software', href: '/docs/software/os-and-image', pages: 6 },
  { title: 'API Reference', href: '/docs/api-reference/python/drive', pages: 9 },
  { title: 'Calibration', href: '/docs/calibration/motor-trim', pages: 5 },
  { title: 'Troubleshooting', href: '/docs/troubleshooting/faq', pages: 6 },
  { title: 'Reference', href: '/docs/reference/specifications', pages: 4 },
];

const popular = [
  { label: 'Why is my LiDAR scan empty?', href: '/docs/troubleshooting/lidar-empty-scan' },
  { label: 'Motor trim, fix creep at zero speed', href: '/docs/calibration/motor-trim' },
  { label: "Connecting to the car's Wi-Fi", href: '/docs/software/networking' },
  { label: 'Installing the ROS 2 driver', href: '/docs/getting-started/install-driver' },
];

export default function DocsLandingPage() {
  return (
    <DocsShell>
      {/* ── Section 1 · HERO ───────────────────────────────────────────── */}
      <section style={{ position: 'relative', paddingTop: 8, paddingBottom: 44 }}>
        <GhostNumeral n="01" top={-30} right={-30} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <TickMargin count={10} />
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: NB.monoFont,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: NB.textMutedBeige,
              textDecoration: 'none',
              padding: '6px 10px 6px 0',
              marginBottom: 14,
              transition: 'color 160ms ease',
            }}
          >
            <span style={{ color: NB.neoboticsRed, fontSize: 13 }}>←</span>
            Back to neobotics.org
          </Link>
          <Eyebrow>00 / NEORACER DOCS · V1.0 · MAY 2026</Eyebrow>
          <DisplayHeading size="2xl">
            NEORACER <Red>DOCS.</Red>
          </DisplayHeading>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 19,
              lineHeight: 1.55,
              color: NB.textMutedBeige,
              maxWidth: 660,
              marginBottom: 8,
            }}
          >
            Your NeoRacer arrives fully built, so these pages skip the
            screwdriver and go straight to making it drive itself. The Getting
            Started path takes you from a sealed box to a first autonomous lap,
            and once you are racing it stays open as the full Python and ROS 2
            reference, deep enough to teach the next thirty students how to do
            the same.
          </p>
        </div>
      </section>

      {/* ── Section 2 · INTENT CARDS ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 64 }}>
          <Eyebrow>WHERE WILL YOU GO FIRST?</Eyebrow>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              marginTop: 6,
            }}
          >
            {intentCards.map((c) => (
              <IntentHoverCard
                key={c.title}
                badge={c.badge}
                title={c.title}
                body={c.body}
                href={c.href}
                pad={c.pad}
                accent={c.accent}
                variant={c.variant}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 3 · THE PIT LANE ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 64 }}>
          <GhostNumeral n="02" top={-40} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / EIGHT SECTIONS</Eyebrow>
            <DisplayHeading size="lg">
              THE PIT <Red>LANE.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.6,
                color: NB.textMutedBeige,
                maxWidth: 680,
                marginBottom: 18,
              }}
            >
              Every section of the docs has a bay, and the car pulls up to
              whichever one you are about to open.
            </p>
            <PitLaneNav sections={pitLane} />
            <Link
              href="/docs/legal/warranty"
              style={{
                display: 'inline-block',
                marginTop: 14,
                fontFamily: NB.monoFont,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: NB.textMutedBeige,
                textDecoration: 'none',
              }}
            >
              Legal · 5 pages →
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 4 · FIG. A, DATA FLOW ────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 64 }}>
          <GhostNumeral n="A" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / HARDWARE → SOFTWARE → HARDWARE</Eyebrow>
            <DisplayHeading size="lg">
              THE DATA <Red>FLOW.</Red>
            </DisplayHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, alignItems: 'start' }}>
              <p
                style={{
                  fontFamily: NB.bodyFont,
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: NB.textMutedBeige,
                }}
              >
                Every NeoRacer behaviour, from a teleop drive to a full racing
                stack, is the same shape: sensors publish, your code subscribes,
                your code publishes, actuators subscribe. ROS 2 just provides the
                cables.
              </p>
              <DashList
                items={[
                  <>Each part of the car runs as a separate program, ROS 2 calls these <strong>nodes</strong>.</>,
                  <>Nodes don&apos;t call each other directly.</>,
                  <>They publish on named channels (<strong>topics</strong>). Anyone listening picks them up.</>,
                  <>NeoRacer&apos;s teleop starts <strong>four nodes</strong>.</>,
                ]}
              />
            </div>
            <div style={{ marginTop: 24, position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  border: `1px solid ${NB.tarmacBlue}`,
                  borderRadius: 16,
                  padding: '40px 22px 28px',
                  background: NB.beige,
                  boxShadow: NB.shadowCard,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -14,
                    left: 24,
                    background: NB.tarmacBlue,
                    color: NB.haloWhite,
                    fontFamily: NB.monoFont,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    padding: '5px 12px',
                    borderRadius: 4,
                    textTransform: 'uppercase',
                  }}
                >
                  FIG. A / DATA FLOW, HARDWARE TO SOFTWARE TO HARDWARE
                </div>
                <AnimatedDataFlowDiagram />
              </div>
              <figcaption
                style={{
                  fontFamily: NB.bodyFont,
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: NB.textMutedBeige,
                  marginTop: 12,
                  textAlign: 'center',
                }}
              >
                The four nodes <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>teleop.launch.py</code> starts
                once you have built <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>neoracer_ros2_driver</code>.
                Your code lives in the red panel.
              </figcaption>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 5 · POPULAR / NEW ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            <div>
              <Eyebrow>03 / POPULAR</Eyebrow>
              <h3
                style={{
                  fontFamily: NB.headingFont,
                  fontSize: 28,
                  fontWeight: 900,
                  letterSpacing: '0.005em',
                  margin: '0 0 14px',
                  textTransform: 'uppercase',
                }}
              >
                What everyone else is reading.
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {popular.map((p, i) => (
                  <PopularRow
                    key={p.href}
                    index={i + 1}
                    label={p.label}
                    href={p.href}
                    isLast={i === popular.length - 1}
                  />
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>04 / NEW</Eyebrow>
              <h3
                style={{
                  fontFamily: NB.headingFont,
                  fontSize: 28,
                  fontWeight: 900,
                  letterSpacing: '0.005em',
                  margin: '0 0 14px',
                  textTransform: 'uppercase',
                }}
              >
                Recently shipped.
              </h3>
              <div
                style={{
                  background: NB.haloWhite,
                  border: `1.5px solid ${NB.tarmacBlue}`,
                  borderRadius: 14,
                  padding: 22,
                  boxShadow: NB.shadowCard,
                }}
              >
                <ChromeBadge variant="red">June 2026</ChromeBadge>
                <h4
                  style={{
                    fontFamily: NB.headingFont,
                    fontSize: 22,
                    fontWeight: 900,
                    letterSpacing: '0.005em',
                    textTransform: 'uppercase',
                    margin: '12px 0 8px',
                  }}
                >
                  The 3D robot model.
                </h4>
                <p
                  style={{
                    fontFamily: NB.bodyFont,
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: NB.textMutedBeige,
                    margin: 0,
                  }}
                >
                  The newest page renders the car&apos;s real URDF in your
                  browser. Drag to orbit, spin the wheels, steer the front
                  axle. It joins v1.0, the first customer release.
                </p>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 12 }}>
                  <Link
                    href="/docs/hardware/robot-model"
                    style={{
                      fontFamily: NB.monoFont,
                      fontSize: 12,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      color: NB.neoboticsRed,
                      textDecoration: 'none',
                    }}
                  >
                    See the model →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 6 · SIMULATION TEASE ──────────────────────────────────
           The Playground strip, blurred until launch. The content is real but
           unreadable and non-interactive (plain spans, no live URL in the
           DOM); a scan line and a COMING SOON plate sit on top. */}
      <ScrollReveal>
        <section
          style={{
            position: 'relative',
            marginTop: 24,
            marginBottom: 24,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 12px 36px -8px rgba(27,32,54,0.4)',
          }}
        >
          <div
            aria-hidden
            style={{
              background: NB.tarmacBlue,
              color: NB.haloWhite,
              padding: '32px 28px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 20,
              alignItems: 'center',
              filter: 'blur(9px)',
              opacity: 0.9,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: NB.monoFont,
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: NB.neoboticsRed,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                // NO CAR NEARBY · SAME API IN THE BROWSER
              </div>
              <div
                style={{
                  fontFamily: NB.headingFont,
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}
              >
                The NeoRacer <span style={{ color: NB.neoboticsRed }}>Playground.</span>
              </div>
              <p
                style={{
                  fontFamily: NB.bodyFont,
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: NB.textMutedBlue,
                  marginTop: 8,
                  maxWidth: 520,
                }}
              >
                An in-browser simulator, nothing to install. Every line of code
                you write there runs unchanged on the physical car.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span
                style={{
                  background: NB.haloWhite,
                  color: NB.tarmacBlue,
                  fontFamily: NB.bodyFont,
                  fontSize: 14,
                  fontWeight: 700,
                  padding: '11px 18px',
                  borderRadius: 8,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                Open ↗
              </span>
              <span
                style={{
                  background: NB.neoboticsRed,
                  color: NB.haloWhite,
                  fontFamily: NB.bodyFont,
                  fontSize: 14,
                  fontWeight: 700,
                  padding: '11px 18px',
                  borderRadius: 8,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  boxShadow: NB.shadowAccent,
                }}
              >
                Race ↗
              </span>
            </div>
          </div>

          {/* the reveal plate */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(27,32,54,0.35)',
            }}
          >
            <div style={{ textAlign: 'center', padding: '0 16px' }}>
              <div
                style={{
                  fontFamily: NB.monoFont,
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: NB.haloWhite,
                  fontWeight: 700,
                  marginBottom: 8,
                  opacity: 0.85,
                }}
              >
                // SIMULATION · IN THE WORKS
              </div>
              <div
                style={{
                  fontFamily: NB.headingFont,
                  fontSize: 34,
                  fontWeight: 900,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  lineHeight: 1.05,
                  color: NB.haloWhite,
                }}
              >
                Coming <span style={{ color: NB.neoboticsRed }}>soon.</span>
              </div>
            </div>
          </div>

        </section>
      </ScrollReveal>
    </DocsShell>
  );
}
