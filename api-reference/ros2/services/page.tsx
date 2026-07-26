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
  DashList,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'ROS 2 services · API Reference · NeoRacer Docs',
  description:
    'The racecar_neo stack is topic-driven. The only application services are the LiDAR driver motor controls. This page lists them and the standard parameter services every node exposes.',
};

const COLUMNS = [
  { key: 'service', label: 'Service', mono: true, accent: true, width: '160px' },
  { key: 'type', label: 'Service type', mono: true, width: '180px' },
  { key: 'node', label: 'Node', mono: true, width: '140px' },
  { key: 'notes', label: 'What it does' },
];

const ROWS = [
  {
    service: '/start_motor',
    type: 'std_srvs/srv/Empty',
    node: 'lidar driver',
    notes: 'Spins the LiDAR motor back up after a stop. Scans return to a full sweep within a second or two.',
  },
  {
    service: '/stop_motor',
    type: 'std_srvs/srv/Empty',
    node: 'lidar driver',
    notes: 'Halts the spinning mirror. /scan keeps publishing, but every sample reads zero until you start the motor again.',
  },
];

export default function Ros2ServicesPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'ROS 2' },
          { label: 'Services' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="//" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>API REFERENCE / ROS 2</Eyebrow>
            <DisplayHeading size="xl">
              ROS 2 <Red>SERVICES.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The stack moves almost everything over{' '}
              <InfoNote term="topics" title="Topics">Named channels in ROS 2 that carry a continuous stream of messages. One node publishes to a topic and any number of nodes subscribe to read it, with no reply expected.</InfoNote>, so there is very
              little here. The only request-and-reply calls in the base build are
              the two that spin the{' '}
              <InfoNote term="LiDAR" title="LiDAR">A spinning sensor that measures distance by timing laser pulses as they bounce off surfaces. It builds a 360-degree map of how far away walls and obstacles are.</InfoNote>{' '}
              motor up and down. Everything else you
              see under{' '}
              <code style={{ fontFamily: NB.monoFont }}>ros2 service list</code>{' '}
              is the standard parameter plumbing every node carries.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">/start_motor · /stop_motor</ChromeBadge>
              <ChromeBadge variant="outline">std_srvs/Empty</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="What this reference is built from">
          These come from the open-source{' '}
          <a href="https://github.com/MITRacecarNeo/racecar-neo-ros2-backend" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            racecar_neo ROS 2 backend
          </a>
          . The motor services belong to the LiDAR driver, so the exact node that
          advertises them differs between the reference RPLIDAR build and your
          car's Richbeam LakiBeam1. The service names and types are the standard
          ones, so a{' '}
          <code style={{ fontFamily: NB.monoFont }}>ros2 service list</code> on
          your own car is the final word.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <Eyebrow>APPLICATION SERVICES</Eyebrow>
          <DisplayHeading size="lg">
            THE MOTOR <Red>SERVICES.</Red>
          </DisplayHeading>
          <DataTable columns={COLUMNS} rows={ROWS} />
          <Code lang="bash">{`# Stop the LiDAR motor (sweeps go to zero, useful for a quiet bench)
ros2 service call /stop_motor std_srvs/srv/Empty

# Spin it back up before you drive
ros2 service call /start_motor std_srvs/srv/Empty`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>THE STANDARD SET</Eyebrow>
          <DisplayHeading size="lg">
            THE PARAMETER <Red>SERVICES.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            When you run{' '}
            <code style={{ fontFamily: NB.monoFont }}>ros2 service list</code> you
            will see a long tail of services under each node name. These are not
            ours; ROS 2 gives every node the same set so you can inspect and tune
            it at runtime. And when the{' '}
            <a href="https://github.com/osrbot/osracer" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              osracer
            </a>{' '}
            <InfoNote term="SLAM" title="SLAM">Simultaneous Localization and Mapping. The car builds a map of an unknown space while tracking where it is inside that map at the same time.</InfoNote>{' '}
            and Nav2 stack is running, it advertises its own services and
            actions on top, map saving, lifecycle transitions, goal handling, far
            more than the teaching driver here.
          </p>
          <DashList
            items={[
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>&lt;node&gt;/get_parameters</code>,{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>set_parameters</code>,{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>list_parameters</code>{' '}
                · read and change a node's parameters while it runs. See{' '}
                <a href="/docs/api-reference/ros2/params" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                  Parameters
                </a>
                .
              </>,
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>describe_parameters</code>,{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>get_parameter_types</code>{' '}
                · ask a node what it accepts before you set anything.
              </>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Need a real request and reply? Add your own">
          A service is the right tool when you want one node to ask another to do
          something and wait for an answer, like a{' '}
          <code style={{ fontFamily: NB.monoFont }}>/reset_lap</code> or a{' '}
          <code style={{ fontFamily: NB.monoFont }}>/set_mode</code>. The base
          stack does not ship those, so you define the interface and advertise it
          from your own node, then any other node can call it.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <MonoLabel>A minimal service of your own</MonoLabel>
          <Code lang="python">{`import rclpy
from rclpy.node import Node
from std_srvs.srv import Empty


class LapResetter(Node):
    def __init__(self):
        super().__init__("lap_resetter")
        self.create_service(Empty, "/reset_lap", self.on_reset)

    def on_reset(self, request, response):
        self.get_logger().info("lap counter cleared")
        return response


def main():
    rclpy.init()
    rclpy.spin(LapResetter())`}</Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 topics', href: '/docs/api-reference/ros2/topics' }}
        next={{ label: 'ROS 2 parameters', href: '/docs/api-reference/ros2/params' }}
      />
    </DocsShell>
  );
}
