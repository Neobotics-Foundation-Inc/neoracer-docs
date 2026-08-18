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
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Mapping (SLAM) · Software · NeoRacer Docs',
  description:
    'Build a 2D occupancy map of a room with racecar mapping. Drive the car under RC while slam_toolbox, gmapping, or Cartographer fuse the LiDAR and odometry, watch the map form in RViz, and save it for navigation.',
};

export default function MappingPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/networking' },
          { label: 'Mapping (SLAM)' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="MAP" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              BUILD A <Red>MAP</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              Drive the car slowly around a room and{' '}
              <InfoNote term="SLAM" title="SLAM">
                Simultaneous Localization and Mapping. The car builds a map of an unknown space while tracking where it is inside that same map, using the LiDAR and wheel odometry together.
              </InfoNote>{' '}
              turns the LiDAR sweeps and wheel odometry into a 2D occupancy grid.
              Three backends ship on the car: pick one, watch the map form in{' '}
              <InfoNote term="RViz" title="RViz">
                ROS 2's 3D visualizer. It shows the live map, the laser scan, the robot model, and its path as they update.
              </InfoNote>, then save it for navigation.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">slam_toolbox</ChromeBadge>
              <ChromeBadge variant="outline">gmapping</ChromeBadge>
              <ChromeBadge variant="outline">Cartographer</ChromeBadge>
              <ChromeBadge variant="outline">0.05 m/pixel grid</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · before you map ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHAT HAS TO BE <Red>RUNNING</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Mapping is an activity, not a service. It runs in the foreground
              on top of two things that have to be up first, and{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar mapping</code>{' '}
              warns you if either is missing.
            </p>
            <DashList
              items={[
                <>
                  <strong>The driver.</strong> It publishes{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/scan</code> and{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/odom</code>,
                  which is what SLAM consumes. It starts at boot, so this is
                  usually already true. Leave it running; do not stop the services.
                </>,
                <>
                  <strong>The autonomy base.</strong> The transform tree comes
                  from here. It is not a service yet, so start it in a terminal
                  of its own and leave it there. See{' '}
                  <Link href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>File system</Link>.
                </>,
                <>
                  <strong>A bounded indoor space</strong> with walls the LiDAR
                  can see. Glass and mirrors read as gaps, so keep them out of
                  the run.
                </>,
                <>
                  <strong>The transmitter in your hands</strong>, SWB up
                  (manual). You drive; SLAM only watches.
                </>,
              ]}
            />
            <Code lang="bash">{`# terminal 1: the autonomy base. Leave this running.
bash ~/ros2_ws/src/neoracer_ros2_driver/scripts/launch_autonomy.sh`}</Code>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · backends ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              START <Red>MAPPING</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              One command, in a second terminal. It runs in the foreground until
              you Ctrl-C it. With no backend named you get slam_toolbox.
            </p>
            <Code lang="bash">{`# terminal 2: the mapper. Ctrl-C when the map is complete.
racecar mapping                  # slam_toolbox, the default
racecar mapping gmapping
racecar mapping cartographer`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'name', label: 'Backend', accent: true, mono: true },
                  { key: 'good', label: 'Good for' },
                ]}
                rows={[
                  { name: 'slam_toolbox', good: 'The default. Solid pose-graph SLAM, easy to resume and refine.' },
                  { name: 'gmapping', good: 'Classic particle-filter SLAM. Light and familiar.' },
                  { name: 'cartographer', good: 'Loop-closure heavy, good on larger or repetitive spaces.' },
                ]}
              />
            </div>
            <Callout type="note" title="One mapper at a time">
              Start one backend, not three. They all publish the same map, so
              running two at once gives you neither.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · watch it build ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WATCH IT IN <Red>RVIZ</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              A third terminal opens the vendor&apos;s pre-configured mapping
              view, fixed frame already set to{' '}
              <code style={{ fontFamily: NB.monoFont }}>map</code>. As you drive,
              the occupancy grid fills in around the car.
            </p>
            <Code lang="bash">{`# terminal 3: the view
racecar mapping rviz
racecar mapping rviz cartographer    # Cartographer has its own debug view`}</Code>
            <Callout type="warn" title="This one needs a screen">
              RViz has to draw somewhere, so run it from the car&apos;s desktop
              over{' '}
              <Link href="/docs/software/remote-desktop" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>remote desktop</Link>{' '}
              or a monitor. Over plain SSH it refuses to start and tells you so.
            </Callout>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginTop: 20 }}>
              <NumberedFeatureCard n={1} title="The grid" lede="Free space, walls, unknown." body="Occupied cells trace the walls the LiDAR has seen; clear cells are open floor; grey is still unknown. Resolution is 0.05 m per pixel." />
              <NumberedFeatureCard n={2} title="The scan" lede="Live LaserScan over the map." body="The current LiDAR return overlays the grid, so you can see the match between what the car sees now and what it has mapped." />
              <NumberedFeatureCard n={3} title="The path" lede="Where the car has been." body="The odometry path and robot model show the trajectory. Slow, overlapping passes give the scan matcher the most to lock onto." />
            </div>
            <Callout type="tip" title="Map the edges first">
              Run the perimeter of the space before crossing the middle. A closed
              outer wall gives the backend a strong frame to fit everything else
              into, and it makes loop closure cleaner on Cartographer.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · save ───────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              SAVE THE <Red>MAP</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              With the mapper still running and the space covered, save from
              another terminal. The same command works whichever backend you
              used. Name the map and that name is what you drive later.
            </p>
            <Code lang="bash">{`racecar mapping save lab      # -> lab.pgm + lab.yaml
racecar mapping save          # no name given: saves as "map"`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              You get an image and a metadata file in the vendor workspace, at{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/osracer_ws/src/osracer/osracer_slam/maps/</code>.
              That pair is what{' '}
              <Link href="/docs/software/navigation" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Nav2</Link>{' '}
              loads, and the save prints the exact command to drive it.
            </p>
            <Callout type="note" title="Save before you stop the mapper">
              The map only exists in the running node until you save it. Save
              first, then <code style={{ fontFamily: NB.monoFont }}>Ctrl+C</code> the
              mapper. If you stop early, drive it again.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Firmware flashing', href: '/docs/software/firmware-flashing' }}
        next={{ label: 'Navigation (Nav2)', href: '/docs/software/navigation' }}
      />
    </DocsShell>
  );
}
