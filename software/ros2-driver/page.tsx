import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  DashList,
  Fig,
  NumberedFeatureCard,
  ChromeBadge,
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

export default function ROS2DriverPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
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
                <Eyebrow>01 / QUICK ROS 2 PRIMER</Eyebrow>
                <DisplayHeading size="2xl">
                  THE ROS 2 <Red>DRIVER.</Red>
                </DisplayHeading>
              </div>
              <div style={{ paddingTop: 60 }}>
                <DashList
                  items={[
                    <>
                      Each part of the car (camera, motors,{' '}
                      <InfoNote term="LiDAR" title="LiDAR">
                        A sensor that spins a laser to measure distance in every
                        direction, giving the car a 2D map of how far away walls
                        and obstacles are.
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
                      NeoRacer's <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>teleop</code> brings up the full stack: controller, gamepad_node, mux_node, throttle_node, camera, led_matrix, and the Lakibeam LiDAR.
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
                <Eyebrow>02 / ROS 2 BASICS</Eyebrow>
                <DisplayHeading size="2xl">
                  QUICK ROS 2 <Red>BASICS.</Red>
                </DisplayHeading>
              </div>
              <div style={{ paddingTop: 60 }}>
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
                      camera_node
                    </code>{' '}
                    on the car, sending frames out on /camera. It doesn't know
                    who's reading.
                  </>
                }
                codeChip="node.create_publisher(Imu, '/imu', qos)"
              />
              <NumberedFeatureCard
                n={2}
                title="Subscriber"
                lede="A node waiting for new data."
                body={
                  <>
                    Like your script reading <code style={{ fontFamily: NB.monoFont }}>/imu</code> to check
                    which way the car is tilted right now.
                  </>
                }
                codeChip="node.create_subscription(Imu, '/imu', cb, qos)"
              />
              <NumberedFeatureCard
                n={3}
                title="Topic"
                lede="A named channel. Just a string."
                body="Things like /drive, /scan, /camera. Multiple nodes can publish or read from the same one."
                codeChip="/camera   /drive   /imu   /odom   /scan"
              />
              <NumberedFeatureCard
                n={4}
                title="Message"
                lede="The actual data, with a fixed shape."
                body="An /imu message always has the same fields (orientation, accel, gyro)."
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
            <Eyebrow>03 / WHAT TELEOP BRINGS UP</Eyebrow>
            <DisplayHeading size="lg">
              WHAT <Red>TELEOP</Red> BRINGS UP.
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
              Once you've{' '}
              <a href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}>installed the driver</a>
              , run{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>ros2 launch neoracer_ros2_driver teleop.launch.py</code>
              . That brings up the four nodes from FIG. A, so the only one left to write is the fifth.
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
              }}
            >
              <div style={{ color: NB.neoboticsRed, fontWeight: 700, marginBottom: 10 }}>
                // ros2 topic list
              </div>
              /camera<span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# sensor_msgs/Image, JPEG-in-Image from the USB webcam</span>
              <br />
              /scan<span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# sensor_msgs/LaserScan, Lakibeam LiDAR over UDP</span>
              <br />
              /imu<span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# sensor_msgs/Imu, ICM-45686 on the OSCORE board</span>
              <br />
              /odom<span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# nav_msgs/Odometry, integrated from wheel encoders</span>
              <br />
              /joy<span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# sensor_msgs/Joy, Flysky RC via the controller node</span>
              <br />
              /drive<span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# ackermann_msgs/AckermannDriveStamped, PUBLISH here</span>
              <br />
              /led_matrix/command<span style={{ color: NB.textDimBlue }}>&nbsp;# std_msgs/String, text to the 8x8 dot-matrix display</span>
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
        next={{ label: 'Networking', href: '/docs/software/networking' }}
      />
    </DocsShell>
  );
}
