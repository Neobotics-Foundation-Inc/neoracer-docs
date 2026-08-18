import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
  Fig,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedDataFlowDiagram } from '@/components/docs/Interactive';
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'ROS 2 driver · Software · NeoRacer Docs',
  description: 'A quick ROS 2 primer for students who have never touched it, then a complete reference for everyone else.',
};

/* ─────────────────────────────────────────────────────────────────────────
 * This page is the visual showcase, directly mirrors the user's
 * reference editorial illustrations. Massive Kernel display headings,
 * ghost numerals, FIG. A data-flow diagram, four numbered feature cards
 * (Publisher / Subscriber / Topic / Message).
 * ─────────────────────────────────────────────────────────────────────── */

/* `ros2 topic list` on a running car, verified 2026-08-17. Alphabetical, as
 * the command prints it. Keep this in step with the API reference topics
 * page when either one changes. */
const TOPICS: [string, string][] = [
  ['/battery', 'pack state'],
  ['/battery/voltage', 'pack voltage on its own'],
  ['/camera/color', 'sensor_msgs/Image, JPEG in an Image, 60 fps'],
  ['/diagnostics', 'ROS 2 internals'],
  ['/dotmatrix/text', 'text to the 8x8 display on the back'],
  ['/drive', 'ackermann_msgs, PUBLISH here'],
  ['/edgetpu/inference', 'Coral accelerator output, when it is running'],
  ['/encoder/speed', 'wheel speed from the encoders'],
  ['/gamepad_drive', 'the command gamepad_node builds from the sticks'],
  ['/imu/fused', 'sensor_msgs/Imu, accel + gyro fused, 200 Hz'],
  ['/joy', 'sensor_msgs/Joy, the Flysky receiver'],
  ['/mag', 'raw magnetometer, not part of the fused output'],
  ['/motor', 'the final command to the ESC and the servo'],
  ['/mux_out', 'whichever source the mux is forwarding'],
  ['/odom', 'nav_msgs/Odometry, integrated from the encoders'],
  ['/parameter_events', 'ROS 2 internals'],
  ['/ric/channels', 'raw RC channel values'],
  ['/rosout', 'ROS 2 internals'],
  ['/scan', 'sensor_msgs/LaserScan, the LiDAR over UDP'],
];

export default function ROS2DriverPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/networking' },
          { label: 'ROS 2 driver' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingTop: 24, paddingBottom: 40 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE ROS&nbsp;2 <Red>DRIVER</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 18,
                lineHeight: 1.55,
                color: NB.textMutedBeige,
                maxWidth: 700,
              }}
            >
              The driver is what sits between your code and the car&apos;s
              hardware. Every part of the car runs as its own program, called a
              node, and the nodes pass data to each other over named channels
              called topics. All of it starts at boot.
            </p>
            <DashList
              items={[
                <>
                  Four nodes always run:{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>controller</code>,{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>gamepad_node</code>,{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>mux_node</code>, and{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>throttle_node</code>.
                </>,
                <>
                  Four more can be switched off one at a time:{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>lidar</code>,{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>camera</code>,{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>led_matrix</code>, and{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>inference</code>.
                </>,
              ]}
            />
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A, DATA FLOW ─────────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / DATA FLOW, HARDWARE TO SOFTWARE TO HARDWARE"
          caption="Sensors publish, your code subscribes and decides, and actuators subscribe and act. The whole stack is just that loop."
        >
          <AnimatedDataFlowDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section 03 · WHAT NEORACER SHIPS ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHAT THE DRIVER <Red>PUBLISHES</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 760,
              }}
            >
              The driver starts at boot, so every topic below is already live
              when you log in. This is what{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>ros2 topic list</code>{' '}
              prints on a running car. The one you publish to is{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/drive</code>.
              Everything else you read.
            </p>

            <div
              style={{
                marginTop: 24,
                background: NB.tarmacBlue,
                color: NB.haloWhite,
                borderRadius: 12,
                padding: '22px 24px',
                fontFamily: NB.monoFont,
                fontSize: 13.5,
                lineHeight: 1.75,
                boxShadow: NB.shadowCard,
                overflowX: 'auto',
              }}
            >
              <div style={{ color: NB.neoboticsRed, fontWeight: 700, marginBottom: 10 }}>
                // ros2 topic list
              </div>
              {TOPICS.map(([topic, note]) => (
                <div key={topic} style={{ whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'inline-block', minWidth: 168 }}>{topic}</span>
                  <span style={{ color: NB.textDimBlue }}># {note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Remote desktop', href: '/docs/software/remote-desktop' }}
        next={{ label: 'Workspaces', href: '/docs/software/workspaces' }}
      />
    </DocsShell>
  );
}
