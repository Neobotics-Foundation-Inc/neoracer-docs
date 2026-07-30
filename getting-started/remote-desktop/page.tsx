import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  ClockGlyph,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote, PhotoSteps } from '@/components/docs/Interactive';
import { Crumbs, Callout, Code, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Remote desktop · Setup · NeoRacer Docs',
  description:
    'Set a permanent RustDesk password on the car, then reach its full desktop from your laptop by IP address. After this page the monitor and keyboard are never needed again.',
};

export default function RemoteDesktopPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Remote desktop' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              REMOTE DESKTOP <Red>SETUP</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The car ships with{' '}
              <InfoNote term="RustDesk" title="RustDesk">
                A remote-desktop tool. It mirrors the Jetson's screen to your laptop over the network so you can use its desktop directly.
              </InfoNote>{' '}
              preinstalled, so your laptop can use the Jetson&apos;s desktop over
              the network.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}>~5 minutes</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · Permanent password ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              SET A PERMANENT <Red>PASSWORD</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Out of the box, RustDesk shows a one-time password that changes
              every session, and it only shows it on the car&apos;s own screen.
              That works while a monitor is attached and stops working the moment
              it isn&apos;t, so the fix is a permanent password. This is the last
              thing you do on the monitor:
            </p>
            <PhotoSteps
              items={[
                {
                  text: <>Open RustDesk on the car&apos;s desktop (it starts with the system; its window shows &quot;Your Desktop&quot; with an ID).</>,
                  photos: [{ src: '/images/rustdesk-main.png', alt: 'RustDesk main window on the Jetson desktop, showing the Your Desktop ID and one-time password' }],
                },
                { text: <>Open <strong>Settings</strong> from the menu, then the <strong>Security</strong> tab.</> },
                {
                  text: <>Scroll to the <strong>Password</strong> section and select <strong>Use permanent password</strong>. The dropdown above it can stay on &quot;Accept sessions via both&quot;.</>,
                  photos: [{ src: '/images/rustdesk-security.png', alt: 'RustDesk Security settings with the Password section: Use permanent password selected, Set permanent password button' }],
                },
                { text: <>Click <strong>Set permanent password</strong>, pick one, and keep it somewhere sensible.</> },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Connect from the laptop ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              CONNECT BY <Red>ADDRESS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Install RustDesk on your laptop from{' '}
              <a href="https://rustdesk.com" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>rustdesk.com</a>,
              join the car&apos;s network, and type the car&apos;s address into
              the <strong>Control Remote Desktop</strong> field. Enter your
              permanent password and the Jetson&apos;s desktop opens in a window.
            </p>
            <Code lang="bash">{`10.42.0.1          # on the car's access point (neoracer-1)
192.168.10.100     # on the cudy router`}</Code>
            <Callout type="note" title="Why the address, not the ID">
              RustDesk&apos;s ID connects through its servers on the internet,
              and the car&apos;s own network doesn&apos;t reach the internet, so
              the ID route reports &quot;not ready&quot; there. The IP address
              connects directly across the local network instead, no internet
              involved. On the cudy with its uplink attached, either way works.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · The monitor retires ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              UNPLUG THE <Red>MONITOR</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Everything on the car is now reachable from your laptop: RustDesk
              for the full desktop, SSH for a terminal, the dashboard on port{' '}
              <code style={{ fontFamily: NB.monoFont }}>8080</code>, and
              JupyterLab on port{' '}
              <code style={{ fontFamily: NB.monoFont }}>8888</code> where the
              next page happens. Unplug the monitor and keyboard. The day-to-day
              connection reference is{' '}
              <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</Link>.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Install the driver', href: '/docs/getting-started/install-driver' }}
        next={{ label: 'First program', href: '/docs/getting-started/first-program' }}
      />
    </DocsShell>
  );
}
