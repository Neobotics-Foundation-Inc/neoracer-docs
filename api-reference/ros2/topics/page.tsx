import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'ROS 2 topics · API Reference · NeoRacer Docs',
  description:
    'Every topic the racecar_neo stack publishes and subscribes: /scan, /imu, /odom, /battery, /camera, /drive. Which ones you read, which one you publish, and the drive pipeline that connects them.',
};

/* `ros2 topic list` on a running car, verified 2026-08-17. Alphabetical, as
 * the command prints it. Keep this in step with ROWS when either changes. */
const LIVE_TOPICS: [string, string][] = [
  ['/battery', 'pack state'],
  ['/battery/voltage', 'pack voltage on its own'],
  ['/camera/color', 'JPEG in an Image, 60 fps'],
  ['/diagnostics', 'ROS 2 internals'],
  ['/dotmatrix/text', 'text to the 8x8 display'],
  ['/drive', 'PUBLISH here'],
  ['/edgetpu/inference', 'inference output, when a model is running'],
  ['/encoder/speed', 'wheel speed from the encoders'],
  ['/gamepad_drive', 'what gamepad_node builds from the sticks'],
  ['/imu/fused', 'accel + gyro fused, 200 Hz'],
  ['/joy', 'the Flysky receiver'],
  ['/mag', 'raw magnetometer, not part of the fused output'],
  ['/motor', 'the final command to the ESC and the servo'],
  ['/mux_out', 'whichever source the mux is forwarding'],
  ['/odom', 'integrated from the encoders'],
  ['/parameter_events', 'ROS 2 internals'],
  ['/rc/channels', 'raw RC channel values'],
  ['/rosout', 'ROS 2 internals'],
  ['/scan', 'the LiDAR over UDP'],
];

const COLUMNS = [
  { key: 'topic', label: 'Topic', mono: true, accent: true, width: '180px' },
  { key: 'type', label: 'Message type', mono: true, width: '240px' },
  { key: 'role', label: 'Your role', width: '110px' },
  { key: 'notes', label: 'What it carries' },
];

const ROWS = [
  {
    topic: '/scan',
    type: 'sensor_msgs/LaserScan',
    role: 'Subscribe',
    notes: 'One planar sweep from the Lakibeam LiDAR, ~1440 samples, frame_id laser. Publisher is RELIABLE.',
  },
  {
    topic: '/imu/fused',
    type: 'sensor_msgs/Imu',
    role: 'Subscribe',
    notes: 'Orientation, linear acceleration (m/s²), and angular velocity (rad/s) at ~200 Hz, frame_id imu_link. Published by the controller node from the MCU state frame.',
  },
  {
    topic: '/mag',
    type: 'sensor_msgs/MagneticField',
    role: 'Subscribe',
    notes: 'Magnetic field in teslas from the QMC6309 magnetometer, frame_id imu_link. Not part of the fused orientation on /imu/fused.',
  },
  {
    topic: '/odom',
    type: 'nav_msgs/Odometry',
    role: 'Subscribe',
    notes: 'Wheel odometry at ~200 Hz, integrated on the MCU from the motor encoder.',
  },
  {
    topic: '/battery',
    type: 'sensor_msgs/BatteryState',
    role: 'Subscribe',
    notes: 'Pack voltage and a 3S charge fraction at ~0.5 Hz. The dashboard shows the same reading as a battery card.',
  },
  {
    topic: '/camera/color',
    type: 'sensor_msgs/Image',
    role: 'Subscribe',
    notes: 'A JPEG-compressed colour frame at 60 fps from the camera node (USB webcam in MJPG). The bytes are raw JPEG with encoding="jpeg", decode with cv2.imdecode before display. Publisher is best-effort: subscribe with sensor-data QoS or you receive nothing.',
  },
  {
    topic: '/drive',
    type: 'ackermann_msgs/AckermannDriveStamped',
    role: 'Publish',
    notes: 'The topic your own node publishes to. The mux only forwards it while autonomy mode is armed.',
  },
  {
    topic: '/joy',
    type: 'sensor_msgs/Joy',
    role: 'Teleop',
    notes: 'Flysky RC stick and switch state, published by the controller node from the receiver on the ESP32. The gamepad and mux nodes read it.',
  },
  {
    topic: '/gamepad_drive',
    type: 'ackermann_msgs/AckermannDriveStamped',
    role: 'Teleop',
    notes: 'The drive command gamepad_node builds from the sticks. Gated by the mux the same way /drive is.',
  },
  {
    topic: '/mux_out',
    type: 'ackermann_msgs/AckermannDriveStamped',
    role: 'Internal',
    notes: 'Whichever command won arbitration, teleop or autonomy.',
  },
  {
    topic: '/motor',
    type: 'ackermann_msgs/AckermannDriveStamped',
    role: 'Internal',
    notes: 'The throttle-scaled command the controller node turns into the ESP32 serial command.',
  },
  {
    topic: '/dotmatrix/text',
    type: 'std_msgs/String',
    role: 'Publish',
    notes: 'Text to the dot-matrix display on the back of the car. Handled by the led_matrix node over USB-UART.',
  },
  {
    topic: '/battery/voltage',
    type: 'std_msgs/Float32',
    role: 'Subscribe',
    notes: 'Pack voltage on its own, without the rest of the BatteryState message.',
  },
  {
    topic: '/encoder/speed',
    type: 'std_msgs/Float32',
    role: 'Subscribe',
    notes: 'Wheel speed straight from the encoders, before it is integrated into /odom.',
  },
  {
    topic: '/rc/channels',
    type: 'std_msgs/Float32MultiArray',
    role: 'Internal',
    notes: 'Raw channel values from the Flysky receiver, before the controller node turns them into /joy.',
  },
  {
    topic: '/edgetpu/inference',
    type: 'vision_msgs/Detection2DArray',
    role: 'Subscribe',
    notes: 'Object detections from the inference node. Only publishes while a model is loaded and running.',
  },
];

/* The drive pipeline, the chain that turns one /drive message into motion. */
function PipelineBlock() {
  const Hop = ({ text, kind }: { text: string; kind: 'topic' | 'node' }) => (
    <span
      style={{
        fontFamily: NB.monoFont,
        fontSize: 13,
        fontWeight: 700,
        color: kind === 'topic' ? NB.neoboticsRed : NB.haloWhite,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
  const Arrow = () => <span style={{ color: NB.textDimBlue, padding: '0 2px' }}>→</span>;
  return (
    <div
      style={{
        marginTop: 24,
        background: NB.tarmacBlue,
        borderRadius: 12,
        padding: '22px 24px',
        boxShadow: NB.shadowCard,
        lineHeight: 2.1,
      }}
    >
      <div style={{ color: NB.neoboticsRed, fontFamily: NB.monoFont, fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', marginBottom: 12 }}>
        // the drive pipeline
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
        <Hop text="/drive" kind="topic" />
        <span style={{ color: NB.textDimBlue, fontFamily: NB.monoFont, fontSize: 12 }}>(yours)</span>
        <Arrow />
        <Hop text="mux_node" kind="node" />
        <Arrow />
        <Hop text="/mux_out" kind="topic" />
        <Arrow />
        <Hop text="throttle_node" kind="node" />
        <Arrow />
        <Hop text="/motor" kind="topic" />
        <Arrow />
        <Hop text="controller" kind="node" />
        <Arrow />
        <span style={{ fontFamily: NB.monoFont, fontSize: 13, color: NB.textDimBlue }}>ESP32 → ESC + steering servo</span>
      </div>
      <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
        <Hop text="/gamepad_drive" kind="topic" />
        <span style={{ color: NB.textDimBlue, fontFamily: NB.monoFont, fontSize: 12 }}>(teleop)</span>
        <Arrow />
        <Hop text="mux_node" kind="node" />
        <span style={{ color: NB.textDimBlue, fontFamily: NB.monoFont, fontSize: 12 }}>
          {' '}joins the same arbiter. SWB picks the winner: up is teleop, down is /drive.
        </span>
      </div>
    </div>
  );
}

export default function Ros2TopicsPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'ROS 2' },
          { label: 'Topics' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="13" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              ROS 2 <Red>TOPICS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              This page lists every topic the driver publishes and subscribes,
              with the message type on each.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="Where these topics come from">
          The topics on this page are published by the{' '}
          <a href="https://github.com/Neobotics-Foundation-Inc/neoracer_ros2_driver" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            neoracer_ros2_driver
          </a>. Verified against a running car.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <DisplayHeading size="lg">
            TOPIC <Red>LIST</Red>
          </DisplayHeading>
          <DataTable columns={COLUMNS} rows={ROWS} />

          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740, marginTop: 26 }}>
            The driver starts at boot, so all of this is already live when you
            log in. Run{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>ros2 topic list</code>{' '}
            on the car and you get the table above plus a few ROS 2 internals:
          </p>

          <div
            style={{
              marginTop: 16,
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
            {LIVE_TOPICS.map(([topic, note]) => (
              <div key={topic} style={{ whiteSpace: 'nowrap' }}>
                <span style={{ display: 'inline-block', minWidth: 168 }}>{topic}</span>
                <span style={{ color: NB.textDimBlue }}># {note}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <DisplayHeading size="lg">
            DRIVE <Red>PIPELINE</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            A drive message does not go straight to the motor. The mux node
            decides whether teleop or autonomy is in control, and the throttle
            node scales the speed to a safe range before the controller node
            touches the hardware.
          </p>
          <PipelineBlock />
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'CLI · Maintenance', href: '/docs/api-reference/cli/setup' }}
        next={{ label: 'ROS 2 params', href: '/docs/api-reference/ros2/params' }}
      />
    </DocsShell>
  );
}
