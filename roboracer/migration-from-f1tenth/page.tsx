import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
  Fig,
  NumberedFeatureCard,
  ChromeBadge,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Migration from F1TENTH · Roboracer · NeoRacer Docs',
  description:
    'F1TENTH nodes run unchanged on the NeoRacer because both share the same ROS 2 contract: LaserScan on /scan, AckermannDriveStamped on /drive, Odometry on /odom.',
};

export default function MigrationFromF1tenthPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Roboracer', href: '/docs/roboracer/migration-from-f1tenth' },
          { label: 'Migration from F1TENTH' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingTop: 24, paddingBottom: 32 }}>
          <GhostNumeral n="F1" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>ROBORACER / F1TENTH MIGRATION</Eyebrow>
            <DisplayHeading size="xl">
              MIGRATING FROM <Red>F1TENTH.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 18,
                lineHeight: 1.6,
                color: NB.textMutedBeige,
                maxWidth: 680,
                marginTop: 18,
              }}
            >
              F1TENTH is the well-known 1:10 autonomous-racing platform and
              curriculum, and the NeoRacer is built to the same{' '}
              <InfoNote
                term="ROS 2"
                title="ROS 2"
              >
                The Robot Operating System, version 2. A framework where
                programs run as separate nodes that talk to each other by
                passing messages on named channels called topics.
              </InfoNote>{' '}
              contract.
              A wall-follow or gap-follow node written for an F1TENTH build drops
              onto a NeoRacer and runs unchanged, because the interface is
              identical. The hardware underneath changed, the topics and message
              types did not.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
              <ChromeBadge variant="solid">/scan · LaserScan</ChromeBadge>
              <ChromeBadge variant="solid">/drive · AckermannDriveStamped</ChromeBadge>
              <ChromeBadge variant="solid">/odom · Odometry</ChromeBadge>
              <ChromeBadge variant="red">Same ROS 2 contract</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section 01 · THE SHARED CONTRACT ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingTop: 32, paddingBottom: 48 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
              <div>
                <Eyebrow>01 / THE SHARED CONTRACT</Eyebrow>
                <DisplayHeading size="lg">
                  THE SHARED <Red>CONTRACT.</Red>
                </DisplayHeading>
              </div>
              <div style={{ paddingTop: 24 }}>
                <DashList
                  items={[
                    <>
                      The{' '}
                      <InfoNote term="LiDAR" title="LiDAR">
                        A sensor that measures distance by timing reflected
                        laser pulses. It sweeps around and reports the range to
                        whatever it hits at each angle, which a racing node uses
                        to see the track walls.
                      </InfoNote>{' '}
                      publishes{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.textOnBeige, fontWeight: 700 }}>
                        sensor_msgs/LaserScan
                      </code>{' '}
                      on{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/scan</code>.
                    </>,
                    <>
                      You command driving by publishing{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.textOnBeige, fontWeight: 700 }}>
                        ackermann_msgs/AckermannDriveStamped
                      </code>{' '}
                      on{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/drive</code>.
                    </>,
                    <>
                      <InfoNote term="Odometry" title="Odometry">
                        An estimate of where the car is and how it is moving,
                        worked out from sensors like the wheel rotation and
                        steering. It accumulates error over time, so it is a
                        running guess rather than a fixed truth.
                      </InfoNote>{' '}
                      arrives as{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.textOnBeige, fontWeight: 700 }}>
                        nav_msgs/Odometry
                      </code>{' '}
                      on{' '}
                      <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/odom</code>.
                    </>,
                    <>
                      Those three names and types match the F1TENTH reference, so
                      a node that subscribed to the scan and published a drive
                      command keeps doing exactly that.
                    </>,
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · WHAT STAYS THE SAME ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / WHAT STAYS THE SAME</Eyebrow>
            <DisplayHeading size="lg">
              WHAT STAYS THE <Red>SAME.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 760,
                marginTop: 8,
              }}
            >
              A migration here is mostly a matter of copying your package over and
              launching it, since the contract your node was written against is
              the contract the NeoRacer presents. The three pieces below are the
              ones that make a racing node portable.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 28,
                marginTop: 32,
              }}
            >
              <NumberedFeatureCard
                n={1}
                title="The scan input"
                lede="Your perception still reads /scan."
                body="A gap-follow or wall-follow node subscribes to the same topic and the same message type, so its ranges-and-angles math is untouched."
                codeChip="sensor_msgs/LaserScan  →  /scan"
              />
              <NumberedFeatureCard
                n={2}
                title="The drive output"
                lede="Your controller still writes /drive."
                body="Steering angle and speed go out on the same AckermannDriveStamped message, so the actuator side of your node does not change."
                codeChip="/drive  ←  ackermann_msgs/AckermannDriveStamped"
              />
              <NumberedFeatureCard
                n={3}
                title="The odometry feed"
                lede="Your state estimate still reads /odom."
                body="Pose and twist arrive as nav_msgs/Odometry, the same fields you already parse, so localization and logging carry over."
                codeChip="nav_msgs/Odometry  →  /odom"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FIG. A · INTERFACE VS HARDWARE ─────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / WHAT CHANGES, WHAT DOES NOT"
          caption="The interface is the constant. Your node talks to the same topics and message types on either platform. Only the hardware sitting behind those topics is different."
        >
          <DataTable
            columns={[
              { key: 'layer', label: 'Layer', accent: true, width: '24%' },
              { key: 'f1tenth', label: 'F1TENTH build (commonly)', mono: true },
              { key: 'neoracer', label: 'NeoRacer', mono: true },
            ]}
            rows={[
              {
                layer: 'Compute',
                f1tenth: 'Jetson NX / Xavier',
                neoracer: 'Jetson Orin Nano',
              },
              {
                layer: 'LiDAR',
                f1tenth: 'Hokuyo / RPLIDAR',
                neoracer: 'Richbeam LakiBeam1',
              },
              {
                layer: 'Scan topic',
                f1tenth: '/scan · LaserScan',
                neoracer: '/scan · LaserScan',
              },
              {
                layer: 'Drive topic',
                f1tenth: '/drive · AckermannDriveStamped',
                neoracer: '/drive · AckermannDriveStamped',
              },
              {
                layer: 'Odom topic',
                f1tenth: '/odom · Odometry',
                neoracer: '/odom · Odometry',
              },
            ]}
          />
        </Fig>
      </ScrollReveal>

      {/* ── Section 03 · HARDWARE UNDER THE INTERFACE ──────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingTop: 32, paddingBottom: 48 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / HARDWARE UNDER THE INTERFACE</Eyebrow>
            <DisplayHeading size="lg">
              THE <Red>HARDWARE.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 760,
                marginTop: 8,
              }}
            >
              The NeoRacer runs a Jetson Orin Nano paired with a Richbeam
              LakiBeam1, where an F1TENTH build commonly uses a Jetson NX or
              Xavier with a Hokuyo or RPLIDAR. The compute module and the LiDAR
              are different parts, yet the scan still arrives on{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/scan</code>{' '}
              as the same message type. The driver and the MCU (microcontroller
              unit) firmware on the NeoRacer are the ones that absorb the
              difference, so your node never sees it.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · BRING YOUR NODE OVER ──────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / BRING YOUR NODE OVER</Eyebrow>
            <DisplayHeading size="lg">
              BRINGING YOUR NODE <Red>OVER.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 760,
                marginTop: 8,
              }}
            >
              Because the node already targets the shared contract, moving it is
              the ordinary workspace flow: drop the package in, build it, and run
              it against the live topics. The snippet below sketches the shape of
              a node that subscribes to the scan and publishes a drive command,
              which is the same shape on both platforms.
            </p>

            <Code lang="python">{`import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from ackermann_msgs.msg import AckermannDriveStamped


class RaceNode(Node):
    def __init__(self):
        super().__init__('race_node')
        # Same scan topic and message type as the F1TENTH build.
        self.create_subscription(LaserScan, '/scan', self.on_scan, 10)
        # Same drive topic and message type as the F1TENTH build.
        self.drive_pub = self.create_publisher(
            AckermannDriveStamped, '/drive', 10
        )

    def on_scan(self, scan: LaserScan):
        cmd = AckermannDriveStamped()
        cmd.drive.speed = 1.0
        cmd.drive.steering_angle = self.pick_steering(scan)
        self.drive_pub.publish(cmd)`}</Code>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Coming from an F1TENTH build?">
          The topic names and message types you already use carry straight over.
          For the field-by-field confirmation of every topic, type, and frame,
          see the{' '}
          <a
            href="/docs/roboracer/api-parity-matrix"
            style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}
          >
            API parity matrix
          </a>
          , and for the full topic catalog, see the{' '}
          <a
            href="/docs/api-reference/ros2/topics"
            style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}
          >
            ROS 2 topics reference
          </a>
          .
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Need a hand?">
          If a node behaves differently after the move, the cause is almost
          always a hardware-shaped detail behind the interface rather than the
          interface itself. Reach out at{' '}
          <a
            href="mailto:support@neobotics.org"
            style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}
          >
            support@neobotics.org
          </a>{' '}
          and we will walk it through with you.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'IMU bias', href: '/docs/calibration/imu-bias' }}
        next={{ label: 'API parity matrix', href: '/docs/roboracer/api-parity-matrix' }}
      />
    </DocsShell>
  );
}
