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
  StepMarker,
} from '@/components/docs/Editorial';
import {
  ImageStackDiagram,
  FlashStripDiagram,
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
    'NeoRacer ships with a pre-flashed Ubuntu + ROS 2 Humble image, so it boots ready to log in and write code. Here is what is on it and how to re-flash from scratch.',
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
              Every NeoRacer ships with an image on its SSD that boots straight to JetPack 6.2.1,
              Ubuntu 22.04.5 LTS, Python 3.10.12, ROS 2 Humble, and JupyterLab
              running as a{' '}
              <InfoNote term="systemd service" title="systemd service">
                A background program that Linux starts and supervises automatically. Running JupyterLab this way means it comes up on its own at boot and restarts if it crashes.
              </InfoNote>. So you can power on, SSH in, install the{' '}
              <a href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}>
                neoracer_ros2_driver
              </a>, and start writing code on the same day it arrives.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Pre-flashed at the factory</ChromeBadge>
              <ChromeBadge variant="outline">JetPack 6.2.1</ChromeBadge>
              <ChromeBadge variant="outline">Ubuntu 22.04.5 LTS</ChromeBadge>
              <ChromeBadge variant="outline">ROS 2 Humble</ChromeBadge>
              <ChromeBadge variant="outline">Python 3.10.12</ChromeBadge>
              <ChromeBadge variant="outline">Jetson Orin Nano</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── FIG. A · Image stack ───────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / WHAT'S ON THE IMAGE"
          caption="Bottom to top. Everything below your code is read-only by default. Your code lives in /home/racecar/jupyter_ws."
        >
          <ImageStackDiagram />
        </Fig>
      </ScrollReveal>

      {/* ── Section 01 · What's running ────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <StepMarker n={1} label="WHAT'S RUNNING AT BOOT" />
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
            Four services auto-start at boot once the{' '}
            <a href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}>
              neoracer_ros2_driver
            </a>{' '}
            is installed: the robot stack itself
            (<code style={{ fontFamily: NB.monoFont }}>neoracer-teleop</code>),
            the watchdog that restarts failed nodes, the health dashboard on
            port <code style={{ fontFamily: NB.monoFont }}>8080</code>, and
            JupyterLab on port <code style={{ fontFamily: NB.monoFont }}>8888</code>.
            Every{' '}
            <InfoNote term="topic" title="ROS 2 topic">
              A named channel that ROS 2 nodes use to pass messages, such as sensor readings or drive commands. One node publishes to a topic and any number of others subscribe to read it.
            </InfoNote>{' '}on the{' '}
            <a href="/docs/software/ros2-driver" style={{ color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' }}>
              ROS 2 driver
            </a>{' '}
            page is live from power-on, with no terminal involved.
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
              // racecar service status
            </div>
            neoracer-teleop · neoracer-watchdog · neoracer-dashboard · neoracer-jupyter
            <span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;# all active, all enabled at boot</span>
            <br />
            <br />
            <div style={{ color: NB.neoboticsRed, fontWeight: 700, marginBottom: 10 }}>
              // for interactive debugging, the same stack in the foreground
            </div>
            racecar teleop
            <span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;# wraps: ros2 launch neoracer_ros2_driver teleop.launch.py (stop the service first)</span>
            <br />
            <span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;# brings up controller, gamepad_node, mux_node,</span>
            <br />
            <span style={{ color: NB.textDimBlue }}>&nbsp;&nbsp;# throttle_node, camera, led_matrix, lakibeam1</span>
          </div>

          <DashList
            items={[
              <>
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar teleop</code> brings up the full driver stack: the{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>controller</code> node owns the ESP32 serial link (publishes /imu, /odom, /joy and subscribes to /motor), plus{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>gamepad_node</code>, <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>mux_node</code>, <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>throttle_node</code>, <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>camera</code>, <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>led_matrix</code>, and the Lakibeam{' '}
                <InfoNote term="LiDAR" title="LiDAR">
                  A sensor that sweeps a laser around the car and measures how long each pulse takes to bounce back, giving a ring of distance readings it uses to map walls and obstacles.
                </InfoNote>.
              </>,
              <>
                The watchdog supervises every node and restarts a dead one. The web dashboard at{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>http://neoracer.local:8080</code>{' '}
                shows per-node liveness, topic rates, and Jetson temperature.
              </>,
              <>
                JupyterLab logs route through{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>journalctl -u neoracer-jupyter -f</code>, no separate log directory to track.
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
          caption="An x86 Linux host, the Jetson's USB-C recovery port, and five steps: base image, then driver setup on top."
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
          <StepMarker n={2} label="FLASH A FRESH CARD" />
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
            The car ships flashed. You&apos;ll only re-flash to bring one back
            to a known-good state, and it is a two-stage job: the base system
            image first, then the driver setup on top.
          </p>

          <Code lang="bash">{`# 1. Flash the base system. The car boots from its NVMe SSD, and the base
#    image is Seeed's reComputer J401 build of JetPack 6 (Ubuntu 22.04).
#    Follow Seeed's reComputer J401 flashing guide, which runs from a Linux
#    host over the Jetson's USB-C recovery port.

# 2. On first boot, follow Getting Started from the top:
#    console + internet, clone neoracer_ros2_driver, bash scripts/setup_all.sh
#    That installs ROS 2, the services, JupyterLab, and the student library.

# 3. racecar setup networking gives the fresh car its networks back.`}</Code>
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 03 · First boot ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <StepMarker n={3} label="FIRST BOOT, THE DEFAULTS" />
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
                  The car answers at{' '}
                  <code style={{ fontFamily: NB.monoFont }}>192.168.10.100</code> on
                  the cudy router, or{' '}
                  <code style={{ fontFamily: NB.monoFont }}>10.42.0.1</code> on its
                  own access point.
                </>
              }
              codeChip="ssh racecar@192.168.10.100"
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
              lede="neoracer-[Car ID]"
              body={
                <>
                  The car is its own access point. Join its network from your
                  laptop (Car 1 broadcasts neoracer-1), then SSH in or open
                  JupyterLab. See <a href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</a>.
                </>
              }
              codeChip="ssid: neoracer-1 · pw: neobotics"
            />
          </div>
        </div>
        </section>
      </ScrollReveal>

      {/* ── Section 04 · SSH cheat sheet ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={460} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <StepMarker n={4} label="SSH IN, VERIFY EVERYTHING" />
          <DisplayHeading size="lg">
            SSH IN AND <Red>VERIFY.</Red>
          </DisplayHeading>

          <Code lang="bash">{`# 1. Confirm you're in (after joining the car's neoracer-[Car ID] network).
ssh racecar@192.168.10.100               # or: 10.42.0.1 on the access point
# racecar@neoracer:~$

# 2. JupyterLab service is healthy?
racecar service status                   # all four active

# 3. ROS 2 graph is up? (run "teleop" first)
ros2 topic list                          # /camera /scan /imu /odom /battery /joy /drive

# 4. Try a single LiDAR scan.
ros2 topic echo /scan --once | head -20`}</Code>

          <Callout type="tip" title="Pin a known good image">
            On classroom carts, a nice habit is to mark the image version (<code style={{ fontFamily: NB.monoFont }}>cat /etc/nv_tegra_release</code>) on the chassis with a paint pen.
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
          <StepMarker n={5} label="WHEN IT WON'T BOOT" />
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
            Recovery is a re-flash of the NVMe over the Jetson&apos;s USB-C
            recovery port, the same two-stage flow as section 02: base image
            first, then the driver setup on top. Your calibration files live on
            the MCU (microcontroller unit)&apos;s flash, not on the SSD, so the
            car is ready to drive the moment it boots.
          </p>

          <DashList
            items={[
              <>
                <strong>Boot loops</strong> usually point at a corrupted image
                on the NVMe rather than a Jetson fault, so a re-flash is the
                first thing to try.
              </>,
              <>
                <strong>AP not coming up after re-flash?</strong> Connect
                an ethernet cable, SSH via <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar@neoracer</code>, run{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>racecar setup networking</code> to rebuild the access point.
              </>,
              <>
                <strong>Lost the password?</strong> A re-flash is the way back
                in. The password lives on the NVMe, so a fresh image gives you
                the default again.
              </>,
              <>
                <strong>Calibration gone?</strong> It's not. The motor trim
                and servo center live on the MCU. Re-flashing the NVMe does
                not touch them. See <a href="/docs/calibration/motor-trim" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Motor trim</a>.
              </>,
            ]}
          />
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Shut down cleanly">
        Cutting power while the SSD is mid-write can corrupt the rootfs,
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
