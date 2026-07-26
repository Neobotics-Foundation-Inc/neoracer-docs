import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
  Fig,
  NumberedFeatureCard,
  StepMarker,
} from '@/components/docs/Editorial';
import {
  CalibrationStepStrip,
  type CalibrationStep,
  LidarFrameDiagram,
} from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'LiDAR mount · Calibration · NeoRacer Docs',
  description:
    'Get the scanner mounted level and aimed so sample index 0 points true forward. A physical alignment you confirm in software against a flat wall.',
};

const STEPS: CalibrationStep[] = [
  { n: 1, title: 'Seat + level', sub: 'flush, square',        iconKey: 'wheel' },
  { n: 2, title: 'SSH in',       sub: 'to the Jetson',        iconKey: 'ssh' },
  { n: 3, title: 'Wall test',    sub: 'known distance',       iconKey: 'stopwatch' },
  { n: 4, title: 'Read /scan',   sub: 'check index 0',        iconKey: 'cli' },
  { n: 5, title: 'Lock it down', sub: 'snug the mount',       iconKey: 'save' },
];

export default function LidarMountPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Calibration', href: '/docs/calibration/motor-trim' },
          { label: 'LiDAR mount' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>CALIBRATION / LIDAR MOUNT</Eyebrow>
            <DisplayHeading size="xl">
              THE LIDAR <Red>MOUNT.</Red>
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
              Every wall-follow and gap-finder assumes that sample 0 points exactly
              where the car points. If the scanner sits a few degrees rotated, the
              whole scan rotates with it and the car steers into a wall it thinks is
              ahead. This one is a physical alignment, confirmed in software.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={5} prefix="~" suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline">Mechanical</ChromeBadge>
              <ChromeBadge variant="outline">frame_id: laser</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A · coordinate frame ────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / WHAT THE INDEX MEANS"
          caption="Index 0 is forward, index 360 is 90° right, index 1080 is 90° left, at 0.25° per index. A yawed mount slides this whole dial off true, so forward no longer reads at 0."
        >
          <LidarFrameDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section 01 · Why it matters ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={1} label="WHY IT MATTERS" />
            <DisplayHeading size="lg">
              YAW AND <Red>TILT.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 740,
              }}
            >
              Two things can be off with a planar scanner. A yaw error rotates the
              whole scan, so the forward reading lands at the wrong index and every
              angle you read is shifted. A tilt error points the plane up or down,
              so the beam clips the floor or the ceiling at range and reads short.
              Mounting it flush and square fixes both at once.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · You'll need ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={2} label="YOU'LL NEED" />
            <DisplayHeading size="lg">
              WHAT YOU <Red>NEED.</Red>
            </DisplayHeading>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 18,
                marginTop: 20,
              }}
            >
              <NumberedFeatureCard
                n={1}
                title="A flat wall"
                lede="Wide and featureless."
                body="A blank wall gives a clean reference. Park the car squared to it with the nose pointing straight at it, so the forward sample should read the wall."
              />
              <NumberedFeatureCard
                n={2}
                title="A tape measure"
                lede="To set a known distance."
                body="Place the car a known distance from the wall, say one metre, so the forward reading has a number to match. The scan is in centimetres."
              />
              <NumberedFeatureCard
                n={3}
                title="The driver running"
                lede="So /scan publishes."
                body={
                  <>
                    You read the live scan to confirm the aim, so bring up the{' '}
                    <a href="/docs/software/ros2-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>driver</a>{' '}
                    first. The hardware detail is on the{' '}
                    <a href="/docs/hardware/sensors/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>LiDAR</a>{' '}
                    page.
                  </>
                }
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FIG. B · step strip ──────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. B / FIVE STEPS, START TO FINISH"
          caption="Seat the scanner flush, park square to a wall at a known distance, read the scan to confirm forward lands at index 0, then snug it down."
        >
          <div style={{ paddingTop: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: 480 }}>
              <CalibrationStepStrip steps={STEPS} />
            </div>
          </div>
        </Fig>
      </ScrollReveal>

      {/* ── Section 03 · Seat it ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={3} label="SEAT IT" />
            <DisplayHeading size="lg">
              FLUSH AND <Red>SQUARE.</Red>
            </DisplayHeading>
            <DashList
              items={[
                <>Sit the scanner flat on its mount so its scan plane is level with the floor, not nodding up or down.</>,
                <>Square it to the chassis so the zero mark faces straight forward, in line with the car's centerline.</>,
                <>Leave the screws finger-tight for now. You will nudge the yaw during the wall test, then lock it.</>,
                <>Keep the cable strain-relieved so a tug on it cannot rotate the unit later.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · Verify ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={4} label="VERIFY" />
            <DisplayHeading size="lg">
              THE WALL <Red>TEST.</Red>
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
              Park the car one metre from the wall, nose square to it, in open
              space on the left and right. Then read forward and the two sides:
            </p>

            <Code lang="python">{`import racecar_core

rc = racecar_core.create_racecar()


def start():
    pass


def update():
    scan = rc.lidar.get_samples()   # ~1440 floats on the car, cm
    n = len(scan)
    forward = scan[0]               # index 0 = straight ahead
    right   = scan[n // 4]          # a quarter turn = 90 deg right
    left    = scan[3 * n // 4]      # three quarters = 90 deg left
    print(f"forward {forward:5.0f} cm   right {right:5.0f}   left {left:5.0f}")


rc.set_start_update(start, update)
rc.go()`}</Code>

            <DashList
              items={[
                <><strong>Forward should read your tape distance</strong> (about 100 cm). Much shorter means the plane is tilted down into the floor; much longer means it is aimed over the wall.</>,
                <><strong>The nearest point of the front arc should sit at index 0.</strong> If the closest reading is a few indices to one side, the mount is yawed by that many half-degrees. Rotate it the other way and re-read.</>,
                <><strong>Left and right should match</strong> in a symmetric space, a quick confirmation the zero is centered.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 05 · It's mechanical ─────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={5} label="WHERE IT LIVES" />
            <DisplayHeading size="lg">
              WHERE IT <Red>LIVES.</Red>
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
              The teaching driver has no fine yaw-offset parameter for the scanner,
              so this alignment lives in the hardware. Once the wall test reads
              clean, tighten the mount and you are done. If you run the{' '}
              <code style={{ fontFamily: NB.monoFont }}>osracer</code> stack for{' '}
              <InfoNote term="SLAM" title="SLAM">Simultaneous Localization and Mapping. The robot builds a map of an unknown space while tracking its own position within that map, usually from LiDAR or camera data.</InfoNote>{' '}
              and navigation, the mount pose is also encoded as the{' '}
              <code style={{ fontFamily: NB.monoFont }}>base_link</code> to{' '}
              <code style={{ fontFamily: NB.monoFont }}>laser</code> transform in
              its{' '}
              <InfoNote term="URDF" title="URDF">Unified Robot Description Format. An XML file that describes a robot's links and joints, including where each sensor sits relative to the body.</InfoNote>, covered on the{' '}
              <a href="/docs/api-reference/ros2/tf-frames" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                TF frames
              </a>{' '}
              page; keep the two in agreement.
            </p>

            <Callout type="note" title="The rear arc is supposed to be empty">
              Samples around the back of the car, roughly index 540 to 900, read
              zero because the chassis blocks the beam. That is not a mount error.
              The helpers skip those zeros for you.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Troubleshooting">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <strong>Forward reads far too short everywhere.</strong> The plane is
              tilted into the floor. Re-level the mount so the scan is parallel to
              the ground.
            </li>
            <li>
              <strong>Whole scan looks rotated.</strong> The unit is yawed or the{' '}
              <code style={{ fontFamily: NB.monoFont }}>inverted</code> parameter is
              wrong for how it is mounted. See the{' '}
              <a href="/docs/api-reference/ros2/params" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                LiDAR parameters
              </a>
              .
            </li>
            <li>
              <strong>Scan is all zeros.</strong> That is a cabling or driver
              issue, not a mount one. Walk the{' '}
              <a href="/docs/troubleshooting/lidar-empty-scan" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                empty-scan
              </a>{' '}
              tree.
            </li>
          </ul>
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Servo center', href: '/docs/calibration/servo-center' }}
        next={{ label: 'Camera intrinsics', href: '/docs/calibration/camera-intrinsics' }}
      />
    </DocsShell>
  );
}
