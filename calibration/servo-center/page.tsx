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
  SteeringSweepDiagram,
} from '@/components/docs/Diagrams';
import {
  ScrollReveal,
  MouseFollowGlow,
  AnimatedNumeral,
  InfoNote,
} from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Servo center · Calibration · NeoRacer Docs',
  description:
    'Center the steering so a 0.0 angle is straight ahead. On the racecar_neo driver the trim is one constant, STEERING_CENTER_REL_OFFSET in pwm.py, that you nudge and rebuild.',
};

const STEPS: CalibrationStep[] = [
  { n: 1, title: 'SSH in',        sub: 'to the Jetson',          iconKey: 'ssh' },
  { n: 2, title: 'Roll test',     sub: 'push 1 m on tape',       iconKey: 'stopwatch' },
  { n: 3, title: 'Edit offset',   sub: 'pwm.py constant',        iconKey: 'cli' },
  { n: 4, title: 'colcon build',  sub: 'apply the change',       iconKey: 'save' },
  { n: 5, title: 'Re-test',       sub: 'until it holds a line',  iconKey: 'wheel' },
];

export default function ServoCenterPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Calibration', href: '/docs/calibration/motor-trim' },
          { label: 'Servo center' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>CALIBRATION / SERVO CENTER</Eyebrow>
            <DisplayHeading size="xl">
              STEERING <Red>CENTER.</Red>
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
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc.drive.set_speed_angle(speed, 0)</code>{' '}
              the wheels should point dead ahead. Out of the box they usually lean
              a touch, because the steering linkage sits a few counts off true
              center. Unlike the motor, this one has a real software trim: a single
              constant you nudge and rebuild.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={2} prefix="~" suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline">Beginner</ChromeBadge>
              <ChromeBadge variant="outline">racecar_neo source</ChromeBadge>
              <ChromeBadge variant="outline">Edit + colcon build</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A · steering sweep ──────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / STEERING RANGE, TOP DOWN"
          caption="The angle in rc.drive.set_speed_angle maps −1 → full left, 0 → straight, +1 → full right. Centering pins the 0 to true-straight on your specific car."
        >
          <SteeringSweepDiagram />
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
                Pulse-width modulation. A control signal that encodes a value in the width of a repeating electrical pulse. The servo reads the pulse width to decide how far to turn.
              </InfoNote>{' '}
              node maps your steering angle onto the{' '}
              <InfoNote term="servo" title="Servo">
                A motor that holds a commanded position rather than spinning freely. The steering servo sets the angle of the front wheels.
              </InfoNote>: an angle of
              zero lands on the Maestro count 6000, and the full range spans
              roughly 4000 to 8000 counts. Right before it sends that target, it
              adds one constant,{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>STEERING_CENTER_REL_OFFSET</code>,
              which starts at 0. That offset is your trim. Move it a few counts and
              the wheels at zero angle shift with it.
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
              WHAT YOU <Red>NEED.</Red>
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
                title="A straight line"
                lede="Painter's tape on hardwood."
                body="A metre of painter's tape on a flat floor is the test track. Carpet will not tell you whether a drift came from steering or from wheel slip."
              />
              <NumberedFeatureCard
                n={2}
                title="Motor checked first"
                lede="It comes before this page."
                body={
                  <>
                    A car that creeps at zero speed will fight the roll test, so
                    settle{' '}
                    <a href="/docs/calibration/motor-trim" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>motor trim</a>{' '}
                    first, then center the steering.
                  </>
                }
              />
              <NumberedFeatureCard
                n={3}
                title="SSH to the Jetson"
                lede="Where the constant lives."
                body={
                  <>
                    The offset is a line in the driver source on the car. You edit
                    it over SSH, covered in{' '}
                    <a href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</a>.
                  </>
                }
                codeChip="ssh racecar@neoracer"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FIG. B · step strip ──────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. B / FIVE STEPS, START TO FINISH"
          caption="Roll to find the drift, nudge the offset a few counts the other way, rebuild, and roll again. Two or three passes usually settles it."
        >
          <div style={{ paddingTop: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: 480 }}>
              <CalibrationStepStrip steps={STEPS} />
            </div>
          </div>
        </Fig>
      </ScrollReveal>

      {/* ── Section 03 · The procedure ────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / THE PROCEDURE</Eyebrow>
            <DisplayHeading size="lg">
              THE <Red>PROCEDURE.</Red>
            </DisplayHeading>

            <Code lang="bash">{`# 1. SSH into the Jetson.
ssh racecar@neoracer

# 2. Open the PWM node and find the offset near the top.
#      ~/racecar_ws/src/racecar_neo/racecar_neo/pwm.py
#        STEERING_CENTER_REL_OFFSET = 0   # counts added to the servo target

# 3. Roll-test first (Section 04) to see which way it drifts, then nudge:
#      drifts LEFT  at angle 0  ->  steer it right: lower the offset
#      drifts RIGHT at angle 0  ->  steer it left:  raise the offset
#    Move 20 to 40 counts at a time. Four counts is about one microsecond.

# 4. Rebuild and re-source so the running node uses the new center.
cd ~/racecar_ws && colcon build --packages-select racecar_neo
source install/setup.bash`}</Code>

            <Callout type="note" title="Counts, not degrees">
              The Maestro speaks in quarter-microsecond counts, so the numbers feel
              large. A few dozen counts is a small, visible change at the wheel.
              Start with 20 to 40 and halve your step as you close in.
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
              VERIFY THE <Red>CENTER.</Red>
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
              This holds the servo at center and the motor at zero so you can roll
              the car by hand along the tape and watch the drift:
            </p>

            <Code lang="python">{`import racecar_core

rc = racecar_core.create_racecar()

HOLD_S = 8.0
timer = 0.0


def start():
    global timer
    timer = 0.0
    rc.drive.set_speed_angle(0, 0)
    print("Servo verify: holding straight, push the car 1 m along the tape")


def update():
    global timer
    timer += rc.get_delta_time()
    rc.drive.set_speed_angle(0, 0)   # motor at zero, servo centered
    if timer > HOLD_S:
        rc.drive.stop()


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
              A pass is finishing within a wheel's width of the line after a metre.
              A bigger gap means another nudge to the offset and a rebuild.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 05 · Where it lives ──────────────────────────── */}
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
              The center is a constant compiled into the PWM node, so the{' '}
              <code style={{ fontFamily: NB.monoFont }}>colcon build</code> step is
              what applies your trim. Keep the edit in your own copy of the
              workspace so a re-image does not reset it back to zero.
            </p>

            <Code lang="python">{`# ~/racecar_ws/src/racecar_neo/racecar_neo/pwm.py
CAR_MAX_TURN               = 0.4   # steering_angle that maps to full lock
STEERING_CENTER_REL_OFFSET = 0     # your trim, in Maestro counts`}</Code>

            <DashList
              items={[
                <>A positive{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>STEERING_CENTER_REL_OFFSET</code>{' '}
                  steers the zero-angle wheels one way, negative the other. Confirm the direction on your own car with a roll test.</>,
                <>The lock range is{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>CAR_MAX_TURN</code>; leave it unless you are deliberately limiting steering.</>,
                <>Every script that sends a steering angle of 0 now points true ahead, no per-program tweak needed.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Troubleshooting">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <strong>Car pulls hard left or right at speed:</strong> the center is
              fine but the front-wheel toe is off. That is a mechanical fix. See{' '}
              <a
                href="/docs/troubleshooting/motor-jitter"
                style={{ color: NB.neoboticsRed, fontWeight: 700 }}
              >
                motor jitter
              </a>{' '}
              for the mechanical checks.
            </li>
            <li>
              <strong>Drift seems to change with speed:</strong> that is normal.
              The offset fixes the zero. Tire and surface effects get cancelled
              later with{' '}
              <InfoNote term="closed-loop control" title="Closed-loop control">
                Control that measures the result and continuously corrects for the difference. The car senses the wall and adjusts steering on the fly, instead of trusting a fixed setting.
              </InfoNote>, such as a wall follower.
            </li>
            <li>
              <strong>Servo buzzing at rest:</strong> the linkage is binding at the
              mechanical limit. A small offset back toward center usually clears
              it.
            </li>
          </ul>
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Motor trim', href: '/docs/calibration/motor-trim' }}
        next={{ label: 'LiDAR mount', href: '/docs/calibration/lidar-mount' }}
      />
    </DocsShell>
  );
}
