import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, Callout, Code, PrevNext, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Workspaces · Software · NeoRacer Docs',
  description:
    'The car carries two ROS 2 workspaces: neoracer (the driver, and the default in every terminal) and osracer (the vendor autonomy stack). racecar ws switches one terminal between them.',
};

export default function WorkspacesPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/os-and-image' },
          { label: 'Workspaces' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="WS" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE TWO <Red>WORKSPACES</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The car carries two ROS 2 workspaces. Almost everything you do
              runs from the default one, so most of the time you can ignore
              that there are two.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · What they are ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              NEORACER AND <Red>OSRACER</Red>
            </DisplayHeading>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'k', label: '', accent: true },
                  { key: 'neo', label: 'neoracer (default)', mono: true },
                  { key: 'os', label: 'osracer (vendor)', mono: true },
                ]}
                rows={[
                  { k: 'Path', neo: '~/ros2_ws', os: '~/osracer_ws' },
                  { k: 'What it holds', neo: 'The driver, the services, the racecar CLI, rc.* programs', os: 'The robot description, SLAM, and Nav2' },
                  { k: 'Who wrote it', neo: 'Neobotics', os: 'The vendor, preinstalled on the image' },
                  { k: 'How you reach it', neo: 'Every terminal, by default', os: 'racecar ws osracer, in one terminal' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · racecar ws ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              SWITCHING ONE <Red>TERMINAL</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>racecar ws</code> swaps
              which workspace the terminal you are sitting in uses. The change
              applies to that terminal only, and new terminals always open on
              neoracer.
            </p>
            <Code lang="bash">{`racecar ws            # which one am I on?
racecar ws osracer    # this terminal now uses the vendor workspace
racecar ws neoracer   # back to the default`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              It is a clean swap, not a stack: switching to osracer strips the
              neoracer paths out, and back again. That is deliberate, because
              both workspaces carry a package called{' '}
              <code style={{ fontFamily: NB.monoFont }}>lakibeam1</code> for the
              LiDAR. They are the same shared source, but only one may resolve
              at a time.
            </p>
            <Callout type="note" title="You will rarely need this">
              Everything in these docs runs from the neoracer workspace, which
              is where new terminals already are. Reach for{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar ws</code> when
              you want to inspect or build a vendor package by hand.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · What osracer is for ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHAT OSRACER IS <Red>FOR</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The vendor workspace holds the robot description, SLAM and Nav2:
              the autonomy tier. Reaching it needs one more layer between the
              driver and those packages, publishing the transform tree and
              bridging Nav2 back into the car&apos;s drive pipeline. That layer
              exists in the driver repo but is not installed on a shipped car,
              so autonomy is not something you can run today.
            </p>
            <Callout type="note" title="Not wired up yet">
              Until it ships, treat{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/osracer_ws</code> as
              reference material rather than something to run. The{' '}
              <Link href="/docs/api-reference/cli" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>racecar CLI</Link>{' '}
              page says the same thing about{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar mapping</code> and{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar navigation</code>.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'ROS 2 driver', href: '/docs/software/ros2-driver' }}
        next={{ label: 'Remote desktop', href: '/docs/software/remote-desktop' }}
      />
    </DocsShell>
  );
}
