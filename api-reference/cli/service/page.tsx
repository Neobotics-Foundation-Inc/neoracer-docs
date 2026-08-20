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

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Four{' '}
              <InfoNote term="systemd units" title="systemd service">
                A background program Linux starts and supervises automatically.
                It comes up on its own at boot and restarts if it crashes.
              </InfoNote>{' '}
              make up the core stack and all four are enabled at boot. With no
              unit named, these actions apply to all of them.
            </p>
            <Code lang="bash">{`racecar service status       # active + enabled for every unit
racecar service stop         # the core stack
racecar service start
racecar service restart      # every ENABLED unit; never starts a disabled one
racecar service logs         # journalctl -f, defaults to teleop
racecar service logs jupyter # or name one`}</Code>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'svc', label: 'Unit', accent: true, mono: true },
                  { key: 'what', label: 'What it runs' },
                ]}
                rows={[
                  { svc: 'neoracer-teleop', what: 'The driver stack. Every topic on the car comes from here.' },
                  { svc: 'neoracer-watchdog', what: 'Supervises the driver nodes and restarts a dead one.' },
                  { svc: 'neoracer-dashboard', what: 'The health dashboard on port 8080.' },
                  { svc: 'neoracer-jupyter', what: 'JupyterLab on port 8888, serving ~/jupyter_ws.' },
                ]}
              />
            </div>

            <div style={{ marginTop: 26 }}>
              <MonoLabel>Lab dashboards</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Five more units install <strong>disabled</strong> and are started
                for a session when you want one. Each holds the camera or the GPU
                for its whole run, so run one at a time.
              </p>
              <Code lang="bash">{`racecar service start camlabel     # 8082
# also: wallfollow 8081, pursuit 8083, eps 8084, smartfollow 8085`}</Code>
            </div>

            <Callout type="warn" title="A fifth unit is held back">
              <code style={{ fontFamily: NB.monoFont }}>neoracer-autonomy</code>{' '}
              exists in the driver repo but setup deliberately does not install
              it, and removes it from a car that has it from an earlier run. It
              is the layer that would publish the transform tree at boot, so on
              a shipped car nothing publishes{' '}
              <code style={{ fontFamily: NB.monoFont }}>/tf</code> or{' '}
              <code style={{ fontFamily: NB.monoFont }}>/robot_description</code>.
              Everything else on this page is unaffected.
            </Callout>
          </div>
        </section>
      </ScrollReveal>


      <PrevNext
        prev={{ label: 'CLI overview', href: '/docs/api-reference/cli' }}
        next={{ label: 'Running', href: '/docs/api-reference/cli/running' }}
      />
    </DocsShell>
  );
}
