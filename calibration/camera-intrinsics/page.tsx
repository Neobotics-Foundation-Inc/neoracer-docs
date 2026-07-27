import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import {
  CalibrationStepStrip,
  type CalibrationStep,
} from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Camera intrinsics · Calibration · NeoRacer Docs',
  description:
    'Measure the camera matrix and lens distortion with the standard ROS camera_calibration tool and a checkerboard. Calibrate against the decoded camera stream, since /camera is JPEG-encoded.',
};

const STEPS: CalibrationStep[] = [
  { n: 1, title: 'Decode /camera', sub: 'JPEG -> pixels',      iconKey: 'cli' },
  { n: 2, title: 'Run calibrator', sub: 'camera_calibration', iconKey: 'ssh' },
  { n: 3, title: 'Wave the board', sub: 'fill the bars',      iconKey: 'wheel' },
  { n: 4, title: 'Calibrate',     sub: 'let it solve',        iconKey: 'stopwatch' },
  { n: 5, title: 'Save',          sub: 'camera_info YAML',    iconKey: 'save' },
];

/* A simple checkerboard reference, the geometry the calibrator tracks. */
function CheckerboardDiagram() {
  const cols = 8;
  const rows = 6;
  const cell = 40;
  const ox = 60;
  const oy = 30;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if ((r + c) % 2 === 0) {
        cells.push(
          <rect key={`${r}-${c}`} x={ox + c * cell} y={oy + r * cell} width={cell} height={cell} fill={NB.tarmacBlue} />
        );
      }
    }
  }
  // inner corners the detector finds
  const corners = [];
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      corners.push(<circle key={`p-${r}-${c}`} cx={ox + c * cell} cy={oy + r * cell} r={3} fill={NB.neoboticsRed} />);
    }
  }
  return (
    <svg viewBox="0 0 480 320" width="100%" style={{ display: 'block', maxWidth: 520, margin: '0 auto' }}>
      <rect x={ox} y={oy} width={cols * cell} height={rows * cell} fill={NB.haloWhite} stroke={NB.tarmacBlue} strokeWidth="1.5" />
      {cells}
      {corners}
      <text x="240" y="300" fontFamily={NB.monoFont} fontSize="11" letterSpacing="1.5" textAnchor="middle" fill={NB.textMutedBeige} fontWeight="700">
        8 × 6 SQUARES · 35 INNER CORNERS · KNOWN SQUARE SIZE
      </text>
    </svg>
  );
}

export default function CameraIntrinsicsPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Calibration', href: '/docs/calibration/motor-trim' },
          { label: 'Camera intrinsics' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              CAMERA <Red>INTRINSICS</Red>
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
              A lens bows straight lines near the edges and the{' '}
              <InfoNote term="pinhole model" title="Pinhole model">
                The standard way cameras are modeled in vision: light passes
                through a single point and lands on a flat sensor. It is defined
                by the focal lengths and the image center, which is what you
                measure here.
              </InfoNote>{' '}
              needs
              to know the focal lengths and the true center of the image. You only
              need this once, and only if you do geometry with the camera: lane
              lines on the ground, distances, anything that has to be metric. The
              standard ROS tool measures it from a checkerboard.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={10} prefix="~" suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline">Only for metric vision</ChromeBadge>
              <ChromeBadge variant="outline">640 × 480</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A · checkerboard ────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / THE REFERENCE"
          caption="A flat checkerboard of known square size. The tool finds the inner corners in each frame and, because it knows the true geometry, solves for the lens that would produce what the camera sees."
        >
          <CheckerboardDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section 01 · What you measure ─────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHAT YOU <Red>MEASURE</Red>
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
              Two things come out of this. The camera matrix holds the focal
              lengths{' '}
              <code style={{ fontFamily: NB.monoFont }}>fx, fy</code> and the
              principal point{' '}
              <code style={{ fontFamily: NB.monoFont }}>cx, cy</code>, the real
              center of the sensor. The distortion coefficients, usually five,
              describe how the lens bows the image so you can undo it. Together they
              let you turn a pixel into a ray you can trust.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · You'll need ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHAT YOU'LL <Red>NEED</Red>
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
                title="A checkerboard"
                lede="Flat, rigid, known size."
                body="Print one and tape it to something stiff like foam board. Measure one square edge in metres; the tool needs that to set the scale. A warped sheet ruins the fit."
              />
              <NumberedFeatureCard
                n={2}
                title="The decoded stream"
                lede="/camera is JPEG-encoded."
                body={
                  <>
                    The raw{' '}
                    <code style={{ fontFamily: NB.monoFont }}>/camera</code> topic
                    carries JPEG bytes, not a plain image, so the calibrator
                    needs a decoded republish in front of it. A ten-line relay
                    node (below) subscribes with sensor-data QoS, runs{' '}
                    <code style={{ fontFamily: NB.monoFont }}>cv2.imdecode</code>,
                    and republishes plain frames.
                  </>
                }
              />
              <NumberedFeatureCard
                n={3}
                title="camera_calibration"
                lede="The standard ROS tool."
                body="Part of the ROS image_pipeline. This is the same cameracalibrator the whole ecosystem uses, not a NeoRacer-specific script, so any ROS camera guide applies."
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FIG. B · step strip ──────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. B / FIVE STEPS, START TO FINISH"
          caption="Point the calibrator at the decoded feed, move the board until the coverage bars fill, let it solve, and save the result."
        >
          <div style={{ paddingTop: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: 480 }}>
              <CalibrationStepStrip steps={STEPS} />
            </div>
          </div>
        </Fig>
      </ScrollReveal>

      {/* ── Section 03 · Procedure ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              THE <Red>PROCEDURE</Red>
            </DisplayHeading>

            <Code lang="python">{`# 1. Save as decode_relay.py on the car and run: python3 decode_relay.py
#    It turns the JPEG /camera stream into plain frames on /camera/decoded.
import rclpy, cv2, numpy as np
from rclpy.node import Node
from rclpy.qos import qos_profile_sensor_data
from sensor_msgs.msg import Image

class Relay(Node):
    def __init__(self):
        super().__init__('decode_relay')
        self.pub = self.create_publisher(Image, '/camera/decoded', 10)
        self.create_subscription(Image, '/camera', self.cb, qos_profile_sensor_data)
    def cb(self, msg):
        frame = cv2.imdecode(np.frombuffer(msg.data, np.uint8), cv2.IMREAD_COLOR)
        out = Image(header=msg.header, height=frame.shape[0], width=frame.shape[1],
                    encoding='bgr8', step=frame.shape[1] * 3, data=frame.tobytes())
        self.pub.publish(out)

rclpy.init(); rclpy.spin(Relay())`}</Code>

            <Code lang="bash">{`# Confirm the decoded stream is flowing:
ros2 topic hz /camera/decoded

# 2. Run the calibrator against it. Match --size to the INNER corners of
#    your board and --square to one square edge in metres.
ros2 run camera_calibration cameracalibrator \\
    --size 7x5 --square 0.035 \\
    image:=/camera/decoded camera:=/camera

# 3. Hold the board in view and move it: left, right, near, far, and
#    tilted. Watch the X, Y, Size, and Skew bars fill toward green.

# 4. When all four bars are full, click CALIBRATE, then SAVE.`}</Code>

            <Callout type="note" title="--size is inner corners, not squares">
              An 8 by 6 square board has 7 by 5 inner corners, so you pass{' '}
              <code style={{ fontFamily: NB.monoFont }}>--size 7x5</code>. Getting
              this off by one is the most common reason the board is never detected.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · The output ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              A CAMERA_INFO <Red>YAML</Red>
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
              Save writes a calibration archive with the intrinsics in the standard
              camera_info shape. It looks like this, at the camera's 640 by 480
              resolution:
            </p>

            <Code lang="yaml">{`# camera_info, written by camera_calibration (values are illustrative)
image_width: 640
image_height: 480
camera_name: neoracer_camera
camera_matrix:
  rows: 3
  cols: 3
  data: [495.2,   0.0, 318.7,
           0.0, 496.1, 241.3,
           0.0,   0.0,   1.0]
distortion_model: plumb_bob
distortion_coefficients:
  rows: 1
  cols: 5
  data: [0.061, -0.118, 0.0008, -0.0003, 0.0]`}</Code>

            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 15,
                lineHeight: 1.6,
                color: NB.textMutedBeige,
                maxWidth: 720,
                marginTop: 14,
              }}
            >
              The diagonal of the camera matrix is{' '}
              <code style={{ fontFamily: NB.monoFont }}>fx, fy</code>; the right
              column is <code style={{ fontFamily: NB.monoFont }}>cx, cy</code>, near
              but not exactly the image center. That offset is exactly the kind of
              thing your eye cannot see but your geometry depends on.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 05 · Using it ────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              USING THE <Red>CALIBRATION</Red>
            </DisplayHeading>
            <DashList
              items={[
                <>Point your camera node or a republisher at the saved file so it publishes a matching{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>camera_info</code>{' '}
                  alongside the image.</>,
                <>Any consumer that undistorts or projects, including the{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>osracer</code>{' '}
                  navigation stack, reads those intrinsics to do honest geometry.</>,
                <>If you only ever use the camera for raw pixels, lane colour, a sign classifier, you can skip this page entirely.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Troubleshooting">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <strong>Board never detected.</strong> Almost always the{' '}
              <code style={{ fontFamily: NB.monoFont }}>--size</code> is wrong
              (count inner corners, not squares) or you pointed it at raw{' '}
              <code style={{ fontFamily: NB.monoFont }}>/camera</code> instead of{' '}
              <code style={{ fontFamily: NB.monoFont }}>/camera/decoded</code>.
            </li>
            <li>
              <strong>CALIBRATE stays greyed out.</strong> One coverage bar is not
              full. Move the board to the part of the frame it is asking for,
              usually the far corners or extreme tilt.
            </li>
            <li>
              <strong>High{' '}
              <InfoNote term="reprojection error" title="Reprojection error">
                A score for how well the solved calibration fits. The tool
                projects the known board corners back into the image and measures
                how far they land from where it actually saw them. Lower is
                better.
              </InfoNote>.</strong> The board flexed or your
              square size is wrong. Use a rigid board and re-measure one square.
            </li>
          </ul>
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'LiDAR mount', href: '/docs/calibration/lidar-mount' }}
        next={{ label: 'IMU bias', href: '/docs/calibration/imu-bias' }}
      />
    </DocsShell>
  );
}
