import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ComingSoon,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Running · CLI · NeoRacer Docs',
  description:
    'racecar status, teleop, launch and ws: inspect the hardware, run the stack in the foreground, launch one subsystem, or switch workspaces.',
};

export default function CliRunningPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'CLI', href: '/docs/api-reference/cli' },
          { label: 'Running' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="11" top={-30} right={-20} size={440} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RUNNING AND <Red>INSPECTING</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              These commands run the stack by hand and show what the car is doing.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>STATUS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>racecar status</code>{' '}
              shows the USB peripherals, the{' '}
              <code style={{ fontFamily: NB.monoFont }}>/dev/osrbot_*</code>{' '}
              symlinks, and the ROS 2 nodes currently running, in one output. A
              device with no symlink is unplugged or unpowered; a symlink with
              no node is a software problem.
            </p>
            <Code lang="bash">{`racecar status`}</Code>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>TELEOP</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>racecar teleop</code>{' '}
              runs the same stack the{' '}
              <code style={{ fontFamily: NB.monoFont }}>neoracer-teleop</code>{' '}
              service runs, in the foreground, with a timestamped log directory.
              Stop the{' '}
              <code style={{ fontFamily: NB.monoFont }}>neoracer-teleop</code>{' '}
              service first. Only one copy of the driver can run at a time.
              Subsystems can be switched off individually.
            </p>
            <Code lang="bash">{`racecar teleop                        # Ctrl-C, then: racecar service start
racecar teleop camera_enable:=false   # also: lidar_, led_matrix_, inference_`}</Code>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>LAUNCH</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>racecar launch</code>{' '}
              runs one subsystem on its own.
            </p>
            <Code lang="bash">{`racecar launch lidar
racecar launch camera
racecar launch led_matrix`}</Code>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>WS</Red>
            </DisplayHeading>
            <ComingSoon>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
                <code style={{ fontFamily: NB.monoFont }}>racecar ws</code>{' '}
                swaps which workspace this one terminal uses. See{' '}
                <Link href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>File system</Link>.
              </p>
              <Code lang="bash">{`racecar ws            # which one am I on?
racecar ws osracer
racecar ws neoracer`}</Code>
            </ComingSoon>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Services', href: '/docs/api-reference/cli/service' }}
        next={{ label: 'Setup', href: '/docs/api-reference/cli/setup' }}
      />
    </DocsShell>
  );
}
