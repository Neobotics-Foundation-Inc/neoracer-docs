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
  Fig,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';
import UrdfViewer from '@/components/docs/UrdfViewer';

export const metadata: Metadata = {
  title: 'Robot model (3D) · NeoRacer Docs',
  description:
    "An interactive 3D model of the NeoRacer, built from the real osracer ROS 2 URDF: rotate it, spin the wheels, and steer the front axle through the actual continuous joints.",
};

const PARTS: { name: string; frame: string; note: string }[] = [
  { name: 'Camera', frame: 'camera_link', note: 'front, just behind the LiDAR' },
  { name: 'LiDAR', frame: 'laser', note: 'the scanner at the nose' },
  { name: 'IMU', frame: 'imu_link', note: 'near the centre of the chassis' },
  { name: 'Chassis & body', frame: 'base_link', note: 'the structural origin' },
  { name: 'Wheels & steering', frame: '4 wheels · 2 hinges', note: 'continuous joints; the front pair steers' },
];

export default function RobotModelPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Robot model' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 28, paddingTop: 24 }}>
          <GhostNumeral n="3D" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / ROBOT MODEL</Eyebrow>
            <DisplayHeading size="xl">
              THE ROBOT <Red>MODEL.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              This is the NeoRacer's own{' '}
              <InfoNote term="URDF" title="URDF">
                Unified Robot Description Format. An XML file that describes a
                robot's links and the joints between them, so tools can compute
                where each sensor sits relative to the body and how the wheels
                move.
              </InfoNote>{' '}
              rendered in your browser. It is the same description the{' '}
              <code style={{ fontFamily: NB.monoFont }}>osracer</code> ROS 2 stack
              loads into{' '}
              <code style={{ fontFamily: NB.monoFont }}>robot_state_publisher</code>{' '}
              to broadcast the car's transform tree. Drag to orbit, spin the
              wheels, and steer the front axle through the real continuous joints.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">11 links</ChromeBadge>
              <ChromeBadge variant="outline">Ackermann front axle</ChromeBadge>
              <ChromeBadge variant="outline">live joint articulation</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Fig
          label="FIG. A / INTERACTIVE 3D"
          caption="The osracer URDF with its meshes, simplified for the web. Plain aluminium body, dark tyres. Use the controls below the model to drive the wheels and steer the front axle."
        >
          <UrdfViewer />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 24 }}>
          <Eyebrow>WHAT YOU ARE LOOKING AT</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>LINKS.</Red>
          </DisplayHeading>
          <div style={{ marginTop: 12 }}>
            {PARTS.map((p) => (
              <div
                key={p.name}
                style={{
                  padding: '13px 0',
                  borderBottom: `1px solid ${NB.borderOnBeige}`,
                }}
              >
                <span style={{ fontFamily: NB.headingFont, fontSize: 18, fontWeight: 700, color: NB.textOnBeige }}>
                  {p.name}
                </span>
                <code style={{ fontFamily: NB.monoFont, fontSize: 13, color: NB.neoboticsRed, marginLeft: 10 }}>
                  {p.frame}
                </code>
                <span style={{ fontFamily: NB.bodyFont, fontSize: 14, color: NB.textMutedBeige, marginLeft: 10 }}>
                  {p.note}
                </span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="How the frames connect">
          The links you see here are exactly the frames in the car's transform
          tree. To see the parent-child hierarchy and the measured offsets
          between them, see{' '}
          <Link href="/docs/api-reference/ros2/tf-frames" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            ROS 2 TF frames
          </Link>
          . Note the LiDAR frame is named{' '}
          <code style={{ fontFamily: NB.monoFont }}>laser</code> in this stack, not{' '}
          <code style={{ fontFamily: NB.monoFont }}>lidar_link</code>.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 8, paddingBottom: 24 }}>
          <MonoLabel>Where this comes from</MonoLabel>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 15, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            The model is the open{' '}
            <a href="https://github.com/osrbot/osracer" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              osracer
            </a>{' '}
            robot description. The CAD meshes are simplified for the web, so the
            silhouette is faithful while the triangle counts stay light enough to
            spin at full frame rate. The kinematics, link names, and joint axes
            are unchanged from the source.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Overview', href: '/docs/hardware/overview' }}
        next={{ label: 'Compute', href: '/docs/hardware/compute' }}
      />
    </DocsShell>
  );
}
