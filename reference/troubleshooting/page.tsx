import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Troubleshooting · Reference · NeoRacer Docs',
  description:
    'One page to find what is wrong with the car: first checks, per-sensor probes, and the common problems with the LiDAR, camera, motor and Wi-Fi.',
};

const SYM_COLUMNS = [
  { key: 'sym', label: 'Symptom', accent: true },
  { key: 'cause', label: 'Cause' },
  { key: 'fix', label: 'Fix' },
];

export default function TroubleshootingPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Reference', href: '/docs/reference/safety' },
          { label: 'Troubleshooting' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              TROUBLE<Red>SHOOTING</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              This page lists the checks and fixes for the common problems on
              the car.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── First checks ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              FIRST <Red>CHECKS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Run these before anything else. They show whether the driver is
              up and which hardware the car can see.
            </p>
            <Code lang="bash">{`racecar status            # USB devices, /dev/osrbot_* symlinks, running nodes
racecar service status    # the four core services, active and enabled
ros2 topic list           # /scan /drive /imu/fused /odom /camera/color /joy`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={SYM_COLUMNS}
                rows={[
                  { sym: 'Empty node or topic list', cause: 'Workspace not sourced in this shell, or the services are down.', fix: 'racecar source, then racecar service status' },
                  { sym: 'A device is missing from racecar status', cause: 'Unplugged or unpowered hardware.', fix: 'Reseat the cable and check its power.' },
                  { sym: 'The symlink exists but its node is not running', cause: 'Software problem.', fix: 'racecar service restart' },
                  { sym: 'Port or process already in use', cause: 'A launch was started twice.', fix: 'racecar cleanup --force, then relaunch' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Power ────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>POWER</Red>
            </DisplayHeading>
            <MonoLabel>Symptom: the car does not power on</MonoLabel>
            <div style={{ marginTop: 12 }}>
              <DataTable
                columns={SYM_COLUMNS}
                rows={[
                  { sym: 'No response at the power switch', cause: 'The battery is discharged.', fix: 'Charge it on the included balance charger.' },
                  { sym: 'No response with a charged battery', cause: 'The XT60 plug is not seated.', fix: 'Push the XT60 plug in firmly until it clicks.' },
                  { sym: 'Still no response', cause: 'Power hardware failure.', fix: 'Do not disassemble the boards.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Transmitter ──────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>TRANSMITTER</Red>
            </DisplayHeading>
            <MonoLabel>Symptom: the remote control does not drive the car</MonoLabel>
            <div style={{ marginTop: 12 }}>
              <DataTable
                columns={SYM_COLUMNS}
                rows={[
                  { sym: 'The transmitter does not turn on or drops out', cause: 'Transmitter batteries are low.', fix: 'Replace them. Alkaline batteries are recommended.' },
                  { sym: 'The car does not respond to the sticks', cause: 'SWB is not in the manual position.', fix: 'Flip SWB up.' },
                  { sym: 'Still no response in manual', cause: 'The receiver cable or the OSCORE USB link is loose.', fix: 'Reseat the receiver cable at the OSCORE board.' },
                  { sym: 'The receiver does not respond to the transmitter', cause: 'The pair is not bound.', fix: 'Re-pair them following the FlySky manual.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── LiDAR ────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>LIDAR</Red>
            </DisplayHeading>
            <MonoLabel>Symptom: /scan is empty or all zeros</MonoLabel>
            <Code lang="bash">{`ros2 topic hz /scan          # ~30 Hz when healthy
ping -c 3 192.168.8.2        # the sensor; the host side is 192.168.8.1
ip a | grep 192.168.8        # the usb* interface should hold .1

# count the finite returns in one scan; an indoor scan has hundreds
ros2 topic echo /scan --once --field ranges

# the driver logs blind scans itself
journalctl -u neoracer-teleop -b | grep scan-watchdog`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={SYM_COLUMNS}
                rows={[
                  { sym: 'Ping to 192.168.8.2 fails', cause: 'The USB-C lidar link is down.', fix: 'Reseat the USB-C cable, then racecar setup networking to rebuild the link.' },
                  { sym: 'Ping works but /scan publishes nothing', cause: 'The driver stopped receiving data from the sensor.', fix: 'racecar service restart' },
                  { sym: 'Scan publishes but reads all zeros', cause: 'Something covers the sensor dome.', fix: 'Check for tape, dirt, or a shell edge in front of the dome, and wipe the window with a soft dry cloth. The rear 90° always reads 0 by design.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Camera ───────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>CAMERA</Red>
            </DisplayHeading>
            <MonoLabel>Symptom: black frames, or /camera/color publishes nothing</MonoLabel>
            <Code lang="bash">{`ros2 topic list | grep camera                        # /camera/color present?
ros2 topic bw /camera/color                          # ~3-4 MB/s when healthy
ls -l /dev/osrbot_usb_cam                            # the udev symlink
v4l2-ctl --list-formats-ext -d /dev/osrbot_usb_cam   # MJPG must appear`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={SYM_COLUMNS}
                rows={[
                  { sym: 'Frames publish but are black', cause: 'The shipping film is still on the lens.', fix: 'Peel it off.' },
                  { sym: 'No /camera/color at all', cause: 'The camera node crashed or the USB cable is loose.', fix: 'Reseat the USB cable at the front of the car, then racecar service restart.' },
                  { sym: 'A subscriber receives nothing', cause: 'The publisher is best-effort.', fix: 'Subscribe with sensor-data QoS.' },
                  { sym: 'The camera is absent from /dev on the car', cause: 'Camera hardware failure.', fix: 'Test the camera on another computer.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── IMU ──────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>IMU</Red>
            </DisplayHeading>
            <MonoLabel>Symptom: no or wrong IMU data</MonoLabel>
            <Code lang="bash">{`ros2 topic hz /imu/fused             # ~200 Hz when healthy
ros2 topic echo /imu/fused --once    # readings should be steady while the car is still`}</Code>
            <div style={{ marginTop: 12 }}>
              <DataTable
                columns={SYM_COLUMNS}
                rows={[
                  { sym: 'No /imu/fused at all', cause: 'The OSCORE serial link is down.', fix: 'Check that racecar status lists /dev/osrbot_base, then racecar service restart.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Motor and steering ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              MOTOR AND <Red>STEERING</Red>
            </DisplayHeading>
            <MonoLabel>Symptom: jitter, creep, or crooked driving</MonoLabel>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              First check whether the cause is software or hardware. Command
              zero speed. A car that is silent at zero has a software cause. A
              car that jitters at zero has an electrical or mechanical cause.
            </p>
            <Code lang="python">{`rc.drive.set_speed_angle(0, 0)   # the car should be silent and still`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={SYM_COLUMNS}
                rows={[
                  { sym: 'Oscillates while your code drives', cause: 'Control gain too high; the script overcorrects.', fix: 'Halve the proportional gain and retest.' },
                  { sym: 'Jitters at zero command', cause: 'A pinched motor wire, common after a crash.', fix: 'Check the rear loom where it passes the chassis edge.' },
                  { sym: 'Grinds or skips at top speed', cause: 'Worn pinion gear.', fix: 'Inspect the pinion teeth; replace the gear if teeth are missing.' },
                  { sym: 'Forward command drives in reverse', cause: 'Motor wiring reversed.', fix: 'Swap any two motor leads.' },
                  { sym: 'Wheels not symmetric left and right', cause: 'Steering center is off.', fix: 'Adjust steering_trim_deg, see ROS 2 params.' },
                  { sym: 'Odometry jumps a known distance', cause: 'Loose encoder cable.', fix: 'Reseat the encoder cable.' },
                  { sym: 'Pulls to one side or fishtails', cause: 'Worn tires, loose wheel screws, or worn shock absorbers.', fix: 'Replace worn tires on the same axle together. Tighten the wheel screws.' },
                  { sym: 'Steering is weak or does not turn', cause: 'A mechanical jam or a servo failure.', fix: 'Power off and turn the front wheels by hand. Remove anything blocking them.' },
                  { sym: 'Steering has slack', cause: 'Loose ball joints on the steering linkage.', fix: 'Tighten the linkage connectors.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Wi-Fi ────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>WI-FI</Red>
            </DisplayHeading>
            <MonoLabel>Symptom: cannot reach the car</MonoLabel>
            <Code lang="bash">{`# 1. Join the car's network: neoracer-[Car ID], password neobotics.
# 2. Ping the car's address for that network.
ping 192.168.10.100        # cudy router
ping 10.42.0.1             # access point

# 3. If the ping answers, SSH in and confirm it is the right car.
ssh racecar@192.168.10.100
hostname                   # neoracer
whoami                     # racecar`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={SYM_COLUMNS}
                rows={[
                  { sym: 'The network never appears', cause: 'The car has not finished booting, or the access point was renamed.', fix: 'Wait a minute after power-on. racecar setup networking --show prints the saved name.' },
                  { sym: 'Joined, but the ping hangs', cause: 'Wrong Car ID, or your laptop joined a different network.', fix: 'Check which Wi-Fi your laptop is on and match the car ID on the sticker.' },
                  { sym: 'No Wi-Fi at all', cause: 'Radio or configuration problem.', fix: 'Connect an Ethernet cable between your computer and the car. Set your computer to an address in 192.168.10.x, SSH to 192.168.10.100, then run racecar setup networking.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Support ──────────────────────────────────────────────────── */}
      <PrevNext
        prev={{ label: 'Safety', href: '/docs/reference/safety' }}
        next={{ label: 'Maintenance', href: '/docs/reference/maintenance' }}
      />
    </DocsShell>
  );
}
