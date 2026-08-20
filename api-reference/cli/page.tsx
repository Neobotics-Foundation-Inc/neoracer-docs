import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Overview · CLI · NeoRacer Docs',
  description:
    'Every racecar subcommand on the car. racecar help prints the same list. Services, running and setup each have their own page.',
};

export default function CliOverviewPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'CLI', href: '/docs/api-reference/cli' },
          { label: 'Overview' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="09" top={-30} right={-20} size={440} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE RACECAR <Red>COMMAND</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar</code>{' '}
              is a shell function the driver installs into every terminal. It
              covers every operational task on the car, so you rarely need{' '}
              <code style={{ fontFamily: NB.monoFont }}>systemctl</code>,{' '}
              <code style={{ fontFamily: NB.monoFont }}>colcon</code> or a raw{' '}
              <code style={{ fontFamily: NB.monoFont }}>ros2 launch</code> line.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
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

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
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


      <PrevNext
        prev={{ label: 'racecar_utils', href: '/docs/api-reference/python/utils' }}
        next={{ label: 'Services', href: '/docs/api-reference/cli/service' }}
      />
    </DocsShell>
  );
}
