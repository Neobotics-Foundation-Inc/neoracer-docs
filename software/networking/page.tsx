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
  NumberedFeatureCard,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Networking · Software · NeoRacer Docs',
  description:
    "Two ways onto the car: the cudy router (car at 192.168.10.100) or the car's own access point (10.42.0.1). SSH or RustDesk in as racecar, the services are already running, and ROS 2 DDS discovery works across either network.",
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
              THE CAR'S <Red>NETWORK.</Red>
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
              There are two ways to reach the car, and both end with it at a
              fixed address. The cudy router travels with the car and can share
              internet, which suits a classroom or several cars at once. The
              car&apos;s own access point needs no extra hardware at all. Pick
              either; the rest of this page works the same on both.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">cudy · 192.168.10.100</ChromeBadge>
              <ChromeBadge variant="red">access point · 10.42.0.1</ChromeBadge>
              <ChromeBadge variant="outline">user racecar</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="First time on a fresh car?">
          A brand new car has not been put on a network yet. That one-time setup
          happens at the car with a monitor and keyboard, and it is covered by{' '}
          <Link href="/docs/getting-started/connect-to-car" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            Get on the car
          </Link>{' '}
          and the end of{' '}
          <Link href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            Install the driver
          </Link>. This page is the reference for every day after that.
        </Callout>
      </ScrollReveal>

      {/* ── Section 01 · The two networks ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / TWO WAYS ON</Eyebrow>
            <DisplayHeading size="lg">
              PICK YOUR <Red>NETWORK.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              With the cudy router, the car plugs into the router and both join
              its Wi-Fi; the router can also uplink to the internet. With the
              access point, the Jetson broadcasts its own Wi-Fi and your laptop
              joins the car directly.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'k', label: '', accent: true },
                  { key: 'cudy', label: 'Cudy router', mono: true },
                  { key: 'ap', label: 'Access point', mono: true },
                ]}
                rows={[
                  { k: 'Wi-Fi to join', cudy: 'neoracer-[ID] (+ -5G twin)', ap: 'neoracer-1' },
                  { k: 'Wi-Fi password', cudy: 'neobotics', ap: 'neobotics' },
                  { k: 'The car', cudy: '192.168.10.100', ap: '10.42.0.1' },
                  { k: 'Gateway', cudy: '192.168.10.1 (router)', ap: '10.42.0.1 (the car)' },
                  { k: 'Internet', cudy: 'via the router uplink', ap: 'none' },
                  { k: 'Extra hardware', cudy: 'the included cudy router', ap: 'none' },
                ]}
              />
            </div>
            <Callout type="tip" title="Which one when">
              Classroom, several cars, or the car needs internet: cudy. One car
              and one laptop on a bench or a track: the access point. Switching
              is a matter of which Wi-Fi your laptop joins.
            </Callout>
            <Callout type="note" title="Putting the car itself online">
              The access point carries no internet, so for installs and updates
              the car borrows a network instead: join an existing Wi-Fi from the
              console desktop or plug Ethernet into the Jetson&apos;s RJ45,
              exactly as in{' '}
              <Link href="/docs/getting-started/connect-to-car" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                Get on the car
              </Link>, step 03. On the cudy, connecting the router&apos;s uplink
              does the same job without touching the car.
            </Callout>
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
              <MonoLabel>SSH</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                A terminal is all you need for most work.{' '}
                <InfoNote term="SSH" title="SSH">SSH (Secure Shell) logs you into another computer over the network and gives you its terminal. Here it puts you on the car.</InfoNote>{' '}
                in as <code style={{ fontFamily: NB.monoFont }}>racecar</code> at the
                address for your network:
              </p>
              <Code lang="bash">{`ssh racecar@192.168.10.100     # cudy router
ssh racecar@10.42.0.1          # access point
# password: neobotics`}</Code>
            </div>

            <div style={{ marginTop: 22 }}>
              <MonoLabel>Remote desktop (RustDesk)</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                For the full Jetson desktop, open{' '}
                <InfoNote term="RustDesk" title="RustDesk">A remote-desktop tool. It mirrors the Jetson's screen to your laptop over the network so you can use its desktop directly.</InfoNote>{' '}
                on your laptop and connect by the car&apos;s IP address (direct
                IP; the password is{' '}
                <code style={{ fontFamily: NB.monoFont }}>neobotics</code>).
              </p>
            </div>

            <div style={{ marginTop: 22 }}>
              <MonoLabel>Wired USB fallback</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                With no Wi-Fi at all, a USB-A to USB-C cable from your PC to the
                Jetson&apos;s Type-C port brings up a{' '}
                <InfoNote term="RNDIS" title="USB Ethernet (RNDIS)">A USB device can present itself as a virtual Ethernet adapter. The Jetson does this on its Type-C port, so a plain USB cable becomes a point-to-point network link.</InfoNote>{' '}
                point-to-point link, and the Jetson answers at a fixed address:
              </p>
              <Code lang="bash">{`ssh racecar@192.168.55.1       # over the USB cable
# password: neobotics`}</Code>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 03 · Already running ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / NO SSH REQUIRED</Eyebrow>
            <DisplayHeading size="lg">
              IN A <Red>BROWSER.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The car brings up its whole stack at boot: the driver, the
              watchdog, the health dashboard, and JupyterLab all run as{' '}
              <Link href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>services</Link>.
              Two of them are web pages, so a browser on the car&apos;s network
              is enough:
            </p>
            <Code lang="bash">{`http://192.168.10.100:8080     # health dashboard   (10.42.0.1 on the AP)
http://192.168.10.100:8888     # JupyterLab        (10.42.0.1 on the AP)`}</Code>
            <Callout type="note" title="Everything is already running">
              There is nothing to start after a boot. Check or restart the
              services from a terminal with{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar service status</code>{' '}
              and <code style={{ fontFamily: NB.monoFont }}>racecar service restart</code>;
              logs stream with{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar service logs</code>.
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
              Once your laptop is on the car&apos;s network, you share its{' '}
              <InfoNote term="subnet" title="Subnet">A group of devices whose IP addresses share the same prefix, so they can talk directly. Joining the car's Wi-Fi puts your laptop on the same range as the car.</InfoNote>{' '}
              (<code style={{ fontFamily: NB.monoFont }}>192.168.10.x</code> on the
              cudy, <code style={{ fontFamily: NB.monoFont }}>10.42.0.x</code> on
              the access point), and ROS 2 uses{' '}
              <InfoNote term="DDS discovery" title="DDS Discovery">DDS is the messaging system under ROS 2. Its discovery step lets nodes on the same network find each other on their own, with no central server.</InfoNote>{' '}
              to find the car&apos;s nodes automatically. You can list topics and
              run nodes on the laptop that talk to{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/scan</code>,{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/drive</code>,
              and the rest.
            </p>

            <Code lang="bash">{`# From your laptop, on the car's network.
ros2 topic list                  # /scan /camera /imu /odom /drive ...
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
                body="DDS discovery reaches the car nodes when both sides are on the same subnet. Joining the car's network, cudy or access point, puts you there."
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
              An empty list almost always means the two sides aren&apos;t on the
              same graph yet. Confirm the laptop is on the car&apos;s Wi-Fi (not a
              second network), confirm the services are up with{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar service status</code>,
              and confirm the{' '}
              <code style={{ fontFamily: NB.monoFont }}>ROS_DOMAIN_ID</code> matches
              on both ends.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 05 · Router admin (cudy path) ──────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>05 / THE CUDY ROUTER, IF YOU NEED IT</Eyebrow>
            <DisplayHeading size="lg">
              FIND IT, RENAME <Red>IT.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              On the cudy path, you rarely touch the router itself. You open it
              to find the car&apos;s address if it isn&apos;t at the default, or
              to rename the Wi-Fi. The admin page is at{' '}
              <code style={{ fontFamily: NB.monoFont }}>http://192.168.10.1</code>, and
              the admin password is{' '}
              <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginTop: 18 }}>
              <NumberedFeatureCard
                n={1}
                title="Find the car's IP"
                lede="System Status → Devices."
                body="The DHCP pool hands out addresses from 192.168.10.101, and the car holds the static 192.168.10.100 once the driver setup has run. If a device picked up a different address, the Devices list shows the wired client and its IP."
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
            <Callout type="note" title="Rebuilding the access point">
              The access point is configured on the car, not the router. To
              rebuild or rename it, run{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar setup networking</code>{' '}
              from a console session at the car; the command takes over the Wi-Fi
              radio, so a Wi-Fi SSH session drops the moment it runs.
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
                  { path: 'Get on the car (cudy)', how: "Join the router's Wi-Fi.", needs: 'neoracer-[ID] · 192.168.10.100' },
                  { path: 'Get on the car (AP)', how: "Join the car's own Wi-Fi.", needs: 'neoracer-1 · 10.42.0.1' },
                  { path: 'Terminal', how: 'SSH in as racecar.', needs: 'racecar@<car address>' },
                  { path: 'Full desktop', how: 'RustDesk by direct IP.', needs: '<car address>' },
                  { path: 'No Wi-Fi', how: 'Wired USB-C, RNDIS link.', needs: 'racecar@192.168.55.1' },
                  { path: 'Health dashboard', how: 'Browser, auto-started.', needs: ':8080' },
                  { path: 'Write code', how: 'JupyterLab, auto-started.', needs: ':8888' },
                  { path: 'See the car nodes', how: 'ROS 2 DDS discovery.', needs: 'same subnet + ROS_DOMAIN_ID' },
                ]}
              />
            </div>
            <Callout type="tip" title="Can't reach the car?">
              If the Wi-Fi won&apos;t connect or the address won&apos;t answer, the{' '}
              <a href="/docs/troubleshooting/wifi-cant-connect" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                Wi-Fi can&apos;t connect
              </a>{' '}
              page walks the rest of the path. You can reach a person at{' '}
              <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                support@neobotics.org
              </a>.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Workspaces', href: '/docs/software/workspaces' }}
        next={{ label: 'Firmware flashing', href: '/docs/software/firmware-flashing' }}
      />
    </DocsShell>
  );
}
