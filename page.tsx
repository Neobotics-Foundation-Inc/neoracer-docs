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
  MonoLabel,
  NumberedFeatureCard,
  ChromeBadge,
  DashList,
} from '@/components/docs/Editorial';
import {
  DataFlowDiagram,
  FirstHourTimeline,
  Icons,
} from '@/components/docs/Diagrams';
import {
  ScrollReveal,
  MouseFollowGlow,
} from '@/components/docs/Interactive';
import IntentHoverCard from '@/components/docs/IntentHoverCard';
import TopicHoverCard from '@/components/docs/TopicHoverCard';
import PopularRow from '@/components/docs/PopularRow';

export const metadata: Metadata = {
  title: 'NeoRacer Docs, Build, race, teach.',
  description:
    'Comprehensive documentation for the NeoRacer V1 autonomous racing kit. Sequential learning paths for students and educators, plus a complete API and ROS 2 reference for researchers.',
};

/* ─────────────────────────────────────────────────────────────────────────
 * /docs landing page
 *
 * Editorial layout heavily inspired by the NeoRacer reference diagrams:
 * massive Kernel headlines, ghost numerals behind sections, tick-mark
 * margins, FIG-labelled diagrams, numbered feature cards.
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
    badge: 'For students',
    title: 'Box → first lap',
    body: 'Five short pages and you\'re driving. Unbox, charge, pair, drive, write your first Python.',
    href: '/docs/getting-started/unbox',
    accent: NB.neoboticsRed,
    pad: '60 minutes',
    variant: 'red',
  },
  {
    badge: 'For researchers',
    title: 'Python + ROS 2 reference',
    body: 'The full racecar-neo-library API, every ROS 2 topic, and the F1TENTH parity matrix, all laid out so you can go straight to what you need.',
    href: '/docs/api-reference/python/lidar',
    accent: NB.tarmacBlue,
    pad: 'API · ROS 2',
    variant: 'blue',
  },
];

const topicGrid = [
  { label: 'Hardware', href: '/docs/hardware/overview', n: '12 pages' },
  { label: 'Software', href: '/docs/software/os-and-image', n: '6 pages' },
  { label: 'API Reference', href: '/docs/api-reference/python/lidar', n: 'Python + ROS 2' },
  { label: 'Calibration', href: '/docs/calibration/motor-trim', n: '5 cookbooks' },
  { label: 'Roboracer', href: '/docs/roboracer/migration-from-f1tenth', n: 'F1TENTH bridge' },
  { label: 'Troubleshooting', href: '/docs/troubleshooting/faq', n: 'When things break' },
  { label: 'Reference', href: '/docs/reference/specifications', n: 'Specs + glossary' },
];

const buildCards = [
  {
    n: 1,
    title: 'Wall follow',
    lede: 'A single LiDAR call. A proportional controller. One loop of the corridor.',
    body: 'Your first hands-on with closed-loop control. Goal: keep 30 cm from the right wall, no collisions.',
    codeChip: 'rc.lidar.get_average_distance(scan, 90, 8)',
  },
  {
    n: 2,
    title: 'Lane keeping',
    lede: 'Camera + colour threshold + steering. The same loop F1 teams run.',
    body: 'Move from LiDAR to vision. Find a coloured tape line in the frame and steer to keep it centred.',
    codeChip: 'cv2.findContours(mask, RETR_EXTERNAL, …)',
  },
  {
    n: 3,
    title: 'Gap follower',
    lede: 'Find the largest free arc in the LiDAR scan and aim for it.',
    body: 'No prior map needed. Works in arbitrary corridors. Foundation algorithm of the F1TENTH community.',
    codeChip: 'biggest_gap(scan, threshold=2.0)',
  },
  {
    n: 4,
    title: 'End-to-end RL',
    lede: 'PPO in the Playground sim, deploy unchanged to the car.',
    body: 'When you\'re ready to push further, you can train a neural network policy in the browser sim and run it on the car with the same Python API.',
    codeChip: 'policy.forward(obs).action',
  },
];

const popular = [
  { label: "Why is my LiDAR scan empty?", href: '/docs/troubleshooting/lidar-empty-scan' },
  { label: 'Motor trim, fix creep at zero speed', href: '/docs/calibration/motor-trim' },
  { label: 'Migrating an F1TENTH script to NeoRacer', href: '/docs/roboracer/migration-from-f1tenth' },
  { label: 'Recording a ROS 2 bag for replay', href: '/docs/software/telemetry-and-logs' },
  { label: 'Installing the ROS 2 driver', href: '/docs/getting-started/install-driver' },
];

export default function DocsLandingPage() {
  return (
    <DocsShell>
      {/* ── Section 1 · HERO ───────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingTop: 8, paddingBottom: 56 }}>
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
              maxWidth: 640,
              marginBottom: 8,
            }}
          >
            Everything you need to take a NeoRacer from a sealed box to a full
            autonomous lap, and everything you need to teach the next thirty
            students how to do the same.
          </p>
        </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section 2 · INTENT CARDS ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 72 }}>
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

      {/* ── Section 3 · FIG. A, DATA FLOW ────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 72 }}>
          <GhostNumeral n="A" top={-40} right={-20} size={420} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>01 / HARDWARE → SOFTWARE → HARDWARE</Eyebrow>
          <DisplayHeading size="lg">
            THE DATA <Red>FLOW</Red>
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
                <>Nodes don't call each other directly.</>,
                <>They publish on named channels (<strong>topics</strong>). Anyone listening picks them up.</>,
                <>NeoRacer's teleop starts <strong>four nodes</strong>.</>,
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
              <DataFlowDiagram />
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
              The four nodes that ship in <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>neoracer-teleop</code>.
              Your code lives in the red panel.
            </figcaption>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 4 · QUICK NAVIGATION ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 72 }}>
          <Eyebrow>02 / OR BROWSE BY TOPIC</Eyebrow>
        <DisplayHeading size="lg">
          BROWSE BY <Red>TOPIC.</Red>
        </DisplayHeading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
            marginTop: 12,
          }}
        >
          {topicGrid.map((t) => (
            <TopicHoverCard key={t.label} label={t.label} href={t.href} meta={t.n} />
          ))}
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 5 · BOX-TO-FIRST-LAP TIMELINE ─────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 72 }}>
          <GhostNumeral n="03" top={-50} right={-10} size={440} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>03 / YOUR FIRST HOUR</Eyebrow>
          <DisplayHeading size="lg">
            BOX TO <Red>FIRST LAP.</Red>
          </DisplayHeading>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
            }}
          >
            The Getting Started spine is five pages, each under ten minutes.
            The whole thing fits inside a single classroom period.
          </p>
          <div
            style={{
              marginTop: 24,
              background: NB.haloWhite,
              border: `1px solid ${NB.borderOnBeige}`,
              borderRadius: 14,
              padding: '8px 12px 18px',
              boxShadow: NB.shadowCard,
            }}
          >
            <FirstHourTimeline />
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 6 · WHAT YOU CAN BUILD ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 80 }}>
          <Eyebrow>04 / WHAT YOU'LL BUILD ALONG THE WAY</Eyebrow>
        <DisplayHeading size="lg">
          WHAT YOU'LL <Red>BUILD.</Red>
        </DisplayHeading>
        <p
          style={{
            fontFamily: NB.bodyFont,
            fontSize: 16,
            lineHeight: 1.65,
            color: NB.textMutedBeige,
            maxWidth: 720,
            marginBottom: 28,
          }}
        >
          These four are the foundation. The rest of autonomous racing, SLAM,
          MPC, RL, just builds on them.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 22,
            marginTop: 16,
          }}
        >
          {buildCards.map((b) => (
            <NumberedFeatureCard
              key={b.n}
              n={b.n}
              title={b.title}
              lede={b.lede}
              body={b.body}
              codeChip={b.codeChip}
            />
          ))}
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 7 · POPULAR / NEW ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          <div>
            <Eyebrow>05 / POPULAR</Eyebrow>
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
            <Eyebrow>06 / NEW</Eyebrow>
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
              <ChromeBadge variant="red">May 2026</ChromeBadge>
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
                v1.0, First shipping customer release.
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
                The full Getting Started spine, sensor reference, motor & servo
                calibration cookbook, and weeks 1 and 2 of the classroom curriculum.
                Roboracer F1TENTH parity matrix is live.
              </p>
              <Link
                href="/docs/reference/changelog"
                style={{
                  display: 'inline-block',
                  marginTop: 12,
                  fontFamily: NB.monoFont,
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: NB.neoboticsRed,
                  textDecoration: 'none',
                }}
              >
                Read the changelog →
              </Link>
            </div>
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 8 · BOTTOM CTA STRIP ──────────────────────────────── */}
      <ScrollReveal>
        <section
        style={{
          marginTop: 24,
          marginBottom: 24,
          background: NB.tarmacBlue,
          color: NB.haloWhite,
          borderRadius: 16,
          padding: '32px 28px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 20,
          alignItems: 'center',
          boxShadow: '0 12px 36px -8px rgba(27,32,54,0.4)',
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
            // BEFORE YOU BUY · TRY IT IN THE BROWSER
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
            Same Python API. <span style={{ color: NB.neoboticsRed }}>Zero install.</span>
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
            NeoRacer Playground is the in-browser simulator. Every line of code
            you write there runs unchanged on the physical car.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href="https://playground.neobotics.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: NB.haloWhite,
              color: NB.tarmacBlue,
              fontFamily: NB.bodyFont,
              fontSize: 14,
              fontWeight: 700,
              padding: '11px 18px',
              borderRadius: 8,
              textDecoration: 'none',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Open Playground ↗
          </a>
          <Link
            href="/kits/preorder"
            style={{
              background: NB.neoboticsRed,
              color: NB.haloWhite,
              fontFamily: NB.bodyFont,
              fontSize: 14,
              fontWeight: 700,
              padding: '11px 18px',
              borderRadius: 8,
              textDecoration: 'none',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              boxShadow: NB.shadowAccent,
            }}
          >
            Order a car
          </Link>
        </div>
        </section>
      </ScrollReveal>
    </DocsShell>
  );
}
