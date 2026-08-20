import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout, Code, ApiMethods, type ApiMethod } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'rc.lidar · Python API · NeoRacer Docs',
  description:
    'The Lidar module: get_samples returns the scan in centimetres, ~1440 samples at 0.25° on the car and 720 at 0.5° in the simulator. Index 0 is forward, the sensor sees a 270° window, and no-return samples read 0.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'rc.lidar.get_samples()',
    returns: 'NDArray[Float]',
    summary:
      'The current scan as a flat array of distances in centimetres. Index 0 is directly ahead and the samples run clockwise at equal angles.',
  },
  {
    sig: 'rc.lidar.get_num_samples()',
    returns: 'int',
    summary: 'Number of samples a full scan contains. Use it to index relative to the whole scan, for example scan[rc.lidar.get_num_samples() // 4] for 90° right.',
  },
  {
    sig: 'rc.lidar.get_samples_async()',
    returns: 'NDArray[Float]',
    summary:
      'The current scan but readable outside the start/update loop. This function should only be used in a Jupyter Notebook cell, after rc.go_async() has been called.',
  },
];

const UTILS: ApiMethod[] = [
  {
    sig: 'rc_utils.get_lidar_average_distance(scan, angle, window_angle=4)',
    returns: 'float',
    summary: 'Returns the average distance over a small window of samples centred on the given angle. Angles are in degrees, so the call works with any sample count.',
    params: [
      { name: 'scan: NDArray', detail: <>The array from <code style={{ fontFamily: NB.monoFont }}>rc.lidar.get_samples()</code>.</> },
      { name: 'angle: float', detail: <>Degrees clockwise from straight ahead. 0 is forward, 90 is right, 270 is left.</> },
      { name: 'window_angle: float', detail: <>Total width of the averaging window in degrees. Defaults to 4.</> },
    ],
  },
  {
    sig: 'rc_utils.get_lidar_closest_point(scan, window=(0, 360))',
    returns: 'tuple[float, float]',
    summary: 'Returns the (angle, distance) of the nearest return, optionally restricted to an angular window. Samples with no return are ignored.',
    params: [
      { name: 'scan: NDArray', detail: <>The array from <code style={{ fontFamily: NB.monoFont }}>rc.lidar.get_samples()</code>.</> },
      { name: 'window: tuple', detail: <>(start, end) degrees to search within. Defaults to the full circle.</> },
    ],
  },
];

export default function LidarApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'rc.lidar' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RC.<Red>LIDAR</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The Lidar module provides the LiDAR&apos;s current scan,
              number of samples, and distances.
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
            <Red>HELPERS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Reading a direction by hand means converting an angle to an index and
            averaging a window. The <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar_utils</code> module
            (imported as <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc_utils</code>) already does it.
          </p>
          <ApiMethods methods={UTILS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            EXAMPLE <Red>USAGE</Red>
          </DisplayHeading>
          <Code lang="python">{`import sys
sys.path.insert(0, "../library")   # the racecar-neo library on the car

import racecar_core
import racecar_utils as rc_utils

rc = racecar_core.create_racecar()

def start():
    rc.drive.set_max_speed(0.4)    # a calmer scale for close-quarters work

def update():
    scan = rc.lidar.get_samples()  # ~1440 distances on the car, cm
    # average distance in a 10-degree window straight ahead
    front = rc_utils.get_lidar_average_distance(scan, 0, 10)
    rc.drive.set_speed_angle(0.0 if front < 50 else 0.3, 0)

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="The 270° window and the rear wedge">
          The scanner is a{' '}
          <a href="/docs/hardware/sensors/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            Richbeam LakiBeam1
          </a>{' '}
          spinning a full circle at 0.25° per sample, and the scan array covers
          all 360°. The sensor itself reads a 270° window of that circle, so the
          ~90° wedge behind the car never carries a return and reads 0. Any
          sample with no return reads 0 the same way, and the{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc_utils</code> helpers skip
          zeros for you. If you index the raw array rearward, expect zeros
          there, by design, not by fault.
        </Callout>
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
        prev={{ label: 'rc.drive', href: '/docs/api-reference/python/drive' }}
        next={{ label: 'rc.camera', href: '/docs/api-reference/python/camera' }}
      />
    </DocsShell>
  );
}
