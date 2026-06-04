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
  ClockGlyph,
  LevelGlyph,
  DashList,
  Fig,
} from '@/components/docs/Editorial';
import { CarSprite } from '@/components/docs/Diagrams';
import { Crumbs, Callout, PrevNext, Code } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'First program · NeoRacer Docs',
  description: 'Write a hello-world Python that drives a square. Identical code runs in the Playground simulator and on the physical car.',
};

/* Square-pattern figure, the path your hello-world will draw. */
function SquarePathDiagram() {
  return (
    <svg viewBox="0 0 480 280" width="100%" style={{ display: 'block', maxWidth: 560, margin: '0 auto' }}>
      <rect x="40" y="30" width="400" height="220" rx="6" fill={NB.haloWhite} stroke={NB.tarmacBlue} strokeWidth="1.5" />
      <text x="240" y="22" fontFamily={NB.monoFont} fontSize="11" fill={NB.tarmacBlue} fontWeight="700" letterSpacing="2" textAnchor="middle">
        DRIVING PATH · ~1 m PER SIDE
      </text>

      {/* Square path */}
      <rect x="120" y="80" width="240" height="140" rx="4" stroke={NB.neoboticsRed} strokeWidth="2.4" strokeDasharray="4 4" fill="none" />

      {/* Direction arrows on path */}
      <polygon points="245,80 235,75 235,85" fill={NB.neoboticsRed} />
      <polygon points="360,150 355,140 365,140" fill={NB.neoboticsRed} />
      <polygon points="245,220 235,215 235,225" fill={NB.neoboticsRed} transform="rotate(180 240 220)" />
      <polygon points="120,150 115,140 125,140" fill={NB.neoboticsRed} transform="rotate(180 120 150)" />

      {/* Car at start, nose right (it drives along the top edge first) */}
      <CarSprite cx={120} cy={80} size={34} heading={90} />
      <text x="120" y="64" fontFamily={NB.monoFont} fontSize="10" fill={NB.tarmacBlue} fontWeight="700" textAnchor="middle">
        START / END
      </text>

      {/* Corner labels */}
      <text x="240" y="74" fontFamily={NB.monoFont} fontSize="9" fill={NB.textMutedBeige} textAnchor="middle">
        1 s forward
      </text>
      <text x="372" y="154" fontFamily={NB.monoFont} fontSize="9" fill={NB.textMutedBeige}>
        turn 90°
      </text>
      <text x="240" y="236" fontFamily={NB.monoFont} fontSize="9" fill={NB.textMutedBeige} textAnchor="middle">
        1 s forward
      </text>
      <text x="60" y="154" fontFamily={NB.monoFont} fontSize="9" fill={NB.textMutedBeige}>
        turn 90°
      </text>
    </svg>
  );
}

export default function FirstProgramPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Getting Started', href: '/docs/getting-started/unbox' },
          { label: 'First program' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>STEP 05 / GETTING STARTED · THE FINAL ONE</Eyebrow>
            <DisplayHeading size="xl">
              HELLO, <Red>RACECAR.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              Twenty lines of Python that drive a one-metre square. The exact
              same script runs in the NeoRacer Playground simulator and on the
              car, your choice where to try it first.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}><AnimatedNumeral value={15} suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline" icon={<LevelGlyph level={1} />}>Beginner</ChromeBadge>
              <ChromeBadge variant="red">Sim ↔ Car parity</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Fig
          label="FIG. A / WHAT YOUR PROGRAM WILL DO"
          caption="Forward one second, turn 90°, repeat four times. The simplest possible closed-loop program, open-loop in this case, since we don't check sensors yet."
        >
          <SquarePathDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <MonoLabel>Pick your launch pad</MonoLabel>
          <DashList
            items={[
              <>
                <strong>Playground (recommended for the first run)</strong>: zero install. Open{' '}
                <Link href="https://playground.neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                  playground.neobotics.org
                </Link>{' '}
                in your browser, paste the code, and you're one click from Run.
              </>,
              <>
                <strong>Car</strong>: <InfoNote term="SSH" title="SSH">A way to log into another computer over the network and run commands in its terminal from yours. Here you use it to control the car's onboard computer.</InfoNote> into the Jetson (covered in <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</Link>) and run the script over <code style={{ fontFamily: NB.monoFont }}>ros2 run</code> with the racecar-neo-library installed.
              </>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>01 / THE PROGRAM</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>PROGRAM.</Red>
          </DisplayHeading>
          <Code lang="python">
{`import racecar_core

rc = racecar_core.create_racecar()

SIDE_TIME = 1.0   # seconds per straight leg
TURN_TIME = 0.7   # seconds per 90-degree turn
SPEED = 0.25      # 25% throttle
TURN = 1.0        # full lock

timer = 0.0
leg = 0           # 8 legs: even legs drive straight, odd legs turn

def start():
    global timer, leg
    timer, leg = 0.0, 0
    rc.drive.stop()

def update():
    global timer, leg
    if leg >= 8:                     # four straights + four turns
        rc.drive.stop()
        return
    timer += rc.get_delta_time()     # seconds since the last frame
    if leg % 2 == 0:                 # straight leg
        rc.drive.set_speed_angle(SPEED, 0)
        if timer > SIDE_TIME:
            leg, timer = leg + 1, 0.0
    else:                            # turn leg
        rc.drive.set_speed_angle(SPEED, TURN)
        if timer > TURN_TIME:
            leg, timer = leg + 1, 0.0

rc.set_start_update(start, update)
rc.go()`}
          </Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Callout type="note" title="Why no sleep()?">
            <code style={{ fontFamily: NB.monoFont }}>update()</code> is called once per frame,
            many times a second, so you never loop or sleep inside it. Instead you
            keep a little state between frames and add{' '}
            <code style={{ fontFamily: NB.monoFont }}>rc.get_delta_time()</code> (the seconds
            since the last frame) to a timer. That is the whole rhythm of a
            racecar program: read sensors, decide, set the drive, return, repeat.
          </Callout>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / WHAT TO EXPECT</Eyebrow>
          <DisplayHeading size="lg">
            WHAT TO <Red>EXPECT.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The car traces something roughly square and lands near, but not
            exactly on, its start. That gap is the whole reason sensors exist,
            and feeling it for yourself here makes that click into place.
          </p>
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { title: 'Sim run', body: 'Path looks geometric. Corners are sharp. Final position drifts about 10 cm.' },
              { title: 'Car run (carpet)', body: 'Path skews. Final position can drift 50 cm or more. Carpet wheel slip is the dominant error.' },
              { title: 'Car run (hardwood)', body: 'Closer to the sim. Drift comes from un-trimmed servo and motor torque ripple.' },
            ].map((c, i) => (
              <div key={i} style={{ background: NB.haloWhite, border: `1px solid ${NB.borderOnBeige}`, borderRadius: 10, padding: 16, boxShadow: NB.shadowCard }}>
                <div style={{ fontFamily: NB.headingFont, fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: NB.textOnBeige, marginBottom: 6 }}>
                  {c.title}
                </div>
                <div style={{ fontFamily: NB.bodyFont, fontSize: 13.5, lineHeight: 1.55, color: NB.textMutedBeige }}>{c.body}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="You finished Getting Started. What now?">
          Two good next steps: read the{' '}
          <Link href="/docs/api-reference/python/lidar" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            LiDAR API
          </Link>{' '}
          and try a sensor-driven program, or skim the{' '}
          <Link href="/docs/hardware/overview" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            Hardware overview
          </Link>{' '}
          to understand what's actually in the box you just unboxed.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'First drive', href: '/docs/getting-started/first-drive' }}
        next={{ label: 'Hardware overview', href: '/docs/hardware/overview' }}
      />
    </DocsShell>
  );
}
