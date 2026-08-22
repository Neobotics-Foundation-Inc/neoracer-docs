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
  title: 'Returns & refunds · Legal · NeoRacer Docs',
  description:
    'The official NeoRacer return and refund policy document (PDF).',
};

export default function ReturnAndRefundPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Legal', href: '/docs/legal/warranty' },
          { label: 'Returns & refunds' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RETURN AND REFUND <Red>POLICY</Red>
            </DisplayHeading>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 56 }}>
          <a
            href="/docs/return-and-refund-policy.pdf"
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
            OPEN THE RETURN AND REFUND POLICY (PDF) ↗
          </a>
          <p
            style={{
              fontFamily: NB.monoFont,
              fontSize: 12,
              color: NB.textMutedBeige,
              marginTop: 10,
            }}
          >
            return-and-refund-policy.pdf
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Warranty', href: '/docs/legal/warranty' }}
        next={{ label: 'Shipping', href: '/docs/legal/shipping' }}
      />
    </DocsShell>
  );
}
