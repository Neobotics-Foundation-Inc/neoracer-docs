import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  ClockGlyph,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Install the driver · Setup · NeoRacer Docs',
  description:
    'One script sets up the whole car: clone neoracer_ros2_driver, run setup_all.sh, and the sensors, motors, JupyterLab, and the racecar-neo library come up as services that start on every boot.',
};

export default function InstallDriverPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Install the driver' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              INSTALL THE <Red>DRIVER</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The driver is the software that ties the Jetson to the sensors and
              motors.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}><AnimatedNumeral value={30} prefix="~" suffix=" minutes" /></ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Run setup ────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            RUN THE <Red>SETUP</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            You are at the car&apos;s console from{' '}
            <Link href="/docs/getting-started/connect-to-car" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Connect to the car</Link>,
            logged in as <code style={{ fontFamily: NB.monoFont }}>racecar</code>,
            with the car online.
          </p>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The driver code is open source in the{' '}
            <a href="https://github.com/Neobotics-Foundation-Inc/neoracer_ros2_driver" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              neoracer_ros2_driver
            </a>{' '}
            repository. Follow whichever option below matches your car; both run
            the same setup script. The script asks for your password
            (<code style={{ fontFamily: NB.monoFont }}>neobotics</code>) once.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: 20,
              marginTop: 20,
            }}
          >
            <div
              style={{
                background: NB.haloWhite,
                border: `1px solid ${NB.borderOnBeige}`,
                borderTop: `3px solid ${NB.neoboticsRed}`,
                borderRadius: 12,
                padding: '20px 20px 16px',
                boxShadow: NB.shadowCard,
              }}
            >
              <div style={{ fontFamily: NB.monoFont, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: NB.textMutedBeige, marginBottom: 8 }}>
                Driver already on the car
              </div>
              <div style={{ fontFamily: NB.headingFont, fontSize: 24, fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', color: NB.textOnBeige, marginBottom: 10 }}>
                BOUGHT A <span style={{ color: NB.neoboticsRed }}>NEORACER.</span>
              </div>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 14.5, lineHeight: 1.6, color: NB.textMutedBeige, margin: '0 0 12px' }}>
                Factory cars ship with the repository at{' '}
                <code style={{ fontFamily: NB.monoFont }}>~/ros2_ws/src/neoracer_ros2_driver</code>.
                Pull the latest and run the script.
              </p>
              <Code lang="bash">{`cd ~/ros2_ws/src/neoracer_ros2_driver
git pull
bash scripts/setup_all.sh`}</Code>
            </div>
            <div
              style={{
                background: NB.haloWhite,
                border: `1px solid ${NB.borderOnBeige}`,
                borderTop: `3px solid ${NB.tarmacBlue}`,
                borderRadius: 12,
                padding: '20px 20px 16px',
                boxShadow: NB.shadowCard,
              }}
            >
              <div style={{ fontFamily: NB.monoFont, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: NB.textMutedBeige, marginBottom: 8 }}>
                No driver on the car yet
              </div>
              <div style={{ fontFamily: NB.headingFont, fontSize: 24, fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', color: NB.textOnBeige, marginBottom: 10 }}>
                BUILDING YOUR <span style={{ color: NB.neoboticsRed }}>OWN.</span>
              </div>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 14.5, lineHeight: 1.6, color: NB.textMutedBeige, margin: '0 0 12px' }}>
                Since you&apos;re probably working with a stock Jetson Orin
                Nano, clone the repository first, then run the same script.
              </p>
              <Code lang="bash">{`mkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src
git clone https://github.com/Neobotics-Foundation-Inc/neoracer_ros2_driver.git
bash neoracer_ros2_driver/scripts/setup_all.sh`}</Code>
            </div>
          </div>
          <Callout type="tip" title="Safe to re-run">
            The script is idempotent: it skips anything already done. If it stops
            partway (a dropped connection, a typo&apos;d password), run it again
            and it picks up where it left off.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── What it set up ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            THE SEVEN <Red>PHASES</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The script prints each phase as it goes. Here is what each one did to
            your car, so none of it is a mystery:
          </p>
          <div>
            {[
              <><strong>ROS 2 + dependencies.</strong> Installs ROS 2 Humble and the packages the driver builds against.</>,
              <><strong>Dev tools.</strong> The build and debugging tools used throughout these docs.</>,
              <><strong>User environment.</strong> Adds <code style={{ fontFamily: NB.monoFont }}>racecar</code> to the hardware groups and wires the{' '}
                <code style={{ fontFamily: NB.monoFont }}>racecar</code> command into your shell. That one command manages the whole car from here on.</>,
              <><strong>udev rules.</strong> Gives the car&apos;s boards fixed device names (
                <code style={{ fontFamily: NB.monoFont }}>/dev/osrbot_base</code>,{' '}
                <code style={{ fontFamily: NB.monoFont }}>/dev/osrbot_usb_cam</code>,{' '}
                <code style={{ fontFamily: NB.monoFont }}>/dev/osrbot_led_matrix</code>) so they never shuffle between boots.</>,
              <><strong>Workspace build.</strong> Compiles the driver and the LakiBeam LiDAR driver with{' '}
                <InfoNote term="colcon" title="colcon">
                  The standard build tool for ROS 2. It compiles every package in a
                  workspace and sets up the paths so you can run them.
                </InfoNote>. There is exactly one LiDAR driver source, shared with the vendor workspace, so a LiDAR fix lands everywhere at once.</>,
              <><strong>JupyterLab + the student library.</strong> Installs the browser coding environment and the{' '}
                <Link href="/docs/software/racecar-neo-library" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>racecar-neo library</Link>{' '}
                with its labs into <code style={{ fontFamily: NB.monoFont }}>~/jupyter_ws</code>. The library is ready to import, and{' '}
                <code style={{ fontFamily: NB.monoFont }}>rc.go()</code> starts your program directly, tuned for the FlySky remote.</>,
              <><strong>Services.</strong> Installs the four services and enables them on boot: the driver (
                <code style={{ fontFamily: NB.monoFont }}>neoracer-teleop</code>), a watchdog that restarts anything that fails, the health dashboard on port{' '}
                <code style={{ fontFamily: NB.monoFont }}>8080</code>, and JupyterLab on port{' '}
                <code style={{ fontFamily: NB.monoFont }}>8888</code>.</>,
            ].map((phase, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '34px 1fr',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: `1px solid ${NB.borderOnBeige}`,
                }}
              >
                <div
                  style={{
                    fontFamily: NB.headingFont,
                    fontSize: 22,
                    fontWeight: 900,
                    lineHeight: 1.3,
                    color: NB.neoboticsRed,
                  }}
                >
                  {i + 1}
                </div>
                <p
                  style={{
                    fontFamily: NB.bodyFont,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: NB.textMutedBeige,
                    margin: 0,
                  }}
                >
                  {phase}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Start it ─────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            START THE <Red>STACK</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The setup just changed two things about your login: it added the{' '}
            <code style={{ fontFamily: NB.monoFont }}>racecar</code> command to your
            shell, and it added your user to the hardware groups that own the
            car&apos;s serial ports. Linux applies both at login, so your current
            session doesn&apos;t have them yet. Log out and back in once, and both
            are live. Then start the services. This first start is the only manual
            one; from now on the whole stack comes up on its own every time the
            car powers on.
          </p>
          <Code lang="bash">{`# log out of the session and back in (desktop: log out and back in;
# SSH: exit and reconnect), then:
racecar service start`}</Code>
          <Callout type="note" title="What just started">
            The ESP32 bridge (motors, IMU, odometry, the FlySky receiver), the
            LiDAR, the camera, the LED matrix, the drive pipeline that arbitrates
            between the remote and your code, the watchdog, the dashboard, and
            JupyterLab. The full picture of these nodes and their topics is on{' '}
            <Link href="/docs/software/ros2-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>The ROS 2 driver</Link>.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── Verify ───────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            QUICK <Red>CHECKS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Each check confirms a different layer: the services are running, the
            sensors are streaming, and you can see it all from a browser.
          </p>
          <MonoLabel>1 · The services</MonoLabel>
          <Code lang="bash">{`racecar service status
#   neoracer-teleop      active   enabled
#   neoracer-watchdog    active   enabled
#   neoracer-dashboard   active   enabled
#   neoracer-jupyter     active   enabled`}</Code>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
            If not all services show active, a quick restart should have
            everything up and running:
          </p>
          <Code lang="bash">{`racecar service stop
racecar service start`}</Code>
          <MonoLabel>2 · The sensors</MonoLabel>
          <Code lang="bash">{`source /opt/ros/humble/setup.bash && source ~/ros2_ws/install/setup.bash
ros2 topic hz /scan     # LiDAR, about 30 Hz
ros2 topic hz /camera   # camera, about 60 Hz`}</Code>
          <MonoLabel>3 · The dashboard</MonoLabel>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
            Open the health dashboard in a browser on the car&apos;s network. Every
            card should be green: sensors, drive pipeline, temperature. The
            addresses below are examples; yours might be slightly different,
            but will look similar.
          </p>
          <Code lang="bash">{`http://10.42.0.1:8080          # access point
http://192.168.10.100:8080     # cudy router`}</Code>
          <div style={{ marginTop: 18 }}>
            <DataTable
              columns={[
                { key: 'what', label: 'Where things live', accent: true },
                { key: 'where', label: 'Address', mono: true },
              ]}
              rows={[
                { what: 'Health dashboard', where: ':8080' },
                { what: 'JupyterLab (write code here next)', where: ':8888' },
                { what: 'Driver logs', where: 'racecar service logs' },
              ]}
            />
          </div>
          <Callout type="tip" title="The install is done">
            If the LiDAR takes a minute to appear after a cold boot, that is
            normal: the sensor boots its own controller before it starts
            streaming. When all three checks pass, one step remains: give the
            car its own network.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── The car's own network ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            THE CAR'S OWN <Red>NETWORK</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            So far the car has been borrowing your network. One command, run at
            the console, sets up both of its permanent ones in one pass: its own
            access point (<code style={{ fontFamily: NB.monoFont }}>neoracer-1</code>{' '}
            at <code style={{ fontFamily: NB.monoFont }}>10.42.0.1</code>) and the
            fixed address for the cudy router
            (<code style={{ fontFamily: NB.monoFont }}>192.168.10.100</code>).
          </p>
          <Code lang="bash">{`racecar setup networking     # at the console`}</Code>
          <Callout type="warn" title="This takes the car off your Wi-Fi">
            The command claims the Wi-Fi radio for the access point, so the
            car&apos;s connection to your network (and any Wi-Fi SSH session)
            drops the moment it runs. That is the point: from here the car makes
            its own network. Run it at the console, not over Wi-Fi.
          </Callout>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Then connect from your laptop: join{' '}
            <code style={{ fontFamily: NB.monoFont }}>neoracer-1</code> (password{' '}
            <code style={{ fontFamily: NB.monoFont }}>neobotics</code>) and{' '}
            <code style={{ fontFamily: NB.monoFont }}>ssh racecar@10.42.0.1</code>,
            or join the cudy router&apos;s Wi-Fi and use{' '}
            <code style={{ fontFamily: NB.monoFont }}>192.168.10.100</code>. The
            monitor and keyboard are no longer needed. Day-to-day connections,
            RustDesk, and the router details live on{' '}
            <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</Link>.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Connect to the car', href: '/docs/getting-started/connect-to-car' }}
        next={{ label: 'Remote desktop', href: '/docs/getting-started/remote-desktop' }}
      />
    </DocsShell>
  );
}
