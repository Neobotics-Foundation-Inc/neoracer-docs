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
  StepMarker,
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
    'Center the steering so a 0.0 angle is straight ahead. The car measures its own trim: run lab_trim_cal.py, paste the two commands it prints, rerun until it says CALIBRATED.',
};

const STEPS: CalibrationStep[] = [
  { n: 1, title: 'SSH in',        sub: 'to the Jetson',            iconKey: 'ssh' },
  { n: 2, title: 'Park it',       sub: 'facing a wall, 2 to 6 m',  iconKey: 'wheel' },
  { n: 3, title: 'Run the lab',   sub: 'lab_trim_cal.py',          iconKey: 'cli' },
  { n: 4, title: 'Paste two lines', sub: 'it prints the commands', iconKey: 'save' },
  { n: 5, title: 'Rerun',         sub: 'until it says CALIBRATED', iconKey: 'stopwatch' },
];

export default function ServoCenterPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Calibration', href: '/docs/calibration/motor-trim' },
          { label: 'Servo center' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
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
              center. The fix is a single software trim, and you do not have to
              guess it: the car measures its own drift with the gyro and lidar,
              then prints the exact value to set.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={2} prefix="~" suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline">config/controller.yaml</ChromeBadge>
              <ChromeBadge variant="outline">Edit + restart</ChromeBadge>
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
            <StepMarker n={1} label="HOW IT WORKS" />
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
              Your steering angle is normalized in the range{' '}
              <code style={{ fontFamily: NB.monoFont }}>[-1, 1]</code> all the way
              through the drive pipeline. The{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>controller</code> node
              writes the per-tick command{' '}
              <code style={{ fontFamily: NB.monoFont }}>v &lt;m/s&gt; &lt;deg&gt;</code>{' '}
              over USB-CDC to the ESP32, where the angle in degrees is what the
              servo eventually sees. Before that send, the controller adds one
              YAML value,{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>steering_trim_deg</code>,
              from <code style={{ fontFamily: NB.monoFont }}>config/controller.yaml</code>. That
              value starts at <code style={{ fontFamily: NB.monoFont }}>0.0</code>. Nudge it a
              degree or two and the wheels at zero angle shift with it.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · You'll need ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={2} label="YOU'LL NEED" />
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
                lede="Where the YAML lives."
                body={
                  <>
                    The trim is one line in{' '}
                    <code style={{ fontFamily: NB.monoFont }}>config/controller.yaml</code>{' '}
                    on the car. You edit it over SSH, covered in{' '}
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
          caption="Run the calibration lab, paste the two commands it prints, and run it again. Two or three passes lands within a degree, and the lab tells you when to stop."
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
            <StepMarker n={3} label="THE PROCEDURE" />
            <DisplayHeading size="lg">
              THE <Red>PROCEDURE.</Red>
            </DisplayHeading>

            <Code lang="bash">{`# 1. SSH into the Jetson and park the car facing a wall, 2 to 6 m of clear floor.
ssh racecar@neoracer

# 2. Run the calibration lab. Flip the transmitter to autonomy when it says so.
cd ~/jupyter_ws/neoracer-os/labs
python3 lab_trim_cal.py

# The car drives straight for up to three seconds, measures its heading drift
# with the gyro and the distance with the front lidar, then prints:
#
#   current steering_trim_deg: +1.0   measured correction: -2.6
#
#   === RUN THESE TWO COMMANDS, THEN RERUN ME ===
#
#   sed -i -E 's/steering_trim_deg: *-?[0-9.]+/steering_trim_deg: -1.6/' \
#     ~/ros2_ws/install/neoracer_ros2_driver/share/neoracer_ros2_driver/config/controller.yaml \
#     ~/ros2_ws/src/neoracer_ros2_driver/neoracer_ros2_driver/config/controller.yaml
#   sudo systemctl restart neoracer-teleop

# 3. Paste those two commands, then run the lab again.
#    Repeat until it prints === CALIBRATED ===  (usually two or three passes).`}</Code>

            <Callout type="note" title="Boot the car still">
              The measurement leans on the gyro, and the gyro calibrates its
              bias in the first seconds after power-on. Power the car up flat
              and still, hands off, before calibrating. The lab checks this and
              refuses to drive if the gyro has not settled.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · Verify ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={4} label="VERIFY" />
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
              No tools handy, or want a second opinion? This holds the servo at
              center and the motor at zero so you can roll the car by hand along
              a metre of tape and watch the drift:
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
            <StepMarker n={5} label="WHERE IT LIVES" />
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
              The trim is a YAML value the controller node reads on launch, so a
              teleop restart is what applies it. There is no colcon build to wait
              on. The commands the lab prints edit both copies of{' '}
              <code style={{ fontFamily: NB.monoFont }}>controller.yaml</code>, the
              installed one the car runs and the source one, so the value survives
              a rebuild.
            </p>

            <Code lang="yaml">{`# ~/ros2_ws/src/neoracer_ros2_driver/neoracer_ros2_driver/config/controller.yaml
controller_node:
  ros__parameters:
    port_name:              /dev/osrbot_base
    max_speed_mps:          6.0
    max_steering_angle_deg: 30.0
    steering_trim_deg:      0.0   # your trim, in degrees; positive steers left
    throttle_channel:       2
    steering_channel:       0
    mode_channel:           4`}</Code>

            <DashList
              items={[
                <>A positive{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>steering_trim_deg</code>{' '}
                  steers the zero-angle wheels left, a negative one right. The calibration lab handles the sign for you.</>,
                <>The top-speed cap is{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>max_speed_mps</code>{' '}
                  on the same file; leave it alone if you only meant to trim the steering.</>,
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
