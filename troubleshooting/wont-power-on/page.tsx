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
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: "Won't power on · Troubleshooting · NeoRacer Docs",
  description:
    'The status LED stays dark when you flip the master switch. Five things to check in under a minute before opening a support ticket.',
};

export default function WontPowerOnPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Troubleshooting', href: '/docs/troubleshooting/wont-power-on' },
          { label: "Won't power on" },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 24, paddingTop: 24 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              WON'T POWER <Red>ON</Red>
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
              Nine out of ten times this is a battery problem. The five checks
              below take under a minute and rule out everything that isn't a
              return-to-factory issue.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral prefix="~" value={1} suffix=" minute" /></ChromeBadge>
              <ChromeBadge variant="outline">Common cause: battery</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <SymptomBanner
          seeing="You flip the master switch and the status LED stays dark."
          expected={
            <>
              Solid red within a second, then a slow fade to green once the
              Jetson boots (about 30 seconds). Working order looks like that
              two-stage handshake every time.
            </>
          }
        />
      </ScrollReveal>

      {/* ── Section 01 · Quick triage ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              QUICK <Red>TRIAGE</Red>
            </DisplayHeading>
            <DashList
              items={[
                <>
                  <strong>Is the battery plugged in?</strong> The XT60 connector
                  on the chassis underside should click in firmly. A loose plug
                  will read zero volts at the switch.
                </>,
                <>
                  <strong>Is the battery charged?</strong> Anything under 9 V on a{' '}
                  <InfoNote term="3S pack" title="3S Battery Pack">A lithium-polymer battery made of three cells wired in series. Each cell sits around 3.7 V, so a healthy 3S pack reads roughly 11 to 12.6 V.</InfoNote>{' '}
                  and the{' '}
                  <InfoNote term="ESC" title="ESC (Electronic Speed Controller)">The board that takes the battery voltage and a control signal and drives the drive motor. It has a low-voltage cutoff and stops working if the pack drops too far.</InfoNote>{' '}
                  won't boot. The charger LED is the most
                  honest reading you have.
                </>,
                <>
                  <strong>Is the master switch fully on?</strong> The rocker has
                  a small detent. A half-press lights nothing.
                </>,
                <>
                  <strong>Has the e-stop been pressed?</strong> The big red
                  button on the chassis kills power until it's twisted to
                  release.
                </>,
                <>
                  <strong>Cold day?</strong> A 3S LiPo below 5 °C can refuse to
                  supply load even at 11 V resting. Bringing the pack inside for
                  ten minutes usually warms it back into shape before you retry.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Probable causes ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              LIKELY <Red>CAUSES</Red>
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
                title="Dead pack"
                lede="Voltage below the ESC cutoff."
                body={
                  <>
                    The balance charger tells you the rest of the story. If any
                    cell reads under 3.0 V, the pack has been over-discharged and
                    wants a slow recovery charge before normal use. See{' '}
                    <a href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Charge &amp; power</a>{' '}
                    for the safe routine.
                  </>
                }
                codeChip="cell < 3.0 V → recovery"
              />
              <NumberedFeatureCard
                n={2}
                title="Loose XT60 plug"
                lede="The pack connects but the connector is sloppy."
                body={
                  <>
                    Reseating the plug is the first thing to try. If the male
                    and female halves rotate freely against each other, the
                    housing has split, and the fix is a new connector rather than
                    a fresh pack.
                  </>
                }
                codeChip="reseat · check housing"
              />
              <NumberedFeatureCard
                n={3}
                title="Master switch failure"
                lede="The rocker reads on but no current flows."
                body={
                  <>
                    Rare, but it happens. With the pack plugged in, bridging the
                    two switch leads with a screwdriver for a second is a quick
                    test. If the LED lights, the switch is the cause, and a note
                    to support with the serial number is all it takes for us to
                    arrange a replacement.
                  </>
                }
              />
              <NumberedFeatureCard
                n={4}
                title="Fuse blown"
                lede="There is a 30 A blade fuse next to the ESC."
                body={
                  <>
                    A short on the rear deck (motor wire pinched against the
                    chassis is the usual one) pops it. The fuse is a standard
                    30 A automotive blade, so any auto-parts store carries them.
                  </>
                }
                codeChip="ATO 30A · blue"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="A note on the fuse">
          If the fuse blew, something shorted, so tracking down that short is
          what makes the repair stick. The fuse is the cheapest part on the car,
          and it's there so that a stray short stays a blown fuse rather than
          becoming something more expensive. A fresh fuse on its own usually
          just blows again once power comes back through the same short.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Still stuck after all this?">
          We're happy to take it from here. A photo of the chassis underside
          (XT60 plug + master switch + e-stop visible) plus your order number,
          sent to{' '}
          <a
            href="mailto:support@neobotics.org"
            style={{ color: NB.neoboticsRed, fontWeight: 700 }}
          >
            support@neobotics.org
          </a>
          , gives us enough to go on. Most cases get diagnosed inside an hour.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Charge & power', href: '/docs/getting-started/charge-and-power' }}
        next={{ label: 'LiDAR empty scan', href: '/docs/troubleshooting/lidar-empty-scan' }}
      />
    </DocsShell>
  );
}
