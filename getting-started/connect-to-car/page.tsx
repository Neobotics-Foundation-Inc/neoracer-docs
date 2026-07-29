import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
  ChromeBadge,
  ClockGlyph,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, PhotoSteps } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Connect to the car · Setup · NeoRacer Docs',
  description:
    'The one-time first setup, done at the car: attach the Wi-Fi antennas, plug in a monitor and keyboard, and get the car onto the internet (join your Wi-Fi, plug in Ethernet, or use the cudy router). Then install the driver.',
};

export default function ConnectToCarPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Connect to the car' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              CONNECT TO THE <Red>CAR</Red>
            </DisplayHeading>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}>~15 minutes</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="Why this setup happens on the car">
          A brand new car is not on any network yet, so there is no way to log
          in remotely. The first setup is done with a monitor and keyboard
          plugged directly into the car.
        </Callout>
      </ScrollReveal>

      {/* ── 01 · Antennas ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              ATTACH THE WI-FI <Red>ANTENNAS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The Jetson&apos;s Wi-Fi card sits on its underside, so the two
              antenna cables are attached from below. Each antenna comes in two
              parts: the cable, and the plastic antenna that screws onto its
              end. Steps with a <strong>photo</strong> chip have a reference
              picture.
            </p>
            <PhotoSteps
              items={[
                { text: <>Power the car off before you unmount the Jetson.</> },
                {
                  text: <>Unscrew the Jetson from its 3D-printed chassis mount to reach the Wi-Fi card underneath. It is held by four hex screws.</>,
                  photos: [{ src: '/images/jetson-screws.jpeg', alt: 'The four hex screws holding the Jetson to its chassis mount' }],
                },
                {
                  text: <>Flip the Jetson over to find the two antenna sockets on the Wi-Fi card.</>,
                  photos: [{ src: '/images/jetson-flipped.jpeg', alt: 'The flipped Jetson with the antenna sockets on the Wi-Fi card highlighted' }],
                },
                {
                  text: <>Keep the plastic antennas aside for now; they screw onto the cable ends later.</>,
                  photos: [{ src: '/images/jetson-antenna.jpeg', alt: 'An antenna cable next to the plastic antenna that screws onto it' }],
                },
                {
                  text: <>Press each cable connector onto its socket on the card until it clicks.</>,
                  photos: [{ src: '/images/jetson-antenna-attached.jpeg', alt: 'An antenna cable attached to the Wi-Fi card socket' }],
                },
                {
                  text: <>Screw the Jetson back onto its mount and route the cables through the chassis to the sides of the car.</>,
                  photos: [{ src: '/images/jetson-antennas-hanging.jpeg', alt: 'The antenna cables routed through the chassis to the sides' }],
                },
                {
                  text: <>Screw the plastic antennas onto the cable ends on each side.</>,
                  photos: [{ src: '/images/jetson-antennas-attached-car.jpeg', alt: 'A plastic antenna screwed onto the cable at the side of the car' }],
                },
                {
                  text: <>Zip-tie the antennas so they stay clear of the wheels and belt. One option is to tie them to the router&apos;s antennas, but any arrangement that keeps them clear works.</>,
                  photos: [
                    { src: '/images/jetson-antenna-ziptied-1.jpeg', alt: 'An antenna zip-tied to the router antenna' },
                    { src: '/images/jetson-antenna-ziptied-2.jpeg', alt: 'Both sides of the car with the antennas zip-tied' },
                  ],
                },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Console ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              PLUG IN A MONITOR AND <Red>KEYBOARD</Red>
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
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              CONNECT TO THE <Red>INTERNET</Red>
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
