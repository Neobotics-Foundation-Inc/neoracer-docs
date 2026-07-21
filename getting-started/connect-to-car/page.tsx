import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, Callout, Code, DataTable, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Get on the car · Getting Started · NeoRacer Docs',
  description:
    'Attach the Wi-Fi antennas, connect a monitor and keyboard for the first setup, then put the car on a network one of two ways: through the cudy router at 192.168.10.100, or as its own access point at 10.42.0.1. Then SSH in as racecar.',
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
              A brand new NeoRacer needs a network setup first. Here&apos;s how you
              do it, step by step.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">One-time, in person</ChromeBadge>
              <ChromeBadge variant="outline">cudy router · 192.168.10.100</ChromeBadge>
              <ChromeBadge variant="outline">access point · 10.42.0.1</ChromeBadge>
              <ChromeBadge variant="outline">user racecar</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="Why this step is done at the car, not over SSH">
          On a fresh car there is no network to log in over yet, and turning on the
          car&apos;s own access point drops any Wi-Fi connection the moment it comes
          up. So the first setup is done with a monitor and keyboard plugged
          straight into the car. Once it is on a network, you never need the monitor
          again.
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
              This is worth doing regardless of which network path you pick, since
              the car&apos;s own Wi-Fi barely reaches without them.
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
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Pick a path ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / PUT THE CAR ON A NETWORK</Eyebrow>
            <DisplayHeading size="lg">
              PICK A <Red>PATH.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              There are two ways to get the car onto Wi-Fi. The cudy router suits a
              classroom or several cars and can share internet; the car&apos;s own
              access point suits a single car with no extra hardware. You only need
              one.
            </p>

            {/* Option A */}
            <div style={{ marginTop: 20 }}>
              <MonoLabel>Option A · The cudy router</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                The cudy router plugs into the Ethernet port on the car&apos;s board.
                That board bridges the link to the Jetson over USB, so the Jetson
                sees it as a wired connection and sits at a fixed address on the
                router,{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>192.168.10.100</code>.
                Join the router&apos;s Wi-Fi from your laptop, and the car is right
                there.
              </p>
              <DashList
                items={[
                  <>Connect the cudy router to the Ethernet port on the car&apos;s board.</>,
                  <>Join the router&apos;s Wi-Fi from your laptop, named <code style={{ fontFamily: NB.monoFont }}>neoracer-[ID]</code>, password <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.</>,
                  <>The car answers at <code style={{ fontFamily: NB.monoFont }}>192.168.10.100</code> (the router itself is <code style={{ fontFamily: NB.monoFont }}>192.168.10.1</code>).</>,
                ]}
              />
              <p style={{ fontFamily: NB.bodyFont, fontSize: 14.5, lineHeight: 1.6, color: NB.textMutedBeige, maxWidth: 720, marginTop: 8 }}>
                The full router reference, including RustDesk and the admin page, is
                on{' '}
                <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</Link>.
              </p>
            </div>

            {/* Option B */}
            <div style={{ marginTop: 24 }}>
              <MonoLabel>Option B · The car&apos;s own access point</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                With no router at all, the Jetson can broadcast its own Wi-Fi. From
                the console, one command turns it into an{' '}
                <InfoNote term="access point" title="Access point">A device that broadcasts its own Wi-Fi network for others to join, the way a home router does. Here the car itself becomes the network.</InfoNote>{' '}
                named <code style={{ fontFamily: NB.monoFont }}>neoracer-1</code> at{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>10.42.0.1</code>.
              </p>
              <Code lang="bash">{`racecar setup networking     # run this on the console, not over Wi-Fi`}</Code>
              <DashList
                items={[
                  <>Run the command above at the car&apos;s console. The access point comes up as <code style={{ fontFamily: NB.monoFont }}>neoracer-1</code>, password <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.</>,
                  <>Join <code style={{ fontFamily: NB.monoFont }}>neoracer-1</code> from your laptop.</>,
                  <>The car answers at <code style={{ fontFamily: NB.monoFont }}>10.42.0.1</code>.</>,
                ]}
              />
              <Callout type="warn" title="Run it from the console, not over Wi-Fi">
                Bringing the access point up takes over the Wi-Fi radio, so any Wi-Fi
                connection drops the instant it starts. Run{' '}
                <code style={{ fontFamily: NB.monoFont }}>racecar setup networking</code>{' '}
                from the monitor-and-keyboard console so you don&apos;t cut yourself
                off mid-setup.
              </Callout>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · SSH in ──────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / LOG IN FROM YOUR LAPTOP</Eyebrow>
            <DisplayHeading size="lg">
              SSH <Red>IN.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Once your laptop is on the same network as the car, you are done with
              the monitor.{' '}
              <InfoNote term="SSH" title="SSH">SSH (Secure Shell) logs you into another computer over the network and gives you its terminal. Here it puts you on the car.</InfoNote>{' '}
              in as <code style={{ fontFamily: NB.monoFont }}>racecar</code> at the
              address for the path you chose.
            </p>
            <Code lang="bash">{`ssh racecar@192.168.10.100    # cudy router
ssh racecar@10.42.0.1         # access point
# password: neobotics`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'path', label: 'Path', accent: true },
                  { key: 'ssid', label: "Wi-Fi to join" },
                  { key: 'ip', label: 'Car address', mono: true },
                ]}
                rows={[
                  { path: 'Cudy router', ssid: 'neoracer-[ID]', ip: '192.168.10.100' },
                  { path: 'Access point', ssid: 'neoracer-1', ip: '10.42.0.1' },
                ]}
              />
            </div>
            <Callout type="tip" title="You are on the car">
              A shell prompt as <code style={{ fontFamily: NB.monoFont }}>racecar</code>{' '}
              means the car is on the network and reachable. Next you install the
              driver, which brings the sensors and motors up as services that start
              on their own from then on.
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
