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
    sig: 'racecar_utils.clamp(value: float, min: float, max: float)',
    returns: 'float',
    summary: 'Clamps a value between a minimum and a maximum.',
  },
  {
    sig: 'racecar_utils.remap_range(val: float, old_min: float, old_max: float, new_min: float, new_max: float, saturate: bool = False)',
    returns: 'float',
    summary:
      'Remaps a value from one range to another. With saturate, the result is clamped to the new range.',
  },
];

const IMAGES: ApiMethod[] = [
  {
    sig: 'racecar_utils.crop(image: NDArray, top_left_inclusive: tuple[float, float], bottom_right_exclusive: tuple[float, float])',
    returns: 'NDArray',
    summary:
      'Returns the rectangle of the image between the two (row, column) corners.',
  },
  {
    sig: 'racecar_utils.stack_images_horizontal(image_0: NDArray, image_1: NDArray)',
    returns: 'NDArray',
    summary: (
      <>
        Joins two images side by side. <code style={{ fontFamily: NB.monoFont }}>stack_images_vertical</code> joins them top to bottom.
      </>
    ),
  },
];

const CONTOURS: ApiMethod[] = [
  {
    sig: 'racecar_utils.find_contours(color_image: NDArray, hsv_lower: tuple[int, int, int], hsv_upper: tuple[int, int, int])',
    returns: 'list[NDArray]',
    summary:
      'Finds all contours of the given HSV color range in the image.',
  },
  {
    sig: 'racecar_utils.get_largest_contour(contours: list[NDArray], min_area: int = 30)',
    returns: 'NDArray | None',
    summary:
      'Returns the largest contour with area greater than min_area, or None if there is none.',
  },
  {
    sig: 'racecar_utils.get_contour_center(contour: NDArray)',
    returns: 'tuple[int, int] | None',
    summary: 'Returns the (row, column) center of a contour.',
  },
  {
    sig: 'racecar_utils.get_contour_area(contour: NDArray)',
    returns: 'float',
    summary: 'Returns the area of a contour in pixels.',
  },
  {
    sig: 'racecar_utils.draw_contour(color_image: NDArray, contour: NDArray, color: tuple[int, int, int] = ColorBGR.green.value)',
    returns: 'None',
    summary: 'Draws a contour outline onto the image, in place.',
  },
  {
    sig: 'racecar_utils.draw_circle(color_image: NDArray, center: tuple[int, int], color: tuple[int, int, int] = ColorBGR.yellow.value, radius: int = 6)',
    returns: 'None',
    summary: 'Draws a circle onto the image, in place.',
  },
];

const MARKERS: ApiMethod[] = [
  {
    sig: 'racecar_utils.get_ar_markers(color_image: NDArray, potential_colors: list[tuple[tuple[int, int, int], tuple[int, int, int], str]] = None, marker_type: int = cv.aruco.DICT_6X6_250)',
    returns: 'list[ARMarker]',
    summary:
      'Finds ArUco markers in the image. Each marker carries its id and corner positions.',
  },
  {
    sig: 'racecar_utils.draw_ar_markers(color_image: NDArray, markers: list[ARMarker], color: tuple[int, int, int] = ColorBGR.green.value)',
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
          <GhostNumeral n="08" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RACECAR_<Red>UTILS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The racecar_utils module provides helper functions for working
              with numbers, images, and the LiDAR. The
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
import racecar_utils

rc = racecar_core.create_racecar()

BLUE = ((90, 50, 50), (120, 255, 255))   # HSV range

def start():
    pass

def update():
    image = rc.camera.get_color_image()
    contours = racecar_utils.find_contours(image, BLUE[0], BLUE[1])
    largest = racecar_utils.get_largest_contour(contours)
    if largest is not None:
        center = racecar_utils.get_contour_center(largest)
        # steer toward the contour: map its column to a steering angle
        angle = racecar_utils.remap_range(center[1], 0, image.shape[1], -1, 1)
        rc.drive.set_speed_angle(0.3, angle)
    else:
        rc.drive.stop()

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, paddingBottom: 8 }}>
          For full documentation, visit the{' '}
          <a
            href="https://mitracecarneo.github.io/racecar-neo-library/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: NB.neoboticsRed, fontWeight: 700 }}
          >
            racecar-neo-library documentation
          </a>.
        </p>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'rc.vision', href: '/docs/api-reference/python/vision' }}
        next={{ label: 'CLI overview', href: '/docs/api-reference/cli' }}
      />
    </DocsShell>
  );
}
