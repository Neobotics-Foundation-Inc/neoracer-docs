import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Diagnostics · Troubleshooting · NeoRacer Docs',
  description:
    'The ROS 2 commands that show what the NeoRacer is actually seeing: node and topic checks, per-sensor probes, RViz views, and the symptom tables for drive and steering faults.',
};

export default function DiagnosticsPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Troubleshooting', href: '/docs/troubleshooting/wont-power-on' },
          { label: 'Diagnostics' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="?" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>TROUBLESHOOTING / DIAGNOSTICS</Eyebrow>
            <DisplayHeading size="xl">
              WHAT'S THE CAR <Red>SEEING?</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              Before you swap a part, ask the car. These ROS 2 commands show
              whether the driver is up, which topics are live, and what each sensor
              is publishing. Run them on the car or from your laptop over the same{' '}
              <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>network</Link>.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">ros2 node list</ChromeBadge>
              <ChromeBadge variant="outline">ros2 topic echo</ChromeBadge>
              <ChromeBadge variant="outline">RViz views</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · first checks ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <Eyebrow>01 / IS THE STACK UP?</Eyebrow>
          <DisplayHeading size="lg">
            FIRST <Red>CHECKS.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Start with the graph. If nodes or topics are missing, the driver
            isn&apos;t up or your shells aren&apos;t talking to it yet.
          </p>
          <Code lang="bash">{`ros2 node list      # the driver's nodes should be here
ros2 topic list     # /scan /drive /imu /odom /camera /joy`}</Code>
          <div style={{ marginTop: 18 }}>
            <DataTable
              columns={[
                { key: 'sym', label: 'Symptom', accent: true },
                { key: 'cause', label: 'Likely cause' },
                { key: 'fix', label: 'Fix', mono: true },
              ]}
              rows={[
                { sym: 'Empty node/topic list', cause: "Workspace not sourced in this shell, or the services are down.", fix: 'source ~/ros2_ws/install/setup.bash + racecar service status' },
                { sym: 'Missing ROS package', cause: 'Dependencies not installed.', fix: 'rosdep install --from-paths src --ignore-src -r -y' },
                { sym: 'Port / process in use', cause: 'A launch was started twice.', fix: 'pkill -f ros2  # then relaunch' },
              ]}
            />
          </div>
          <Callout type="note" title="Cross-machine empties">
            If the list is empty from your laptop but fine on the car, it&apos;s a
            network issue, not a driver one. Confirm the same Wi-Fi and{' '}
            <code style={{ fontFamily: NB.monoFont }}>ROS_DOMAIN_ID</code> per{' '}
            <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</Link>.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── 02 · per-sensor ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / PROBE EACH SENSOR</Eyebrow>
            <DisplayHeading size="lg">
              PER-SENSOR <Red>CHECKS.</Red>
            </DisplayHeading>

            <div style={{ marginTop: 14 }}>
              <MonoLabel>LiDAR</MonoLabel>
              <Code lang="bash">{`ros2 topic list | grep scan      # is /scan there?
ros2 topic echo /scan            # live returns?
ls -l /dev/serial/by-id/         # is the device node present?`}</Code>
            </div>
            <div style={{ marginTop: 14 }}>
              <MonoLabel>Camera</MonoLabel>
              <Code lang="bash">{`ls /dev/video*                   # device node exists?
ros2 topic list | grep image     # image topics live?
ros2 topic echo /camera --once   # JPEG bytes; best-effort QoS
ros2 topic bw /camera              # bandwidth, ~3-4 MB/s when healthy`}</Code>
            </div>
            <div style={{ marginTop: 14 }}>
              <MonoLabel>IMU + odometry</MonoLabel>
              <Code lang="bash">{`ros2 topic list | grep imu       # /imu present?
ros2 topic hz /imu               # ~200 Hz when streaming
ros2 topic hz /odom              # ~200 Hz, moves when the wheels do`}</Code>
            </div>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15, lineHeight: 1.6, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              No data from a sensor usually means a loose USB lead or no power
              before it means a dead part. The symptom pages walk each one:{' '}
              <Link href="/docs/troubleshooting/lidar-empty-scan" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>LiDAR empty scan</Link>,{' '}
              <Link href="/docs/troubleshooting/camera-no-feed" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>camera no feed</Link>.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · rviz views ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <Eyebrow>03 / SEE IT</Eyebrow>
          <DisplayHeading size="lg">
            VIEWS IN <Red>RVIZ.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            When a topic is publishing but the numbers don&apos;t tell you enough,
            put it on screen.
          </p>
          <Code lang="bash">{`ros2 launch osracer_rviz view_lidar.launch.py    # laser scan
ros2 launch osracer_rviz view_image.launch.py    # camera image
ros2 launch osracer_debug debug_lidar.launch.py  # lidar + frames
ros2 launch osracer_debug debug_image.launch.py  # image pipeline`}</Code>
        </section>
      </ScrollReveal>

      {/* ── 04 · drive + steer ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / IT MOVES WRONG</Eyebrow>
            <DisplayHeading size="lg">
              DRIVE + STEER <Red>FAULTS.</Red>
            </DisplayHeading>

            <div style={{ marginTop: 16 }}>
              <MonoLabel>RC won't control the car</MonoLabel>
              <DataTable
                columns={[
                  { key: 'cause', label: 'Cause', accent: true },
                  { key: 'fix', label: 'Fix' },
                ]}
                rows={[
                  { cause: 'Wrong mode', fix: <>SWB not in the middle. The middle is manual. See <Link href="/docs/hardware/remote-control" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Remote control</Link>.</> },
                  { cause: 'Controller link', fix: 'Reseat or replace the USB cable from the hub to the controller.' },
                ]}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <MonoLabel>Drives the wrong way</MonoLabel>
              <DataTable
                columns={[
                  { key: 'cause', label: 'Cause', accent: true },
                  { key: 'fix', label: 'Fix' },
                ]}
                rows={[
                  { cause: 'Motor wiring reversed', fix: 'Forward gives reverse: swap any two motor leads.' },
                  { cause: 'Servo off-centre', fix: <>Wheels not symmetric left/right. Re-centre on the trim, see <Link href="/docs/calibration/servo-center" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Servo center</Link>.</> },
                  { cause: 'Encoder jumps', fix: 'Odometry jumps after a known distance: reseat the encoder cable.' },
                ]}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <MonoLabel>Steering weak or stuck</MonoLabel>
              <DataTable
                columns={[
                  { key: 'cause', label: 'Cause', accent: true },
                  { key: 'fix', label: 'Fix' },
                ]}
                rows={[
                  { cause: 'Servo fault', fix: 'Noise or jamming, hard to turn by hand: replace with a standard PWM servo.' },
                  { cause: 'Servo power', fix: 'Measure the servo supply: should be 4.8–6 V. If not, check the power module.' },
                  { cause: 'Mechanical jam', fix: 'Power off and turn the wheels by hand; clear debris or a damaged bearing.' },
                ]}
              />
            </div>

            <Callout type="danger" title="Heat or a smell? Stop now.">
              Any overheating, smoke, or odd smell means power down and isolate the
              pack at once, then work through{' '}
              <Link href="/docs/hardware/safety" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Safety</Link>.
              That is never something to drive through.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: "Won't power on", href: '/docs/troubleshooting/wont-power-on' }}
        next={{ label: 'FAQ', href: '/docs/troubleshooting/faq' }}
      />
    </DocsShell>
  );
}
