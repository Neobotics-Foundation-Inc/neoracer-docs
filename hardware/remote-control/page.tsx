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
  DashList,
  Fig,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';
import { TransmitterControlsDiagram, TransmitterChannelSetup } from '@/components/docs/ManualDiagrams';

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
          <GhostNumeral n="08" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE REMOTE <Red>CONTROL</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The car ships with a{' '}
              <InfoNote term="Flysky FS-i6S" title="Flysky FS-i6S">
                The handheld radio transmitter included with the car. Two sticks for throttle and steering, plus top switches mapped to auxiliary channels.
              </InfoNote>{' '}
              transmitter. Two sticks drive it, and{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>SWB</code>{' '}
              is the switch that matters most: it hands control between you and
              the host computer. Up you drive; down your code does.
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

      {/* ── FIG. A / controls ───────────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / THE TRANSMITTER"
          caption="The Flysky FS-i6S front face. Left stick is throttle, right stick is steering, the four top switches map to auxiliary channels, and the two side buttons power it on and off when you hold both together."
        >
          <TransmitterControlsDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── 01 · controls ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <Eyebrow>01 / WHAT EACH CONTROL DOES</Eyebrow>
          <DisplayHeading size="lg">
            STICKS AND <Red>SWITCHES</Red>
          </DisplayHeading>
          <DashList
            items={[
              <><strong>Left stick, throttle.</strong> Push up to go forward, pull down to reverse. Releasing it to centre is the everyday way to stop.</>,
              <><strong>Right stick, steering.</strong> Left turns left, right turns right. Steering only bites while the car is rolling.</>,
              <><strong>SWA, manual speed.</strong> Up is slow mode (throttle capped at 15% of full power), down is fast. Start slow while you find the feel of it.</>,
              <><strong>SWB, mode.</strong> Decides who is driving, covered below.</>,
              <><strong>Power.</strong> Hold both side buttons together until it beeps to turn the transmitter on or off.</>,
            ]}
          />
          <Callout type="note" title="Turn the transmitter on first">
            Power the transmitter up before the car, so the receiver locks onto a
            clean signal from the start. A small twitch at power-on just means the
            link is still settling.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── 02 · modes ──────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / THE MODE SWITCH</Eyebrow>
            <DisplayHeading size="lg">
              THE MODE <Red>SWITCH</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              SWB answers one question: who is driving. Up is you, on the
              sticks. Down hands the car to the host computer and your code.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'mode', label: 'Mode', accent: true },
                  { key: 'pos', label: 'SWB position', mono: true },
                  { key: 'who', label: 'Who drives' },
                ]}
                rows={[
                  { mode: 'Manual (RC)', pos: 'Up', who: 'You, on the sticks. The safe default.' },
                  { mode: 'Autonomous', pos: 'Down', who: 'The host computer: teleop, SLAM, Nav2, your code.' },
                ]}
              />
            </div>
            <Callout type="warn" title="Start and end in manual">
              Set SWB up before you power on, and again before you shut down.
              Coming up in manual means the car can&apos;t drive itself off the
              bench, and dropping back to manual cuts autonomous control cleanly
              when you&apos;re done. Whenever something looks wrong, flipping
              SWB back up is the fastest way to take the wheel.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · channel setup (advanced) ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <Eyebrow>03 / ADVANCED</Eyebrow>
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
