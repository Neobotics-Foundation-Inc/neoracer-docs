import Link from 'next/link';
import Image from 'next/image';
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
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';
import { TransmitterChannelSetup } from '@/components/docs/ManualDiagrams';
import { SensorSheet } from '@/components/docs/SensorSheet';

/* The manufacturer's labelled line diagrams, front and back. */
function FlyskyLabelledViews() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto' }}>
      <Image
        src="/images/flysky_label_front.png"
        alt="Front view of the Flysky FS-i6S with every control labelled: switches SwA to SwD, dials VrA and VrB, the two sticks, touch screen, and power buttons"
        width={2470}
        height={1420}
        sizes="(max-width: 768px) 100vw, 720px"
        style={{ width: '100%', height: 'auto', display: 'block', background: '#ffffff', borderRadius: 6 }}
      />
      <Image
        src="/images/flysky_label_back.png"
        alt="Rear view of the Flysky FS-i6S with the handle, Key 1, Key 2, and battery cover labelled"
        width={2466}
        height={1278}
        sizes="(max-width: 768px) 100vw, 720px"
        style={{ width: '100%', height: 'auto', display: 'block', background: '#ffffff', borderRadius: 6 }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Remote control · Hardware · NeoRacer Docs',
  description:
    'The Flysky FS-i6S transmitter: the sticks and switches, SWB to hand control between manual and autonomy, SWA for slow or fast manual driving, and how to remap the auxiliary channels to S.BUS output.',
};

export default function RemoteControlPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Remote control' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="07" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE REMOTE <Red>CONTROL</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The car ships with a{' '}
              <InfoNote term="Flysky FS-i6S" title="Flysky FS-i6S">
                The handheld radio transmitter included with the car. Two sticks for throttle and steering, plus top switches mapped to auxiliary channels.
              </InfoNote>{' '}
              transmitter. In the Flysky box, there is the controller, its
              manual, a micro-USB cable, and a bracket.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Flysky FS-i6S</ChromeBadge>
              <ChromeBadge variant="outline">SWB = manual ↔ autonomy</ChromeBadge>
              <ChromeBadge variant="outline">SWA = slow ↔ fast</ChromeBadge>
              <ChromeBadge variant="outline">S.BUS output</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── The transmitter card ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <SensorSheet
            title="Flysky FS-i6S"
            image="/images/flysky-sheet.jpg"
            alt="The Flysky FS-i6S transmitter"
            wideSpecs
            specs={[
              ['Channels', '10'],
              ['RF range', '2.408 - 2.475 GHz'],
              ['Bandwidth', '500 KHz'],
              ['Protocol', 'AFHDS 2A'],
              ['Stick resolution', '4096'],
              ['Power input', '4.3V - 6V'],
              ['Battery', '4 AA batteries'],
              ['Weight', '410g'],
              ['Size', '179 × 81 × 161 mm'],
            ]}
          >
            We highly recommend reading the Flysky manual along with this page.
          </SensorSheet>
        </section>
      </ScrollReveal>

      {/* ── Using the controller ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            USING THE <Red>CONTROLLER</Red>
          </DisplayHeading>
          <div style={{ marginTop: 18 }}>
            <Fig
              label="FIG. A / THE TRANSMITTER"
              bg="#ffffff"
              caption={
                <>
                  The FS-i6S, front and back. For more information, visit the{' '}
                  <a
                    href="https://www.flysky-cn.com/fsi6s"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: NB.neoboticsRed, fontWeight: 700 }}
                  >
                    Flysky FS-i6S product page
                  </a>
                  .
                </>
              }
            >
              <FlyskyLabelledViews />
            </Fig>
          </div>
          <DashList
            items={[
              <><strong>Left stick: throttle.</strong> Push it up to drive forward. Pull it down to reverse. Let it return to the centre to stop.</>,
              <><strong>Right stick: steering.</strong> Push it left to turn left and right to turn right. The car only steers while it is moving.</>,
              <><strong>SWA: manual speed.</strong> Up is slow mode, which limits the throttle to 15% of full power. Down is fast mode.</>,
              <><strong>SWB: mode.</strong> This switch decides who drives the car.</>,
            ]}
          />
          <div style={{ margin: '18px 0' }}>
            <DataTable
              columns={[
                { key: 'mode', label: 'Mode', accent: true },
                { key: 'pos', label: 'SWB position', mono: true },
                { key: 'who', label: 'Who drives' },
              ]}
              rows={[
                { mode: 'Manual (RC)', pos: 'Up', who: 'You drive the car with the sticks.' },
                { mode: 'Autonomous', pos: 'Down', who: 'Your code drives the car.' },
              ]}
            />
          </div>
          <DashList
            items={[
              <><strong>Power.</strong> Hold both side buttons until the transmitter beeps to turn it on or off.</>,
            ]}
          />
          <Callout type="warn" title="Turn the controller on before the car">
            While the controller is off, the car stays in the mode it was last
            put in. If you left it in autonomous mode and you power the car on
            with a program already running, such as the wall following
            dashboard, the car can start driving on its own straight away.
            Always turn the controller on first and the car second, so SWB sets
            the mode before the car can move.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── 03 · channel setup (advanced) ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            CHANNEL MAPPING + <Red>S.BUS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The transmitter ships mapped for the car, so most people never open
            this menu. You only need it if the receiver gets reset, you swap
            transmitters, or the auxiliary channels stop matching the switches.
            The car expects the channels mapped to switches and the output set to{' '}
            <InfoNote term="S.BUS" title="S.BUS">
              A serial protocol that carries every channel down a single wire, instead of one PWM wire per channel. The car&apos;s receiver feeds the controller over S.BUS.
            </InfoNote>.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Fig
          label="FIG. B / TRANSMITTER CHANNEL SETUP"
          caption="Map the auxiliary channels to the top switches, set the output mode to S.BUS, and re-bind the receiver. Changing the output mode always needs a re-bind, or the car won't respond."
        >
          <TransmitterChannelSetup />
        </Fig>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Hardware overview', href: '/docs/hardware/overview' }}
        next={{ label: 'Dot matrix', href: '/docs/hardware/dot-matrix' }}
      />
    </DocsShell>
  );
}
