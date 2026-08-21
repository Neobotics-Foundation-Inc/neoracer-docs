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
  title: 'Terms of sale · Legal · NeoRacer Docs',
  description: 'The official NeoRacer terms of sale document (PDF).',
};

export default function TermsOfSalePage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Legal', href: '/docs/legal/warranty' },
          { label: 'Terms of sale' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              TERMS OF <Red>SALE</Red>
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
              The terms of sale are published as one official PDF document.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 56 }}>
          <a
            href="/docs/terms-of-sale.pdf"
            target="_blank"
            rel="noopener noreferrer"
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
              OPEN THE TERMS OF SALE (PDF) ↗
            </span>
            <span
              style={{
                fontFamily: NB.monoFont,
                fontSize: 12,
                color: NB.textMutedBeige,
              }}
            >
              terms-of-sale.pdf
            </span>
          </a>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Shipping', href: '/docs/legal/shipping' }}
        next={{ label: 'Privacy', href: '/docs/legal/privacy' }}
      />
    </DocsShell>
  );
}
