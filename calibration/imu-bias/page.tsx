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
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import {
  CalibrationStepStrip,
  type CalibrationStep,
} from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'IMU bias · Calibration · NeoRacer Docs',
  description:
    'Zero the LSM9DS1 accelerometer and gyroscope, and fit the magnetometer, with the racecar_neo calibrate_imu and calibrate_mag scripts. They write the lsm9ds1 YAML the driver loads at launch.',
};

const STEPS: CalibrationStep[] = [
  { n: 1, title: 'SSH in',       sub: 'to the Jetson',        iconKey: 'ssh' },
  { n: 2, title: 'Driver up',    sub: '/imu, /mag publishing', iconKey: 'cli' },
  { n: 3, title: 'Still + level', sub: 'accel + gyro bias',    iconKey: 'stopwatch' },
  { n: 4, title: 'Rotate',       sub: 'magnetometer fit',      iconKey: 'wheel' },
  { n: 5, title: 'Save YAML',    sub: 'config/lsm9ds1_*',      iconKey: 'save' },
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
              IMU BIAS <Red>CALIBRATION.</Red>
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
              A raw LSM9DS1 reads a small, steady offset even when the car is dead
              still, and a magnetometer reads a field warped by the metal around
              it. Two scripts measure those once and write the corrections to a
              pair of YAML files the driver loads at launch, so{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc.physics</code>{' '}
              gives you honest numbers.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={10} prefix="~" suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline">Intermediate</ChromeBadge>
              <ChromeBadge variant="outline">Writes real YAML</ChromeBadge>
              <ChromeBadge variant="outline">Loaded at launch</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section 01 · Two calibrations ─────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / TWO CALIBRATIONS</Eyebrow>
            <DisplayHeading size="lg">
              THE TWO <Red>CALIBRATIONS.</Red>
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
              The IMU node reads three sensors off one chip: accelerometer,
              gyroscope, and magnetometer. The first two are corrected by sitting
              still; the third needs you to turn the car through every direction so
              the script can map the field. They are two separate scripts and two
              separate YAML files.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 18,
                marginTop: 20,
              }}
            >
              <NumberedFeatureCard
                n={1}
                title="Accel + gyro bias"
                lede="calibrate_imu.py, car still."
                body={
                  <>
                    Held flat and motionless, the script averages the readings and
                    stores the offset as{' '}
                    <code style={{ fontFamily: NB.monoFont }}>accelerometer.bias</code>{' '}
                    and{' '}
                    <code style={{ fontFamily: NB.monoFont }}>gyroscope.bias</code>.
                  </>
                }
                codeChip="lsm9ds1_cal.yaml"
              />
              <NumberedFeatureCard
                n={2}
                title="Magnetometer fit"
                lede="calibrate_mag.py, car rotating."
                body={
                  <>
                    Turning the car through all orientations, it fits a{' '}
                    <InfoNote term="hard-iron offset" title="Hard-iron offset">Steady magnetic bias from magnetized metal on the car. It shifts every reading by a fixed amount, so the calibration subtracts it back out.</InfoNote>{' '}
                    and a{' '}
                    <InfoNote term="soft-iron matrix" title="Soft-iron matrix">A correction for nearby metal that distorts the magnetic field unevenly by direction. It stretches the readings back into a sphere instead of a squashed shape.</InfoNote>{' '}
                    so the field reads as a clean
                    sphere, not a tilted egg.
                  </>
                }
                codeChip="lsm9ds1_mag_cal.yaml"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · You'll need ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / YOU'LL NEED</Eyebrow>
            <DisplayHeading size="lg">
              WHAT YOU'LL <Red>NEED.</Red>
            </DisplayHeading>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 18,
                marginTop: 20,
              }}
            >
              <NumberedFeatureCard
                n={1}
                title="The driver running"
                lede="So /imu and /mag publish."
                body={
                  <>
                    Both scripts subscribe to the live topics, so the IMU node has
                    to be up first. Launch the{' '}
                    <a href="/docs/software/ros2-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>driver</a>{' '}
                    before you start either one.
                  </>
                }
              />
              <NumberedFeatureCard
                n={2}
                title="A level surface"
                lede="For the accel and gyro pass."
                body="A flat, vibration-free spot for the still pass. The accelerometer learns which way is down from it, so a tilted table bakes the tilt into the bias."
              />
              <NumberedFeatureCard
                n={3}
                title="Space to rotate"
                lede="For the magnetometer pass."
                body="Clear room to slowly turn the car through pitch, roll, and yaw. Away from motors, laptops, and steel desks, which warp the very field you are measuring."
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FIG · step strip ─────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / FIVE STEPS, START TO FINISH"
          caption="Bring the driver up, run the still pass, run the rotating pass, and the two YAML files are written for the IMU node to load next launch."
        >
          <div style={{ paddingTop: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: 480 }}>
              <CalibrationStepStrip steps={STEPS} />
            </div>
          </div>
        </Fig>
      </ScrollReveal>

      {/* ── Section 03 · Accel + gyro ────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / ACCEL + GYRO</Eyebrow>
            <DisplayHeading size="lg">
              THE ACCEL + GYRO <Red>PASS.</Red>
            </DisplayHeading>

            <Code lang="bash">{`# Driver running (teleop), car flat and motionless on a level surface.
python3 ~/racecar_ws/src/racecar_neo/scripts/calibrate_imu.py

# It connects to /imu, collects a window of samples, and averages them.
# The mean is the bias: what the sensor reports when nothing is moving.
# When it finishes, it writes lsm9ds1_cal.yaml.`}</Code>

            <Callout type="warn" title="Do not breathe on it">
              Any motion during the still pass shows up as bias. Set the car down,
              take your hands off, and let the script run untouched. If a wheel was
              bumped, run it again.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · Magnetometer ────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / MAGNETOMETER</Eyebrow>
            <DisplayHeading size="lg">
              THE MAGNETOMETER <Red>FIT.</Red>
            </DisplayHeading>

            <Code lang="bash">{`# Driver running. Pick the car up and be ready to rotate it.
python3 ~/racecar_ws/src/racecar_neo/scripts/calibrate_mag.py

# While it collects, slowly tumble the car through every orientation:
# nose up and down, roll left and right, spin through a full yaw.
# It fits a hard-iron offset and a soft-iron matrix to the cloud of
# points, plots them as a sphere so you can see the coverage, and
# writes lsm9ds1_mag_cal.yaml.`}</Code>

            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 720,
              }}
            >
              The goal is even coverage of the sphere. Gaps mean a direction the
              field was never sampled, which leaves the fit guessing there. Keep
              turning until the plotted points wrap the whole ball.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 05 · Where it lives ──────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>05 / WHERE IT LIVES</Eyebrow>
            <DisplayHeading size="lg">
              THE OUTPUT <Red>YAML.</Red>
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
              This is the one calibration that is a real config file, not a source
              constant. The launch file hands both YAMLs to the IMU node as
              parameters, so the corrections apply the next time you bring the
              driver up. The parameter names are documented on the{' '}
              <a href="/docs/api-reference/ros2/params" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                ROS 2 parameters
              </a>{' '}
              page.
            </p>

            <Code lang="yaml">{`# config/lsm9ds1_cal.yaml, written by calibrate_imu.py
imu_node:
  ros__parameters:
    accelerometer:
      bias: [0.013, -0.021, 0.004]     # m/s^2, per axis
    gyroscope:
      bias: [0.0011, 0.0006, -0.0009]  # rad/s, per axis

# config/lsm9ds1_mag_cal.yaml, written by calibrate_mag.py
imu_node:
  ros__parameters:
    magnetometer:
      hard_iron_bias: [1.2e-5, -8.0e-6, 3.1e-6]   # T, offset
      soft_iron_matrix:
        data: [1.02, 0.01, 0.0,  0.01, 0.98, 0.0,  0.0, 0.0, 1.0]  # row-major 3x3`}</Code>

            <DashList
              items={[
                <>Relaunch the driver after calibrating so the IMU node reloads the files.</>,
                <>The values above are an illustration; yours come out of the two scripts.</>,
                <>Keep the YAMLs with your workspace so a re-image does not drop them back to identity.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Troubleshooting">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <strong>Script never connects.</strong> The IMU node is not
              publishing. Confirm with{' '}
              <code style={{ fontFamily: NB.monoFont }}>ros2 topic echo /imu</code>{' '}
              and check the{' '}
              <a href="/docs/hardware/sensors/imu" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                IMU hardware
              </a>{' '}
              page.
            </li>
            <li>
              <strong>Heading still drifts after calibrating.</strong> The
              magnetometer pass missed part of the sphere, or you were near metal.
              Re-run it in open space and cover every orientation.
            </li>
            <li>
              <strong>Numbers look fused or filtered.</strong> They are not. The
              node publishes raw, bias-corrected readings under{' '}
              <code style={{ fontFamily: NB.monoFont }}>rc.physics</code>; any
              smoothing is yours to add.
            </li>
          </ul>
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Camera intrinsics', href: '/docs/calibration/camera-intrinsics' }}
        next={{ label: 'Migration from F1TENTH', href: '/docs/roboracer/migration-from-f1tenth' }}
      />
    </DocsShell>
  );
}
