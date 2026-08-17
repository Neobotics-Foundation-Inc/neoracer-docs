import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  DashList,
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { BoardMap, type BoardMarker } from '@/components/docs/BoardMap';
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'OSCORE board · Hardware · NeoRacer Docs',
  description:
    "The NeoRacer's power-distribution and control board. An ESP32-S3 robot controller (OSCORE) that takes the LiPo in and runs the motor, servo, IMU, and comms. Full pinout, power rails, and the hardware manual.",
};

/* The pinout, keyed to the numbers printed on the manufacturer's interface
 * map. x and y are percentages of each board photo, so the markers hold
 * their positions at any width. */
const FRONT_MARKERS: BoardMarker[] = [
  { id: 'f1',  n: 1,  x: 13.5, y: 12.5, title: 'Power input', detail: 'DC 9 to 26 V in, through the power switch and reverse-polarity protection.' },
  { id: 'f2',  n: 2,  x: 12,   y: 43.5, title: 'IMU', detail: 'A QMI8658A 6-axis sensor and a QMC6309 3-axis magnetometer.' },
  { id: 'f15', n: 15, x: 34,   y: 6.5,  title: 'Expansion switch interface' },
  { id: 'f14', n: 14, x: 65.5, y: 6.5,  title: 'SH1.0-2P power output', detail: 'Controllable power output, with a self-recovery fuse.' },
  { id: 'f13', n: 13, x: 86,   y: 12.5, title: 'XT30 2+2 power output', detail: 'Controllable power output, plus the CAN bus.' },
  { id: 'f16', n: 16, x: 50,   y: 20.5, title: 'Buzzer' },
  { id: 'f11', n: 11, x: 84,   y: 39.5, title: 'Reset button' },
  { id: 'f12', n: 12, x: 93,   y: 39.5, title: 'BOOT button' },
  { id: 'f10', n: 10, x: 88.5, y: 63,   title: '2.54 mm female header IO expansion interface' },
  { id: 'f3',  n: 3,  x: 7,    y: 71.5, title: 'MX1.25-8P IO expansion interface' },
  { id: 'f7',  n: 7,  x: 24.5, y: 71,   title: 'SH1.0-8P 100 Mbps Ethernet interface' },
  { id: 'f8',  n: 8,  x: 71.5, y: 71.5, title: 'MX1.25-4P IO expansion interface' },
  { id: 'f4a', n: 4,  x: 22.8, y: 87,   title: 'MX1.25-4P USB-hub output interface', detail: 'One of the three hub outputs.' },
  { id: 'f4c', n: 4,  x: 74,   y: 87,   title: 'MX1.25-4P USB-hub output interface', detail: 'One of the three hub outputs.' },
  { id: 'f9',  n: 9,  x: 94.5, y: 86.3, title: 'WS2812 LED' },
  { id: 'f4b', n: 4,  x: 22.8, y: 94.5, title: 'MX1.25-4P USB-hub output interface', detail: 'One of the three hub outputs.' },
  { id: 'f6',  n: 6,  x: 50,   y: 94,   title: 'Type-C communication interface' },
  { id: 'f5',  n: 5,  x: 74,   y: 94.5, title: 'MX1.25-4P USB-hub input interface' },
];

const BACK_MARKERS: BoardMarker[] = [
  { id: 'b20', n: 20, x: 88,   y: 71.5, title: 'SD card slot' },
  { id: 'b21', n: 21, x: 6.5,  y: 84,   title: 'WS2812 expansion interface' },
  { id: 'b17', n: 17, x: 24.5, y: 95,   title: 'MX1.25-4P IO expansion interface' },
  { id: 'b18', n: 18, x: 49,   y: 95,   title: 'MX1.25-2P DC 5 V output' },
  { id: 'b19', n: 19, x: 74,   y: 95,   title: 'MX1.25-4P 100 Mbps Ethernet interface' },
];

export default function OscoreBoardPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'OSCORE board' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="11" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE OSCORE <Red>BOARD</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The OSCORE board sits between the Jetson and the lower chassis.
              It is an ESP32-S3 robot controller that inputs the LiPo, outputs
              5 V and 3.3 V rails, reads the onboard{' '}
              <Link href="/docs/hardware/sensors/imu" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                IMU
              </Link>
              , drives the motor and servo, and communicates with the Jetson
              over USB.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── The board: the MCU and its interfaces ────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            THE <Red>BOARD</Red>
          </DisplayHeading>
          <Fig
            label="FIG. A / THE PINOUT"
            caption="The OSCORE board, front and back, with pinout description overlayed. Click a number to see what that component is, or click the board itself to open it full size."
          >
            <BoardMap
              boards={[
                {
                  src: '/images/oscore/oscore-front.png',
                  alt: 'OSCORE board, front (component) side',
                  label: 'Front',
                  markers: FRONT_MARKERS,
                },
                {
                  src: '/images/oscore/oscore-back.png',
                  alt: 'OSCORE board, back side',
                  label: 'Back',
                  markers: BACK_MARKERS,
                },
              ]}
            />
          </Fig>
          <div style={{ marginTop: 28, marginBottom: -6 }}>
            <MonoLabel>Functional modules</MonoLabel>
          </div>
          <DataTable
            columns={[
              { key: 'k', label: 'Parameter', accent: true, width: '180px' },
              { key: 'v', label: 'Specification', mono: true },
            ]}
            rows={[
              { k: 'Board size', v: '60 × 40 mm' },
              { k: 'Module', v: 'ESP32-S3-WROOM-1U-N16R8' },
              { k: 'CPU', v: 'Xtensa LX7 dual-core @ 240 MHz' },
              { k: 'Flash', v: '16 MB (Quad SPI)' },
              { k: 'PSRAM', v: '8 MB (Octal SPI)' },
              { k: 'Wireless', v: 'Wi-Fi 4 (802.11 b/g/n) + BLE 5.0' },
              { k: 'Antenna', v: 'U.FL (IPEX) external' },
              { k: 'Debug', v: 'USB OTG / Serial-JTAG, UART0 on RXD0/TXD0' },
            ]}
          />
          <div style={{ marginTop: 28 }}>
            <MonoLabel>Interface comparison table</MonoLabel>
            <DataTable
              columns={[
                { key: 'iface', label: 'Interface', accent: true, width: '150px' },
                { key: 'type', label: 'Type', mono: true },
                { key: 'fn', label: 'Function' },
                { key: 'part', label: 'Part', mono: true },
              ]}
              rows={[
                { iface: 'DC power input', type: 'XT30 (2+2)', fn: 'Main supply, 9 to 26 V', part: 'TPS54540' },
                { iface: 'USB Type-C', type: 'Type-C 16P', fn: 'Flashing, USB comm, 5 V', part: 'CH339F hub' },
                { iface: 'USB hub', type: '4x USB-A', fn: 'Cameras, drives, dongles', part: 'CH339F' },
                { iface: 'Ethernet', type: 'RJ45 100M', fn: '100 Mbps comms', part: 'HR641680E' },
                { iface: 'MicroSD', type: 'TF slot', fn: 'External storage', part: 'via CH339F SDIO' },
                { iface: 'CAN bus', type: 'Header / terminal', fn: 'CAN 2.0, up to 1 Mbps', part: 'TJA1050T' },
                { iface: 'SBUS / PWM / encoder', type: 'Pin header', fn: 'RC in, ESC + servo PWM, encoder A/B', part: 'VCC_5V_IO' },
                { iface: 'WS2812 LED', type: '3P header / onboard', fn: 'Programmable RGB', part: 'IO46' },
                { iface: 'Buzzer', type: 'Onboard', fn: 'Active buzzer', part: 'IO42' },
                { iface: 'Reset / Boot', type: 'Touch buttons', fn: 'Reset + flashing mode', part: 'BOOT + RESET' },
                { iface: 'IO expansion', type: '2.54 mm header', fn: 'Spare ESP32-S3 GPIO', part: 'SPI / I2C / UART' },
                { iface: 'Power output', type: 'XT30 (2+2)', fn: 'VCC_5V / GND out', part: 'External' },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── What it does ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            WHAT IT <Red>DOES</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            The Jetson runs your code. The OSCORE sits underneath it and
            handles power, the motor and servo, and the jobs that need exact
            timing, which Python on the Jetson cannot keep up with.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              marginTop: 20,
            }}
          >
            <NumberedFeatureCard
              compact
              n={1}
              title="Power distribution"
              lede="Puts out a 5 V rail at up to 5 A, a 3.3 V rail, and battery voltage to the ESC."
            />
            <NumberedFeatureCard
              compact
              n={2}
              title="Motion + sensing"
              lede="Drives the ESC and the steering servo, and reads the encoder and the IMU."
            />
            <NumberedFeatureCard
              compact
              n={3}
              title="Comms to the Jetson"
              lede="Talks to the Jetson over USB. CAN, Ethernet, and a USB hub are there for expansion."
            />
            <NumberedFeatureCard
              compact
              n={4}
              title="Motor control"
              lede="Adjusts motor power thousands of times a second to hold the speed your code asks for."
            />
            <NumberedFeatureCard
              compact
              n={5}
              title="Servo control"
              lede="Turns the steering angle your code asks for into a servo signal."
            />
            <NumberedFeatureCard
              compact
              n={6}
              title="IMU fusion"
              lede="Combines the accelerometer and gyroscope into an orientation 200 times a second."
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Power and limits ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            POWER AND <Red>LIMITS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            A single 9 to 26 V input feeds a two-stage conversion: a TPS54540
            switching regulator makes the 5 V rail, an AMS1117 LDO makes 3.3 V,
            and the raw input passes through to the ESC. The input has reverse
            polarity protection.
          </p>
          <DataTable
            columns={[
              { key: 'rail', label: 'Rail', accent: true, mono: true, width: '130px' },
              { key: 'src', label: 'Source', mono: true },
              { key: 'spec', label: 'Voltage / current', mono: true, width: '150px' },
              { key: 'use', label: 'Usage' },
            ]}
            rows={[
              { rail: 'VCC_IN', src: 'XT30 / Type-C', spec: '9 to 26 V (12 to 24 V typ)', use: 'Main input, reverse-polarity protected' },
              { rail: 'VCC_5V_IO', src: 'TPS54540 DC-DC', spec: '5 V / 5 A', use: 'IO peripheral power' },
              { rail: 'VCC_5V', src: 'VCC_5V_IO + MOSFET', spec: '5 V (switched)', use: 'USB hub, CAN, WS2812' },
              { rail: 'VCC_3V3', src: 'AMS1117-3.3 LDO', spec: '3.3 V / 1 A', use: 'ESP32-S3, IMU, buzzer' },
              { rail: 'VCC_ESC', src: 'VCC_IN (passthrough)', spec: '9 to 26 V', use: 'ESC power output' },
            ]}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              marginTop: 20,
            }}
          >
            {[
              ['Operating temp', '-20 to +70 °C'],
              ['Storage temp', '-40 to +85 °C'],
              ['Humidity', '5 to 95 % RH, non-condensing'],
            ].map(([k, v]) => (
              <div key={k} style={{ background: NB.haloWhite, border: `1px solid ${NB.borderOnBeige}`, padding: '12px 14px' }}>
                <div style={{ fontFamily: NB.monoFont, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: NB.textMutedBeige, fontWeight: 700, marginBottom: 4 }}>{k}</div>
                <div style={{ fontFamily: NB.headingFont, fontSize: 15, fontWeight: 700, color: NB.textOnBeige }}>{v}</div>
              </div>
            ))}
          </div>
          <Callout type="warn" title="Never exceed 26 V, and power the board from one source at a time">
            Do not connect the XT30 and the Type-C to different power sources at
            the same time, and keep the input at or below 26 V. Above 26 V can
            damage the board.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── Downloads ────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            THE SOURCE <Red>FILES</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            OSCORE is open hardware. The complete electrical documentation is
            yours to read, the same files the board was built from:
          </p>
          <DashList
            items={[
              <><a href="/images/oscore/oscore-hardware-manual.pdf" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Hardware manual (PDF)</a> · the full functional reference, every module and pin.</>,
              <><a href="/images/oscore/oscore-schematic.pdf" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Schematic (PDF)</a> · the complete circuit.</>,
              <><a href="/images/oscore/oscore-reference-designators.pdf" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Reference designator map (PDF)</a> · every component located on the board.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Drivetrain', href: '/docs/hardware/drivetrain' }}
        next={{ label: 'Chassis & CAD', href: '/docs/hardware/chassis-and-cad' }}
      />
    </DocsShell>
  );
}
