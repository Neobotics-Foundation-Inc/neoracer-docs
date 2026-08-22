import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { SensorSheet } from '@/components/docs/SensorSheet';
import { Crumbs, Callout, PrevNext, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'IMU · Hardware · NeoRacer Docs',
  description:
    '9-axis IMU on the OSCORE board: a QMI8658A accelerometer and gyroscope plus a QMC6309 magnetometer, read through the rc.physics Python API.',
};

export default function ImuPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Sensors' },
          { label: 'IMU' },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE ONBOARD <Red>IMU</Red>
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
              The nine axes IMU is split between two physical sensors and is
              located on the OSCORE board. It reports how the car is
              accelerating, how fast it is turning, and where magnetic north
              sits.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section · The sensors ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <SensorSheet
            title="The IMU"
            image="/images/build/IMU.png"
            alt="The IMU footprint on the OSCORE board render, labelled IMU with its orientation arrow"
            specGroups={[
              {
                label: 'QMI8658A · accel + gyro',
                specs: [
                  ['Accelerometer', '3-axis, m/s²'],
                  ['Accelerometer range', '±2 to 16 g'],
                  ['Gyroscope', '3-axis, rad/s'],
                  ['Gyroscope range', '±16 to 2048 dps'],
                  ['I2C address', '0x6B'],
                ],
              },
              {
                label: 'QMC6309 · magnetometer',
                specs: [
                  ['Magnetometer', '3-axis, teslas'],
                  ['Magnetometer range', '±30 Gauss'],
                  ['I2C address', '0x7C'],
                ],
              },
              {
                label: 'Shared',
                specs: [
                  ['Rate', '200 Hz'],
                  ['Frame', 'imu_link'],
                  ['Bus', 'Shared I2C on the OSCORE board'],
                ],
              },
            ]}
          >
            The QMI8658A contains the accelerometer and the gyroscope. The
            QMC6309 is the magnetometer.
          </SensorSheet>
        </section>
      </ScrollReveal>

      {/* ── Section · Measurements ───────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            <Red>MEASUREMENTS</Red>
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
              title="Accelerometer"
              lede="Measures the car's acceleration along each axis."
              body="The reading includes gravity: at rest it shows about 9.8 m/s² pointing down. Because of this, it can also be used to estimate the car's tilt."
            />
            <NumberedFeatureCard
              n={2}
              title="Gyroscope"
              lede="Measures how fast the car is rotating around each axis."
              body="It measures the rate of rotation, not the angle itself. You can add up the rate over time to estimate orientation, but small errors accumulate, so it is usually combined with another sensor."
            />
            <NumberedFeatureCard
              n={3}
              title="Magnetometer"
              lede="Measures the local magnetic field."
              body="The field points toward magnetic north, so it works as a compass. Motors and metal near the sensor distort the reading, so it needs calibration to be accurate."
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section · Reading the IMU ────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            READING THE <Red>IMU</Red>
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
            The IMU is read through{' '}
            <Link href="/docs/api-reference/python/physics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              rc.physics
            </Link>
            . Each of the three calls reads one of the three sensors.
          </p>
          <Code lang="python">
{`accel = rc.physics.get_linear_acceleration()   # (x, y, z) in m/s²
gyro  = rc.physics.get_angular_velocity()      # (x, y, z) in rad/s
mag   = rc.physics.get_magnetic_field()        # (x, y, z) in teslas, car only

print(accel)   # e.g. acceleration along each axis, gravity included
print(gyro)    # turn rate around each axis
print(mag)     # magnetic field vector`}
          </Code>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
              marginTop: 18,
            }}
          >
            Before the data reaches ROS, the firmware removes each
            sensor&apos;s steady bias and combines the accelerometer and
            gyroscope into an orientation quaternion. The{' '}
            <code style={{ fontFamily: NB.monoFont }}>/imu</code> topic carries
            both: the orientation, and the corrected acceleration and turn
            rates. Use the orientation if you want a heading without extra
            work. Use the acceleration and turn rates if you want to write your
            own filter.
          </p>
          <Callout type="note" title="The magnetometer is off by default">
            The QMC6309 is not part of the fused orientation and its{' '}
            <code style={{ fontFamily: NB.monoFont }}>/mag</code> topic ships
            disabled (<code style={{ fontFamily: NB.monoFont }}>publish_mag: false</code>{' '}
            in controller.yaml). Turn it on when you want a compass heading or
            your own nine-axis fusion.
          </Callout>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Camera', href: '/docs/hardware/sensors/camera' }}
        next={{ label: 'Encoder', href: '/docs/hardware/sensors/encoders' }}
      />
    </DocsShell>
  );
}
