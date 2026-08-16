import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  Fig,
} from '@/components/docs/Editorial';
import { LidarFrameDiagram } from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { SensorSheet } from '@/components/docs/SensorSheet';
import { Crumbs, PrevNext, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'LiDAR · Hardware · NeoRacer Docs',
  description: '30 Hz planar scanner, ~1440 samples over a 270° live window. Coordinate frame, sample layout, Python and ROS 2 access.',
};

export default function LidarPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Sensors', href: '/docs/hardware/sensors' },
          { label: 'LiDAR' },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE <Red>LIDAR</Red>
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
              A Richbeam LakiBeam1 planar laser scanner on top of the car. It
              connects to the Jetson through the OSCORE board.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section · The scanner ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            RICHBEAM <Red>LAKIBEAM1</Red>
          </DisplayHeading>
          <SensorSheet
            title="LakiBeam L1 LiDAR"
            image="/images/build/lidar-2-sheet.jpg"
            alt="The LakiBeam L1 spinning LiDAR unit with its mounting screw and cable"
            imageStyle={{ objectPosition: 'right center' }}
            specs={[
              ['Scan rate', '30 Hz (max)'],
              ['Horizontal FOV', '270°'],
              ['Angular resolution', '0.25° native'],
              ['Range', '≥25 m @ 90%, ≥15 m @ 10%'],
              ['Range accuracy', '±2 cm'],
              ['Samples per scan', '~1440 per revolution'],
              ['Laser wavelength', '940 nm (Class 1, eye-safe)'],
              ['Dimensions', '60 × 60 × 80 mm'],
              ['Range principle', 'TOF'],
              ['Operating voltage', '9V to 36V'],
              ['Power consumption', '≤2W'],
            ]}
          >
            The scanner is an off-the-shelf Richbeam LakiBeam1. For raw
            datasheet numbers, visit the{' '}
            <a
              href="https://www.richbeam.com/product/LakiBeam"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: NB.neoboticsRed, fontWeight: 700 }}
            >
              Richbeam LakiBeam product page
            </a>.
          </SensorSheet>
        </section>
      </ScrollReveal>

      {/* ── Section · Sample layout ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            THE SCAN <Red>LAYOUT</Red>
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
            A scan is one flat list of distances. Index 0 points straight
            ahead, and the rest of the list goes clockwise from there. To read
            a direction, turn the angle into an index using the helpers below,
            or call{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>
              rc_utils.get_lidar_average_distance
            </code>.
          </p>
          <div style={{ marginTop: 18 }}>
            <Fig
              label="FIG. A / COORDINATE FRAME"
              caption="The scan array starts at index 0 (forward) and rotates clockwise. The rear arc (around 180°) is occluded by the chassis and returns 0."
            >
              <LidarFrameDiagram />
            </Fig>
          </div>
          <Code lang="python">
{`scan = rc.lidar.get_samples()          # ~1440 floats on the car
print(len(scan))                       # use this, never a hardcoded count
print(scan[0])                         # cm, straight forward
print(scan[len(scan) // 4])            # cm, 90° right on any platform

# For any other direction, let the helper do the index math:
left  = rc_utils.get_lidar_average_distance(scan, 270, window_angle=8)  # 90° left
front = rc_utils.get_lidar_average_distance(scan, 0,   window_angle=4)`}
          </Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Compute', href: '/docs/hardware/compute' }}
        next={{ label: 'Camera', href: '/docs/hardware/sensors/camera' }}
      />
    </DocsShell>
  );
}
