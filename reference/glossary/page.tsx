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
    term: 'Deans connector',
    def: 'The flat T-shaped power plug on the battery. If the car won\'t power on, a firm reseat is usually the first thing to try. When the two halves rotate freely against each other, the connector is worn and worth replacing.',
    see: { label: "Won't power on", href: '/docs/troubleshooting/wont-power-on' },
  },
  {
    term: 'e-stop',
    short: 'Emergency stop',
    def: 'The big red button on the chassis. A press cuts power instantly, and a twist brings it back. Every student program also treats the left bumper on the controller as a software e-stop.',
  },
  {
    term: 'ESC',
    short: 'Electronic speed controller',
    def: 'Takes a low-power PWM signal in, drives the motor with regulated power out. Has a built-in voltage cutoff so a flat LiPo can\'t damage the battery.',
  },
  {
    term: 'F1TENTH',
    def: 'The MIT-originated autonomous racing competition NeoRacer is API-compatible with. F1TENTH scripts run on NeoRacer with no code changes.',
    see: { label: 'Roboracer migration', href: '/docs/roboracer/migration-from-f1tenth' },
  },
  {
    term: 'frame_id',
    def: 'The ROS 2 string that names a coordinate frame. Every sensor message carries one. The LiDAR frame is lidar_link, the IMU is imu_link, the car body is base_link.',
    see: { label: 'LiDAR', href: '/docs/hardware/sensors/lidar' },
  },
  {
    term: 'Gap follower',
    def: 'A planning algorithm that picks the largest free arc in the LiDAR scan and steers toward it. The foundational F1TENTH-style behaviour.',
  },
  {
    term: 'IMU',
    short: 'Inertial measurement unit',
    def: 'A chip that fuses an accelerometer and a gyroscope so you get linear acceleration plus angular velocity. The NeoRacer IMU also publishes a fused orientation estimate.',
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
    def: 'A spinning laser scanner that measures distance to whatever the beam hits. The NeoRacer LiDAR gives your code 720 samples per revolution at 30 Hz.',
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
    def: 'The car is its own Wi-Fi access point, broadcasting the network neoracer_[Car ID] (password neobotics). Once you join it, the car answers at the fixed address 192.168.1.[100 + Car ID] (Car 1 = 192.168.1.101), hostname neoracer, as user racecar. There is no DNS server and no name to resolve.',
    see: { label: "Wi-Fi can't connect", href: '/docs/troubleshooting/wifi-cant-connect' },
  },
  {
    term: 'MCU',
    short: 'Microcontroller unit',
    def: 'The real-time chip the Jetson talks to over USB. Owns the motor, servo, and IMU loops because the Jetson can\'t hit microsecond deadlines under Python.',
  },
  {
    term: 'Motor trim',
    def: 'The calibrated PWM value that produces no movement at zero speed. Without it, set_speed_angle(0, 0) creeps.',
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
    term: 'Roboracer',
    def: 'The competition program NeoRacer partners with. Drop-in compatible with the F1TENTH reference build, run by the same community.',
  },
  {
    term: 'ROS 2',
    short: 'Robot Operating System 2',
    def: 'The middleware running on the Jetson. Sensors publish topics, your code subscribes, your code publishes drive commands, the actuators subscribe.',
    see: { label: 'ROS 2 driver', href: '/docs/software/ros2-driver' },
  },
  {
    term: 'Servo center',
    def: 'The calibrated PWM that points the front wheels dead ahead. Pinned per car because the steering linkage has a few hundredths of a degree of slop.',
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
    def: 'A safety timer on the MCU. If no drive command arrives within ~150 ms, it cuts power. Crashed Python scripts can\'t leave the car running into a wall.',
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
