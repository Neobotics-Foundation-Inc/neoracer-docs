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
  DashList,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Networking · Software · NeoRacer Docs',
  description:
    "The NeoRacer is its own Wi-Fi access point. Join neoracer-[Car ID], reach the car at the static IP 192.168.1.[100 + Car ID] as user racecar, and ROS 2 DDS discovery does the rest.",
};

export default function NetworkingPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Software', href: '/docs/software/os-and-image' },
          { label: 'Networking' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="NET" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SOFTWARE / NETWORKING</Eyebrow>
            <DisplayHeading size="xl">
              THE CAR'S <Red>WI-FI.</Red>
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
              The NeoRacer is its own access point. It broadcasts a Wi-Fi network
              named for its Car ID, and once your laptop joins it the car sits at
              a fixed address every time. No home router, no hunting for an IP,
              and the same steps whether you're on a kitchen table or a locked
              down campus.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">SSID neoracer-[Car ID]</ChromeBadge>
              <ChromeBadge variant="outline">static 192.168.1.[100 + Car ID]</ChromeBadge>
              <ChromeBadge variant="outline">user racecar</ChromeBadge>
              <ChromeBadge variant="outline">ROS 2 DDS discovery</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section 01 · Connect ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / CONNECT</Eyebrow>
            <DisplayHeading size="lg">
              CONNECT BY <Red>SSH.</Red>
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
              Join the car's Wi-Fi from your laptop, the network named{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>neoracer-[Car ID]</code>{' '}
              with the password <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.
              Car ID is the number on your unit, so Car 1 broadcasts{' '}
              <code style={{ fontFamily: NB.monoFont }}>neoracer-1</code> and answers at{' '}
              <code style={{ fontFamily: NB.monoFont }}>192.168.1.101</code>. Then{' '}
              <InfoNote term="SSH" title="SSH">SSH (Secure Shell) is a way to log into another computer over the network and run commands in its terminal. Here it gives you a shell on the car.</InfoNote>{' '}
              in as <code style={{ fontFamily: NB.monoFont }}>racecar</code>:
            </p>

            <Code lang="bash">{`# After joining the car's Wi-Fi (neoracer-[Car ID]).
ssh racecar@neoracer            # by hostname
ssh racecar@192.168.1.101       # or the static IP (Car 1)
# password: neobotics`}</Code>

            <div style={{ marginTop: 20 }}>
              <DataTable
                columns={[
                  { key: 'car', label: 'Car ID', mono: true, accent: true },
                  { key: 'ssid', label: 'Wi-Fi (SSID)', mono: true },
                  { key: 'ip', label: 'Static IP', mono: true },
                ]}
                rows={[
                  { car: '1', ssid: 'neoracer-1', ip: '192.168.1.101' },
                  { car: '2', ssid: 'neoracer-2', ip: '192.168.1.102' },
                  { car: 'N', ssid: 'neoracer-[N]', ip: '192.168.1.[100 + N]' },
                ]}
              />
            </div>

            <DashList
              items={[
                <>
                  The address is <strong>static and deterministic</strong>, so there
                  is no IP to hunt for and no DNS to configure. Car{' '}
                  <code style={{ fontFamily: NB.monoFont }}>N</code> is always at{' '}
                  <code style={{ fontFamily: NB.monoFont }}>192.168.1.{'{'}100 + N{'}'}</code>.
                </>,
                <>
                  Because the car runs its own network, this works the same on any
                  Wi-Fi-hostile venue. Nothing depends on the room's router.
                </>,
                <>
                  The username is <code style={{ fontFamily: NB.monoFont }}>racecar</code>,
                  the hostname is <code style={{ fontFamily: NB.monoFont }}>neoracer</code>,
                  and the password can be changed per unit.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Headless ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / HEADLESS, NO SSH</Eyebrow>
            <DisplayHeading size="lg">
              HEADLESS IN A <Red>BROWSER.</Red>
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
              JupyterLab runs on the car as an auto-start service, so once you're
              on its Wi-Fi you can open a notebook from any browser with no
              terminal at all. It lives on port{' '}
              <code style={{ fontFamily: NB.monoFont }}>8888</code> at the same static
              address.
            </p>
            <Code lang="bash">{`# In a browser on the car's Wi-Fi, for Car 1:
http://192.168.1.101:8888`}</Code>
            <Callout type="note" title="The driver is not auto-started, Jupyter is">
              JupyterLab is the one thing the car brings up on boot. The ROS 2
              driver itself you start with{' '}
              <code style={{ fontFamily: NB.monoFont }}>teleop</code> once it is{' '}
              <Link href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>installed</Link>.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 03 · ROS 2 over the link ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / ROS 2 ACROSS THE LINK</Eyebrow>
            <DisplayHeading size="lg">
              ROS 2 <Red>DISCOVERY.</Red>
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
              Once your laptop is on the car's Wi-Fi, you share the{' '}
              <code style={{ fontFamily: NB.monoFont }}>192.168.1.x</code>{' '}
              <InfoNote term="subnet" title="Subnet">A subnet is a group of devices whose IP addresses share the same prefix, so they can talk to each other directly. Joining the car's Wi-Fi puts your laptop on the same 192.168.1.x range as the car.</InfoNote>, and
              ROS 2 uses{' '}
              <InfoNote term="DDS discovery" title="DDS Discovery">DDS is the messaging system underneath ROS 2. Its discovery step lets nodes on the same network find each other on their own, with no central server to register with.</InfoNote>{' '}
              to find the car nodes automatically. You can
              list the car's topics and run nodes on the laptop that talk to{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/scan</code>,{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/drive</code>,
              and the rest, with no master process in between (the driver has to be
              running on the car first, with{' '}
              <code style={{ fontFamily: NB.monoFont }}>teleop</code>).
            </p>

            <Code lang="bash">{`# From your laptop, on the car's Wi-Fi.
ros2 topic list                  # /scan /drive /imu /odom /camera /joy
ros2 topic echo /scan --once     # a single scan, straight off the car`}</Code>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 18,
                marginTop: 20,
              }}
            >
              <NumberedFeatureCard
                n={1}
                title="Same subnet"
                lede="You get this by joining the car's Wi-Fi."
                body="DDS discovery reaches the car nodes when both sides are on the same subnet. Joining neoracer-[Car ID] puts you on 192.168.1.x with the car, so the graph comes together on its own."
                codeChip="ros2 topic list"
              />
              <NumberedFeatureCard
                n={2}
                title="Same ROS_DOMAIN_ID"
                lede="Matched on both ends."
                body="ROS 2 only joins peers that share the same ROS_DOMAIN_ID. Set the same value on the laptop and the car, and the two halves of the graph see each other."
                codeChip="export ROS_DOMAIN_ID=..."
              />
            </div>

            <Callout type="note" title="When ros2 topic list comes up empty">
              An empty list almost always means the two sides aren't on the same
              graph yet. Confirm the laptop is actually on the car's Wi-Fi (not a
              second network), confirm the driver is running on the car with{' '}
              <code style={{ fontFamily: NB.monoFont }}>teleop</code>, and confirm the{' '}
              <code style={{ fontFamily: NB.monoFont }}>ROS_DOMAIN_ID</code> matches on
              both ends.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · Quick reference ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / NETWORKING AT A GLANCE</Eyebrow>
            <DisplayHeading size="lg">
              QUICK <Red>REFERENCE.</Red>
            </DisplayHeading>
            <div style={{ marginTop: 20 }}>
              <DataTable
                columns={[
                  { key: 'path', label: 'Task', accent: true },
                  { key: 'how', label: 'How' },
                  { key: 'needs', label: 'What it needs', mono: true },
                ]}
                rows={[
                  { path: 'Get on the car', how: "Join the car's own Wi-Fi access point.", needs: 'SSID neoracer-[Car ID]' },
                  { path: 'SSH in', how: 'Connect as racecar at the hostname or static IP.', needs: 'racecar@192.168.1.10X' },
                  { path: 'Headless', how: 'Open the auto-started JupyterLab in a browser.', needs: ':8888' },
                  { path: 'See the car nodes', how: 'ROS 2 DDS discovery over the shared subnet.', needs: 'same subnet + ROS_DOMAIN_ID' },
                ]}
              />
            </div>

            <Callout type="note" title="Reconfiguring the network from scratch">
              On a freshly imaged card, the driver's setup script lays the
              networking down for you. Run{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar setup networking</code>{' '}
              and it brings up the access point ({' '}
              <code style={{ fontFamily: NB.monoFont }}>neoracer-1</code> on{' '}
              <code style={{ fontFamily: NB.monoFont }}>10.42.0.1/24</code>, channel 6),
              the static Ethernet on{' '}
              <code style={{ fontFamily: NB.monoFont }}>192.168.1.101/24</code> with
              DHCP, and the Lakibeam lidar subnet on{' '}
              <code style={{ fontFamily: NB.monoFont }}>192.168.8.1/24</code> (the
              sensor itself sits at{' '}
              <code style={{ fontFamily: NB.monoFont }}>192.168.8.2</code>). It
              reconfigures Wi-Fi, run it from a wired session or the console.
            </Callout>
            <Callout type="tip" title="Can't reach the car?">
              If the Wi-Fi won't connect or the address won't answer, the{' '}
              <a href="/docs/troubleshooting/wifi-cant-connect" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                Wi-Fi can&apos;t connect
              </a>{' '}
              page walks the rest of the path. The web dashboard at{' '}
              <code style={{ fontFamily: NB.monoFont }}>http://neoracer.local:8080</code>{' '}
              also reports per-node liveness, topic rates, and Jetson temperature
              when the driver is up. You can reach a person at{' '}
              <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                support@neobotics.org
              </a>
              .
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 driver', href: '/docs/software/ros2-driver' }}
        next={{ label: 'Telemetry & logs', href: '/docs/software/telemetry-and-logs' }}
      />
    </DocsShell>
  );
}
