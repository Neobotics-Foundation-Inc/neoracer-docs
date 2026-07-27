import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout, Code, ApiMethods, type ApiMethod } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'rc.physics · Python API · NeoRacer Docs',
  description:
    'The Physics module is the IMU: get_linear_acceleration, get_angular_velocity, get_magnetic_field. Acceleration in m/s^2, angular velocity in rad/s.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'rc.physics.get_linear_acceleration()',
    returns: 'NDArray[3, Float]',
    summary:
      'The car’s acceleration as an (x, y, z) vector in metres per second squared, averaged over the last frame. At rest you read roughly 9.8 on the axis pointing down, because gravity counts.',
  },
  {
    sig: 'rc.physics.get_angular_velocity()',
    returns: 'NDArray[3, Float]',
    summary:
      'How fast the car is rotating, as an (x, y, z) vector in radians per second. The z component is your yaw rate, which is what you watch when you want to turn a known amount.',
  },
  {
    sig: 'rc.physics.get_magnetic_field()',
    returns: 'NDArray[3, Float]',
    summary:
      'The magnetic field as an (x, y, z) vector in teslas. Off by default: the driver ships with magnetometer publishing disabled (publish_mag), so this returns zeros until you enable it in config/controller.yaml.',
  },
];

export default function PhysicsApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'rc.physics' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RC.<Red>PHYSICS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The Physics module is the{' '}
              <InfoNote term="IMU" title="IMU">
                Inertial Measurement Unit. A sensor that measures how the car is accelerating and rotating, combining an accelerometer and a gyroscope.
              </InfoNote>: it reports how the car is
              accelerating and rotating. It is what you reach for when you want
              to turn a precise number of degrees or detect a bump, and the
              acceleration and angular-velocity calls behave the same in the
              Playground sim and on the car.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Sim ↔ car identical</ChromeBadge>
              <ChromeBadge variant="outline">accel · m/s²</ChromeBadge>
              <ChromeBadge variant="outline">gyro · rad/s</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="It's called physics, not imu">
          In the racecar-neo library the IMU lives under{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc.physics</code>, not{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc.imu</code>. The hardware page still calls
          it the{' '}
          <a href="/docs/hardware/sensors/imu" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            IMU
          </a>{' '}
          because that is the chip, but the calls you write all start with{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc.physics</code>.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>METHODS</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>METHODS</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="warn" title="Axes differ between sim and car">
          The direction each axis points is not identical in the Playground and
          on the physical car. Lean on relative changes (a{' '}
          <InfoNote term="yaw rate" title="Yaw Rate">
            How fast the car is turning left or right, measured as rotation around the vertical axis in radians per second.
          </InfoNote>, a spike in
          acceleration) rather than hard-coding which axis is which, and your
          code stays portable.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>TYPICAL USE</Eyebrow>
          <DisplayHeading size="lg">
            A WORKED <Red>EXAMPLE</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core

rc = racecar_core.create_racecar()

def start():
    pass

def update():
    ax, ay, az = rc.physics.get_linear_acceleration()   # m/s^2
    wx, wy, wz = rc.physics.get_angular_velocity()       # rad/s

    # wz is the yaw rate: positive one way, negative the other.
    print(f"down accel {az:.1f} m/s^2, yaw rate {wz:.2f} rad/s")

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'rc.controller', href: '/docs/api-reference/python/controller' }}
        next={{ label: 'IMU hardware', href: '/docs/hardware/sensors/imu' }}
      />
    </DocsShell>
  );
}
