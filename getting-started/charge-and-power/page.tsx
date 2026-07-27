import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
  ClockGlyph,
  DashList,
  Fig,
  ExpandableFeatureCard,
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
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Charge & power' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              CHARGE &amp; <Red>POWER.</Red>
            </DisplayHeading>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}>~2-3 hours</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* You'll need */}
      <ScrollReveal>
        <section>
          <MonoLabel>You'll need</MonoLabel>
          <DashList
            items={[
              <>The LiPo charger that shipped with your kit.</>,
              <>An 11.1 V (3S) LiPo pack, <strong>you will need your own</strong>. See "Battery specs" below.</>,
              <>An AC outlet within reach.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="danger" title="Charging safety">
          Charge on a non-flammable surface (a LiPo bag is ideal) and stay
          in the room while it charges.
        </Callout>
      </ScrollReveal>

      {/* Battery specs */}
      <ScrollReveal>
        <section style={{ paddingTop: 20, paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            BATTERY <Red>SPECS.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The car runs on a standard 3-cell (3S) LiPo at 11.1 V nominal. Use a
            capacity between 4000 and 5500 mAh, a{' '}
            <InfoNote term="C-rating" title="C-rating">A rating of how fast a battery can safely deliver its energy. A higher number means the pack can supply more current without strain, which the car needs during hard acceleration.</InfoNote>{' '}
            of 25 or higher, and an XT60 connector to match the car&apos;s lead.
          </p>
        </section>
      </ScrollReveal>

      {/* Steps */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            CHARGING THE <Red>BATTERY.</Red>
          </DisplayHeading>
          {[
            { t: 'Place the LiPo on a non-flammable surface.', d: 'A concrete floor or a LiPo charging bag is ideal. Carpet, bedding, and wood can catch if a pack overheats.' },
            { t: 'Plug the AC side of the charger into the wall first.', d: 'You should see a power LED. If nothing lights up, double-check the outlet before continuing.' },
            { t: 'Connect the balance lead (white plug) to the charger\'s balance port.', d: 'The plug only fits one way, so if it resists, turn it around rather than pushing harder.' },
            { t: 'Connect the main XT60 lead.', d: <>You may see a brief spark, this is the <InfoNote term="inrush current" title="Inrush current">The sudden surge of current that flows the instant a circuit is connected, before it settles to a steady level. Here it briefly charges the capacitors inside the charger, which is why you see a small spark.</InfoNote> on the charger&apos;s capacitors and is normal.</> },
            { t: 'Confirm the charger is in 3S LiPo balance-charge mode.', d: 'Set LiPo and 3S on the charger screen. Current is settable up to 2.5 A, about half a C for a 5000 mAh pack, already under the 1C limit, so it cannot overdrive the pack.' },
            { t: 'Stay nearby until it reaches full.', d: 'The charger tops out at 25 W, which works out to about 2 A into a 3S pack, so a low 5000 mAh pack takes roughly two and a half to three hours.' },
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
          <DisplayHeading size="lg">
            SIGNS OF A BAD <Red>BATTERY.</Red>
          </DisplayHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 22, alignItems: 'start' }}>
            <ExpandableFeatureCard n={1} title="Swelling" lede="The pack looks puffy or balloon-shaped." body="A swollen pack is no longer safe to use. Disconnect it, move it somewhere fire-safe, and replace it. Do not charge it again." />
            <ExpandableFeatureCard n={2} title="Heat" lede="Warm is normal. Hot to touch is not." body="If you cannot comfortably hold the pack, stop charging and let it cool in a fire-safe location for 30 minutes before deciding to retire it." />
            <ExpandableFeatureCard n={3} title="Smell or smoke" lede="Sweet chemical smell or any visible smoke." body="Disconnect if you safely can, then leave the room and call your fire service if there is open flame. LiPo fires burn bright white and accelerate fast, so putting distance between you and the pack is the safest thing to do." />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Storage between sessions">
          If the car will sit for more than a week, the charger's "storage" mode
          settles the pack to ~3.85 V/cell (about 11.55 V total), the correct
          state for storage. A LiPo left fully charged or fully drained
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
