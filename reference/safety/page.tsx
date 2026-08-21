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
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

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
              SAFETY <Red>PROCEDURES</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              We advise reading these safety procedures before using the
              NeoRacer.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            <Red>GENERAL</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Operators should have basic experience with robots or electronic devices. Children should operate the car under adult supervision.</>,
              <>Check the car before each use. Stop using it if you find a damaged housing, loose screws, or damaged cables.</>,
              <>After a drop or a hard impact, inspect the mechanical structure and the electrical connections before using the car again.</>,
              <>Do not use the car to carry people or animals.</>,
            ]}
          />
        </section>
      </ScrollReveal>

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
              <>If a sensor malfunctions, switch to manual control, stop the
                program, and troubleshoot the sensor connections. See{' '}
                <Link href="/docs/reference/troubleshooting" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Troubleshooting</Link>.</>,
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
              <>Use only the included charger and a battery that matches the specification in the Battery section.</>,
              <>Switch the car off before plugging or unplugging any connector.</>,
              <>Do not leave a stalled motor under power. A blocked wheel overheats the motor.</>,
              <>Stop driving if any part of the car is hot to the touch, and let it cool before the next run.</>,
              <>If you notice an unusual smell, smoke, or abnormal heating, cut the power, disconnect the battery, and move the car to a well-ventilated area. Do not keep using it.</>,
              <>Do not use or charge the car during thunderstorms.</>,
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
              <>Use a 3S (11.1 V) lithium pack with an XT60 plug. The recommended pack is 5200 mAh 35C.</>,
              <>Charge on the balance charger, in a well-ventilated and fireproof area away from flammable materials, and stay nearby while it charges. The charging routine is on{' '}
                <Link href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Charge &amp; power</Link>.</>,
              <>If the pack is deeply discharged, charge it at the lowest current, about 0.5&ndash;1 A.</>,
              <>Do not short-circuit the pack, immerse it in water, or expose it to open flames.</>,
              <>If the pack is swollen, cracked, leaking, smoking, or smells unusual, disconnect it, move it to a safe and well-ventilated area, and stop using it.</>,
              <>For classrooms, keep a sand bucket, a fire blanket, or a Class D extinguisher nearby.</>,
              <>Store the pack at 40&ndash;60% charge, out of the car. Storage rules are on{' '}
                <Link href="/docs/reference/maintenance" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Maintenance</Link>.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            <Red>MECHANICAL</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Routine mechanical checks and their schedule are on{' '}
                <Link href="/docs/reference/maintenance" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Maintenance</Link>.</>,
              <>After a collision, check the base plate and the shock absorbers.</>,
              <>3D printed parts are structural consumables. Report manufacturing defects, such as delamination or severe cracks, within 7 days of arrival; damage from normal use is not covered by the{' '}
                <Link href="/docs/legal/warranty" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>warranty</Link>.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 params', href: '/docs/api-reference/ros2/params' }}
        next={{ label: 'Troubleshooting', href: '/docs/reference/troubleshooting' }}
      />
    </DocsShell>
  );
}
