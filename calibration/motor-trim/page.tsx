import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
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
  MotorCreepDiagram,
} from '@/components/docs/Diagrams';
import {
  ScrollReveal,
  MouseFollowGlow,
  AnimatedNumeral,
  InfoNote,
} from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Motor trim · Calibration · NeoRacer Docs',
  description:
    'How the motor neutral and speed caps work on the neoracer_ros2_driver. Neutral lives on the ESP32; the top speed and steering caps are YAML values in config/throttle.yaml and config/controller.yaml that you edit and re-launch.',
};

const STEPS: CalibrationStep[] = [
  { n: 1, title: 'SSH in',        sub: 'to the Jetson',          iconKey: 'ssh' },
  { n: 2, title: 'Hold zero',     sub: 'watch for creep',        iconKey: 'wheel' },
  { n: 3, title: 'Tune caps',     sub: 'throttle.yaml + controller.yaml', iconKey: 'cli' },
  { n: 4, title: 'Restart teleop', sub: 'apply the change',       iconKey: 'save' },
  { n: 5, title: 'Verify',        sub: '5 s stationary check',   iconKey: 'stopwatch' },
];

export default function MotorTrimPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Calibration', href: '/docs/calibration/motor-trim' },
          { label: 'Motor trim' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              MOTOR <Red>TRIM.</Red>
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
              When you call{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc.drive.set_speed_angle(0, 0)</code>{' '}
              the car should sit still, and a full command should give a speed you
              chose on purpose. Both of those are decided by the driver: the{' '}
              <InfoNote term="ESC" title="ESC">
                Electronic speed controller. The board between the battery and the
                drive motor that turns a control signal into how much power the
                motor gets.
              </InfoNote>{' '}
              neutral is fixed, and the speed you actually get comes from a couple
              of constants you can read and change.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={5} prefix="~" suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline">neoracer_ros2_driver</ChromeBadge>
              <ChromeBadge variant="outline">config/throttle.yaml + config/controller.yaml</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A · the problem ──────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / WHAT YOU'RE CHECKING"
          caption={`Left: car at "0 speed" drifting forward on flat ground. Right: a correct neutral leaves the same command still for the full 5 second verify window.`}
        >
          <MotorCreepDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section 01 · How it works ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              HOW IT <Red>WORKS.</Red>
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
              The drive pipeline ends at the{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>controller</code>{' '}
              node, which owns the USB-CDC link to the OSCORE ESP32 and writes
              the per-tick command{' '}
              <code style={{ fontFamily: NB.monoFont }}>v &lt;m/s&gt; &lt;deg&gt;</code>
              {' '}as a normalized request. The ESP32 turns that into the actual{' '}
              <InfoNote term="PWM" title="PWM">
                Pulse-width modulation. A timed on/off signal where the fraction of
                time it stays on encodes a value, here the throttle level sent to
                the ESC.
              </InfoNote>{' '}
              for the ESC. Neutral lives on the ESP32 itself, so when{' '}
              <code style={{ fontFamily: NB.monoFont }}>speed</code> is zero the
              controller writes a zero command and the wheels should be still.
              If the car creeps at zero on a charged pack and a flat floor, the
              cause is the ESC's own neutral or mechanical drag in the drivetrain,
              covered in{' '}
              <a href="/docs/hardware/drivetrain" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                Hardware · Drivetrain
              </a>
              , not a number you set here.
            </p>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 740,
                marginTop: 12,
              }}
            >
              What you do control is how far a command goes. A speed of 1.0 does
              not send the ESC to full throttle; it is scaled down hard, on
              purpose, so a first program cannot launch the car across the room.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · You'll need ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
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
                title="Open floor"
                lede="At least 2 m wide."
                body="Hardwood or sealed concrete is ideal for the verify run. Carpet introduces stiction that masks a real creep, so it is the wrong surface to judge neutral on."
              />
              <NumberedFeatureCard
                n={2}
                title="Charged pack"
                lede="Battery above half."
                body="Below half charge the ESC's voltage compensation shifts, so a creep you see on a low pack may vanish on a fresh one. Judge neutral on a reasonably charged battery."
              />
              <NumberedFeatureCard
                n={3}
                title="SSH to the Jetson"
                lede="Where the driver lives."
                body={
                  <>
                    The constants you tune are source files in the workspace on the
                    car. You reach them over SSH, covered in{' '}
                    <a href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</a>.
                  </>
                }
                codeChip="ssh racecar@neoracer"
              />
              <NumberedFeatureCard
                n={4}
                title="A way to stop"
                lede="Flip SWB back up."
                body="Up on the transmitter's SWB switch is manual mode, so flipping it there takes the car away from your code instantly. That is your fastest manual halt during a verify run."
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FIG. B · step strip ──────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. B / FIVE STEPS, START TO FINISH"
          caption="Read the neutral, change the caps if you want more speed, rebuild, and verify. The change is a couple of edited lines, not a separate tool."
        >
          <div style={{ paddingTop: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: 480 }}>
              <CalibrationStepStrip steps={STEPS} />
            </div>
          </div>
        </Fig>
      </ScrollReveal>

      {/* ── Section 03 · The procedure ──────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              THE <Red>PROCEDURE.</Red>
            </DisplayHeading>

            <Code lang="bash">{`# 1. SSH into the Jetson (see Networking for the address).
ssh racecar@neoracer

# 2. Open the YAML the driver loads at launch.
#    config/throttle.yaml is the single source of truth for the speed
#    and steering caps. config/controller.yaml holds the ESP32 m/s
#    mapping and the steering trim in degrees.
$EDITOR ~/ros2_ws/src/neoracer_ros2_driver/neoracer_ros2_driver/config/throttle.yaml
$EDITOR ~/ros2_ws/src/neoracer_ros2_driver/neoracer_ros2_driver/config/controller.yaml

# 3. Bump the top-speed cap a little if you want more headroom.
#    Small steps. The ESC response is not linear near the bottom of the
#    range, so a small change near zero can mean a large change at the
#    wheel.

# 4. Re-launch teleop. Configs are read on launch, no colcon build needed.
racecar teleop`}</Code>

            <Callout type="warn" title="Raise the cap in small steps">
              The factory cap is gentle on purpose. Doubling it does not
              double the speed, it can more than double it, because the ESC
              response is not linear near the bottom. Step it up a little, re-launch
              teleop, and verify on the floor before going further.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · Verify ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              VERIFY THE <Red>NEUTRAL.</Red>
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
              From the car, this holds a zero command for five seconds so you can
              watch for creep. The same script runs in the Playground first if you
              want to see the expected behaviour before trying it on hardware.
            </p>

            <Code lang="python">{`import racecar_core

rc = racecar_core.create_racecar()

HOLD_S = 5.0
timer = 0.0


def start():
    global timer
    timer = 0.0
    rc.drive.stop()
    print("Trim verify: holding zero for 5 s, watch for creep")


def update():
    global timer
    timer += rc.get_delta_time()
    rc.drive.set_speed_angle(0, 0)
    if timer > HOLD_S:
        rc.drive.stop()
        print("Moved? Check the ESC neutral and drivetrain drag, not software.")


rc.set_start_update(start, update)
rc.go()`}</Code>

            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 720,
              }}
            >
              Less than a centimetre of motion over five seconds is a pass. More
              than that points at the ESC neutral or mechanical drag, since the
              software is already sending exact neutral.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 05 · It lives in source ──────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHERE IT <Red>LIVES.</Red>
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
              Both files are plain YAML the launch system reads on startup.
              Edit, re-launch{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar teleop</code>, and the
              new caps are live. No colcon build, no firmware reflash. They live
              under the driver workspace at{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/ros2_ws/src/neoracer_ros2_driver/neoracer_ros2_driver/config/</code>.
            </p>

            <Code lang="yaml">{`# ~/ros2_ws/src/neoracer_ros2_driver/neoracer_ros2_driver/config/throttle.yaml
# Single source of truth for the top speed and steering caps.
# All values are normalized to [-1, 1] across the pipeline.
throttle_node:
  ros__parameters:
    max_speed_forward: 1.0     # the scale every forward /drive command gets
    max_speed_backward: 1.0
    max_steering: 0.625        # full servo lock; higher stalls the servo`}</Code>

            <Code lang="yaml">{`# ~/ros2_ws/src/neoracer_ros2_driver/neoracer_ros2_driver/config/controller.yaml
# ESP32 serial port, the normalized -> m/s drive mapping, the
# steering trim, and the Flysky RC channel map.
controller_node:
  ros__parameters:
    port_name:          /dev/osrbot_base
    max_speed_mps:      6.0
    steering_trim_deg:  0.0
    throttle_channel:   2
    steering_channel:   0
    mode_channel:       4`}</Code>

            <DashList
              items={[
                <>The car ships with{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>max_speed_forward</code>{' '}
                  at 1.0, the full range. Lower it in throttle.yaml to derate
                  the car for a classroom or a small room.</>,
                <>Neutral is owned by the ESP32 firmware, not the YAML, so a
                  creep at zero is the ESC neutral or drivetrain drag, not a value
                  you set here.</>,
                <>Every student script that calls{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc.drive.set_speed_angle()</code>{' '}
                  gets your caps for free on the next{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar teleop</code>.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Troubleshooting callout ────────────────────────────── */}
      <ScrollReveal>
        <Callout type="tip" title="Troubleshooting">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <strong>Car still creeps at zero.</strong> Software is already
              sending exact neutral, so this is the ESC or the drivetrain. Start
              with{' '}
              <a
                href="/docs/troubleshooting/motor-jitter"
                style={{ color: NB.neoboticsRed, fontWeight: 700 }}
              >
                motor jitter
              </a>
              .
            </li>
            <li>
              <strong>Change didn't take.</strong> Configs are read at launch, so
              the running node is still on the old values. Restart the stack with{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar service restart</code>{' '}
              and confirm with{' '}
              <code style={{ fontFamily: NB.monoFont }}>ros2 param get /throttle_node max_speed_forward</code>.
            </li>
            <li>
              <strong>Steering also off?</strong> Run{' '}
              <a
                href="/docs/calibration/servo-center"
                style={{ color: NB.neoboticsRed, fontWeight: 700 }}
              >
                servo center
              </a>{' '}
              next. That one does have a real software offset.
            </li>
          </ul>
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'racecar-neo-library', href: '/docs/software/racecar-neo-library' }}
        next={{ label: 'Servo center', href: '/docs/calibration/servo-center' }}
      />
    </DocsShell>
  );
}
