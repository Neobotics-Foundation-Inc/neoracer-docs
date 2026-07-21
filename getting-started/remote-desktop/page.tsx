import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
  Fig,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, Callout, Code, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Remote desktop · Getting Started · NeoRacer Docs',
  description:
    'Set a permanent RustDesk password on the car, then reach its full desktop from your laptop by IP address. After this page the monitor and keyboard are never needed again.',
};

export default function RemoteDesktopPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Getting Started', href: '/docs/getting-started/unbox' },
          { label: 'Remote desktop' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="RD" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>GETTING STARTED / REMOTE DESKTOP</Eyebrow>
            <DisplayHeading size="xl">
              THE FULL DESKTOP, <Red>REMOTELY.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              The car ships with{' '}
              <InfoNote term="RustDesk" title="RustDesk">
                A remote-desktop tool. It mirrors the Jetson's screen to your laptop over the network so you can use its desktop directly.
              </InfoNote>{' '}
              preinstalled, so your laptop can use the Jetson&apos;s desktop over
              the network. Set a password once, while the monitor is still
              plugged in, and you never need that monitor again.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">One-time setup</ChromeBadge>
              <ChromeBadge variant="outline">Connect by IP</ChromeBadge>
              <ChromeBadge variant="outline">No monitor after this</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · Permanent password ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / ON THE CAR, SET A PERMANENT PASSWORD</Eyebrow>
            <DisplayHeading size="lg">
              A PASSWORD THAT <Red>STAYS.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Out of the box, RustDesk shows a one-time password that changes
              every session, and it only shows it on the car&apos;s own screen.
              That works while a monitor is attached and stops working the moment
              it isn&apos;t, so the fix is a permanent password. This is the last
              thing you do on the monitor:
            </p>
            <DashList
              items={[
                <>Open RustDesk on the car&apos;s desktop (it starts with the system; its window shows &quot;Your Desktop&quot; with an ID).</>,
                <>Open <strong>Settings</strong> from the menu, then the <strong>Security</strong> tab.</>,
                <>Scroll to the <strong>Password</strong> section and select <strong>Use permanent password</strong>.</>,
                <>Click <strong>Set permanent password</strong>, pick one, and keep it somewhere sensible.</>,
              ]}
            />
            <Fig
              label="FIG. A / RUSTDESK ON THE CAR"
              caption='The main window. "Your Desktop" is this car; the ID and one-time password on the left are the pair the permanent password replaces.'
            >
              <Image
                src="/images/rustdesk-main.png"
                alt="RustDesk main window on the Jetson desktop, showing the Your Desktop ID and one-time password"
                width={1926}
                height={1082}
                sizes="(max-width: 760px) 100vw, 720px"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
              />
            </Fig>
            <Fig
              label="FIG. B / SETTINGS → SECURITY → PASSWORD"
              caption='Select "Use permanent password", then "Set permanent password". The dropdown above it can stay on "Accept sessions via both".'
            >
              <Image
                src="/images/rustdesk-security.png"
                alt="RustDesk Security settings with the Password section: Use permanent password selected, Set permanent password button"
                width={1951}
                height={1093}
                sizes="(max-width: 760px) 100vw, 720px"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
              />
            </Fig>
            <Callout type="note" title="If Security asks to unlock">
              Some settings pages need unlocking with the car&apos;s login
              password (<code style={{ fontFamily: NB.monoFont }}>neobotics</code>)
              before they let you change anything.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Connect from the laptop ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / FROM YOUR LAPTOP, CONNECT BY IP</Eyebrow>
            <DisplayHeading size="lg">
              CONNECT BY <Red>ADDRESS.</Red>
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
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / AFTER THIS SETUP</Eyebrow>
            <DisplayHeading size="lg">
              RUSTDESK REPLACES THE <Red>MONITOR.</Red>
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
