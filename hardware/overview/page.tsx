import Link from 'next/link';
import Image from 'next/image';
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
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';
import { HardwareConnectionDiagram } from '@/components/docs/ManualDiagrams';

export const metadata: Metadata = {
  title: 'Hardware overview · NeoRacer Docs',
  description: 'A single-page anatomy of the NeoRacer V1: compute, sensors, drivetrain, power, and chassis at a glance.',
};

/* The real car, torn down and knolled. One source of truth for the figure
 * AND the part list below it: label positions are percentages of the photo
 * (placed by hand with the click-to-label tool), each part has its own
 * colour, and every part links to its page. `flip` puts the pill on the
 * left of its dot (right-edge parts, and the LiPo so it stays clear of the
 * chassis label beside it). */
const ANATOMY_PARTS: {
  name: string;
  x: number;
  y: number;
  color: string;
  href: string;
  sub: string;
  flip?: boolean;
}[] = [
  { name: 'Front bumper', x: 47.6, y: 2.9, color: '#64748B', href: '/docs/build/overview', sub: 'Printed crash protection for the nose' },
  { name: 'Camera', x: 48.9, y: 8.6, color: '#FF0033', href: '/docs/hardware/sensors/camera', sub: '1080p · 120 fps' },
  { name: 'Jetson Orin Nano', x: 26.8, y: 19.9, color: '#0E8A4F', href: '/docs/hardware/compute', sub: 'AI accelerator + Linux host' },
  { name: 'Side cover', x: 95.6, y: 22.7, color: '#1B2036', href: '/docs/build/overview', sub: 'Closes the electronics bay' },
  { name: 'OSCORE PCB', x: 81.4, y: 25.9, color: '#7A3FB0', href: '/docs/hardware/oscore-board', sub: 'Power + control board, ESP32-S3' },
  { name: '1:12 chassis', x: 54.9, y: 52.4, color: '#B45309', href: '/docs/hardware/drivetrain', sub: 'Motor, servo, and suspension on the rolling base' },
  { name: 'LiPo compartment', x: 46.6, y: 51.9, color: '#C2185B', href: '/docs/hardware/power', sub: '11.1 V · 3S · battery NOT included', flip: true },
  { name: 'LiDAR', x: 37.1, y: 78.2, color: '#0E9594', href: '/docs/hardware/sensors/lidar', sub: '30 Hz · 25 m · 720 samples' },
  { name: 'Dot matrix display', x: 54.1, y: 80.6, color: '#4F46E5', href: '/docs/build/overview', sub: '8 × 8 LEDs, the car’s face' },
  { name: 'Cudy router', x: 70.9, y: 74.9, color: '#EA580C', href: '/docs/software/networking', sub: 'The car-to-laptop network' },
  { name: 'Rear wing', x: 53.3, y: 95.3, color: '#0284C7', href: '/docs/build/overview', sub: 'Printed, swappable tail' },
];

function AnatomyDiagram() {
  return (
    <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto', borderRadius: 8, overflow: 'hidden' }}>
      <Image
        src="/images/build/exploded-topdown.jpg"
        alt="The NeoRacer torn down: every component laid out around the bare chassis, photographed from above"
        width={902}
        height={1800}
        sizes="(max-width: 640px) 100vw, 560px"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      {ANATOMY_PARTS.map((p, i) => {
        const flip = p.flip || p.x > 72;
        const nn = String(i + 1).padStart(2, '0');
        return (
          <div
            key={p.name}
            style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <span
              style={{
                display: 'block',
                width: 11,
                height: 11,
                borderRadius: '50%',
                background: p.color,
                border: '2px solid #fff',
                boxShadow: `0 0 0 1.5px ${p.color}B3`,
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: -4,
                ...(flip ? { right: 16 } : { left: 16 }),
                fontFamily: NB.monoFont,
                fontSize: 'clamp(8.5px, 1.9vw, 11px)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: p.color,
                background: 'rgba(255,255,255,0.93)',
                border: `1px solid ${p.color}59`,
                borderRadius: 4,
                padding: '1.5px 6px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontWeight: 900 }}>{nn}</span> {p.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function HardwareOverviewPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Overview' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="H" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / OVERVIEW</Eyebrow>
            <DisplayHeading size="xl">
              THE HARDWARE <Red>ANATOMY.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer is built around a Jetson Orin Nano compute brain, a
              planar{' '}
              <InfoNote term="LiDAR" title="LiDAR">
                A sensor that spins a laser around and times how long each pulse takes to bounce back, building a 2D map of the walls and obstacles around the car.
              </InfoNote>{' '}
              up front, a 1080p camera, an{' '}
              <InfoNote term="IMU" title="IMU">
                Inertial measurement unit. It combines an accelerometer and a gyroscope to report how the car is accelerating and rotating, which helps track its motion.
              </InfoNote>+encoder MCU (microcontroller unit) stack,
              and a brushed-motor / servo{' '}
              <InfoNote term="Ackermann" title="Ackermann Steering">
                A steering geometry where the front wheels turn by different amounts so both trace circles around the same point, the way a real car steers, instead of pivoting like a tank.
              </InfoNote>{' '}
              drivetrain. Everything below
              links to a dedicated page.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">380 × 300 × 220 mm</ChromeBadge>
              <ChromeBadge variant="outline">Wheelbase 280 mm</ChromeBadge>
              <ChromeBadge variant="outline">≤ 25 km/h</ChromeBadge>
              <ChromeBadge variant="outline">6061 aluminium / composite</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Fig
          label="FIG. A / THE CAR, LAID OUT"
          caption="A real NeoRacer, torn down and photographed from above. The list below links the major subsystems to their pages."
        >
          <AnatomyDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>01 / EVERY PART IN FIG. A</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>PARTS.</Red>
          </DisplayHeading>
          <div style={{ marginTop: 16 }}>
            {ANATOMY_PARTS.map((part, i) => {
              const row = {
                n: String(i + 1).padStart(2, '0'),
                color: part.color,
                name: part.name,
                href: part.href,
                sub: part.sub,
              };
              return (
              <Link
                key={row.n}
                href={row.href}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '52px 1fr auto',
                  gap: 16,
                  padding: '18px 0',
                  borderBottom: `1px solid ${NB.borderOnBeige}`,
                  textDecoration: 'none',
                  color: NB.textOnBeige,
                  alignItems: 'center',
                }}
              >
                <div style={{ fontFamily: NB.headingFont, fontSize: 28, fontWeight: 900, color: row.color, lineHeight: 1 }}>
                  {row.n}
                </div>
                <div>
                  <div style={{ fontFamily: NB.headingFont, fontSize: 20, fontWeight: 700, color: NB.textOnBeige }}>
                    {row.name}
                  </div>
                  <div style={{ fontFamily: NB.monoFont, fontSize: 12.5, letterSpacing: '0.06em', color: NB.textMutedBeige, marginTop: 4 }}>
                    {row.sub}
                  </div>
                </div>
                <div style={{ color: NB.neoboticsRed, fontFamily: NB.monoFont, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }}>
                  READ →
                </div>
              </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Fig
          label="FIG. B / HOW IT ALL CONNECTS"
          caption="The signal architecture: the Jetson host fans out over USB 3.2 to the LiDAR, camera, and lower controller; the controller in turn drives the ESC and servo and reads the encoder and RF receiver. Power wiring lives on the Electrical page."
        >
          <HardwareConnectionDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Want to see the diagram in 3D?">
          The same anatomy is interactive at{' '}
          <Link href="/kits/visualize" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            /kits/visualize
          </Link>
          , where you can rotate any component, look inside it, and read its marketing-grade specs.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'First program', href: '/docs/getting-started/first-program' }}
        next={{ label: 'Compute', href: '/docs/hardware/compute' }}
      />
    </DocsShell>
  );
}
