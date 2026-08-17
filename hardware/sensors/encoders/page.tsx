import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { SensorSheet } from '@/components/docs/SensorSheet';
import { Crumbs, PrevNext, Code } from '@/components/docs/DocsPrimitives';

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
          { label: 'Sensors' },
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
              drivetrain has turned.
            </p>
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
              ['Channels', '3 (incremental A, B, Z)'],
              ['Resolution', '1 - 4096'],
              ['Maximum motor speed', '20,000 rpm'],
              ['Counting', 'MCU hardware pulse counter'],
              ['Topic', '/odom at ~200 Hz'],
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
            revolution, the gear ratio, and the wheel diameter.
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
            Your code reads the encoder through{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc.physics</code>:
          </p>
          <Code lang="python">
{`speed = rc.physics.get_encoder_speed()   # forward speed in m/s
print(speed)`}
          </Code>
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
            Odometry drifts over time. Small errors add up, so the position
            the car calculates slowly moves away from its real position. The
            SLAM and Nav2 stack corrects for this by combining{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/odom</code>{' '}
            with the LiDAR scans. The encoder fills in the motion between
            scans, and the LiDAR corrects the accumulated error. Together they
            are what lets the car map and localise.{' '}
            <Link href="/docs/api-reference/ros2/topics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              /odom
            </Link>{' '}
            is listed with every other topic on the ROS 2 Topics page.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'IMU', href: '/docs/hardware/sensors/imu' }}
        next={{ label: 'Remote control', href: '/docs/hardware/remote-control' }}
      />
    </DocsShell>
  );
}
