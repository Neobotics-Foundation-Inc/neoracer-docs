import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { MouseFollowGlow, ScrollReveal } from '@/components/docs/Interactive';
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Privacy · Legal · NeoRacer Docs',
  description: 'The official Neobotics privacy policy.',
};

export default function PrivacyPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Legal', href: '/docs/legal/warranty' },
          { label: 'Privacy' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE PRIVACY <Red>POLICY</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 18,
                lineHeight: 1.55,
                color: NB.textMutedBeige,
                maxWidth: 680,
              }}
            >
              The privacy policy is published on the main Neobotics site.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 56 }}>
          <Link
            href="/legal/privacy"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 6,
              padding: '20px 28px',
              border: `1px solid ${NB.borderOnBeige}`,
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: NB.monoFont,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: NB.neoboticsRed,
              }}
            >
              OPEN THE PRIVACY POLICY ↗
            </span>
            <span
              style={{
                fontFamily: NB.monoFont,
                fontSize: 12,
                color: NB.textMutedBeige,
              }}
            >
              neobotics.org/legal/privacy
            </span>
          </Link>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Terms of sale', href: '/docs/legal/terms-of-sale' }}
        next={{ label: 'Documentation home', href: '/docs' }}
      />
    </DocsShell>
  );
}
