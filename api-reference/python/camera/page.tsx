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
    'The Camera module: get_color_image and get_depth_image return fixed 640x480 frames. Same API in the Playground sim and on the car.',
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
    summary: 'A depth frame the same size as the colour image. Each pixel is the distance to that point in centimetres.',
  },
  {
    sig: 'rc.camera.get_width()',
    returns: 'int',
    summary: 'The pixel width of both the colour and depth frames. 640 on the NeoRacer.',
  },
  {
    sig: 'rc.camera.get_height()',
    returns: 'int',
    summary: 'The pixel height of both frames. 480 on the NeoRacer.',
  },
  {
    sig: 'rc.camera.get_max_range()',
    returns: 'float',
    summary: 'The farthest distance in centimetres the depth camera can report. Anything beyond it comes back as the max.',
  },
];

export default function CameraApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'rc.camera' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>API REFERENCE / PYTHON</Eyebrow>
            <DisplayHeading size="xl">
              RC.<Red>CAMERA.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The Camera module gives you what the car sees: a colour frame and a
              matching depth frame, both as plain NumPy arrays you can hand
              straight to{' '}
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
              <ChromeBadge variant="outline">colour + depth</ChromeBadge>
              <ChromeBadge variant="outline">NumPy / OpenCV</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="The API gives 640×480, the sensor is sharper">
          The physical camera captures up to 1080p, but the library hands every
          program a fixed 640 by 480 frame so the same code runs in the sim and
          on the car. If you need the raw full-resolution stream for something
          special, it is on the{' '}
          <code style={{ fontFamily: NB.monoFont }}>/camera</code>{' '}
          <InfoNote term="ROS 2 topic" title="ROS 2 Topic">
            ROS 2 is the robotics framework the car runs on. A topic is a named
            channel that one part of the system publishes data to and other
            parts read from, such as the stream of camera images here.
          </InfoNote>
          , covered on the{' '}
          <a href="/docs/software/ros2-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            ROS 2 driver
          </a>{' '}
          page.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>METHODS</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>METHODS.</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>TYPICAL USE</Eyebrow>
          <DisplayHeading size="lg">
            READING A <Red>FRAME.</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core
import numpy as np

rc = racecar_core.create_racecar()

def start():
    pass

def update():
    image = rc.camera.get_color_image()      # (480, 640, 3), BGR, 0-255
    depth = rc.camera.get_depth_image()      # (480, 640), cm

    # average brightness of the colour frame
    print("brightness:", np.mean(image))
    # distance straight ahead, at the centre pixel
    print("centre depth:", depth[240, 320])

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
