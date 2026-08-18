import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
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
          { label: 'Software', href: '/docs/software/networking' },
          { label: 'Networking' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              NETWORK<Red>ING</Red>
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
              There are two ways to access the car: the cudy router or the
              Nvidia Jetson&apos;s access point. Both methods have a fixed
              address.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Section 01 · The two networks ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              PICK YOUR <Red>NETWORK</Red>
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
                  { key: 'ap', label: 'Jetson Access Point', mono: true },
                ]}
                rows={[
                  {
                    k: '',
                    cudy: <HardwareShot src="/images/build/router-2.jpg" alt="The Cudy travel router included in the kit" />,
                    ap: <HardwareShot src="/images/build/jetson.jpg" alt="The Nvidia Jetson on the car, which broadcasts its own access point" />,
                  },
                  { k: 'Wi-Fi to join', cudy: 'neoracer-[ID] (+ -5G twin)', ap: 'neoracer-1 (default)' },
                  { k: 'Wi-Fi password', cudy: 'neobotics', ap: 'neobotics' },
                  { k: 'Network IP', cudy: '192.168.10.100', ap: '10.42.0.1' },
                  { k: 'Gateway', cudy: '192.168.10.1', ap: '10.42.0.1' },
                  { k: 'Extra hardware', cudy: 'the included cudy router', ap: 'none' },
                  { k: 'Setup', cudy: 'automatic once the router is plugged in', ap: 'requires the CLI' },
                  { k: 'Antennas', cudy: 'attached to the router', ap: 'externally placed' },
                ]}
              />
            </div>
            <Callout type="note" title="Putting the car itself online">
              For installs and updates, the Jetson needs access to the Wi-Fi.
              Therefore, we recommend connecting to the router and connecting
              the Jetson to internet. This is the same setup we work through in{' '}
              <Link href="/docs/getting-started/prepare-the-car" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                setup
              </Link>. Using the Jetson access point means the Jetson cannot
              connect to Wi-Fi directly.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Three ways in ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WAYS TO <Red>CONNECT</Red>
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
                For the full Jetson desktop, connect by the car&apos;s IP address.
                Setup and the password are on{' '}
                <Link href="/docs/software/remote-desktop" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                  Remote desktop
                </Link>.
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
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              IN A <Red>BROWSER</Red>
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
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              ROS 2 <Red>DISCOVERY</Red>
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
ros2 topic list                  # /scan /camera /imu /odom /battery /drive ...
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
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              ROUTER <Red>ADMIN</Red>
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
              The access point is configured on the car, not the router. It is
              built and renamed with{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar setup networking</code>,
              covered in the next section.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 06 · racecar setup networking ──────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              THE SETUP <Red>COMMAND</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>racecar setup networking</code>{' '}
              configures the car&apos;s side of everything on this page: the
              access point, the fixed Ethernet address, and the lidar link. Run
              with no flags it applies the defaults. Flags change a setting, and
              every flag value is saved to{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/.config/racecar/networking.env</code>{' '}
              on the car, so the setting survives reboots and later runs.
            </p>
            <Code lang="bash">{`racecar setup networking --ssid=neoracer-2   # rename the access point
racecar setup networking --psk=mypassword    # change the AP password
racecar setup networking --show              # print the saved settings
racecar setup networking --reset             # back to the defaults`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'flag', label: 'Flag', accent: true, mono: true },
                  { key: 'sets', label: 'Sets' },
                  { key: 'def', label: 'Default', mono: true },
                ]}
                rows={[
                  { flag: '--ssid', sets: 'Access point name', def: 'neoracer-1' },
                  { flag: '--psk', sets: 'Access point password', def: 'neobotics' },
                  { flag: '--channel', sets: 'Access point 2.4 GHz channel', def: '6' },
                  { flag: '--ap-addr', sets: "The car's address on the access point", def: '10.42.0.1/24' },
                  { flag: '--eth-static', sets: "The car's fixed address on the cudy", def: '192.168.10.100/24' },
                  { flag: '--lidar-host', sets: 'Host address on the lidar link', def: '192.168.8.1/24' },
                  { flag: '--wifi-iface', sets: 'Wi-Fi interface name', def: 'wlP1p1s0' },
                  { flag: '--eth-iface', sets: 'Ethernet interface name', def: 'nr_eth0' },
                ]}
              />
            </div>
            <Callout type="warn" title="Rename the access point before you power up a second car">
              Every car ships broadcasting{' '}
              <code style={{ fontFamily: NB.monoFont }}>neoracer-1</code>, so two
              cars on their access points in the same room show up as two
              networks with the same name and you cannot tell which is which.
              Rename each one the first time you use it,{' '}
              <code style={{ fontFamily: NB.monoFont }}>--ssid=neoracer-2</code>,{' '}
              <code style={{ fontFamily: NB.monoFont }}>--ssid=neoracer-3</code>,
              and so on. The name sticks. The cudy routers do not have this
              problem; each one is preconfigured with its own name.
            </Callout>
            <Callout type="warn" title="Run it from a wired session">
              The command takes over the Wi-Fi radio, so an SSH session over
              Wi-Fi drops the moment it runs. Use a monitor and keyboard at the
              car, the USB cable link, or SSH over the cudy&apos;s wired side.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Can't reach the car?">
          If the Wi-Fi won&apos;t connect or the address won&apos;t answer, you
          can reach a person at{' '}
          <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            support@neobotics.org
          </a>.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Chassis & CAD', href: '/docs/hardware/chassis-and-cad' }}
        next={{ label: 'Remote desktop', href: '/docs/software/remote-desktop' }}
      />
    </DocsShell>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * HardwareShot: the photo cell in the router-vs-access-point table. Fixed
 * aspect so the two sit level whatever the source images are, and object-fit
 * cover so neither is squashed. Lives here because nothing else needs it.
 * ─────────────────────────────────────────────────────────────────────── */
function HardwareShot({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{
        display: 'block',
        width: '100%',
        maxWidth: 260,
        aspectRatio: '4 / 3',
        objectFit: 'cover',
        borderRadius: 10,
        border: `1px solid ${NB.borderOnBeige}`,
      }}
    />
  );
}
