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
  DashList,
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { Crumbs, Callout, PrevNext, Code } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'Charge & power · NeoRacer Docs',
  description: 'Charge an 11.1 V LiPo pack safely, power the car for the first time, and learn the LED states.',
};

export default function ChargeAndPowerPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Getting Started', href: '/docs/getting-started/unbox' },
          { label: 'Charge & power' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>STEP 02 / GETTING STARTED</Eyebrow>
            <DisplayHeading size="xl">
              CHARGE THE <Red>BATTERY.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              This page covers charging the 3S LiPo pack, what the charger shows
              along the way, and how to store it between sessions.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}>1–2 hours (first charge)</ChromeBadge>
              <ChromeBadge variant="outline">Charger included</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="danger" title="Two things keep charging safe">
          <strong>1.</strong> A charging LiPo can fail fast, so staying in the
          room while it charges is the safe move.{' '}
          <strong>2.</strong> A hard, non-flammable surface (a LiPo charging bag
          is ideal) keeps any heat away from anything that can catch. The rest of
          this page assumes both are in place.
        </Callout>
      </ScrollReveal>

      {/* You'll need */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <MonoLabel>You'll need</MonoLabel>
          <DashList
            items={[
              <>The LiPo charger that shipped with your kit.</>,
              <>An 11.1 V (3S) LiPo pack, <strong>you supply this</strong>. See "Recommended packs" below.</>,
              <>A hard surface (concrete, tile, or a LiPo charging bag), not a bed or carpet.</>,
              <>An AC outlet within reach.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Recommended packs */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>01 / RECOMMENDED PACKS</Eyebrow>
          <DisplayHeading size="lg">
            RECOMMENDED <Red>PACKS.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The car runs on a standard 3-cell (3S) LiPo at 11.1 V nominal. Capacity
            between 4000 and 5500 mAh tends to be the sweet spot: longer runtime than
            smaller packs, lighter than larger ones. A{' '}
            <InfoNote term="C-rating" title="C-rating">A rating of how fast a battery can safely deliver its energy. A higher number means the pack can supply more current without strain, which the car needs during hard acceleration.</InfoNote>{' '}
            of 25 or higher gives
            you the headroom the car wants.
          </p>
          <div style={{ marginTop: 18, background: NB.haloWhite, border: `1px solid ${NB.borderOnBeige}`, borderRadius: 10, padding: '16px 18px', boxShadow: NB.shadowCard }}>
            <div style={{ fontFamily: NB.monoFont, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: NB.textMutedBeige }}>
              Specs to match
            </div>
            <div style={{ marginTop: 8, fontFamily: NB.monoFont, fontSize: 14, lineHeight: 1.85, color: NB.textOnBeige }}>
              Voltage:&nbsp;&nbsp;&nbsp;<span style={{ color: NB.neoboticsRed }}>11.1 V (3S)</span>
              <br />
              Capacity:&nbsp;&nbsp;4000 to 5500 mAh
              <br />
              C-rating:&nbsp;&nbsp;<span style={{ color: NB.neoboticsRed }}>≥ 25C</span> (discharge)
              <br />
              Connector: XT60 (match the car's lead)
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Steps */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / FIRST CHARGE</Eyebrow>
          <DisplayHeading size="lg">
            THE FIRST <Red>CHARGE.</Red>
          </DisplayHeading>
          {[
            { t: 'Place the LiPo on a hard, non-flammable surface.', d: 'A concrete floor or a LiPo charging bag is ideal. Carpet, bedding, and wood can catch if a pack overheats, so steer clear of those.' },
            { t: 'Plug the AC side of the charger into the wall first.', d: 'You should see a power LED. If nothing lights up, double-check the outlet before continuing.' },
            { t: 'Connect the balance lead (white plug) to the charger\'s balance port.', d: 'The plug only fits one way, so if it resists, turn it around rather than pushing harder.' },
            { t: 'Connect the main XT60 lead.', d: <>You may see a brief spark, this is the <InfoNote term="inrush current" title="Inrush current">The sudden surge of current that flows the instant a circuit is connected, before it settles to a steady level. Here it briefly charges the capacitors inside the charger, which is why you see a small spark.</InfoNote> on the charger&apos;s capacitors and is normal.</> },
            { t: 'Confirm the charger is in 3S balance-charge mode at ≤ 1C.', d: 'For a 5000 mAh pack, that is 5 A or lower. 1 A is fine too if you have the time, and a slower charge is gentler on the pack.' },
            { t: 'Keep the pack company until it reaches full.', d: 'A 5000 mAh pack at 1C takes roughly one hour. The charger signals complete with a solid LED or an audible tone, so you will know when it is done.' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16, padding: '20px 0', borderBottom: `1px solid ${NB.borderOnBeige}` }}>
              <div style={{ fontFamily: NB.headingFont, fontSize: 36, fontWeight: 900, lineHeight: 1, color: NB.neoboticsRed, letterSpacing: '-0.02em' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div style={{ fontFamily: NB.headingFont, fontSize: 20, fontWeight: 700, color: NB.textOnBeige, marginBottom: 4 }}>{s.t}</div>
                <p style={{ fontFamily: NB.bodyFont, fontSize: 15, lineHeight: 1.65, color: NB.textMutedBeige, margin: 0 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* Three things */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / WHAT TO WATCH FOR</Eyebrow>
          <DisplayHeading size="lg">
            WARNING <Red>SIGNS.</Red>
          </DisplayHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, marginTop: 22 }}>
            <NumberedFeatureCard n={1} title="Swelling" lede="The pack looks puffy or balloon-shaped." body="A swollen pack is done, so disconnect it and move it somewhere fire-safe. It is best replaced rather than recharged." />
            <NumberedFeatureCard n={2} title="Heat" lede="Warm is normal. Hot to touch is not." body="If you cannot comfortably hold the pack, stop charging and let it cool in a fire-safe location for 30 minutes before deciding to retire it." />
            <NumberedFeatureCard n={3} title="Smell or smoke" lede="Sweet chemical smell or any visible smoke." body="Disconnect if you safely can, then leave the room and call your fire service if there is open flame. LiPo fires burn bright white and accelerate fast, so putting distance between you and the pack is the safest thing to do." />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Storage between sessions">
          If the car will sit for more than a week, the charger's "storage" mode
          settles the pack to ~3.85 V/cell (about 11.55 V total), which is the
          happiest place for it to rest. A LiPo left fully charged or fully drained
          ages a lot faster.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Unbox', href: '/docs/getting-started/unbox' }}
        next={{ label: 'Get on the car', href: '/docs/getting-started/connect-to-car' }}
      />
    </DocsShell>
  );
}
