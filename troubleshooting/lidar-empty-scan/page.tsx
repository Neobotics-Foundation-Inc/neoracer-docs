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
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'LiDAR empty scan · Troubleshooting · NeoRacer Docs',
  description:
    'rc.lidar.get_samples returns 720 zeros. Three quick checks isolate whether it is the driver, the cable, or the unit.',
};

export default function LidarEmptyScanPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
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
              returns a list of 720 zeros. Same answer from{' '}
              <code style={{ fontFamily: NB.monoFont }}>ros2 topic echo /scan</code>.
            </>
          }
          expected={
            <>
              A scan that looks like real distances in centimetres, refreshed
              at 30 Hz. The full{' '}
              <InfoNote term="coordinate frame" title="Coordinate frame">
                The reference point and axes that a sensor's measurements are
                relative to. The LiDAR reports distances from its own frame, so
                you need to know where that frame sits on the car to place a
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
            <Eyebrow>01 / IS THE SCANNER EVEN RUNNING?</Eyebrow>
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

            <Code lang="bash">{`# 1. Is the bringup unit up?
ssh racecar@neoracer
systemctl is-active neoracer-lidar    # active

# 2. If "inactive" or "failed", read the logs.
journalctl -u neoracer-lidar -n 30 --no-pager

# 3. Force a restart.
sudo systemctl restart neoracer-lidar

# 4. Confirm the topic publishes again.
ros2 topic hz /scan                    # ~30 Hz expected`}</Code>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Probable causes ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / THE THREE THAT ACTUALLY BREAK</Eyebrow>
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
                title="Driver crashed"
                lede="The systemd unit is down."
                body={
                  <>
                    The most common one. A bad firmware build or an OS update
                    can leave the driver in a failed state.{' '}
                    <code style={{ fontFamily: NB.monoFont }}>systemctl restart neoracer-lidar</code>{' '}
                    brings it back nine times out of ten.
                  </>
                }
                codeChip="systemctl restart neoracer-lidar"
              />
              <NumberedFeatureCard
                n={2}
                title="Loose connector"
                lede="The cable from the scanner to the carrier board."
                body={
                  <>
                    The connector under the LiDAR is small and easy to vibrate
                    loose after a hard crash, so reseating both ends is the first
                    thing worth trying. A driver restart afterward clears the
                    stale state.
                  </>
                }
                codeChip="reseat both ends · restart"
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
          Even one good sample tells you the data path is alive. Run this from
          an SSH session and the unit should bounce a wall return within a metre
          of the car.
          <Code lang="bash">{`# Pipe a single scan into Python and find any non-zero sample.
ros2 topic echo /scan --once \\
  | python3 -c "import sys, re; vals=re.findall(r'-?\\d+\\.?\\d*', sys.stdin.read()); print('non-zero:', sum(1 for v in vals if float(v) > 0))"`}</Code>
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Still 720 zeros after all three?">
          That points at the scanner itself, and we're happy to take it from
          here. A quick email to{' '}
          <a
            href="mailto:support@neobotics.org"
            style={{ color: NB.neoboticsRed, fontWeight: 700 }}
          >
            support@neobotics.org
          </a>{' '}
          with the output of{' '}
          <code style={{ fontFamily: NB.monoFont }}>journalctl -u neoracer-lidar -n 60</code>{' '}
          and your order number lets us send a replacement. The spinning
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
