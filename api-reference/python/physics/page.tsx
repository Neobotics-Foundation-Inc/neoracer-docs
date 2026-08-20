import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Code, ApiMethods, type ApiMethod } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

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
      'The car’s acceleration as an (x, y, z) vector in metres per second squared. The reading includes gravity, so at rest the axis pointing down reads about 9.8.',
  },
  {
    sig: 'rc.physics.get_angular_velocity()',
    returns: 'NDArray[3, Float]',
    summary:
      'The car’s rotation rate as an (x, y, z) vector in radians per second. The z component is the yaw rate.',
  },
  {
    sig: 'rc.physics.get_magnetic_field()',
    returns: 'NDArray[3, Float]',
    summary:
      'The magnetic field as an (x, y, z) vector in teslas. Publishing is off by default (publish_mag in config/controller.yaml), so this returns zeros until it is enabled.',
  },
  {
    sig: 'rc.physics.get_encoder_speed()',
    returns: 'float',
    summary: 'The wheel speed from the drivetrain encoder, in metres per second. Positive is forward.',
  },
  {
    sig: 'rc.physics.get_battery_voltage()',
    returns: 'float',
    summary: 'The battery pack voltage in volts.',
  },
  {
    sig: 'rc.physics.get_rc_channels()',
    returns: 'NDArray[8, Float]',
    summary: 'The raw channel values from the FlySky receiver, normalized. A channel with no signal reads -1.',
  },
];

export default function PhysicsApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
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
              The physics module provides the IMU&apos;s acceleration, rotation,
              and magnetic field readings.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            <Red>METHODS</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            EXAMPLE <Red>USAGE</Red>
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
        prev={{ label: 'rc.camera', href: '/docs/api-reference/python/camera' }}
        next={{ label: 'rc.display', href: '/docs/api-reference/python/display' }}
      />
    </DocsShell>
  );
}
