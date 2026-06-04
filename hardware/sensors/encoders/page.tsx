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
  title: 'Encoders · Hardware · NeoRacer Docs',
  description:
    'Quadrature motor-shaft encoders read per wheel and integrated into a velocity estimate on /odom. Dead reckoning between LiDAR scans.',
};

export default function EncodersPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Sensors', href: '/docs/hardware/sensors/lidar' },
          { label: 'Encoders' },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="E" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / SENSORS</Eyebrow>
            <DisplayHeading size="xl">
              MOTOR-SHAFT <Red>ENCODERS.</Red>
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
              Quadrature motor-shaft encoders sit on the drivetrain and report
              how far each wheel has turned. The MCU (microcontroller unit) reads
              them per wheel and integrates the counts into a velocity estimate,
              which it publishes on{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/odom</code>.
              That is the car telling you, between LiDAR scans, how far and how
              fast it has travelled.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Dead reckoning between scans</ChromeBadge>
              <ChromeBadge variant="outline">Quadrature A/B</ChromeBadge>
              <ChromeBadge variant="outline">Per-wheel read</ChromeBadge>
              <ChromeBadge variant="outline">MCU integrated</ChromeBadge>
              <ChromeBadge variant="outline">/odom · nav_msgs/Odometry</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section · What quadrature buys you ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <Eyebrow>01 / WHY QUADRATURE</Eyebrow>
          <DisplayHeading size="lg">
            QUADRATURE <Red>ENCODING.</Red>
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
            A single-channel encoder only counts ticks, so it can tell you the
            wheel moved but not which way. Quadrature uses two channels (A and B)
            that are physically offset, and the order in which their edges arrive
            recovers direction as well as speed. That is what lets the odometry
            distinguish rolling forward from rolling backward, which matters the
            moment the car reverses out of a wall.
          </p>
        </section>
      </ScrollReveal>

      {/* ── Section · How the MCU turns ticks into /odom ─────────────────── */}
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
              title="Read per wheel"
              lede="Each wheel has its own count, sampled on the MCU."
              body="The MCU watches the A/B edges from each motor shaft and keeps a running tick count per wheel. Reading the wheels separately is what makes left-versus-right motion observable, not just the average speed of the car."
            />
            <NumberedFeatureCard
              n={2}
              title="Integrated to velocity"
              lede="The MCU turns the change in counts into a speed."
              body="Between samples the MCU looks at how many ticks each wheel gained, divides by the time elapsed, and forms a velocity estimate. That estimate is the useful product, the raw counts mostly stay on the microcontroller."
            />
            <NumberedFeatureCard
              n={3}
              title="Published on /odom"
              lede="The estimate leaves the car as nav_msgs/Odometry."
              body="The velocity estimate is wrapped in a standard nav_msgs/Odometry message and published on /odom, where the rest of the stack can subscribe to it the same way it subscribes to any other topic."
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section · CPR tradeoff ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / RESOLUTION TRADEOFF</Eyebrow>
          <DisplayHeading size="lg">
            THE RESOLUTION <Red>TRADEOFF.</Red>
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
            Counts per revolution (CPR) is the knob that sets how finely the
            encoder resolves motion. A higher CPR means each tick covers a
            smaller slice of wheel travel, so the odometry is finer. The cost is
            that every edge is an interrupt the MCU has to service, so a higher
            count puts more load on the microcontroller. The two pull against
            each other, which is the tension worth keeping in mind when you read
            an odometry value and wonder how precise it really is.
          </p>
          <Callout type="note" title="Where the numbers live">
            The exact CPR, wheel diameter, and gear ratio for your car are
            drivetrain figures, not encoder figures. The{' '}
            <Link href="/docs/hardware/drivetrain" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              Drivetrain page
            </Link>{' '}
            is where those live, since they describe how a wheel turn maps to
            distance on the ground.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── Section · Why it matters to SLAM/Nav2 ───────────────────────── */}
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
            osracer SLAM and Nav2 stack does not trust it alone. It fuses the
            odometry from{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/odom</code>{' '}
            with the LiDAR scans, using the encoders to fill in the motion
            between scans and the LiDAR to correct the drift. Together they let
            the car map and localise, which neither signal does well by itself.
          </p>
          <DashList
            items={[
              <>
                <strong style={{ color: NB.textOnBeige }}>Encoders</strong> give
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
                is where the fused estimate starts, listed alongside every other
                ROS 2 topic.
              </>,
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── Section · Spec grid ─────────────────────────────────────────── */}
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
              { field: 'Encoder type', value: 'Quadrature (A/B channels)' },
              { field: 'Read', value: 'Per wheel' },
              { field: 'Integration', value: 'MCU (microcontroller unit)' },
              { field: 'Topic', value: '/odom' },
              { field: 'Message', value: 'nav_msgs/Odometry' },
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Odometry reading high or low?">
          Encoder counts are honest, the conversion from ticks to metres is where
          a stale CPR or wheel diameter shows up. Check the drivetrain figures
          first, then reach out at{' '}
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
