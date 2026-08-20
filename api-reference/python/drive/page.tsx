import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
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
    summary: 'Sets the wheel speed and the front-wheel steering angle for this frame.',
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
    sig: 'rc.drive.set_max_speed(max_speed=1.0)',
    returns: 'None',
    summary: 'Sets the maximum throttle in both directions. A safety cap, set once in start(). Defaults to 1.0 (full scale); lower it to slow the whole program down in one place.',
    params: [
      { name: 'max_speed: float', detail: <>Throttle scale in <code style={{ fontFamily: NB.monoFont }}>[0.0, 1.0]</code>. Defaults to 1.0.</> },
    ],
  },
];

export default function DriveApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'rc.drive' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RC.<Red>DRIVE</Red>
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
              The drive module controls the wheel speed and steering angle of
              the car.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Methods ─────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            <Red>METHODS</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      {/* ── Example ─────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            EXAMPLE <Red>USAGE</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core

rc = racecar_core.create_racecar()

def start():
    # Cap the throttle once, so every later command is scaled down.
    rc.drive.set_max_speed(0.4)
    rc.drive.stop()

timer = 0.0

def update():
    # Drive forward gently for 2 seconds, then stop.
    global timer
    timer += rc.get_delta_time()
    if timer < 2.0:
        rc.drive.set_speed_angle(0.3, 0)
    else:
        rc.drive.stop()

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Speed and angle are normalized, not physical units">
          You send numbers in <code style={{ fontFamily: NB.monoFont }}>[-1, 1]</code>, not m/s or
          degrees. The library maps them to the car's real throttle and steering
          range, which is what lets the same script run in the sim and on the
          car.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'racecar_core', href: '/docs/api-reference/python/core' }}
        next={{ label: 'rc.lidar', href: '/docs/api-reference/python/lidar' }}
      />
    </DocsShell>
  );
}
