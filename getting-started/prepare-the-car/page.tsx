import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  DashList,
  ChromeBadge,
  ClockGlyph,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, PhotoSteps } from '@/components/docs/Interactive';
import { SetupTimeline } from '@/components/docs/SetupTimeline';
import { Crumbs, Callout, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Prepare the car · Setup · NeoRacer Docs',
  description:
    'Get the car physically ready: fit the router, attach the Wi-Fi antennas, connect the Jetson peripherals, fit the battery and sidepods, plug in a monitor and keyboard, and get the car onto the internet. Then install the driver.',
};

export default function PrepareTheCarPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Prepare the car' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              PREPARE THE <Red>CAR</Red>
            </DisplayHeading>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}>~30 minutes</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* You'll need */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <MonoLabel>You'll need</MonoLabel>
          <DashList
            items={[
              <>The NeoRacer and its accessories.</>,
              <>The Cudy router.</>,
              <>A LiPo battery.</>,
              <>A USB keyboard and mouse.</>,
              <>A monitor with an HDMI cable.</>,
              <>An internet connection.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── The setup, as a timeline of collapsible sections ─────────── */}
      <ScrollReveal>
        <SetupTimeline
          items={[
            {
              title: <>FIT THE CUDY <Red>ROUTER</Red></>,
              content: (
                <>
                  <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
                    The Cudy router sits inside the mid chassis, under the top plate.
                    Steps with a camera icon have a reference picture.
                  </p>
                  <PhotoSteps
                    items={[
                      { text: <>Before installing the router, note the longer USB-C cable coming out of the left side of the car. It connects to the LiDAR, not the router.</> },
                      {
                        text: <>Unscrew the front two screws of the top chassis.</>,
                        photos: [
                          { src: '/images/chassis-screw-fl.jpeg', alt: 'The front-left top chassis screw' },
                          { src: '/images/chassis-screw-fr.jpeg', alt: 'The front-right top chassis screw' },
                        ],
                      },
                      {
                        text: <>Unscrew the dot matrix to access the rear top-chassis screws.</>,
                        photos: [{ src: '/images/dot-matrix-screws.jpeg', alt: 'The dot matrix screws' }],
                      },
                      {
                        text: <>Unscrew the rear two screws.</>,
                        photos: [{ src: '/images/chassis-screws-blr.jpeg', alt: 'The rear two top chassis screws' }],
                      },
                      { text: <>The top chassis can now be removed, or rotated a little out of the way. Be careful with the cables.</> },
                      { text: <>Take the Cudy router on its own, without its cables, and slide it into the rear of the car under the top chassis, with its ports facing the front of the car.</> },
                      {
                        text: <>Connect the Ethernet cable and the short USB-C cable in the top chassis. The Ethernet cable plugs into the router&apos;s LAN port. Make sure you use the correct USB-C cable: the shorter one connects to the underside of the PCB, while the LiDAR&apos;s cable connects to the top side.</>,
                        photos: [{ src: '/images/router/chassis-cudy.jpeg', alt: 'The Cudy router in the chassis with the Ethernet and short USB-C cable connected' }],
                      },
                      { text: <>Fit the router snugly within the top chassis and screw the chassis back in.</> },
                    ]}
                  />
                </>
              ),
            },
            {
              title: <>ATTACH THE WI-FI <Red>ANTENNAS</Red></>,
              content: (
                <>
                  <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
                    The Jetson&apos;s Wi-Fi card sits on its underside, so the two
                    antenna cables are attached from below. Each antenna comes in two
                    parts: the cable, and the plastic antenna that screws onto its
                    end.
                  </p>
                  <PhotoSteps
                    items={[
                      { text: <>Power the car off before you unmount the Jetson.</> },
                      {
                        text: <>Unscrew the Jetson from its 3D-printed chassis mount to reach the Wi-Fi card underneath. It is held by four hex screws.</>,
                        photos: [{ src: '/images/compute/jetson-screws.jpeg', alt: 'The four hex screws holding the Jetson to its chassis mount' }],
                      },
                      {
                        text: <>Flip the Jetson over to find the two antenna sockets on the Wi-Fi card.</>,
                        photos: [{ src: '/images/compute/jetson-flipped.jpeg', alt: 'The flipped Jetson with the antenna sockets on the Wi-Fi card highlighted' }],
                      },
                      {
                        text: <>Keep the plastic antennas aside for now; they screw onto the cable ends later.</>,
                        photos: [{ src: '/images/compute/jetson-antenna.jpeg', alt: 'An antenna cable next to the plastic antenna that screws onto it' }],
                      },
                      {
                        text: <>Keep the Jetson on a steady surface and hold the U.FL connector perfectly vertical over its socket on the card. Remove any tension in the wire so the U.FL does not sit misaligned, then press the connector onto the socket until it clicks. It may take a few attempts, as the connector is very delicate.</>,
                        photos: [{ src: '/images/compute/jetson-antenna-attached.jpeg', alt: 'An antenna cable attached to the Wi-Fi card socket' }],
                      },
                      {
                        text: <>Screw the Jetson back onto its mount and route the cables through the chassis to the sides of the car. Make sure all four screw holes line up with the Jetson before screwing it back in.</>,
                        photos: [{ src: '/images/compute/jetson-antennas-hanging.jpeg', alt: 'The antenna cables routed through the chassis to the sides' }],
                      },
                      {
                        text: <>Screw the plastic antennas onto the cable ends on each side.</>,
                        photos: [{ src: '/images/compute/jetson-antennas-attached-car.jpeg', alt: 'A plastic antenna screwed onto the cable at the side of the car' }],
                      },
                      {
                        text: <>Zip-tie each antenna to the front of the top chassis, where the on/off switch is. Route the zip tie around the antenna with one side above it and one below. Do the same on the other side.</>,
                        photos: [
                          { src: '/images/antenna_left_placement.jpeg', alt: 'The left antenna zip-tied to the front of the top chassis by the on/off switch' },
                          { src: '/images/antenna_right_placement.jpeg', alt: 'The right antenna zip-tied to the front of the top chassis' },
                        ],
                      },
                    ]}
                  />
                  <Callout type="tip" title="Additional help to keep the connectors secure">
                    If needed, apply some hot glue or electrical tape over each
                    connector to keep it from disconnecting by accident.
                  </Callout>
                </>
              ),
            },
            {
              title: <>CONNECT THE JETSON <Red>PERIPHERALS</Red></>,
              content: (
                <PhotoSteps
                  items={[
                    {
                      text: <>Find the two cables on the right side of the car: one USB-A and one DC barrel jack.</>,
                      photos: [{ src: '/images/compute/jetson-cables-unplugged.jpg', alt: 'The USB-A and DC barrel jack cables on the right side of the car' }],
                    },
                    {
                      text: <>Plug both cables into the Jetson.</>,
                      photos: [{ src: '/images/compute/jetson-cables-plugged.jpg', alt: 'The USB-A and DC barrel jack cables plugged into the Jetson' }],
                    },
                    {
                      text: <>Make sure the camera is plugged into the Jetson. The camera uses a JST connector and connects over USB-A.</>,
                      photos: [
                        { src: '/images/camera-plugged.jpg', alt: 'The JST connector plugged into the back of the camera' },
                        { src: '/images/compute/jetson-camera-plugged.jpg', alt: "The camera's USB-A cable plugged into the Jetson" },
                      ],
                    },
                    {
                      text: <>Plug the longer USB-C cable into the LiDAR.</>,
                      photos: [{ src: '/images/lidar-plugged.jpg', alt: 'The longer USB-C cable plugged into the base of the LiDAR' }],
                    },
                  ]}
                />
              ),
            },
            {
              title: <>FIT THE BATTERY AND <Red>SIDEPODS</Red></>,
              content: (
                <PhotoSteps
                  items={[
                    { text: <>Make sure the car power switch is off.</> },
                    {
                      text: <>Place the battery on the left side of the car. Connect the XT60 cable to the car and tuck the balance lead inside the chassis.</>,
                      photos: [{ src: '/images/battery_placement.jpeg', alt: 'The battery in its tray on the left side of the car, with the XT60 connector and power switch highlighted' }],
                    },
                    {
                      text: <>Screw the sidepods onto the car using the screws from the screws bag.</>,
                      photos: [{ src: '/images/sidepod_placement.jpeg', alt: 'A sidepod screwed onto the side of the car' }],
                    },
                  ]}
                />
              ),
            },
            {
              title: <>PLUG IN A MONITOR AND <Red>KEYBOARD</Red></>,
              content: (
                <>
                  <DashList
                    items={[
                      <>Remove the HDMI plug already on the car and keep it somewhere safe. Whenever a monitor is not connected, it needs to be plugged back in.</>,
                      <>Connect a monitor to the Jetson&apos;s HDMI output.</>,
                      <>Connect a USB keyboard and mouse.</>,
                      <>Power the car on and log in as{' '}
                        <code style={{ fontFamily: NB.monoFont }}>racecar</code> (password{' '}
                        <code style={{ fontFamily: NB.monoFont }}>neobotics</code>).</>,
                    ]}
                  />
                  <Callout type="note" title="Why this setup happens on the car">
                    A brand new car is not on any network yet, so there is no way to
                    log in remotely. The first setup is done with a monitor and
                    keyboard plugged directly into the car.
                  </Callout>
                </>
              ),
            },
            {
              title: <>CONNECT TO THE <Red>INTERNET</Red></>,
              content: (
                <>
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
                    in a terminal. Replies mean you are online. Press{' '}
                    <code style={{ fontFamily: NB.monoFont }}>ctrl+c</code> to exit
                    back to the terminal.
                  </Callout>
                </>
              ),
            },
          ]}
        />
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Charge & power', href: '/docs/getting-started/charge-and-power' }}
        next={{ label: 'Install the driver', href: '/docs/getting-started/install-driver' }}
      />
    </DocsShell>
  );
}
