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
    'The parameters the neoracer_ros2_driver nodes declare: the throttle caps every /drive command is scaled by, the controller node speed and steering mapping, the camera settings, and the LiDAR launch arguments.',
};

const COLUMNS = [
  { key: 'param', label: 'Parameter', mono: true, accent: true, width: '240px' },
  { key: 'value', label: 'Shipped value', mono: true, width: '130px' },
  { key: 'notes', label: 'Meaning' },
];

const THROTTLE_ROWS = [
  {
    param: 'max_speed_forward',
    value: '1.0',
    notes: 'Scales every forward /drive command before it reaches the controller. At 1.0 a full-speed command uses the whole firmware ceiling; lower it to derate the car.',
  },
  {
    param: 'max_speed_backward',
    value: '1.0',
    notes: 'The reverse scale, same idea in the other direction.',
  },
  {
    param: 'max_steering',
    value: '0.625',
    notes: 'Scales the commanded steering angle before the servo mapping. 0.625 is full servo lock; a higher value stalls the servo against the linkage.',
  },
];

const CONTROLLER_ROWS = [
  {
    param: 'max_speed_mps',
    value: '6.0',
    notes: 'The physical speed a full-scale command maps to, in m/s. Matches the firmware’s closed-loop ceiling; raising it past 6.0 needs a firmware change, not a parameter.',
  },
  {
    param: 'max_steering_angle_deg',
    value: '30.0',
    notes: 'The steering angle a full-scale command maps to, in degrees.',
  },
  {
    param: 'steering_trim_deg',
    value: '0.0',
    notes: 'Added to every steering command so a 0.0 angle drives straight. Set through the servo-center calibration.',
  },
  {
    param: 'rc_min / rc_center / rc_max',
    value: '1000 / 1500 / 2000',
    notes: 'The FlySky channel calibration, in microseconds. Readings below rc_failsafe_below (500) mean no signal and read as neutral.',
  },
  {
    param: 'port_name',
    value: '/dev/osrbot_base',
    notes: 'The ESP32 serial device, held stable by the udev rules the setup installs.',
  },
  {
    param: 'publish_mag',
    value: 'false',
    notes: 'The magnetometer topic is off by default; the fused orientation already comes from the MCU state frame.',
  },
];

const CAMERA_ROWS = [
  {
    param: 'image_width × image_height',
    value: '640 × 480',
    notes: 'The capture resolution requested from the camera.',
  },
  {
    param: 'framerate',
    value: '60.0',
    notes: 'Frames per second on /camera. The node passes the camera’s native MJPG through, so this is real throughput, not a target.',
  },
  {
    param: 'video_device',
    value: '/dev/osrbot_usb_cam',
    notes: 'The stable udev name for the USB camera; the node falls back to scanning /dev/video* if it moves.',
  },
];

const LIDAR_ROWS = [
  {
    param: 'frame_id',
    value: 'laser',
    notes: 'The TF frame stamped on every /scan.',
  },
  {
    param: 'sensorip',
    value: '192.168.8.2',
    notes: 'The LakiBeam1’s address on the USB-C bridge (the host side is 192.168.8.1). The driver pushes configuration to the sensor here at startup.',
  },
  {
    param: 'scanfreq',
    value: '30',
    notes: 'Revolutions per second the sensor is configured to spin, which is the /scan publish rate.',
  },
  {
    param: 'scan_range_start / stop',
    value: '45 / 315',
    notes: 'The sensor’s live window in its own frame: 270 degrees of returns. This is why the rear wedge of a scan carries no data.',
  },
];

export default function Ros2ParamsPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
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
              Every node in the driver declares real, live ROS 2 parameters, and
              the ones below are the ones you will actually reach for: the
              throttle caps that scale every{' '}
              <code style={{ fontFamily: NB.monoFont }}>/drive</code> command, the
              controller mapping from commands to physical speed and angle, the
              camera settings, and the LiDAR launch arguments.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Live via ros2 param</ChromeBadge>
              <ChromeBadge variant="outline">Persisted in config/*.yaml</ChromeBadge>
              <ChromeBadge variant="outline">neoracer_ros2_driver</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="Two ways to change a value">
          Set a parameter at runtime with{' '}
          <code style={{ fontFamily: NB.monoFont }}>ros2 param set</code> and it
          applies immediately but lasts until the node restarts. Edit the
          matching YAML under{' '}
          <code style={{ fontFamily: NB.monoFont }}>neoracer_ros2_driver/config/</code>{' '}
          and restart (<code style={{ fontFamily: NB.monoFont }}>racecar service restart</code>)
          and it persists. The workspace builds with symlinks, so a YAML edit
          needs no rebuild. <code style={{ fontFamily: NB.monoFont }}>ros2 param list</code>{' '}
          on the running car is always the final word.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <Eyebrow>THROTTLE_NODE · config/throttle.yaml</Eyebrow>
          <DisplayHeading size="lg">
            THE SPEED <Red>CAPS.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            The most-tuned three values on the car. Full chain: your command
            [-1, 1] × these caps × the controller&apos;s{' '}
            <code style={{ fontFamily: NB.monoFont }}>max_speed_mps</code> = what
            the motor is asked to do.
          </p>
          <DataTable columns={COLUMNS} rows={THROTTLE_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>CONTROLLER_NODE · config/controller.yaml</Eyebrow>
          <DisplayHeading size="lg">
            THE ESP32 <Red>BRIDGE.</Red>
          </DisplayHeading>
          <DataTable columns={COLUMNS} rows={CONTROLLER_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>CAMERA_NODE · config/camera.yaml</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>CAMERA.</Red>
          </DisplayHeading>
          <DataTable columns={COLUMNS} rows={CAMERA_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <Eyebrow>LIDAR · launch arguments</Eyebrow>
          <DisplayHeading size="lg">
            THE LIDAR <Red>DRIVER.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            The LakiBeam1 driver takes these as launch arguments in{' '}
            <code style={{ fontFamily: NB.monoFont }}>lidar.launch.py</code>{' '}
            rather than runtime parameters; the driver pushes them to the
            sensor&apos;s own configuration at startup.
          </p>
          <DataTable columns={COLUMNS} rows={LIDAR_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 24 }}>
          <MonoLabel>Reading and setting parameters at runtime</MonoLabel>
          <Code lang="bash">{`# What does a node expose?
ros2 param list /throttle_node

# Read one
ros2 param get /throttle_node max_speed_forward

# Change one while the node runs (until the next restart)
ros2 param set /throttle_node max_speed_forward 0.3

# Make it permanent instead: edit config/throttle.yaml, then
racecar service restart`}</Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 services', href: '/docs/api-reference/ros2/services' }}
        next={{ label: 'ROS 2 TF frames', href: '/docs/api-reference/ros2/tf-frames' }}
      />
    </DocsShell>
  );
}
