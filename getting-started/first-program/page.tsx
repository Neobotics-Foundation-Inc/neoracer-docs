import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
  ClockGlyph,
  DashList,
  Fig,
} from '@/components/docs/Editorial';
import { CarSprite } from '@/components/docs/Diagrams';
import { Crumbs, Callout, PrevNext, Code } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'First program · NeoRacer Docs',
  description: 'Write a basic wall follower: read the LiDAR every frame and steer to hold a fixed gap from the wall. The same Python runs in the Playground simulator and on the car, so it doubles as a LiDAR test.',
};

/* Flysky FS-i6S photo with the two switches this page uses called out. SWB
 * hands control between manual and autonomy; SWA picks slow or fast manual
 * mode. Overlay coordinates are percentages of the square photo. */
function FlyskySwitchesFigure() {
  const RED = NB.neoboticsRed;
  const BLUE = NB.tarmacBlue;
  const chip: React.CSSProperties = {
    position: 'absolute',
    background: BLUE,
    color: NB.haloWhite,
    fontFamily: NB.monoFont,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.06em',
    padding: '6px 9px',
    lineHeight: 1.45,
    whiteSpace: 'nowrap',
  };
  return (
    <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
      <Image
        src="/images/flysky-i6s.jpg"
        alt="The Flysky FS-i6S transmitter. SWA and SWB are the two toggle switches on the top-left shoulder."
        width={1000}
        height={1000}
        sizes="(max-width: 640px) 100vw, 560px"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <defs>
          <marker id="fsp-arrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
            <path d="M0 0l7 4L0 8z" fill={RED} />
          </marker>
        </defs>
        <line x1="18" y1="34" x2="41" y2="22.5" stroke={RED} strokeWidth="0.7" markerEnd="url(#fsp-arrow)" />
        <line x1="72" y1="9" x2="50" y2="17" stroke={RED} strokeWidth="0.7" markerEnd="url(#fsp-arrow)" />
      </svg>
      <div style={{ ...chip, left: '2%', top: '33%' }}>
        SWA · MANUAL SPEED<br />UP SLOW · DOWN FAST
      </div>
      <div style={{ ...chip, left: '66%', top: '3%' }}>
        SWB · WHO DRIVES<br />UP MANUAL · DOWN AUTONOMY
      </div>
    </div>
  );
}

/* Wall-follow figure: the car holds a fixed gap from the right wall, reading the
 * LiDAR straight ahead (0 deg) and to the right (90 deg). An inside corner ahead
 * shows why the front beam matters. */
function WallFollowDiagram() {
  const RED = NB.neoboticsRed;
  const BLUE = NB.tarmacBlue;
  return (
    <svg viewBox="0 0 500 300" width="100%" style={{ display: 'block', maxWidth: 560, margin: '0 auto' }}>
      <defs>
        <marker id="wf-arrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
          <path d="M0 0l8 4.5L0 9z" fill={RED} />
        </marker>
      </defs>

      <text x="250" y="20" fontFamily={NB.monoFont} fontSize="11" fill={BLUE} fontWeight="700" letterSpacing="2" textAnchor="middle">
        FOLLOW THE RIGHT WALL
      </text>

      {/* L-shaped wall: vertical on the right, turning left across the top (an inside corner) */}
      <path d="M150 70 H400 V270" fill="none" stroke={BLUE} strokeWidth="6" strokeLinecap="square" />
      {/* wall hatching */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`v${i}`} x1="400" y1={78 + i * 20} x2="412" y2={70 + i * 20} stroke={BLUE} strokeWidth="1" opacity="0.4" />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`h${i}`} x1={158 + i * 22} y1="70" x2={150 + i * 22} y2="58" stroke={BLUE} strokeWidth="1" opacity="0.4" />
      ))}

      {/* Target-gap line: where the car tries to stay, ~50 cm off the wall */}
      <line x1="350" y1="95" x2="350" y2="262" stroke={RED} strokeWidth="1.4" strokeDasharray="5 5" opacity="0.7" />
      <text x="350" y="282" fontFamily={NB.monoFont} fontSize="9" fill={RED} fontWeight="700" textAnchor="middle">
        TARGET GAP ≈ 50 cm
      </text>

      {/* Car on the target line, nose up, right side toward the wall */}
      <CarSprite cx={350} cy={196} size={38} heading={0} />

      {/* Right beam (90 deg) to the wall */}
      <line x1="350" y1="196" x2="397" y2="196" stroke={RED} strokeWidth="1.8" markerEnd="url(#wf-arrow)" />
      <text x="372" y="189" fontFamily={NB.monoFont} fontSize="9" fill={RED} fontWeight="700" textAnchor="middle">90°</text>

      {/* Front beam (0 deg) toward the corner */}
      <line x1="350" y1="178" x2="350" y2="76" stroke={RED} strokeWidth="1.6" strokeDasharray="4 4" markerEnd="url(#wf-arrow)" />
      <text x="364" y="120" fontFamily={NB.monoFont} fontSize="9" fill={RED} fontWeight="700">0°</text>

      {/* Travel direction */}
      <line x1="320" y1="230" x2="320" y2="200" stroke={BLUE} strokeWidth="2" markerEnd="url(#wf-arrow)" />
      <text x="320" y="248" fontFamily={NB.monoFont} fontSize="9" fill={BLUE} fontWeight="700" textAnchor="middle">DRIVE</text>

      {/* Corner note */}
      <text x="250" y="100" fontFamily={NB.monoFont} fontSize="9" fill={NB.textMutedBeige} textAnchor="middle">
        wall ahead → steer left
      </text>
    </svg>
  );
}

export default function FirstProgramPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'First program' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              WALL <Red>FOLLOWING</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              To ensure all sensors are running well, try executing your first
              program on the car. This same script runs both on the real car as
              well as the Neobotics Playground twin simulator.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}><AnimatedNumeral value={15} suffix=" minutes" /></ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Fig
          label="FIG. A / THE TWO SWITCHES THIS PAGE USES"
          caption="On the Flysky transmitter, SWB decides who is driving: down hands the car to your program, up takes over with the sticks. SWA applies only while you drive manually: up is slow mode, down is fast."
        >
          <FlyskySwitchesFigure />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <Fig
          label="FIG. B / WHAT YOUR PROGRAM WILL DO"
          caption="Each frame the car reads two LiDAR distances, straight ahead (0°) and to the right (90°), and steers to keep the right reading near a target gap. When the front reading drops at a corner, it turns away."
        >
          <WallFollowDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <MonoLabel>Where to run it</MonoLabel>
          <DashList
            items={[
              <>
                <strong>Playground</strong>: open{' '}
                <Link href="https://playground.neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                  playground.neobotics.org
                </Link>{' '}
                in your browser, paste the code, place the car next to a wall,
                and click Run. There is nothing to install, so this is the
                easiest place for the first run.
              </>,
              <>
                <strong>Car</strong>: save the file as{' '}
                <code style={{ fontFamily: NB.monoFont }}>wall_follow.py</code> in{' '}
                <code style={{ fontFamily: NB.monoFont }}>~/jupyter_ws/neoracer-os/labs/ultimate-wall-follower/</code>,
                next to the labs that ship on the car. Easiest from JupyterLab in
                your browser (port <code style={{ fontFamily: NB.monoFont }}>8888</code>),
                or over SSH from{' '}
                <Link href="/docs/getting-started/connect-to-car" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Connect to the car</Link>.
                Then run it from that folder:
                <Code lang="bash">{`cd ~/jupyter_ws/neoracer-os/labs/ultimate-wall-follower
python3 wall_follow.py`}</Code>
                The program starts immediately, and the car drives once you flip{' '}
                <code style={{ fontFamily: NB.monoFont }}>SWB</code> to autonomy.
                Flipping <code style={{ fontFamily: NB.monoFont }}>SWB</code> back
                returns the sticks to you, which is also how you take over if it
                heads somewhere you didn&apos;t plan.
              </>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            THE <Red>PROGRAM</Red>
          </DisplayHeading>
          <Code lang="python">
{`import sys
sys.path.insert(0, "../../library")   # the racecar-neo library on the car

import racecar_core
import racecar_utils as rc_utils

rc = racecar_core.create_racecar()

SPEED = 0.2        # low throttle while tuning
TARGET = 50        # cm: the gap we want to hold from the right wall
KP = 0.01          # steering per cm of error
FRONT_STOP = 50    # cm: a wall this close ahead means turn away

def start():
    rc.drive.stop()
    print(">> Wall follower running. Watching the LiDAR.")

def update():
    scan = rc.lidar.get_samples()                    # ~1440 distances, cm
    if len(scan) == 0:                               # no scan yet, right at start-up
        return

    # Distance straight ahead (0 deg) and to the right wall (90 deg).
    front = rc_utils.get_lidar_average_distance(scan, 0)
    right = rc_utils.get_lidar_average_distance(scan, 90)

    if front < FRONT_STOP:                            # corner ahead
        rc.drive.set_speed_angle(SPEED, -1)           # turn full left
    else:
        error = right - TARGET                        # +: too far from wall
        angle = rc_utils.clamp(KP * error, -1, 1)     # steer toward the wall
        rc.drive.set_speed_angle(SPEED, angle)

rc.set_start_update(start, update)
rc.go()`}
          </Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Callout type="note" title="One decision per frame">
            <code style={{ fontFamily: NB.monoFont }}>update()</code> runs once per frame,
            many times a second, so you never loop or sleep inside it. Each call you
            read the <Link href="/docs/api-reference/python/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>LiDAR</Link>,
            work out one steering angle, set the drive, and return. The{' '}
            <code style={{ fontFamily: NB.monoFont }}>error = right - TARGET</code> line is the
            whole controller: when the car drifts too far from the wall the error
            grows positive and it steers back toward it. That is a{' '}
            <InfoNote term="proportional controller" title="Proportional (P) control">
              The simplest closed-loop controller: the correction is proportional to the error. Bigger gap from the target, bigger steering input. KP sets how aggressive that is.
            </InfoNote>.
          </Callout>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            WHAT TO <Red>EXPECT</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Place the car with a wall on its right and run it. It should hold a
            steady distance from the wall and turn at corners. If it
            oscillates or hits the wall, tune KP and SPEED and run it again.
          </p>
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { title: 'Sim run', body: 'The simulator has no sensor noise, so the car holds its distance and turns without weaving. Use this run as the baseline to tune against.' },
              { title: 'Car run', body: 'Same code, real LiDAR. Small steering oscillations from sensor noise are normal. If the data is empty or frozen, that is a LiDAR fault, not your code.' },
              { title: 'Tuning', body: 'If KP is too high the car oscillates; too low and it drifts into the wall. Keep SPEED low while you tune, then raise it once the car holds the target distance.' },
            ].map((c, i) => (
              <div key={i} style={{ background: NB.haloWhite, border: `1px solid ${NB.borderOnBeige}`, borderRadius: 10, padding: 16, boxShadow: NB.shadowCard }}>
                <div style={{ fontFamily: NB.headingFont, fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: NB.textOnBeige, marginBottom: 6 }}>
                  {c.title}
                </div>
                <div style={{ fontFamily: NB.bodyFont, fontSize: 13.5, lineHeight: 1.55, color: NB.textMutedBeige }}>{c.body}</div>
              </div>
            ))}
          </div>
          <Callout type="tip" title="LiDAR comes up empty?">
            If <code style={{ fontFamily: NB.monoFont }}>get_samples()</code> reads
            as all zeros or infinities, the scan never reached your code. The{' '}
            <Link href="/docs/troubleshooting/lidar-empty-scan" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>LiDAR empty scan</Link>{' '}
            and <Link href="/docs/troubleshooting/diagnostics" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Diagnostics</Link> pages
            cover the fix.
          </Callout>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="You finished Setup. What now?">
          Two good next steps: read the{' '}
          <Link href="/docs/api-reference/python/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            LiDAR API
          </Link>{' '}
          to go past two beams into the full scan, or skim the{' '}
          <Link href="/docs/hardware/overview" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            Hardware overview
          </Link>{' '}
          for the full parts breakdown.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Install the driver', href: '/docs/getting-started/install-driver' }}
        next={{ label: 'Hardware overview', href: '/docs/hardware/overview' }}
      />
    </DocsShell>
  );
}
