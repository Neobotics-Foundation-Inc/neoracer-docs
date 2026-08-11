import fs from 'node:fs';
import path from 'node:path';
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
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';
import { MarkdownDoc } from '@/components/docs/MarkdownDoc';
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

const INSTALLER_REPO = 'https://github.com/Neobotics-Foundation-Inc/neoracer-installer';

export const metadata: Metadata = {
  title: 'Install the driver · Setup · NeoRacer Docs',
  description:
    'One installer sets up the whole car: clone neoracer-installer, run install.sh, and the ROS2 driver, the GPU stack, and every service install and verify themselves.',
};

export default function InstallDriverPage() {
  // This page renders the neoracer-installer README so the repo stays the
  // single source of truth. The vendored copy is kept fresh by the
  // installer-readme-pr workflow in the docs repo.
  const readme = fs.readFileSync(
    path.join(process.cwd(), 'src/app/docs/getting-started/install-driver/installer-readme.md'),
    'utf8',
  );

  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Install the driver' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              INSTALL THE <Red>DRIVER</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The driver is the software that ties the Jetson to the sensors and
              motors. One script installs all of it.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}><AnimatedNumeral value={45} prefix="~" suffix=" minutes" /></ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── The installer README, rendered in the docs style ─────────── */}
      <ScrollReveal>
        <MarkdownDoc source={readme} repoUrl={INSTALLER_REPO} />
      </ScrollReveal>

      <p style={{ fontFamily: NB.monoFont, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: NB.textMutedBeige, marginTop: 40 }}>
        This page mirrors the{' '}
        <a href={INSTALLER_REPO} target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          neoracer-installer
        </a>{' '}
        README.
      </p>

      <PrevNext
        prev={{ label: 'Connect to the car', href: '/docs/getting-started/connect-to-car' }}
      />
    </DocsShell>
  );
}
