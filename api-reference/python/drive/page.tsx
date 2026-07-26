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
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'rc.drive · Python API · NeoRacer Docs',
  description:
    'The Drive module: set the wheel speed and front-wheel steering angle. set_speed_angle, stop, set_max_speed. Same API in the Playground sim and on the car.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'rc.drive.set_speed_angle(speed, angle)',
    returns: 'None',
    summary: 'The one write you have. Sets the wheel speed and the front-wheel steering angle for this frame.',
    params: [
      { name: 'speed: float', detail: <>Throttle in <code style={{ fontFamily: NB.monoFont }}>[-1.0, 1.0]</code>. 1.0 is full forward, -1.0 full reverse, 0 is stopped.</> },
      { name: 'angle: float', detail: <>Steering in <code style={{ fontFamily: NB.monoFont }}>[-1.0, 1.0]</code>. -1.0 is full left, 1.0 full right, 0 is straight.</> },
    ],
  },
  {
    sig: 'rc.drive.stop()',
    returns: 'None',
    summary: 'Halts the car and returns the front wheels to centre. The same as set_speed_angle(0, 0).',
  },
  {
    sig: 'rc.drive.set_max_speed(max_speed=0.25)',
    returns: 'None',
    summary: 'Scales every speed you send afterward. A safety cap, set once in start(). The default is 0.25, so a student set_speed_angle(1.0, 0) only drives at a quarter of the hardware top speed until you raise it.',
    params: [
      { name: 'max_speed: float', detail: <>Throttle scale in <code style={{ fontFamily: NB.monoFont }}>[0.0, 1.0]</code>. Defaults to 0.25.</> },
    ],
  },
];

export default function DriveApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'rc.drive' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>API REFERENCE / PYTHON</Eyebrow>
            <DisplayHeading size="xl">
              RC.<Red>DRIVE.</Red>
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
              The Drive module is how your code moves the car: one call sets the
              wheel speed and the front-wheel steering angle. It is the
              only part of the car your program writes to, and the same three
              methods run unchanged in the Playground sim and on the physical
              NeoRacer.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Sim ↔ car identical</ChromeBadge>
              <ChromeBadge variant="outline">3 methods</ChromeBadge>
              <ChromeBadge variant="outline">speed, angle in [-1, 1]</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Methods ─────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>METHODS</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>METHODS.</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      {/* ── Example ─────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>TYPICAL USE</Eyebrow>
          <DisplayHeading size="lg">
            EXAMPLE <Red>USAGE.</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core

rc = racecar_core.create_racecar()

def start():
    # Raise the throttle cap once. The library defaults it to 0.25.
    rc.drive.set_max_speed(0.4)
    rc.drive.stop()

def update():
    # Hold the A button to creep forward, steer with the left stick x-axis.
    x, _ = rc.controller.get_joystick(rc.controller.Joystick.LEFT)
    speed = 0.3 if rc.controller.is_down(rc.controller.Button.A) else 0.0
    rc.drive.set_speed_angle(speed, x)

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Speed and angle are normalized, not physical units">
          You send numbers in <code style={{ fontFamily: NB.monoFont }}>[-1, 1]</code>, not m/s or
          degrees. The library maps them to the car's real throttle and steering
          range, which is what lets the same script run in the sim and on the
          car. To make a "0 speed" command sit perfectly still on the real car,
          run{' '}
          <a href="/docs/calibration/motor-trim" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            motor trim
          </a>{' '}
          and{' '}
          <a href="/docs/calibration/servo-center" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            servo center
          </a>
          .
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'racecar-neo-library', href: '/docs/software/racecar-neo-library' }}
        next={{ label: 'rc.lidar', href: '/docs/api-reference/python/lidar' }}
      />
    </DocsShell>
  );
}
