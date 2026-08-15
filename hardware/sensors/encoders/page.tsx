import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { SensorSheet } from '@/components/docs/SensorSheet';
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Encoder · Hardware · NeoRacer Docs',
  description:
    'A Hall-effect encoder on the motor shaft, counted in hardware on the MCU and integrated into the odometry published on /odom at ~200 Hz. Dead reckoning between LiDAR scans.',
};

export default function EncodersPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Sensors', href: '/docs/hardware/sensors' },
          { label: 'Encoder' },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="06" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE MOTOR <Red>ENCODER</Red>
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
              A Hall-effect encoder on the motor shaft reports how far the
              drivetrain has turned. The MCU (microcontroller unit) counts its
              pulses in hardware, folds in the gear ratio and the car&apos;s
              steering geometry, and publishes the result on{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/odom</code>{' '}
              at ~200 Hz. That is the car telling you, between LiDAR scans, how
              far and how fast it has travelled.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Dead reckoning between scans</ChromeBadge>
              <ChromeBadge variant="outline">Hall effect · motor shaft</ChromeBadge>
              <ChromeBadge variant="outline">MCU integrated</ChromeBadge>
              <ChromeBadge variant="outline">/odom · nav_msgs/Odometry</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section · The sensor ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <SensorSheet
            title="The encoder"
            specs={[
              ['Encoder type', 'Hall effect'],
              ['Location', 'Motor shaft'],
              ['Counting', 'MCU hardware pulse counter'],
              ['Topic', '/odom at ~200 Hz'],
              ['Message', 'nav_msgs/Odometry'],
            ]}
          >
            The encoder is a Hall-effect sensor on the motor shaft. The OSCORE
            board counts its pulses and publishes the car&apos;s odometry
            on <code style={{ fontFamily: NB.monoFont }}>/odom</code>.
          </SensorSheet>
        </section>
      </ScrollReveal>

      {/* ── Section · Shaft-side counting ────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            SHAFT-SIDE <Red>COUNTING</Red>
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
            The encoder sits on the motor shaft, before the gearbox. One wheel
            turn is many shaft turns, so every centimetre of travel produces
            many pulses. The MCU counts them in a hardware counter, so no
            pulses are missed even at full speed.
          </p>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
              marginTop: 14,
            }}
          >
            Three numbers convert the count into distance: the pulses per shaft
            revolution, the gear ratio, and the wheel diameter. These are
            drivetrain figures, and they live on the{' '}
            <Link href="/docs/hardware/drivetrain" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              Drivetrain page
            </Link>
            .
          </p>
        </section>
      </ScrollReveal>

      {/* ── Section · Why it matters to SLAM/Nav2 ───────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            FUSION WITH <Red>LiDAR</Red>
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
            On its own, odometry drifts. Run long enough and the dead-reckoning
            position wanders away from the truth. That is fine, because the
            SLAM and Nav2 stack does not trust it alone. It fuses the odometry
            from{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/odom</code>{' '}
            with the LiDAR scans, using the encoder to fill in the motion
            between scans and the LiDAR to correct the drift. Together they let
            the car map and localise, which neither signal does well by itself.{' '}
            <Link href="/docs/api-reference/ros2/topics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              /odom
            </Link>{' '}
            is listed with every other topic on the ROS 2 Topics page.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'IMU', href: '/docs/hardware/sensors/imu' }}
        next={{ label: 'Drivetrain', href: '/docs/hardware/drivetrain' }}
      />
    </DocsShell>
  );
}
