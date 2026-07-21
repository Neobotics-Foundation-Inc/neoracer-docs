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
} from '@/components/docs/Editorial';
import {
  SimCarBridgeDiagram,
  LifecycleLoopDiagram,
  SquareTrajectoryDiagram,
} from '@/components/docs/Diagrams';
import {
  ScrollReveal,
  MouseFollowGlow,
  LiveLidarSweep,
  TabbedCode,
  InteractiveModuleExplorer,
  AnimatedNumeral,
  InfoNote,
  type ApiModule,
} from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'racecar-neo-library · Software · NeoRacer Docs',
  description:
    'The Python API every NeoRacer student writes against. The same rc.* namespace runs unchanged in the browser Playground and on the physical car.',
};

/* ─────────────────────────────────────────────────────────────────────────
 * The five rc.* modules. Data drives the InteractiveModuleExplorer.
 * Signatures + descriptions stay grounded in the established docs plan +
 * existing pages (lidar/compute/etc.); nothing invented beyond that.
 * ─────────────────────────────────────────────────────────────────────── */
const MODULES: ApiModule[] = [
  {
    id: 'lidar',
    mono: 'rc.lidar',
    lede: 'The distance map you steer by.',
    badge: '~1440 samples · 0.25°',
    methods: [
      { sig: 'rc.lidar.get_samples()', what: 'The latest scan in centimetres: ~1440 samples on the car, 720 in the sim. Index 0 is dead ahead; the rear wedge reads 0.' },
      { sig: 'rc_utils.get_lidar_average_distance(scan, angle)', what: 'In racecar_utils. Mean range over a small angle window, for gap finding that holds up against noisy samples.' },
      { sig: 'rc_utils.get_lidar_closest_point(scan)', what: 'In racecar_utils. The (angle, distance) of the nearest return.' },
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2" strokeDasharray="2 4" />
        <circle cx="32" cy="32" r="6" fill="currentColor" />
        <line x1="32" y1="32" x2="32" y2="8" stroke={NB.neoboticsRed} strokeWidth="2.4" strokeLinecap="round" />
        <polygon points="32,4 28,12 36,12" fill={NB.neoboticsRed} />
      </svg>
    ),
  },
  {
    id: 'camera',
    mono: 'rc.camera',
    lede: '640 × 480 RGB frames as NumPy arrays.',
    badge: '640 × 480 · BGR',
    methods: [
      { sig: 'rc.camera.get_color_image()', what: 'Latest frame as a NumPy array, (480, 640, 3) uint8, blue-green-red. Same shape on car and in sim.' },
      { sig: 'rc.camera.get_depth_image()', what: 'Depth-camera method (generic library); all zeros on the NeoRacer, which is RGB-only. Use rc.lidar for distance.' },
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="18" width="48" height="32" rx="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="34" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="34" r="4" fill={NB.neoboticsRed} />
        <rect x="22" y="12" width="20" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'physics',
    mono: 'rc.physics',
    lede: 'The IMU. Acceleration and rotation.',
    badge: 'accel · gyro',
    methods: [
      { sig: 'rc.physics.get_linear_acceleration()', what: 'Three-axis acceleration in m/s². Axes differ between sim and car.' },
      { sig: 'rc.physics.get_angular_velocity()', what: 'Three-axis gyro in rad/s. The z component is your yaw rate.' },
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="14" y="14" width="36" height="36" rx="3" stroke="currentColor" strokeWidth="2" />
        <line x1="32" y1="14" x2="32" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
        <line x1="14" y1="32" x2="50" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
        <circle cx="32" cy="32" r="3" fill={NB.neoboticsRed} />
        <path d="M32 32 L42 22" stroke={NB.neoboticsRed} strokeWidth="2" strokeLinecap="round" />
        <polygon points="42,22 38,22 42,26" fill={NB.neoboticsRed} />
      </svg>
    ),
  },
  {
    id: 'drive',
    mono: 'rc.drive',
    lede: 'The only write you have.',
    badge: 'speed · angle',
    methods: [
      { sig: 'rc.drive.set_speed_angle(speed, angle)', what: 'Speed in [-1, 1], steering angle in [-1, 1]. The MCU (microcontroller unit) enforces a 150 ms watchdog.' },
      { sig: 'rc.drive.stop()', what: 'Zeros both. Same as set_speed_angle(0, 0).' },
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="6" y="22" width="52" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="46" r="6" fill="currentColor" />
        <circle cx="46" cy="46" r="6" fill="currentColor" />
        <path d="M32 22 L42 12" stroke={NB.neoboticsRed} strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="42,12 36,12 42,18" fill={NB.neoboticsRed} />
      </svg>
    ),
  },
  {
    id: 'controller',
    mono: 'rc.controller',
    lede: 'Buttons and sticks, debounced.',
    badge: 'safety surface',
    methods: [
      { sig: 'rc.controller.is_down(button)', what: 'True while the button is held. was_pressed fires once on the tap. Most programs watch a button here for a manual stop.' },
      { sig: 'rc.controller.get_joystick(stick)', what: '(x, y) tuple in [-1, 1] for the named stick.' },
      { sig: 'rc.controller.get_trigger(trigger)', what: 'Analog value in [0, 1] for the named trigger.' },
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="6" y="20" width="52" height="24" rx="12" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="32" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="32" r="2" fill={NB.neoboticsRed} />
        <circle cx="46" cy="28" r="2" fill="currentColor" />
        <circle cx="50" cy="32" r="2" fill="currentColor" />
        <circle cx="46" cy="36" r="2" fill="currentColor" />
        <circle cx="42" cy="32" r="2" fill={NB.neoboticsRed} />
      </svg>
    ),
  },
];

const HELLO_PYTHON = `import racecar_core

rc = racecar_core.create_racecar()

SIDE_TIME = 1.0   # seconds per straight leg
TURN_TIME = 0.7   # seconds per 90-degree turn
SPEED = 0.25      # 25% throttle
TURN = 1.0        # full lock

timer = 0.0
leg = 0           # 8 legs: even legs drive straight, odd legs turn

def start():
    global timer, leg
    timer, leg = 0.0, 0
    rc.drive.stop()

def update():
    global timer, leg
    if leg >= 8:                     # four straights + four turns
        rc.drive.stop()
        return
    timer += rc.get_delta_time()     # seconds since the last frame
    if leg % 2 == 0:
        rc.drive.set_speed_angle(SPEED, 0)
        if timer > SIDE_TIME:
            leg, timer = leg + 1, 0.0
    else:
        rc.drive.set_speed_angle(SPEED, TURN)
        if timer > TURN_TIME:
            leg, timer = leg + 1, 0.0

rc.set_start_update(start, update)
rc.go()`;

const HELLO_BASH_PLAYGROUND = `# In the browser sim, paste the Python into the editor and press Run.
# Pyodide spins up a Web Worker. The same file works on the car next.

# Open the Playground:
open https://playground.neobotics.org`;

const HELLO_BASH_CAR = `# On the car. Copy the script over, then run it.
scp drive_square.py racecar@10.42.0.1:jupyter_ws/neoracer-os/labs/
ssh racecar@10.42.0.1
python3 ~/jupyter_ws/neoracer-os/labs/drive_square.py

# SWB down hands the car to the program; SWB back to the middle takes it
# away again. That flip back is your e-stop.`;

export default function RacecarNeoLibraryPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Software', href: '/docs/software/os-and-image' },
          { label: 'racecar-neo-library' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-50} right={-20} size={440} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SOFTWARE / RACECAR-NEO-LIBRARY</Eyebrow>
            <DisplayHeading size="xl">
              THE PYTHON <Red>LIBRARY.</Red>
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
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar-neo-library</code>{' '}
              is the Python module every student writes against. Five modules
              under an{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc.*</code> namespace,
              with identical signatures in the NeoRacer Playground browser
              simulator and on the physical car. The same file works in both
              places.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Sim ↔ car portable</ChromeBadge>
              <ChromeBadge variant="outline">
                <AnimatedNumeral value={5} /> modules
              </ChromeBadge>
              <ChromeBadge variant="outline">
                set_start_update + go
              </ChromeBadge>
              <ChromeBadge variant="outline">Pyodide-compatible</ChromeBadge>
            </div>

            {/* Live spec meter: three big numerals that count up on view */}
            <div
              style={{
                marginTop: 28,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 12,
              }}
            >
              <MeterCard label="LiDAR scan rate" value={30} suffix=" Hz" />
              <MeterCard label="get_samples() length" value={1440} sub="~, on the car (720 in sim)" />
              <MeterCard label="IMU sample rate" value={200} suffix=" Hz" />
              <MeterCard label="Camera frame width" value={640} sub="× 480, RGB (no depth)" />
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A · Sim-Car Bridge ────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / SIM TO CAR, ONE TRUNK"
          caption="The red trunk is the rc.* API you write against. Whichever side you run on, the API contract is identical: same names, same shapes, same units."
        >
          <SimCarBridgeDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section 01 · Modules at a glance ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / MODULES AT A GLANCE</Eyebrow>
            <DisplayHeading size="lg">
              THE FIVE <Red>MODULES.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 720,
                marginBottom: 8,
              }}
            >
              Click any module to see the methods it exposes. Every behaviour
              you'll ever ship (
              <InfoNote term="teleop" title="Teleop">
                Teleoperation. Driving the car by hand from a controller or
                keyboard, instead of the car deciding for itself. It is the
                first thing most people wire up.
              </InfoNote>, wall follow, gap follower, end-to-end RL) is some
              combination of these five.
            </p>
            <InteractiveModuleExplorer modules={MODULES} />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Live lidar visual ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / WHAT THE SCAN LOOKS LIKE</Eyebrow>
            <DisplayHeading size="lg">
              THE LIDAR <Red>SCAN.</Red>
            </DisplayHeading>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 32,
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <LiveLidarSweep size={320} />
              <div>
                <p
                  style={{
                    fontFamily: NB.bodyFont,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: NB.textMutedBeige,
                    marginBottom: 12,
                  }}
                >
                  The sweep on the left is what the scanner is doing while you
                  read this. Each tick mark is one of the samples{' '}
                  <code style={{ fontFamily: NB.monoFont }}>get_samples()</code> hands you. The full
                  coordinate frame and array layout live on the{' '}
                  <a
                    href="/docs/hardware/sensors/lidar"
                    style={{ color: NB.neoboticsRed, fontWeight: 700 }}
                  >
                    LiDAR hardware page
                  </a>
                  .
                </p>
                <DashList
                  items={[
                    <>
                      Index 0 is dead ahead. Index 360 is directly behind. The
                      array sweeps clockwise.
                    </>,
                    <>Samples come back in centimetres. A 0 means no return inside the range gate.</>,
                    <>
                      One scan arrives every ~33 ms. Reading it inside{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>update()</code> is fast enough for any{' '}
                      <InfoNote term="closed-loop controller" title="Closed-loop controller">
                        Code that reads a sensor, compares it to a target, and
                        adjusts the motors, then repeats. The constant feedback
                        is what keeps the car on track instead of driving blind.
                      </InfoNote>{' '}
                      you'll write.
                    </>,
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FIG. B · Lifecycle loop ───────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. B / THE LIFECYCLE"
          caption={`start() runs once when the script loads. update() runs every frame after that. You wire both in with rc.set_start_update(start, update), then call rc.go() at the bottom of the file and the runtime handles the rest.`}
        >
          <LifecycleLoopDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section 03 · Hello world ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / HELLO WORLD, DRIVE A SQUARE</Eyebrow>
            <DisplayHeading size="lg">
              DRIVE A <Red>SQUARE.</Red>
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
              The smallest interesting program. The Python tab is the file you
              save. The other two tabs show how to run it in the Playground or
              on the car.
            </p>

            <TabbedCode
              tabs={[
                { label: 'Python', lang: 'python', code: HELLO_PYTHON },
                { label: 'Playground', lang: 'bash', code: HELLO_BASH_PLAYGROUND },
                { label: 'On the car', lang: 'bash', code: HELLO_BASH_CAR },
              ]}
            />

            <Fig
              label="FIG. C / EXPECTED PATH"
              caption="Floor view. Square sides are about 1 m at the suggested speed. If your room is smaller, lowering SIDE_TIME shrinks the square to fit."
            >
              <SquareTrajectoryDiagram />
            </Fig>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · Two ways to ship ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / TWO WAYS TO SHIP</Eyebrow>
            <DisplayHeading size="lg">
              TWO WAYS TO <Red>SHIP.</Red>
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
              The Playground is the comfortable place to iterate until you
              trust the behaviour, and the same file then runs on the car
              without a single change. The runtime swaps the Pyodide-backed
              sensor sources for the{' '}
              <InfoNote term="ROS 2" title="ROS 2">
                Robot Operating System 2. The framework that moves sensor and
                motor data between the programs running on the car. On the
                physical car your code talks to ROS 2. In the browser it talks
                to the simulator instead.
              </InfoNote>{' '}
              ones for you.
            </p>

            <DashList
              items={[
                <>
                  <strong>In the sim:</strong> open{' '}
                  <a
                    href="https://playground.neobotics.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: NB.neoboticsRed, fontWeight: 700 }}
                  >
                    NeoRacer Playground
                  </a>
                  , paste the script into the editor, and press Run. Pyodide
                  spins up a Web Worker, and your code executes inside it.
                </>,
                <>
                  <strong>On the car:</strong> SSH in, the file lands in{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>~/scripts/</code>,
                  and{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>python3 ~/scripts/drive_square.py</code>{' '}
                  runs it.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Coming from F1TENTH? ───────────────────────────────────────── */}
      <ScrollReveal>
        <Callout type="tip" title="Coming from F1TENTH?">
          The racecar-neo-library wraps the same ROS 2 driver topics the F1TENTH
          reference build uses, so your existing F1TENTH Python helpers run
          unchanged.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'OS & image', href: '/docs/software/os-and-image' }}
        next={{ label: 'ROS 2 driver', href: '/docs/software/ros2-driver' }}
      />
    </DocsShell>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * MeterCard: compact numeral chip used in the hero. Wraps AnimatedNumeral
 * with a small label + optional secondary line. Lives inside this page
 * because nothing else uses this exact shape yet; if it spreads, lift it
 * up into Interactive.tsx.
 * ─────────────────────────────────────────────────────────────────────── */
function MeterCard({
  value,
  label,
  suffix = '',
  sub,
}: {
  value: number;
  label: string;
  suffix?: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        background: NB.haloWhite,
        border: `1px solid ${NB.borderOnBeige}`,
        borderRadius: 12,
        padding: '14px 16px 12px',
        boxShadow: '0 3px 0 -1px rgba(27,32,54,0.05), 0 10px 22px -10px rgba(27,32,54,0.16)',
      }}
    >
      <div
        style={{
          fontFamily: NB.headingFont,
          fontSize: 34,
          fontWeight: 900,
          letterSpacing: '-0.015em',
          color: NB.neoboticsRed,
          lineHeight: 1,
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
        }}
      >
        <AnimatedNumeral value={value} suffix={suffix} />
      </div>
      {sub && (
        <div
          style={{
            fontFamily: NB.monoFont,
            fontSize: 10.5,
            letterSpacing: '0.16em',
            color: NB.textMutedBeige,
            marginTop: 4,
            fontWeight: 700,
          }}
        >
          {sub}
        </div>
      )}
      <div
        style={{
          fontFamily: NB.headingFont,
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: NB.textOnBeige,
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
}
