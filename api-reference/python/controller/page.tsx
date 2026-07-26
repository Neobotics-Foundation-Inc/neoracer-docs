import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout, Code, ApiMethods, type ApiMethod } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'rc.controller · Python API · NeoRacer Docs',
  description:
    'The Controller module: read the manual controls through an Xbox-style mapping fed by the FlySky remote. is_down, was_pressed, was_released, get_trigger, get_joystick.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'rc.controller.is_down(button)',
    returns: 'bool',
    summary: 'True for every frame the button is held. Use it for "while I hold A, drive".',
    params: [{ name: 'button: Button', detail: <>One of the <code style={{ fontFamily: NB.monoFont }}>Button</code> values below.</> }],
  },
  {
    sig: 'rc.controller.was_pressed(button)',
    returns: 'bool',
    summary: 'True only on the single frame the button goes down. Use it for "each time A is tapped, toggle something".',
    params: [{ name: 'button: Button', detail: <>One of the <code style={{ fontFamily: NB.monoFont }}>Button</code> values below.</> }],
  },
  {
    sig: 'rc.controller.was_released(button)',
    returns: 'bool',
    summary: 'True only on the frame the button comes back up. The mirror of was_pressed.',
    params: [{ name: 'button: Button', detail: <>One of the <code style={{ fontFamily: NB.monoFont }}>Button</code> values below.</> }],
  },
  {
    sig: 'rc.controller.get_trigger(trigger)',
    returns: 'float',
    summary: 'How far a trigger is pulled, from 0.0 (released) to 1.0 (fully pressed). Analog, so it makes a smooth throttle.',
    params: [{ name: 'trigger: Trigger', detail: <><code style={{ fontFamily: NB.monoFont }}>Trigger.LEFT</code> or <code style={{ fontFamily: NB.monoFont }}>Trigger.RIGHT</code>.</> }],
  },
  {
    sig: 'rc.controller.get_joystick(joystick)',
    returns: 'tuple[float, float]',
    summary: 'The (x, y) position of a stick, each from -1.0 to 1.0. x is left-right, y is down-up. Centre is (0, 0).',
    params: [{ name: 'joystick: Joystick', detail: <><code style={{ fontFamily: NB.monoFont }}>Joystick.LEFT</code> or <code style={{ fontFamily: NB.monoFont }}>Joystick.RIGHT</code>.</> }],
  },
];

const ENUMS = [
  { label: 'Button', values: 'A · B · X · Y · LB · RB · LJOY · RJOY' },
  { label: 'Joystick', values: 'LEFT · RIGHT' },
  { label: 'Trigger', values: 'LEFT · RIGHT' },
];

export default function ControllerApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'rc.controller' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>API REFERENCE / PYTHON</Eyebrow>
            <DisplayHeading size="xl">
              RC.<Red>CONTROLLER.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The Controller module reads the manual controls through an
              Xbox-style mapping: buttons, triggers, and joysticks. On the car
              the physical remote is the FlySky transmitter, whose sticks and
              switches feed those same axes and buttons, so code written against
              this API runs unchanged against the on-screen controls in the
              Playground sim.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Same API, sim and car</ChromeBadge>
              <ChromeBadge variant="outline">FlySky on the car</ChromeBadge>
              <ChromeBadge variant="outline">Xbox-style mapping</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>METHODS</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>METHODS.</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <MonoLabel>Enums you pass in</MonoLabel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
              marginTop: 12,
            }}
          >
            {ENUMS.map((e) => (
              <div
                key={e.label}
                style={{
                  background: NB.haloWhite,
                  border: `1px solid ${NB.borderOnBeige}`,
                  borderRadius: 0,
                  padding: '12px 14px',
                }}
              >
                <div style={{ fontFamily: NB.monoFont, fontSize: 12, fontWeight: 700, color: NB.neoboticsRed, letterSpacing: '0.08em' }}>
                  rc.controller.{e.label}
                </div>
                <div style={{ fontFamily: NB.monoFont, fontSize: 13, color: NB.textOnBeige, marginTop: 6 }}>
                  {e.values}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>TYPICAL USE</Eyebrow>
          <DisplayHeading size="lg">
            A TYPICAL <Red>LOOP.</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core

rc = racecar_core.create_racecar()

def start():
    rc.drive.stop()

def update():
    # B is a manual stop. was_pressed fires once, on the tap.
    if rc.controller.was_pressed(rc.controller.Button.B):
        rc.drive.stop()
        return

    # Left stick x steers; hold A to creep forward.
    x, _ = rc.controller.get_joystick(rc.controller.Joystick.LEFT)
    speed = 0.3 if rc.controller.is_down(rc.controller.Button.A) else 0.0
    rc.drive.set_speed_angle(speed, x)

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'rc.camera', href: '/docs/api-reference/python/camera' }}
        next={{ label: 'rc.physics', href: '/docs/api-reference/python/physics' }}
      />
    </DocsShell>
  );
}
