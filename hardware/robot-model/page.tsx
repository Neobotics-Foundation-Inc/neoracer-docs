import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
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

export default function RobotModelPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Robot model' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 28, paddingTop: 24 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE ROBOT <Red>MODEL</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              This is the NeoRacer's{' '}
              <InfoNote term="URDF" title="URDF">
                Unified Robot Description Format. An XML file that describes a
                robot's links and the joints between them, so tools can compute
                where each sensor sits relative to the body and how the wheels
                move.
              </InfoNote>
              . It is the same description the{' '}
              <code style={{ fontFamily: NB.monoFont }}>osracer</code> ROS 2 stack
              loads into{' '}
              <code style={{ fontFamily: NB.monoFont }}>robot_state_publisher</code>{' '}
              to broadcast the car's transform tree.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Fig
          label="FIG. A / NEORACER URDF"
          caption={
            <>
              The model is the open{' '}
              <a href="https://github.com/osrbot/osracer" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                osracer
              </a>{' '}
              robot description. The CAD meshes are simplified for the web, so
              the silhouette is faithful while the triangle counts stay light
              enough to spin at full frame rate. The kinematics, link names, and
              joint axes are unchanged from the source.
            </>
          }
        >
          <UrdfViewer />
        </Fig>
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

      <PrevNext
        prev={{ label: 'Safety', href: '/docs/hardware/safety' }}
        next={{ label: 'Reassembly', href: '/docs/hardware/reassembly' }}
      />
    </DocsShell>
  );
}
