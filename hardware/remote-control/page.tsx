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
    'The Flysky FS-i6S transmitter: the sticks and switches, the CH7 toggle between manual (RC) and autonomous (ROS) control, and how to remap the auxiliary channels to S.BUS output.',
};

export default function RemoteControlPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Remote control' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="RC" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / REMOTE CONTROL</Eyebrow>
            <DisplayHeading size="xl">
              TWO MODES, <Red>ONE SWITCH.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The car ships with a{' '}
              <InfoNote term="Flysky FS-i6S" title="Flysky FS-i6S">
                The handheld radio transmitter included with the car. Two sticks for throttle and steering, plus top switches mapped to auxiliary channels.
              </InfoNote>{' '}
              transmitter. Two sticks drive it, and the{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>CH7</code>{' '}
              switch is the one that matters most: it hands control between you and
              the host computer. Keep it centred and you drive; flip it and your
              code does.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Flysky FS-i6S</ChromeBadge>
              <ChromeBadge variant="outline">CH7 = RC ↔ autonomous</ChromeBadge>
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
            STICKS AND <Red>SWITCHES.</Red>
          </DisplayHeading>
          <DashList
            items={[
              <><strong>Left stick, throttle.</strong> Push up to go forward, pull down to reverse. Releasing it to centre is the everyday way to stop.</>,
              <><strong>Right stick, steering.</strong> Left turns left, right turns right. Steering only bites while the car is rolling.</>,
              <><strong>2-position switch, speed.</strong> Up for low speed, down for high. Start low while you find the feel of it.</>,
              <><strong>3-position switch (CH7), mode.</strong> The manual-vs-autonomous toggle, covered below.</>,
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
          <GhostNumeral n="7" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / THE CH7 TOGGLE</Eyebrow>
            <DisplayHeading size="lg">
              RC OR <Red>AUTONOMOUS.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              CH7 is the 3-position switch, mapped to the receiver&apos;s SWB. Its
              position decides who is driving: you, on the sticks, or the host
              computer running your code.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'mode', label: 'Mode', accent: true },
                  { key: 'ch7', label: 'CH7 position', mono: true },
                  { key: 'who', label: 'Who drives' },
                ]}
                rows={[
                  { mode: 'Manual (RC)', ch7: 'Up / middle', who: 'You, on the sticks. The safe default.' },
                  { mode: 'Autonomous (ROS)', ch7: 'Down', who: 'The host computer: teleop, SLAM, Nav2, your code.' },
                ]}
              />
            </div>
            <Callout type="warn" title="Start and end in RC">
              Centre CH7 before you power on, and again before you shut down. Coming
              up in RC means the car can&apos;t drive itself off the bench, and
              dropping back to RC cuts autonomous control cleanly when you&apos;re
              done. Whenever something looks wrong, flipping back to RC is the
              fastest way to take the wheel.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · channel setup (advanced) ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <Eyebrow>03 / ADVANCED</Eyebrow>
          <DisplayHeading size="lg">
            CHANNEL MAPPING + <Red>S.BUS.</Red>
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
        prev={{ label: 'First drive', href: '/docs/getting-started/first-drive' }}
        next={{ label: 'Drivetrain', href: '/docs/hardware/drivetrain' }}
      />
    </DocsShell>
  );
}
