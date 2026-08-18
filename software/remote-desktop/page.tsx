import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote, PhotoSteps } from '@/components/docs/Interactive';
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Remote desktop · Software · NeoRacer Docs',
  description:
    "Reach the car's full desktop from your laptop by IP address with RustDesk. The password ships preset; change it any time. After this page the monitor and keyboard are never needed again.",
};

export default function RemoteDesktopPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/networking' },
          { label: 'Remote desktop' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              REMOTE DESKTOP <Red>SETUP</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The car ships with{' '}
              <InfoNote term="RustDesk" title="RustDesk">
                A remote-desktop tool. It mirrors the Jetson's screen to your laptop over the network so you can use its desktop directly.
              </InfoNote>{' '}
              preinstalled, so your device can mirror the Jetson&apos;s desktop
              over the network.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── RustDesk setup ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RUSTDESK <Red>SETUP</Red>
            </DisplayHeading>
            <PhotoSteps
              items={[
                { text: <>Download and install RustDesk on your computer from <a href="https://rustdesk.com" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>rustdesk.com</a>.</> },
                { text: <>Make sure your computer and the Jetson are on the same network, either the cudy router or the access point.</> },
                {
                  text: <>Open RustDesk. You will see the home screen.</>,
                  photos: [{ src: '/images/rustdesk_home.png', alt: 'The RustDesk home screen on a laptop, with the field for entering a remote address' }],
                },
                { text: <>Enter the car&apos;s IP address for your network: <code style={{ fontFamily: NB.monoFont }}>192.168.10.100</code> on the cudy router, or <code style={{ fontFamily: NB.monoFont }}>10.42.0.1</code> on the access point.</> },
                { text: <>Press <strong>Connect</strong>.</> },
                { text: <>The first time you connect, RustDesk asks for its password. It is <code style={{ fontFamily: NB.monoFont }}>Neo-2026</code>.</> },
                { text: <>The Jetson login screen appears. Log in as <code style={{ fontFamily: NB.monoFont }}>racecar</code> with the password <code style={{ fontFamily: NB.monoFont }}>neobotics</code>.</> },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 01 · Change the password ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              CHANGE THE <Red>PASSWORD</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The NeoRacer ships with the RustDesk password set to{' '}
              <code style={{ fontFamily: NB.monoFont }}>Neo-2026</code>. You can
              keep it, or change it here:
            </p>
            <PhotoSteps
              items={[
                {
                  text: <>Open RustDesk on the car&apos;s desktop.</>,
                  photos: [{ src: '/images/rustdesk-main.png', alt: 'RustDesk main window on the Jetson desktop, showing the Your Desktop ID and one-time password' }],
                },
                { text: <>Open <strong>Settings</strong> from the menu, then the <strong>Security</strong> tab.</> },
                {
                  text: <>Scroll to the <strong>Password</strong> section and select <strong>Use permanent password</strong>. The dropdown above it can stay on &quot;Accept sessions via both&quot;.</>,
                  photos: [{ src: '/images/rustdesk-security.png', alt: 'RustDesk Security settings with the Password section: Use permanent password selected, Set permanent password button' }],
                },
                { text: <>Click <strong>Set permanent password</strong>.</> },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Networking', href: '/docs/software/networking' }}
        next={{ label: 'File system', href: '/docs/software/workspaces' }}
      />
    </DocsShell>
  );
}
