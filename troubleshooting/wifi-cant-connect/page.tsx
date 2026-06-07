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
  NumberedFeatureCard,
  SymptomBanner,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: "Wi-Fi can't connect · Troubleshooting · NeoRacer Docs",
  description:
    'You can\'t see the car\'s Wi-Fi network or can\'t SSH to racecar@neoracer. Three failure modes and the ethernet escape hatch.',
};

export default function WifiCantConnectPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Troubleshooting', href: '/docs/troubleshooting/wont-power-on' },
          { label: "Wi-Fi can't connect" },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
      <section style={{ position: 'relative', paddingBottom: 24, paddingTop: 24 }}>
        <GhostNumeral n="05" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>TROUBLESHOOTING / NETWORK</Eyebrow>
          <DisplayHeading size="xl">
            CONNECTING TO THE <Red>CAR'S WI-FI.</Red>
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
            The car is its own access point. It broadcasts a network named{' '}
            <code style={{ fontFamily: NB.monoFont }}>neoracer-[Car ID]</code> that you
            join from your laptop, then reach the car at{' '}
            <code style={{ fontFamily: NB.monoFont }}>racecar@neoracer</code>. When that
            fails it's almost always one of three things, and there's a wired
            fallback (ethernet) that works regardless. See{' '}
            <a href="/docs/software/networking" style={{ color: NB.red }}>networking</a>{' '}
            for the full access walkthrough.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <ChromeBadge variant="red"><AnimatedNumeral value={3} prefix="~" suffix=" minutes" /></ChromeBadge>
            <ChromeBadge variant="outline">Car is its own AP</ChromeBadge>
            <ChromeBadge variant="outline">Ethernet fallback</ChromeBadge>
          </div>
        </div>
      </section>
      </MouseFollowGlow>

      <ScrollReveal>
      <SymptomBanner
        seeing={
          <>
            The <code style={{ fontFamily: NB.monoFont }}>neoracer-[Car ID]</code>{' '}
            network never shows up in your Wi-Fi list, joining it fails, or{' '}
            <code style={{ fontFamily: NB.monoFont }}>ssh racecar@neoracer</code>{' '}
            hangs once you're on it.
          </>
        }
        expected={
          <>
            You join <code style={{ fontFamily: NB.monoFont }}>neoracer-[Car ID]</code>{' '}
            with password <code style={{ fontFamily: NB.monoFont }}>neobotics</code>,
            then{' '}
            <InfoNote term="SSH" title="SSH">A way to log into another computer's command line over the network. You type commands on your laptop and they run on the car.</InfoNote>{' '}
            connects within a second and drops you at the{' '}
            <code style={{ fontFamily: NB.monoFont }}>racecar@neoracer:~$</code>{' '}
            prompt. The car stays quiet otherwise, since there's no inbound port
            mapped by default.
          </>
        }
      />
      </ScrollReveal>

      {/* ── Section 01 · Triage ───────────────────────────────────────── */}
      <ScrollReveal>
      <section style={{ position: 'relative', paddingBottom: 48 }}>
        <GhostNumeral n="01" top={-30} right={-20} size={400} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>01 / IS IT JOINING OR ROUTING?</Eyebrow>
          <DisplayHeading size="lg">
            JOINING VS <Red>ROUTING.</Red>
          </DisplayHeading>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
            }}
          >
            Two kinds of failure look alike from the user's side. The split is
            whether your laptop can <em>join</em> the car's Wi-Fi at all or
            whether, once joined, it can <em>reach</em> the static IP (routing).
          </p>

          <Code lang="bash">{`# Test 1: is the car broadcasting and did you join it?
# Look for "neoracer-[Car ID]" in your Wi-Fi list (Car 1 = neoracer-1)
# and join it with password "neobotics".

# Test 2: once joined, can you reach the car's static IP?
# Car ID 1 = 192.168.1.101, Car ID 2 = 192.168.1.102, etc.
ping 192.168.1.101

# Reachable IP == you're in; ssh racecar@neoracer (or racecar@192.168.1.101).
# No IP after joining == wrong Car ID or the car hasn't finished booting.`}</Code>
        </div>
      </section>
      </ScrollReveal>

      {/* ── Section 02 · Probable causes ──────────────────────────────── */}
      <ScrollReveal>
      <section style={{ position: 'relative', paddingBottom: 48 }}>
        <GhostNumeral n="02" top={-30} right={-20} size={400} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>02 / WHAT ACTUALLY BREAKS</Eyebrow>
          <DisplayHeading size="lg">
            THE FAILURE <Red>MODES.</Red>
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
              title="Can't see or join the Wi-Fi"
              lede="The neoracer-[Car ID] network never appears."
              body={
                <>
                  The car broadcasts its own access point only once it's powered
                  and booted, which takes a minute or so. If{' '}
                  <code style={{ fontFamily: NB.monoFont }}>neoracer-[Car ID]</code> still
                  isn't in your Wi-Fi list after that, confirm the car is on, then
                  re-scan. Join it with password{' '}
                  <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.
                </>
              }
              codeChip="ssid: neoracer-1 · pw: neobotics"
            />
            <NumberedFeatureCard
              n={2}
              title="Joined but can't reach the IP"
              lede="You're on the network but SSH hangs."
              body={
                <>
                  Each car has a static IP at{' '}
                  <code style={{ fontFamily: NB.monoFont }}>192.168.1.[100 + Car ID]</code>{' '}
                  (Car 1 = 192.168.1.101). If a ping to that address times out, the
                  car may still be finishing its boot. Wait, re-ping, then{' '}
                  <code style={{ fontFamily: NB.monoFont }}>ssh racecar@neoracer</code>.
                </>
              }
              codeChip="ssh racecar@192.168.1.101"
            />
            <NumberedFeatureCard
              n={3}
              title="Wrong Car ID"
              lede="You joined a different car's network."
              body={
                <>
                  The <InfoNote term="SSID" title="SSID">The name of a Wi-Fi network, the text you pick from the list when joining. Here it is neoracer_N.</InfoNote> and the IP both encode the Car ID, so they have to
                  match. If you joined <code style={{ fontFamily: NB.monoFont }}>neoracer_2</code>{' '}
                  but ping <code style={{ fontFamily: NB.monoFont }}>192.168.1.101</code>,
                  nothing answers. Use the ID printed on the car: SSID{' '}
                  <code style={{ fontFamily: NB.monoFont }}>neoracer_N</code>, IP{' '}
                  <code style={{ fontFamily: NB.monoFont }}>192.168.1.(100+N)</code>.
                </>
              }
              codeChip="neoracer_N → 192.168.1.(100+N)"
            />
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ── Section 03 · Ethernet escape hatch ───────────────────────── */}
      <ScrollReveal>
      <section style={{ position: 'relative', paddingBottom: 32 }}>
        <GhostNumeral n="03" top={-30} right={-20} size={400} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>03 / FALLBACK</Eyebrow>
          <DisplayHeading size="lg">
            THE ETHERNET <Red>FALLBACK.</Red>
          </DisplayHeading>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
            }}
          >
            The Jetson has a real ethernet port on the rear of the chassis.
            Running a cable from there to your laptop or a router gives you a
            reliable path that doesn't care about the Wi-Fi radio or which
            access point the car is broadcasting.
          </p>

          <Code lang="bash">{`# Direct laptop-to-car cable, no router in the middle.
# The Jetson auto-assigns a link-local IPv4 on eth0 if it can't find DHCP.
sudo nmap -sn 169.254.0.0/16          # find the car's link-local IP
ssh racecar@<link-local-ip>           # then SSH straight to it`}</Code>

          <Callout type="tip" title="Confirming the car's identity once you're in">
            Once you can SSH in, check the hostname and Car ID so you know which
            IP and SSID to use next time:
            <Code lang="bash">{`hostname                              # expect "neoracer"
whoami                                # expect "racecar"`}</Code>
            The Car ID printed on the chassis tells you the SSID (<code style={{ fontFamily: NB.monoFont }}>neoracer_N</code>)
            and static IP (<code style={{ fontFamily: NB.monoFont }}>192.168.1.(100+N)</code>).
          </Callout>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <Callout type="warn" title="ngrok is for development, not classrooms">
        If a teacher asks for a remote-access option, a proper VPN is the one
        to reach for. Tunnels are great for one-off remote debugging, but
        leaving one up unattended on a school network opens it to the whole
        internet, so it's best torn down once you're done.
      </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Camera no feed', href: '/docs/troubleshooting/camera-no-feed' }}
        next={{ label: 'FAQ', href: '/docs/troubleshooting/faq' }}
      />
    </DocsShell>
  );
}
