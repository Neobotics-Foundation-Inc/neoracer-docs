import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
  Fig,
} from '@/components/docs/Editorial';
import { CarSprite } from '@/components/docs/Diagrams';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'ROS 2 TF frames · API Reference · NeoRacer Docs',
  description:
    'The racecar_neo stack stamps frame_ids (lidar_link, imu_link) on its messages but does not broadcast a TF tree. This page lists the frames and shows the static transforms you set up to relate them.',
};

const COLUMNS = [
  { key: 'frame', label: 'Frame', mono: true, accent: true, width: '150px' },
  { key: 'source', label: 'Stamped on', mono: true, width: '160px' },
  { key: 'notes', label: 'Where it is' },
];

const ROWS = [
  {
    frame: 'lidar_link',
    source: '/scan',
    notes: 'The scanner at the front of the chassis. Every LaserScan message carries this in its header.',
  },
  {
    frame: 'imu_link',
    source: '/imu, /mag',
    notes: 'The IMU board near the middle of the car. Both the Imu and MagneticField messages stamp it.',
  },
  {
    frame: 'base_link',
    source: 'you add it',
    notes: 'The body origin, by convention the rear axle. Nothing publishes it for you; it is the root you attach the sensors to.',
  },
  {
    frame: 'camera_link',
    source: 'you add it',
    notes: 'The camera, just behind the LiDAR. The base /camera image leaves its frame blank, so you assign one if you need it in TF.',
  },
];

/* Conventional frame layout, top-down. The transforms here are an example
   you measure on your own car, not something the driver publishes. */
function FrameLayoutDiagram() {
  const cx = 240;
  const Dot = ({ x, y, root = false }: { x: number; y: number; root?: boolean }) => (
    <circle cx={x} cy={y} r={root ? 5 : 4} fill={NB.neoboticsRed} stroke={NB.haloWhite} strokeWidth="1.5" />
  );
  const Leader = ({ y, toRight }: { y: number; toRight: boolean }) => (
    <line
      x1={cx}
      y1={y}
      x2={toRight ? 392 : 88}
      y2={y}
      stroke={NB.tarmacBlue}
      strokeWidth="1"
      strokeDasharray="2 3"
      opacity="0.55"
    />
  );
  const Label = ({ y, toRight, name, tag }: { y: number; toRight: boolean; name: string; tag?: string }) => (
    <text
      x={toRight ? 396 : 84}
      y={y + 3.5}
      textAnchor={toRight ? 'start' : 'end'}
      fontFamily={NB.monoFont}
      fontSize="12"
      fontWeight="700"
      fill={NB.tarmacBlue}
    >
      {name}
      {tag && (
        <tspan fontSize="9" fontWeight="400" fill={NB.textMutedBeige}>
          {'  '}
          {tag}
        </tspan>
      )}
    </text>
  );
  return (
    <svg viewBox="0 0 480 300" width="100%" style={{ display: 'block', maxWidth: 540, margin: '0 auto' }}>
      <rect x="20" y="20" width="440" height="260" rx="6" fill={NB.haloWhite} stroke={NB.tarmacBlue} strokeWidth="1.2" opacity="0.5" />
      <text x="240" y="40" fontFamily={NB.monoFont} fontSize="10" letterSpacing="2" textAnchor="middle" fill={NB.textMutedBeige} fontWeight="700">
        TOP-DOWN · NOSE UP · A CONVENTION YOU SET UP
      </text>

      <CarSprite cx={cx} cy={160} size={150} heading={0} />

      {/* lidar_link, front */}
      <Leader y={104} toRight />
      <Dot x={cx} y={104} />
      <Label y={104} toRight name="lidar_link" tag="front" />

      {/* camera_link, just behind the nose */}
      <Leader y={132} toRight />
      <Dot x={cx} y={132} />
      <Label y={132} toRight name="camera_link" tag="behind LiDAR" />

      {/* imu_link, center */}
      <Leader y={160} toRight={false} />
      <Dot x={cx} y={160} />
      <Label y={160} toRight={false} name="imu_link" tag="center" />

      {/* base_link, rear axle, the root */}
      <Leader y={214} toRight={false} />
      <Dot x={cx} y={214} root />
      <Label y={214} toRight={false} name="base_link" tag="root · rear axle" />
    </svg>
  );
}

export default function Ros2TfFramesPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'ROS 2' },
          { label: 'TF frames' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="//" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>API REFERENCE / ROS 2</Eyebrow>
            <DisplayHeading size="xl">
              ROS 2 TF <Red>FRAMES.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The sensor messages stamp a frame name in their header, but the{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar_neo</code> teaching
              driver runs no transform broadcaster, so on that stack alone there
              is no <code style={{ fontFamily: NB.monoFont }}>/tf</code> tree
              relating the frames until you add one. The{' '}
              <code style={{ fontFamily: NB.monoFont }}>osracer</code> stack, which
              ships on the same car for{' '}
              <InfoNote term="SLAM" title="SLAM">
                Simultaneous Localization and Mapping. The car builds a map of an
                unknown space while tracking its own position in that map at the
                same time, using sensors like the LiDAR.
              </InfoNote>{' '}
              and navigation, does publish a full
              tree. Knowing which one you are running saves an afternoon of
              staring at an empty RViz.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">lidar_link · imu_link</ChromeBadge>
              <ChromeBadge variant="outline">racecar_neo: no /tf</ChromeBadge>
              <ChromeBadge variant="outline">osracer: full tree</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="warn" title="The racecar_neo teaching stack publishes no /tf or /tf_static">
          Its teleop launch starts the sensor and drive nodes, but it does not run{' '}
          <code style={{ fontFamily: NB.monoFont }}>robot_state_publisher</code> or
          any{' '}
          <code style={{ fontFamily: NB.monoFont }}>static_transform_publisher</code>.
          So <code style={{ fontFamily: NB.monoFont }}>lidar_link</code> and{' '}
          <code style={{ fontFamily: NB.monoFont }}>imu_link</code> exist as labels
          on messages, but ROS 2 does not know where they sit relative to each
          other. If you are running only this stack, anything that needs that
          geometry, RViz, a costmap, sensor fusion, needs you to publish the
          transforms below first.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Running osracer? The tree is already there">
          The{' '}
          <a href="https://github.com/osrbot/osracer" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            osracer
          </a>{' '}
          stack brings up{' '}
          <code style={{ fontFamily: NB.monoFont }}>robot_state_publisher</code>{' '}
          from a{' '}
          <InfoNote term="URDF" title="URDF">
            Unified Robot Description Format. An XML file that describes a robot's
            parts and how they connect, so tools can compute where each sensor sits
            relative to the body.
          </InfoNote>{' '}
          with{' '}
          <InfoNote term="Ackermann kinematics" title="Ackermann kinematics">
            The geometry of car-style steering, where the front wheels turn and the
            body pivots around the rear axle. It describes how the car moves, unlike
            a robot that can spin in place.
          </InfoNote>, so{' '}
          <code style={{ fontFamily: NB.monoFont }}>base_link</code> and every
          sensor frame are already related and its SLAM adds{' '}
          <code style={{ fontFamily: NB.monoFont }}>map</code> and{' '}
          <code style={{ fontFamily: NB.monoFont }}>odom</code> on top. Reach for the
          hand-rolled transforms below when you run the teaching stack on its own,
          or when you add a node that needs a frame osracer does not define.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <Eyebrow>THE FRAMES</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>FRAMES.</Red>
          </DisplayHeading>
          <DataTable columns={COLUMNS} rows={ROWS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Fig
          label="FIG. A / A CONVENTIONAL LAYOUT"
          caption="A common arrangement: base_link at the rear axle as the root, with the sensors offset forward and up from it. The exact offsets are yours to measure; nothing in the driver assumes them."
        >
          <FrameLayoutDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 24 }}>
          <MonoLabel>Wiring the tree with static transforms</MonoLabel>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            The quickest way to give ROS 2 the geometry is one{' '}
            <code style={{ fontFamily: NB.monoFont }}>static_transform_publisher</code>{' '}
            per sensor. The arguments are{' '}
            <code style={{ fontFamily: NB.monoFont }}>x y z yaw pitch roll parent child</code>,
            in metres and radians. Measure the offsets on your own car; the numbers
            below are an example, not a spec.
          </p>
          <Code lang="bash">{`# base_link sits at the rear axle. LiDAR is forward and a little up.
ros2 run tf2_ros static_transform_publisher 0.17 0 0.10 0 0 0 base_link lidar_link

# IMU is near the center, low.
ros2 run tf2_ros static_transform_publisher 0.05 0 0.05 0 0 0 base_link imu_link

# Camera, just behind the LiDAR, angled slightly down if yours is.
ros2 run tf2_ros static_transform_publisher 0.15 0 0.09 0 0 0 base_link camera_link`}</Code>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 15, lineHeight: 1.6, color: NB.textMutedBeige, maxWidth: 740, marginTop: 14 }}>
            For anything beyond a quick test, move these into a{' '}
            <code style={{ fontFamily: NB.monoFont }}>robot_state_publisher</code>{' '}
            driven by a URDF, so the whole tree comes up with one node and stays in
            one place.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Coming from F1TENTH or a full Nav2 stack?">
          Those builds assume a populated TF tree, so wiring{' '}
          <code style={{ fontFamily: NB.monoFont }}>base_link</code> to each sensor
          is the first thing to port over. The frame names here follow the same
          convention, so a URDF from a comparable car usually drops in with only
          the offsets changed.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 parameters', href: '/docs/api-reference/ros2/params' }}
        next={{ label: 'Calibration · Motor trim', href: '/docs/calibration/motor-trim' }}
      />
    </DocsShell>
  );
}
