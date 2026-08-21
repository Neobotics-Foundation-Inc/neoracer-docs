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
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Maintenance · Reference · NeoRacer Docs',
  description:
    'The upkeep schedule for the NeoRacer: what to check before each run, weekly, and monthly; how to look after the LiPo; and how to store and transport the car safely.',
};

export default function MaintenancePage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Reference', href: '/docs/reference/safety' },
          { label: 'Maintenance' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="03" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              ROUTINE <Red>MAINTENANCE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              This page lists the maintenance schedule for the car, the
              battery care rules, and how to store and transport it.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · daily checks ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 40 }}>
          <DisplayHeading size="lg">
            ROUTINE <Red>CHECKS</Red>
          </DisplayHeading>

          <div style={{ marginTop: 18 }}>
            <MonoLabel>Mechanical / chassis</MonoLabel>
            <DataTable
              columns={[
                { key: 'item', label: 'Item', accent: true },
                { key: 'when', label: 'When', mono: true },
                { key: 'how', label: 'Check' },
                { key: 'fix', label: 'If it fails' },
              ]}
              rows={[
                { item: 'Tire wear', when: 'Each use', how: 'Tread depth and surface.', fix: 'Replace when worn or cracked.' },
                { item: 'Tire fixation', when: 'Each use', how: 'Push by hand for play.', fix: 'Tighten the wheel screws.' },
                { item: 'Chassis screws', when: 'Weekly', how: 'Check for loosening.', fix: 'Tighten with an Allen key.' },
                { item: 'Battery fixation', when: 'Each use', how: 'Velcro tie holds, no shift.', fix: 'Re-tie or replace the strap.' },
                { item: 'Cable management', when: 'Weekly', how: 'No over-bending or exposure.', fix: 'Re-route and secure.' },
                { item: 'Bumper sponge', when: 'Monthly', how: 'Intact and attached.', fix: 'Re-stick or replace.' },
              ]}
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <MonoLabel>Electrical</MonoLabel>
            <DataTable
              columns={[
                { key: 'item', label: 'Item', accent: true },
                { key: 'when', label: 'When', mono: true },
                { key: 'how', label: 'Check' },
                { key: 'fix', label: 'If it fails' },
              ]}
              rows={[
                { item: 'Battery level', when: 'Each use', how: 'Check the charge on the dashboard (port 8080).', fix: 'Charge with the included charger.' },
                { item: 'Battery appearance', when: 'Weekly', how: 'No swelling, cracks, leaks.', fix: 'Stop and contact support.' },
                { item: 'Connectors', when: 'Each use', how: 'Seated, no heat marks.', fix: 'Reseat; investigate heat.' },
                { item: 'Controller heat', when: 'In use', how: 'Cool 30 min after power-off.', fix: 'Hot (> 50 °C): stop, contact support.' },
              ]}
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <MonoLabel>Sensors</MonoLabel>
            <DataTable
              columns={[
                { key: 'item', label: 'Item', accent: true },
                { key: 'when', label: 'When', mono: true },
                { key: 'how', label: 'Check' },
                { key: 'fix', label: 'If it fails' },
              ]}
              rows={[
                { item: 'LiDAR lens', when: 'Weekly', how: 'Wipe with a soft cloth.', fix: 'No alcohol or solvents.' },
                { item: 'Camera lens', when: 'Weekly', how: 'Wipe with a lens cloth.', fix: "Don't press the lens hard." },
                { item: 'Sensor mounts', when: 'Each use', how: 'Brackets fixed, no play.', fix: 'Tighten the mounting screws.' },
                { item: 'Sensor data', when: 'Each use', how: 'Outputs normally on start.', fix: <Link href="/docs/reference/troubleshooting" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Troubleshoot</Link> },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · battery care ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              BATTERY <Red>CARE</Red>
            </DisplayHeading>
            <DashList
              items={[
                <>Charge on the balance charger (30 W, 1&ndash;4S, AC 100&ndash;240 V, XT60). Cut power once it shows green. The full routine is on <Link href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Charge &amp; power</Link>.</>,
                <>Keep the charge above 20%. Over-discharge causes irreversible damage. Stop at once if the pack drops fast or overheats.</>,
                <>Do not run the car below 0 °C or above 40 °C. Keep the pack firmly fixed.</>,
                <>Store the pack at 40&ndash;60% (about 3.7&ndash;3.85 V/cell) when unused for more than a few days. Check every 2&ndash;3 months and recharge to about 50% if it falls below 40%. Do not store the pack full or empty.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · storage + transport ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              STORAGE AND <Red>TRANSPORT</Red>
            </DisplayHeading>
            <div style={{ marginTop: 18 }}>
              <MonoLabel>Storage</MonoLabel>
              <DataTable
                columns={[
                  { key: 'k', label: 'Item', accent: true },
                  { key: 'v', label: 'Requirement' },
                ]}
                rows={[
                  { k: 'Charge level', v: '40–60% for long-term storage' },
                  { k: 'Temperature', v: '−10 °C to 55 °C' },
                  { k: 'Humidity', v: '≤ 85% RH, no condensation' },
                  { k: 'Method', v: 'Powered off, battery stored separately' },
                  { k: 'Environment', v: 'Dry, ventilated, free of corrosive gases' },
                ]}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <MonoLabel>Transport</MonoLabel>
              <DataTable
                columns={[
                  { key: 'k', label: 'Item', accent: true },
                  { key: 'v', label: 'Requirement' },
                ]}
                rows={[
                  { k: 'Battery', v: 'Discharge to 40–60%, remove and carry separately' },
                  { k: 'Packaging', v: 'Original box or a padded shipping case' },
                  { k: 'Cables', v: 'Secured so nothing pulls in transit' },
                  { k: 'Sensors', v: 'LiDAR and camera in shockproof packing' },
                  { k: 'Regulations', v: 'Follow local LiPo shipping rules (e.g. UN3481)' },
                ]}
              />
            </div>
            <Callout type="warn" title="Handle the pack with care in transit">
              Do not drop, squeeze, or shake the car during transport. Follow
              your local lithium-battery shipping law; a separately packed,
              half-charged pack is usually required.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · after a session ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            SHUT <Red>DOWN</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Stop the software before you cut power, then put the car away. The full
            power-off order is on{' '}
            <Link href="/docs/hardware/compute" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Compute</Link>.
          </p>
          <Code lang="bash">{`# Stop every ROS launch (Ctrl+C in each terminal), then:
sudo shutdown -h now`}</Code>
          <DashList
            items={[
              <>Once the Jetson is down, switch off the module and unplug the battery XT60.</>,
              <>Wipe dust off the wheels and chassis, and check connectors and cables.</>,
              <>Cover the car against dust. Store it in a stable, dry place, out of sunlight and out of reach of children, with the half-charged pack kept separately.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Troubleshooting', href: '/docs/reference/troubleshooting' }}
        next={{ label: 'Passwords', href: '/docs/reference/passwords' }}
      />
    </DocsShell>
  );
}
