import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Camera · Hardware · NeoRacer Docs',
  description:
    'The forward-facing colour camera. 640 x 480 BGR frames in the Python API, JPEG on /camera in ROS 2.',
};

export default function CameraPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Sensors', href: '/docs/hardware/sensors' },
          { label: 'Camera' },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="C" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / SENSORS</Eyebrow>
            <DisplayHeading size="xl">
              THE <Red>CAMERA.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 18,
                lineHeight: 1.55,
                color: NB.textMutedBeige,
                maxWidth: 680,
              }}
            >
              The forward-facing colour camera mounted on the front of the
              chassis. Your code reads it as a steady stream of 640 x 480 BGR
              colour frames at 60 fps. The sensor can capture up to 120 fps;
              the driver runs it at 60, which is the recommended rate. It is an
              RGB camera, not a depth camera, so use the LiDAR when you need
              distance. The same frame size the
              racecar-neo-library hands you in the Playground sim and on the car,
              so what you tune in simulation is what runs on the track.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Runs unchanged in Playground (sim)</ChromeBadge>
              <ChromeBadge variant="outline"><AnimatedNumeral value={640} suffix=" px wide" /></ChromeBadge>
              <ChromeBadge variant="outline"><AnimatedNumeral value={480} suffix=" px tall" /></ChromeBadge>
              <ChromeBadge variant="outline">60 fps (120 max)</ChromeBadge>
              <ChromeBadge variant="outline">RGB, no depth</ChromeBadge>
              <ChromeBadge variant="outline">JPEG on /camera</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section · The frame ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <Eyebrow>01 / THE FRAME</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>FRAME.</Red>
          </DisplayHeading>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
            }}
          >
            The colour image arrives as a NumPy array shaped (480, 640, 3): 480
            rows, 640 columns, three colour channels in BGR order. The physical
            sensor can capture up to 1080p, but the library normalises every frame
            to 640 x 480 so that the sim and the car return the exact same shape.
            That is why the helpers below report a width of 640 and a height of
            480 in both places.
          </p>
          <Code lang="python">
{`color = rc.camera.get_color_image()    # NDArray (480, 640, 3), uint8, BGR

print(color.shape)                     # (480, 640, 3)
print(rc.camera.get_width())           # 640
print(rc.camera.get_height())          # 480

# BGR, not RGB: the blue channel comes first.
b, g, r = color[240, 320]              # centre pixel, one per channel

# The NeoRacer is RGB-only: get_depth_image() returns all zeros here.
# Use rc.lidar for distance.`}
          </Code>
        </section>
      </ScrollReveal>

      {/* ── Section · No depth ───────────────────────────────────────── */}
      <ScrollReveal>
        <Callout type="warn" title="No depth camera on the NeoRacer">
          The racecar-neo-library is generic, so it runs across the MIT RACECAR
          family. Some of those cars carry a depth (RGB-D) camera, which is why the
          API keeps <code style={{ fontFamily: NB.monoFont }}>get_depth_image()</code>{' '}
          and <code style={{ fontFamily: NB.monoFont }}>get_max_range()</code>. The
          NeoRacer&apos;s camera is RGB-only, so those return an all-zero frame here
          and in the sim. For distance, use the{' '}
          <Link href="/docs/hardware/sensors/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>LiDAR</Link>.
        </Callout>
      </ScrollReveal>

      {/* ── Section · Spec grid ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / AT A GLANCE</Eyebrow>
          <DisplayHeading size="lg">
            <Red>SPECIFICATIONS.</Red>
          </DisplayHeading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 12,
              marginTop: 18,
            }}
          >
            {[
              ['API resolution', '640 x 480'],
              ['Colour format', 'BGR (uint8)'],
              ['Sensor type', 'RGB (no depth)'],
              ['ROS 2 topic', '/camera (JPEG)'],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  background: NB.haloWhite,
                  border: `1px solid ${NB.borderOnBeige}`,
                  borderRadius: 0,
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{
                    fontFamily: NB.monoFont,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: NB.textMutedBeige,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontFamily: NB.headingFont,
                    fontSize: 16,
                    fontWeight: 700,
                    color: NB.textOnBeige,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section · Python API ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / PYTHON API</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>METHODS.</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc.camera.get_color_image() → NDArray (480, 640, 3)
                </code>{' '}
                · the colour frame, uint8, BGR order.
              </>,
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc.camera.get_depth_image() → NDArray (480, 640)
                </code>{' '}
                · for depth-camera cars; all zeros on the NeoRacer (RGB-only), so use rc.lidar for distance.
              </>,
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc.camera.get_width() → 640
                </code>{' '}
                · the frame width in pixels.
              </>,
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc.camera.get_height() → 480
                </code>{' '}
                · the frame height in pixels.
              </>,
            ]}
          />
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 15,
              lineHeight: 1.6,
              color: NB.textMutedBeige,
              maxWidth: 720,
              marginTop: 14,
            }}
          >
            The full reference for the camera object lives at{' '}
            <Link
              href="/docs/api-reference/python/camera"
              style={{ color: NB.neoboticsRed, fontWeight: 700 }}
            >
              API Reference · rc.camera
            </Link>
            .
          </p>
        </section>
      </ScrollReveal>

      {/* ── Section · ROS 2 ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>04 / ROS 2</Eyebrow>
          <DisplayHeading size="lg">
            THE ROS 2 <Red>TOPIC.</Red>
          </DisplayHeading>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
            }}
          >
            In the racecar_neo ROS 2 stack, camera_node publishes
            sensor_msgs/Image on /camera with the encoding field set to "jpeg",
            which means the message carries JPEG bytes rather than raw pixels.
            That keeps the topic light on the network. When you want a plain
            image that RViz can render directly, the optional decode_camera node
            republishes a decoded frame on /camera/decoded.
          </p>
          <DataTable
            columns={[
              { key: 'topic', label: 'Topic', mono: true, accent: true },
              { key: 'type', label: 'Message type', mono: true },
              { key: 'note', label: 'Notes' },
            ]}
            rows={[
              {
                topic: '/camera',
                type: 'sensor_msgs/Image',
                note: 'Encoding "jpeg": JPEG bytes in an Image message.',
              },
              {
                topic: '/camera/decoded',
                type: 'sensor_msgs/Image',
                note: 'Optional. RViz-friendly decoded image from decode_camera.',
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── Section · What it's for ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>05 / WHAT IT'S FOR</Eyebrow>
          <DisplayHeading size="lg">
            WHAT IT'S <Red>FOR.</Red>
          </DisplayHeading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 22,
              marginTop: 22,
            }}
          >
            <NumberedFeatureCard
              n={1}
              title="Lane keeping"
              lede="Read the colour frame, find the track edges, steer to centre."
              body="The 640 x 480 colour image is the input most lane-following loops start from. You crop to the region that holds the track, threshold for the lane colour, and turn the result into a steering command."
            />
            <NumberedFeatureCard
              n={2}
              title="Sign and colour recognition"
              lede="BGR pixels make it straightforward to match against known colours."
              body="Because the frame is plain BGR, masking for a particular colour cone or sign is a few lines. Pair it with the LiDAR when you need how far away the match is, since the NeoRacer's camera has no depth."
            />
            <NumberedFeatureCard
              n={3}
              title="Reinforcement learning"
              lede="A fixed 640 x 480 frame is a stable observation for an RL pipeline."
              body="Because every frame is the same shape in sim and on the car, the image makes a clean observation for a learned policy. The model you train against Playground frames sees the same input size when it runs on the track."
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Colours look washed out or boxes land in the wrong place?">
          That usually traces back to calibration. Walk the intrinsics at{' '}
          <Link
            href="/docs/calibration/camera-intrinsics"
            style={{ color: NB.neoboticsRed, fontWeight: 700 }}
          >
            Calibration · Camera intrinsics
          </Link>
          .
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="No image coming through at all?">
          A blank feed is almost always the cable or the camera_node not running,
          and the camera does not need an MCU (microcontroller unit) of its own to
          stream. The full decision tree lives at{' '}
          <Link
            href="/docs/troubleshooting/camera-no-feed"
            style={{ color: NB.neoboticsRed, fontWeight: 700 }}
          >
            Troubleshooting · Camera no feed
          </Link>
          . If it still will not start, reach us at{' '}
          <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            support@neobotics.org
          </a>
          .
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'LiDAR', href: '/docs/hardware/sensors/lidar' }}
        next={{ label: 'IMU', href: '/docs/hardware/sensors/imu' }}
      />
    </DocsShell>
  );
}
