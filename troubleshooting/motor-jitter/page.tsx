import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
  NumberedFeatureCard,
  SymptomBanner,
} from '@/components/docs/Editorial';
import {
  ScrollReveal,
  MouseFollowGlow,
  AnimatedNumeral,
  InfoNote,
} from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Motor jitter · Troubleshooting · NeoRacer Docs',
  description:
    'The motor twitches, oscillates, or hums at rest. Almost always a trim, gain, or wiring problem in that order.',
};

export default function MotorJitterPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Troubleshooting', href: '/docs/troubleshooting/wont-power-on' },
          { label: 'Motor jitter' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 24, paddingTop: 24 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              MOTOR <Red>JITTER.</Red>
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
              Three causes account for nearly all motor jitter, and working
              through them in order tends to be the fastest path. A fresh motor
              trim catches the first two, and a careful look at the rear wiring
              catches the third.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">
                <AnimatedNumeral value={3} prefix="~" suffix=" minutes" />
              </ChromeBadge>
              <ChromeBadge variant="outline">Common after a crash</ChromeBadge>
              <ChromeBadge variant="outline">Fixed in software 80 % of the time</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <SymptomBanner
          seeing={
            <>
              At rest, the motor hums or briefly pulses. Under control loops, the
              car oscillates left-right or chugs forward-back instead of holding a
              smooth speed.
            </>
          }
          expected={
            <>
              A trimmed motor is silent at zero command and tracks smooth speed
              curves cleanly. Control loops should converge without visible
              shake.
            </>
          }
        />
      </ScrollReveal>

      {/* ── Section 01 · Triage ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
        <GhostNumeral n="01" top={-30} right={-20} size={400} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <DisplayHeading size="lg">
            POWER AND <Red>SURFACE.</Red>
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
            Jitter at rest is almost always power or mechanics, not software.
            The motor neutral is fixed in the driver at the{' '}
            <InfoNote term="ESC" title="ESC">The electronic speed controller, the board between the battery and the motor that converts a control signal into motor power. It reads neutral when the signal sits at its center pulse width.</InfoNote>'s 1500
            microsecond center, so there is nothing to re-trim. A low or sagging
            pack, a warm motor, or an uneven surface are the usual causes, and a
            charged pack on flat hardwood clears most of them. Confirm a zero
            command really is silent:
          </p>

          <Code lang="python">{`import racecar_core

rc = racecar_core.create_racecar()

def start():
    rc.drive.stop()

def update():
    rc.drive.set_speed_angle(0, 0)   # should be dead silent at rest

rc.set_start_update(start, update)
rc.go()`}</Code>

          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
            }}
          >
            If it still shakes at exactly zero on a charged pack and a flat
            floor, the cause is the ESC neutral or mechanical drag, covered on
            the{' '}
            <a href="/docs/calibration/motor-trim" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>motor trim</a>{' '}
            and{' '}
            <a href="/docs/hardware/drivetrain" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>drivetrain</a>{' '}
            pages. Read on.
          </p>
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Probable causes ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
        <GhostNumeral n="02" top={-30} right={-20} size={400} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <DisplayHeading size="lg">
            PROBABLE <Red>CAUSES.</Red>
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
              title="Control gain too high"
              lede="The script is fighting the car."
              body={
                <>
                  A car that overshoots and corrects on every tick reads as
                  motor jitter, even though the motor itself is fine. If a
                  wall-follow or{' '}
                  <InfoNote term="PID" title="PID">A control method that corrects error using three terms: proportional to the current error, the accumulated error, and its rate of change. Set the gains too high and it overcorrects and oscillates.</InfoNote>{' '}
                  script is oscillating, halving your
                  proportional gain is a good first move.
                </>
              }
              codeChip="Kp /= 2  # try this first"
            />
            <NumberedFeatureCard
              n={2}
              title="Pinched motor wire"
              lede="A rough crash can shift the rear loom."
              body={
                <>
                  Any insulation damage, or a wire touching the metal frame,
                  causes jitter under load. The three motor wires leave the ESC
                  under the chassis, so lifting it for a look is easiest with
                  the pack disconnected first.
                </>
              }
              codeChip="visual check · no crimp damage"
            />
            <NumberedFeatureCard
              n={3}
              title="Worn pinion gear"
              lede="Gear teeth missed at top end."
              body={
                <>
                  A high-mileage car can develop a flat spot on the small
                  pinion gear. Symptoms: a regular click every full motor
                  rev, jitter only at high speed. A new pinion is a
                  five-minute replacement.
                </>
              }
              codeChip="click freq ∝ motor rpm"
            />
          </div>
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="A quick way to localise the source">
          Here's a fast way to split mechanical from electrical: lift the rear
          wheels off the floor and run the verify script from the trim page. If
          the wheels spin smoothly in the air but the car still jitters on the
          ground, the issue is mechanical (wheel / tyre / floor) rather than
          electrical. If the wheels jitter in the air too, the cause is upstream
          of the drivetrain.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'LiDAR empty scan', href: '/docs/troubleshooting/lidar-empty-scan' }}
        next={{ label: 'Camera no feed', href: '/docs/troubleshooting/camera-no-feed' }}
      />
    </DocsShell>
  );
}
