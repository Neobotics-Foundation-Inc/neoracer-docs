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
  MonoLabel,
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import {
  ImageStackDiagram,
  FlashStripDiagram,
  NetworkDiscoveryDiagram,
} from '@/components/docs/Diagrams';
import {
  ScrollReveal,
  MouseFollowGlow,
  AnimatedNumeral,
  InfoNote,
} from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'OS & image · Software · NeoRacer Docs',
  description:
    'NeoRacer ships with a pre-flashed Ubuntu + ROS 2 Humble image, so it boots ready to log in and write code. Here is what is on it and how to flash a new card from scratch.',
};

export default function OsAndImagePage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Software', href: '/docs/software/os-and-image' },
          { label: 'OS & image' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="OS" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SOFTWARE / OS & IMAGE</Eyebrow>
            <DisplayHeading size="xl">
              THE PRE-FLASHED <Red>IMAGE.</Red>
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
              Every NeoRacer ships with an SD card that boots straight to a tuned
              Ubuntu 22.04, ROS 2 Humble, and JupyterLab running as a{' '}
              <InfoNote term="systemd service" title="systemd service">
                A background program that Linux starts and supervises automatically. Running JupyterLab this way means it comes up on its own at boot and restarts if it crashes.
              </InfoNote>. So you can power on, SSH in, install the{' '}
              <a href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}>
                neoracer_ros2_driver
              </a>, and start writing code on the same day it arrives.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Pre-flashed at the factory</ChromeBadge>
              <ChromeBadge variant="outline">Ubuntu 22.04 LTS</ChromeBadge>
              <ChromeBadge variant="outline">ROS 2 Humble</ChromeBadge>
              <ChromeBadge variant="outline">Jetson Orin Nano</ChromeBadge>
              <ChromeBadge variant="outline">
                <AnimatedNumeral value={30} prefix="~" suffix=" s cold boot" />
              </ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A · Image stack ───────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / WHAT'S ON THE IMAGE"
          caption="Bottom to top. Everything below your code is read-only by default. Your scripts live in /home/racecar/scripts."
        >
          <ImageStackDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section 01 · What's running ────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>01 / WHAT'S RUNNING AT BOOT</Eyebrow>
          <DisplayHeading size="lg">
            WHAT RUNS AT <Red>BOOT.</Red>
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
            The only thing that auto-starts at boot is JupyterLab. The robot
            stack is not a systemd service: once you have installed the{' '}
            <a href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}>
              neoracer_ros2_driver
            </a>, you bring every{' '}
            <InfoNote term="topic" title="ROS 2 topic">
              A named channel that ROS 2 nodes use to pass messages, such as sensor readings or drive commands. One node publishes to a topic and any number of others subscribe to read it.
            </InfoNote>{' '}on the{' '}
            <a href="/docs/software/ros2-driver" style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}>
              ROS 2 driver
            </a>{' '}
            page up by running <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>teleop</code> yourself.
          </p>

          <div
            style={{
              marginTop: 24,
              background: NB.tarmacBlue,
              color: NB.haloWhite,
              borderRadius: 12,
              padding: '22px 24px',
              fontFamily: NB.monoFont,
              fontSize: 13.5,
              lineHeight: 1.85,
              boxShadow: NB.shadowCard,
            }}
          >
            <div style={{ color: NB.neoboticsRed, fontWeight: 700, marginBottom: 10 }}>
              // systemctl is-active jupyterlab
            </div>
            jupyterlab.service
            <span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;# headless JupyterLab on :8888, auto-start</span>
            <br />
            <br />
            <div style={{ color: NB.neoboticsRed, fontWeight: 700, marginBottom: 10 }}>
              // then bring up the robot yourself
            </div>
            ros2 launch neoracer_ros2_driver teleop.launch.py
            <span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;# aliased as: teleop</span>
            <br />
            <span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;# starts controller_node, joy_node, camera_node, LiDAR</span>
          </div>

          <DashList
            items={[
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>teleop</code> starts the
                ESP32 <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>controller_node</code> (publishes /imu and /odom, drives motors from /drive),
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>joy_node</code>, <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>camera_node</code>, and the LakiBeam{' '}
                <InfoNote term="LiDAR" title="LiDAR">
                  A sensor that sweeps a laser around the car and measures how long each pulse takes to bounce back, giving a ring of distance readings it uses to map walls and obstacles.
                </InfoNote>.
              </>,
              <>
                JupyterLab logs route through <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>journalctl -u jupyterlab -f</code>
                , so there's no separate log directory to keep track of.
              </>,
              <>
                The image is built reproducibly. <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/etc/neoracer-image-version</code>
                {' '}tells you exactly what shipped on your card.
              </>,
            ]}
          />
        </div>
        </section>
      </ScrollReveal>

      {/* ── FIG. B · Flash strip ────────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. B / RE-FLASH FROM SCRATCH"
          caption="A spare SD card and balenaEtcher. Five steps. The whole thing takes about 12 minutes on a fresh laptop."
        >
          <div style={{ paddingTop: 6 }}>
            <FlashStripDiagram />
          </div>
        </Fig>
      </ScrollReveal>

      {/* ── Section 02 · Flash it yourself ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>02 / FLASH A FRESH CARD</Eyebrow>
          <DisplayHeading size="lg">
            FLASH A FRESH <Red>CARD.</Red>
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
            You only need this if you broke something unrecoverable, or you
            want a clean classroom set. The car ships flashed.
          </p>

          <Callout type="note" title="Hardware you need">
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>A <strong>microSD card</strong>, 64 GB or larger, UHS-I U3 or better.</li>
              <li>A microSD reader on your laptop.</li>
              <li><a href="https://etcher.balena.io" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>balenaEtcher</a> installed (free, Mac / Windows / Linux).</li>
              <li>Roughly 12 minutes and a strong Wi-Fi connection to download the image.</li>
            </ul>
          </Callout>

          <Code lang="bash">{`# 1. Download the latest image (verify the SHA-256 against the release page).
curl -LO https://images.neobotics.org/neoracer/neoracer-os-latest.img.xz
sha256sum neoracer-os-latest.img.xz

# 2. Open balenaEtcher.
#    Flash from file → pick the .img.xz (Etcher will decompress on the fly).
#    Insert the microSD. Pick it as the target. Flash.

# 3. Eject the card, slide it into the Jetson SD slot under the chassis.
# 4. Plug the battery in, flip the master switch.
# 5. Wait ~30 s for first boot. The status LED ladder will turn solid red→green.`}</Code>
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 03 · First boot ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>03 / FIRST BOOT, THE DEFAULTS</Eyebrow>
          <DisplayHeading size="lg">
            FIRST-BOOT <Red>DEFAULTS.</Red>
          </DisplayHeading>

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
              title="Hostname"
              lede="neoracer"
              body={
                <>
                  The car has a static IP of 192.168.1.[100 + Car ID] on its
                  own network (Car 1 is 192.168.1.101). Reach it by hostname
                  or by that address.
                </>
              }
              codeChip="ssh racecar@neoracer"
            />
            <NumberedFeatureCard
              n={2}
              title="Default user"
              lede="racecar"
              body={
                <>
                  Password is <code style={{ fontFamily: NB.monoFont }}>neobotics</code>. If the car
                  will share a classroom space, it's worth setting a new one
                  on day one.
                </>
              }
              codeChip="passwd  # change me"
            />
            <NumberedFeatureCard
              n={3}
              title="Time + locale"
              lede="UTC, NTP synced"
              body={
                <>
                  NTP locks within the first 5 s of Wi-Fi association. ROS 2
                  timestamps line up with your laptop without any extra
                  config.
                </>
              }
              codeChip="timedatectl status"
            />
            <NumberedFeatureCard
              n={4}
              title="Wi-Fi access point"
              lede="neoracer_[Car ID]"
              body={
                <>
                  The car is its own access point. Join its network from your
                  laptop (Car 1 broadcasts neoracer_1), then SSH in or open
                  JupyterLab. See <a href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</a>.
                </>
              }
              codeChip="ssid: neoracer_1 · pw: neobotics"
            />
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* ── FIG. C · Network discovery ──────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. C / FINDING THE CAR ON THE NETWORK"
          caption="The car is its own Wi-Fi access point. Join neoracer_[Car ID] (password neobotics), then reach it at its static IP 192.168.1.[100 + Car ID], hostname neoracer. Car 1 is 192.168.1.101."
        >
          <NetworkDiscoveryDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section 04 · SSH cheat sheet ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>04 / SSH IN, VERIFY EVERYTHING</Eyebrow>
          <DisplayHeading size="lg">
            SSH IN AND <Red>VERIFY.</Red>
          </DisplayHeading>

          <Code lang="bash">{`# 1. Confirm you're in (after joining the car's neoracer_[Car ID] network).
ssh racecar@neoracer                     # or: ssh racecar@192.168.1.101
# racecar@neoracer:~$

# 2. JupyterLab service is healthy?
systemctl is-active jupyterlab           # active

# 3. ROS 2 graph is up? (run "teleop" first)
ros2 topic list                          # /camera /scan /imu /odom /joy /drive

# 4. Try a single LiDAR scan.
ros2 topic echo /scan --once | head -20`}</Code>

          <Callout type="tip" title="Pin a known good image">
            On classroom carts, a nice habit is to mark the image version (<code style={{ fontFamily: NB.monoFont }}>cat /etc/neoracer-image-version</code>) on the chassis with a paint pen.
            Then if a car starts acting up two weeks into the semester, you already know which build to compare against.
          </Callout>
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 05 · Recovery ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>05 / WHEN IT WON'T BOOT</Eyebrow>
          <DisplayHeading size="lg">
            RECOVERY AND <Red>RE-FLASH.</Red>
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
            Recovery here is just three steps: pull the SD card, re-flash it
            with balenaEtcher, and slide it back. There's no Recovery Mode UI to
            learn. Your calibration files live on the MCU (microcontroller unit)'s flash, not on the SD
            card, so the car is ready to drive the moment it boots.
          </p>

          <DashList
            items={[
              <>
                <strong>Boot loops</strong> usually point at a corrupt SD card,
                so a re-flash is the first thing to try, and it clears them up far
                more often than a Jetson fault does.
              </>,
              <>
                <strong>AP not coming up after re-flash?</strong> Connect
                an ethernet cable, SSH via <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar@neoracer</code>, run{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>sudo nmtui</code> to rebuild the access point.
              </>,
              <>
                <strong>Lost the password?</strong> A re-flash is the way back
                in. The password lives in shadow on the SD card, so a fresh image
                gives you the default again.
              </>,
              <>
                <strong>Calibration gone?</strong> It's not. The motor trim
                and servo center live on the MCU. Re-flashing the SD does
                not touch them. See <a href="/docs/calibration/motor-trim" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Motor trim</a>.
              </>,
            ]}
          />
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Shut down cleanly">
        Cutting power while the SD card is mid-write can corrupt the rootfs,
        so it's worth getting into the habit of shutting down cleanly at the
        end of a session. Either run{' '}
        <code style={{ fontFamily: NB.monoFont, fontWeight: 700 }}>sudo shutdown now</code>
        {' '}from an SSH session, or long-press the chassis power button for
        about 3 seconds and watch the status LED ladder fade to off. Once the
        green LED is dark, the master switch is safe to flip.
      </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'First program', href: '/docs/getting-started/first-program' }}
        next={{ label: 'racecar-neo-library', href: '/docs/software/racecar-neo-library' }}
      />
    </DocsShell>
  );
}
