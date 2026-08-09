import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
  DashList,
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';
import { PowerWiringDiagram } from '@/components/docs/ManualDiagrams';

export const metadata: Metadata = {
  title: 'Electrical · Hardware · NeoRacer Docs',
  description:
    'How power moves through the NeoRacer: one LiPo into the power-management module, then DC5525 to the Jetson, XT30 to the controller, and a 5 V USB bus to the sensors. Pre-power-on checks and the power-on / power-off order.',
};

export default function ElectricalPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Electrical' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="13" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE ELECTRICAL <Red>SYSTEM</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer runs a single hierarchical power path. One 3S LiPo
              feeds the power-management module, and the module splits that into
              the rails every part needs: a regulated{' '}
              <InfoNote term="DC5525" title="DC5525">
                A 5.5 x 2.5 mm DC barrel jack. It carries the Jetson&apos;s main supply from the power-management board.
              </InfoNote>{' '}
              line to the Jetson, an{' '}
              <InfoNote term="XT30" title="XT30 / XT60">
                XT-series power connectors. XT60 is the larger high-current pair on the battery; XT30 is the smaller pair feeding the controller.
              </InfoNote>{' '}
              line to the controller, and a 5 V USB bus to the sensors.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">11.1 V · 3S in (XT60)</ChromeBadge>
              <ChromeBadge variant="outline">DC5525 → Jetson</ChromeBadge>
              <ChromeBadge variant="outline">XT30 → controller</ChromeBadge>
              <ChromeBadge variant="outline">USB 2.0 → sensors</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · Power path ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <Fig
          label="FIG. A / POWER + SIGNAL PATH"
          caption="The power-management module takes the battery's XT60 input and distributes it: DC5525 to the Jetson, XT30 to the controller, and a 5 V USB 2.0 bus to the sensors. Data rides the same hub; the controller drives the ESC and servo and reads the encoder and RF receiver."
        >
          <PowerWiringDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <Eyebrow>01 / WHERE THE POWER GOES</Eyebrow>
          <DisplayHeading size="lg">
            THE FIVE <Red>RAILS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Everything starts at the LiPo and fans out through the
            power-management module, which also handles overcurrent and
            overvoltage protection so a fault on one rail doesn&apos;t take the
            rest down.
          </p>
          <div style={{ marginTop: 18 }}>
            <DataTable
              columns={[
                { key: 'unit', label: 'Unit', accent: true },
                { key: 'rail', label: 'Fed by', mono: true },
                { key: 'note', label: 'Notes' },
              ]}
              rows={[
                { unit: 'Power-management module', rail: 'XT60 in', note: 'Takes the battery and distributes every rail below.' },
                { unit: 'Jetson Orin Nano', rail: 'DC5525 · 19 V', note: 'Host computer. The module adapts the pack to the Jetson input.' },
                { unit: 'Controller (OSCORE)', rail: 'XT30 · 5 V', note: 'The lower computer, from the module side output.' },
                { unit: 'Sensors (LiDAR, camera)', rail: 'USB 2.0 · 5 V', note: 'Power and data over the USB hub.' },
                { unit: 'RF receiver', rail: 'Controller I/O · 5 V', note: 'The 2.4 GHz receiver runs off the controller.' },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Power-management module ────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / THE DISTRIBUTION BOARD</Eyebrow>
            <DisplayHeading size="lg">
              POWER-MANAGEMENT <Red>MODULE</Red>
            </DisplayHeading>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'iface', label: 'Interface', accent: true, mono: true },
                  { key: 'type', label: 'Type' },
                  { key: 'use', label: 'Connects to' },
                  { key: 'note', label: 'Notes' },
                ]}
                rows={[
                  { iface: 'XT60 (main in)', type: 'Power inlet', use: 'The LiPo battery', note: 'Main supply. Watch polarity: red positive, black negative.' },
                  { iface: 'DC output', type: 'Power outlet', use: 'Jetson Orin Nano', note: 'DC5525 plug.' },
                  { iface: 'XT30 (side out)', type: 'Power outlet', use: 'Controller', note: '5 V regulated output.' },
                  { iface: 'USB hub power', type: 'Power outlet', use: 'Sensor bus', note: '5 V USB-standard supply.' },
                ]}
              />
            </div>

            <Callout type="warn" title="Switch off before you connect anything">
              Make sure the power switch is off before plugging or unplugging any
              lead. Hot-plugging a connector while the module is live can damage
              the board or whatever is on the other end.
            </Callout>

            <div style={{ marginTop: 8 }}>
              <MonoLabel>Connection order</MonoLabel>
              {[
                <>Seat the battery&apos;s <code style={{ fontFamily: NB.monoFont }}>XT60</code> into the module&apos;s main input, polarity correct (red +, black −).</>,
                <>Run the <code style={{ fontFamily: NB.monoFont }}>DC5525</code> cable from the module&apos;s DC output to the Jetson&apos;s DC input.</>,
                <>Run the <code style={{ fontFamily: NB.monoFont }}>XT30</code> cable from the module&apos;s side output to the controller&apos;s XT30 input.</>,
                <>Connect the Jetson&apos;s USB 3.2 downstream port to the USB 2.0 hub with a USB-A to USB-C cable.</>,
                <>Fan the hub&apos;s USB 2.0 ports out to the LiDAR, camera, and controller data ports.</>,
                <>Recheck every connector is fully seated, with no play.</>,
              ].map((t, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: 14, padding: '14px 0', borderBottom: `1px solid ${NB.borderOnBeige}` }}>
                  <div style={{ fontFamily: NB.headingFont, fontSize: 26, fontWeight: 900, lineHeight: 1, color: NB.neoboticsRed }}>{String(i + 1).padStart(2, '0')}</div>
                  <p style={{ fontFamily: NB.bodyFont, fontSize: 15, lineHeight: 1.6, color: NB.textMutedBeige, margin: 0 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Pre-power-on inspection ────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / BEFORE THE BATTERY GOES IN</Eyebrow>
            <DisplayHeading size="lg">
              PRE-POWER-ON <Red>CHECKS</Red>
            </DisplayHeading>
            <Callout type="danger" title="Run these before connecting the battery">
              Powering on with a swollen pack, a chafed lead, or a loose
              connector is how a good day turns into a damaged board or a fire.
              A two-minute walk through the list below is cheap insurance.
            </Callout>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, marginTop: 22 }}>
              <NumberedFeatureCard
                n={1}
                title="Battery"
                lede="At least 3 bars, and no swelling."
                body={
                  <>
                    Short-press the pack&apos;s indicator: below 3 bars, charge before
                    you run. Check the case for swelling, cracks, or leakage, and the{' '}
                    <code style={{ fontFamily: NB.monoFont }}>XT60</code> plug for charring,
                    deformation, or oxidised pins. Any of those means stop and contact{' '}
                    <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>support</a>.
                  </>
                }
              />
              <NumberedFeatureCard
                n={2}
                title="Cables"
                lede="Intact, seated, no heat marks."
                body="Every power lead should be undamaged, with no crush marks, aging, or exposed copper. Confirm each connector is fully seated and that the battery is fixed down so vibration can't shake a lead loose mid-run."
              />
              <NumberedFeatureCard
                n={3}
                title="Appearance"
                lede="Indicators normal, nothing warm or smelly."
                body={
                  <>
                    The Jetson power indicator should be steady green and the
                    OSCORE controller should be cool with no odour. Sensors fixed
                    and their USB connectors straight, RF antenna intact and
                    pointed the right way.
                  </>
                }
              />
              <NumberedFeatureCard
                n={4}
                title="Environment"
                lede="Clear space, switch off, receiver bound."
                body="Nothing around the car that an accidental start could hit. The power switch is off, and the transmitter is charged and bound to the receiver before any power reaches the wheels."
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · Power-on / power-off ───────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / IN THE RIGHT ORDER</Eyebrow>
            <DisplayHeading size="lg">
              POWER ON, <Red>POWER OFF</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The order matters at both ends. Bringing the rails up cleanly lets
              the Jetson self-check before anything moves, and shutting down in
              order keeps the file system and the ROS graph intact.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginTop: 22 }}>
              <div>
                <MonoLabel color={NB.neoboticsRed}>Power-on</MonoLabel>
                <DashList
                  items={[
                    <>Confirm the pre-power-on checks above are done.</>,
                    <>Turn on the power-management module&apos;s main switch.</>,
                    <>Watch the Jetson power indicator come up (the controller lights with it).</>,
                    <>Wait ~30 to 60 s for the Jetson to finish booting.</>,
                    <>Start the driver from the Jetson terminal (below), then the car is in standby for RC or ROS control.</>,
                  ]}
                />
                <Code lang="bash">{`# On the car, once it has finished booting.
teleop                 # brings up the full driver stack`}</Code>
                <Callout type="note" title="First boot? Just watch.">
                  After a first power-on or a battery swap, hold off on the
                  driver. Watch the indicators and the boot logs, confirm nothing
                  looks off, then bring it up.
                </Callout>
              </div>

              <div>
                <MonoLabel color={NB.neoboticsRed}>Power-off</MonoLabel>
                <DashList
                  items={[
                    <>Bring the car to a stop with no task running.</>,
                    <>Flip <code style={{ fontFamily: NB.monoFont }}>CH7</code> to the middle (RC mode) to cut autonomous control.</>,
                    <>Close host-side apps (RViz, navigation, SLAM).</>,
                    <>Stop the driver with <code style={{ fontFamily: NB.monoFont }}>Ctrl+C</code>, then shut down the Jetson.</>,
                    <>Once the Jetson indicator is out, switch off the module and unplug the battery. Wait 30 s before moving it.</>,
                  ]}
                />
                <Code lang="bash">{`# Shut the Jetson down cleanly before cutting power.
sudo shutdown -h now`}</Code>
                <Callout type="warn" title="Don't yank the main switch">
                  Cutting the main switch before the Jetson has shut down can
                  corrupt its file system, drop ROS node data, or leave the
                  ESC and servo in a locked state.
                </Callout>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · Electrical parameters ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>05 / THE NUMBERS</Eyebrow>
            <DisplayHeading size="lg">
              ELECTRICAL <Red>PARAMETERS</Red>
            </DisplayHeading>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'name', label: 'Parameter', accent: true },
                  { key: 'value', label: 'Value', mono: true },
                  { key: 'note', label: 'Notes' },
                ]}
                rows={[
                  { name: 'Pack voltage', value: '11.1 V (3S)', note: 'Three LiPo cells, 3.7 V nominal each.' },
                  { name: 'Pack capacity', value: '5200 mAh', note: <>Reference pack. Any 4000 to 5500 mAh 3S works (battery <Link href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>not included</Link>).</> },
                  { name: 'Discharge rating', value: '≥ 25C', note: <>Minimum. The reference pack is 50C. See <Link href="/docs/hardware/power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Power</Link>.</> },
                  { name: 'Battery connector', value: 'XT60', note: 'Keyed pair, polarity-protected.' },
                  { name: 'Host supply', value: 'DC 5 / 19 V', note: 'Via DC5525, adapted by the module.' },
                  { name: 'Controller supply', value: 'DC 5 V', note: 'Via XT30 from the module.' },
                  { name: 'Sensor supply', value: 'DC 5 V', note: 'Via the USB hub.' },
                  { name: 'RF receiver supply', value: 'DC 5 V', note: 'Via the controller I/O.' },
                  { name: 'Operating current', value: 'Load-dependent', note: 'Tracks total machine draw; peak follows the motor.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Chassis & CAD', href: '/docs/hardware/chassis-and-cad' }}
        next={{ label: 'Safety', href: '/docs/hardware/safety' }}
      />
    </DocsShell>
  );
}
