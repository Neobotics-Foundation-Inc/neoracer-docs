import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  TickMargin,
  DashList,
} from '@/components/docs/Editorial';
import {
  ScrollReveal,
  AnimatedDataFlowDiagram,
} from '@/components/docs/Interactive';
import PitLaneNav, { PitLaneSection } from '@/components/docs/PitLaneNav';

export const metadata: Metadata = {
  title: 'NeoRacer Docs, from sealed box to autonomous lap',
  description:
    'Documentation for the NeoRacer V1 autonomous racing kit. A six-page setup path, plus the full Python API and ROS 2 reference for researchers.',
};

/* ─────────────────────────────────────────────────────────────────────────
 * /docs landing page
 *
 * Editorial layout: massive Kernel headlines, ghost numerals, tick-mark
 * margins, FIG-labelled diagrams. The section nav is staged as a pit lane
 * with the CarSprite parking in front of wherever the reader is headed.
 * ─────────────────────────────────────────────────────────────────────── */

/* Hidden sections, kept in the file for reuse elsewhere in the docs later.
   Flip a flag to render its section again. */
const SHOW_DATA_FLOW = false;
const SHOW_PLAYGROUND_TEASE = false;

/* Bay order mirrors the sidebar. Counts are the real page counts in nav.ts;
   update both together when a page ships. */
const pitLane: PitLaneSection[] = [
  { title: 'Setup', href: '/docs/getting-started/unbox', pages: 6 },
  { title: 'Hardware', href: '/docs/hardware/overview', pages: 11 },
  { title: 'Software', href: '/docs/software/os-and-image', pages: 10 },
  { title: 'API Reference', href: '/docs/api-reference/python/drive', pages: 9 },
  { title: 'Calibration', href: '/docs/calibration/motor-trim', pages: 5, disabled: true },
  // Soft hyphen so narrow phone bays break it as TROUBLE-SHOOTING.
  { title: 'Trouble­shooting', href: '/docs/troubleshooting/faq', pages: 7, disabled: true },
  { title: 'Reference', href: '/docs/reference/specifications', pages: 5, disabled: true },
  { title: 'Legal', href: '/docs/legal/warranty', pages: 5, disabled: true },
];

export default function DocsLandingPage() {
  return (
    <DocsShell>
      {/* ── Section 1 · HERO ───────────────────────────────────────────── */}
      <section style={{ position: 'relative', paddingTop: 24, paddingBottom: 44 }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <TickMargin count={10} />
          <DisplayHeading size="2xl">
            NEORACER <Red>DOCS</Red>
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
            Welcome to the NeoRacer V1 documentation. If you have received
            your NeoRacer shipment, go to Setup to get started. For
            information on the NeoRacer&apos;s components and capabilities,
            take a look at Hardware and Software. For the library functions
            or ROS 2, check out the API Reference.
          </p>
        </div>
      </section>

      {/* ── Section 2 · THE PIT LANE ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 64 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <PitLaneNav sections={pitLane} />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 3 · FIG. A, DATA FLOW (hidden, see SHOW_DATA_FLOW) ── */}
      {SHOW_DATA_FLOW && (
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 64 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
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
                your code publishes, actuators subscribe. ROS 2 carries the
                messages between them.
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
              </figcaption>
            </div>
          </div>
        </section>
      </ScrollReveal>
      )}

      {/* ── Section 4 · SIMULATION TEASE (hidden, see SHOW_PLAYGROUND_TEASE) ──
           The Playground strip, blurred until launch. The content is real but
           unreadable and non-interactive (plain spans, no live URL in the
           DOM); a scan line and a COMING SOON plate sit on top. */}
      {SHOW_PLAYGROUND_TEASE && (
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
      )}
    </DocsShell>
  );
}
