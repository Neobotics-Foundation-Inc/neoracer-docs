import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout, Code, ApiMethods, type ApiMethod } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'rc.camera · Python API · NeoRacer Docs',
  description:
    "The Camera module: 640x480 colour frames from the NeoRacer's RGB camera, identical in the Playground sim and on the car. racecar_core also exposes depth methods, but the NeoRacer has no depth camera, so use the LiDAR for distance.",
};

const METHODS: ApiMethod[] = [
  {
    sig: 'rc.camera.get_color_image()',
    returns: 'NDArray[480, 640, 3]',
    summary:
      'A fresh colour frame as a NumPy array, 480 rows by 640 columns, three channels in blue-green-red order, values 0 to 255. This is a deep copy, so you can edit it freely.',
  },
  {
    sig: 'rc.camera.get_color_image_no_copy()',
    returns: 'NDArray[480, 640, 3]',
    summary:
      'The same frame, but a direct reference rather than a copy. Faster when you only read pixels. The library reuses the buffer next frame, so do not modify it in place.',
  },
  {
    sig: 'rc.camera.get_depth_image()',
    returns: 'NDArray[480, 640]',
    summary:
      'Not available on the NeoRacer: its camera is RGB-only, so this returns an all-zero frame. The method exists because racecar_core is generic and also serves cars with a depth camera (like the RealSense on the MIT RACECAR). For distance, use rc.lidar.',
  },
  {
    sig: 'rc.camera.get_width()',
    returns: 'int',
    summary: 'The pixel width of the colour frame. 640 on the NeoRacer.',
  },
  {
    sig: 'rc.camera.get_height()',
    returns: 'int',
    summary: 'The pixel height of the colour frame. 480 on the NeoRacer.',
  },
  {
    sig: 'rc.camera.get_max_range()',
    returns: 'float',
    summary:
      'A depth-camera method, not meaningful on the NeoRacer (no depth camera). On a car that has one, it returns the farthest distance the depth sensor can report.',
  },
];

export default function CameraApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'rc.camera' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RC.<Red>CAMERA</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The Camera module gives you what the car sees: a 640 by 480 colour
              frame as a plain NumPy array you can hand straight to{' '}
              <InfoNote term="OpenCV" title="OpenCV">
                An open-source computer vision library for processing images. It
                reads NumPy arrays directly, so frames from the camera go
                straight into things like edge detection or color filtering.
              </InfoNote>
              . The same 640 by 480 frames come back in the
              Playground sim and on the car, so your vision code ports without a
              change.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Sim ↔ car identical</ChromeBadge>
              <ChromeBadge variant="outline">640 × 480</ChromeBadge>
              <ChromeBadge variant="outline">RGB, no depth</ChromeBadge>
              <ChromeBadge variant="outline">NumPy / OpenCV</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="One resolution everywhere: 640×480">
          The camera node captures 640 by 480 at 60 fps and passes the frames
          through unchanged, so the sim and the car hand your program the same
          shape of image. The stream your code reads is the{' '}
          <code style={{ fontFamily: NB.monoFont }}>/camera</code>{' '}
          <InfoNote term="ROS 2 topic" title="ROS 2 Topic">
            ROS 2 is the robotics framework the car runs on. A topic is a named
            channel that one part of the system publishes data to and other
            parts read from, such as the stream of camera images here.
          </InfoNote>
          , covered on the{' '}
          <a href="/docs/api-reference/ros2/topics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            ROS 2 driver
          </a>{' '}
          page.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="warn" title="No depth camera on the NeoRacer">
          The RACECAR library is generic and applicable to other systems which
          carry a depth (RGB-D) camera. Therefore, the API keeps{' '}
          <code style={{ fontFamily: NB.monoFont }}>get_depth_image()</code>{' '}
          and <code style={{ fontFamily: NB.monoFont }}>get_max_range()</code>. The
          NeoRacer&apos;s camera is RGB-only, so those return an all-zero frame here
          and in the sim. For distance, use the{' '}
          <a href="/docs/api-reference/python/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>LiDAR</a>.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>METHODS</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>METHODS</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>TYPICAL USE</Eyebrow>
          <DisplayHeading size="lg">
            READING A <Red>FRAME</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core
import numpy as np

rc = racecar_core.create_racecar()

def start():
    pass

def update():
    image = rc.camera.get_color_image()      # (480, 640, 3), BGR, 0-255

    # average brightness of the colour frame
    print("brightness:", np.mean(image))

    # the centre pixel as blue, green, red. The NeoRacer is RGB-only,
    # so reach for the LiDAR (rc.lidar), not a depth frame, for distance.
    h, w = image.shape[0], image.shape[1]
    b, g, r = image[h // 2, w // 2]
    print("centre BGR:", b, g, r)

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'rc.lidar', href: '/docs/api-reference/python/lidar' }}
        next={{ label: 'rc.controller', href: '/docs/api-reference/python/controller' }}
      />
    </DocsShell>
  );
}
