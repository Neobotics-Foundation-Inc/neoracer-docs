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
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'Compatibility matrix · Reference · NeoRacer Docs',
  description:
    'What the NeoRacer is built on and interoperates with: Jetson Orin Nano on JetPack 6.2, Ubuntu 22.04.5 LTS, ROS 2 Humble, the neoracer_ros2_driver, the osracer autonomy stack, the Richbeam LakiBeam1 LiDAR, and the F1TENTH ecosystem.',
};

const PLATFORM_COLUMNS = [
  { key: 'layer', label: 'Layer', mono: true, accent: true, width: '180px' },
  { key: 'value', label: 'What ships', mono: true, width: '260px' },
  { key: 'notes', label: 'Notes' },
];

const PLATFORM_ROWS = [
  {
    layer: 'Compute',
    value: 'NVIDIA Jetson Orin Nano',
    notes: 'The OSCORE ESP32-S3 handles the real-time motor, servo, IMU, and Flysky RC loops, while the Jetson Orin Nano runs the stack and delivers 67 TOPS for perception and planning.',
  },
  {
    layer: 'NVIDIA SDK',
    value: 'JetPack 6.2',
    notes: 'The Linux kernel, GPU drivers, CUDA, and the AI runtime that come pre-flashed on the Jetson. Re-flashing follows Seeed\'s JetPack guide for the reComputer J4012.',
  },
  {
    layer: 'Operating system',
    value: 'Ubuntu 22.04.5 LTS (jammy)',
    notes: 'The long-term support release ROS 2 Humble is built and tested against, so packages from the wider ecosystem install without surprises. Python 3.10.12.',
  },
  {
    layer: 'Middleware',
    value: 'ROS 2 Humble',
    notes: 'The robotics layer every topic, node, and message on the car is published through. Code you write against Humble targets standard ROS 2 interfaces.',
  },
  {
    layer: 'NeoRacer driver',
    value: 'neoracer_ros2_driver 0.1.0',
    notes: 'The ROS 2 backend that ships on every NeoRacer. Migrated from the MIT RACECAR Neo driver, retargeted for the OSCORE ESP32, the Lakibeam over UDP, and a USB MJPG camera. GPLv3.',
  },
  {
    layer: 'Student library',
    value: 'racecar-neo-library',
    notes: 'The Python module student code is written against. The rc.* namespace it exposes is identical on the browser sim and the physical car, and it consumes the topic contract above.',
  },
  {
    layer: 'Autonomy stack',
    value: 'osracer',
    notes: 'The general ROS 2 autonomy stack: SLAM through gmapping or Cartographer, and navigation through Nav2. Runs alongside the driver or on its own.',
  },
];

const SENSOR_COLUMNS = [
  { key: 'component', label: 'Component', mono: true, accent: true, width: '180px' },
  { key: 'part', label: 'Hardware', mono: true, width: '220px' },
  { key: 'api', label: 'rc.* access', mono: true, width: '130px' },
  { key: 'notes', label: 'What it gives you' },
];

const SENSOR_ROWS = [
  {
    component: 'LiDAR',
    part: 'Richbeam LakiBeam1',
    api: 'rc.lidar',
    notes: 'A planar scan exposed as 720 samples at 0.5 degree spacing through rc.lidar. The sensor scans at 0.25 degree natively, so the raw cloud is finer than the teaching view.',
  },
  {
    component: 'Camera',
    part: 'Color camera',
    api: 'rc.camera',
    notes: 'A 640 by 480 color frame per read. The depth source for color tracking, line following, and any vision your own code adds.',
  },
  {
    component: 'IMU',
    part: 'QMI8658A + QMC6309 (9-axis)',
    api: 'rc.physics',
    notes: 'Linear acceleration and angular velocity from the QMI8658A, plus a magnetometer vector from the QMC6309, read through rc.physics.',
  },
  {
    component: 'Drive',
    part: 'Ackermann steering',
    api: 'rc.drive',
    notes: 'Speed and steering commands carried as ackermann_msgs/AckermannDriveStamped, the same Ackermann message the wider racing ecosystem uses.',
  },
];

const ECOSYSTEM_COLUMNS = [
  { key: 'target', label: 'Target', mono: true, accent: true, width: '180px' },
  { key: 'status', label: 'Status', width: '150px' },
  { key: 'notes', label: 'How it lines up' },
];

const ECOSYSTEM_ROWS = [
  {
    target: 'F1TENTH',
    status: 'Topic-compatible',
    notes: 'The contract matches on the topics that matter: /scan for the LiDAR, /drive for Ackermann commands, and /odom for odometry. Code written against the F1TENTH topic layout reads and drives the NeoRacer.',
  },
];

export default function CompatibilityMatrixPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Reference', href: '/docs/reference/specifications' },
          { label: 'Compatibility matrix' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="//" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>REFERENCE / COMPATIBILITY</Eyebrow>
            <DisplayHeading size="xl">
              THE COMPATIBILITY <Red>MATRIX.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer runs the same compute, operating system, and middleware
              the autonomous racing community already uses, so what you learn here
              carries over. This page is the reference for what the car is built on
              and what it interoperates with, grouped into the platform, the sensors
              and drive, and the racing ecosystem around it.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">ROS 2 Humble</ChromeBadge>
              <ChromeBadge variant="outline">Jetson Orin Nano</ChromeBadge>
              <ChromeBadge variant="outline">F1TENTH topic-compatible</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="How to read this matrix">
          The rows here are the parts we are confident about: the compute,
          operating system, and middleware the car runs, the named sensors and the
          rc.* call that reaches each one, and the racing ecosystems it lines up
          with. For exact figures and dimensions, the{' '}
          <a href="/docs/reference/specifications" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            specifications
          </a>{' '}
          page is the authority. Package version pins are not listed here, because
          a frozen pin in a doc ages faster than the stack does. Your own car is
          the final word on the versions it has installed.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <Eyebrow>THE PLATFORM</Eyebrow>
          <DisplayHeading size="lg">
            COMPUTE, OS, <Red>MIDDLEWARE.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            Every layer below is a standard the community already builds on. The
            Orin Nano is the same class of compute used across modern small-scale
            autonomy, Ubuntu 22.04 LTS is the release ROS 2 Humble targets, and
            Humble is the middleware your code talks to. Nothing here is bespoke to
            one vendor.
          </p>
          <DataTable columns={PLATFORM_COLUMNS} rows={PLATFORM_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Two stacks, one car">
          The{' '}
          <code style={{ fontFamily: NB.monoFont }}>racecar_neo</code>{' '}
          teaching driver and the{' '}
          <code style={{ fontFamily: NB.monoFont }}>osracer</code>{' '}
          autonomy stack run side by side. racecar_neo is the MIT driver the rc.*
          API sits on, the fastest way into your first program. osracer is the
          general ROS 2 stack for SLAM (gmapping or Cartographer) and Nav2, for
          when you want full mapping and navigation. Reach for whichever the lesson
          calls for, or run both together. The topic walkthrough on the{' '}
          <a href="/docs/api-reference/ros2/topics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            ROS 2 topics
          </a>{' '}
          page shows how the two share the drive channel.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>SENSORS AND DRIVE</Eyebrow>
          <DisplayHeading size="lg">
            SENSORS AND <Red>DRIVE.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            Each sensor reaches your code through one rc.* call, so you read the
            world without touching a driver. The drive side speaks
            ackermann_msgs/AckermannDriveStamped, the same Ackermann message format
            the racing ecosystem expects, which is what makes the cross-platform
            rows further down hold.
          </p>
          <DataTable columns={SENSOR_COLUMNS} rows={SENSOR_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>THE ECOSYSTEM</Eyebrow>
          <DisplayHeading size="lg">
            THE RACING <Red>ECOSYSTEM.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            Because the car runs standard ROS 2 on standard topics, it lines up with
            the autonomous racing platforms students already meet in courses and
            competitions. The common ground is the topic contract: the LiDAR scan,
            the Ackermann drive command, and odometry under the names these stacks
            expect.
          </p>
          <DataTable columns={ECOSYSTEM_COLUMNS} rows={ECOSYSTEM_ROWS} />
          <div style={{ marginTop: 24 }}>
            <MonoLabel>The shared contract</MonoLabel>
            <DashList
              items={[
                <>
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontWeight: 700 }}>/scan</code>{' '}
                  carries the planar LiDAR sweep, the depth source for wall follow, gap follow, and mapping.
                </>,
                <>
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontWeight: 700 }}>/drive</code>{' '}
                  carries the Ackermann speed and steering command, the one channel your autonomy code writes to.
                </>,
                <>
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontWeight: 700 }}>/odom</code>{' '}
                  carries odometry, the pose estimate the navigation layers read.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Not sure a tool fits?">
          Compatibility at the topic level means your nodes connect. If a row here
          leaves you unsure whether a specific tool fits, write to{' '}
          <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            support@neobotics.org
          </a>{' '}
          and we will confirm before you build on it.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Changelog', href: '/docs/reference/changelog' }}
        next={{ label: 'Warranty', href: '/docs/legal/warranty' }}
      />
    </DocsShell>
  );
}
