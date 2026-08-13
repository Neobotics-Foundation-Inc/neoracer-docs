import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';
import { StepCard } from '@/components/docs/StepCard';
import { Crumbs, Callout, PrevNext, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Camera · Hardware · NeoRacer Docs',
  description:
    'The forward-facing colour camera. 640 x 480 BGR frames at 60 fps in the Python API.',
};

export default function CameraPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Sensors', href: '/docs/hardware/sensors' },
          { label: 'Camera' },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE <Red>CAMERA</Red>
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
              A forward-facing colour camera at the front of the car. It
              connects directly to the Jetson over USB.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline"><AnimatedNumeral value={640} suffix=" px wide" /></ChromeBadge>
              <ChromeBadge variant="outline"><AnimatedNumeral value={480} suffix=" px tall" /></ChromeBadge>
              <ChromeBadge variant="outline">60 fps (120 max)</ChromeBadge>
              <ChromeBadge variant="outline">RGB</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <StepCard
            title="The camera"
            image="/images/build/camera-2.jpg"
            alt="The NeoRacer camera in its front housing"
          >
            The camera is a forward-facing module located in the front of the
            car. It can be used for lane following, colour and object
            detection, and other computer vision work.
          </StepCard>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              marginTop: 18,
            }}
          >
            {[
              ['API resolution', '640 x 480'],
              ['FPS', '60 (120 max)'],
              ['Colour format', 'BGR (uint8)'],
              ['Sensor type', 'RGB (no depth)'],
              ['Sensor model', '1/2.6 inch'],
              ['Pixels', '1920 × 1200 (approx. 2.3 MP)'],
              ['Shutter type', 'Global shutter'],
              ['Focal length', '2.7 mm'],
              ['FOV', '130°'],
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

      {/* ── Section · The frame ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            THE <Red>FRAME</Red>
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
          The RACECAR library is generic and applicable to other systems which
          carry a depth (RGB-D) camera. Therefore, the API keeps{' '}
          <code style={{ fontFamily: NB.monoFont }}>get_depth_image()</code>{' '}
          and <code style={{ fontFamily: NB.monoFont }}>get_max_range()</code>. The
          NeoRacer&apos;s camera is RGB-only, so those return an all-zero frame here
          and in the sim. For distance, use the{' '}
          <Link href="/docs/hardware/sensors/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>LiDAR</Link>.
        </Callout>
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
