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
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'API parity matrix · Roboracer · NeoRacer Docs',
  description:
    'How the NeoRacer maps to the F1TENTH ROS 2 interface. /scan, /drive, and /odom match the standard racing contract exactly, so nodes written for F1TENTH run on the NeoRacer unchanged.',
};

const COLUMNS = [
  { key: 'topic', label: 'Topic', mono: true, accent: true, width: '170px' },
  { key: 'type', label: 'Message', mono: true, width: '260px' },
  { key: 'f1tenth', label: 'F1TENTH', width: '100px' },
  { key: 'neoracer', label: 'NeoRacer', mono: true, width: '170px' },
  { key: 'notes', label: 'Notes' },
];

const ROWS = [
  {
    topic: '/scan',
    type: 'sensor_msgs/LaserScan',
    f1tenth: 'yes',
    neoracer: 'yes',
    notes: 'LakiBeam1, frame lidar_link.',
  },
  {
    topic: '/drive',
    type: 'ackermann_msgs/AckermannDriveStamped',
    f1tenth: 'yes',
    neoracer: 'yes',
    notes: 'Identical command interface.',
  },
  {
    topic: '/odom',
    type: 'nav_msgs/Odometry',
    f1tenth: 'yes',
    neoracer: 'yes',
    notes: 'Wheel-encoder odometry.',
  },
  {
    topic: '/imu',
    type: 'sensor_msgs/Imu',
    f1tenth: 'yes',
    neoracer: 'yes',
    notes: 'LSM9DS1, frame imu_link.',
  },
  {
    topic: 'camera image',
    type: 'sensor_msgs/Image',
    f1tenth: 'varies',
    neoracer: '/camera (JPEG) + /camera/decoded',
    notes: 'Optional on both stacks.',
  },
  {
    topic: 'TF',
    type: 'tf2',
    f1tenth: 'yes',
    neoracer: 'yes',
    notes: 'Published via the osracer stack.',
  },
];

export default function ApiParityMatrixPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Roboracer', href: '/docs/roboracer/migration-from-f1tenth' },
          { label: 'API parity matrix' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="//" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>ROBORACER / API PARITY</Eyebrow>
            <DisplayHeading size="xl">
              THE API PARITY <Red>MATRIX.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer speaks the standard F1TENTH ROS 2 interface. The same{' '}
              <InfoNote term="topic" title="Topic">In ROS 2, a topic is a named channel that carries one kind of message. Code that produces data publishes to a topic, and code that needs that data subscribes to it.</InfoNote>{' '}
              names, the same message types, the same drive command. The
              matrix below lines them up side by side so you can see where the
              contract holds, and the short answer is that the racing core,
              /scan, /drive, and /odom, holds exactly.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">F1TENTH compatible</ChromeBadge>
              <ChromeBadge variant="outline">/scan · /drive · /odom</ChromeBadge>
              <ChromeBadge variant="outline">ackermann_msgs</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            The point of parity is that code you already wrote for F1TENTH should
            run on the NeoRacer without a rewrite. A wall follower that subscribes
            to <code style={{ fontFamily: NB.monoFont }}>/scan</code> and publishes
            to <code style={{ fontFamily: NB.monoFont }}>/drive</code> sees the same
            names and the same message types here. Where the two stacks diverge,
            it is the hardware under the interface that differs, not the interface
            itself, so your node never has to know which car it is driving.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>THE MATRIX</Eyebrow>
          <DisplayHeading size="lg">
            THE COMPARISON <Red>TABLE.</Red>
          </DisplayHeading>
          <DataTable columns={COLUMNS} rows={ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Divergence is hardware, not interface">
          Where F1TENTH and the NeoRacer differ, the difference sits below the
          topic, not at it. The NeoRacer publishes{' '}
          <code style={{ fontFamily: NB.monoFont }}>/scan</code> from a Richbeam
          LakiBeam1 rather than the F1TENTH reference LiDAR, and its{' '}
          <code style={{ fontFamily: NB.monoFont }}>/imu</code> comes from an
          LSM9DS1, but the message type and frame contract on each topic are
          unchanged. Your node subscribes to{' '}
          <code style={{ fontFamily: NB.monoFont }}>sensor_msgs/LaserScan</code> and
          gets a LaserScan either way. The hardware behind the topic is the part
          that varies, never the interface you write code against.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>WHAT IT MEANS FOR YOUR CODE</Eyebrow>
          <DisplayHeading size="lg">
            PORTING YOUR <Red>CODE.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            Because <code style={{ fontFamily: NB.monoFont }}>/drive</code>,{' '}
            <code style={{ fontFamily: NB.monoFont }}>/scan</code>, and{' '}
            <code style={{ fontFamily: NB.monoFont }}>/odom</code> match exactly, an
            autonomy node built against the F1TENTH contract subscribes and
            publishes with the same names on the NeoRacer. The MCU (microcontroller
            unit) and the rest of the car sit behind that contract, so the wiring
            you do is the same wiring you already know. The camera is the one row
            with a wrinkle: F1TENTH camera output varies by build, while the
            NeoRacer offers both a JPEG{' '}
            <code style={{ fontFamily: NB.monoFont }}>/camera</code> stream and a
            decoded <code style={{ fontFamily: NB.monoFont }}>/camera/decoded</code>{' '}
            image, both optional.{' '}
            <InfoNote term="TF" title="TF (transforms)">TF is the ROS 2 system that tracks where each part of the robot sits relative to the others, such as the LiDAR relative to the car's body. Nodes use it to convert a measurement from one coordinate frame into another.</InfoNote>{' '}
            on the NeoRacer comes through the osracer
            stack, the standard ROS 2 autonomy layer the car runs.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 24 }}>
          <MonoLabel>Questions about a specific interface</MonoLabel>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            If a topic you depend on is not in the matrix, your own{' '}
            <code style={{ fontFamily: NB.monoFont }}>ros2 topic list</code> on a
            running car is the final word on what is published. For anything that
            looks off, reach out at{' '}
            <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              support@neobotics.org
            </a>
            .
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Migration from F1TENTH', href: '/docs/roboracer/migration-from-f1tenth' }}
        next={{ label: 'Competition prep', href: '/docs/roboracer/competition-prep' }}
      />
    </DocsShell>
  );
}
