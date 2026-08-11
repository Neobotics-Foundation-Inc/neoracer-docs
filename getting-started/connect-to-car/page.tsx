import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  DashList,
  ChromeBadge,
  ClockGlyph,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Connect to the car · Setup · NeoRacer Docs',
  description:
    "Join the car's own Wi-Fi. The onboard router broadcasts neoracer-XXXX; connect your laptop to it and every dashboard the car serves is a browser tab away.",
};

export default function ConnectToCarPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Connect to the car' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              CONNECT TO THE <Red>CAR</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The monitor and keyboard were only for the install. From here on,
              you work from your own device over the car&apos;s Wi-Fi.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}>~5 minutes</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── The car's Wi-Fi ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            THE CAR&apos;S <Red>WI-FI</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The router you fitted earlier comes pre-configured. It broadcasts a
            Wi-Fi network named{' '}
            <code style={{ fontFamily: NB.monoFont }}>neoracer-XXXX</code>, where{' '}
            <code style={{ fontFamily: NB.monoFont }}>XXXX</code> is a set of
            letters and numbers unique to your car, along with a 5&nbsp;GHz
            version of the same network. The router is wired to the Jetson, so
            any device that joins this network can talk to the car.
          </p>
          <MonoLabel>Connect</MonoLabel>
          <DashList
            items={[
              <>Power the car on and give the router a minute to boot.</>,
              <>On your laptop, open the Wi-Fi menu and find{' '}
                <code style={{ fontFamily: NB.monoFont }}>neoracer-XXXX</code>{' '}
                (or its 5&nbsp;GHz version).</>,
              <>Join it with the password{' '}
                <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.</>,
            ]}
          />
          <Callout type="note" title="No internet on this network">
            The car&apos;s Wi-Fi connects you to the car, not to the internet.
            Your laptop stays on it only while you are working with the car.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── The dashboards ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            THE <Red>DASHBOARDS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Once you are on the car&apos;s network, everything the driver serves
            is a browser tab away:
          </p>
          <DataTable
            columns={[
              { key: 'what', label: 'Dashboard', accent: true },
              { key: 'where', label: 'Address', mono: true },
            ]}
            rows={[
              { what: 'Health dashboard (live status of the sensors and services)', where: 'http://192.168.10.100:8080' },
              { what: 'JupyterLab (write and run code on the car)', where: 'http://192.168.10.100:8888' },
            ]}
          />
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The next page uses JupyterLab to test that everything you installed
            is working.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Install the driver', href: '/docs/getting-started/install-driver' }}
      />
    </DocsShell>
  );
}
