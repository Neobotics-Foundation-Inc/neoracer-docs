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
  title: 'rc.lidar · Python API · NeoRacer Docs',
  description:
    'The Lidar module: get_samples returns a fixed 720-float scan in centimetres, 0.5° apart, index 0 forward. Same API in the Playground sim and on the car.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'rc.lidar.get_samples()',
    returns: 'NDArray[720, Float]',
    summary:
      'The current scan as a flat array of 720 distances in centimetres. Index 0 is directly ahead and the samples run clockwise, so each index is 0.5° from the next.',
  },
  {
    sig: 'rc.lidar.get_num_samples()',
    returns: 'int',
    summary: 'How many samples a full scan contains. Always 720 on the NeoRacer, so you rarely need it, but it keeps a loop honest if you index relative to the length.',
  },
  {
    sig: 'rc.lidar.get_samples_async()',
    returns: 'NDArray[720, Float]',
    summary:
      'The same 720-float scan, but readable outside the start/update loop. Use it in a one-off script or a notebook cell when the car is not in go mode.',
  },
];

const UTILS: ApiMethod[] = [
  {
    sig: 'rc_utils.get_lidar_average_distance(scan, angle, window_angle=4)',
    returns: 'float',
    summary: 'Average distance to whatever sits at a given angle, smoothed over a small window so one noisy ray does not throw you off.',
    params: [
      { name: 'scan: NDArray', detail: <>The array from <code style={{ fontFamily: NB.monoFont }}>rc.lidar.get_samples()</code>.</> },
      { name: 'angle: float', detail: <>Degrees clockwise from straight ahead. 0 is forward, 90 is right, 270 is left.</> },
      { name: 'window_angle: float', detail: <>Total width of the averaging window in degrees. Defaults to 4.</> },
    ],
  },
  {
    sig: 'rc_utils.get_lidar_closest_point(scan, window=(0, 360))',
    returns: 'tuple[float, float]',
    summary: 'The (angle, distance) of the nearest return, optionally restricted to an angular window. Handy for "how close is the nearest wall, and where is it".',
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
          { label: 'Docs', href: '/docs' },
          { label: 'API Reference', href: '/docs/api-reference/python/drive' },
          { label: 'rc.lidar' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>API REFERENCE / PYTHON</Eyebrow>
            <DisplayHeading size="xl">
              RC.<Red>LIDAR.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The{' '}
              <InfoNote term="Lidar" title="LiDAR">
                A sensor that spins a laser around and times how long each pulse takes to bounce back, turning that into a distance for every direction. That is how the car senses walls and obstacles.
              </InfoNote>{' '}
              module is your 360° sense of distance. One call hands you
              a flat array of 720 distances in centimetres, and the library gives
              you the exact same array in the Playground sim and on the car, so a
              wall-follower you write in the browser runs unchanged on the
              NeoRacer.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Sim ↔ car identical</ChromeBadge>
              <ChromeBadge variant="outline">720 samples</ChromeBadge>
              <ChromeBadge variant="outline">0.5° apart</ChromeBadge>
              <ChromeBadge variant="outline">index 0 = forward</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="The API gives 720, the sensor gives more">
          The physical scanner is a{' '}
          <a href="/docs/hardware/sensors/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            Richbeam LakiBeam1
          </a>{' '}
          running at 0.25° (about 1080 points across its 270° arc). The library
          resamples that down to a fixed 720-float, full-circle array so your
          code never has to care which sensor is underneath it. When you call{' '}
          <code style={{ fontFamily: NB.monoFont }}>get_samples()</code> you always get 720.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>METHODS</Eyebrow>
          <DisplayHeading size="lg">
            THE LIDAR <Red>METHODS.</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>HELPERS · RACECAR_UTILS</Eyebrow>
          <DisplayHeading size="lg">
            LIDAR <Red>HELPERS.</Red>
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
            A WALL-STOP <Red>EXAMPLE.</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core
import racecar_utils as rc_utils

rc = racecar_core.create_racecar()

def start():
    rc.drive.set_max_speed(0.4)

def update():
    scan = rc.lidar.get_samples()                  # 720 distances, cm
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
