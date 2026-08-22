import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
  NumberedSteps,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Firmware flashing · Software · NeoRacer Docs',
  description:
    'Update the OSCORE (ESP32-S3) controller firmware from a Chrome or Edge browser. Power V_IN, put the board in download mode with BOOT + RESET, then Connect Board and Start Flashing in the web flasher.',
};

const FLASHER_URL = 'https://osrbot.github.io/Development-Board-OSRCORE-Example/en/flash';
const RELEASES_URL = 'https://github.com/osrbot/osracer/releases';

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
          <GhostNumeral n="FW" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              FLASH THE <Red>BOARD</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The OSCORE controller runs its own firmware, the real-time layer that
              reads the receiver and drives the ESC and servo. You update it from a
              browser: the{' '}
              <InfoNote term="Web Serial flasher" title="Web Serial">
                A browser API that lets a web page talk to a USB serial device. The flasher uses it to write firmware straight from a Chrome or Edge tab, with nothing to install.
              </InfoNote>{' '}
              talks to the board over USB. No toolchain, no install.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">OSCORE · ESP32-S3</ChromeBadge>
              <ChromeBadge variant="outline">Chrome / Edge only</ChromeBadge>
              <ChromeBadge variant="outline">USB + V_IN 9–26 V</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · get the firmware ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
          <DisplayHeading size="lg">
            GET THE <Red>FIRMWARE</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The flasher ships with the chapter example builds, so for those you
            don&apos;t download anything. To run a specific release, grab its{' '}
            <code style={{ fontFamily: NB.monoFont }}>.bin</code> from the{' '}
            <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>OSRCORE releases</a>{' '}
            and unzip it.
          </p>
          <Code lang="bash">{`# Example: fetch a tagged release and unzip it.
wget ${RELEASES_URL}/download/v1.0.5/osrcore-firmware-v1.0.5.zip
unzip osrcore-firmware-v1.0.5.zip   # -> osrcore-firmware-v1.0.5.bin`}</Code>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · prereqs ────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHAT YOU <Red>NEED</Red>
            </DisplayHeading>
            <DashList
              items={[
                <><strong>Chrome or Edge.</strong> The flasher needs the Web Serial API, which only the Chromium-based browsers have. Firefox and Safari won&apos;t work.</>,
                <><strong>USB to the board.</strong> Connect the OSCORE board to your computer with USB.</>,
                <><strong>V_IN powered.</strong> The board needs <code style={{ fontFamily: NB.monoFont }}>V_IN</code> on a 9 to 26 V supply while you flash.</>,
              ]}
            />
            <Callout type="warn" title="OSCORE (ESP32-S3) only">
              The flasher checks the chip after it connects. If it sees anything
              other than an OSCORE ESP32-S3, it aborts on its own and writes
              nothing, so you can&apos;t brick the wrong board with it.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · download mode ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              ENTER DOWNLOAD <Red>MODE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Flashing needs the board in download mode. It&apos;s a four-step press,
              in this exact order, right before you connect:
            </p>
            <NumberedSteps
              steps={[
                { title: 'Hold BOOT', mono: true, detail: 'Press and keep holding the BOOT button.' },
                { title: 'Tap RESET', mono: true, detail: 'With BOOT still held, press RESET once.' },
                { title: 'Release RESET', mono: true, detail: 'Let go of RESET while still holding BOOT.' },
                { title: 'Release BOOT', mono: true, detail: 'Now let go of BOOT. The board is in download mode.' },
              ]}
            />
            <Callout type="note" title="Monitoring doesn't need this">
              The download-mode sequence is only for flashing. To open the Serial
              Monitor on a board that&apos;s already running, skip it and connect
              directly.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · flash ──────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RUN THE <Red>FLASHER</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Open the{' '}
              <a href={FLASHER_URL} target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>OSCORE web flasher</a>{' '}
              in Chrome or Edge.
            </p>
            <div style={{ marginTop: 8 }}>
              <DashList
                items={[
                  <><strong>Pick the firmware.</strong> Choose a chapter example from the dropdown, or <strong>Custom firmware</strong> and drop in your <code style={{ fontFamily: NB.monoFont }}>.bin</code>.</>,
                  <><strong>Put the board in download mode</strong> (the sequence above), then click <strong>Connect Board</strong>.</>,
                  <><strong>Select the serial port.</strong> The board shows up as a USB JTAG/serial debug unit on a COM port. Pick it and connect.</>,
                  <><strong>Start Flashing.</strong> Watch the progress bar; the console logs each write. It finishes on <strong>Flash successful</strong>.</>,
                ]}
              />
            </div>
            <Callout type="tip" title="Nothing in the port list?">
              If the board doesn&apos;t appear when you click Connect, it&apos;s
              usually not in download mode or V_IN isn&apos;t powered. Re-run the
              BOOT + RESET sequence and confirm the 9 to 26 V supply, then try again.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · serial monitor ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              CHECK THE <Red>SERIAL MONITOR</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              When the flash completes, the board resets and runs the new firmware.
              To confirm it&apos;s alive, open the <strong>Serial Monitor</strong> in
              the same tool (no download mode needed) and watch the log at{' '}
              <code style={{ fontFamily: NB.monoFont }}>115200</code> baud. Power-cycle
              the car and the driver comes back up on its own, so there is nothing
              else to restart.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'OS & image', href: '/docs/software/os-and-image' }}
        next={{ label: 'API reference', href: '/docs/api-reference/python/drive' }}
      />
    </DocsShell>
  );
}
