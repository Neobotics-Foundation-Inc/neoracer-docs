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
    'The driver stamps frame_ids (laser, imu_link, camera_link) on its messages. This page lists the frames and shows the static transforms you set up to relate them.',
};

const COLUMNS = [
  { key: 'frame', label: 'Frame', mono: true, accent: true, width: '150px' },
  { key: 'source', label: 'Stamped on', mono: true, width: '160px' },
  { key: 'notes', label: 'Where it is' },
];

const ROWS = [
  {
    frame: 'laser',
    source: '/scan',
    notes: 'The scanner on top of the car. Every LaserScan message carries this in its header.',
  },
  {
    frame: 'imu_link',
    source: '/imu',
    notes: 'The IMU on the OSCORE board. Every Imu message stamps it.',
  },
  {
    frame: 'base_link',
    source: 'you add it',
    notes: 'The body origin, by convention the rear axle. Nothing publishes it for you; it is the root you attach the sensors to.',
  },
  {
    frame: 'camera_link',
    source: '/camera',
    notes: 'The camera at the front of the car. Every image message stamps it.',
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

      {/* camera_link, at the nose */}
      <Leader y={104} toRight />
      <Dot x={cx} y={104} />
      <Label y={104} toRight name="camera_link" tag="front" />

      {/* laser, on top of the car */}
      <Leader y={132} toRight />
      <Dot x={cx} y={132} />
      <Label y={132} toRight name="laser" tag="top" />

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

/* The actual TF tree the osracer stack broadcasts, read from its URDF. An
   indented hierarchy: map and odom come from SLAM, everything below is the
   robot_state_publisher tree. Sensor leaves are tinted to match the 3D model
   on the hardware page; the joint type (fixed vs continuous) is on the right. */
function UrdfFrameTree() {
  type Node = { name: string; d: number; p: number; tag: string; color?: string; slam?: boolean };
  const T: Node[] = [
    { name: 'map', d: 0, p: -1, tag: 'added by SLAM', slam: true },
    { name: 'odom', d: 1, p: 0, tag: 'added by SLAM', slam: true },
    { name: 'base_footprint', d: 2, p: 1, tag: 'ground projection' },
    { name: 'base_link', d: 3, p: 2, tag: 'body origin' },
    { name: 'laser', d: 4, p: 3, tag: 'fixed', color: '#0E9594' },
    { name: 'imu_link', d: 4, p: 3, tag: 'fixed', color: '#7A3FB0' },
    { name: 'camera_link', d: 4, p: 3, tag: 'fixed', color: '#FF0033' },
    { name: 'left_steering_hinge_link', d: 4, p: 3, tag: 'continuous' },
    { name: 'Left_front_wheel_link', d: 5, p: 7, tag: 'continuous' },
    { name: 'right_steering_hinge_link', d: 4, p: 3, tag: 'continuous' },
    { name: 'right_front_wheel_link', d: 5, p: 9, tag: 'continuous' },
    { name: 'left_rear_wheel_link', d: 4, p: 3, tag: 'continuous' },
    { name: 'right_rear_wheel_link', d: 4, p: 3, tag: 'continuous' },
  ];
  const x0 = 26;
  const indent = 26;
  const rowH = 30;
  const startY = 52;
  const px = (n: Node) => x0 + n.d * indent;
  const cy = (i: number) => startY + i * rowH + rowH / 2;
  const lastChild: Record<number, number> = {};
  T.forEach((n, i) => {
    if (n.p >= 0) lastChild[n.p] = i;
  });
  return (
    <svg viewBox="0 0 560 470" width="100%" style={{ display: 'block', maxWidth: 600, margin: '0 auto' }}>
      <rect x="14" y="18" width="532" height="438" rx="6" fill={NB.haloWhite} stroke={NB.tarmacBlue} strokeWidth="1.2" opacity="0.5" />
      <text x="28" y="38" fontFamily={NB.monoFont} fontSize="10" letterSpacing="2" fill={NB.textMutedBeige} fontWeight="700">
        /tf TREE · osracer · robot_state_publisher
      </text>
      {/* connectors */}
      {T.map((n, i) => {
        if (n.p < 0) return null;
        const spineX = px(T[n.p]) + 9;
        return <line key={`h${i}`} x1={spineX} y1={cy(i)} x2={px(n)} y2={cy(i)} stroke={NB.tarmacBlue} strokeWidth="1" opacity="0.4" />;
      })}
      {Object.entries(lastChild).map(([p, last]) => {
        const pi = Number(p);
        const spineX = px(T[pi]) + 9;
        return <line key={`v${p}`} x1={spineX} y1={cy(pi) + 9} x2={spineX} y2={cy(last)} stroke={NB.tarmacBlue} strokeWidth="1" opacity="0.4" />;
      })}
      {/* nodes */}
      {T.map((n, i) => {
        const x = px(n);
        const y = cy(i);
        const stroke = n.color ?? (n.slam ? NB.textMutedBeige : NB.tarmacBlue);
        const w = n.name.length * 7.15 + 16;
        return (
          <g key={n.name}>
            <rect
              x={x}
              y={y - 10}
              width={w}
              height={20}
              rx={4}
              fill={n.slam ? NB.beige : NB.haloWhite}
              stroke={stroke}
              strokeWidth="1.3"
              strokeDasharray={n.slam ? '3 2' : undefined}
            />
            <text x={x + 8} y={y + 4} fontFamily={NB.monoFont} fontSize="12" fontWeight="700" fill={stroke}>
              {n.name}
            </text>
            <text x={x + w + 10} y={y + 4} fontFamily={NB.monoFont} fontSize="10.5" fill={NB.textMutedBeige}>
              {n.tag}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Ros2TfFramesPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'ROS 2' },
          { label: 'TF frames' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="//" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              ROS 2 TF <Red>FRAMES</Red>
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
              <ChromeBadge variant="red">laser · imu_link · camera_link</ChromeBadge>
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
          So <code style={{ fontFamily: NB.monoFont }}>laser</code> and{' '}
          <code style={{ fontFamily: NB.monoFont }}>imu_link</code> exist as labels
          on messages, but ROS 2 does not know where they sit relative to each
          other. If you are running only this stack, anything that needs that
          geometry, RViz, a costmap, sensor fusion, starts with the
          transforms below.
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
        <Fig
          label="FIG. A / THE osracer TF TREE"
          caption="The transform tree osracer's robot_state_publisher broadcasts, straight from its URDF. map and odom are added by SLAM on top. Note the LiDAR frame is laser here, not lidar_link, and the steering hinges and wheels are continuous joints, which is why the 3D model can steer and roll. See it move on the hardware 3D model page."
        >
          <UrdfFrameTree />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 8 }}>
          <Eyebrow>THE FRAMES</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>FRAMES</Red>
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
          <Code lang="bash">{`# base_link sits at the rear axle. The LiDAR is on top of the car.
ros2 run tf2_ros static_transform_publisher 0.10 0 0.12 0 0 0 base_link laser

# IMU on the OSCORE board.
ros2 run tf2_ros static_transform_publisher 0.05 0 0.05 0 0 0 base_link imu_link

# Camera at the front of the car, angled slightly down if yours is.
ros2 run tf2_ros static_transform_publisher 0.22 0 0.08 0 0 0 base_link camera_link`}</Code>
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
        next={{ label: 'racecar CLI', href: '/docs/api-reference/cli' }}
      />
    </DocsShell>
  );
}
