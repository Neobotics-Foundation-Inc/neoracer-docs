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
import { ScrollReveal, MouseFollowGlow, InfoNote, PhotoSteps, Tabs } from '@/components/docs/Interactive';
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
                  { k: 'Setup', cudy: 'automatic', ap: 'requires the CLI' },
                  { k: 'Antennas', cudy: 'attached to the router', ap: 'externally placed' },
                ]}
              />
            </div>
            <Callout type="note" title="Access to Wi-Fi">
              For installs and updates, the Jetson needs access to the Wi-Fi.
              Therefore, we recommend connecting your device to the router and
              connecting the Jetson to internet. These are the same steps we
              follow in{' '}
              <Link href="/docs/getting-started/prepare-the-car" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                setup
              </Link>. Using the Jetson access point means the Jetson cannot
              connect to Wi-Fi directly.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Network setup ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              NETWORK <Red>SETUP</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Set up whichever network you picked. The access point is
              configured on the car itself; the cudy router is configured from
              a browser.
            </p>

            <Tabs
              ariaLabel="Network setup method"
              tabs={[
                {
                  label: 'Jetson Access Point',
                  content: (
                    <>
                      <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                        <code style={{ fontFamily: NB.monoFont }}>racecar setup networking</code>{' '}
                        configures the car&apos;s side of everything on this page:
                        the access point, the fixed Ethernet address, and the
                        lidar link. Run with no flags it applies the defaults.
                        Flags change a setting, and every flag value is saved to{' '}
                        <code style={{ fontFamily: NB.monoFont }}>~/.config/racecar/networking.env</code>{' '}
                        on the car, so the setting survives reboots and later runs.
                      </p>
                      <Code lang="bash">{`racecar setup networking --ssid=neoracer-2   # rename the access point
racecar setup networking --psk=mypassword    # change the AP password
racecar setup networking --show              # print the saved settings
racecar setup networking --reset             # back to the defaults`}</Code>
                      <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 14 }}>
                        Every flag is listed on the{' '}
                        <Link href="/docs/api-reference/cli" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>racecar CLI</Link>{' '}
                        page.
                      </p>
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
                    </>
                  ),
                },
                {
                  label: 'Cudy router',
                  content: (
                    <>
                      <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
                        The router is set up from its own admin page, in a
                        browser. Work through the wizard once and the car and
                        your laptop share a network from then on.
                      </p>
                      <PhotoSteps
                        items={[
                          { text: <>Make sure your device is already connected to the cudy router&apos;s Wi-Fi.</> },
                          { text: <>Open a browser and go to <code style={{ fontFamily: NB.monoFont }}>http://192.168.10.1</code>.</> },
                          { text: <>Sign in. The router administrator password is <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.</> },
                          {
                            text: <>The first screen is <strong>Operation Mode</strong>. Keep it at the default.</>,
                            photos: [{ src: '/images/cudy_setup_Oper_Mode.png', alt: 'The cudy Operation Mode screen, left at its default setting' }],
                          },
                          {
                            text: <>The second screen shows <strong>WAN mode</strong>. We recommend keeping <code style={{ fontFamily: NB.monoFont }}>neoracer</code> as the hostname. Ignore the error at the top and leave the protocol as it is.</>,
                            photos: [{ src: '/images/cudy_setup_WAN_Mode.png', alt: 'The cudy WAN mode screen with neoracer as the hostname' }],
                          },
                          {
                            text: <>The third screen lets you change the network name and password for both 2.4 GHz and 5 GHz. We recommend keeping the same network name, because it matches the name on the sticker under the car.</>,
                            photos: [{ src: '/images/cudy_setup_change_pass.png', alt: 'The cudy wireless screen, where the 2.4 GHz and 5 GHz network names and passwords are set' }],
                          },
                          {
                            text: (
                              <>
                                Then you get a summary. Click <strong>Save and apply</strong>.
                                You will normally be disconnected from the Wi-Fi at
                                this point: changing the SSID or password drops every
                                device, including yours. Once the router applies the
                                change, reconnect to the network before you expect to
                                reach the car again.
                              </>
                            ),
                            photos: [{ src: '/images/cudy_setup_summary.png', alt: 'The cudy summary screen with the Save and apply button' }],
                          },
                          {
                            text: <>Connect back to the Wi-Fi and you land on the router dashboard. This is where you can see exactly what is connected to the car&apos;s network. Click <strong>Clients</strong>.</>,
                            photos: [{ src: '/images/cudy_setup_dashboard.png', alt: 'The cudy router dashboard after reconnecting, with Clients in the menu' }],
                          },
                          {
                            text: <>Then click <strong>Devices</strong>.</>,
                            photos: [{ src: '/images/cudy_setup_devices.png', alt: 'The cudy Clients view with the Devices tab' }],
                          },
                          {
                            text: <>The Nvidia Jetson appears in that list, alongside any personal devices on the network.</>,
                            photos: [{ src: '/images/cudy_setup_view_jetson.png', alt: 'The cudy device list showing the Nvidia Jetson among the connected devices' }],
                          },
                        ]}
                      />
                    </>
                  ),
                },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Ways in ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WAYS TO <Red>CONNECT</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Once you have chosen your preferred network method, there are two
              main ways to connect to the car:
            </p>

            <div style={{ marginTop: 18 }}>
              <MonoLabel>SSH</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 0 }}>
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
                For the full Jetson desktop, connect by the IP address. Setup is
                done in{' '}
                <Link href="/docs/software/remote-desktop" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                  Remote desktop
                </Link>.
              </p>
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
              watchdog, the health dashboard, and JupyterLab all run as
              services.
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
            <Callout type="note" title="Rebuilding the access point">
              The access point is configured on the car, not the router. It is
              built and renamed with{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar setup networking</code>,
              covered under Network setup above.
            </Callout>
          </div>
        </section>
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
