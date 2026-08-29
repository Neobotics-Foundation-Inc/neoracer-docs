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
  description: 'The official Neobotics privacy policy document (PDF).',
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
          <GhostNumeral n="06" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              PRIVACY <Red>POLICY</Red>
            </DisplayHeading>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 56 }}>
          <a
            href="/docs/privacy-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: NB.neoboticsRed,
              color: NB.haloWhite,
              fontFamily: NB.bodyFont,
              fontSize: 14,
              fontWeight: 700,
              padding: '11px 18px',
              borderRadius: 8,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            OPEN THE PRIVACY POLICY (PDF) ↗
          </a>
          <p
            style={{
              fontFamily: NB.monoFont,
              fontSize: 12,
              color: NB.textMutedBeige,
              marginTop: 10,
            }}
          >
            privacy-policy.pdf
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Terms of service', href: '/docs/legal/terms-of-service' }}
        next={{ label: 'Documentation home', href: '/docs' }}
      />
    </DocsShell>
  );
}
