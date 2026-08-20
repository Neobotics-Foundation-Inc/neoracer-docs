import Link from 'next/link';
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
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Setup · CLI · NeoRacer Docs',
  description:
    'racecar setup, library and update: configure networking, choose the Python library copy, and field-update the driver.',
};

export default function CliSetupPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'CLI', href: '/docs/api-reference/cli' },
          { label: 'Setup' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="CLI" top={-30} right={-20} size={440} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              SETUP AND <Red>MAINTENANCE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              These commands configure the car and keep the driver current.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
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
        prev={{ label: 'Running', href: '/docs/api-reference/cli/running' }}
        next={{ label: 'ROS 2 topics', href: '/docs/api-reference/ros2/topics' }}
      />
    </DocsShell>
  );
}
