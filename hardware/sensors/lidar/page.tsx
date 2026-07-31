import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
  DashList,
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { LidarFrameDiagram } from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';
import { StepCard } from '@/components/docs/StepCard';
import { Crumbs, Callout, PrevNext, Code } from '@/components/docs/DocsPrimitives';

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
          <GhostNumeral n="L" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE PLANAR <Red>LIDAR</Red>
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
              A Richbeam LakiBeam1 planar laser scanner on top of the car. Your
              code reads it as ~1440 distances in centimetres, 0.25° apart,
              index 0 straight ahead. The array covers the full circle; the
              sensor&apos;s live window is 270°, so the rear wedge reads 0.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Same degrees in Playground (sim)</ChromeBadge>
              <ChromeBadge variant="outline"><AnimatedNumeral value={30} suffix=" Hz" /></ChromeBadge>
              <ChromeBadge variant="outline"><AnimatedNumeral value={25} suffix=" m range" /></ChromeBadge>
              <ChromeBadge variant="outline"><AnimatedNumeral value={1440} prefix="~" suffix=" samples" /></ChromeBadge>
              <ChromeBadge variant="outline">270° live window</ChromeBadge>
              <ChromeBadge variant="outline">frame_id: laser</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <StepCard
          title="LakiBeam L1 LiDAR"
          image="/images/build/lidar-2.jpg"
          alt="The LakiBeam L1 spinning LiDAR unit on its mount"
        >
          The LakiBeam L1 mounts on a short tower at the nose and spins a laser
          to measure the distance to walls and obstacles around the car. Wall
          following, gap finding, and mapping all read from this scan. It
          connects to the Jetson through the OSCORE board.
        </StepCard>
      </ScrollReveal>

      {/* ── FIG, coordinate frame ───────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / COORDINATE FRAME"
          caption="The scan array starts at index 0 (forward) and rotates clockwise. The rear arc (around 180°) is occluded by the chassis and returns 0."
        >
          <LidarFrameDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section · Sample layout ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 32 }}>
          <Eyebrow>01 / SAMPLE LAYOUT</Eyebrow>
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
            The full scan is one flat list. Index 0 is forward; the list wraps
            clockwise. To look at a direction, convert your angle to an index
            with one of the helpers below, or use{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>
              rc_utils.get_lidar_average_distance(scan, angle, window_angle)
            </code>{' '}
            and let it do the maths for you.
          </p>
          <Code lang="python">
{`scan = rc.lidar.get_samples()          # ~1440 floats on the car, 720 in the sim
print(len(scan))                       # use this, never a hardcoded count
print(scan[0])                         # cm, straight forward
print(scan[len(scan) // 4])            # cm, 90° right on any platform

# For any other direction, let the helper do the index math:
left  = rc_utils.get_lidar_average_distance(scan, 270, window_angle=8)  # 90° left
front = rc_utils.get_lidar_average_distance(scan, 0,   window_angle=4)`}
          </Code>
        </section>
      </ScrollReveal>

      {/* ── Section · Three things to know ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / WHAT TRIPS PEOPLE UP</Eyebrow>
          <DisplayHeading size="lg">
            COMMON <Red>PITFALLS</Red>
          </DisplayHeading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
              marginTop: 22,
            }}
          >
            <NumberedFeatureCard
              n={1}
              title="The rear is blind"
              lede="Samples roughly 135° to 225° (around the back) return zero."
              body="The chassis occludes the scanner there, so any control loop that divides by a sample without checking it will blow up at the rear. The helpers already skip the zero samples for you, which is the easy way to stay clear of this."
            />
            <NumberedFeatureCard
              n={2}
              title="Centimetres, not metres"
              lede="The same as racecar-neo-library on the real car."
              body="Picking cm or m once at the top of your script and staying with it keeps things honest. Switching units mid-loop is a common way for the gains to drift, and then the wobble is hard to trace back to the cause."
            />
            <NumberedFeatureCard
              n={3}
              title="Sample rate ≠ control rate"
              lede="The scanner runs at 30 Hz. Your loop probably runs faster."
              body="Reading get_samples() twice in the same frame returns the same list, which is fine. Just keep in mind that the loop's deltas aren't 30 Hz samples, so averaging them as if they were will give you the wrong picture."
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section · Python API ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / PYTHON API</Eyebrow>
          <DisplayHeading size="lg">
            THE PYTHON <Red>API</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc.lidar.get_samples() → NDArray[Float]
                </code>{' '}
                · the raw scan in cm, ~1440 samples on the car.
              </>,
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc_utils.get_lidar_average_distance(scan, angle, window_angle=4)
                </code>{' '}
                · average over a degree window. Skips blind-arc zeros for you.
              </>,
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed, fontSize: 14 }}>
                  rc_utils.get_lidar_closest_point(scan, window=(0, 360))
                </code>{' '}
                · returns <code style={{ fontFamily: NB.monoFont }}>(angle_deg, distance_cm)</code>.
              </>,
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── Section · ROS 2 ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>04 / ROS 2</Eyebrow>
          <DisplayHeading size="lg">
            THE /scan <Red>TOPIC</Red>
          </DisplayHeading>
          <div
            style={{
              background: NB.tarmacBlue,
              color: NB.haloWhite,
              borderRadius: 12,
              padding: '20px 22px',
              fontFamily: NB.monoFont,
              fontSize: 13.5,
              lineHeight: 1.7,
              boxShadow: NB.shadowCard,
            }}
          >
            <div style={{ color: NB.neoboticsRed, fontWeight: 700, marginBottom: 8 }}>
              // ros2 topic info /scan
            </div>
            Type:&nbsp;&nbsp;&nbsp;<span style={{ color: NB.neoboticsRed }}>sensor_msgs/msg/LaserScan</span>
            <br />
            Rate:&nbsp;&nbsp;&nbsp;30 Hz
            <br />
            Frame:&nbsp;&nbsp;<span style={{ color: NB.neoboticsRed }}>laser</span>
            <br />
            QoS:&nbsp;&nbsp;&nbsp;&nbsp;Reliable, Volatile, depth 10
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section · The hardware ───────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>05 / THE SCANNER ITSELF</Eyebrow>
          <DisplayHeading size="lg">
            RICHBEAM <Red>LAKIBEAM1</Red>
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
            The scanner is an off-the-shelf Richbeam LakiBeam1. If you ever want
            the raw datasheet numbers straight from the source, the{' '}
            <a
              href="https://www.richbeam.com/product/LakiBeam"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: NB.neoboticsRed, fontWeight: 700 }}
            >
              Richbeam LakiBeam product page
            </a>{' '}
            is the place to go. These are the sensor's native numbers: it spins
            at 0.25° resolution, ~1440 samples per revolution, and the library
            hands you that scan as-is. Nothing is resampled; the 270° live
            window is a sensor setting, and the rear wedge outside it reads 0.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              marginTop: 18,
            }}
          >
            {[
              ['Live window', '270° (rear wedge reads 0)'],
              ['Angular resolution', '0.25° native'],
              ['Samples per scan', '~1440 per revolution'],
              ['Scan rate', '30 Hz'],
              ['Range', '≥25 m @ 90%, ≥15 m @ 10%'],
              ['Range accuracy', '±2 cm'],
              ['Laser wavelength', '940 nm (Class 1, eye-safe)'],
              ['Interface', 'USB-C bridge (UDP/IP, sensor at 192.168.8.2)'],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  background: NB.haloWhite,
                  border: `1px solid ${NB.borderOnBeige}`,
                  borderRadius: 0,
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{
                    fontFamily: NB.monoFont,
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: NB.textMutedBeige,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontFamily: NB.headingFont,
                    fontSize: 16,
                    fontWeight: 700,
                    color: NB.textOnBeige,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Got a scan that looks empty?">
          Nine out of ten times it's the cable. The full decision tree lives at{' '}
          <Link href="/docs/troubleshooting/lidar-empty-scan" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            Troubleshooting · LiDAR empty scan
          </Link>
          .
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Compute', href: '/docs/hardware/compute' }}
        next={{ label: 'Camera', href: '/docs/hardware/sensors/camera' }}
      />
    </DocsShell>
  );
}
