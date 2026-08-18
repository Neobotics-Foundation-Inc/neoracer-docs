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
    'Every racecar subcommand on the car: service, ws, status, teleop, library, and setup networking. What each one does, when you need it, and what it changes.',
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
              is a shell wrapper the driver installs. It is the front door to
              every operational task on the car, so you rarely need to touch{' '}
              <code style={{ fontFamily: NB.monoFont }}>systemctl</code> or a raw{' '}
              <code style={{ fontFamily: NB.monoFont }}>ros2 launch</code> line.
              It is on the path in every new terminal.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">6 subcommands</ChromeBadge>
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
              AT A <Red>GLANCE</Red>
            </DisplayHeading>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'cmd', label: 'Command', accent: true, mono: true },
                  { key: 'what', label: 'What it does' },
                  { key: 'when', label: 'When you need it' },
                ]}
                rows={[
                  { cmd: 'racecar service', what: 'Start, stop, inspect and tail the four systemd services.', when: 'Checking the car is healthy, or freeing the hardware for the osracer stack.' },
                  { cmd: 'racecar status', what: 'Prints the running nodes and the /dev/osrbot_* device symlinks.', when: 'A sensor is missing and you want to know whether it is the USB or the node.' },
                  { cmd: 'racecar ws', what: 'Switches the current terminal between the neoracer and osracer workspaces.', when: 'Mapping and Navigation, which live in the osracer workspace.' },
                  { cmd: 'racecar teleop', what: 'Runs the driver stack in the foreground instead of as a service.', when: 'Debugging, when you want the launch output in front of you.' },
                  { cmd: 'racecar library', what: 'Selects which copy of racecar-neo-library Python imports.', when: 'You keep a fork of the library alongside the shipped one.' },
                  { cmd: 'racecar setup networking', what: "Configures the access point, the fixed Ethernet address, and the lidar link.", when: 'Renaming a car, or rebuilding its networks after a re-flash.' },
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
              <InfoNote term="systemd services" title="systemd service">
                A background program Linux starts and supervises automatically.
                It comes up on its own at boot and restarts if it crashes.
              </InfoNote>{' '}
              start at boot and this wraps all four at once.
            </p>
            <Code lang="bash">{`racecar service status     # all four, with their state
racecar service stop       # hand the hardware to something else
racecar service start      # give it back
racecar service restart    # stop then start
racecar service logs       # tail the journal for all four`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'svc', label: 'Service', accent: true, mono: true },
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
            <Callout type="note" title="Stop the services before the osracer stack">
              Both stacks talk to the same hardware, so they cannot run at once.{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar service stop</code>{' '}
              is the first line of the osracer bringup on{' '}
              <Link href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Workspaces</Link>.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · status ─────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RACECAR <Red>STATUS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Two things in one output: the ROS 2 nodes currently running, and
              the <code style={{ fontFamily: NB.monoFont }}>/dev/osrbot_*</code>{' '}
              symlinks that udev creates for the OSCORE board, the camera and the
              LiDAR. That pairing is what makes it useful when something is
              missing. A device with no symlink is unplugged or unpowered; a
              symlink with no node is a software problem.
            </p>
            <Code lang="bash">{`racecar status`}</Code>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · ws ─────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RACECAR <Red>WS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The car carries two ROS 2 workspaces and each terminal uses one at
              a time. The switch applies to the current terminal only, and new
              terminals always start on neoracer.
            </p>
            <Code lang="bash">{`racecar ws osracer      # SLAM and Nav2 live here
racecar ws neoracer     # back to the default`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 14 }}>
              What each workspace holds is on{' '}
              <Link href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Workspaces</Link>.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · teleop + library ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              TELEOP AND <Red>LIBRARY</Red>
            </DisplayHeading>
            <MonoLabel>racecar teleop</MonoLabel>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
              Runs the same driver stack the{' '}
              <code style={{ fontFamily: NB.monoFont }}>neoracer-teleop</code>{' '}
              service runs, but in the foreground so you can watch the launch
              output. Stop the service first or the two will fight over the
              hardware. Day to day you do not need this, because the service is
              already running.
            </p>
            <Code lang="bash">{`racecar service stop
racecar teleop           # Ctrl-C to quit, then: racecar service start`}</Code>

            <div style={{ marginTop: 26 }}>
              <MonoLabel>racecar library</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Chooses which copy of{' '}
                <code style={{ fontFamily: NB.monoFont }}>racecar-neo-library</code>{' '}
                Python imports, by rewriting the{' '}
                <code style={{ fontFamily: NB.monoFont }}>racecar_student.pth</code>{' '}
                file. Only relevant if you keep a second copy, such as a fork you
                are developing. See{' '}
                <Link href="/docs/software/jupyterlab" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>JupyterLab</Link>.
              </p>
              <Code lang="bash">{`racecar library --select`}</Code>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 06 · setup networking ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="06" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RACECAR SETUP <Red>NETWORKING</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Configures the car&apos;s side of the network: the access point,
              the fixed Ethernet address, and the lidar link. Run with no flags
              it applies the defaults. Every flag value is saved to{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/.config/racecar/networking.env</code>,
              so a setting survives reboots and later runs. The flag table and
              the full explanation are on{' '}
              <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</Link>.
            </p>
            <Code lang="bash">{`racecar setup networking --ssid=neoracer-2   # rename the access point
racecar setup networking --show              # print the saved settings
racecar setup networking --reset             # back to the defaults`}</Code>
            <Callout type="warn" title="Run it from a wired session">
              The command takes over the Wi-Fi radio, so an SSH session over
              Wi-Fi drops the moment it runs. Use a monitor and keyboard at the
              car, the USB cable link, or SSH over the cudy&apos;s wired side.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 TF frames', href: '/docs/api-reference/ros2/tf-frames' }}
        next={{ label: 'Software · JupyterLab', href: '/docs/software/jupyterlab' }}
      />
    </DocsShell>
  );
}
