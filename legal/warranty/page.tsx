import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Warranty · Legal · NeoRacer Docs',
  description:
    'The NeoRacer limited hardware warranty: nine-month term, coverage, exclusions, and how to file a claim. A readable rendering of the official warranty document.',
};

const bodyStyle = {
  fontFamily: NB.bodyFont,
  fontSize: 16,
  lineHeight: 1.65,
  color: NB.textMutedBeige,
  maxWidth: 720,
} as const;

const redLink = { color: NB.neoboticsRed, fontWeight: 700 } as const;

export default function WarrantyPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Legal', href: '/docs/legal/warranty' },
          { label: 'Warranty' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="9mo" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              NEORACER LIMITED HARDWARE <Red>WARRANTY</Red>
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
              Neobotics warrants the NeoRacer robotic car kit against defects in
              materials and workmanship under normal use for nine (9) months from
              the date of original delivery. This page renders those terms in a
              readable form. The sections below preserve every term, number, and
              timeframe from the official warranty document.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">9-month term</ChromeBadge>
              <ChromeBadge variant="outline">Hardware warranty</ChromeBadge>
              <ChromeBadge variant="outline">Limited</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Governing document callout ─────────────────────────────────── */}
      <ScrollReveal>
        <Callout type="note" title="The official document governs">
          This page is a readable rendering of the official NeoRacer warranty. If
          anything here reads differently from the official warranty document, the
          official document is the one that governs. Warranty claims are handled by{' '}
          <a href="mailto:support@neobotics.org" style={redLink}>
            support@neobotics.org
          </a>
          .
        </Callout>
      </ScrollReveal>

      {/* ── 01 · Warranty term ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / WARRANTY TERM</Eyebrow>
            <DisplayHeading size="lg">
              THE WARRANTY <Red>TERM</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              Neobotics warrants the NeoRacer robotic car kit against defects in
              materials and workmanship under normal use for a period of nine (9)
              months from the date of original delivery (the &ldquo;Warranty
              Period&rdquo;). This period is established to ensure all claims can be
              processed within our manufacturer&rsquo;s fulfillment cycle.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Initial inspection ───────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / INITIAL INSPECTION AND VISIBLE DEFECTS</Eyebrow>
            <DisplayHeading size="lg">
              INITIAL <Red>INSPECTION</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              Upon receipt of the Product, the Customer shall inspect all components
              for shortages or visible defects.
            </p>
            <DashList
              items={[
                <>
                  <strong>Notification:</strong> Customer must notify Neobotics in
                  writing via the warranty form at{' '}
                  <a href="https://neobotics.org" style={redLink}>
                    neobotics.org
                  </a>{' '}
                  within seven (7) days of receipt of any discrepancies or visible
                  damage.
                </>,
                <>
                  <strong>Acceptance:</strong> If no inspection is conducted or no
                  report is delivered within this seven-day period, the products
                  shall be deemed accepted, and any claims for shortages or visible
                  defects are waived.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Warranty coverage ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / WARRANTY COVERAGE</Eyebrow>
            <DisplayHeading size="lg">
              WARRANTY <Red>COVERAGE</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              During the Warranty Period, Neobotics warrants that all Products shall
              meet accurate descriptions and high-quality standards in conformity
              with official specifications.
            </p>
            <DashList
              items={[
                <>
                  <strong>Remedy:</strong> In the event of a confirmed hardware
                  breach, Neobotics shall, at its sole discretion, replace the
                  defective component within fourteen (14) business days or repair
                  the component within thirty (30) business days from the receipt of
                  the defective item.
                </>,
                <>
                  <strong>Third-Party Materials:</strong> The warranty for any
                  materials provided by third-party suppliers (for example,
                  specialized external sensors or batteries not manufactured by
                  Neobotics) shall be subject to those specific suppliers&rsquo;
                  specifications.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · Exclusions and limitations ───────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / EXCLUSIONS AND LIMITATIONS</Eyebrow>
            <DisplayHeading size="lg">
              EXCLUSIONS AND <Red>LIMITATIONS</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              Neobotics shall not be liable under this warranty if the defect is
              caused by &ldquo;Improper Usage,&rdquo; which includes but is not
              limited to the following.
            </p>
            <DashList
              items={[
                <>
                  <strong>Misuse and Neglect:</strong> Damage from accidents, fire,
                  liquid/water damage, lightning, or extreme environmental
                  conditions.
                </>,
                <>
                  <strong>Improper Installation:</strong> Damage resulting from
                  incorrect assembly, improper wiring, or testing procedures.
                </>,
                <>
                  <strong>Electrical Abuse:</strong> Short-circuits, reversed
                  polarity, or over-voltage applications.
                </>,
                <>
                  <strong>Hardware Alteration:</strong> Any unauthorized attempts to
                  desolder, physically modify, or permanently alter factory-soldered
                  components on the Printed Circuit Board (PCB).
                </>,
                <>
                  <strong>Third-Party Integration:</strong> Usage in conjunction with
                  third-party products or software modifications that exceed the rated
                  limits of the hardware.
                </>,
                <>
                  <strong>Normal Wear:</strong> Reasonable abrasion, tire wear, or
                  cosmetic scratches resulting from standard operation.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · Filing a claim ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>05 / FILING A CLAIM</Eyebrow>
            <DisplayHeading size="lg">
              FILING A <Red>CLAIM</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              To initiate a warranty claim, the Customer must complete the following.
            </p>
            <DashList
              items={[
                <>
                  <strong>Form Submission:</strong> Complete the official Warranty
                  Claim Form located at{' '}
                  <a href="https://neobotics.org" style={redLink}>
                    neobotics.org
                  </a>
                  .
                </>,
                <>
                  <strong>Documentation:</strong> Provide proof of purchase (order
                  number/unit number), a written description of the failure, and
                  supporting visual evidence (photos or video).
                </>,
                <>
                  <strong>Authorization:</strong> Wait for a confirmed Return
                  Merchandise Authorization (RMA) from Neobotics before returning any
                  hardware.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 06 · Limitation of liability ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="06" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>06 / LIMITATION OF LIABILITY</Eyebrow>
            <DisplayHeading size="lg">
              LIMITATION OF <Red>LIABILITY</Red>
            </DisplayHeading>
            <p style={bodyStyle}>
              Neobotics&rsquo; liability is limited strictly to the repair or
              replacement of hardware as set forth in Section 3 (Warranty Coverage).
              Neobotics shall not be liable to the Customer or any End User for any
              loss or damage arising from the installation, use, or performance of
              the Product, including, without limitation, any indirect, special,
              incidental, or consequential damages.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <MonoLabel>Need help with a claim?</MonoLabel>
          <p style={{ ...bodyStyle, marginTop: 12 }}>
            If you are unsure whether an issue is covered, or you need help starting a
            claim, reach out to{' '}
            <a href="mailto:support@neobotics.org" style={redLink}>
              support@neobotics.org
            </a>{' '}
            and we will walk you through it.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'FAQ', href: '/docs/reference/faq' }}
        next={{ label: 'Returns & refunds', href: '/docs/legal/return-and-refund' }}
      />
    </DocsShell>
  );
}
