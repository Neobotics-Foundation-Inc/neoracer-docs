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
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Networking · Software · NeoRacer Docs',
  description:
    "The NeoRacer brings its own cudy router. Join neoracer-[ID], reach the Jetson at 192.168.10.100 as user racecar over RustDesk or SSH, and ROS 2 DDS discovery does the rest. A wired USB fallback at 192.168.55.1 always works.",
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
                maxWidth: 700,
              }}
            >
              The car carries its own router, a cudy TR1200, so it makes its own
              network wherever you are. Join the car&apos;s Wi-Fi from your laptop,
              and the Jetson sits at a fixed address every time. No home router, no
              hunting for an IP, and the same steps on a kitchen table or a locked
              down campus. If Wi-Fi is ever off the table, a wired USB cable always
              gets you in.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">SSID neoracer-[ID]</ChromeBadge>
              <ChromeBadge variant="outline">router 192.168.10.1</ChromeBadge>
              <ChromeBadge variant="outline">Jetson 192.168.10.100</ChromeBadge>
              <ChromeBadge variant="outline">user racecar</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section 01 · Join ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / JOIN THE CAR</Eyebrow>
            <DisplayHeading size="lg">
              ONE NETWORK, <Red>THE CAR'S.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Join the car&apos;s Wi-Fi from your laptop. The network is named for
              the router&apos;s ID, so it looks like{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>neoracer-DAEA</code>{' '}
              (there is a <code style={{ fontFamily: NB.monoFont }}>-5G</code> twin too),
              and the password is{' '}
              <code style={{ fontFamily: NB.monoFont }}>neobotics</code>. Once
              you&apos;re on it, the Jetson answers at{' '}
              <code style={{ fontFamily: NB.monoFont }}>192.168.10.100</code>.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'k', label: 'What', accent: true },
                  { key: 'v', label: 'Value', mono: true },
                ]}
                rows={[
                  { k: 'Wi-Fi (SSID)', v: 'neoracer-[ID] · neoracer-[ID]-5G' },
                  { k: 'Wi-Fi password', v: 'neobotics' },
                  { k: 'Router gateway', v: '192.168.10.1' },
                  { k: 'Jetson (host)', v: '192.168.10.100' },
                  { k: 'Login user', v: 'racecar' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Three ways in ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / GET A SESSION</Eyebrow>
            <DisplayHeading size="lg">
              THREE WAYS <Red>IN.</Red>
            </DisplayHeading>

            <div style={{ marginTop: 18 }}>
              <MonoLabel>Remote desktop (RustDesk)</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                The easiest way in if you want the full Jetson desktop. Open{' '}
                <InfoNote term="RustDesk" title="RustDesk">A remote-desktop tool. It mirrors the Jetson's screen to your laptop over the network so you can use its desktop directly.</InfoNote>{' '}
                on your laptop, enter the Jetson&apos;s IP, and you&apos;re on its
                desktop as <code style={{ fontFamily: NB.monoFont }}>racecar</code>.
              </p>
              <DashList
                items={[
                  <>Confirm your laptop and the car are on the same network (you joined its Wi-Fi).</>,
                  <>Open RustDesk and enter the Jetson&apos;s IP, e.g. <code style={{ fontFamily: NB.monoFont }}>192.168.10.100</code>.</>,
                  <>Enter the password <code style={{ fontFamily: NB.monoFont }}>neobotics</code>; the desktop user is <code style={{ fontFamily: NB.monoFont }}>racecar</code>.</>,
                ]}
              />
            </div>

            <div style={{ marginTop: 22 }}>
              <MonoLabel>SSH</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                A terminal is all you need for most work.{' '}
                <InfoNote term="SSH" title="SSH">SSH (Secure Shell) logs you into another computer over the network and gives you its terminal. Here it puts you on the car.</InfoNote>{' '}
                in as <code style={{ fontFamily: NB.monoFont }}>racecar</code>:
              </p>
              <Code lang="bash">{`ssh racecar@192.168.10.100      # on the car's Wi-Fi
# password: neobotics`}</Code>
            </div>

            <div style={{ marginTop: 22 }}>
              <MonoLabel>Wired USB, the always-works fallback</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                No router, no Wi-Fi, no problem. A USB-A to USB-C cable from your PC
                to the Jetson&apos;s Type-C port brings up a{' '}
                <InfoNote term="RNDIS" title="USB Ethernet (RNDIS)">A USB device can present itself as a virtual Ethernet adapter. The Jetson does this on its Type-C port, so a plain USB cable becomes a point-to-point network link.</InfoNote>{' '}
                wired link. A USB Ethernet device shows up in your PC&apos;s network
                settings, and the Jetson is reachable at a fixed address:
              </p>
              <Code lang="bash">{`ssh racecar@192.168.55.1        # over the USB cable
# password: neobotics`}</Code>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 03 · Headless ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / HEADLESS, NO SSH</Eyebrow>
            <DisplayHeading size="lg">
              HEADLESS IN A <Red>BROWSER.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              JupyterLab runs on the car as an auto-start service, so once
              you&apos;re on its Wi-Fi you can open a notebook from any browser with
              no terminal at all. It lives on port{' '}
              <code style={{ fontFamily: NB.monoFont }}>8888</code> at the Jetson&apos;s
              address.
            </p>
            <Code lang="bash">{`# In a browser on the car's Wi-Fi:
http://192.168.10.100:8888`}</Code>
            <Callout type="note" title="The driver is not auto-started, Jupyter is">
              JupyterLab is the one thing the car brings up on boot. The ROS 2
              driver itself you start with{' '}
              <code style={{ fontFamily: NB.monoFont }}>teleop</code> once it is{' '}
              <Link href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>installed</Link>.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · ROS 2 over the link ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / ROS 2 ACROSS THE LINK</Eyebrow>
            <DisplayHeading size="lg">
              ROS 2 <Red>DISCOVERY.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Once your laptop is on the car&apos;s Wi-Fi, you share the{' '}
              <code style={{ fontFamily: NB.monoFont }}>192.168.10.x</code>{' '}
              <InfoNote term="subnet" title="Subnet">A group of devices whose IP addresses share the same prefix, so they can talk directly. Joining the car's Wi-Fi puts your laptop on the same 192.168.10.x range as the car.</InfoNote>, and
              ROS 2 uses{' '}
              <InfoNote term="DDS discovery" title="DDS Discovery">DDS is the messaging system under ROS 2. Its discovery step lets nodes on the same network find each other on their own, with no central server.</InfoNote>{' '}
              to find the car nodes automatically. You can list the car&apos;s topics
              and run nodes on the laptop that talk to{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/scan</code>,{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/drive</code>,
              and the rest (the driver has to be running on the car first, with{' '}
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
                body="DDS discovery reaches the car nodes when both sides are on the same subnet. Joining neoracer-[ID] puts you on 192.168.10.x with the car, so the graph comes together on its own."
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
              An empty list almost always means the two sides aren&apos;t on the same
              graph yet. Confirm the laptop is actually on the car&apos;s Wi-Fi (not a
              second network), confirm the driver is running on the car with{' '}
              <code style={{ fontFamily: NB.monoFont }}>teleop</code>, and confirm the{' '}
              <code style={{ fontFamily: NB.monoFont }}>ROS_DOMAIN_ID</code> matches on
              both ends.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 05 · Router admin ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>05 / THE ROUTER, IF YOU NEED IT</Eyebrow>
            <DisplayHeading size="lg">
              FIND IT, RENAME <Red>IT.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Most of the time you never touch the router. You only open it to find
              the Jetson&apos;s address if it isn&apos;t at the default, or to rename
              the Wi-Fi. The admin page is at{' '}
              <code style={{ fontFamily: NB.monoFont }}>http://192.168.10.1</code>, and
              the admin password is{' '}
              <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginTop: 18 }}>
              <NumberedFeatureCard
                n={1}
                title="Find the Jetson's IP"
                lede="System Status → Devices."
                body="The DHCP pool hands out addresses from 192.168.10.101, and the Jetson defaults to 192.168.10.100. If a device picked up a different address, the Devices list shows the wired client and its IP."
              />
              <NumberedFeatureCard
                n={2}
                title="Rename the Wi-Fi"
                lede="Quick Setup → Wireless."
                body="Change the 2.4G and 5G SSID and password in the setup wizard's Wireless step. After you Save & Apply, re-join the renamed network from your laptop."
              />
            </div>
            <Callout type="warn" title="Re-join after you rename it">
              Changing the SSID or password drops every device, including you. Once
              the router applies the change, reconnect to the new network name
              before you expect to reach the car again.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 06 · Quick reference ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="06" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>06 / NETWORKING AT A GLANCE</Eyebrow>
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
                  { path: 'Get on the car', how: "Join the car's own Wi-Fi.", needs: 'neoracer-[ID] · neobotics' },
                  { path: 'Full desktop', how: 'RustDesk to the Jetson.', needs: '192.168.10.100' },
                  { path: 'Terminal', how: 'SSH in as racecar.', needs: 'racecar@192.168.10.100' },
                  { path: 'No Wi-Fi', how: 'Wired USB-C, RNDIS link.', needs: 'racecar@192.168.55.1' },
                  { path: 'Headless', how: 'Auto-started JupyterLab.', needs: ':8888' },
                  { path: 'See the car nodes', how: 'ROS 2 DDS discovery.', needs: 'same subnet + ROS_DOMAIN_ID' },
                ]}
              />
            </div>
            <Callout type="tip" title="Can't reach the car?">
              If the Wi-Fi won&apos;t connect or the address won&apos;t answer, the{' '}
              <a href="/docs/troubleshooting/wifi-cant-connect" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                Wi-Fi can&apos;t connect
              </a>{' '}
              page walks the rest of the path, and the wired USB link above always
              gets you in. You can reach a person at{' '}
              <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                support@neobotics.org
              </a>.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Navigation (Nav2)', href: '/docs/software/navigation' }}
        next={{ label: 'Telemetry & logs', href: '/docs/software/telemetry-and-logs' }}
      />
    </DocsShell>
  );
}
