import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  StepMarker,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, Callout, Code, PrevNext, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Workspaces · Software · NeoRacer Docs',
  description:
    'The car carries two ROS 2 workspaces: the neoracer driver (default) and the osracer SLAM/Nav2 stack. racecar ws switches the current terminal between them.',
};

export default function WorkspacesPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Software', href: '/docs/software/os-and-image' },
          { label: 'Workspaces' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="WS" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SOFTWARE / WORKSPACES</Eyebrow>
            <DisplayHeading size="xl">
              THE TWO <Red>WORKSPACES.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The car carries two ROS 2 workspaces, and each terminal uses one
              at a time.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · What they are ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={1} label="WHAT THEY ARE" />
            <DisplayHeading size="lg">
              NEORACER AND <Red>OSRACER.</Red>
            </DisplayHeading>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'k', label: '', accent: true },
                  { key: 'neo', label: 'neoracer (default)', mono: true },
                  { key: 'os', label: 'osracer', mono: true },
                ]}
                rows={[
                  { k: 'Path', neo: '~/ros2_ws', os: '~/osracer_ws' },
                  { k: 'What it runs', neo: 'The driver, the services, rc.* programs', os: 'SLAM (mapping) and Nav2 (navigation)' },
                  { k: 'Used on', neo: 'Every page of these docs unless said otherwise', os: 'Mapping and Navigation' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Switching ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={2} label="SWITCHING" />
            <DisplayHeading size="lg">
              SWITCH WITH <Red>RACECAR WS.</Red>
            </DisplayHeading>
            <Code lang="bash">{`racecar ws osracer      # this terminal now uses the osracer workspace
racecar ws neoracer     # back to the default`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The switch applies to the current terminal only. New terminals
              start on neoracer.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Running the other stack ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={3} label="RUNNING THE OSRACER STACK" />
            <DisplayHeading size="lg">
              ONE STACK AT A <Red>TIME.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Both stacks talk to the same hardware, so stop the services first.
              Then launch the osracer bringup, which starts the base the stack
              needs (chassis, LiDAR, robot description) and stays running while
              you use it. Mapping and Navigation launches run in a second
              terminal on top of it.
            </p>
            <Code lang="bash">{`# terminal 1: the base. Leave this running.
racecar service stop
racecar ws osracer
ros2 launch osracer_bringup bringup.launch.py

# terminal 2: mapping or navigation, from those pages
racecar ws osracer
ros2 launch osracer_slam slam_toolbox.launch.py

# when you are done: Ctrl-C both, then
racecar service start`}</Code>
            <Callout type="note" title="The LiDAR driver is shared">
              Both workspaces build from one LiDAR driver source, so a fix there
              lands in both.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS2 driver', href: '/docs/software/ros2-driver' }}
        next={{ label: 'Networking', href: '/docs/software/networking' }}
      />
    </DocsShell>
  );
}
