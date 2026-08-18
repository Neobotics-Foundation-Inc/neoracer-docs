import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  Fig,
  MonoLabel,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';
import UrdfViewer from '@/components/docs/UrdfViewer';

export const metadata: Metadata = {
  title: '3D model · Software · NeoRacer Docs',
  description:
    "An interactive 3D model of the NeoRacer, built from the real osracer ROS 2 URDF: rotate it, spin the wheels, and steer the front axle through the actual continuous joints.",
};

export default function RobotModelPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/networking' },
          { label: '3D model' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 28, paddingTop: 24 }}>
          <GhostNumeral n="3D" top={-30} right={-20} size={400} />
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

      {/* ── 01 · Using the model ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 8 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              SEE IT ON THE <Red>CAR</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The URDF ships on the car in the{' '}
              <code style={{ fontFamily: NB.monoFont }}>osracer_description</code>{' '}
              ROS 2 package, and this page renders a copy of the same file. To
              see the live version you need the osracer stack running, so start
              its bringup first (see{' '}
              <Link href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Workspaces</Link>).
            </p>
            <MonoLabel>Open RViz</MonoLabel>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
              With a monitor or a remote desktop session, open a terminal and run:
            </p>
            <Code lang="bash">{`rviz2`}</Code>
            <DashList
              items={[
                <>In RViz, click <strong>Add</strong> and choose{' '}
                  <code style={{ fontFamily: NB.monoFont }}>RobotModel</code>.</>,
                <>Set its <strong>Description Topic</strong> to{' '}
                  <code style={{ fontFamily: NB.monoFont }}>/robot_description</code>.</>,
                <>Set the <strong>Fixed Frame</strong> to{' '}
                  <code style={{ fontFamily: NB.monoFont }}>base_link</code>.</>,
              ]}
            />
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 14 }}>
              The car appears exactly as in FIG. A, driven by the live transform
              tree instead of your mouse.
            </p>
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

      <PrevNext
        prev={{ label: 'Navigation (Nav2)', href: '/docs/software/navigation' }}
        next={{ label: 'API reference', href: '/docs/api-reference/python/drive' }}
      />
    </DocsShell>
  );
}
