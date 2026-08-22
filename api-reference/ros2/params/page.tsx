import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Code, DataTable } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

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
    notes: 'Scales every forward /drive command.',
  },
  {
    param: 'max_speed_backward',
    value: '1.0',
    notes: 'Scales every reverse /drive command the same way.',
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
    notes: 'The physical speed a full-scale command maps to, in m/s. Raising it past 6.0 requires a firmware change.',
  },
  {
    param: 'max_steering_angle_deg',
    value: '30.0',
    notes: 'The steering angle a full-scale command maps to, in degrees.',
  },
  {
    param: 'steering_trim_deg',
    value: '0.0',
    notes: 'Added to every steering command so a 0.0 angle drives straight. Measured with lab_trim_cal.py and set in controller.yaml.',
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
    value: 'true',
    notes: 'Publishes the raw magnetometer on /mag. The fused orientation on /imu/fused does not use it.',
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
    notes: 'Frames per second on /camera. The node passes the camera’s native MJPG stream through unchanged.',
  },
  {
    param: 'video_device',
    value: '/dev/osrbot_usb_cam',
    notes: 'The stable udev name for the USB camera. If the symlink is missing, the node scans /dev/video*.',
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
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'ROS 2' },
          { label: 'Parameters' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="14" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              ROS 2 <Red>PARAMETERS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              This page lists the parameters the driver nodes declare and the
              values they ship with.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <DisplayHeading size="lg">
            CHANGING A <Red>VALUE</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            The driver nodes read their parameters once at startup. To change a
            value, edit the matching YAML under{' '}
            <code style={{ fontFamily: NB.monoFont }}>neoracer_ros2_driver/config/</code>{' '}
            and restart the services.{' '}
            <code style={{ fontFamily: NB.monoFont }}>ros2 param list</code> and{' '}
            <code style={{ fontFamily: NB.monoFont }}>ros2 param get</code> show
            the live values.
          </p>
          <Code lang="bash">{`ros2 param list /throttle_node                    # every parameter the node declares
ros2 param get /throttle_node max_speed_forward

# change a value: edit config/throttle.yaml, then
racecar service restart`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <DisplayHeading size="lg">
            <Red>THROTTLE</Red>
          </DisplayHeading>
          <MonoLabel>config/throttle.yaml</MonoLabel>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            A command in [-1, 1] is multiplied by these caps, then by the
            controller&apos;s{' '}
            <code style={{ fontFamily: NB.monoFont }}>max_speed_mps</code>.
          </p>
          <DataTable columns={COLUMNS} rows={THROTTLE_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <DisplayHeading size="lg">
            <Red>CONTROLLER</Red>
          </DisplayHeading>
          <MonoLabel>config/controller.yaml</MonoLabel>
          <DataTable columns={COLUMNS} rows={CONTROLLER_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <DisplayHeading size="lg">
            <Red>CAMERA</Red>
          </DisplayHeading>
          <MonoLabel>config/camera.yaml</MonoLabel>
          <DataTable columns={COLUMNS} rows={CAMERA_ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 8 }}>
          <DisplayHeading size="lg">
            <Red>LIDAR</Red>
          </DisplayHeading>
          <MonoLabel>launch arguments</MonoLabel>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            The LakiBeam1 driver takes these as launch arguments in{' '}
            <code style={{ fontFamily: NB.monoFont }}>lidar.launch.py</code>{' '}
            rather than runtime parameters; the driver pushes them to the
            sensor&apos;s own configuration at startup.
          </p>
          <DataTable columns={COLUMNS} rows={LIDAR_ROWS} />
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 topics', href: '/docs/api-reference/ros2/topics' }}
      />
    </DocsShell>
  );
}
