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
  title: 'ROS 2 parameters · API Reference · NeoRacer Docs',
  description:
    'The parameters the racecar_neo nodes declare: IMU calibration biases loaded from YAML, the LiDAR driver settings, and the drive tuning constants that scale every /drive command.',
};

const IMU_COLUMNS = [
  { key: 'param', label: 'Parameter', mono: true, accent: true, width: '260px' },
  { key: 'type', label: 'Type', mono: true, width: '100px' },
  { key: 'default', label: 'Default', mono: true, width: '90px' },
  { key: 'notes', label: 'Meaning' },
];

const IMU_ROWS = [
  {
    param: 'accelerometer.bias',
    type: 'double[3]',
    default: '0, 0, 0',
    notes: 'Per-axis offset subtracted from every acceleration reading, in m/s². The number a flat, still car should read as zero.',
  },
  {
    param: 'gyroscope.bias',
    type: 'double[3]',
    default: '0, 0, 0',
    notes: 'Per-axis offset subtracted from angular velocity, in rad/s. Removes the slow drift you see when the car is not moving.',
  },
  {
    param: 'magnetometer.hard_iron_bias',
    type: 'double[3]',
    default: '0, 0, 0',
    notes: 'Hard-iron offset removed from the raw magnetometer vector, in teslas, before any scaling.',
  },
  {
    param: 'magnetometer.soft_iron_matrix.data',
    type: 'double[9]',
    default: 'identity',
    notes: 'A row-major 3×3 soft-iron correction applied after the hard-iron shift, to round out a skewed field into a sphere.',
  },
];

const LIDAR_COLUMNS = [
  { key: 'param', label: 'Parameter', mono: true, accent: true, width: '180px' },
  { key: 'type', label: 'Type', mono: true, width: '90px' },
  { key: 'ref', label: 'Reference default', mono: true, width: '150px' },
  { key: 'notes', label: 'Meaning' },
];

const LIDAR_ROWS = [
  {
    param: 'frame_id',
    type: 'string',
    ref: 'lidar_link',
    notes: 'The TF frame stamped on every /scan. Your car uses lidar_link; the reference RPLIDAR build defaults this to laser_frame.',
  },
  {
    param: 'channel_type',
    type: 'string',
    ref: 'serial',
    notes: 'Transport to the scanner: serial, tcp, or udp. The LakiBeam1 is an Ethernet unit, so on your car this is the udp path.',
  },
  {
    param: 'serial_port',
    type: 'string',
    ref: '/dev/ttyUSB0',
    notes: 'The device file for a serial scanner. Not used on the Ethernet LakiBeam1.',
  },
  {
    param: 'serial_baudrate',
    type: 'int',
    ref: '115200',
    notes: 'Link speed for a serial scanner. Not used on the Ethernet LakiBeam1.',
  },
  {
    param: 'angle_compensate',
    type: 'bool',
    ref: 'true',
    notes: 'Evens out the angular spacing of samples so each index maps to a fixed angle.',
  },
  {
    param: 'inverted',
    type: 'bool',
    ref: 'false',
    notes: 'Flips the scan direction, for a scanner mounted upside down.',
  },
];

const DRIVE_COLUMNS = [
  { key: 'name', label: 'Constant', mono: true, accent: true, width: '210px' },
  { key: 'file', label: 'File', mono: true, width: '130px' },
  { key: 'value', label: 'Value', mono: true, width: '80px' },
  { key: 'notes', label: 'Effect' },
];

const DRIVE_ROWS = [
  {
    name: 'DRIVE_MAX_SPEED',
    file: 'throttle.py',
    value: '0.25',
    notes: 'The speed your /drive command is measured against. A speed of 0.25 is treated as full before throttle scaling.',
  },
  {
    name: 'CAR_THROTTLE_FORWARD',
    file: 'throttle.py',
    value: '0.0425',
    notes: 'The forward duty actually sent to the ESC at full command. This is the real speed cap that keeps a classroom car sane.',
  },
  {
    name: 'CAR_THROTTLE_BACKWARD',
    file: 'throttle.py',
    value: '0.06',
    notes: 'The reverse duty at full command. Higher than forward because the ESC needs more to break static friction backward.',
  },
  {
    name: 'CAR_THROTTLE_TURN',
    file: 'throttle.py',
    value: '0.25',
    notes: 'Scales the steering angle before it reaches the servo, trading lock for smoothness.',
  },
  {
    name: 'GAMEPAD_THROTTLE_AXIS',
    file: 'gamepad.py',
    value: '1',
    notes: 'Which Joy axis the teleop node reads as throttle.',
  },
  {
    name: 'GAMEPAD_STEER_AXIS',
    file: 'gamepad.py',
    value: '3',
    notes: 'Which Joy axis the teleop node reads as steering.',
  },
];

export default function Ros2ParamsPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'ROS 2' },
          { label: 'Parameters' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="//" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>API REFERENCE / ROS 2</Eyebrow>
            <DisplayHeading size="xl">
              ROS 2 <Red>PARAMETERS.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              Three groups of settings shape how the car behaves. The{' '}
              <InfoNote term="IMU" title="IMU">
                Inertial measurement unit. A small sensor package, usually an accelerometer plus a gyroscope and sometimes a magnetometer, that reports how the car is accelerating and rotating. Its raw readings carry a fixed offset, which is what the calibration biases remove.
              </InfoNote>{' '}
              node loads its calibration from YAML at launch, the LiDAR driver takes
              its transport and framing settings, and a handful of drive
              constants decide how a{' '}
              <code style={{ fontFamily: NB.monoFont }}>/drive</code> command maps
              to actual motion.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">IMU calibration</ChromeBadge>
              <ChromeBadge variant="outline">LiDAR driver</ChromeBadge>
              <ChromeBadge variant="outline">Drive tuning</ChromeBadge>
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
          . The IMU and drive parameters carry across builds unchanged. The LiDAR
          parameters belong to whichever scanner driver is running, so the
          serial settings below describe the reference RPLIDAR; your LakiBeam1
          uses the Ethernet path. A{' '}
          <code style={{ fontFamily: NB.monoFont }}>ros2 param list</code> on your
          own car is always the final word. The{' '}
          <a href="https://github.com/osrbot/osracer" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            osracer
          </a>{' '}
          <InfoNote term="SLAM" title="SLAM">
            Simultaneous localization and mapping. The car builds a map of an unknown space while at the same time tracking where it is within that map, mostly from LiDAR scans.
          </InfoNote>{' '}
          and Nav2 stack, which ships alongside this one, carries its own,
          much larger set of parameters in its launch and YAML files.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <Eyebrow>IMU CALIBRATION</Eyebrow>
          <DisplayHeading size="lg">
            IMU CALIBRATION <Red>BIASES.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            The IMU node declares these and reads them from{' '}
            <code style={{ fontFamily: NB.monoFont }}>config/imu_cal.yaml</code>{' '}
            and{' '}
            <code style={{ fontFamily: NB.monoFont }}>config/mag_cal.yaml</code>{' '}
            when the launch file starts it. The calibration scripts in the repo
            generate those files; the{' '}
            <a href="/docs/calibration/imu-bias" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              IMU bias
            </a>{' '}
            page walks through running them.
          </p>
          <DataTable columns={IMU_COLUMNS} rows={IMU_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>LIDAR DRIVER</Eyebrow>
          <DisplayHeading size="lg">
            THE LIDAR <Red>DRIVER.</Red>
          </DisplayHeading>
          <DataTable columns={LIDAR_COLUMNS} rows={LIDAR_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>DRIVE TUNING</Eyebrow>
          <DisplayHeading size="lg">
            DRIVE TUNING <Red>CONSTANTS.</Red>
          </DisplayHeading>
          <Callout type="warn" title="These are source constants, not live parameters">
            In the current backend these live as plain Python values in the node
            files, with the parameter versions commented out. You change them by
            editing the file and rebuilding, not with{' '}
            <code style={{ fontFamily: NB.monoFont }}>ros2 param set</code>. They
            are documented here because they decide how your command becomes
            motion, and because raising the speed cap is the single most common
            tuning step.
          </Callout>
          <DataTable columns={DRIVE_COLUMNS} rows={DRIVE_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 24 }}>
          <MonoLabel>Reading and setting parameters at runtime</MonoLabel>
          <Code lang="bash">{`# What does a node expose?
ros2 param list /imu_node

# Read one
ros2 param get /imu_node gyroscope.bias

# Change one while the node runs (declared params only)
ros2 param set /imu_node accelerometer.bias "[0.01, -0.02, 0.0]"`}</Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 services', href: '/docs/api-reference/ros2/services' }}
        next={{ label: 'ROS 2 TF frames', href: '/docs/api-reference/ros2/tf-frames' }}
      />
    </DocsShell>
  );
}
