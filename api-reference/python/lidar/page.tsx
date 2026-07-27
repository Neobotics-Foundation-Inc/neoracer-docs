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
import { Crumbs, PrevNext, Callout, Code, DataTable, ApiMethods, type ApiMethod } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';

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
      'The current scan as a flat array of distances in centimetres. Index 0 is directly ahead and the samples run clockwise at equal angles. On the car a scan holds ~1440 samples (0.25° apart); in the simulator it holds 720 (0.5° apart), so index with len(scan), never a fixed number. A sample with no return reads 0.',
  },
  {
    sig: 'rc.lidar.get_num_samples()',
    returns: 'int',
    summary: 'How many samples a full scan contains: 1440 on the NeoRacer, 720 in the simulator. Use it (or len(scan)) whenever you index relative to the whole circle, for example scan[rc.lidar.get_num_samples() // 4] for 90° right.',
  },
  {
    sig: 'rc.lidar.get_samples_async()',
    returns: 'NDArray[Float]',
    summary:
      'The same scan, readable outside the start/update loop. Use it in a one-off script or a notebook cell when the car is not in go mode. Before the first scan arrives it returns an empty array, so check len() when polling it directly.',
  },
];

const UTILS: ApiMethod[] = [
  {
    sig: 'rc_utils.get_lidar_average_distance(scan, angle, window_angle=4)',
    returns: 'float',
    summary: 'Average distance to whatever sits at a given angle, smoothed over a small window so one noisy ray does not throw you off. Works in degrees, so the same call is correct on the car and in the sim regardless of sample count.',
    params: [
      { name: 'scan: NDArray', detail: <>The array from <code style={{ fontFamily: NB.monoFont }}>rc.lidar.get_samples()</code>.</> },
      { name: 'angle: float', detail: <>Degrees clockwise from straight ahead. 0 is forward, 90 is right, 270 is left.</> },
      { name: 'window_angle: float', detail: <>Total width of the averaging window in degrees. Defaults to 4.</> },
    ],
  },
  {
    sig: 'rc_utils.get_lidar_closest_point(scan, window=(0, 360))',
    returns: 'tuple[float, float]',
    summary: 'The (angle, distance) of the nearest return, optionally restricted to an angular window. Handy for "how close is the nearest wall, and where is it". Zero samples (no return) are ignored.',
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
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
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
              The{' '}
              <InfoNote term="Lidar" title="LiDAR">
                A sensor that spins a laser around and times how long each pulse takes to bounce back, turning that into a distance for every direction. That is how the car senses walls and obstacles.
              </InfoNote>{' '}
              module is your sense of distance. One call hands you the current
              scan in centimetres: ~1440 samples on the car, 720 in the
              Playground sim. Work in degrees through the{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc_utils</code>{' '}
              helpers or index relative to{' '}
              <code style={{ fontFamily: NB.monoFont }}>len(scan)</code>, and the
              same program runs unchanged on both.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">~1440 samples · 0.25°</ChromeBadge>
              <ChromeBadge variant="outline">270° live window</ChromeBadge>
              <ChromeBadge variant="outline">index 0 = forward</ChromeBadge>
              <ChromeBadge variant="outline">no return = 0</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

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
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>SIM AND CAR</Eyebrow>
          <DisplayHeading size="lg">
            SIM VS CAR <Red>COUNTS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The API and the angle conventions are identical everywhere: index 0
            forward, clockwise, centimetres. The sample count is not, so a
            program that hardcodes an index breaks the moment it changes
            platform. Work in degrees, or divide{' '}
            <code style={{ fontFamily: NB.monoFont }}>len(scan)</code>.
          </p>
          <div style={{ marginTop: 16 }}>
            <DataTable
              columns={[
                { key: 'k', label: '', accent: true },
                { key: 'car', label: 'NeoRacer', mono: true },
                { key: 'sim', label: 'Playground sim', mono: true },
              ]}
              rows={[
                { k: 'Samples per scan', car: '~1440', sim: '720' },
                { k: 'Angle per sample', car: '0.25°', sim: '0.5°' },
                { k: 'Coverage', car: '360° array · 270° live', sim: '360°' },
                { k: '90° right', car: 'scan[len(scan) // 4]', sim: 'scan[len(scan) // 4]' },
              ]}
            />
          </div>
          <Code lang="python">{`scan = rc.lidar.get_samples()

right = scan[len(scan) // 4]       # 90° right on any platform
rear  = scan[len(scan) // 2]       # directly behind (0 on the car: rear wedge)

# or skip indexing entirely and work in degrees:
right = rc_utils.get_lidar_average_distance(scan, 90)`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="The first scan is waited for">
          On the car, <code style={{ fontFamily: NB.monoFont }}>rc.go()</code>{' '}
          waits for the first scan before your{' '}
          <code style={{ fontFamily: NB.monoFont }}>update()</code> runs, so the
          array is never empty inside the loop. Outside the loop,{' '}
          <code style={{ fontFamily: NB.monoFont }}>get_samples_async()</code>{' '}
          can still return an empty array in the first moments after the driver
          starts; check <code style={{ fontFamily: NB.monoFont }}>len()</code>{' '}
          when polling it directly.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>METHODS</Eyebrow>
          <DisplayHeading size="lg">
            THE LIDAR <Red>METHODS</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>HELPERS · RACECAR_UTILS</Eyebrow>
          <DisplayHeading size="lg">
            LIDAR <Red>HELPERS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Reading a direction by hand means converting an angle to an index and
            averaging a window. The <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar_utils</code> module
            (imported as <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc_utils</code>) already does it, so most
            programs use these two instead of indexing the raw array.
          </p>
          <ApiMethods methods={UTILS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>TYPICAL USE</Eyebrow>
          <DisplayHeading size="lg">
            A WALL-STOP <Red>EXAMPLE</Red>
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

      <PrevNext
        prev={{ label: 'rc.drive', href: '/docs/api-reference/python/drive' }}
        next={{ label: 'rc.camera', href: '/docs/api-reference/python/camera' }}
      />
    </DocsShell>
  );
}
