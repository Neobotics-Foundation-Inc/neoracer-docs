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
  title: 'racecar_utils · Python API · NeoRacer Docs',
  description:
    'The racecar_utils helper module: clamp, remap_range, crop, contour finding and drawing for color tracking, and AR marker detection.',
};

const GENERAL: ApiMethod[] = [
  {
    sig: 'rc_utils.clamp(value, min, max)',
    returns: 'float',
    summary: 'Clamps a value between a minimum and a maximum.',
  },
  {
    sig: 'rc_utils.remap_range(val, old_min, old_max, new_min, new_max, saturate=False)',
    returns: 'float',
    summary:
      'Remaps a value from one range to another. With saturate, the result is clamped to the new range.',
  },
];

const IMAGES: ApiMethod[] = [
  {
    sig: 'rc_utils.crop(image, top_left_inclusive, bottom_right_exclusive)',
    returns: 'NDArray',
    summary:
      'Returns the rectangle of the image between the two (row, column) corners.',
  },
  {
    sig: 'rc_utils.stack_images_horizontal(image_0, image_1)',
    returns: 'NDArray',
    summary:
      'Joins two images side by side. stack_images_vertical joins them top to bottom.',
  },
];

const CONTOURS: ApiMethod[] = [
  {
    sig: 'rc_utils.find_contours(color_image, hsv_lower, hsv_upper)',
    returns: 'list[NDArray]',
    summary:
      'Finds all contours of the given HSV color range in the image.',
  },
  {
    sig: 'rc_utils.get_largest_contour(contours, min_area=30)',
    returns: 'NDArray | None',
    summary:
      'Returns the largest contour with area greater than min_area, or None if there is none.',
  },
  {
    sig: 'rc_utils.get_contour_center(contour)',
    returns: 'tuple[int, int] | None',
    summary: 'Returns the (row, column) center of a contour.',
  },
  {
    sig: 'rc_utils.get_contour_area(contour)',
    returns: 'float',
    summary: 'Returns the area of a contour in pixels.',
  },
  {
    sig: 'rc_utils.draw_contour(color_image, contour, color=green)',
    returns: 'None',
    summary: 'Draws a contour outline onto the image, in place.',
  },
  {
    sig: 'rc_utils.draw_circle(color_image, center, color=yellow, radius=6)',
    returns: 'None',
    summary: 'Draws a circle onto the image, in place.',
  },
];

const MARKERS: ApiMethod[] = [
  {
    sig: 'rc_utils.get_ar_markers(color_image, potential_colors=[])',
    returns: 'list[ARMarker]',
    summary:
      'Finds ArUco markers in the image. Each marker carries its id and corner positions.',
  },
  {
    sig: 'rc_utils.draw_ar_markers(color_image, markers, color=green)',
    returns: 'None',
    summary: 'Draws detected markers onto the image, in place.',
  },
];

export default function UtilsApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'racecar_utils' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RACECAR_<Red>UTILS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The racecar_utils module provides helper functions for working
              with numbers, images, and the LiDAR. Import it as{' '}
              <code style={{ fontFamily: NB.monoFont }}>rc_utils</code>. The
              LiDAR helpers are on the{' '}
              <a href="/docs/api-reference/python/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>rc.lidar</a>{' '}
              page.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            <Red>NUMBERS</Red>
          </DisplayHeading>
          <ApiMethods methods={GENERAL} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            <Red>IMAGES</Red>
          </DisplayHeading>
          <ApiMethods methods={IMAGES} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            COLOR <Red>CONTOURS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            A contour is the outline of a connected region of one color. These
            are the functions behind line following and cone tracking.
          </p>
          <ApiMethods methods={CONTOURS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            AR <Red>MARKERS</Red>
          </DisplayHeading>
          <ApiMethods methods={MARKERS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            EXAMPLE <Red>USAGE</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core
import racecar_utils as rc_utils

rc = racecar_core.create_racecar()

BLUE = ((90, 50, 50), (120, 255, 255))   # HSV range

def start():
    pass

def update():
    image = rc.camera.get_color_image()
    contours = rc_utils.find_contours(image, BLUE[0], BLUE[1])
    largest = rc_utils.get_largest_contour(contours)
    if largest is not None:
        center = rc_utils.get_contour_center(largest)
        # steer toward the contour: map its column to a steering angle
        angle = rc_utils.remap_range(center[1], 0, image.shape[1], -1, 1)
        rc.drive.set_speed_angle(0.3, angle)
    else:
        rc.drive.stop()

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'rc.vision', href: '/docs/api-reference/python/vision' }}
        next={{ label: 'ROS 2 topics', href: '/docs/api-reference/ros2/topics' }}
      />
    </DocsShell>
  );
}
