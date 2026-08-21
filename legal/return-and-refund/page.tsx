import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Returns & refunds · Legal · NeoRacer Docs',
  description:
    'The NeoRacer Return and Refund Policy in full: all sales are final, the strict conditions under which refunds are issued, the warranty remedy for defects, the seven-day window for DOA and missing parts, and the exclusions.',
};

const linkStyle = { color: NB.neoboticsRed, fontWeight: 700 } as const;

const bodyStyle = {
  fontFamily: NB.bodyFont,
  fontSize: 16,
  lineHeight: 1.65,
  color: NB.textMutedBeige,
  maxWidth: 720,
} as const;

export default function ReturnAndRefundPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Legal', href: '/docs/legal/warranty' },
          { label: 'Returns & refunds' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RETURN AND REFUND <Red>POLICY</Red>
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
              This page reproduces the NeoRacer Return and Refund Policy. The
              official policy document governs in every case.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── At a glance ────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 48 }}>
          <MonoLabel>At a glance</MonoLabel>
          <Callout type="warn" title="When a refund is possible">
            All sales of the NeoRacer robotic car kit are final. The only routes
            to a monetary refund are an order cancellation confirmed before the
            order is processed for shipment, or an order Neobotics cannot fulfill.
            Defects, parts damaged in transit, and missing components are handled
            as repairs or part exchanges under the warranty, not as refunds of
            the kit. Damage or missing parts visible on delivery must be reported
            within seven (7) days.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── 01 · No returns ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              NO RETURNS <Red>POLICY</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              All sales of the NeoRacer robotic car kit are final. Neobotics does
              not accept returns for &ldquo;change of mind,&rdquo; customer error
              in ordering, or preference once a purchase is completed.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Refund eligibility ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              REFUND <Red>ELIGIBILITY</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              Refunds are not provided for any NeoRacer purchase except under the
              following strictly defined conditions.
            </p>
            <DashList
              items={[
                <>
                  <strong>Order cancellation:</strong> a full refund will only be
                  issued if a cancellation request is received and confirmed
                  before the order has been processed for shipment.
                </>,
                <>
                  <strong>Unfulfillable orders:</strong> if Neobotics is unable to
                  fulfill an order due to stock unavailability or logistical
                  constraints, a full refund will be issued to the original
                  payment method.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Defective products ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              DEFECTIVE <Red>PRODUCTS</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              In accordance with the NeoRacer 9-Month Limited Hardware Warranty,
              the remedy for hardware defects or manufacturing flaws is repair or
              replacement of the specific defective component. The full terms live
              on the{' '}
              <a href="/docs/legal/warranty" style={linkStyle}>
                Warranty page
              </a>
              .
            </p>
            <DashList
              items={[
                <>
                  A hardware defect does not constitute grounds for a full return
                  or refund of the entire kit.
                </>,
                <>
                  If a component is found to be defective within the 9-month
                  Warranty Period, Neobotics will facilitate a replacement of that
                  component at no cost to the customer, provided the claim is filed
                  at neobotics.org.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · DOA & missing parts ───────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              DOA AND MISSING <Red>PARTS</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              As specified in Section 2 of the Warranty Policy, the steps below
              cover a kit that arrives dead on arrival, damaged in transit, or
              short a component.
            </p>
            <DashList
              items={[
                <>
                  Customers must inspect the package upon delivery and report any
                  visible damage or missing components within seven (7) days.
                </>,
                <>
                  Verified missing or damaged-in-transit parts will be replaced
                  promptly. These instances are handled as part exchanges and do
                  not qualify for a monetary refund.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · Exclusions ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              REFUND <Red>EXCLUSIONS</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              No refunds, credits, or exchanges will be issued for the following.
            </p>
            <DashList
              items={[
                <>
                  Kits where the packaging has been opened or the protective film
                  has been removed from chassis components.
                </>,
                <>
                  Items damaged due to &ldquo;Improper Usage&rdquo; as defined in
                  the Limited Hardware Warranty.
                </>,
                <>
                  Kits purchased through third-party resellers or unauthorized
                  distributors.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="The official policy governs">
          This page reformats the official Return and Refund Policy for the docs.
          Where any wording here differs from the official policy document, the
          official document controls. For cancellations, refund questions, or to
          report damage or missing parts within the seven-day window, email{' '}
          <a href="mailto:support@neobotics.org" style={linkStyle}>
            support@neobotics.org
          </a>
          .
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Warranty', href: '/docs/legal/warranty' }}
        next={{ label: 'Shipping', href: '/docs/legal/shipping' }}
      />
    </DocsShell>
  );
}
