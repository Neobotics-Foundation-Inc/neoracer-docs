import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
  ChromeBadge,
  ClockGlyph,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Connect to the router · Setup · NeoRacer Docs',
  description:
    "Join the car's own Wi-Fi. The Cudy router broadcasts neoracer-XXXX; connect your device to it and reach the car through the router's static IP, 192.168.10.100.",
};

export default function ConnectToRouterPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Connect to the router' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              CONNECT TO THE <Red>ROUTER</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The monitor and keyboard are not required after installing the
              driver. You can connect to the car using the router.
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
            The Cudy router comes pre-configured. It broadcasts a Wi-Fi network
            named <code style={{ fontFamily: NB.monoFont }}>neoracer-XXXX</code>,
            where <code style={{ fontFamily: NB.monoFont }}>XXXX</code> is a set
            of letters and numbers unique to your car, along with a 5&nbsp;GHz
            version of the same network.
          </p>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 14 }}>
            You can find the name (SSID) of this network on the sticker on the
            bottom of the NeoRacer or within the battery compartment.
          </p>
          <DashList
            items={[
              <>Power the car on and give the router a minute to boot.</>,
              <>On your device, open the Wi-Fi menu and find{' '}
                <code style={{ fontFamily: NB.monoFont }}>neoracer-XXXX</code>{' '}
                (or its 5&nbsp;GHz version).</>,
              <>Join it with the password{' '}
                <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.</>,
            ]}
          />
          <Callout type="note" title="No internet on this network">
            The car&apos;s Wi-Fi connects you to the car, not to the internet.
            Familiarize yourself with this page and the next one before joining,
            or open the docs on another device to follow along.
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
            Once connected to the router, you can interact with the car through
            the router&apos;s IP address, which is static at{' '}
            <code style={{ fontFamily: NB.monoFont }}>192.168.10.100</code>. The
            next page uses the Health dashboard and JupyterLab.
          </p>
          <DataTable
            columns={[
              { key: 'what', label: 'Key dashboards', accent: true },
              { key: 'where', label: 'Address', mono: true },
            ]}
            rows={[
              { what: 'Health dashboard (live status of the sensors and services)', where: 'http://192.168.10.100:8080' },
              { what: 'JupyterLab (write and run code on the car)', where: 'http://192.168.10.100:8888' },
            ]}
          />
          <div style={{ marginTop: 18 }}>
            <DashList
              items={[
                <>For interacting with the dashboards, see{' '}
                  <em style={{ color: NB.textMutedBeige }}>(coming soon)</em>.</>,
                <>For different methods to access the car, see{' '}
                  <em style={{ color: NB.textMutedBeige }}>Networking (coming soon)</em>.</>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Install the driver', href: '/docs/getting-started/install-driver' }}
        next={{ label: 'Test the system', href: '/docs/getting-started/test-the-system' }}
      />
    </DocsShell>
  );
}
