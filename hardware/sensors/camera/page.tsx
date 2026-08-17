import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { SensorSheet } from '@/components/docs/SensorSheet';
import { Crumbs, PrevNext, Code } from '@/components/docs/DocsPrimitives';

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
          { label: 'Sensors' },
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
              A forward-facing colour camera sits at the front of the car. It
              connects directly to the Jetson over USB.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <SensorSheet
            title="The camera"
            image="/images/build/camera-2.jpg"
            alt="The NeoRacer camera in its front housing"
            specs={[
              ['Sensor type', 'RGB'],
              ['Resolution', '1920 × 1200'],
              ['FPS', '120'],
              ['FOV', '130°'],
              ['Focal length', '2.7 mm'],
              ['Shutter type', 'Global shutter'],
              ['Sensor model', '1/2.6 inch'],
              ['Power consumption', '5V DC / 2W'],
              ['Recommended frame rate', '640 × 480 @ 60 fps'],
            ]}
          >
            The camera can be used for lane following, colour and object
            detection, and other computer vision work.
          </SensorSheet>
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
            Everything below assumes the camera is running at its default
            640 × 480. The sensor can capture 1920 × 1200, but the driver asks
            it for 640 × 480 at 60 fps.
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

      {/* ── Section · Changing the resolution ────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            CHANGING THE <Red>RESOLUTION</Red>
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
            The resolution and the frame rate are set in the driver&apos;s{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>config/camera.yaml</code>.
            Edit the three values below and restart the camera node. Every
            camera parameter is listed on the{' '}
            <Link href="/docs/api-reference/ros2/params" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              ROS 2 parameters page
            </Link>
            .
          </p>
          <Code lang="yaml">
{`camera_node:
  ros__parameters:
    image_width: 640
    image_height: 480
    framerate: 60.0`}
          </Code>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
              marginTop: 18,
            }}
          >
            One thing to watch:{' '}
            <code style={{ fontFamily: NB.monoFont }}>rc.camera.get_width()</code>{' '}
            and{' '}
            <code style={{ fontFamily: NB.monoFont }}>rc.camera.get_height()</code>{' '}
            are fixed at 640 and 480 in the library, so they do not follow the
            config file. Once you change the resolution, read the size off the
            frame instead.
          </p>
          <Code lang="python">
{`color = rc.camera.get_color_image()
height, width, _ = color.shape   # the size the camera is actually running at`}
          </Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'LiDAR', href: '/docs/hardware/sensors/lidar' }}
        next={{ label: 'IMU', href: '/docs/hardware/sensors/imu' }}
      />
    </DocsShell>
  );
}
