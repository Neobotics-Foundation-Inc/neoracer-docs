import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Services · CLI · NeoRacer Docs',
  description:
    'racecar service: install, start, stop, enable and tail the systemd units. Four core units, five lab dashboards, and the held autonomy unit.',
};

export default function CliServicesPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'CLI', href: '/docs/api-reference/cli' },
          { label: 'Services' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="10" top={-30} right={-20} size={440} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RACECAR <Red>SERVICE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The service command controls the systemd units on the car.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Status ───────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>STATUS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>racecar service status</code>{' '}
              (or just <code style={{ fontFamily: NB.monoFont }}>racecar service</code>)
              shows every{' '}
              <InfoNote term="systemd unit" title="systemd unit">
                A background program Linux starts and supervises automatically.
                It comes up on its own at boot and restarts if it crashes.
              </InfoNote>{' '}
              on the car. On a fresh car:
            </p>
            <Code lang="bash">{`racecar@neoracer:~$ racecar service status
  neoracer-teleop         active=active       enabled=enabled
  neoracer-watchdog       active=active       enabled=enabled
  neoracer-dashboard      active=active       enabled=enabled
  neoracer-jupyter        active=active       enabled=enabled
  -- lab dashboards (off unless started) --
  neoracer-camlabel       active=inactive     enabled=disabled
  neoracer-wallfollow     active=inactive     enabled=disabled
  neoracer-pursuit        active=inactive     enabled=disabled
  neoracer-eps            active=inactive     enabled=disabled
  neoracer-smartfollow    active=inactive     enabled=disabled`}</Code>
            <div style={{ marginTop: 22 }}>
              <MonoLabel>Systemd units</MonoLabel>
            </div>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 8 }}>
              Four units are installed enabled on all cars and should remain
              enabled always.
            </p>
            <div style={{ marginTop: 10 }}>
              <DataTable
                columns={[
                  { key: 'svc', label: 'Systemd unit', accent: true, mono: true },
                  { key: 'port', label: 'Port', mono: true, width: '90px' },
                  { key: 'what', label: 'What it runs' },
                ]}
                rows={[
                  { svc: 'neoracer-teleop', port: '—', what: 'Runs the driver, which publishes every topic on the car.' },
                  { svc: 'neoracer-watchdog', port: '—', what: 'Supervises the driver nodes and restarts a dead one.' },
                  { svc: 'neoracer-dashboard', port: '8080', what: 'The health dashboard.' },
                  { svc: 'neoracer-jupyter', port: '8888', what: 'JupyterLab, serving ~/jupyter_ws.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Dashboards ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <MonoLabel>Lab dashboards</MonoLabel>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Five more units install disabled and are started for a session.
              We are working to incorporate the dashboards within curriculums
              to foster learning using the NeoRacer; view them in detail in{' '}
              <a href="/docs/Neoracer%20Dashboards.pdf" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                these slides
              </a>.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'svc', label: 'Systemd unit', accent: true, mono: true },
                  { key: 'port', label: 'Port', mono: true, width: '90px' },
                  { key: 'what', label: 'What it runs' },
                ]}
                rows={[
                  { svc: 'neoracer-camlabel', port: '8082', what: 'Capture and label camera images into ~/data as a training dataset.' },
                  { svc: 'neoracer-wallfollow', port: '8081', what: 'Dashboard for the wall-following lab.' },
                  { svc: 'neoracer-pursuit', port: '8083', what: 'Dashboard for the pursuit lab.' },
                  { svc: 'neoracer-eps', port: '8084', what: 'Dashboard for the EPS lab.' },
                  { svc: 'neoracer-smartfollow', port: '8085', what: 'Dashboard for the smart-follow lab.' },
                ]}
              />
            </div>
            <Callout type="warn" title="Run one dashboard at a time">
              We recommend running one dashboard at a time instead of multiple,
              since they might interfere with each other.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Enable and disable ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              ENABLE AND <Red>DISABLE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              An enabled unit starts on its own at boot. With no name, enable
              and disable apply to the four core units. A dashboard is enabled
              by name.
            </p>
            <Code lang="bash">{`racecar service enable            # the core stack starts at boot
racecar service disable           # the core stack stays off at boot
racecar service enable camlabel   # camlabel is available at boot
racecar service disable camlabel`}</Code>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Start and stop ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              START AND <Red>STOP</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Start and stop act now and do not change what happens at boot.
              With no name they apply to the four core units; a dashboard is
              started by name for the session.
            </p>
            <Code lang="bash">{`racecar service stop              # the core stack, now
racecar service start             # bring it back
racecar service start camlabel    # starts camlabel for this session
racecar service stop camlabel`}</Code>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Restart and logs ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RESTART AND <Red>LOGS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              With no name, restart restarts every enabled unit and never
              starts a disabled one. Logs stream from the journal;{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar service logs</code>{' '}
              defaults to teleop.
            </p>
            <Code lang="bash">{`racecar service restart           # every enabled unit
racecar service restart teleop    # one unit by name
racecar service logs              # journalctl -f for teleop
racecar service logs jupyter      # or name one`}</Code>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'CLI overview', href: '/docs/api-reference/cli' }}
        next={{ label: 'Status and Running', href: '/docs/api-reference/cli/running' }}
      />
    </DocsShell>
  );
}
