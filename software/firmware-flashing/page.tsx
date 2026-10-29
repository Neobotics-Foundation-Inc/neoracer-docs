import type { CSSProperties } from 'react';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  ClockGlyph,
  DashList,
  MonoLabel,
  NumberedSteps,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote, AnimatedNumeral, PhotoSteps } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  alternates: { canonical: 'https://neobotics.org/docs/software/firmware-flashing' },
  title: 'Firmware flashing · Software · NeoRacer Docs',
  description:
    'Update the OSCORE (ESP32-S3) controller firmware with OSR Updater: copy the firmware file and the updater to the car, stop teleop and the watchdog, and install the new app image through the running firmware.',
};

// The firmware image is hosted with the docs; the updater is OSRBOT's own release.
const FIRMWARE_FILE = 'NEORACER_V1.2_OSCORE_NEO_ESP32S3_IDF_Project_RevA_20260714.bin';
const FIRMWARE_URL = `/firmware/${FIRMWARE_FILE}`;
const UPDATER_RELEASES_URL = 'https://github.com/osrbot/osr_updater/releases';
const UPDATER_DEB_URL = 'https://github.com/osrbot/osr_updater/releases/download/v1.0.1/osr-updater_1.0.1_arm64.deb';

const mono: CSSProperties = { fontFamily: NB.monoFont };
const body: CSSProperties = {
  fontFamily: NB.bodyFont,
  fontSize: 16,
  lineHeight: 1.65,
  color: NB.textMutedBeige,
  maxWidth: 720,
};
const link: CSSProperties = { color: NB.neoboticsRed, fontWeight: 700 };
// the legal pages' download button, and the mono file-name caption under it
const btn: CSSProperties = {
  display: 'inline-block',
  background: NB.neoboticsRed,
  color: NB.haloWhite,
  fontFamily: NB.bodyFont,
  fontSize: 14,
  fontWeight: 700,
  padding: '11px 18px',
  borderRadius: 8,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
};
const fileCaption: CSSProperties = {
  fontFamily: NB.monoFont,
  fontSize: 11,
  color: NB.textMutedBeige,
  marginTop: 8,
};

export default function FirmwareFlashingPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/networking' },
          { label: 'Firmware flashing' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              UPDATING THE <Red>FIRMWARE</Red>
            </DisplayHeading>
            <p style={{ ...body, fontSize: 18, lineHeight: 1.55, maxWidth: 700 }}>
              The OSCORE controller is the ESP32-S3 board that drives the ESC,
              the steering servo and the sensors. It runs its own firmware, and
              you update that firmware on the car with OSR Updater, OSRBOT&apos;s
              tool for installing firmware on the OSCORE. This page covers an{' '}
              <InfoNote term="application update" title="Application update">
                An application update installs a new app image through the
                firmware that is already running, over the board&apos;s own
                serial link. The chip is never erased, so there are no buttons
                to press and nothing to take apart.
              </InfoNote>
              .
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}><AnimatedNumeral value={10} prefix="~" suffix=" minutes" /></ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* You'll need */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <MonoLabel>You&apos;ll need</MonoLabel>
          <DashList
            items={[
              <>The firmware file and the OSR Updater package. The next section covers both downloads.</>,
              <>A terminal on your computer, to copy the files to the car.</>,
              <>The car&apos;s desktop: a monitor or a{' '}
                <a href="/docs/software/remote-desktop" style={link}>remote desktop session</a>. OSR Updater is a
                graphical program and cannot run in a plain SSH session.</>,
              <>A charged battery. The update will not start on a low pack.</>,
            ]}
          />
          <Callout type="note" title="What the update keeps">
            The board keeps its settings: PID gains, steering trim, odometry
            scale, throttle deadband, and the IMU and battery calibration. If
            the transfer is interrupted, the board keeps booting the old
            firmware.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── download the binary and deb file ───────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              DOWNLOAD THE BINARY AND <Red>DEB</Red> FILE
            </DisplayHeading>
            <div style={{ maxWidth: 720 }}>
            <DashList
              items={[
                <>
                  The firmware binary is the application image that the updater
                  installs on the OSCORE controller.
                  <div style={{ margin: '12px 0 4px' }}>
                    <a href={FIRMWARE_URL} download style={btn}>Download the firmware</a>
                    <div style={fileCaption}>{FIRMWARE_FILE} · 379 KB</div>
                  </div>
                </>,
                <>
                  OSR Updater is OSRBOT&apos;s installer program, shipped as a
                  Debian package. On the newest release, under Assets, download
                  the <code style={mono}>arm64.deb</code> file; you do not need
                  the <code style={mono}>.sha256</code> file or the source code
                  archives.
                  <div style={{ margin: '12px 0 4px' }}>
                    <a href={UPDATER_RELEASES_URL} target="_blank" rel="noopener noreferrer" style={btn}>OSR Updater releases</a>
                    <div style={fileCaption}>osr-updater_1.0.1_arm64.deb · about 17 MB</div>
                  </div>
                  Or from a terminal on a Mac or Linux computer:
                  <Code lang="bash">{`curl -L -o osr-updater_1.0.1_arm64.deb ${UPDATER_DEB_URL}`}</Code>
                </>,
              ]}
            />
            </div>
            <Callout type="note" title="Newer releases">
              If a newer release is listed, use its{' '}
              <code style={mono}>arm64.deb</code> file and change the file name
              in the commands below to match. This page was written with v1.0.1
              as the latest.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── copy to the car ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              COPY THE FILES TO THE <Red>CAR</Red>
            </DisplayHeading>
            <div style={{ maxWidth: 720 }}>
            <PhotoSteps
              items={[
                {
                  text: <>
                    With your computer on the{' '}
                    <a href="/docs/software/networking" style={link}>same network as the car</a>,
                    make a folder on the car for firmware files. There are two
                    ways: run the command below over SSH, or create the folder
                    in the file manager over a{' '}
                    <a href="/docs/software/remote-desktop" style={link}>RustDesk session</a>.
                    <Code lang="bash">{`ssh racecar@<car-address> 'mkdir -p ~/osr-fw'`}</Code>
                  </>,
                },
                {
                  text: <>
                    Copy the updater package into it:
                    <Code lang="bash">{`scp <path-to>/osr-updater_1.0.1_arm64.deb racecar@<car-address>:~/osr-fw/`}</Code>
                  </>,
                },
                {
                  text: <>
                    Copy the firmware file into it:
                    <Code lang="bash">{`scp <path-to>/${FIRMWARE_FILE} racecar@<car-address>:~/osr-fw/`}</Code>
                  </>,
                },
                {
                  text: <>Replace <code style={mono}>&lt;path-to&gt;</code> with the
                    folder where you saved each file.</>,
                },
                {
                  text: <>Replace <code style={mono}>&lt;car-address&gt;</code> with
                    the IP address through which you are connecting to the car.
                    On a shared network use <code style={mono}>neoracer.local</code>.</>,
                },
                {
                  text: <>The password is the car&apos;s{' '}
                    <a href="/docs/reference/passwords" style={link}>login password</a>.</>,
                },
                {
                  text: <>The <code style={mono}>osr-fw</code> folder on the car now holds both files.</>,
                  photos: [
                    {
                      src: '/images/firmware/fw_update_osr-fw.png',
                      alt: 'The osr-fw folder on the car, holding the updater package and the firmware file',
                    },
                  ],
                },
              ]}
            />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── install the updater ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              INSTALL OSR <Red>UPDATER</Red>
            </DisplayHeading>
            <p style={body}>
              From here on, you no longer need the terminal on your computer.
              Open a terminal on the car:
            </p>
            <Code lang="bash">{`cd ~/osr-fw
sudo apt install ./osr-updater_1.0.1_arm64.deb`}</Code>
            <div style={{ maxWidth: 720 }}>
            <PhotoSteps
              items={[
                {
                  text: <>The install may print &quot;Permission denied&quot; in
                    the terminal. That message is harmless.</>,
                },
                {
                  text: <>The package installs <code style={mono}>/usr/bin/osr-updater</code>{' '}
                    and an &quot;OSR Updater&quot; entry in the application menu.</>,
                },
                {
                  text: <>To verify the install, open the app library and scroll
                    to the end. The OSR Updater app is there.</>,
                  photos: [
                    {
                      src: '/images/firmware/fw_update_app.png',
                      alt: 'The OSR Updater app at the end of the app library',
                    },
                  ],
                },
                {
                  text: <>This step is needed once per car. Skip it on a car
                    that already has it.</>,
                },
              ]}
            />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── stop the programs ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              STOP THE PROGRAMS THAT USE THE <Red>CONTROLLER</Red>
            </DisplayHeading>
            <p style={body}>In a terminal on the car:</p>
            <Code lang="bash">{`sudo systemctl stop neoracer-watchdog neoracer-teleop
systemctl list-units 'neoracer-*' --state=active --no-legend`}</Code>
            <div style={{ maxWidth: 720 }}>
            <PhotoSteps
              items={[
                {
                  text: <>The second command lists the neoracer services that are
                    still active. <code style={mono}>neoracer-watchdog</code> and{' '}
                    <code style={mono}>neoracer-teleop</code> must not be in the
                    list.</>,
                  photos: [
                    {
                      src: '/images/firmware/fw_update_services_stop.png',
                      alt: 'The active neoracer services after the stop: the watchdog and teleop are no longer listed',
                    },
                  ],
                },
                {
                  text: <>The dashboard, Jupyter, pursuit and V2V services can stay
                    running. They do not open the controller&apos;s serial port.</>,
                },
                {
                  text: <>If the services are still running, this error appears
                    when you connect.</>,
                  photos: [
                    {
                      src: '/images/firmware/fw_update_error1.png',
                      alt: 'The error shown when the services are still running: the selected serial port is in use by ROS or another program',
                    },
                  ],
                },
              ]}
            />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── run the update ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RUN THE <Red>UPDATE</Red>
            </DisplayHeading>
            <NumberedSteps
              steps={[
                {
                  title: 'Open OSR Updater',
                  detail: 'From the application menu, or run osr-updater in the terminal. The updater opens on its main screen.',
                  photos: [
                    {
                      src: '/images/firmware/fw_update_osr_update.png',
                      alt: 'OSR Updater’s main screen when it first opens',
                    },
                  ],
                },
                {
                  title: 'Choose the serial device',
                  detail: 'Under Controller, choose /dev/osrbot_base. Press Refresh if it is not listed.',
                  photos: [
                    {
                      src: '/images/firmware/fw_update_choose_serial.png',
                      alt: 'The Controller dropdown with /dev/osrbot_base selected',
                    },
                  ],
                },
                {
                  title: 'Press Inspect',
                  detail: 'With the services stopped, Inspect reads the board. The Firmware line shows the current version, and the Battery line shows the pack voltage.',
                  photos: [
                    {
                      src: '/images/firmware/fw_update_inspect.png',
                      alt: 'The Inspect result: the Firmware line shows the installed version and the Battery line shows the pack voltage',
                    },
                  ],
                },
                {
                  title: 'Select the firmware file',
                  detail: 'Press Select file. The picker opens in the racecar home folder, hidden files included, so you may have to scroll right to find osr-fw. Open it, choose the firmware file, and click Open. The panel on the right must show Type: application update. A damaged copy fails the file’s checksum check and will not install.',
                  photos: [
                    {
                      src: '/images/firmware/fw_update_select_file.png',
                      alt: 'The file picker in the racecar home folder, with the osr-fw folder off to the right',
                    },
                    {
                      src: '/images/firmware/fw_update_file_selected.png',
                      alt: 'The firmware file inside osr-fw, selected and ready to open',
                    },
                  ],
                },
                {
                  title: 'Press Install firmware and confirm',
                  detail: 'With the file loaded, the panel populates and Install firmware activates. Press it; a confirmation question appears. Press Yes and the install starts.',
                  photos: [
                    {
                      src: '/images/firmware/fw_update_install.png',
                      alt: 'The updater with the firmware file loaded and Install firmware ready to press',
                    },
                    {
                      src: '/images/firmware/fw_update_install_confirmation.png',
                      alt: 'The confirmation question that appears before the install starts',
                    },
                  ],
                },
                {
                  title: 'Wait for the final message',
                  detail: 'A green progress bar runs and the board reboots. When "Operation completed successfully" appears, press OK: the update is done, and the updater reconnects on the new version. The car also beeps three times when the update completes.',
                  photos: [
                    {
                      src: '/images/firmware/fw_update_install_complete.png',
                      alt: 'The progress bar complete and the success message after the install',
                    },
                  ],
                },
              ]}
            />
            <Callout type="danger" title="Keep power on">
              Do not unplug USB or power during the update.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── restart the services ───────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RESTART THE <Red>SERVICES</Red>
            </DisplayHeading>
            <Code lang="bash">{`sudo systemctl start neoracer-teleop neoracer-watchdog`}</Code>
            <p style={{ ...body, marginTop: 14 }}>Check that the sensors are back:</p>
            <Code lang="bash">{`ros2 topic hz /imu/fused`}</Code>
            <DashList
              items={[
                <>The rate should be about 200 Hz.</>,
                <>The web dashboard on port 8080 should show live data.</>,
                <>The teleop log may print one &quot;Unknown serial frame
                  tag&quot; warning at startup. That warning is harmless.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── troubleshooting ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>TROUBLESHOOTING</Red>
            </DisplayHeading>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'msg', label: 'Message', accent: true },
                  { key: 'fix', label: 'What to do' },
                ]}
                rows={[
                  {
                    msg: 'The selected serial port is in use by ROS or another program',
                    fix: 'Teleop or the watchdog is still running. Stop them again, then retry.',
                  },
                  {
                    msg: 'The firmware reports low battery voltage',
                    fix: 'Charge the pack. Do not update below 10.8 V.',
                  },
                  {
                    msg: 'The update stopped part way (power loss, cable pulled)',
                    fix: 'The board still boots the old firmware. Fix the cause, stop the services again, and rerun the update.',
                  },
                  {
                    msg: 'Inspect shows no firmware after a failed update',
                    fix: 'Power the car off and on, press Refresh, then Inspect. If it still shows nothing, contact OSRBOT.',
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext />
    </DocsShell>
  );
}
