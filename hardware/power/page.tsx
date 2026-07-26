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
  DashList,
  Fig,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Power · Hardware · NeoRacer Docs',
  description: '11.1 V 3S LiPo input, runtime expectations, recommended packs, and what the kit charger does and does not do.',
};

/* Runtime curve, rough hand-shaded chart. */
function RuntimeChart() {
  return (
    <svg viewBox="0 0 520 280" width="100%" style={{ display: 'block', maxWidth: 600, margin: '0 auto' }}>
      <rect x="20" y="20" width="480" height="240" rx="6" fill={NB.haloWhite} stroke={NB.tarmacBlue} strokeWidth="1.5" />
      <text x="260" y="14" fontFamily={NB.monoFont} fontSize="11" fill={NB.tarmacBlue} fontWeight="700" letterSpacing="2" textAnchor="middle">
        RUNTIME vs. PACK CAPACITY · MIXED USE
      </text>

      {/* Axes */}
      <line x1="80" y1="40" x2="80" y2="220" stroke={NB.tarmacBlue} strokeWidth="1.5" />
      <line x1="80" y1="220" x2="460" y2="220" stroke={NB.tarmacBlue} strokeWidth="1.5" />

      {/* Y ticks */}
      {[1, 2, 3, 4, 5].map((h, i) => {
        const y = 220 - (i + 1) * 30;
        return (
          <g key={h}>
            <line x1="76" y1={y} x2="80" y2={y} stroke={NB.tarmacBlue} strokeWidth="1" />
            <text x="68" y={y + 4} fontFamily={NB.monoFont} fontSize="10" fill={NB.tarmacBlue} fontWeight="700" textAnchor="end">
              {h}h
            </text>
          </g>
        );
      })}

      {/* X ticks */}
      {[3000, 4000, 5000, 6000].map((mAh, i) => {
        const x = 130 + i * 95;
        return (
          <g key={mAh}>
            <line x1={x} y1="220" x2={x} y2="224" stroke={NB.tarmacBlue} strokeWidth="1" />
            <text x={x} y="240" fontFamily={NB.monoFont} fontSize="10" fill={NB.tarmacBlue} fontWeight="700" textAnchor="middle">
              {mAh}
            </text>
          </g>
        );
      })}
      <text x="270" y="253" fontFamily={NB.monoFont} fontSize="10" fill={NB.tarmacBlue} fontWeight="700" textAnchor="middle">
        mAh
      </text>

      {/* Curve, approximate, mixed-use */}
      <path d="M 130 190 Q 200 165 260 140 T 420 90" stroke={NB.neoboticsRed} strokeWidth="3" fill="none" />
      {/* Data dots */}
      {[
        [130, 190, '~1.5 h'],
        [225, 158, '~2.5 h'],
        [320, 122, '~3.5 h'],
        [420, 90, '~5 h'],
      ].map(([x, y, label], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="5" fill={NB.neoboticsRed} />
          <text x={(x as number) + 10} y={(y as number) + 4} fontFamily={NB.monoFont} fontSize="10" fill={NB.tarmacBlue} fontWeight="700">
            {label}
          </text>
        </g>
      ))}

      {/* Legend */}
      <text x="100" y="50" fontFamily={NB.bodyFont} fontSize="11" fill={NB.textMutedBeige} fontStyle="italic">
        Approximate. Real runtime varies with throttle profile and ambient temperature.
      </text>
    </svg>
  );
}

export default function PowerPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Power' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="P" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / POWER</Eyebrow>
            <DisplayHeading size="xl">
              THE 3S LIPO <Red>PACK.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer runs on a standard 3-cell (3S){' '}
              <InfoNote term="LiPo" title="LiPo">
                Lithium polymer battery. It packs a lot of energy into a light
                pack, which is why it powers most RC cars and drones, and why it
                needs careful charging.
              </InfoNote>{' '}
              at 11.1 V nominal, and the{' '}
              <InfoNote term="balance charger" title="Balance charger">
                A charger that monitors each cell in the pack separately and
                tops them up to the same voltage. Keeping the cells matched is
                what keeps a multi-cell pack safe and healthy.
              </InfoNote>{' '}
              ships in the box. Because of international
              shipping rules around lithium packs, Neobotics doesn't include the
              battery itself, so you'll bring your own. The recommended specs and
              the safe charging routine live one page deeper.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">11.1 V · 3S</ChromeBadge>
              <ChromeBadge variant="outline">4000-5500 mAh</ChromeBadge>
              <ChromeBadge variant="outline">≥ 25C discharge</ChromeBadge>
              <ChromeBadge variant="outline">XT60 connector</ChromeBadge>
              <ChromeBadge variant="red">Charger included</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="danger" title="Battery safety lives on its own page">
          Every LiPo rule and the step-by-step charging routine live on the{' '}
          <Link href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            Charge &amp; power
          </Link>{' '}
          page, and it's the one worth reading start to finish. The summary here
          is a quick reference.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <Fig
          label="FIG. A / RUNTIME vs. PACK CAPACITY"
          caption="Approximate runtime for a mixed-use session, half teleop, half autonomous laps. Real runs vary with throttle profile and temperature."
        >
          <RuntimeChart />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>01 / WHAT THE PACK POWERS</Eyebrow>
          <DisplayHeading size="lg">
            WHAT THE PACK <Red>POWERS.</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>The Jetson Orin Nano (~10 W idle, ~20 W under perception load).</>,
              <>The motor + servo (peaks of 60 W under hard accel and turn).</>,
              <>The Wi-Fi antenna,{' '}
                <InfoNote term="IMU" title="IMU">
                  Inertial measurement unit. A small sensor that measures
                  acceleration and rotation, so the car can sense how it is
                  moving and turning.
                </InfoNote>{' '}
                MCU (microcontroller unit), and LED indicators.</>,
              <>The buck regulators that step 11.1 V down to logic-level rails.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / STORAGE</Eyebrow>
          <DisplayHeading size="lg">
            STORAGE <Red>VOLTAGE.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            A 3S pack left at full (12.6 V) ages quickly, and a pack left flat
            (≤ 9 V) won't come back. The happy middle is around 11.55 V, and the
            included charger has a storage mode that brings any pack right to that
            voltage. It's the kind thing to do whenever the car will sit for more
            than a week.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Drivetrain', href: '/docs/hardware/drivetrain' }}
        next={{ label: 'Chassis & CAD', href: '/docs/hardware/chassis-and-cad' }}
      />
    </DocsShell>
  );
}
