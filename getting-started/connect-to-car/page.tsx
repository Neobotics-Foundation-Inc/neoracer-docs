import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, Callout, Code, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Get on the car · Getting Started · NeoRacer Docs',
  description:
    'The one-time first setup, done at the car: attach the Wi-Fi antennas, plug in a monitor and keyboard, get the car onto the internet (join your Wi-Fi or plug in Ethernet), and pull the neoracer_ros2_driver repository. Then install.',
};

export default function ConnectToCarPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Getting Started', href: '/docs/getting-started/unbox' },
          { label: 'Get on the car' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="NET" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>GETTING STARTED / GET ON THE CAR</Eyebrow>
            <DisplayHeading size="xl">
              GET ON THE <Red>CAR.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              A brand new NeoRacer needs a network setup first. Here&apos;s how
              you do it, step by step.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">One-time, in person</ChromeBadge>
              <ChromeBadge variant="outline">internet first</ChromeBadge>
              <ChromeBadge variant="outline">user racecar</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="Why this step is done at the car, not over SSH">
          On a fresh car there is no network to log in over yet, so the first
          setup is done with a monitor and keyboard plugged straight into the
          car. Once it is set up, you never need the monitor again.
        </Callout>
      </ScrollReveal>

      {/* ── 01 · Antennas ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / ATTACH THE ANTENNAS</Eyebrow>
            <DisplayHeading size="lg">
              THE WI-FI <Red>ANTENNAS.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The Jetson&apos;s Wi-Fi card sits on its underside, so the two antenna
              leads are reached from below. Unscrew the Jetson from its 3D-printed
              mount, connect each antenna to the card, and screw it back in place.
              Every network step after this one uses that card, so do this first.
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
            <Eyebrow>02 / PLUG IN A CONSOLE</Eyebrow>
            <DisplayHeading size="lg">
              MONITOR AND <Red>KEYBOARD.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Connect a monitor to the Jetson&apos;s DisplayPort or HDMI output and a
              USB keyboard and mouse. This is your way onto the car for the first
              setup, since there is no network to reach it over yet. Power the car
              on and log in as <code style={{ fontFamily: NB.monoFont }}>racecar</code>{' '}
              (password <code style={{ fontFamily: NB.monoFont }}>neobotics</code>).
              You land on a normal Ubuntu desktop.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Internet ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / GET THE CAR ONLINE</Eyebrow>
            <DisplayHeading size="lg">
              INTERNET <Red>FIRST.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Everything the next pages install downloads from the internet, so
              the car needs a connection before anything else. The car&apos;s own
              network comes later and carries no internet; this step uses a
              network you already have. Any one of these works:
            </p>
            <DashList
              items={[
                <>
                  <strong>Join your Wi-Fi.</strong> On the desktop, open the
                  network menu in the top-right corner and join your home,
                  school, or phone-hotspot Wi-Fi, the same way you would on any
                  laptop. This is the usual path.
                </>,
                <>
                  <strong>Or plug in Ethernet.</strong> An Ethernet cable with
                  internet into the Jetson&apos;s RJ45 port connects it with no
                  further steps.
                </>,
                <>
                  <strong>Or use the cudy router.</strong> Every kit ships with
                  one. Connect its uplink to the internet and plug the car into
                  it, and this step is covered.
                </>,
              ]}
            />
            <Callout type="tip" title="Check it took">
              Open a browser on the car, or run{' '}
              <code style={{ fontFamily: NB.monoFont }}>ping github.com</code> in a
              terminal. Either answering means you are online.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · The driver repo ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / GET THE DRIVER ONTO THE CAR</Eyebrow>
            <DisplayHeading size="lg">
              THE NEORACER <Red>DRIVER.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The car&apos;s tooling, including the script that later creates its
              own network, lives in one repository:{' '}
              <a href="https://github.com/Neobotics-Foundation-Inc/neoracer_ros2_driver" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                neoracer_ros2_driver
              </a>. Cars from the factory ship with it at{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/ros2_ws/src/neoracer_ros2_driver</code>;
              pull it in a terminal so it is current. If your car doesn&apos;t
              have it, clone it.
            </p>
            <Code lang="bash">{`cd ~/ros2_ws/src/neoracer_ros2_driver && git pull

# or, if the repository is not on the car yet:
mkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src
git clone https://github.com/Neobotics-Foundation-Inc/neoracer_ros2_driver.git`}</Code>
            <Callout type="note" title="Where the racecar command comes from">
              The <code style={{ fontFamily: NB.monoFont }}>racecar</code> shorthand
              used across these docs is part of this repository, and it lands in
              your shell during the driver install on the next page. Anything
              before that point calls the repository&apos;s scripts directly
              with <code style={{ fontFamily: NB.monoFont }}>bash</code>.
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
