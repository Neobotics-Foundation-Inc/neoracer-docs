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
} from '@/components/docs/Editorial';
import {
  ScrollReveal,
  MouseFollowGlow,
  AnimatedNumeral,
  InfoNote,
} from '@/components/docs/Interactive';
import {
  Crumbs,
  PrevNext,
  Callout,
  DataTable,
} from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Competition prep · Roboracer · NeoRacer Docs',
  description:
    'A practical readiness checklist for taking a NeoRacer to a Roboracer-style competition. Calibrate the drivetrain, align the LiDAR, square the IMU, confirm the network at the venue, charge packs, and rehearse the race stack.',
};

export default function CompetitionPrepPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Roboracer', href: '/docs/roboracer/migration-from-f1tenth' },
          { label: 'Competition prep' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="07" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>ROBORACER / COMPETITION PREP</Eyebrow>
            <DisplayHeading size="xl">
              COMPETITION <Red>PREP.</Red>
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
              NeoRacer targets Roboracer-style competitions, and the gap between a
              car that finishes and a car that fights for the line is usually the
              hour before the race, not the lap itself. This is the readiness pass
              to run the night before and again at the venue, so that when your
              competition starts, calibration, sensing, and the network are already
              behind you.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={7} prefix="" suffix=" checks" /></ChromeBadge>
              <ChromeBadge variant="outline">Pre-race</ChromeBadge>
              <ChromeBadge variant="outline">Calibration recap</ChromeBadge>
              <ChromeBadge variant="outline">At the venue</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section 01 · Why a checklist ──────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / WHY A CHECKLIST</Eyebrow>
            <DisplayHeading size="lg">
              WHY A <Red>CHECKLIST.</Red>
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
              Each item below is a calibration or check you have already done once,
              pulled into the order that matters for a race. The reason to run them
              again as a sequence is that small drifts stack up. A{' '}
              <InfoNote term="LiDAR" title="LiDAR">A spinning sensor that fires laser pulses and times their return to measure distance, producing a 360-degree map of nearby walls and obstacles. The car uses it to see the track and follow walls.</InfoNote>{' '}
              mount that
              shifted in transit, an{' '}
              <InfoNote term="IMU" title="IMU">An inertial measurement unit, a chip that senses acceleration and rotation. The car uses it to estimate heading, but its readings have a small offset called bias that must be calibrated out.</InfoNote>{' '}
              that settled at a new bias, a speed cap left
              from practice, none of these are visible until the car is on a strange
              track with a clock running.
            </p>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 740,
                marginTop: 12,
              }}
            >
              Every step links to the full page for that task. Treat this page as the
              index you walk top to bottom, and dive into a linked page only when
              something needs more than a confirming glance.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Calibration pass ─────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / THE CALIBRATION PASS</Eyebrow>
            <DisplayHeading size="lg">
              THE CALIBRATION <Red>PASS.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 740,
                marginBottom: 4,
              }}
            >
              Run these four together so the car's motion and sensing agree before you
              ever trust an autonomy stack on top of them. Drivetrain first, then the
              two sensors that feed the planner.
            </p>

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
                title="Motor speed caps"
                lede="Set top speed on purpose."
                body={
                  <>
                    Confirm the forward and reverse caps match the speed you plan to
                    race at, not whatever you left from practice. Full walkthrough in{' '}
                    <a href="/docs/calibration/motor-trim" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                      Motor trim
                    </a>
                    .
                  </>
                }
              />
              <NumberedFeatureCard
                n={2}
                title="Servo center"
                lede="Straight command, straight car."
                body={
                  <>
                    Check that a zero steering command tracks straight. A servo center
                    left off by a few degrees costs you the apex on every corner. See{' '}
                    <a href="/docs/calibration/servo-center" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                      Servo center
                    </a>
                    .
                  </>
                }
              />
              <NumberedFeatureCard
                n={3}
                title="LiDAR forward"
                lede="Index 0 points ahead."
                body={
                  <>
                    Verify the LiDAR is aligned so scan index 0 is straight forward.
                    A rotated mount turns every wall-follow into a drift. Details in{' '}
                    <a href="/docs/calibration/lidar-mount" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                      LiDAR mount
                    </a>
                    .
                  </>
                }
              />
              <NumberedFeatureCard
                n={4}
                title="IMU bias"
                lede="Square the heading."
                body={
                  <>
                    Calibrate the IMU bias on a flat, still surface so heading does not
                    walk over a long run. Procedure in{' '}
                    <a href="/docs/calibration/imu-bias" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                      IMU bias
                    </a>
                    .
                  </>
                }
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 03 · The full sequence ─────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / THE FULL SEQUENCE</Eyebrow>
            <DisplayHeading size="lg">
              THE FULL <Red>SEQUENCE.</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 16,
                lineHeight: 1.65,
                color: NB.textMutedBeige,
                maxWidth: 740,
                marginBottom: 8,
              }}
            >
              The full list, in the order to walk it. The first four are the
              calibration pass above; the last three are the things that only the
              venue can confirm.
            </p>

            <DataTable
              columns={[
                { key: 'n', label: '#', mono: true, width: '48px', accent: true },
                { key: 'item', label: 'Check' },
                { key: 'where', label: 'Page', mono: true },
              ]}
              rows={[
                { n: '1', item: 'Motor speed caps set for the race', where: '/docs/calibration/motor-trim' },
                { n: '2', item: 'Servo center tracks straight', where: '/docs/calibration/servo-center' },
                { n: '3', item: 'LiDAR aligned, index 0 forward', where: '/docs/calibration/lidar-mount' },
                { n: '4', item: 'IMU bias calibrated', where: '/docs/calibration/imu-bias' },
                { n: '5', item: 'Network and SSH confirmed at the venue', where: '/docs/software/networking' },
                { n: '6', item: 'Battery packs charged and labeled', where: '/docs/getting-started/charge-and-power' },
                { n: '7', item: 'Race stack rehearsed end to end', where: '/docs/software/ros2-driver' },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · At the venue ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / AT THE VENUE</Eyebrow>
            <DisplayHeading size="lg">
              AT THE <Red>VENUE.</Red>
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
              The venue network is the variable you cannot test from home. A race hall
              is full of competing access points, and the{' '}
              <InfoNote term="SSH" title="SSH">A way to log into another computer over the network and run commands on it from a terminal. You use it to control the car from your laptop without plugging in a screen.</InfoNote>{' '}
              path you rely on at the
              bench may not resolve the same way on a strange subnet. Confirm you can
              reach the car and open a session well before your slot, while there is
              still time to fall back to a direct connection. The full setup, including
              the host the car answers to, is in{' '}
              <a href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                Networking
              </a>
              .
            </p>

            <DashList
              items={[
                <>Confirm the car joins the venue network and that you can resolve its
                  address from your laptop.</>,
                <>Open an SSH session and leave it open, so a flaky network shows up now
                  rather than on the grid.</>,
                <>If the venue blocks the usual path, fall back to a direct link between
                  laptop and car, covered in{' '}
                  <a href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                    Networking
                  </a>
                  .</>,
              ]}
            />

            <Callout type="tip" title="Do the network check early">
              The line for a race slot is the worst place to discover the venue Wi-Fi
              will not let your laptop see the car. Running the SSH check when you
              arrive, not when you are called, turns a panic into a known quantity with
              time to spare.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 05 · Power ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>05 / POWER</Eyebrow>
            <DisplayHeading size="lg">
              CHARGING THE <Red>PACKS.</Red>
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
              A race day burns through more battery than a practice session, between
              warm-up laps, qualifying, and the runs themselves. Charge every pack you
              own the night before, and arrive with a way to keep cycling them through
              the day. A reliable car on a half pack still loses to a slower car that
              never had to sit out a round waiting on a charger.
            </p>

            <DashList
              items={[
                <>Charge every pack the night before so nothing starts the day depleted.</>,
                <>Label packs as you charge them, so a fresh pack and a spent one never
                  get mixed up between runs.</>,
                <>Judge calibration and any speed check on a reasonably charged pack, since
                  a low battery shifts how the car behaves.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 06 · Rehearse the race stack ──────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="06" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>06 / REHEARSE THE STACK</Eyebrow>
            <DisplayHeading size="lg">
              REHEARSE THE <Red>STACK.</Red>
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
              The last check is the one that exercises everything above at once. Bring up
              the full race stack the way you will on the grid, from a cold boot through
              the first autonomous lap, so launch order and startup timing are muscle
              memory rather than a thing you reason through under pressure.
            </p>

            <DashList
              items={[
                <>Boot the car cold and bring up the race stack in the order you will use
                  at the venue, so nothing is launched out of sequence under pressure.</>,
                <>Watch the first autonomous lap with the calibration above already done,
                  so a problem points at the stack and not a stale sensor.</>,
                <>Walk the full sequence again if any piece needs more than a confirming run.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Closing callout ───────────────────────────────────────── */}
      <ScrollReveal>
        <Callout type="note" title="One last word on the MCU">
          The whole chain above, from the LiDAR scan to the steering command, lands on
          the MCU (microcontroller unit) and the Jetson working together. If the car
          passed every check the night before but acts off at the venue, retrace this
          list in order rather than guessing, since a single shifted mount or stale bias
          explains far more race-day mysteries than a deep bug does. If something still
          will not square, reach us at{' '}
          <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            support@neobotics.org
          </a>
          .
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'API parity matrix', href: '/docs/roboracer/api-parity-matrix' }}
        next={{ label: 'Documentation home', href: '/docs' }}
      />
    </DocsShell>
  );
}
