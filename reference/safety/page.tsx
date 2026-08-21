import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Safety · Reference · NeoRacer Docs',
  description: 'The safety rules for running the NeoRacer: where to drive, how to stop it, and how to handle power and the battery.',
};

export default function SafetyPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Reference', href: '/docs/reference/safety' },
          { label: 'Safety' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              SAFETY <Red>RULES</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              Follow these rules whenever the car is powered.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            <Red>DRIVING</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Drive indoors, on smooth and dry floors. The electronics are not rated for moisture, sand, or grit.</>,
              <>Keep people, pets, and breakable objects out of the driving area. Keep at least 1 m of clearance. The car&apos;s top speed is 6 m/s, over 20 km/h.</>,
              <>Keep hands, hair, and loose clothing away from the wheels and drivetrain while the car is powered.</>,
              <>Watch every autonomous run with the transmitter in hand. Flip{' '}
                <code style={{ fontFamily: NB.monoFont }}>SWB</code> up to take
                manual control at any time.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            <Red>POWER</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Switch the car off before plugging or unplugging any connector.</>,
              <>Do not leave a stalled motor under power. A blocked wheel builds heat fast.</>,
              <>Stop driving if any part of the car is hot to the touch, and let it cool before the next run.</>,
              <>Keep metal objects away from the boards and connectors.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            <Red>BATTERY</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Charge on the balance charger, and stay nearby while it charges. The charging routine is on{' '}
                <Link href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Charge &amp; power</Link>.</>,
              <>Stop using a pack that is swollen, cracked, or leaking, and contact support.</>,
              <>Store the pack at 40&ndash;60% charge, out of the car. Storage rules are on{' '}
                <Link href="/docs/reference/maintenance" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Maintenance</Link>.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="danger" title="If something goes wrong">
          Flip <code style={{ fontFamily: NB.monoFont }}>SWB</code> up, switch
          the car off, and unplug the battery. Then email{' '}
          <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            support@neobotics.org
          </a>{' '}
          with what happened.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Maintenance', href: '/docs/reference/maintenance' }}
        next={{ label: 'Warranty', href: '/docs/legal/warranty' }}
      />
    </DocsShell>
  );
}
