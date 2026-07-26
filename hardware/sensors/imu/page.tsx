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
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'IMU · Hardware · NeoRacer Docs',
  description:
    '9-axis IMU on the OSCORE board: a QMI8658A 6-axis plus a QMC6309 magnetometer. Topics, frames, and the rc.physics Python API.',
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
          <GhostNumeral n="9" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / SENSORS</Eyebrow>
            <DisplayHeading size="xl">
              THE ONBOARD <Red>IMU.</Red>
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
              Two parts on one board: a QMI8658A (3-axis accelerometer and
              3-axis gyroscope) and a QMC6309 (3-axis magnetometer), nine axes
              between them. They report how the car is accelerating, how fast it
              is turning, and where magnetic north sits, all in the imu_link
              frame at 200 Hz.
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

      {/* ── Section · What it measures ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <Eyebrow>01 / WHAT IT MEASURES</Eyebrow>
          <DisplayHeading size="lg">
            WHAT IT <Red>MEASURES.</Red>
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
            Each of the three sensors answers a different question. The
            accelerometer reads linear acceleration along x, y, and z in metres
            per second squared, which includes gravity. The gyroscope reads
            angular velocity around each axis in radians per second. The
            magnetometer reads the local magnetic field in teslas, which is what
            you would lean on for an absolute heading.
          </p>
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
              lede="Linear acceleration in m/s^2, gravity included."
              body="The three axes tell you how the chassis is accelerating. At rest the vector points along gravity, so it doubles as a coarse tilt reference once you have subtracted the parts you do not care about."
            />
            <NumberedFeatureCard
              n={2}
              title="Gyroscope"
              lede="Angular velocity in rad/s around each axis."
              body="This is the rate of rotation, not the angle. Integrating it gives you orientation, but the drift adds up, which is why most yaw estimates pair the gyro with another source rather than trusting it alone."
            />
            <NumberedFeatureCard
              n={3}
              title="Magnetometer"
              lede="Local magnetic field in teslas, on the car only."
              body="The field direction points you toward magnetic north, which makes it the anchor for an absolute heading. Motors and metal nearby bend the reading, so the magnetometer is the one that most rewards calibration."
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section · Python API ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / PYTHON API</Eyebrow>
          <DisplayHeading size="lg">
            THE rc.physics <Red>API.</Red>
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
            One thing to flag up front, because it surprises almost everyone: the
            IMU is not <code style={{ fontFamily: NB.monoFont }}>rc.imu</code>. It
            lives under{' '}
            <Link href="/docs/api-reference/python/physics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              rc.physics
            </Link>
            , alongside the rest of the motion sensing. The three calls map
            straight onto the three sensors.
          </p>
          <Code lang="python">
{`accel = rc.physics.get_linear_acceleration()   # (x, y, z) in m/s^2
gyro  = rc.physics.get_angular_velocity()      # (x, y, z) in rad/s
mag   = rc.physics.get_magnetic_field()        # (x, y, z) in teslas, car only

print(accel)   # e.g. acceleration along each axis, gravity included
print(gyro)    # turn rate around each axis
print(mag)     # magnetic field vector`}
          </Code>
          <DashList
            items={[
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc.physics.get_linear_acceleration()
                </code>{' '}
                · linear acceleration in m/s^2, gravity included.
              </>,
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc.physics.get_angular_velocity()
                </code>{' '}
                · angular velocity in rad/s around each axis.
              </>,
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc.physics.get_magnetic_field()
                </code>{' '}
                · magnetic field in teslas. Available on the car only.
              </>,
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── Section · Raw, not fused ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / WHAT TO EXPECT</Eyebrow>
          <DisplayHeading size="lg">
            WHAT IT <Red>OUTPUTS.</Red>
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
        </section>
      </ScrollReveal>

      {/* ── Section · ROS 2 ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>04 / ROS 2 TOPICS</Eyebrow>
          <DisplayHeading size="lg">
            THE ROS 2 <Red>TOPICS.</Red>
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
            The controller node publishes the inertial data and the magnetic
            field on two separate topics, both stamped in the imu_link frame.
          </p>
          <DataTable
            columns={[
              { key: 'topic', label: 'Topic', mono: true, accent: true },
              { key: 'type', label: 'Message type', mono: true },
              { key: 'frame', label: 'Frame', mono: true },
              { key: 'units', label: 'Units' },
            ]}
            rows={[
              {
                topic: '/imu',
                type: 'sensor_msgs/Imu',
                frame: 'imu_link',
                units: 'linear accel m/s^2, angular velocity rad/s',
              },
              {
                topic: '/mag',
                type: 'sensor_msgs/MagneticField',
                frame: 'imu_link',
                units: 'magnetic field in teslas',
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── Section · On the car ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>05 / ON THE CAR</Eyebrow>
          <DisplayHeading size="lg">
            ON THE <Red>CAR.</Red>
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

      {/* ── Section · Spec grid ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>06 / SPEC AT A GLANCE</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>SPECIFICATIONS.</Red>
          </DisplayHeading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              marginTop: 18,
            }}
          >
            {[
              ['Sensor', 'QMI8658A + QMC6309 (9-axis)'],
              ['Accelerometer', 'm/s^2'],
              ['Gyroscope', 'rad/s'],
              ['Magnetometer', 'teslas'],
              ['Rate', '100 Hz'],
              ['Frame', 'imu_link'],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  background: NB.haloWhite,
                  border: `1px solid ${NB.borderOnBeige}`,
                  borderRadius: 0,
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{
                    fontFamily: NB.monoFont,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: NB.textMutedBeige,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontFamily: NB.headingFont,
                    fontSize: 16,
                    fontWeight: 700,
                    color: NB.textOnBeige,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Heading drifting after a few seconds?">
          A gyro-only yaw estimate drifts because the rate integrates its own
          small bias. Blending in the magnetometer for an absolute reference is
          the usual fix, and a fresh magnetometer calibration helps if the field
          reading looks skewed. Questions either way reach us at{' '}
          <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            support@neobotics.org
          </a>
          .
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Camera', href: '/docs/hardware/sensors/camera' }}
        next={{ label: 'Encoders', href: '/docs/hardware/sensors/encoders' }}
      />
    </DocsShell>
  );
}
