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
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { CarSprite } from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Hardware overview · NeoRacer Docs',
  description: 'A single-page anatomy of the NeoRacer V1: compute, sensors, drivetrain, power, and chassis at a glance.',
};

/* Exploded anatomy diagram, labelled callouts over a top-down car silhouette. */
function AnatomyDiagram() {
  return (
    <svg viewBox="0 0 540 282" width="100%" style={{ display: 'block', maxWidth: 620, margin: '0 auto' }}>
      <rect x="20" y="24" width="500" height="244" rx="6" fill={NB.haloWhite} stroke={NB.tarmacBlue} strokeWidth="1.5" />
      <text x="270" y="16" fontFamily={NB.monoFont} fontSize="11" fill={NB.tarmacBlue} fontWeight="700" letterSpacing="2" textAnchor="middle">
        TOP-DOWN ANATOMY · 380 × 300 mm
      </text>

      {/* The real NeoRacer, top down, nose up. Centred where the chassis was. */}
      <CarSprite cx={270} cy={158} size={188} heading={0} />

      {/* Callouts. Each label sits at its part's height with a short straight
          horizontal leader, so the lines never cross and never run through the
          text. Numbers match the subsystem list below (the legend). */}
      {[
        { n: '01', name: 'Camera', side: 'L', tx: 271, ty: 95 },
        { n: '02', name: 'Jetson Orin Nano', side: 'L', tx: 273, ty: 143 },
        { n: '03', name: 'LiDAR', side: 'L', tx: 275, ty: 176 },
        { n: '04', name: 'Motor & servo', side: 'R', tx: 276, ty: 114 },
        { n: '05', name: 'LiPo bay', side: 'R', tx: 246, ty: 153 },
        { n: '06', name: 'IMU + MCU', side: 'R', tx: 290, ty: 186 },
      ].map((c) => {
        const left = c.side === 'L';
        const textX = left ? 184 : 356;
        const leadStart = left ? 190 : 350;
        const leadEnd = left ? c.tx - 7 : c.tx + 7;
        return (
          <g key={c.n}>
            <line x1={leadStart} y1={c.ty} x2={leadEnd} y2={c.ty} stroke={NB.tarmacBlue} strokeWidth="1" opacity="0.4" />
            <circle cx={c.tx} cy={c.ty} r="4" fill={NB.neoboticsRed} stroke={NB.haloWhite} strokeWidth="1.5" />
            <text x={textX} y={c.ty + 3.5} textAnchor={left ? 'end' : 'start'} fontFamily={NB.monoFont} fontSize="11" fontWeight="700" fill={NB.tarmacBlue}>
              <tspan fill={NB.neoboticsRed} fontWeight="900">{c.n}</tspan>{`  ${c.name}`}
            </text>
          </g>
        );
      })}
    </svg>
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
          label="FIG. A / TOP-DOWN ANATOMY"
          caption="Six major subsystems. Each numbered part has its own page in the list below."
        >
          <AnatomyDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>01 / THE SEVEN SUBSYSTEMS</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>SUBSYSTEMS.</Red>
          </DisplayHeading>
          <div style={{ marginTop: 16 }}>
            {[
              { n: '01', name: 'Camera', href: '/docs/hardware/sensors/camera', sub: '1080p · 120 fps' },
              { n: '02', name: 'Jetson Orin Nano', href: '/docs/hardware/compute', sub: 'AI accelerator + Linux host' },
              { n: '03', name: 'LiDAR', href: '/docs/hardware/sensors/lidar', sub: '30 Hz · 25 m · 720 samples' },
              { n: '04', name: 'Motor + servo', href: '/docs/hardware/drivetrain', sub: '11,000 RPM no-load · 20 kg servo' },
              { n: '05', name: 'LiPo power', href: '/docs/hardware/power', sub: '11.1 V · 3S · battery NOT included' },
              { n: '06', name: 'IMU + microcontroller', href: '/docs/hardware/sensors/imu', sub: '6-DOF · 100 Hz · ESP32-class' },
            ].map((row) => (
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
                <div style={{ fontFamily: NB.headingFont, fontSize: 28, fontWeight: 900, color: NB.neoboticsRed, lineHeight: 1 }}>
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
            ))}
          </div>
        </section>
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
