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
    'How the motor neutral and speed caps work on the racecar_neo driver. The ESC neutral is fixed; the speed you actually get is set by constants in throttle.py and pwm.py.',
};

const STEPS: CalibrationStep[] = [
  { n: 1, title: 'SSH in',        sub: 'to the Jetson',          iconKey: 'ssh' },
  { n: 2, title: 'Hold zero',     sub: 'watch for creep',        iconKey: 'wheel' },
  { n: 3, title: 'Tune caps',     sub: 'throttle.py / pwm.py',   iconKey: 'cli' },
  { n: 4, title: 'colcon build',  sub: 'apply the change',       iconKey: 'save' },
  { n: 5, title: 'Verify',        sub: '5 s stationary check',   iconKey: 'stopwatch' },
];

export default function MotorTrimPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Calibration', href: '/docs/calibration/motor-trim' },
          { label: 'Motor trim' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>CALIBRATION / MOTOR TRIM</Eyebrow>
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
              <ChromeBadge variant="outline">Beginner</ChromeBadge>
              <ChromeBadge variant="outline">racecar_neo source</ChromeBadge>
              <ChromeBadge variant="outline">Edit + colcon build</ChromeBadge>
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
            <Eyebrow>01 / HOW IT WORKS</Eyebrow>
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
              The{' '}
              <InfoNote term="PWM" title="PWM">
                Pulse-width modulation. A timed on/off signal where the fraction of
                time it stays on encodes a value, here the throttle level sent to
                the ESC.
              </InfoNote>{' '}
              node drives the ESC through a Pololu Maestro. Neutral is a
              fixed target of 1500 microseconds (Maestro count 6000), and a{' '}
              <code style={{ fontFamily: NB.monoFont }}>speed</code> of zero maps
              exactly to it. There is no software motor-neutral offset, the way
              there is for steering. So if the car creeps at zero, the cause is
              the ESC's own neutral or mechanical drag in the drivetrain, covered
              in{' '}
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
                lede="Release the bumpers."
                body="The drive mux only forwards commands while a bumper is held. Let go and it publishes a stop, which is your fastest manual halt during a verify run."
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
            <Eyebrow>03 / THE PROCEDURE</Eyebrow>
            <DisplayHeading size="lg">
              THE <Red>PROCEDURE.</Red>
            </DisplayHeading>

            <Code lang="bash">{`# 1. SSH into the Jetson (see Networking for the address).
ssh racecar@neoracer

# 2. The speed caps live as constants in the driver source.
#    The throttle node holds the duty actually sent to the ESC:
#      ~/racecar_ws/src/racecar_neo/racecar_neo/throttle.py
#        CAR_THROTTLE_FORWARD  = 0.0425   # forward duty at full command
#        CAR_THROTTLE_BACKWARD = 0.06     # reverse duty at full command
#
#    The PWM node holds the speed that maps to full range:
#      ~/racecar_ws/src/racecar_neo/racecar_neo/pwm.py
#        CAR_MAX_FORWARD  = 0.25
#        CAR_MAX_BACKWARD = 0.25

# 3. Raise CAR_THROTTLE_FORWARD a little if you want more top speed.
#    Small steps: 0.0425 to 0.05 is already noticeably quicker.

# 4. Rebuild the package and re-source so the running node picks it up.
cd ~/racecar_ws && colcon build --packages-select racecar_neo
source install/setup.bash`}</Code>

            <Callout type="warn" title="Raise the cap in small steps">
              The factory forward duty is gentle on purpose. Doubling it does not
              double the speed, it can more than double it, because the ESC
              response is not linear near the bottom. Step it up a little, rebuild,
              and verify on the floor before you go further.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · Verify ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / VERIFY</Eyebrow>
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
            <Eyebrow>05 / WHERE IT LIVES</Eyebrow>
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
              Unlike the IMU calibration, which writes a YAML the driver loads at
              launch, these speed caps are constants compiled into the node. The{' '}
              <code style={{ fontFamily: NB.monoFont }}>colcon build</code> step is
              what applies them. To keep your edits across a re-image, hold them in
              your own copy of the workspace or as a patch, since there is no
              separate file to back up.
            </p>

            <Code lang="python">{`# ~/racecar_ws/src/racecar_neo/racecar_neo/throttle.py
CAR_THROTTLE_FORWARD  = 0.0425  # forward duty at full command
CAR_THROTTLE_BACKWARD = 0.06    # reverse duty at full command
CAR_THROTTLE_TURN     = 0.25    # steering scale before the servo
DRIVE_MAX_SPEED       = 0.25    # the speed /drive is measured against`}</Code>

            <DashList
              items={[
                <>A higher{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>CAR_THROTTLE_FORWARD</code>{' '}
                  means more top speed for the same command.</>,
                <>The neutral itself is in{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>pwm.py</code>{' '}
                  as the Maestro target 6000, and is not meant to be changed.</>,
                <>Every student script that calls{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc.drive.set_speed_angle()</code>{' '}
                  gets your caps for free once the node is rebuilt.</>,
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
              <strong>Change didn't take.</strong> The node was not rebuilt or
              re-sourced. Re-run{' '}
              <code style={{ fontFamily: NB.monoFont }}>colcon build</code> and{' '}
              <code style={{ fontFamily: NB.monoFont }}>source install/setup.bash</code>,
              then restart the driver.
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
