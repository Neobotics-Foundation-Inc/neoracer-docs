import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, Callout, Code, PrevNext, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Workspaces · Software · NeoRacer Docs',
  description:
    'The car carries two ROS 2 workspaces: neoracer (the driver, default) and osracer (SLAM and Nav2). The autonomy layer stacks them so both are usable at once, and racecar ws switches a single terminal between them.',
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
              The car carries two ROS 2 workspaces. Most of the time you do not
              have to think about either one, because the commands that need
              both stack them for you.
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
                  { k: 'When you name it', neo: 'Never; it is the default', os: 'Never; racecar mapping and navigation reach it for you' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Stacked, not either/or ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              THEY <Red>STACK</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Autonomy work needs pieces from both: the driver publishes{' '}
              <code style={{ fontFamily: NB.monoFont }}>/scan</code> and{' '}
              <code style={{ fontFamily: NB.monoFont }}>/odom</code>, while the
              robot description, SLAM and Nav2 come from the vendor. So the
              autonomy tooling sources osracer as an underlay and neoracer on
              top, in that order, and both are live at once.
            </p>
            <Code lang="bash">{`source /opt/ros/humble/setup.bash    # base ROS 2
source ~/osracer_ws/install/setup.bash    # vendor underlay
source ~/ros2_ws/install/setup.bash       # neoracer overlay, wins conflicts`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              You do not run those three lines yourself.{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar mapping</code>,{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar navigation</code>{' '}
              and the autonomy base script each do it inside a subshell, so your
              own terminal keeps its normal environment.
            </p>
            <Callout type="note" title="Order matters, because of the LiDAR driver">
              Both workspaces carry a package called{' '}
              <code style={{ fontFamily: NB.monoFont }}>lakibeam1</code>. They
              are the same source, shared between the two, and the neoracer copy
              has to win. That is why neoracer is sourced last.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · racecar ws ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              SWITCHING ONE <Red>TERMINAL</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>racecar ws</code> swaps
              which workspace the terminal you are sitting in uses. It is for
              poking at vendor packages by hand, not for running mapping or
              navigation. The change applies to that terminal only, and new
              terminals always open on neoracer.
            </p>
            <Code lang="bash">{`racecar ws            # which one am I on?
racecar ws osracer    # this terminal now uses the vendor workspace
racecar ws neoracer   # back to the default`}</Code>
            <MonoLabel>One at a time, in a terminal</MonoLabel>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
              Unlike the stacked environment above, this is a clean swap:
              switching to osracer strips the neoracer paths out, and back
              again. That is deliberate, so the duplicate{' '}
              <code style={{ fontFamily: NB.monoFont }}>lakibeam1</code> cannot
              resolve from both at once in an interactive shell.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · The autonomy base ───────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              THE AUTONOMY <Red>BASE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Between the driver and SLAM sits a thin layer that publishes the
              transform tree and bridges{' '}
              <code style={{ fontFamily: NB.monoFont }}>/cmd_vel</code> into the
              car&apos;s drive pipeline. Mapping and navigation both need it.
              It is not yet a service, so for now you start it in a terminal of
              its own and leave it running.
            </p>
            <Code lang="bash">{`bash ~/ros2_ws/src/neoracer_ros2_driver/scripts/launch_autonomy.sh`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              It brings up three things: the robot description through{' '}
              <code style={{ fontFamily: NB.monoFont }}>robot_state_publisher</code>{' '}
              (giving you{' '}
              <code style={{ fontFamily: NB.monoFont }}>odom → base_footprint → laser</code>),
              a twist bridge so Nav2 drives through the same mux and throttle
              caps your RC override uses, and an EKF fusing{' '}
              <code style={{ fontFamily: NB.monoFont }}>/odom</code> with{' '}
              <code style={{ fontFamily: NB.monoFont }}>/imu/fused</code>.
            </p>
            <Callout type="note" title="Leave the driver running">
              The autonomy base sits on top of the driver, it does not replace
              it. The teleop service has to stay up, because that is where{' '}
              <code style={{ fontFamily: NB.monoFont }}>/scan</code> and{' '}
              <code style={{ fontFamily: NB.monoFont }}>/odom</code> come from.
              Nothing on this page asks you to stop the services.
            </Callout>
            <Callout type="warn" title="Not yet a service">
              <code style={{ fontFamily: NB.monoFont }}>neoracer-autonomy.service</code>{' '}
              exists in the driver repo but setup deliberately does not install
              it, and takes it back off a car that has it from an earlier run.
              Until that changes, the base does not survive a reboot and you
              start it by hand. See the{' '}
              <Link href="/docs/api-reference/cli" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>racecar CLI</Link>.
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
