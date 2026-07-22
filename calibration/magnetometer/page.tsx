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
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Magnetometer calibration · NeoRacer Docs',
  description:
    'Calibrate the NeoRacer magnetometer for hard- and soft-iron distortion. Fit an ellipsoid with the osracer_calib ROS node, then push the 12 correction values into the MCU flash with osrbot_tool.py.',
};

export default function MagnetometerPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Calibration', href: '/docs/calibration/motor-trim' },
          { label: 'Magnetometer' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="N" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>CALIBRATION / MAGNETOMETER</Eyebrow>
            <DisplayHeading size="xl">
              THE <Red>MAGNETOMETER.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              Metal and current on the chassis bend the magnetic field the car
              senses, so the raw readings trace an{' '}
              <InfoNote term="ellipsoid" title="Why an ellipsoid?">
                A perfect magnetometer spinning in place would trace a sphere. Distortion stretches and shifts that sphere into an ellipsoid; calibration finds the transform back to a sphere.
              </InfoNote>{' '}
              instead of a sphere. Calibration fits that ellipsoid and corrects it,
              in two layers: a ROS node does the maths, then the values go into the
              board so the firmware corrects in hardware too.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">osracer_calib</ChromeBadge>
              <ChromeBadge variant="outline">≥ 200 samples</ChromeBadge>
              <ChromeBadge variant="outline">12 values → MCU flash</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · why ────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <Eyebrow>01 / WHAT IT CORRECTS</Eyebrow>
          <DisplayHeading size="lg">
            HARD IRON, SOFT <Red>IRON.</Red>
          </DisplayHeading>
          <DashList
            items={[
              <><strong>Hard iron</strong> is a constant offset from permanent magnets and DC currents on the chassis. It shifts the ellipsoid&apos;s centre. The fix is a 3-value offset vector <code style={{ fontFamily: NB.monoFont }}>b</code>.</>,
              <><strong>Soft iron</strong> is axis-dependent scaling from ferromagnetic material near the sensor. It stretches the ellipsoid. The fix is a 3×3 matrix <code style={{ fontFamily: NB.monoFont }}>A</code> that rescales it back to a sphere.</>,
            ]}
          />
          <Callout type="note" title="The correction">
            Every reading is corrected as{' '}
            <code style={{ fontFamily: NB.monoFont }}>B_cal = A · (B_raw − b)</code>.
            Calibration&apos;s job is to find the 3 values of{' '}
            <code style={{ fontFamily: NB.monoFont }}>b</code> and the 9 of{' '}
            <code style={{ fontFamily: NB.monoFont }}>A</code>, twelve in all.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── 02 · ROS calibration ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / FIT THE ELLIPSOID</Eyebrow>
            <DisplayHeading size="lg">
              ROS <Red>CALIBRATION.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Two terminals: one runs the chassis so the magnetometer publishes, the
              other runs the calibration node.
            </p>
            <div style={{ marginTop: 14 }}>
              <MonoLabel>Start both nodes</MonoLabel>
              <Code lang="bash">{`# Terminal 1: chassis driver (publishes the magnetometer data)
ros2 launch osracer_bringup chassis_ackermann.launch.py

# Terminal 2: calibration node
ros2 launch osracer_calib mag_calibration.launch.py`}</Code>
            </div>
            <div style={{ marginTop: 16 }}>
              <MonoLabel>Collect, rotate, stop</MonoLabel>
              <Code lang="bash">{`# Begin collecting
ros2 service call /mag_calibration_node/start_calibration std_srvs/srv/Trigger {}

# Slowly rotate the car through roll, pitch, and yaw until >= 200 samples.
# Watch the count:
ros2 topic echo /mag_calibration_node/status

# Stop and fit
ros2 service call /mag_calibration_node/stop_calibration std_srvs/srv/Trigger {}`}</Code>
            </div>
            <Callout type="tip" title="Turn it every way">
              Roll, pitch, and yaw all matter, so pick the car up and rotate it
              through every orientation, not just a flat spin. The more evenly the
              200-plus samples cover the sphere, the better the fit.
            </Callout>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              The node fits the ellipsoid, publishes the result on the latched{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/mag_bias</code>{' '}
              topic, and saves it to{' '}
              <code style={{ fontFamily: NB.monoFont }}>osracer_calib/config/result.yaml</code>.
              It reloads that file and republishes on the next start, so the ROS
              layer is calibrated from then on.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · push to MCU ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / THE SECOND LAYER</Eyebrow>
            <DisplayHeading size="lg">
              PUSH IT TO THE <Red>BOARD.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The ROS fix corrects readings in software. To also correct in the
              firmware, push the same twelve values into the board&apos;s{' '}
              <InfoNote term="NVS flash" title="NVS flash">Non-volatile storage on the MCU. Values written here survive a power cycle, so the firmware applies the calibration on its own.</InfoNote>{' '}
              with the serial tool.
            </p>
            <Code lang="bash">{`# Open the serial tool
python3 osracer_bringup/script/osrbot_tool.py

# Send the 3 hard-iron + 9 soft-iron values (read them from result.yaml or /mag_bias):
# mc set hx hy hz  s00 s01 s02  s10 s11 s12  s20 s21 s22
mc set 0.000008 -0.000020 0.000015  0.998 0.002 -0.001  0.002 1.001 0.000  -0.001 0.000 0.999`}</Code>
            <div style={{ marginTop: 18 }}>
              <MonoLabel>Other MCU commands</MonoLabel>
              <DataTable
                columns={[
                  { key: 'cmd', label: 'Command', accent: true, mono: true },
                  { key: 'desc', label: 'Does' },
                ]}
                rows={[
                  { cmd: 'mc acquisition', desc: 'Read the current MCU calibration values.' },
                  { cmd: 'mc reset', desc: 'Reset the MCU to the identity matrix (no correction).' },
                  { cmd: 'mc cal [sec]', desc: 'Run an onboard timed calibration (default 30 s, rotate 360°).' },
                ]}
              />
            </div>
            <Callout type="note" title="Two layers, same numbers">
              The ROS layer and the MCU layer hold the same calibration. Re-run the
              ROS fit when the chassis changes, then push the fresh values to the
              board so both stay in step.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'IMU bias', href: '/docs/calibration/imu-bias' }}
        next={{ label: 'Specifications', href: '/docs/reference/specifications' }}
      />
    </DocsShell>
  );
}
