import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
  ClockGlyph,
  LevelGlyph,
  DashList,
  Fig,
} from '@/components/docs/Editorial';
import { BoxContentsDiagram } from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Unbox · NeoRacer Docs',
  description: 'What\'s in the box, what to set aside, and what NOT to plug in until you read the safety page.',
};

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
              Give yourself about eight minutes to lay everything out and confirm
              nothing is missing. The LiPo waits until the next page, so there's
              nothing to plug in just yet.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}><AnimatedNumeral value={8} suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline" icon={<LevelGlyph level={1} />}>Beginner</ChromeBadge>
              <ChromeBadge variant="outline">No tools required</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── What you'll need ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <MonoLabel>You'll need</MonoLabel>
          <DashList
            items={[
              <>A flat surface, roughly 1 metre by 1 metre.</>,
              <>The NeoRacer shipping box, sealed.</>,
              <>A phone or laptop nearby for the rest of Getting Started.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── FIG. A / Box contents ────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / WHAT'S IN THE BOX"
          caption="Four pieces come in the box. The 3S LiPo is the one you bring yourself, since international shipping rules keep us from sending batteries, and the Charge and Power page walks through exactly what to look for."
        >
          <BoxContentsDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Steps ─────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / WORK THROUGH IT</Eyebrow>
          <DisplayHeading size="lg">
            THE UNBOXING <Red>STEPS.</Red>
          </DisplayHeading>

          {[
          {
            t: 'Open the box.',
            d: 'Once the seal is cut, you will find the car cradled in foam, with the Flysky controller, the LiPo charger, and the Wi-Fi antenna packed alongside.',
          },
          {
            t: 'Lift the car out by the chassis rails.',
            d: 'The rails give you a firm hold, so it settles nicely on the flat surface with the wheels down.',
          },
          {
            t: 'Gather the controller, charger, and antenna.',
            d: 'It helps to set them next to FIG. A above and check everything is accounted for. If a piece did not make it into your box, send a note to support@neobotics.org with your order number and we will sort it out.',
          },
          {
            t: 'Get a 3S LiPo battery ready.',
            d: 'Due to various international shipping regulations, Neobotics does not directly sell LiPo batteries but we have the full specifications in the next page to help you find the right fit.',
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

      {/* ── Safety callout ────────────────────────────────────────────── */}
      <ScrollReveal>
        <Callout type="danger" title="The LiPo can wait a little longer">
          LiPo packs can catch fire if they are mishandled, so it is safest to keep
          your{' '}<InfoNote term="3S" title="3S LiPo">A LiPo battery built from three cells wired in series. The 3S configuration sets the pack's voltage, which is why the car needs that specific type.</InfoNote>{' '}pack sealed in its bag for now. It stays there until the{' '}
          <Link href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            Charge and Power
          </Link>{' '}
          page walks you through the safe routine.
        </Callout>
      </ScrollReveal>

      {/* ── What's next ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ marginTop: 40 }}>
          <Eyebrow>03 / NEXT</Eyebrow>
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
