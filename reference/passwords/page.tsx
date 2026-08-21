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
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Passwords · Reference · NeoRacer Docs',
  description:
    'Every password the car ships with: the Wi-Fi networks, the router admin, the car login, and RustDesk, with where to change each one.',
};

const mono = { fontFamily: NB.monoFont } as const;
const link = { color: NB.neoboticsRed, fontWeight: 700 } as const;

export default function PasswordsPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Reference', href: '/docs/reference/safety' },
          { label: 'Passwords' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="***" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              <Red>PASSWORDS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              This page lists every password the car ships with and where to
              change each one.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ marginTop: 4 }}>
              <DataTable
                columns={[
                  { key: 'what', label: 'What', accent: true },
                  { key: 'user', label: 'Name / address', mono: true },
                  { key: 'pw', label: 'Shipped password', mono: true },
                  { key: 'change', label: 'How to change it' },
                ]}
                rows={[
                  {
                    what: 'Cudy router Wi-Fi',
                    user: 'neoracer-[Car ID]',
                    pw: 'neobotics',
                    change: (
                      <>
                        The Wireless step of the router wizard, on{' '}
                        <Link href="/docs/software/networking" style={link}>Networking</Link>.
                      </>
                    ),
                  },
                  {
                    what: 'Jetson access point Wi-Fi',
                    user: 'neoracer-1',
                    pw: 'neobotics',
                    change: (
                      <>
                        <code style={mono}>racecar setup networking --psk=...</code>, on{' '}
                        <Link href="/docs/software/networking" style={link}>Networking</Link>.
                      </>
                    ),
                  },
                  {
                    what: 'Cudy router admin',
                    user: 'http://192.168.10.1',
                    pw: 'neobotics',
                    change: 'From the router dashboard. Not covered in these docs yet.',
                  },
                  {
                    what: 'Car login (SSH and desktop)',
                    user: 'racecar',
                    pw: 'neobotics',
                    change: (
                      <>
                        Run <code style={mono}>passwd</code> in a terminal on
                        the car and enter a new password twice.
                      </>
                    ),
                  },
                  {
                    what: 'RustDesk',
                    user: '—',
                    pw: 'Neo-2026',
                    change: (
                      <>
                        The Change the password section on{' '}
                        <Link href="/docs/software/remote-desktop" style={link}>Remote desktop</Link>.
                      </>
                    ),
                  },
                  {
                    what: 'JupyterLab',
                    user: 'port 8888',
                    pw: 'none',
                    change: (
                      <>
                        There is no password. Anyone on the car&apos;s network
                        can open it; see{' '}
                        <Link href="/docs/software/workspaces" style={link}>File system</Link>.
                      </>
                    ),
                  },
                ]}
              />
            </div>
            <Callout type="warn" title="Change the passwords in shared spaces">
              Every car ships with the same passwords. In a classroom or any
              shared space, change the Wi-Fi and car login passwords on day
              one.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'FAQ', href: '/docs/reference/faq' }}
        next={{ label: 'Safety', href: '/docs/reference/safety' }}
      />
    </DocsShell>
  );
}
