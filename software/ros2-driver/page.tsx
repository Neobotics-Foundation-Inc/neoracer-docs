import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedDataFlowDiagram, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

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
          { label: 'Software', href: '/docs/software/os-and-image' },
          { label: 'ROS 2 driver' },
        ]}
      />

      {/* ── Section 01 · QUICK ROS 2 PRIMER ────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingTop: 24, paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
              <div>
                <DisplayHeading size="xl">
                  THE ROS&nbsp;2 <Red>DRIVER</Red>
                </DisplayHeading>
              </div>
              <div style={{ paddingTop: 40 }}>
                <DashList
                  items={[
                    <>
                      Each part of the car (camera, motors,{' '}
                      <InfoNote term="LiDAR" title="LiDAR">
                        A sensor that sweeps a laser around the car and measures
                        how long each pulse takes to bounce back, giving a ring
                        of distance readings it uses to map walls and obstacles.
                      </InfoNote>
                      ) runs as a separate program. ROS 2 calls these{' '}
                      <strong>nodes</strong>.
                    </>,
                    <>Nodes don't call each other directly.</>,
                    <>
                      They publish messages on named channels (
                      <strong>topics</strong>). Any other node listening picks
                      them up.
                    </>,
                    <>
                      The driver runs these nodes for you:{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>controller</code>,{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>gamepad_node</code>,{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>mux_node</code>,{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>throttle_node</code>, plus the four
                      you can switch off individually:{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>lidar</code>,{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>camera</code>,{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>led_matrix</code>,{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>inference</code>.
                    </>,
                  ]}
                />
              </div>
            </div>
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

      {/* ── Section 02 · ROS 2 BASICS ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingTop: 32, paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
              <div>
                <DisplayHeading size="lg">
                  QUICK ROS&nbsp;2 <Red>BASICS</Red>
                </DisplayHeading>
              </div>
              <div style={{ paddingTop: 20 }}>
                <p
                  style={{
                    fontFamily: NB.bodyFont,
                    fontSize: 18,
                    lineHeight: 1.55,
                    color: NB.textMutedBeige,
                    margin: 0,
                  }}
                >
                  These four are the foundation. The rest of ROS 2 just builds on
                  them.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 28,
                marginTop: 32,
              }}
            >
              <NumberedFeatureCard
                n={1}
                title="Publisher"
                lede="A node that puts data out."
                body={
                  <>
                    Like{' '}
                    <code style={{ fontFamily: NB.monoFont, color: NB.textOnBeige, fontWeight: 700 }}>
                      camera
                    </code>{' '}
                    on the car, sending frames out on /camera/color. It doesn't
                    know who's reading.
                  </>
                }
                codeChip="node.create_publisher(Imu, '/imu/fused', qos)"
              />
              <NumberedFeatureCard
                n={2}
                title="Subscriber"
                lede="A node waiting for new data."
                body={
                  <>
                    Like your script reading <code style={{ fontFamily: NB.monoFont }}>/imu/fused</code> to
                    check which way the car is tilted right now.
                  </>
                }
                codeChip="node.create_subscription(Imu, '/imu/fused', cb, qos)"
              />
              <NumberedFeatureCard
                n={3}
                title="Topic"
                lede="A named channel. Just a string."
                body="Things like /drive, /scan, /camera/color. Multiple nodes can publish or read from the same one."
                codeChip="/camera/color   /drive   /imu/fused   /odom   /scan"
              />
              <NumberedFeatureCard
                n={4}
                title="Message"
                lede="The actual data, with a fixed shape."
                body="An /imu/fused message always has the same fields (orientation, accel, gyro)."
                codeChip="sensor_msgs/Imu   nav_msgs/Odometry"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 03 · WHAT NEORACER SHIPS ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
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

      <ScrollReveal>
        <Callout type="tip" title="Coming from F1TENTH?">
          Every topic name and message type matches the{' '}
          <InfoNote term="F1TENTH" title="F1TENTH">
            An open autonomous racing platform built around a 1/10th-scale car.
            Its topic and message conventions are widely used, so code written
            for it transfers between compatible cars.
          </InfoNote>{' '}
          reference build.
          Drop your existing nodes onto a NeoRacer and they run unchanged.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'racecar-neo-library', href: '/docs/software/racecar-neo-library' }}
        next={{ label: 'Workspaces', href: '/docs/software/workspaces' }}
      />
    </DocsShell>
  );
}
