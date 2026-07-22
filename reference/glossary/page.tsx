import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Glossary · Reference · NeoRacer Docs',
  description:
    'The robotics and NeoRacer terms used across the docs, defined in one place. Ackermann, IMU, LiDAR, ROS 2, SLAM, and everything in between.',
};

type Term = {
  term: string;
  short?: string;
  def: React.ReactNode;
  see?: { label: string; href: string };
};

const TERMS: Term[] = [
  {
    term: 'Ackermann steering',
    def: 'The steering geometry on real cars: the inner wheel turns more sharply than the outer one to track around a shared center of rotation. NeoRacer uses Ackermann, not skid-steer.',
  },
  {
    term: 'AMCL',
    short: 'Adaptive Monte Carlo Localization',
    def: 'A standard ROS 2 algorithm that estimates the car\'s pose on a known map by matching live LiDAR scans against the map.',
  },
  {
    term: 'BSP',
    short: 'Board Support Package',
    def: 'NVIDIA\'s kernel + driver bundle for the Jetson. The NeoRacer OS image is built on top of the Jetson Linux BSP plus Ubuntu 22.04.',
    see: { label: 'OS & image', href: '/docs/software/os-and-image' },
  },
  {
    term: 'CPR',
    short: 'Counts per revolution',
    def: 'The encoder\'s resolution. One full wheel turn produces this many tick edges. Higher CPR means finer odometry but more interrupts on the MCU (microcontroller unit).',
  },
  {
    term: 'XT60 connector',
    def: 'The yellow two-pin power plug on the battery. If the car won\'t power on, a firm reseat is usually the first thing to try. When the halves seat loosely, the connector is worn and worth replacing.',
    see: { label: "Won't power on", href: '/docs/troubleshooting/wont-power-on' },
  },
  {
    term: 'e-stop',
    short: 'Emergency stop',
    def: 'The big red button on the chassis. A press cuts power instantly, and a twist brings it back. Flipping the transmitter’s SWB switch back up (manual) is the everyday software e-stop.',
  },
  {
    term: 'ESC',
    short: 'Electronic speed controller',
    def: 'Takes a low-power PWM signal in, drives the motor with regulated power out. Has a built-in voltage cutoff so a flat LiPo can\'t damage the battery.',
  },
  {
    term: 'F1TENTH',
    def: 'The MIT-originated autonomous racing competition NeoRacer is API-compatible with. F1TENTH scripts run on NeoRacer with no code changes.',
  },
  {
    term: 'frame_id',
    def: 'The ROS 2 string that names a coordinate frame. Every sensor message carries one. The LiDAR frame is laser, the IMU is imu_link, the car body is base_link.',
    see: { label: 'LiDAR', href: '/docs/hardware/sensors/lidar' },
  },
  {
    term: 'Gap follower',
    def: 'A planning algorithm that picks the largest free arc in the LiDAR scan and steers toward it. The foundational F1TENTH-style behaviour.',
  },
  {
    term: 'IMU',
    short: 'Inertial measurement unit',
    def: 'A chip that fuses an accelerometer and a gyroscope so you get linear acceleration plus angular velocity. The NeoRacer IMU streams a fused orientation from the MCU at ~200 Hz.',
    see: { label: 'Compute', href: '/docs/hardware/compute' },
  },
  {
    term: 'Jetson Orin Nano',
    def: 'The Linux host on the car. NVIDIA single-board computer with a 67 TOPS AI accelerator, runs Ubuntu and ROS 2.',
    see: { label: 'Compute', href: '/docs/hardware/compute' },
  },
  {
    term: 'LiDAR',
    short: 'Light detection and ranging',
    def: 'A spinning laser scanner that measures distance to whatever the beam hits. The NeoRacer LiDAR gives your code ~1440 samples per revolution at 30 Hz, with a 270° live window.',
    see: { label: 'LiDAR', href: '/docs/hardware/sensors/lidar' },
  },
  {
    term: 'LiPo',
    short: 'Lithium polymer',
    def: 'The battery chemistry used in NeoRacer and most RC cars. High power density, but needs careful charging through a balance charger and a flat-storage routine.',
    see: { label: 'Power', href: '/docs/hardware/power' },
  },
  {
    term: 'Static IP',
    short: 'Fixed access address',
    def: 'The car answers at a fixed address on either of its networks: 192.168.10.100 on the cudy router, 10.42.0.1 on its own access point (SSID neoracer-1, password neobotics). Log in as user racecar at whichever matches the Wi-Fi you joined.',
    see: { label: "Wi-Fi can't connect", href: '/docs/troubleshooting/wifi-cant-connect' },
  },
  {
    term: 'MCU',
    short: 'Microcontroller unit',
    def: 'The real-time chip the Jetson talks to over USB. Owns the motor, servo, and IMU loops because the Jetson can\'t hit microsecond deadlines under Python.',
  },
  {
    term: 'Motor trim',
    def: 'In practice, the top-speed cap (max_speed_mps + max_forward) you set in the driver YAML so set_speed_angle scales to a speed you chose. The motor neutral itself lives in the ESP32 firmware, so a creep at zero is usually the ESC neutral or drivetrain drag, not a value you tune here.',
    see: { label: 'Motor trim', href: '/docs/calibration/motor-trim' },
  },
  {
    term: 'Odometry',
    def: 'A pose estimate built from wheel encoders and the IMU. Useful for short-horizon dead reckoning, drifts over distance because of slip.',
  },
  {
    term: 'Pyodide',
    def: 'A WebAssembly build of CPython that runs in the browser. Lets the NeoRacer Playground execute the same Python student code the car runs.',
    see: { label: 'racecar-neo-library', href: '/docs/software/racecar-neo-library' },
  },
  {
    term: 'racecar-neo-library',
    def: 'The Python module every student writes against. The rc.* namespace it exposes is identical on the browser sim and the physical car.',
    see: { label: 'racecar-neo-library', href: '/docs/software/racecar-neo-library' },
  },
  {
    term: 'rc',
    def: 'The racecar object every program drives the car through. You create it with rc = racecar_core.create_racecar(), then call rc.drive, rc.lidar, rc.camera, and the rest. The same object works in the browser sim and on the physical car.',
  },
  {
    term: 'ROS 2',
    short: 'Robot Operating System 2',
    def: 'The middleware running on the Jetson. Sensors publish topics, your code subscribes, your code publishes drive commands, the actuators subscribe.',
    see: { label: 'ROS 2 driver', href: '/docs/software/ros2-driver' },
  },
  {
    term: 'Servo center',
    def: 'A few degrees of trim, set as steering_trim_deg in config/controller.yaml, that points the front wheels dead ahead when your steering command is zero. Pinned per car because the steering linkage has a little slop.',
    see: { label: 'Servo center', href: '/docs/calibration/servo-center' },
  },
  {
    term: 'SLAM',
    short: 'Simultaneous localization and mapping',
    def: 'Building a map of an unknown space while tracking the car\'s pose inside it.',
  },
  {
    term: 'Topic',
    def: 'A named channel in ROS 2 (/scan, /imu, /drive). Publishers don\'t know who\'s reading. Subscribers don\'t know who\'s writing. The middleware does the routing.',
    see: { label: 'ROS 2 driver', href: '/docs/software/ros2-driver' },
  },
  {
    term: 'Watchdog',
    def: 'A node supervisor in the driver. It tracks every node teleop brings up (controller, throttle, mux, gamepad, lidar, camera), restarts a dead one, and flags /imu or /scan if they go stale. The web dashboard at http://neoracer.local:8080 surfaces what it sees.',
  },
  {
    term: 'OSCORE',
    def: 'The custom Neobotics board in the chassis. ESP32-S3 robot controller that takes the LiPo in, fans out 5 V and 3.3 V rails, reads the onboard IMU, and runs the ESC + servo PWM. It is the board the driver talks to over USB-CDC.',
    see: { label: 'OSCORE board', href: '/docs/hardware/oscore-board' },
  },
  {
    term: 'OSRbot',
    def: 'The Seeed Studio robot platform the NeoRacer chassis builds on, and the name the udev rules pin to. The Jetson sees the OSCORE board as /dev/osrbot_base, the USB webcam as /dev/osrbot_usb_cam, and the dot-matrix display as /dev/osrbot_led_matrix.',
  },
  {
    term: 'Lakibeam',
    def: 'The Richbeam LakiBeam1, the 2D lidar on top of the car. It talks to the Jetson as a UDP sensor on its own subnet (host 192.168.8.1, sensor 192.168.8.2), and the lidar node (richbeam_lidar_node0) publishes scans to /scan.',
    see: { label: 'LiDAR', href: '/docs/hardware/sensors/lidar' },
  },
  {
    term: 'JetPack',
    def: 'NVIDIA\'s software bundle for the Jetson family (Linux kernel, drivers, CUDA, the AI runtime). The NeoRacer image ships JetPack 6.2 on Ubuntu 22.04.5 with ROS 2 Humble on top.',
    see: { label: 'OS & image', href: '/docs/software/os-and-image' },
  },
  {
    term: 'Mux (arbiter)',
    def: 'The mux_node in the driver, the arbiter that decides whether the autonomy channel (/drive) or the teleop channel (/gamepad_drive) reaches the motor. The Flysky switch arms manual or autonomy; mux only forwards when one of the two modes is armed.',
  },
  {
    term: 'racecar (tool)',
    def: 'A shell wrapper the driver installs into the racecar user\'s bashrc. Common entry points: racecar teleop (full stack), racecar status (USB symlinks + running nodes), racecar setup networking (AP + Ethernet + lidar subnet), racecar service start/stop/status/logs, racecar library --select, racecar ws.',
  },
];

function TermCard({ t }: { t: Term }) {
  return (
    <div
      style={{
        background: NB.haloWhite,
        border: `1px solid ${NB.borderOnBeige}`,
        borderRadius: 12,
        padding: '16px 18px',
        boxShadow: '0 3px 0 -1px rgba(27,32,54,0.06), 0 10px 22px -8px rgba(27,32,54,0.12)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <div
          style={{
            fontFamily: NB.headingFont,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            color: NB.textOnBeige,
          }}
        >
          {t.term}
        </div>
        {t.short && (
          <div
            style={{
              fontFamily: NB.monoFont,
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: NB.neoboticsRed,
              fontWeight: 700,
            }}
          >
            {t.short}
          </div>
        )}
      </div>
      <div
        style={{
          fontFamily: NB.bodyFont,
          fontSize: 14.5,
          lineHeight: 1.55,
          color: NB.textMutedBeige,
        }}
      >
        {t.def}
      </div>
      {t.see && (
        <Link
          href={t.see.href}
          style={{
            fontFamily: NB.monoFont,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: NB.neoboticsRed,
            textDecoration: 'none',
            fontWeight: 700,
            marginTop: 'auto',
            paddingTop: 4,
          }}
        >
          → {t.see.label}
        </Link>
      )}
    </div>
  );
}

export default function GlossaryPage() {
  // Group terms by first letter for an A-Z section layout.
  const groups: Record<string, Term[]> = {};
  for (const t of TERMS) {
    const letter = t.term[0].toUpperCase();
    (groups[letter] ??= []).push(t);
  }
  const letters = Object.keys(groups).sort();

  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Reference', href: '/docs/reference/specifications' },
          { label: 'Glossary' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="A-Z" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>REFERENCE / GLOSSARY</Eyebrow>
            <DisplayHeading size="xl">
              THE <Red>GLOSSARY.</Red>
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
              The robotics and NeoRacer-specific words used across the docs.
              When a page uses an acronym without expanding it, this is where
              you can find what it stands for and a link back to the page
              that uses it most.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={TERMS.length} suffix=" terms" /></ChromeBadge>
              <ChromeBadge variant="outline"><AnimatedNumeral value={letters.length} suffix=" letters" /></ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Letter nav ──────────────────────────────────────────────── */}
      <ScrollReveal>
        <section
          style={{
            paddingBottom: 24,
            position: 'sticky',
            top: 0,
            background: NB.beige,
            zIndex: 2,
            paddingTop: 8,
          }}
        >
          <MonoLabel>Jump to</MonoLabel>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {letters.map((l) => (
              <a
                key={l}
                href={`#${l}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  background: NB.haloWhite,
                  border: `1px solid ${NB.borderOnBeige}`,
                  borderRadius: 8,
                  fontFamily: NB.headingFont,
                  fontWeight: 900,
                  fontSize: 13,
                  color: NB.tarmacBlue,
                  textDecoration: 'none',
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Letter sections ──────────────────────────────────────── */}
      {letters.map((l) => (
        <ScrollReveal key={l}>
          <section id={l} style={{ paddingBottom: 40, scrollMarginTop: 80 }}>
            <div
              style={{
                fontFamily: NB.headingFont,
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: NB.neoboticsRed,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {l}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 14,
              }}
            >
              {groups[l].map((t) => (
                <TermCard key={t.term} t={t} />
              ))}
            </div>
          </section>
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <Callout type="tip" title="Missing a term?">
          If a page uses an acronym you couldn't find here, email{' '}
          <a
            href="mailto:support@neobotics.org"
            style={{ color: NB.neoboticsRed, fontWeight: 700 }}
          >
            support@neobotics.org
          </a>{' '}
          with the page URL. We'd rather add the definition than leave a reader
          guessing.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Specifications', href: '/docs/reference/specifications' }}
        next={{ label: 'Changelog', href: '/docs/reference/changelog' }}
      />
    </DocsShell>
  );
}
