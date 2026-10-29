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
  NumberedSteps,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote, AnimatedNumeral } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  alternates: { canonical: 'https://neobotics.org/docs/software/firmware-flashing' },
  title: 'Firmware flashing · Software · NeoRacer Docs',
  description:
    'Update the OSCORE (ESP32-S3) controller firmware with OSR Updater: copy the firmware file and the updater to the car, stop teleop and the watchdog, and install the new app image through the running firmware.',
};

// The firmware binaries and the command-line tools live in the public
// neoracer-pcb-firmware repo; the updater is OSRBOT's own release.
const FIRMWARE_URL = 'https://github.com/Neobotics-Foundation-Inc/neoracer-pcb-firmware/tree/main/firmware/binaries';
const TOOLS_URL = 'https://github.com/Neobotics-Foundation-Inc/neoracer-pcb-firmware/tree/main/firmware/tools';
const UPDATER_RELEASES_URL = 'https://github.com/osrbot/osr_updater/releases';
const UPDATER_DEB_URL = 'https://github.com/osrbot/osr_updater/releases/download/v1.0.1/osr-updater_1.0.1_arm64.deb';
const FIRMWARE_FILE = 'NEORACER_V1.2_OSCORE_NEO_ESP32S3_IDF_Project_RevA_20260714.bin';

const mono: CSSProperties = { fontFamily: NB.monoFont };
const body: CSSProperties = {
  fontFamily: NB.bodyFont,
  fontSize: 16,
  lineHeight: 1.65,
  color: NB.textMutedBeige,
  maxWidth: 720,
};
const link: CSSProperties = { color: NB.neoboticsRed, fontWeight: 700 };

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

      <ScrollReveal>
        <Callout type="note" title="What the update keeps">
          The board keeps its settings: PID gains, steering trim, odometry
          scale, throttle deadband, and the IMU and battery calibration. If
          the transfer is interrupted, the board keeps booting the old
          firmware.
        </Callout>
      </ScrollReveal>

      {/* ── what you need ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHAT YOU <Red>NEED</Red>
            </DisplayHeading>
            <DashList
              items={[
                <><strong>The firmware file.</strong> The commands below use{' '}
                  <code style={mono}>{FIRMWARE_FILE}</code> as the example.</>,
                <><strong>The OSR Updater package,</strong>{' '}
                  <code style={mono}>osr-updater_1.0.1_arm64.deb</code>.</>,
                <><strong>The car&apos;s desktop.</strong> A monitor, a{' '}
                  <a href="/docs/software/remote-desktop" style={link}>remote desktop session</a>, or{' '}
                  <code style={mono}>ssh -X</code> from a computer that runs an X
                  server (XQuartz on macOS). OSR Updater is a graphical program.
                  It cannot run in a plain SSH session.</>,
                <><strong>A charged battery.</strong> The firmware refuses the
                  update on a low pack. Keep it above 10.8 V.</>,
                <><strong>The car on a stand, or the transmitter off.</strong>{' '}
                  Motion is inhibited during the update. Keep the car still
                  anyway.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── get the files ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              GET THE <Red>FILES</Red>
            </DisplayHeading>
            <p style={body}>
              Download the firmware file from the{' '}
              <a href={FIRMWARE_URL} target="_blank" rel="noopener noreferrer" style={link}>firmware binaries</a>{' '}
              page. Then download the updater from the{' '}
              <a href={UPDATER_RELEASES_URL} target="_blank" rel="noopener noreferrer" style={link}>OSR Updater releases</a>{' '}
              page. The newest release is at the top. Under Assets, click the{' '}
              <code style={mono}>arm64.deb</code> file; it is about 17 MB. You do
              not need the <code style={mono}>.sha256</code> file or the source
              code archives. From a terminal on a Mac or Linux computer:
            </p>
            <Code lang="bash">{`curl -L -o osr-updater_1.0.1_arm64.deb ${UPDATER_DEB_URL}`}</Code>
            <Callout type="note" title="Newer releases">
              If a newer release is listed, use its{' '}
              <code style={mono}>arm64.deb</code> file and change the file name
              in the commands below to match.
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
            <p style={body}>
              With your computer on the{' '}
              <a href="/docs/software/networking" style={link}>same network as the car</a>,
              make a folder on the car for firmware files, then copy the updater
              package and the firmware file into it. Replace{' '}
              <code style={mono}>&lt;path-to&gt;</code> with the folder where you
              saved each file.
            </p>
            <Code lang="bash">{`ssh racecar@<car-address> 'mkdir -p ~/osr-fw'
scp <path-to>/osr-updater_1.0.1_arm64.deb racecar@<car-address>:~/osr-fw/
scp <path-to>/${FIRMWARE_FILE} racecar@<car-address>:~/osr-fw/`}</Code>
            <p style={{ ...body, marginTop: 14 }}>
              On the car&apos;s own hotspot the address is{' '}
              <code style={mono}>192.168.10.100</code>. On a shared network use{' '}
              <code style={mono}>neoracer.local</code>. The password is the
              car&apos;s{' '}
              <a href="/docs/reference/passwords" style={link}>login password</a>.
            </p>
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
            <p style={body}>In a terminal on the car:</p>
            <Code lang="bash">{`cd ~/osr-fw
sudo apt install ./osr-updater_1.0.1_arm64.deb`}</Code>
            <p style={{ ...body, marginTop: 14 }}>
              The package installs <code style={mono}>/usr/bin/osr-updater</code>{' '}
              and an &quot;OSR Updater&quot; entry in the application menu. This
              step is needed once per car. Skip it on a car that already has it.
            </p>
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
            <Code lang="bash">{`sudo systemctl stop neoracer-watchdog
sudo systemctl stop neoracer-teleop
sudo fuser -v /dev/osrbot_base`}</Code>
            <p style={{ ...body, marginTop: 14 }}>
              Stop the watchdog first. The watchdog restarts teleop if teleop
              stops on its own. The <code style={mono}>fuser</code> command must
              print nothing. If it prints a process, stop that process. The
              dashboard, Jupyter, pursuit and V2V services can stay running.
              They do not open the controller&apos;s serial port.
            </p>
            <Callout type="warn" title="Port in use">
              If the updater says &quot;The selected serial port is in use by
              ROS or another program&quot;, one of these services is still
              running. Run the three commands above again.
            </Callout>
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
                  detail: 'From the application menu, or run osr-updater in the terminal.',
                },
                {
                  title: 'Choose the serial device',
                  detail: 'Under Controller, choose /dev/osrbot_base. Press Refresh if it is not listed.',
                },
                {
                  title: 'Press Inspect',
                  detail: 'The Firmware line shows the current version, for example NEORACER_V1.1-20260709-g8b28746. The Battery line shows the pack voltage.',
                },
                {
                  title: 'Select the firmware file',
                  detail: 'Press Select file and choose the firmware file from /home/racecar/osr-fw. The panel on the right must show Type: application update. The updater checks the file’s own checksum and refuses a damaged copy.',
                },
                {
                  title: 'Press Install firmware and confirm',
                  detail: 'A progress bar runs. The board reboots. The updater reconnects and shows the new version.',
                },
                {
                  title: 'Wait for the final message',
                  detail: '"Operation completed successfully" means the update is done.',
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
            <Code lang="bash">{`ros2 topic hz /imu`}</Code>
            <p style={{ ...body, marginTop: 14 }}>
              The rate should be about 200 Hz, and the web dashboard on port
              8080 should show live data. The teleop log may print one
              &quot;Unknown serial frame tag&quot; warning at startup. That
              warning is harmless.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── problems ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>PROBLEMS</Red>
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
                    msg: 'fw begin invalid, or a result that says not to retry',
                    fix: 'The running firmware does not accept this image. Do not retry. Keep the audit log and contact winter@osrbot.com.',
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

      {/* ── command-line alternative ───────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              COMMAND-LINE <Red>ALTERNATIVE</Red>
            </DisplayHeading>
            <p style={body}>
              OSRBOT also supplies two Python scripts that do the same
              application update without a graphical session. They are in the{' '}
              <a href={TOOLS_URL} target="_blank" rel="noopener noreferrer" style={link}>firmware tools</a>{' '}
              folder of the public firmware repo:
            </p>
            <DashList
              items={[
                <><code style={mono}>NEORACER_V1_Serial_OTA_Update_Tool.py</code> performs the update.</>,
                <><code style={mono}>NEORACER_V1_Serial_Diagnostic_Tool.py</code> sends commands to the
                  board and prints the replies. It imports the first script under
                  the name <code style={mono}>serial_ota</code>, so keep both
                  scripts in one folder and add a copy or symlink named{' '}
                  <code style={mono}>serial_ota.py</code>.</>,
              ]}
            />
            <p style={{ ...body, marginTop: 14 }}>
              After stopping the programs that use the controller:
            </p>
            <Code lang="bash">{`cd ~/osr-fw
python3 NEORACER_V1_Serial_Diagnostic_Tool.py --port /dev/osrbot_base "stream off" "fw version" "diag"
python3 NEORACER_V1_Serial_OTA_Update_Tool.py --port /dev/osrbot_base ${FIRMWARE_FILE}`}</Code>
            <p style={{ ...body, marginTop: 14 }}>
              Wait for &quot;Done. Device is rebooting into the updated
              app.&quot; Then after five seconds:
            </p>
            <Code lang="bash">{`python3 NEORACER_V1_Serial_Diagnostic_Tool.py --port /dev/osrbot_base "stream off" "fw version" "fw status" "stream sync"`}</Code>
            <p style={{ ...body, marginTop: 14 }}>
              The version line must show the new{' '}
              <code style={mono}>ProjectVer</code>. Then restart the services
              as above.
            </p>
            <Callout type="warn" title="Not covered: full-flash and Factory Restore">
              Full-flash installation and Factory Restore erase the whole chip.
              They need a merged image from OSRBOT and the board&apos;s BOOT and
              RESET buttons. Use them only with OSRBOT&apos;s guidance.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext />
    </DocsShell>
  );
}
