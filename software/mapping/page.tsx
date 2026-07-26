import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
  DashList,
  NumberedFeatureCard,
  StepMarker,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Mapping (SLAM) · Software · NeoRacer Docs',
  description:
    'Build a 2D occupancy map of a room with the NeoRacer. Drive it under RC while slam_toolbox, gmapping, or Cartographer fuse the LiDAR and odometry, watch the map form in RViz, and save it for navigation.',
};

export default function MappingPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Software', href: '/docs/software/os-and-image' },
          { label: 'Mapping (SLAM)' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="MAP" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SOFTWARE / MAPPING</Eyebrow>
            <DisplayHeading size="xl">
              BUILD A <Red>MAP.</Red>
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

      <ScrollReveal>
        <Callout type="note" title="The osracer base runs underneath this">
          Mapping runs on the osracer stack, so its bringup comes first: stop
          the services, switch workspaces, and leave the bringup running in its
          own terminal. The full sequence is on{' '}
          <a href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Workspaces</a>.
          <Code lang="bash">{`racecar service stop
racecar ws osracer
ros2 launch osracer_bringup bringup.launch.py`}</Code>
        </Callout>
      </ScrollReveal>

      {/* ── 01 · before you map ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <StepMarker n={1} label="BEFORE YOU MAP" />
          <DisplayHeading size="lg">
            DRIVE TO <Red>MAP.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Mapping runs on top of the live driver, and you build the map by
            driving the car yourself. Keep the transmitter in{' '}
            <Link href="/docs/hardware/remote-control" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>RC mode</Link>{' '}
            and take it slowly: smooth, steady passes let the scan matcher keep up.
          </p>
          <div style={{ marginTop: 8 }}>
            <DashList
              items={[
                <>The driver is up on the car (start it with <code style={{ fontFamily: NB.monoFont }}>teleop</code>, see <Link href="/docs/software/ros2-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>ROS 2 driver</Link>).</>,
                <>You can reach the car&apos;s ROS graph from your laptop (see <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</Link>).</>,
                <>A bounded indoor space with walls the LiDAR can see. Glass and mirrors read as gaps, so keep them out of the run.</>,
                <>SWB up (manual), so you stay on the sticks while SLAM runs.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · backends ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={2} label="PICK A BACKEND" />
            <DisplayHeading size="lg">
              THREE WAYS TO <Red>MAP.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Each backend runs in its own terminal, with a second terminal that
              opens RViz so you can watch. Start one mapper, not three.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'name', label: 'Backend', accent: true, mono: true },
                  { key: 'good', label: 'Good for' },
                ]}
                rows={[
                  { name: 'slam_toolbox', good: 'The default. Solid pose-graph SLAM, easy to resume and refine.' },
                  { name: 'gmapping', good: 'Classic particle-filter SLAM. Light and familiar.' },
                  { name: 'Cartographer', good: 'Loop-closure heavy, good on larger or repetitive spaces.' },
                ]}
              />
            </div>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>slam_toolbox</MonoLabel>
              <Code lang="bash">{`racecar ws osracer      # switch this shell to the vendor workspace
ros2 launch osracer_slam slam_toolbox.launch.py      # terminal 1
ros2 launch osracer_debug debug_mapping.launch.py    # terminal 2 (RViz)`}</Code>
            </div>
            <div style={{ marginTop: 16 }}>
              <MonoLabel>gmapping</MonoLabel>
              <Code lang="bash">{`racecar ws osracer      # switch this shell to the vendor workspace
ros2 launch osracer_slam gmapping.launch.py          # terminal 1
ros2 launch osracer_debug debug_mapping.launch.py    # terminal 2 (RViz)`}</Code>
            </div>
            <div style={{ marginTop: 16 }}>
              <MonoLabel>Cartographer</MonoLabel>
              <Code lang="bash">{`racecar ws osracer      # switch this shell to the vendor workspace
ros2 launch osracer_slam cartographer.launch.py        # terminal 1
ros2 launch osracer_debug debug_cartographer.launch.py # terminal 2 (RViz)`}</Code>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · watch it build ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <StepMarker n={3} label="IN RVIZ" />
          <DisplayHeading size="lg">
            WATCH IT <Red>BUILD.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The debug terminal opens RViz with the fixed frame set to{' '}
            <code style={{ fontFamily: NB.monoFont }}>map</code>. As you drive, the
            occupancy grid fills in around the car.
          </p>
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
        </section>
      </ScrollReveal>

      {/* ── 04 · save ───────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={4} label="KEEP IT" />
            <DisplayHeading size="lg">
              SAVE THE <Red>MAP.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              With the mapper still running and the space covered, save. You get a{' '}
              <code style={{ fontFamily: NB.monoFont }}>map.pgm</code> image and a{' '}
              <code style={{ fontFamily: NB.monoFont }}>map.yaml</code> metadata file
              under <code style={{ fontFamily: NB.monoFont }}>osracer_slam/maps/</code>.
              That pair is what <Link href="/docs/software/navigation" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Nav2</Link> loads.
            </p>
            <div style={{ marginTop: 14 }}>
              <MonoLabel>slam_toolbox / gmapping</MonoLabel>
              <Code lang="bash">{`racecar ws osracer      # switch this shell to the vendor workspace
ros2 launch osracer_slam map_save.launch.xml`}</Code>
            </div>
            <div style={{ marginTop: 14 }}>
              <MonoLabel>Cartographer</MonoLabel>
              <Code lang="bash">{`racecar ws osracer      # switch this shell to the vendor workspace
ros2 launch osracer_slam map_save_cartographer.launch.xml`}</Code>
            </div>
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
