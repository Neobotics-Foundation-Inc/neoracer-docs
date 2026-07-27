import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
  SpecNumeral,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Specifications · Reference · NeoRacer Docs',
  description:
    'The single source of truth for every NeoRacer V1 spec. Compute, sensors, drivetrain, power, connectivity. Every other docs page links here.',
};

export default function SpecificationsPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Reference', href: '/docs/reference/specifications' },
          { label: 'Specifications' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="V1" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <DisplayHeading size="xl">
            THE NEORACER V1 <Red>SPECIFICATIONS</Red>
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
            This is the canonical spec sheet. Every other docs page that
            quotes a number links back to this one, so if a value changes
            it changes in exactly one place. If you ever spot a number that
            disagrees somewhere else on the site, this page is the one to
            trust.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <ChromeBadge variant="red">v1.0</ChromeBadge>
            <ChromeBadge variant="outline">May 2026</ChromeBadge>
            <ChromeBadge variant="outline">First-customer release</ChromeBadge>
          </div>
        </div>
        </section>
      </MouseFollowGlow>

      {/* ── Headline figures ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 56 }}>
          <MonoLabel>Headline figures</MonoLabel>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
            marginTop: 12,
          }}
        >
          <SpecNumeral
            value={<AnimatedNumeral value={67} />}
            unit="TOPS"
            label="Jetson AI accelerator"
            source={{ label: 'Compute', href: '/docs/hardware/compute' }}
            accent
          />
          <SpecNumeral
            value={<AnimatedNumeral value={30} />}
            unit="Hz"
            label="LiDAR scan rate"
            source={{ label: 'LiDAR', href: '/docs/hardware/sensors/lidar' }}
          />
          <SpecNumeral
            value={<AnimatedNumeral value={200} />}
            unit="Hz"
            label="IMU sample rate"
            source={{ label: 'IMU', href: '/docs/hardware/sensors/imu' }}
          />
          <SpecNumeral
            value={<AnimatedNumeral value={60} />}
            unit="fps"
            label="Camera at 640×480"
            source={{ label: 'Camera', href: '/docs/hardware/sensors/camera' }}
          />
        </div>
        </section>
      </ScrollReveal>

      {/* ── 01 · Compute ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / COMPUTE</Eyebrow>
            <DisplayHeading size="lg">
              THE COMPUTE <Red>STACK</Red>
            </DisplayHeading>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
                marginTop: 16,
              }}
            >
              <SpecNumeral value="Orin" unit="Nano" label="Jetson host" source={{ label: 'Compute', href: '/docs/hardware/compute' }} />
              <SpecNumeral value={<AnimatedNumeral value={67} />} unit="TOPS" label="AI accelerator" />
              <SpecNumeral value="22.04.5" unit="LTS jammy" label="Ubuntu rootfs" source={{ label: 'OS & image', href: '/docs/software/os-and-image' }} />
              <SpecNumeral value="Humble" label="ROS 2 distro" source={{ label: 'ROS 2 driver', href: '/docs/software/ros2-driver' }} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Sensors ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / SENSORS</Eyebrow>
            <DisplayHeading size="lg">
              THE ONBOARD <Red>SENSORS</Red>
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
              Every sensor publishes to a fixed ROS 2 topic that the racecar-neo-library
              reads through. The values below are what the topics carry.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
                marginTop: 16,
              }}
            >
              <SpecNumeral value={<AnimatedNumeral value={1440} prefix="~" />} unit="samples" label="LiDAR per revolution" source={{ label: 'LiDAR', href: '/docs/hardware/sensors/lidar' }} />
              <SpecNumeral value={<AnimatedNumeral value={270} />} unit="° live window" label="LiDAR coverage (rear reads 0)" source={{ label: 'rc.lidar', href: '/docs/api-reference/python/lidar' }} />
              <SpecNumeral value={<AnimatedNumeral value={25} />} unit="m" label="LiDAR max range" source={{ label: 'LiDAR', href: '/docs/hardware/sensors/lidar' }} />
              <SpecNumeral value={<AnimatedNumeral value={0.25} decimals={2} />} unit="° / sample" label="LiDAR resolution" />
              <SpecNumeral value="640×480" unit="60 fps JPEG" label="Camera capture (RGB)" source={{ label: 'Camera', href: '/docs/hardware/sensors/camera' }} />
              <SpecNumeral value={<AnimatedNumeral value={200} />} unit="Hz" label="IMU, MCU-fused" />
              <SpecNumeral value={<AnimatedNumeral value={9} />} unit="axis" label="IMU (accel + gyro + mag)" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Drivetrain ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / DRIVETRAIN</Eyebrow>
            <DisplayHeading size="lg">
              THE <Red>DRIVETRAIN</Red>
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
              The drivetrain pairs real Ackermann steering geometry with a
              single rear-drive motor through a sealed gearbox and a
              hobby-grade ESC. Detailed motor / servo /
              gearing values live on the{' '}
              <a href="/docs/hardware/drivetrain" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Drivetrain page</a>.
            </p>
            <DashList
              items={[
                <>
                  <strong>Steering:</strong> servo-driven Ackermann front
                  axle. Range mapped to{' '}
                  <code style={{ fontFamily: NB.monoFont }}>rc.drive.set_speed_angle(_, angle)</code>{' '}
                  in [-1, +1]. Center pinned via{' '}
                  <a href="/docs/calibration/servo-center" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>servo center</a>.
                </>,
                <>
                  <strong>Motor:</strong> brushed RC motor through a
                  pre-assembled gearbox.{' '}
                  <code style={{ fontFamily: NB.monoFont }}>rc.drive.set_speed_angle(speed, _)</code>{' '}
                  takes speed in [-1, +1].
                </>,
                <>
                  <strong>Watchdog:</strong> the MCU (microcontroller unit) cuts power if no drive
                  command arrives within ~150 ms, so a crashed Python script
                  halts the car within a couple of frames.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · Power ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / POWER</Eyebrow>
            <DisplayHeading size="lg">
              THE POWER <Red>SYSTEM</Red>
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
              Due to various international shipping regulations, Neobotics does
              not directly sell LiPo batteries. The{' '}
              <a href="/docs/hardware/power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Hardware power page</a>{' '}
              has the full specifications and a buying guide so you can find a
              pack that fits.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
                marginTop: 16,
              }}
            >
              <SpecNumeral value="3S" label="LiPo cell count" source={{ label: 'Power', href: '/docs/hardware/power' }} />
              <SpecNumeral value={<AnimatedNumeral value={11.1} decimals={1} />} unit="V" label="Nominal pack voltage" />
              <SpecNumeral value="XT60" label="Pack connector" />
              <SpecNumeral value={<AnimatedNumeral value={30} />} unit="A" label="Main fuse (ATO)" source={{ label: "Won't power on", href: '/docs/troubleshooting/wont-power-on' }} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · Connectivity ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>05 / CONNECTIVITY</Eyebrow>
            <DisplayHeading size="lg">
              NETWORK <Red>CONNECTIVITY</Red>
            </DisplayHeading>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
                marginTop: 16,
              }}
            >
              <SpecNumeral value={<AnimatedNumeral value={6} />} label="Wi-Fi generation" source={{ label: 'Compute', href: '/docs/hardware/compute' }} />
              <SpecNumeral value="mDNS" label="Name resolution" source={{ label: 'OS & image', href: '/docs/software/os-and-image' }} />
              <SpecNumeral value="RJ45" label="Gigabit Ethernet port" source={{ label: 'Networking', href: '/docs/software/networking' }} />
              <SpecNumeral value="SSH" label="Default access" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 06 · Software ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="06" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>06 / SOFTWARE</Eyebrow>
            <DisplayHeading size="lg">
              THE SOFTWARE <Red>STACK</Red>
            </DisplayHeading>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
                marginTop: 16,
              }}
            >
              <SpecNumeral value="Python 3" label="racecar-neo-library" source={{ label: 'racecar-neo-library', href: '/docs/software/racecar-neo-library' }} />
              <SpecNumeral value={<AnimatedNumeral value={5} />} label="rc.* modules" source={{ label: 'racecar-neo-library', href: '/docs/software/racecar-neo-library' }} />
              <SpecNumeral value="Humble" label="ROS 2 distro" source={{ label: 'ROS 2 driver', href: '/docs/software/ros2-driver' }} />
              <SpecNumeral value="Pyodide" label="Browser runtime (sim)" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Anything missing here is intentional">
        Dimensions, weight, runtime, and exact motor / battery specs live on
        their dedicated hardware pages so the buyer's guides stay in one
        place. If you need a value that isn't here and isn't on a linked
        page, email{' '}
        <a
          href="mailto:support@neobotics.org"
          style={{ color: NB.neoboticsRed, fontWeight: 700 }}
        >
          support@neobotics.org
        </a>{' '}
        and we'll add it.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Hardware overview', href: '/docs/hardware/overview' }}
        next={{ label: 'Glossary', href: '/docs/reference/glossary' }}
      />
    </DocsShell>
  );
}
