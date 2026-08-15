import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';
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
          { label: 'Sensors', href: '/docs/hardware/sensors' },
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
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">QMI8658A + QMC6309</ChromeBadge>
              <ChromeBadge variant="outline"><AnimatedNumeral value={200} suffix=" Hz" /></ChromeBadge>
              <ChromeBadge variant="outline">accel m/s^2</ChromeBadge>
              <ChromeBadge variant="outline">gyro rad/s</ChromeBadge>
              <ChromeBadge variant="outline">mag teslas</ChromeBadge>
              <ChromeBadge variant="outline">frame_id: imu_link</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section · The sensors ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <SensorSheet
            title="The IMU"
            image="/images/IMU.png"
            alt="The IMU footprint on the OSCORE board render, labelled IMU with its orientation arrow"
            specGroups={[
              {
                label: 'QMI8658A · accel + gyro',
                specs: [
                  ['Accelerometer', '3-axis, m/s^2'],
                  ['Gyroscope', '3-axis, rad/s'],
                ],
              },
              {
                label: 'QMC6309 · magnetometer',
                specs: [['Magnetometer', '3-axis, teslas']],
              },
              {
                label: 'Shared',
                specs: [
                  ['Rate', '200 Hz'],
                  ['Frame', 'imu_link'],
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
              lede="Measures the car's acceleration along each axis, in m/s^2."
              body="The reading includes gravity: at rest it shows about 9.8 m/s^2 pointing down. Because of this, it can also be used to estimate the car's tilt."
            />
            <NumberedFeatureCard
              n={2}
              title="Gyroscope"
              lede="Measures how fast the car is rotating around each axis, in rad/s."
              body="It measures the rate of rotation, not the angle itself. You can add up the rate over time to estimate orientation, but small errors accumulate, so it is usually combined with another sensor."
            />
            <NumberedFeatureCard
              n={3}
              title="Magnetometer"
              lede="Measures the local magnetic field, in teslas."
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
            There is no <code style={{ fontFamily: NB.monoFont }}>rc.imu</code>{' '}
            in the library. The IMU is read through{' '}
            <Link href="/docs/api-reference/python/physics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              rc.physics
            </Link>
            . Each of the three calls reads one of the three sensors.
          </p>
          <Code lang="python">
{`accel = rc.physics.get_linear_acceleration()   # (x, y, z) in m/s^2
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
            The firmware does two jobs before the data reaches ROS: it
            subtracts each sensor&apos;s steady bias, and it fuses the
            accelerometer and gyro into an orientation quaternion. Both arrive
            on <code style={{ fontFamily: NB.monoFont }}>/imu</code> together:
            the fused orientation, plus the bias-corrected raw acceleration and
            turn rates. Use the quaternion for a ready-made heading; use the
            raw fields to run your own filter and control the trade-off
            between responsiveness and noise.
          </p>
          <Callout type="note" title="The magnetometer is off by default">
            The QMC6309 is not part of the fused orientation and its{' '}
            <code style={{ fontFamily: NB.monoFont }}>/mag</code> topic ships
            disabled (<code style={{ fontFamily: NB.monoFont }}>publish_mag: false</code>{' '}
            in controller.yaml). Turn it on when you want a compass heading or
            your own nine-axis fusion.
          </Callout>
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
            On the shipping car, the IMU does not talk to the Jetson directly. An
            MCU (microcontroller unit) sits between them and bridges the sensor to
            the Jetson, then the data surfaces on the same topics and the same{' '}
            <Link href="/docs/api-reference/python/physics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              rc.physics
            </Link>{' '}
            calls you saw above. The MCU is also why the magnetometer reading is
            present on the car: that path carries the full 9-axis stream.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Camera', href: '/docs/hardware/sensors/camera' }}
        next={{ label: 'Encoders', href: '/docs/hardware/sensors/encoders' }}
      />
    </DocsShell>
  );
}
