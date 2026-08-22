import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
  NumberedSteps,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Navigation (Nav2) · Software · NeoRacer Docs',
  description:
    'Give the NeoRacer a goal on a saved map and let Nav2 drive it there. Start it with racecar navigation, localize with AMCL, pick the TEB or DWB planner, and set goals in RViz.',
};

export default function NavigationPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/networking' },
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
              <ChromeBadge variant="outline">TEB / DWB planners</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · prerequisites ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              YOU NEED A <Red>MAP</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Navigation runs in the foreground on the same footing as mapping:
              on top of the driver, which stays running, and the autonomy base.
            </p>
            <DashList
              items={[
                <>A saved map from <Link href="/docs/software/mapping" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Mapping</Link>. You drive it by the name you saved it under.</>,
                <>The driver up, as usual, for <code style={{ fontFamily: NB.monoFont }}>/scan</code> and <code style={{ fontFamily: NB.monoFont }}>/odom</code>.</>,
                <>The autonomy base running in its own terminal (see <Link href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>File system</Link>). It also carries the twist bridge, which is how Nav2 reaches the motors.</>,
                <>RC ready as your override: keep the transmitter in reach and flip <code style={{ fontFamily: NB.monoFont }}>SWB</code> up (manual) the instant you need to take over.</>,
              ]}
            />
            <Callout type="warn" title="Autonomous means hands near the switch">
              Once Nav2 has control the car drives itself. Give it room, keep people
              and pets clear, and stay ready on the{' '}
              <Link href="/docs/hardware/remote-control" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>transmitter</Link>{' '}
              so flipping SWB up puts you back in manual control.
            </Callout>
            <Callout type="note" title="Not at the same time as mapping">
              SLAM and Nav2 both publish the map-to-odom transform, so they
              cannot run together. Ctrl-C the mapper before you start
              navigation.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · planners ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              START <Red>NAV2</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              One command brings up the whole stack: map server, AMCL, planner
              and controller. The first argument picks the local planner and the
              second names the map. Both have defaults, so the bare command runs
              TEB on a map called{' '}
              <code style={{ fontFamily: NB.monoFont }}>map</code>.
            </p>
            <Code lang="bash">{`racecar navigation                # teb, on the map named "map"
racecar navigation lab            # teb, on the map named "lab"
racecar navigation dwb lab        # dwb, on the map named "lab"`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              Name a map that does not exist and it stops before launching
              anything, then lists the maps you do have.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'p', label: 'Planner', accent: true, mono: true },
                  { key: 'feel', label: 'How it drives' },
                ]}
                rows={[
                  { p: 'teb', feel: 'Timed Elastic Band. The default. Smoother curves, better in tight, cluttered space.' },
                  { p: 'dwb', feel: 'Dynamic Window. Steady and predictable; worth trying if TEB is fighting the car.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · set a goal ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              SET A <Red>GOAL</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The launch itself has no window. Open the goal-setting view in a
              second terminal, from the car&apos;s desktop rather than over SSH.
              First tell it roughly where the car is, then tell it where to go.
            </p>
            <Code lang="bash">{`racecar navigation rviz`}</Code>
            <NumberedSteps
              steps={[
                { title: 'Set the starting pose.', detail: <>Use <strong>2D Pose Estimate</strong> and drag an arrow where the car actually sits, pointing the way it faces. The AMCL particle cloud tightens around the car as the scan matches the map.</> },
                { title: 'Drop a goal.', detail: <>Use <strong>Nav2 Goal</strong> and drag an arrow at the destination, with the arrow giving the heading to arrive on. Nav2 plans a path and the car starts driving.</> },
                { title: 'Watch the run.', detail: <>The Navigation 2 panel reports <code style={{ fontFamily: NB.monoFont }}>Localization</code>, <code style={{ fontFamily: NB.monoFont }}>Distance remaining</code>, <code style={{ fontFamily: NB.monoFont }}>Time taken</code>, and <code style={{ fontFamily: NB.monoFont }}>Recoveries</code>. Feedback reads <code style={{ fontFamily: NB.monoFont }}>reached</code> when it arrives.</> },
              ]}
            />
            <Callout type="tip" title="Recoveries climbing? Re-seed the pose.">
              If the car spins, stalls, or the recovery count keeps rising, its
              localization has drifted. Drop a fresh{' '}
              <strong>2D Pose Estimate</strong> where the car really is and let the
              particle cloud re-converge before sending the next goal.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Mapping (SLAM)', href: '/docs/software/mapping' }}
        next={{ label: 'API reference', href: '/docs/api-reference/python/drive' }}
      />
    </DocsShell>
  );
}
