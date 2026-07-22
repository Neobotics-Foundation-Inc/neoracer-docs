import Image from 'next/image';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
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
    d: 'The antenna, its U.FL-to-SMA lead, and the washers that mount the lead through the chassis. These go on in Get on the car.',
  },
  {
    src: '/images/unbox-zip-ties.jpeg',
    name: 'Zip ties',
    d: 'For routing the antenna leads and cables clear of the wheels and belt.',
  },
  {
    src: '/images/unbox-cover-screws.jpeg',
    name: 'Side-cover screws',
    d: 'Spares for the 3D-printed side covers.',
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
          { label: 'Docs', href: '/docs' },
          { label: 'Getting Started', href: '/docs/getting-started/unbox' },
          { label: 'Unbox' },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>STEP 01 / GETTING STARTED</Eyebrow>
            <DisplayHeading size="xl">
              UNBOX THE <Red>NEORACER.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 18,
                lineHeight: 1.55,
                color: NB.textMutedBeige,
                maxWidth: 680,
              }}
            >
              Give yourself roughly 10 minutes to lay everything out and confirm
              nothing is missing. The LiPo waits until the next page, so there's
              nothing to plug in just yet.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}><AnimatedNumeral value={10} prefix="~" suffix=" minutes" /></ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A / Box contents ────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / WHAT'S IN THE BOX"
          caption="What comes in the box. The accessories are itemized below. The 3S LiPo is the one you bring yourself, since international shipping rules keep us from sending batteries, and the Charge and Power page walks through exactly what to look for."
        >
          <BoxContentsDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Accessories ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / ALSO IN THE BOX</Eyebrow>
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

      {/* ── Steps ─────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / WORK THROUGH IT</Eyebrow>
          <DisplayHeading size="lg">
            THE UNBOXING <Red>STEPS.</Red>
          </DisplayHeading>

          {[
          {
            t: 'Open the box.',
            d: 'Once the seal is cut, you will find the car cradled in foam, with the Flysky controller, the LiPo charger, the cudy router, and the Wi-Fi antenna packed alongside.',
          },
          {
            t: 'Lift the car out by the chassis rails.',
            d: 'The rails give you a firm hold, so it settles nicely on the flat surface with the wheels down.',
          },
          {
            t: 'Gather the controller, charger, router, and antenna.',
            d: 'It helps to set them next to FIG. A above and check everything is accounted for. If a piece did not make it into your box, send a note to support@neobotics.org with your order number and we will sort it out.',
          },
          {
            t: 'Get a 3S LiPo battery ready.',
            d: 'International shipping regulations stop us from selling LiPo batteries directly, so the next page has the full specifications for finding the right pack.',
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '52px 1fr',
              gap: 16,
              padding: '20px 0',
              borderBottom: `1px solid ${NB.borderOnBeige}`,
            }}
          >
            <div
              style={{
                fontFamily: NB.headingFont,
                fontSize: 36,
                fontWeight: 900,
                lineHeight: 1,
                color: NB.neoboticsRed,
                letterSpacing: '-0.02em',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <div
                style={{
                  fontFamily: NB.headingFont,
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: '-0.005em',
                  marginBottom: 4,
                  color: NB.textOnBeige,
                }}
              >
                {s.t}
              </div>
              <p
                style={{
                  fontFamily: NB.bodyFont,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: NB.textMutedBeige,
                  margin: 0,
                }}
              >
                {s.d}
              </p>
            </div>
          </div>
        ))}
        </section>
      </ScrollReveal>

      {/* ── What's next ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ marginTop: 40 }}>
          <Eyebrow>04 / NEXT</Eyebrow>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, color: NB.textMutedBeige, marginTop: 6 }}>
            Everything is laid out. The next page covers charging the LiPo.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Docs home', href: '/docs' }}
        next={{ label: 'Charge & power', href: '/docs/getting-started/charge-and-power' }}
      />
    </DocsShell>
  );
}
