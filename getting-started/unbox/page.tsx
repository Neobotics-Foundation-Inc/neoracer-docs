import Image from 'next/image';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  ClockGlyph,
  Fig,
} from '@/components/docs/Editorial';
import { BoxContentsDiagram } from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Unbox · NeoRacer Docs',
  description: 'What\'s in the box: the car, controller, charger, router, and antenna, plus the small accessories that ship alongside them.',
};

const ACCESSORIES = [
  {
    src: '/images/unbox-antenna-kit.jpeg',
    name: 'Wi-Fi antenna kit',
    d: 'The antenna, its U.FL-to-SMA lead, and the washers that mount the lead through the chassis.',
  },
  {
    src: '/images/unbox-zip-ties.jpeg',
    name: 'Zip ties',
    d: 'For routing the antenna leads and cables clear of the wheels and belt.',
  },
  {
    src: '/images/unbox-cover-screws.jpeg',
    name: 'Side-cover screws',
    d: 'Screws for the 3D-printed side plates, with one spare.',
  },
  {
    src: '/images/unbox-flysky-cable.jpeg',
    name: 'Controller data cable',
    d: "USB-A to micro-USB, for updating the Flysky's firmware from a computer.",
  },
  {
    src: '/images/unbox-flysky-bracket.jpeg',
    name: 'Controller bracket',
    d: "The Flysky's metal bracket and its two screws.",
  },
];

export default function UnboxPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Unbox' },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              UNBOX THE <Red>NEORACER.</Red>
            </DisplayHeading>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}><AnimatedNumeral value={10} prefix="~" suffix=" minutes" /></ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A / Box contents ────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / YOUR NEORACER SHIPMENT"
          caption="The NeoRacer ships in a single cardboard box holding two smaller boxes: the NeoRacer box and the FlySky controller box. The NeoRacer box contains the car itself, the Cudy router, the ToolkitRC charger, and accessories such as screws, sidepods, antennas, and zip ties (see below). The Cudy router box contains an Ethernet cable and a USB-C cable, and the FlySky box contains the controller, a USB-A to micro-USB cable, and its metal bracket."
        >
          <BoxContentsDiagram />

          {/* Not in the box: the battery you bring yourself */}
          <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 2px 12px' }}>
            <span aria-hidden style={{ flex: '0 0 auto', width: 18, height: 2, background: NB.neoboticsRed }} />
            <span
              style={{
                fontFamily: NB.monoFont,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: NB.neoboticsRed,
              }}
            >
              Not in the box
            </span>
          </div>
          <div
            style={{
              border: `1.5px dashed ${NB.neoboticsRed}`,
              background: '#FFEEF1',
              borderRadius: 8,
              padding: '14px 12px',
              minHeight: 72,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: NB.headingFont,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: NB.neoboticsRed,
              }}
            >
              BATTERY
            </div>
            <div
              style={{
                fontFamily: NB.monoFont,
                fontSize: 10.5,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: NB.neoboticsRed,
                marginTop: 4,
              }}
            >
              Sourced separately
            </div>
          </div>
          </div>
        </Fig>
      </ScrollReveal>

      {/* ── Accessories ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            THE <Red>ACCESSORIES.</Red>
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
            A few small parts ship alongside the main pieces. Keep them with the
            box; each one has its moment later in the setup.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: 18,
              marginTop: 20,
            }}
          >
            {ACCESSORIES.map((a) => (
              <div
                key={a.name}
                style={{
                  background: NB.haloWhite,
                  border: `1px solid ${NB.borderOnBeige}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={a.src}
                  alt={a.name}
                  width={4032}
                  height={3024}
                  sizes="(max-width: 640px) 100vw, 300px"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{ padding: '12px 14px 14px' }}>
                  <div
                    style={{
                      fontFamily: NB.monoFont,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: NB.neoboticsRed,
                      marginBottom: 6,
                    }}
                  >
                    {a.name}
                  </div>
                  <p
                    style={{
                      fontFamily: NB.bodyFont,
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      color: NB.textMutedBeige,
                      margin: 0,
                    }}
                  >
                    {a.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Docs home', href: '/docs' }}
        next={{ label: 'Charge & power', href: '/docs/getting-started/charge-and-power' }}
      />
    </DocsShell>
  );
}
