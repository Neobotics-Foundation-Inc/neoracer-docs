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
  NumberedFeatureCard,
  SymptomBanner,
  StepMarker,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'LiDAR empty scan · Troubleshooting · NeoRacer Docs',
  description:
    'The scan reads empty: all zeros through the library, or all inf on /scan. Three quick checks isolate whether it is the driver, the link, or the sensor.',
};

export default function LidarEmptyScanPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Troubleshooting', href: '/docs/troubleshooting/wont-power-on' },
          { label: 'LiDAR empty scan' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 24, paddingTop: 24 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>TROUBLESHOOTING / LIDAR</Eyebrow>
            <DisplayHeading size="xl">
              THE EMPTY LIDAR <Red>SCAN.</Red>
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
              Either the scanner isn't running, the cable is loose, or something
              is physically blocking the spinning head. Three checks, in the
              order they bite most often.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">
                <AnimatedNumeral prefix="~" value={2} suffix=" minutes" />
              </ChromeBadge>
              <ChromeBadge variant="outline">Common cause: driver not up</ChromeBadge>
              <ChromeBadge variant="outline">Visible from SSH</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <SymptomBanner
          seeing={
            <>
              <code style={{ fontFamily: NB.monoFont }}>rc.lidar.get_samples()</code>{' '}
              reads all zeros far beyond the normal rear wedge, or{' '}
              <code style={{ fontFamily: NB.monoFont }}>/scan</code> streams with
              every range <code style={{ fontFamily: NB.monoFont }}>inf</code>.
            </>
          }
          expected={
            <>
              A scan that looks like real distances in centimetres, refreshed
              at 30 Hz. The full{' '}
              <InfoNote term="coordinate frame" title="Coordinate frame">
                The reference point and axes that a sensor's measurements are
                relative to. The LiDAR reports distances from its own frame, so
                once you know where that frame sits on the car, you can place a
                detected wall in the world.
              </InfoNote>{' '}
              and sample layout are on the{' '}
              <a href="/docs/hardware/sensors/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>LiDAR hardware page</a>.
            </>
          }
        />
      </ScrollReveal>

      {/* ── Section 01 · Triage ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={1} label="IS THE SCANNER EVEN RUNNING?" />
            <DisplayHeading size="lg">
              THE SPINNING <Red>HEAD.</Red>
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
              The scanner's spinning head is the fastest read on the car. If it
              isn't moving, the driver isn't running. If it's moving and you
              still get zeros, the data path is broken further up.
            </p>

            <Code lang="bash">{`# 1. Is the teleop driver running?
ssh racecar@neoracer
racecar status              # shows running nodes + /dev/osrbot_* symlinks
ros2 topic list             # should include /scan

# 2. Can you reach the Lakibeam over the lidar subnet?
ping -c 3 192.168.8.2        # the sensor sits at .2, host at .1

# 3. If the ping fails, the USB-C lidar link is down.
ip a | grep 192.168.8        # there should be a usb* interface at .1
racecar setup networking     # rebuilds AP + Ethernet + lidar subnet

# 4. If the ping succeeds, restart the teleop launch.
racecar teleop               # bring the whole stack back up

# 5. Confirm the topic publishes again.
ros2 topic hz /scan          # the rate the Lakibeam is configured for`}</Code>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Probable causes ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={2} label="THE THREE THAT ACTUALLY BREAK" />
            <DisplayHeading size="lg">
              LIKELY <Red>CAUSES.</Red>
            </DisplayHeading>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 18,
                marginTop: 20,
              }}
            >
              <NumberedFeatureCard
                n={1}
                title="Lakibeam unreachable"
                lede="ping 192.168.8.2 fails."
                body={
                  <>
                    The Lakibeam is a UDP sensor on its own subnet. If the host
                    side (the <code style={{ fontFamily: NB.monoFont }}>usb*</code> interface
                    at <code style={{ fontFamily: NB.monoFont }}>192.168.8.1</code>) is
                    down, the driver gets no packets and{' '}
                    <code style={{ fontFamily: NB.monoFont }}>/scan</code> stays
                    empty. <code style={{ fontFamily: NB.monoFont }}>racecar setup networking</code>{' '}
                    re-lays the subnet.
                  </>
                }
                codeChip="ping 192.168.8.2"
              />
              <NumberedFeatureCard
                n={2}
                title="Loose USB-C connector"
                lede="The link between the sensor and the carrier board."
                body={
                  <>
                    The USB-C link is small and easy to vibrate loose after a
                    hard crash. Reseat both ends, then re-run{' '}
                    <code style={{ fontFamily: NB.monoFont }}>racecar teleop</code>{' '}
                    so the lidar node (richbeam_lidar_node0) sees the sensor again.
                  </>
                }
                codeChip="reseat USB-C · racecar teleop"
              />
              <NumberedFeatureCard
                n={3}
                title="Something on the dome"
                lede="A sticker, tape, or cable in the field of view."
                body={
                  <>
                    The driver returns zeros for any sample that doesn't get a
                    return inside its range gate. A piece of black tape across
                    the scanner produces the same number as a dead unit, so a
                    quick wipe of the dome and a clear spin path rule this one
                    out fast.
                  </>
                }
                codeChip="dome clear · 360° free"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Sanity check the driver output">
          Even one good sample tells you the data path is alive. Count finite
          returns across a full scan; a healthy car indoors reads several
          hundred. A bare{' '}
          <code style={{ fontFamily: NB.monoFont }}>ros2 topic echo /scan</code>{' '}
          is misleading here: it truncates the array to its first values, which
          sit in the always-blank rear wedge, so a healthy scan still prints a
          wall of <code style={{ fontFamily: NB.monoFont }}>inf</code>.
          <Code lang="bash">{`# Count finite returns across one full scan.
ros2 topic echo /scan --once --field ranges \\
  | tr -d '[] ' | tr ',' '\\n' | grep -vcE 'inf|^0\\.0*$|^$'

# The driver also watches itself: a blind scan logs [scan-watchdog].
journalctl -u neoracer-teleop -b | grep scan-watchdog`}</Code>
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Still empty after all three?">
          That points at the scanner itself, and we're happy to take it from
          here. A quick email to{' '}
          <a
            href="mailto:support@neobotics.org"
            style={{ color: NB.neoboticsRed, fontWeight: 700 }}
          >
            support@neobotics.org
          </a>{' '}
          with the output of{' '}
          <code style={{ fontFamily: NB.monoFont }}>racecar status</code>,{' '}
          <code style={{ fontFamily: NB.monoFont }}>ping 192.168.8.2</code>, and your order
          number lets us send a replacement. The spinning
          head is calibrated at the factory, so it's easier for everyone if we
          handle the swap rather than have you open the unit at home.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: "Won't power on", href: '/docs/troubleshooting/wont-power-on' }}
        next={{ label: 'Motor jitter', href: '/docs/troubleshooting/motor-jitter' }}
      />
    </DocsShell>
  );
}
