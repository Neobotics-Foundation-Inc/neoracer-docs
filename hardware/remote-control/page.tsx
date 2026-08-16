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

/* One screen of the transmitter's LCD, on its own white panel. */
function FlyskyScreen({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: '#ffffff',
        border: `1px solid ${NB.borderOnBeige}`,
        borderRadius: 8,
        padding: 14,
        alignSelf: 'start',
      }}
    >
      <div style={{ position: 'relative' }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 380px"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
}

/* A screen next to its explanation; stacks on mobile. */
function FlyskyScreenStep({
  title,
  screen,
  children,
}: {
  title: string;
  screen: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr]"
      style={{ gap: 22, alignItems: 'start', marginBottom: 28 }}
    >
      {screen}
      <div>
        <h3
          style={{
            fontFamily: NB.headingFont,
            fontSize: 18,
            fontWeight: 700,
            color: NB.textOnBeige,
            margin: '0 0 8px',
          }}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

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
            The Flysky controller is a touchscreen controller used to manually
            drive the NeoRacer and enable autonomy. Before use, we recommend
            reading the Flysky manual along with this page.
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
              <><strong>Right stick: steering.</strong> Push it left to turn left and right to turn right.</>,
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
            The transmitter ships mapped for the car. However, it is good to
            get familiar with some settings in the Flysky&apos;s menu. If the
            receiver gets reset or you swap transmitters, you can remap and
            reset the output method for the controller.
          </p>

          <div style={{ marginTop: 28 }}>
            <FlyskyScreenStep
              title="The home screen"
              screen={
                <FlyskyScreen
                  src="/images/flysky_start.png"
                  alt="The FS-i6S home screen, showing the two timers, the fly mode, and the TX and RX battery indicators in the top right"
                  width={796}
                  height={410}
                />
              }
            >
              <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, margin: 0 }}>
                Turning the controller on brings you to the home screen. The
                battery level is in the top right.
              </p>
            </FlyskyScreenStep>

            <FlyskyScreenStep
              title="The channels"
              screen={
                <FlyskyScreen
                  src="/images/flysky_channels.png"
                  alt="The FS-i6S channel screen, showing bars for channels 1 to 6 with channel 3 part way along its travel"
                  width={832}
                  height={410}
                />
              }
            >
              <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, margin: 0 }}>
                Swipe right from the home screen to see the channels. The
                controller has 10 of them. Move a stick or flick a switch and
                the matching channel moves with it, which is the quickest way to
                see what is mapped where. Slide your finger up and down to
                scroll through the rest.
              </p>
            </FlyskyScreenStep>

            <FlyskyScreenStep
              title="Changing the mapping"
              screen={
                <FlyskyScreen
                  src="/images/flysky_changing_channels.png"
                  alt="The FS-i6S Aux. channels screen, showing Channel 5 with arrows either side and its control type set to None"
                  width={654}
                  height={344}
                />
              }
            >
              <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, margin: '0 0 10px' }}>
                The switches are mapped to channels at the factory. To change
                that mapping, open the auxiliary channel screen:
              </p>
              <DashList
                items={[
                  <>On the home screen, hold the lock icon for two seconds.</>,
                  <>Tap the tool icon to open the controller settings.</>,
                  <>Scroll down and tap <strong>Aux. channels</strong>.</>,
                ]}
              />
              <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, margin: '10px 0' }}>
                On this screen you can:
              </p>
              <DashList
                items={[
                  <>Select a channel with the left and right arrows on either side of the channel name.</>,
                  <>Pick the type of control for that channel in the left box below the name: Nul, VRx, STx, KEY, or SWx.</>,
                ]}
              />
            </FlyskyScreenStep>

            <FlyskyScreenStep
              title="Changing the output mode"
              screen={
                <FlyskyScreen
                  src="/images/flysky_output.png"
                  alt="The FS-i6S output mode screen, with PWM and PPM under Output and i-BUS and S.BUS under Serial"
                  width={734}
                  height={334}
                />
              }
            >
              <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, margin: '0 0 10px' }}>
                The output mode is how the receiver sends the channels to the
                car. Getting there follows the same route:
              </p>
              <DashList
                items={[
                  <>On the home screen, hold the lock icon for two seconds.</>,
                  <>Tap the tool icon to open the controller settings.</>,
                  <>Tap <strong>Sys</strong> in the top right, then scroll down to <strong>Output mode</strong>.</>,
                ]}
              />
              <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, margin: '10px 0 0' }}>
                Make sure the output is set to{' '}
                <InfoNote term="S.BUS" title="S.BUS">
                  A serial protocol that carries every channel down a single wire, instead of one PWM wire per channel. The car&apos;s receiver feeds the OSCORE board over S.BUS.
                </InfoNote>{' '}
                in the Serial column.
              </p>
            </FlyskyScreenStep>
          </div>
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
