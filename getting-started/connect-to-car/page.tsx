import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
  StepMarker,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Get on the car · Setup · NeoRacer Docs',
  description:
    'The one-time first setup, done at the car: attach the Wi-Fi antennas, plug in a monitor and keyboard, and get the car onto the internet (join your Wi-Fi, plug in Ethernet, or use the cudy router). Then install the driver.',
};

export default function ConnectToCarPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Get on the car' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="NET" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              GET ON THE <Red>CAR.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              A brand new NeoRacer needs a network setup first. Here&apos;s how
              you do it, step by step.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="Why this step is done at the car">
          A fresh car has no network to log in over yet, so the first setup is
          done with a monitor and keyboard plugged straight into the car.
        </Callout>
      </ScrollReveal>

      {/* ── 01 · Antennas ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={1} label="ATTACH THE ANTENNAS" />
            <DisplayHeading size="lg">
              THE WI-FI <Red>ANTENNAS.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The Jetson&apos;s Wi-Fi card sits on its underside, so the two
              antenna leads are reached from below.
            </p>
            <DashList
              items={[
                <>Power the car off before you unmount the Jetson.</>,
                <>Unscrew the Jetson from its 3D-printed chassis mount to reach the Wi-Fi card underneath.</>,
                <>Press each of the two antenna connectors onto its socket on the card until it clicks.</>,
                <>Screw the Jetson back onto its mount and route the antennas clear of the wheels and belt.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Console ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={2} label="PLUG IN A CONSOLE" />
            <DisplayHeading size="lg">
              MONITOR AND <Red>KEYBOARD.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Connect a monitor to the Jetson&apos;s DisplayPort or HDMI output
              and a USB keyboard and mouse. Power the car on and log in as{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar</code> (password{' '}
              <code style={{ fontFamily: NB.monoFont }}>neobotics</code>).
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Internet ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <StepMarker n={3} label="GET THE CAR ONLINE" />
            <DisplayHeading size="lg">
              INTERNET <Red>FIRST.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The install on the next page needs internet. Either works:
            </p>
            <DashList
              items={[
                <>
                  <strong>Join your Wi-Fi.</strong> Open the network menu in the
                  top-right of the desktop and join any Wi-Fi with internet.
                </>,
                <>
                  <strong>Or plug in Ethernet.</strong> Connect a cable with
                  internet to the Jetson&apos;s RJ45 port, then switch Wired on
                  in the same network menu.
                </>,
              ]}
            />
            <Callout type="tip" title="Verify the internet connection">
              Run <code style={{ fontFamily: NB.monoFont }}>ping github.com</code>{' '}
              in a terminal. Replies mean you are online.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Charge & power', href: '/docs/getting-started/charge-and-power' }}
        next={{ label: 'Install the driver', href: '/docs/getting-started/install-driver' }}
      />
    </DocsShell>
  );
}
