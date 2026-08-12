import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
  DashList,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Navigation (Nav2) · Software · NeoRacer Docs',
  description:
    'Give the NeoRacer a goal on a saved map and let Nav2 drive it there. Localize with AMCL, choose the DWB or TEB planner, and set goals in RViz.',
};

export default function NavigationPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/os-and-image' },
          { label: 'Navigation (Nav2)' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="NAV" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              AUTONOMOUS <Red>NAVIGATION</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              With a saved map, <InfoNote term="Nav2" title="Nav2">The ROS 2 navigation stack. It plans a route across a known map, then drives the car along it while dodging what the LiDAR sees.</InfoNote>{' '}
              turns a click in RViz into a drive. It localizes the car on the map
              with <InfoNote term="AMCL" title="AMCL">Adaptive Monte Carlo Localization. A particle filter that figures out where the car is on the saved map by matching the live LiDAR scan against it.</InfoNote>,
              plans a path to your goal, and follows it while avoiding obstacles.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Nav2</ChromeBadge>
              <ChromeBadge variant="outline">AMCL localization</ChromeBadge>
              <ChromeBadge variant="outline">DWB / TEB planners</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="The osracer base runs underneath this">
          Navigation runs on the osracer stack, so its bringup comes first:
          stop the services, switch workspaces, and leave the bringup running
          in its own terminal. The full sequence is on{' '}
          <a href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Workspaces</a>.
          <Code lang="bash">{`racecar service stop
racecar ws osracer
ros2 launch osracer_bringup bringup.launch.py`}</Code>
        </Callout>
      </ScrollReveal>

      {/* ── 01 · prerequisites ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            YOU NEED A <Red>MAP</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>A saved <code style={{ fontFamily: NB.monoFont }}>map.pgm</code> + <code style={{ fontFamily: NB.monoFont }}>map.yaml</code> from <Link href="/docs/software/mapping" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Mapping</Link>.</>,
              <>The driver running on the car (<code style={{ fontFamily: NB.monoFont }}>teleop</code>).</>,
              <>RC ready as your override: keep the transmitter in reach and flip <code style={{ fontFamily: NB.monoFont }}>SWB</code> up (manual) the instant you need to take over.</>,
            ]}
          />
          <Callout type="warn" title="Autonomous means hands near the switch">
            Once Nav2 has control the car drives itself. Give it room, keep people
            and pets clear, and stay ready on the{' '}
            <Link href="/docs/hardware/remote-control" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>transmitter</Link>{' '}
            so flipping SWB up puts you back in manual control.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── 02 · planners ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              DWB OR <Red>TEB</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              One launch brings up the whole stack: map server, AMCL, planner, and
              controller. Pick the local planner with the{' '}
              <code style={{ fontFamily: NB.monoFont }}>planner</code> argument.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'p', label: 'Planner', accent: true, mono: true },
                  { key: 'feel', label: 'How it drives' },
                ]}
                rows={[
                  { p: 'dwb', feel: 'Dynamic Window. Steady and predictable, a good default.' },
                  { p: 'teb', feel: 'Timed Elastic Band. Smoother curves, better in tight, cluttered space.' },
                ]}
              />
            </div>
            <div style={{ marginTop: 18 }}>
              <MonoLabel>DWB</MonoLabel>
              <Code lang="bash">{`racecar ws osracer      # switch this shell to the vendor workspace
ros2 launch osracer_navigation nav2.launch.py planner:=dwb`}</Code>
            </div>
            <div style={{ marginTop: 14 }}>
              <MonoLabel>TEB</MonoLabel>
              <Code lang="bash">{`racecar ws osracer      # switch this shell to the vendor workspace
ros2 launch osracer_navigation nav2.launch.py planner:=teb`}</Code>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · set a goal ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            SET A <Red>GOAL</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Nav2 opens RViz with the map loaded and a Navigation 2 panel. First
            tell it roughly where the car is, then tell it where to go.
          </p>
          <div style={{ marginTop: 8 }}>
            {[
              { t: 'Set the starting pose.', d: <>Use <strong>2D Pose Estimate</strong> and drag an arrow where the car actually sits, pointing the way it faces. The AMCL particle cloud tightens around the car as the scan matches the map.</> },
              { t: 'Drop a goal.', d: <>Use <strong>Nav2 Goal</strong> and drag an arrow at the destination, with the arrow giving the heading to arrive on. Nav2 plans a path and the car starts driving.</> },
              { t: 'Watch the run.', d: <>The Navigation 2 panel reports <code style={{ fontFamily: NB.monoFont }}>Localization</code>, <code style={{ fontFamily: NB.monoFont }}>Distance remaining</code>, <code style={{ fontFamily: NB.monoFont }}>Time taken</code>, and <code style={{ fontFamily: NB.monoFont }}>Recoveries</code>. Feedback reads <code style={{ fontFamily: NB.monoFont }}>reached</code> when it arrives.</> },
            ].map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: 14, padding: '16px 0', borderBottom: `1px solid ${NB.borderOnBeige}` }}>
                <div style={{ fontFamily: NB.headingFont, fontSize: 28, fontWeight: 900, lineHeight: 1, color: NB.neoboticsRed }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div style={{ fontFamily: NB.headingFont, fontSize: 18, fontWeight: 700, color: NB.textOnBeige, marginBottom: 3 }}>{s.t}</div>
                  <p style={{ fontFamily: NB.bodyFont, fontSize: 15, lineHeight: 1.6, color: NB.textMutedBeige, margin: 0 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <Callout type="tip" title="Recoveries climbing? Re-seed the pose.">
            If the car spins, stalls, or the recovery count keeps rising, its
            localization has drifted. Drop a fresh{' '}
            <strong>2D Pose Estimate</strong> where the car really is and let the
            particle cloud re-converge before sending the next goal.
          </Callout>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Mapping (SLAM)', href: '/docs/software/mapping' }}
        next={{ label: '3D model', href: '/docs/software/robot-model' }}
      />
    </DocsShell>
  );
}
