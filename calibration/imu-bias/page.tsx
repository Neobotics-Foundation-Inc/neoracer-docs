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
} from '@/components/docs/Editorial';
import { CalibrationStepStrip, type CalibrationStep } from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'IMU bias · Calibration · NeoRacer Docs',
  description:
    'Bias correction for the IMU lives in the MCU firmware, so there is nothing to calibrate by hand. This page shows how to verify the readings at rest and what to do if they are off.',
};

const STEPS: CalibrationStep[] = [
  { n: 1, title: 'Car still',     sub: 'flat and level',          iconKey: 'wheel' },
  { n: 2, title: 'SSH in',        sub: 'to the Jetson',           iconKey: 'ssh' },
  { n: 3, title: 'Read /imu',     sub: 'one message',             iconKey: 'cli' },
  { n: 4, title: 'Check accel',   sub: '~9.8 down, ~0 elsewhere', iconKey: 'stopwatch' },
  { n: 5, title: 'Check gyro',    sub: 'all axes near 0',         iconKey: 'save' },
];

export default function ImuBiasPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Calibration', href: '/docs/calibration/motor-trim' },
          { label: 'IMU bias' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>CALIBRATION / IMU BIAS</Eyebrow>
            <DisplayHeading size="xl">
              THE IMU CORRECTS <Red>ITSELF.</Red>
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
              A raw accelerometer reads a small, steady offset even when the car
              is dead still. On the NeoRacer that correction happens on the MCU
              (microcontroller unit): the firmware zeroes the offsets and fuses
              the orientation before the data ever reaches ROS, so there are no
              calibration scripts or YAML files to manage. Your job is a
              two-minute check that the numbers look right.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={2} prefix="~" suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline">Verify, not tune</ChromeBadge>
              <ChromeBadge variant="outline">Firmware-fused, ~200 Hz</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <CalibrationStepStrip steps={STEPS} />
      </ScrollReveal>

      {/* ── 01 · What bias is ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / WHAT BIAS IS</Eyebrow>
            <DisplayHeading size="lg">
              THE OFFSET AT <Red>REST.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 740,
              }}
            >
              Every{' '}
              <InfoNote term="IMU" title="IMU">
                Inertial measurement unit: an accelerometer plus a gyroscope on
                one chip, reporting how the car accelerates and rotates.
              </InfoNote>{' '}
              chip has manufacturing offsets: a gyroscope that reports a tiny
              rotation while sitting still, an accelerometer a hair off on one
              axis. Left uncorrected, those errors integrate into drift, which
              is why every serious robot removes them. The NeoRacer removes them
              in firmware, at the source, and streams the corrected state at
              ~200 Hz.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Verify at rest ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / VERIFY AT REST</Eyebrow>
            <DisplayHeading size="lg">
              READ IT <Red>STILL.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
              Put the car on a flat, level surface and leave it alone while you
              read one message:
            </p>
            <Code lang="bash">{`ssh racecar@192.168.10.100        # or 10.42.0.1 on the access point
ros2 topic echo /imu --once`}</Code>
            <DashList
              items={[
                <><code style={{ fontFamily: NB.monoFont }}>linear_acceleration</code>: roughly 9.8 on the axis pointing down (gravity counts), near 0 on the other two.</>,
                <><code style={{ fontFamily: NB.monoFont }}>angular_velocity</code>: all three axes near 0 while nothing moves.</>,
                <><code style={{ fontFamily: NB.monoFont }}>orientation</code>: a steady quaternion that stops changing once the car settles.</>,
              ]}
            />
            <Callout type="tip" title="The same check from Python">
              <code style={{ fontFamily: NB.monoFont }}>rc.physics.get_linear_acceleration()</code>{' '}
              and{' '}
              <code style={{ fontFamily: NB.monoFont }}>rc.physics.get_angular_velocity()</code>{' '}
              read the same stream, so a two-line script printing both is an
              equally good verify.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · If it's off ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / IF THE NUMBERS ARE OFF</Eyebrow>
            <DisplayHeading size="lg">
              WHEN IT <Red>DRIFTS.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
              A large offset at rest, or a yaw that keeps creeping while the car
              sits still, points at the firmware&apos;s stored correction rather
              than anything on the Jetson. Re-flashing the firmware (covered in{' '}
              <a href="/docs/software/firmware-flashing" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                Firmware flashing
              </a>) restores it, and{' '}
              <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                support@neobotics.org
              </a>{' '}
              can confirm whether a reading you are seeing is in the normal
              range.
            </p>
            <Callout type="note" title="About the magnetometer">
              The chip also carries a magnetometer, but the driver ships with it
              disabled (<code style={{ fontFamily: NB.monoFont }}>publish_mag</code>{' '}
              in <code style={{ fontFamily: NB.monoFont }}>config/controller.yaml</code>):
              the fused orientation already comes from the firmware, and the raw
              magnetic field indoors is warped by the car&apos;s own motor and
              frame. Enable it only if you want the raw vector, and expect it
              uncalibrated.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Camera intrinsics', href: '/docs/calibration/camera-intrinsics' }}
        next={{ label: "Won't power on", href: '/docs/troubleshooting/wont-power-on' }}
      />
    </DocsShell>
  );
}
