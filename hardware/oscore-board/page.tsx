import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'OSCORE board · Hardware · NeoRacer Docs',
  description:
    "The NeoRacer's power-distribution and control board. An ESP32-S3 robot controller (OSCORE) that takes the LiPo in and runs the motor, servo, IMU, and comms. Full pinout, power rails, and the hardware manual.",
};

/* A framed board photo. */
function BoardImg({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        borderRadius: 10,
        border: `1px solid ${NB.borderOnBeige}`,
        boxShadow: NB.shadowCard,
        background: NB.tarmacBlue,
      }}
    />
  );
}

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
            label="FIG. A / FRONT AND BACK"
            caption="The OSCORE board, front (component side, left) and back. The ESP32-S3 module sits in the center; the gold XT30 pads carry power in and out."
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <BoardImg src="/images/oscore/oscore-front.png" alt="OSCORE board, front (component) side" />
              <BoardImg src="/images/oscore/oscore-back.png" alt="OSCORE board, back side" />
            </div>
          </Fig>
          <DataTable
            columns={[
              { key: 'k', label: 'Parameter', accent: true, width: '180px' },
              { key: 'v', label: 'Specification', mono: true },
            ]}
            rows={[
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
            <Fig
              label="FIG. B / INTERFACE MAP"
              caption="The numbered pinout from the hardware manual. Every connector, switch, and header on the board, keyed to the table below."
            >
              <BoardImg src="/images/oscore/oscore-interface.png" alt="OSCORE board interface and pinout map" />
            </Fig>
          </div>
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
        </section>
      </ScrollReveal>

      {/* ── What it does ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            WHAT IT <Red>DOES</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 740 }}>
            OSCORE pulls the pieces a small autonomous robot needs onto one
            board: a 6-axis IMU and a magnetometer, CAN bus, 100 Mbps Ethernet,
            a USB hub, an SBUS receiver input,{' '}
            <InfoNote term="PWM" title="PWM">Pulse-width modulation. A control signal that encodes a value in the width of repeating pulses, used here to tell the ESC how much throttle and the servo what steering angle to hold.</InfoNote>{' '}
            outputs for the{' '}
            <InfoNote term="ESC" title="ESC">An electronic speed controller. It takes the control signal and the battery voltage and drives the motor at the commanded speed.</InfoNote>{' '}
            and servo, and an encoder
            input. The Jetson runs the autonomy; OSCORE is the real-time layer
            underneath it that actually moves the car and reads the sensors that
            need microsecond timing.
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
              n={1}
              title="Power distribution"
              lede="LiPo in, clean rails out."
              body="A 9 to 26 V input is converted in two stages to a 5 V at 5 A rail and a 3.3 V rail, with the raw pack voltage passed straight through to the ESC."
            />
            <NumberedFeatureCard
              n={2}
              title="Motion + sensing"
              lede="ESC, servo, encoder, IMU."
              body="PWM outputs drive the ESC and steering servo, an encoder input reads wheel motion, and the onboard 9-axis IMU gives orientation, all wired to the ESP32-S3."
            />
            <NumberedFeatureCard
              n={3}
              title="Comms to the Jetson"
              lede="USB, plus CAN and Ethernet."
              body="The board talks to the Jetson over USB. CAN, 100 Mbps Ethernet, and a 4-port USB hub are there for expansion."
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              marginTop: 18,
            }}
          >
            <NumberedFeatureCard
              n={4}
              title="Motor control"
              lede="The OSCORE drives the motor and reads the encoder."
              body="It adjusts motor power thousands of times per second to hold the speed your code asks for. Python on the Jetson cannot react that fast, which is why this job lives on the OSCORE."
            />
            <NumberedFeatureCard
              n={5}
              title="Servo control"
              lede="The OSCORE moves the steering servo."
              body="Your code asks for a steering angle and the OSCORE turns it into the servo signal. The steering calibration is saved on the OSCORE itself, so reinstalling the Jetson does not erase it."
            />
            <NumberedFeatureCard
              n={6}
              title="IMU fusion"
              lede="The OSCORE cleans up the IMU data."
              body="It combines the raw accelerometer and gyroscope readings into a stable orientation, 200 times a second, so the Jetson receives clean data on /imu."
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Power ────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            THE POWER <Red>SYSTEM</Red>
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
              { rail: 'VCC_IN', src: 'XT30 / Type-C', spec: '9 to 26 V', use: 'Main input, reverse-polarity protected' },
              { rail: 'VCC_5V_IO', src: 'TPS54540 DC-DC', spec: '5 V / 5 A', use: 'IO peripheral power' },
              { rail: 'VCC_5V', src: 'VCC_5V_IO + MOSFET', spec: '5 V (switched)', use: 'USB hub, CAN, WS2812' },
              { rail: 'VCC_3V3', src: 'AMS1117-3.3 LDO', spec: '3.3 V / 1 A', use: 'ESP32-S3, IMU, buzzer' },
              { rail: 'VCC_ESC', src: 'VCC_IN (passthrough)', spec: '9 to 26 V', use: 'ESC power output' },
            ]}
          />
          <Callout type="warn" title="Two power rules">
            Do not connect the XT30 and the Type-C to different power sources at
            the same time, and keep the input at or below 26 V. Above 26 V can
            damage the board. The pack voltage is readable in firmware: VCC_IN
            runs through a 200k / 22k divider to an ADC pin, about a 1/10 ratio.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── Electrical params ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            ELECTRICAL <Red>LIMITS</Red>
          </DisplayHeading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              marginTop: 8,
            }}
          >
            {[
              ['Input voltage', '9 V min · 12 to 24 V typ · 26 V max'],
              ['5 V output', 'up to 5 A'],
              ['3.3 V output', 'up to 1 A'],
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

      <ScrollReveal>
        <Callout type="note" title="This is the board the ROS 2 driver talks to">
          The OSCORE ESP32-S3 is the board the{' '}
          <Link href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>ROS 2 driver</Link>{' '}
          reaches over USB-CDC. A udev rule pins it as{' '}
          <code style={{ fontFamily: NB.monoFont }}>/dev/osrbot_base</code>, and a
          single <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>controller</code> node owns
          that link. It reads the IMU, the wheel encoder, and the Flysky RC
          receiver, publishes them as{' '}
          <code style={{ fontFamily: NB.monoFont }}>/imu</code>,{' '}
          <code style={{ fontFamily: NB.monoFont }}>/odom</code>, and{' '}
          <code style={{ fontFamily: NB.monoFont }}>/joy</code>, and writes{' '}
          <code style={{ fontFamily: NB.monoFont }}>v &lt;m/s&gt; &lt;deg&gt;</code> back to the
          ESP32 to drive the ESC and steering servo. No separate IMU, PWM, or
          joystick driver, this one board and one node.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Drivetrain', href: '/docs/hardware/drivetrain' }}
        next={{ label: 'Chassis & CAD', href: '/docs/hardware/chassis-and-cad' }}
      />
    </DocsShell>
  );
}
