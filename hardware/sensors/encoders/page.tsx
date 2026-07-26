import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext, DataTable } from '@/components/docs/DocsPrimitives';

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
          <GhostNumeral n="E" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / SENSORS</Eyebrow>
            <DisplayHeading size="xl">
              THE MOTOR <Red>ENCODER.</Red>
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

      {/* ── Section · One encoder, counted in hardware ───────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <Eyebrow>01 / ONE ENCODER, COUNTED IN HARDWARE</Eyebrow>
          <DisplayHeading size="lg">
            SHAFT-SIDE <Red>COUNTING.</Red>
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
            The encoder sits on the motor shaft, before the gearbox, which is
            the right side to measure from: one wheel turn is many shaft turns,
            so every centimetre of travel produces plenty of pulses. The
            MCU&apos;s hardware pulse counter tallies them without interrupting
            the processor, which is how the count stays honest even at full
            speed.
          </p>
        </section>
      </ScrollReveal>

      {/* ── Section · How the MCU turns ticks into /odom ─────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / TICKS TO ODOMETRY</Eyebrow>
          <DisplayHeading size="lg">
            FROM COUNTS TO <Red>/odom.</Red>
          </DisplayHeading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 22,
              marginTop: 22,
            }}
          >
            <NumberedFeatureCard
              n={1}
              title="Counted on the shaft"
              lede="Pulses accumulate in a hardware counter."
              body="Each shaft revolution produces a fixed number of Hall pulses. The gear ratio and wheel diameter turn that count into distance along the ground."
            />
            <NumberedFeatureCard
              n={2}
              title="Fused on the MCU"
              lede="Distance plus heading becomes a position."
              body="The MCU combines the travelled distance with the IMU's sense of rotation and the steering geometry, tracking position, velocity, and yaw in one place. That fused state streams to the Jetson at ~200 Hz."
            />
            <NumberedFeatureCard
              n={3}
              title="Published on /odom"
              lede="The estimate leaves the car as nav_msgs/Odometry."
              body="The driver publishes the estimate on /odom, where the rest of the stack subscribes to it the same way it subscribes to any other topic."
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section · Resolution ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / RESOLUTION</Eyebrow>
          <DisplayHeading size="lg">
            WHAT SETS THE <Red>PRECISION.</Red>
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
            Three numbers decide how finely the odometry resolves motion: the
            pulses per shaft revolution, the gear ratio, and the wheel diameter.
            Together they set how much ground one pulse represents. Measuring on
            the shaft side of the gearbox multiplies the resolution by the gear
            ratio, which is why a simple Hall sensor is enough for clean
            odometry.
          </p>
          <Callout type="note" title="Where the numbers live">
            The exact pulse count, wheel diameter, and gear ratio for your car
            are drivetrain figures, not encoder figures. The{' '}
            <Link href="/docs/hardware/drivetrain" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              Drivetrain page
            </Link>{' '}
            is where those live, since they describe how a wheel turn maps to
            distance on the ground.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── Section · Why it matters to SLAM/Nav2 ───────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>04 / WHY THE STACK CARES</Eyebrow>
          <DisplayHeading size="lg">
            FUSION WITH <Red>LiDAR.</Red>
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
            the car map and localise, which neither signal does well by itself.
          </p>
          <DashList
            items={[
              <>
                <strong style={{ color: NB.textOnBeige }}>The encoder</strong> gives
                continuous, high-rate motion between LiDAR frames.
              </>,
              <>
                <strong style={{ color: NB.textOnBeige }}>LiDAR</strong> gives
                absolute structure that pins the drift back down.
              </>,
              <>
                The{' '}
                <Link href="/docs/api-reference/ros2/topics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                  /odom topic
                </Link>{' '}
                is where the estimate starts, listed alongside every other
                ROS 2 topic.
              </>,
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── Section · Spec grid ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>05 / AT A GLANCE</Eyebrow>
          <DisplayHeading size="lg">
            <Red>SPECIFICATIONS.</Red>
          </DisplayHeading>
          <DataTable
            columns={[
              { key: 'field', label: 'Field', width: '40%' },
              { key: 'value', label: 'Value', mono: true, accent: true },
            ]}
            rows={[
              { field: 'Encoder type', value: 'Hall effect' },
              { field: 'Location', value: 'Motor shaft (one encoder)' },
              { field: 'Counting', value: 'MCU hardware pulse counter' },
              { field: 'Topic', value: '/odom at ~200 Hz' },
              { field: 'Message', value: 'nav_msgs/Odometry' },
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Odometry reading high or low?">
          Pulse counts are honest, the conversion from pulses to metres is where
          a stale gear ratio or wheel diameter shows up. Check the drivetrain
          figures first, then reach out at{' '}
          <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            support@neobotics.org
          </a>{' '}
          if the numbers still look off.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'IMU', href: '/docs/hardware/sensors/imu' }}
        next={{ label: 'Drivetrain', href: '/docs/hardware/drivetrain' }}
      />
    </DocsShell>
  );
}
