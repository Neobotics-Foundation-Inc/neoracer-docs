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
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { CarSprite } from '@/components/docs/Diagrams';
import { Crumbs, Callout, PrevNext } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'First drive · NeoRacer Docs',
  description: 'Drive the NeoRacer across the room under manual control before any autonomous mode runs.',
};

/* Floor plan, top down: the room you need, the 4x4m driving zone with wall
 * clearance, where you stand, and where the car drives from its start mark.
 * Uses the real NeoRacer top-down sprite (the same one the Playground 2D view
 * uses). */
function OpenSpaceDiagram() {
  return (
    <svg viewBox="0 0 540 472" width="100%" style={{ display: 'block', maxWidth: 560, margin: '0 auto' }}>
      {/* title */}
      <text x="270" y="32" textAnchor="middle" fontFamily={NB.monoFont} fontSize="11" letterSpacing="0.22em" fontWeight="700" fill={NB.tarmacBlue}>
        FLOOR PLAN · TOP DOWN
      </text>

      {/* room walls */}
      <rect x="80" y="50" width="380" height="380" fill={NB.haloWhite} stroke={NB.tarmacBlue} strokeWidth="2.5" />
      {/* wall hatch corners, a light architectural cue */}
      {[[80, 50], [460, 50], [80, 430], [460, 430]].map(([x, y], i) => (
        <rect key={i} x={x - 4} y={y - 4} width="8" height="8" fill={NB.tarmacBlue} />
      ))}

      {/* 4x4 m driving zone (1 m clearance inset from the walls) */}
      <rect x="140" y="110" width="260" height="260" fill={NB.beige} stroke={NB.neoboticsRed} strokeWidth="1.6" strokeDasharray="7 5" />
      {/* zone grid, 4 x 4 squares = scale reference */}
      {[1, 2, 3].map((i) => (
        <line key={`gv${i}`} x1={140 + i * 65} y1="110" x2={140 + i * 65} y2="370" stroke={NB.tarmacBlue} strokeOpacity="0.1" strokeWidth="1" />
      ))}
      {[1, 2, 3].map((i) => (
        <line key={`gh${i}`} x1="140" y1={110 + i * 65} x2="400" y2={110 + i * 65} stroke={NB.tarmacBlue} strokeOpacity="0.1" strokeWidth="1" />
      ))}
      <text x="270" y="127" textAnchor="middle" fontFamily={NB.monoFont} fontSize="10.5" letterSpacing="0.18em" fontWeight="700" fill={NB.neoboticsRed}>
        DRIVING ZONE
      </text>

      {/* top dimension: 4 m */}
      <line x1="140" y1="92" x2="400" y2="92" stroke={NB.tarmacBlue} strokeWidth="1" />
      <polygon points="140,92 147,89 147,95" fill={NB.tarmacBlue} />
      <polygon points="400,92 393,89 393,95" fill={NB.tarmacBlue} />
      <rect x="252" y="83" width="36" height="15" fill={NB.haloWhite} />
      <text x="270" y="95" textAnchor="middle" fontFamily={NB.monoFont} fontSize="11" fontWeight="700" fill={NB.tarmacBlue}>4 m</text>

      {/* left dimension: 4 m */}
      <line x1="122" y1="110" x2="122" y2="370" stroke={NB.tarmacBlue} strokeWidth="1" />
      <polygon points="122,110 119,117 125,117" fill={NB.tarmacBlue} />
      <polygon points="122,370 119,363 125,363" fill={NB.tarmacBlue} />
      <g transform="translate(113, 240) rotate(-90)">
        <rect x="-16" y="-8" width="32" height="15" fill={NB.haloWhite} />
        <text x="0" y="4" textAnchor="middle" fontFamily={NB.monoFont} fontSize="11" fontWeight="700" fill={NB.tarmacBlue}>4 m</text>
      </g>

      {/* wall clearance callout (right side) */}
      <line x1="400" y1="300" x2="460" y2="300" stroke={NB.tarmacBlue} strokeWidth="1" strokeDasharray="3 2" />
      <polygon points="400,300 407,297 407,303" fill={NB.tarmacBlue} />
      <polygon points="460,300 453,297 453,303" fill={NB.tarmacBlue} />
      <rect x="416" y="285" width="30" height="14" fill={NB.haloWhite} />
      <text x="431" y="296" textAnchor="middle" fontFamily={NB.monoFont} fontSize="9.5" fontWeight="700" fill={NB.tarmacBlue}>≥1 m</text>

      {/* suggested driving loop inside the zone */}
      <rect x="180" y="152" width="180" height="160" rx="30" fill="none" stroke={NB.neoboticsRed} strokeOpacity="0.4" strokeWidth="2" strokeDasharray="5 6" />
      <polygon points="270,152 262,146 262,158" fill={NB.neoboticsRed} opacity="0.55" />

      {/* forward arrow from the start mark */}
      <line x1="170" y1="312" x2="170" y2="288" stroke={NB.neoboticsRed} strokeWidth="2.2" strokeLinecap="round" />
      <polygon points="170,282 165,291 175,291" fill={NB.neoboticsRed} />

      {/* the real NeoRacer, top down, in the bottom-left corner of the zone, facing into the room */}
      <CarSprite cx={170} cy={336} size={54} heading={0} />
      <text x="170" y="366" textAnchor="middle" fontFamily={NB.monoFont} fontSize="9" letterSpacing="0.06em" fontWeight="700" fill={NB.tarmacBlue}>START</text>

      {/* you stand here, in the clearance band at the zone edge */}
      <polygon points="318,378 312,386 324,386" fill={NB.tarmacBlue} />
      <rect x="280" y="386" width="116" height="20" fill={NB.tarmacBlue} />
      <text x="338" y="400" textAnchor="middle" fontFamily={NB.monoFont} fontSize="8.5" letterSpacing="0.1em" fontWeight="700" fill={NB.haloWhite}>YOU STAND HERE</text>
    </svg>
  );
}

export default function FirstDrivePage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Getting Started', href: '/docs/getting-started/unbox' },
          { label: 'First drive' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>STEP 04 / GETTING STARTED</Eyebrow>
            <DisplayHeading size="xl">
              YOUR <Red>FIRST</Red> DRIVE.
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              Now that your car is charged and your controller is on, it's time
              for your first drive! These same controls become your safety net
              once your code is doing the driving, so a relaxed ten minutes with
              the throttle and the steering now pays off later. You'll already
              feel at home with them when that moment comes.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}><AnimatedNumeral value={10} suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline" icon={<LevelGlyph level={1} />}>Beginner</ChromeBadge>
              <ChromeBadge variant="red">Indoor only</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Fig
          label="FIG. A / A GOOD FLOOR PLAN"
          caption="A 4 × 4 metre clear box gives you plenty of room for the first session. Standing at one edge gives you a clear view down the line of travel."
        >
          <OpenSpaceDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Stopping the car">
          The car has a power switch of its own, but when it's in motion the
          easiest way to bring it to a stop is by letting go of the throttle
          stick altogether. Even at full speed, releasing the throttle brings
          the car to a halt within a metre, which is plenty of room for any
          indoor space.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <MonoLabel>You'll need</MonoLabel>
          <DashList
            items={[
              <>The Flysky transmitter that came with the car.</>,
              <>A 4 × 4 m clear indoor area with at least 1 m of clearance from walls.</>,
              <>A hard floor works best. Hardwood, tile, concrete, or thin carpet all give the throttle a clean feel; plush carpet tends to absorb the response and make the first drive feel sluggish.</>,
              <>
                A quiet room without{' '}
                <InfoNote term="glass furniture" title="Why not glass?">
                  The car&apos;s LiDAR maps the room by timing laser pulses that bounce
                  off surfaces. Glass and mirrors are nearly invisible to it. The beam
                  passes straight through or glances off at an angle, so a glass table
                  reads as a gap or a phantom obstacle and throws off the scan. Keep
                  clear glass and mirrors out of the driving area.
                </InfoNote>.
              </>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>01 / FIVE MINUTES OF PRACTICE</Eyebrow>
          <DisplayHeading size="lg">
            THE FIRST <Red>DRILL.</Red>
          </DisplayHeading>
          {[
            { t: 'Place the car on the floor, wheels down, pointed away from you.', d: 'Stand at one edge of the safe zone so you have a clean view down the line of travel.' },
            { t: 'Turn on the transmitter first, then the car.', d: 'Powering up in that order lets the receiver lock onto a clean signal from the start. A quick twitch at power-on just means the signal is still settling, and switching the transmitter off resets it.' },
            { t: 'Push the throttle to about 15% for a second, then let go back to neutral.', d: 'The car will roll forward about a metre and stop. This release-to-neutral motion becomes your everyday way of stopping the car, so it helps to do it a couple of times until it feels natural.' },
            { t: 'Try a gentle steering input next.', d: 'Steering only responds while the car is rolling, so a quarter-turn left and right at low throttle is a good first feel.' },
            { t: 'Drive a slow figure-of-eight inside the safe zone.', d: 'Around 25 % throttle is plenty. The car is geared for about 25 km/h flat out, but a small fraction of that is enough to find the feel of it on day one.' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16, padding: '20px 0', borderBottom: `1px solid ${NB.borderOnBeige}` }}>
              <div style={{ fontFamily: NB.headingFont, fontSize: 36, fontWeight: 900, lineHeight: 1, color: NB.neoboticsRed, letterSpacing: '-0.02em' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div style={{ fontFamily: NB.headingFont, fontSize: 20, fontWeight: 700, color: NB.textOnBeige, marginBottom: 4 }}>{s.t}</div>
                <p style={{ fontFamily: NB.bodyFont, fontSize: 15, lineHeight: 1.65, color: NB.textMutedBeige, margin: 0 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / THREE HABITS WORTH KEEPING</Eyebrow>
          <DisplayHeading size="lg">
            GOOD DRIVING <Red>HABITS.</Red>
          </DisplayHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, marginTop: 22 }}>
            <NumberedFeatureCard n={1} title="Default to neutral throttle" lede="If you're not sure, the stick goes to neutral." body="Whenever you have to think about what to do next, the car can already be still while you figure it out. The habit becomes especially useful once your Python code starts driving for you." />
            <NumberedFeatureCard n={2} title="One variable at a time" lede="One change per run keeps cause and effect clear." body="If you change two settings between runs, it's hard to tell which one caused the new behaviour. The same idea carries over later when you start tuning closed-loop controllers." />
            <NumberedFeatureCard n={3} title="Disconnect the LiPo when you stop" lede="A pack left plugged in keeps draining, so unplugging it at the end helps." body="A connected pack draws a small trickle of current through the regulators. Disconnecting it keeps the pack healthier for longer between sessions." />
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Charge & power', href: '/docs/getting-started/charge-and-power' }}
        next={{ label: 'First program', href: '/docs/getting-started/first-program' }}
      />
    </DocsShell>
  );
}
