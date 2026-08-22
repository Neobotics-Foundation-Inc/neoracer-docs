import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'racecar CLI · API Reference · NeoRacer Docs',
  description:
    'Every racecar subcommand on the car: service, status, ws, teleop, mapping, navigation, build, launch, setup, library, compile, update, cleanup and selftest. racecar help prints the same list on the car.',
};

export default function CliReferencePage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'racecar CLI' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="CLI" top={-30} right={-20} size={440} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE RACECAR <Red>COMMAND</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar</code>{' '}
              is a shell function the driver installs into every terminal. It is
              the front door to every operational task on the car, so you rarely
              need to touch{' '}
              <code style={{ fontFamily: NB.monoFont }}>systemctl</code>,{' '}
              <code style={{ fontFamily: NB.monoFont }}>colcon</code> or a raw{' '}
              <code style={{ fontFamily: NB.monoFont }}>ros2 launch</code> line.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">racecar help</ChromeBadge>
              <ChromeBadge variant="outline">installed by the driver</ChromeBadge>
              <ChromeBadge variant="outline">runs on the car</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · At a glance ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              EVERY <Red>COMMAND</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>racecar help</code> prints
              this same list on the car, and most subcommands take{' '}
              <code style={{ fontFamily: NB.monoFont }}>--help</code> of their own.
              Extra arguments are forwarded, so{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar teleop camera_enable:=false</code>{' '}
              works.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'cmd', label: 'Command', accent: true, mono: true },
                  { key: 'what', label: 'What it does' },
                ]}
                rows={[
                  { cmd: 'service', what: 'Install, start, stop, enable and tail the systemd units.' },
                  { cmd: 'status', what: 'USB peripherals, /dev/osrbot_* symlinks, and running ROS 2 nodes.' },
                  { cmd: 'mapping', what: 'Start SLAM, save a map, or open the mapping RViz view.' },
                  { cmd: 'navigation', what: 'Start Nav2 on a saved map, or open the goal-setting RViz view.' },
                  { cmd: 'teleop', what: 'Run the driver stack in the foreground instead of as a service.' },
                  { cmd: 'ws', what: 'Switch this terminal between the neoracer and osracer workspaces.' },
                  { cmd: 'launch', what: 'Shortcut for ros2 launch neoracer_ros2_driver <name>.launch.py.' },
                  { cmd: 'build', what: 'Build the driver with --symlink-install and source the overlay.' },
                  { cmd: 'test', what: 'Run the driver package test suite.' },
                  { cmd: 'source', what: 'Source the workspace overlay into the current shell.' },
                  { cmd: 'cd', what: 'Change directory to the driver package root.' },
                  { cmd: 'setup', what: 'Run a setup phase: all, ml, networking, and the rest.' },
                  { cmd: 'library', what: 'Choose which racecar-neo-library copy Python imports.' },
                  { cmd: 'update', what: 'Field update: repo to latest main, full setup, restart services.' },
                  { cmd: 'compile', what: 'Export a YOLO .pt to a TensorRT .engine for the inference node.' },
                  { cmd: 'udev', what: 'Re-install the udev rules that create /dev/osrbot_*.' },
                  { cmd: 'watchdog', what: 'Run the node restart supervisor in the foreground.' },
                  { cmd: 'cleanup', what: 'List orphaned processes and shared-memory segments. Dry run by default.' },
                  { cmd: 'selftest', what: 'Hardware self-tests. Currently the LED matrix.' },
                  { cmd: 'clear --led', what: 'Clear the 8x8 LED matrix display.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · service ────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RACECAR <Red>SERVICE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Four{' '}
              <InfoNote term="systemd units" title="systemd service">
                A background program Linux starts and supervises automatically.
                It comes up on its own at boot and restarts if it crashes.
              </InfoNote>{' '}
              make up the core stack and all four are enabled at boot. With no
              unit named, these actions apply to all of them.
            </p>
            <Code lang="bash">{`racecar service status       # active + enabled for every unit
racecar service stop         # the core stack
racecar service start
racecar service restart      # every ENABLED unit; never starts a disabled one
racecar service logs         # journalctl -f, defaults to teleop
racecar service logs jupyter # or name one`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'svc', label: 'Unit', accent: true, mono: true },
                  { key: 'what', label: 'What it runs' },
                ]}
                rows={[
                  { svc: 'neoracer-teleop', what: 'The driver stack. Every topic on the car comes from here.' },
                  { svc: 'neoracer-watchdog', what: 'Supervises the driver nodes and restarts a dead one.' },
                  { svc: 'neoracer-dashboard', what: 'The health dashboard on port 8080.' },
                  { svc: 'neoracer-jupyter', what: 'JupyterLab on port 8888, serving ~/jupyter_ws.' },
                ]}
              />
            </div>

            <div style={{ marginTop: 26 }}>
              <MonoLabel>Lab dashboards</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Five more units install <strong>disabled</strong> and are started
                for a session when you want one. Each holds the camera or the GPU
                for its whole run, so run one at a time.
              </p>
              <Code lang="bash">{`racecar service start camlabel     # 8082
# also: wallfollow 8081, pursuit 8083, eps 8084, smartfollow 8085`}</Code>
            </div>

            <Callout type="warn" title="A fifth unit is held back">
              <code style={{ fontFamily: NB.monoFont }}>neoracer-autonomy</code>{' '}
              exists in the driver repo but setup deliberately does not install
              it, and removes it from a car that has it from an earlier run. It
              is the layer that would publish the transform tree at boot, so on
              a shipped car nothing publishes{' '}
              <code style={{ fontFamily: NB.monoFont }}>/tf</code> or{' '}
              <code style={{ fontFamily: NB.monoFont }}>/robot_description</code>.
              Everything else on this page is unaffected.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · autonomy commands, parked ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              MAPPING AND <Red>NAVIGATION</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>racecar mapping</code> and{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar navigation</code>{' '}
              exist in the CLI, but they depend on the autonomy layer above, and
              that is not installed on a shipped car. Both need its transform
              tree, and navigation also needs its bridge from Nav2 to the motors.
            </p>
            <Callout type="warn" title="They start without complaining">
              Neither command refuses to run. They print a warning that the
              autonomy base is missing and then launch anyway, so SLAM comes up
              and quietly produces nothing, and Nav2 plans a route the car never
              drives. Treat the warning as a stop sign.
            </Callout>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              Full pages for both are written and will go live with the autonomy
              unit.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · status, ws, teleop, launch ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RUNNING AND <Red>INSPECTING</Red>
            </DisplayHeading>

            <MonoLabel>racecar status</MonoLabel>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
              USB peripherals, the{' '}
              <code style={{ fontFamily: NB.monoFont }}>/dev/osrbot_*</code>{' '}
              symlinks udev creates, and the ROS 2 nodes currently running, in
              one output. That pairing is what makes it useful when something is
              missing: a device with no symlink is unplugged or unpowered, a
              symlink with no node is a software problem.
            </p>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>racecar teleop</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Runs the same stack the{' '}
                <code style={{ fontFamily: NB.monoFont }}>neoracer-teleop</code>{' '}
                service runs, in the foreground, with a timestamped log
                directory. Stop the service first or the two fight over the
                hardware. Subsystems can be switched off individually.
              </p>
              <Code lang="bash">{`racecar service stop
racecar teleop                        # Ctrl-C, then: racecar service start
racecar teleop camera_enable:=false   # also: lidar_, led_matrix_, inference_`}</Code>
            </div>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>racecar launch</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                One subsystem on its own, for bench work.
              </p>
              <Code lang="bash">{`racecar launch lidar
racecar launch camera
racecar launch led_matrix`}</Code>
            </div>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>racecar ws</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Swaps which workspace this one terminal uses, for poking at
                vendor packages by hand. Mapping and navigation do not need it.
                See{' '}
                <Link href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>File system</Link>.
              </p>
              <Code lang="bash">{`racecar ws            # which one am I on?
racecar ws osracer
racecar ws neoracer`}</Code>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · setup + library + update ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              SETUP AND <Red>MAINTENANCE</Red>
            </DisplayHeading>

            <MonoLabel>racecar setup networking</MonoLabel>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
              Configures the access point, the fixed Ethernet address, and the
              lidar link. Flag values persist to{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/.config/racecar/networking.env</code>,
              so a setting survives reboots. Picking a network and walking through either
              setup is on{' '}
              <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</Link>.
            </p>
            <Code lang="bash">{`racecar setup networking --ssid=neoracer-2
racecar setup networking --show
racecar setup networking --reset

racecar setup all        # the full orchestrator, as run on a fresh car
racecar setup ml         # the GPU stack: PyTorch for Tegra, Ultralytics, ONNX`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'flag', label: 'Flag', accent: true, mono: true },
                  { key: 'sets', label: 'Sets' },
                  { key: 'def', label: 'Default', mono: true },
                ]}
                rows={[
                  { flag: '--ssid', sets: 'Access point name', def: 'neoracer-1' },
                  { flag: '--psk', sets: 'Access point password', def: 'neobotics' },
                  { flag: '--channel', sets: 'Access point 2.4 GHz channel', def: '6' },
                  { flag: '--ap-addr', sets: "The car's address on the access point", def: '10.42.0.1/24' },
                  { flag: '--eth-static', sets: "The car's fixed address on the cudy", def: '192.168.10.100/24' },
                  { flag: '--lidar-host', sets: 'Host address on the lidar link', def: '192.168.8.1/24' },
                  { flag: '--wifi-iface', sets: 'Wi-Fi interface name', def: 'wlP1p1s0' },
                  { flag: '--eth-iface', sets: 'Ethernet interface name', def: 'nr_eth0' },
                ]}
              />
            </div>
            <Callout type="warn" title="Run networking from a wired session">
              The command takes over the Wi-Fi radio, so an SSH session over
              Wi-Fi drops the moment it runs. Use a monitor and keyboard at the
              car, the USB cable link, or SSH over the cudy&apos;s wired side.
            </Callout>

            <div style={{ marginTop: 26 }}>
              <MonoLabel>racecar library</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Manages the{' '}
                <code style={{ fontFamily: NB.monoFont }}>racecar_student.pth</code>{' '}
                file, which is what makes{' '}
                <code style={{ fontFamily: NB.monoFont }}>import racecar_core</code>{' '}
                work. Only relevant if you keep more than one copy of the
                library. See{' '}
                <Link href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>File system</Link>.
              </p>
              <Code lang="bash">{`racecar library --status           # which copy is active
racecar library --list             # valid folders in ~/jupyter_ws
racecar library --select my-fork   # point at ~/jupyter_ws/my-fork/library
racecar library --reset`}</Code>
            </div>

            <div style={{ marginTop: 26 }}>
              <MonoLabel>racecar update</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Field update in one command: the driver repo to latest{' '}
                <code style={{ fontFamily: NB.monoFont }}>origin/main</code>, a
                full setup run, then a restart of whatever was already enabled.
                Needs internet, so put the car on a network first.
              </p>
              <Code lang="bash">{`racecar update
racecar source     # or open a new terminal, so the shell picks up the new tool`}</Code>
              <Callout type="warn" title="It discards local edits to the driver repo">
                The update does a hard reset onto{' '}
                <code style={{ fontFamily: NB.monoFont }}>origin/main</code>. If
                you have been editing files inside the driver repo on the car,
                commit or copy them out first.
              </Callout>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 TF frames', href: '/docs/api-reference/ros2/tf-frames' }}
        next={{ label: 'Software · File system', href: '/docs/software/workspaces' }}
      />
    </DocsShell>
  );
}
