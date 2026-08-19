import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Code, ApiMethods, type ApiMethod } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

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
      'A deep copy of the current color frame as a NumPy array, 480 rows by 640 columns, three channels in blue-green-red order, values 0 to 255.',
  },
  {
    sig: 'rc.camera.get_color_image_no_copy()',
    returns: 'NDArray[480, 640, 3]',
    summary:
      'A direct reference to the current color frame, without copying. Do not modify it; the library reuses the buffer for the next frame.',
  },
  {
    sig: 'rc.camera.get_depth_image()',
    returns: 'NDArray[480, 640]',
    summary:
      'Not available on the NeoRacer: its camera is RGB-only, so this returns an all-zero frame.',
  },
  {
    sig: 'rc.camera.get_width()',
    returns: 'int',
    summary: 'The pixel width of the color frame.',
  },
  {
    sig: 'rc.camera.get_height()',
    returns: 'int',
    summary: 'The pixel height of the color frame.',
  },
  {
    sig: 'rc.camera.get_max_range()',
    returns: 'float',
    summary:
      'Not used on the NeoRacer. On a car that can capture depth, it returns the farthest distance the depth sensor can report.',
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
              The camera module provides color frames as a NumPy array.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            <Red>METHODS</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            EXAMPLE <Red>USAGE</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core
import numpy as np

rc = racecar_core.create_racecar()

def start():
    pass

def update():
    image = rc.camera.get_color_image()

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
