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
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'ROS 2 topics · API Reference · NeoRacer Docs',
  description:
    'Every topic the racecar_neo stack publishes and subscribes: /scan, /imu, /odom, /battery, /camera, /drive. Which ones you read, which one you publish, and the drive pipeline that connects them.',
};

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
    role: 'Read it',
    notes: 'One planar sweep from the Lakibeam LiDAR, ~1440 samples, frame_id laser. The depth source for wall follow, gap follow, and mapping. Publisher is RELIABLE.',
  },
  {
    topic: '/imu',
    type: 'sensor_msgs/Imu',
    role: 'Read it',
    notes: 'Orientation, linear acceleration (m/s²), and angular velocity (rad/s) at ~200 Hz, frame_id imu_link. Published by the controller node from the MCU state frame.',
  },
  {
    topic: '/odom',
    type: 'nav_msgs/Odometry',
    role: 'Read it',
    notes: 'Wheel odometry at ~200 Hz, integrated on the MCU from the motor encoder. Useful for short-horizon dead reckoning between LiDAR scans.',
  },
  {
    topic: '/battery',
    type: 'sensor_msgs/BatteryState',
    role: 'Read it',
    notes: 'Pack voltage and a 3S charge fraction at ~0.5 Hz. The dashboard shows the same reading as a battery card.',
  },
  {
    topic: '/camera',
    type: 'sensor_msgs/Image',
    role: 'Read it',
    notes: 'A JPEG-compressed colour frame at 60 fps from the camera node (USB webcam in MJPG). The bytes are raw JPEG with encoding="jpeg", decode with cv2.imdecode before display. Publisher is best-effort: subscribe with sensor-data QoS or you receive nothing.',
  },
  {
    topic: '/drive',
    type: 'ackermann_msgs/AckermannDriveStamped',
    role: 'Publish it',
    notes: 'The autonomy channel. This is the one topic your own node writes to. The mux only forwards it while autonomy mode is armed.',
  },
  {
    topic: '/joy',
    type: 'sensor_msgs/Joy',
    role: 'Teleop',
    notes: 'Flysky RC stick and switch state, published by the controller node from the receiver on the ESP32. The gamepad and mux nodes read it; you rarely need to.',
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
    notes: 'Whichever command won arbitration, teleop or autonomy. You read this to see what the car was actually told.',
  },
  {
    topic: '/motor',
    type: 'ackermann_msgs/AckermannDriveStamped',
    role: 'Internal',
    notes: 'The throttle-scaled command the controller node turns into the ESP32 serial command. The last hop before hardware.',
  },
  {
    topic: '/led_matrix/command',
    type: 'std_msgs/String',
    role: 'Publish it',
    notes: 'Write text or simple commands to the 8x8 dot-matrix display on the back of the car. Handled by the led_matrix node over USB-UART.',
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
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'ROS 2' },
          { label: 'Topics' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="//" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              ROS 2 <Red>TOPICS.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The whole stack is sensors publishing and actuators subscribing.
              You read five sensor topics, you publish one drive topic, and the
              nodes in between do the arbitration and scaling. Below is the exact
              list the default launch brings up, with the message type on each.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Publish /drive</ChromeBadge>
              <ChromeBadge variant="outline">Read /scan · /imu · /camera</ChromeBadge>
              <ChromeBadge variant="outline">ackermann_msgs</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="What this reference is built from">
          The topics below are published by the{' '}
          <a href="https://github.com/Neobotics-Foundation-Inc/neoracer_ros2_driver" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            neoracer_ros2_driver
          </a>
          , the ROS 2 backend that ships on every NeoRacer. It is a fork of the
          MIT RACECAR Neo driver, retargeted for the Jetson Orin Nano, the
          OSCORE ESP32 board, the Lakibeam LiDAR over UDP, and a USB MJPG
          camera, with the same topic contract so the racecar-neo-library API
          continues to work without changes.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Two stacks share the car">
          The NeoRacer runs two ROS 2 stacks side by side, each for a different
          job. The table below is{' '}
          <code style={{ fontFamily: NB.monoFont }}>racecar_neo</code>, the custom
          MIT teaching driver the{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc.*</code> API sits on. The
          second is{' '}
          <a href="https://github.com/osrbot/osracer" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            osracer
          </a>
          , the general, standard ROS 2 autonomy stack (osracer_bringup,
          osracer_slam, osracer_navigation) for SLAM and Nav2. They run together
          or on their own. When osracer is up it adds the usual autonomy topics,{' '}
          <code style={{ fontFamily: NB.monoFont }}>/odom</code>,{' '}
          <code style={{ fontFamily: NB.monoFont }}>/map</code>,{' '}
          <code style={{ fontFamily: NB.monoFont }}>/tf</code>, and the Nav2 graph,
          so a <code style={{ fontFamily: NB.monoFont }}>ros2 topic list</code> on a
          fully loaded car shows more than the eleven here. Those follow the standard
          Nav2 names; your own <code style={{ fontFamily: NB.monoFont }}>ros2 topic list</code>{' '}
          is the final word.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <Eyebrow>THE FULL LIST</Eyebrow>
          <DisplayHeading size="lg">
            THE TOPIC <Red>LIST.</Red>
          </DisplayHeading>
          <DataTable columns={COLUMNS} rows={ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>THE DRIVE PIPELINE</Eyebrow>
          <DisplayHeading size="lg">
            THE DRIVE <Red>PIPELINE.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            Your message does not go straight to the motor. It passes through an
            arbiter that decides whether{' '}
            <InfoNote term="teleop" title="Teleop">Teleoperation. Driving the car by hand with the gamepad, as opposed to autonomy where your code drives.</InfoNote>{' '}
            or autonomy is in control, then a
            throttle stage that scales speed down to a safe range before the{' '}
            <InfoNote term="PWM" title="PWM">Pulse-width modulation. A square signal whose on-time encodes a value. The motor controller and steering servo read it to set throttle and angle.</InfoNote>{' '}
            node ever touches the hardware. That is why a raw{' '}
            <code style={{ fontFamily: NB.monoFont }}>set_speed_angle(1.0, 0)</code>{' '}
            does not launch the car at full speed.
          </p>
          <PipelineBlock />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 24 }}>
          <MonoLabel>Reading and writing from your own node</MonoLabel>
          <Code lang="python">{`import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from ackermann_msgs.msg import AckermannDriveStamped


class GapFollower(Node):
    def __init__(self):
        super().__init__("gap_follower")
        # Read the LiDAR.
        self.create_subscription(LaserScan, "/scan", self.on_scan, 10)
        # Publish to the autonomy channel. The mux forwards it when RB is held.
        self.drive = self.create_publisher(AckermannDriveStamped, "/drive", 10)

    def on_scan(self, scan):
        msg = AckermannDriveStamped()
        msg.drive.speed = 0.25
        msg.drive.steering_angle = 0.0
        self.drive.publish(msg)


def main():
    rclpy.init()
    rclpy.spin(GapFollower())


if __name__ == "__main__":
    main()`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Most students never touch ROS 2 directly">
          The{' '}
          <a href="/docs/software/racecar-neo-library" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            racecar-neo-library
          </a>{' '}
          wraps every one of these topics behind{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc.lidar</code>,{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc.camera</code>, and{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc.drive</code>. Reach for raw
          ROS 2 when you want to add your own node alongside the stack, or wire in
          a tool from the wider ROS ecosystem.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'rc.physics', href: '/docs/api-reference/python/physics' }}
        next={{ label: 'ROS 2 services', href: '/docs/api-reference/ros2/services' }}
      />
    </DocsShell>
  );
}
