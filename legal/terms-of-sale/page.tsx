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
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Terms of sale · Legal · NeoRacer Docs',
  description:
    'The official Terms of Sale for the NeoRacer autonomous car kit, sold by Neobotics Foundation Inc. Scope, warranty, liability, governing law, and contact information.',
};

const para: React.CSSProperties = {
  fontFamily: NB.bodyFont,
  fontSize: 16,
  lineHeight: 1.65,
  color: NB.textMutedBeige,
  maxWidth: 760,
  marginTop: 14,
};

const sectionStyle: React.CSSProperties = {
  position: 'relative',
  paddingBottom: 52,
};

const redLink: React.CSSProperties = { color: NB.neoboticsRed, fontWeight: 700, textDecoration: 'none' };

export default function TermsOfSalePage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Legal', href: '/docs/legal/warranty' },
          { label: 'Terms of sale' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
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
              These Terms of Sale govern the sale of the NeoRacer autonomous car
              kit and any related parts, accessories, replacement components,
              software, firmware, documentation, and other goods sold by
              Neobotics Foundation Inc. (Neobotics, we, our, or us) to the
              purchaser (Buyer, you, or your). By placing an order or purchasing
              any Neobotics product, you agree to these Terms of Sale. If you do
              not agree, do not place an order or use the product.
            </p>
            <p style={{ fontFamily: NB.monoFont, fontSize: 12.5, letterSpacing: '0.08em', color: NB.textMutedBeige, marginTop: 14 }}>
              EFFECTIVE MARCH 13, 2026 · LAST UPDATED MARCH 13, 2026
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="This is the official document, faithfully reproduced">
          These Terms of Sale apply to purchases made through our website,
          checkout process, invoices, order forms, quotations, direct sales, or
          other authorized sales channels. The text below reproduces the
          official Terms of Sale section by section. If you need a signed copy
          or have a question about any provision, email{' '}
          <a href="mailto:support@neobotics.org" style={redLink}>
            support@neobotics.org
          </a>
          .
        </Callout>
      </ScrollReveal>

      {/* ── 01 · Scope of Sale ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              SCOPE OF <Red>SALE</Red>
            </DisplayHeading>
            <p style={para}>
              These Terms of Sale apply to all sales of Neobotics products unless
              a separate written agreement signed by an authorized representative
              of Neobotics expressly provides otherwise.
            </p>
            <p style={para}>
              These Terms of Sale supplement, and should be read together with,
              any applicable Terms of Service, Shipping Policy, Return Policy,
              Warranty statement, and Privacy Policy published by Neobotics or
              provided with the order.
            </p>
            <p style={para}>
              If there is any conflict between these Terms of Sale and the written
              NeoRacer Limited Hardware Warranty, the written warranty will
              control with respect to warranty-specific matters.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Product Nature and Intended Use ─────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              PRODUCT NATURE AND INTENDED <Red>USE</Red>
            </DisplayHeading>
            <p style={para}>
              The NeoRacer is an autonomous vehicle kit intended for educational,
              research, prototyping, and recreational use. Unless expressly
              stated otherwise in writing by Neobotics, the NeoRacer is:
            </p>
            <DashList
              items={[
                'not a motor vehicle for use on public roads;',
                'not certified for public-road transportation;',
                'not intended for safety-critical, life-critical, or mission-critical applications;',
                'not intended for use where malfunction could reasonably be expected to cause death, serious bodily injury, or substantial property damage.',
              ]}
            />
            <p style={para}>
              Buyer is solely responsible for selecting an appropriate use
              environment, following all documentation and safety instructions,
              and ensuring proper assembly, supervision, and operation.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Orders and Acceptance ───────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              ORDERS AND <Red>ACCEPTANCE</Red>
            </DisplayHeading>
            <p style={para}>All orders are subject to acceptance by Neobotics.</p>
            <p style={para}>
              An order is not binding on Neobotics until Neobotics accepts it
              through written confirmation, shipment, or invoice acceptance.
              Neobotics may reject or cancel orders for reasons including product
              unavailability, pricing error, legal restrictions, export
              screening, suspected fraud, or other legitimate business reasons.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · Prices, Payment, and Taxes ──────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              PRICES, PAYMENT, AND <Red>TAXES</Red>
            </DisplayHeading>
            <p style={para}>
              Buyer agrees to pay the purchase price, shipping and handling
              charges, and all applicable taxes, duties, import charges, and
              governmental fees associated with the order, unless otherwise
              expressly stated in writing.
            </p>
            <p style={para}>
              Unless otherwise agreed in writing, payment is due at the time of
              order.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · Initial Inspection; Shortages and Visible Defects ───────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              INITIAL INSPECTION; SHORTAGES AND VISIBLE <Red>DEFECTS</Red>
            </DisplayHeading>
            <p style={para}>
              Upon receipt of the product, Buyer shall promptly inspect all
              components for shortages, shipping discrepancies, or visible
              defects.
            </p>
            <p style={para}>
              Buyer must notify Neobotics in writing via the official warranty
              form available at neobotics.org within seven (7) days of receipt of
              any shortages, discrepancies, or visible damage. If no inspection is
              conducted or no report is delivered within that seven-day period,
              the products will be deemed accepted for purposes of claims relating
              to shortages or visible defects, to the extent permitted by
              applicable law.
            </p>
            <p style={para}>
              Nothing in this section limits any rights that cannot lawfully be
              waived under applicable law.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 06 · Limited Hardware Warranty ───────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              LIMITED HARDWARE <Red>WARRANTY</Red>
            </DisplayHeading>

            <MonoLabel>6.1 Warranty term</MonoLabel>
            <p style={para}>
              Neobotics warrants the NeoRacer robotic car kit against defects in
              materials and workmanship under normal use for a period of nine (9)
              months from the date of original delivery (Warranty Period). The
              Warranty Period is intended to align with Neobotics&apos;
              manufacturer fulfillment cycle.
            </p>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>6.2 Warranty coverage</MonoLabel>
            </div>
            <p style={para}>
              During the Warranty Period, Neobotics warrants that the product will
              conform in all material respects to its official specifications and
              product descriptions and will meet applicable quality standards for
              covered hardware components.
            </p>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>6.3 Warranty remedy</MonoLabel>
            </div>
            <p style={para}>
              In the event of a confirmed covered hardware breach or defect during
              the Warranty Period, Neobotics shall, at its sole discretion:
            </p>
            <DataTable
              columns={[
                { key: 'remedy', label: 'Remedy', accent: true },
                { key: 'window', label: 'Timeframe', mono: true, width: '40%' },
              ]}
              rows={[
                {
                  remedy: 'Replace the defective component',
                  window: 'Within 14 business days after receipt of the defective item',
                },
                {
                  remedy: 'Repair the defective component',
                  window: 'Within 30 business days after receipt of the defective item',
                },
              ]}
            />
            <p style={para}>
              These remedies are subject to reasonable delays outside Neobotics&apos;
              control, including supply chain disruptions, customs holds, carrier
              delays, or force majeure events.
            </p>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>6.4 Third-party materials</MonoLabel>
            </div>
            <p style={para}>
              Any warranty applicable to materials or components provided by
              third-party suppliers, including specialized external sensors,
              batteries, or similar items not manufactured by Neobotics, shall be
              subject to the specifications, warranty terms, and limitations of
              those third-party suppliers.
            </p>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>6.5 Warranty claim procedure</MonoLabel>
            </div>
            <p style={para}>To initiate a warranty claim, Buyer must:</p>
            <DashList
              items={[
                'complete the official Warranty Claim Form located at neobotics.org;',
                'provide proof of purchase, including the order number and/or unit number;',
                'provide a written description of the failure; and',
                'provide supporting visual evidence, including photos or video.',
              ]}
            />
            <p style={para}>
              Buyer must wait for a confirmed Return Merchandise Authorization
              (RMA) from Neobotics before returning any hardware. Unauthorized
              returns may be refused.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 07 · Warranty Exclusions and Improper Usage ──────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WARRANTY EXCLUSIONS AND IMPROPER <Red>USAGE</Red>
            </DisplayHeading>
            <p style={para}>
              Neobotics shall not be liable under the limited hardware warranty if
              the defect, malfunction, or damage is caused by Improper Usage.
              Improper Usage includes, but is not limited to:
            </p>
            <DashList
              items={[
                <>
                  <strong>Misuse and neglect:</strong> damage from accidents, fire,
                  liquid or water damage, lightning, or extreme environmental
                  conditions;
                </>,
                <>
                  <strong>Improper installation:</strong> damage resulting from
                  incorrect assembly, improper wiring, or improper testing
                  procedures;
                </>,
                <>
                  <strong>Electrical abuse:</strong> short-circuits, reversed
                  polarity, or over-voltage applications;
                </>,
                <>
                  <strong>Hardware alteration:</strong> unauthorized attempts to
                  desolder, physically modify, or permanently alter
                  factory-soldered components on the printed circuit board (PCB);
                </>,
                <>
                  <strong>Third-party integration:</strong> usage in conjunction
                  with third-party products or software modifications that exceed
                  the rated limits of the hardware;
                </>,
                <>
                  <strong>Normal wear:</strong> reasonable abrasion, tire wear, or
                  cosmetic scratches resulting from standard operation.
                </>,
              ]}
            />
            <p style={para}>
              Neobotics may deny warranty coverage where reasonably available
              evidence indicates that Improper Usage caused or materially
              contributed to the claimed failure.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 08 · Software and Digital Materials ──────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              SOFTWARE AND DIGITAL <Red>MATERIALS</Red>
            </DisplayHeading>
            <p style={para}>
              Unless expressly stated otherwise in writing, software, firmware,
              sample code, and digital materials are provided under license and
              are not separately warranted to be error-free, uninterrupted, or fit
              for any particular competition, classroom, or commercial
              deployment.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 09 · Implied Warranties ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              IMPLIED <Red>WARRANTIES</Red>
            </DisplayHeading>
            <p style={para}>
              To the extent applicable law provides implied warranties, those
              warranties apply only to the extent they cannot lawfully be excluded
              or limited.
            </p>
            <p style={para}>
              If the transaction is a commercial sale where limitation of implied
              warranties is permitted, any implied warranties are limited to the
              minimum scope and duration permitted by applicable law.
            </p>
            <p style={para}>
              For consumer transactions, nothing in these Terms of Sale is
              intended to exclude or limit any implied warranty, remedy, or
              consumer right to the extent such exclusion or limitation is
              prohibited by applicable law.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 10 · Disclaimer of Non-Warranty Statements ───────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              DISCLAIMER OF NON-WARRANTY <Red>STATEMENTS</Red>
            </DisplayHeading>
            <p style={para}>
              Except as expressly stated in these Terms of Sale or in a separate
              written warranty statement issued by Neobotics, Neobotics does not
              make any additional express warranty.
            </p>
            <p style={para}>
              Product descriptions, demonstrations, educational examples,
              marketing materials, sample performance data, and technical support
              communications do not create a separate express warranty unless
              expressly stated in writing as such.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 11 · Buyer Responsibilities and Assumption of Operational Risk ─ */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              BUYER RESPONSIBILITIES AND ASSUMPTION OF OPERATIONAL{' '}
              <Red>RISK</Red>
            </DisplayHeading>
            <p style={para}>
              Buyer acknowledges that the NeoRacer requires assembly,
              configuration, charging, testing, and supervised operation, and that
              such activities involve inherent risks. Buyer assumes responsibility
              for:
            </p>
            <DashList
              items={[
                'safe assembly and operation;',
                'adult supervision where appropriate;',
                'pre-use inspection and maintenance;',
                'compliance with all warnings and documentation;',
                'providing a safe testing environment;',
                'preventing foreseeable injury to persons, animals, and property.',
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 12 · Limitation of Liability ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              LIMITATION OF <Red>LIABILITY</Red>
            </DisplayHeading>
            <p style={para}>
              Neobotics&apos; liability under the written hardware warranty is
              limited strictly to the repair or replacement of hardware as set
              forth in Section 6.
            </p>
            <p style={para}>
              To the maximum extent permitted by applicable law, Neobotics shall
              not be liable to Buyer or any end user for any loss or damage arising
              from the installation, use, or performance of the product, including
              any indirect, special, incidental, or consequential damages, such as:
            </p>
            <DashList
              items={[
                'lost profits;',
                'loss of revenue;',
                'loss of use;',
                'loss of data;',
                'business interruption;',
                'loss of goodwill;',
                'cost of substitute goods or services.',
              ]}
            />
            <p style={para}>
              To the maximum extent permitted by applicable law, the total
              aggregate liability of Neobotics arising out of or relating to the
              sale, delivery, installation, use, or performance of the product
              shall not exceed the amount paid by Buyer for the specific product
              giving rise to the claim.
            </p>
            <p style={para}>
              Nothing in these Terms of Sale excludes or limits liability to the
              extent such exclusion or limitation is prohibited by applicable law.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 13 · No Liability for Improper Use or Unauthorized Modification ─ */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              NO LIABILITY FOR IMPROPER USE OR UNAUTHORIZED{' '}
              <Red>MODIFICATION</Red>
            </DisplayHeading>
            <p style={para}>
              To the maximum extent permitted by law, Neobotics is not responsible
              for injury, damage, or loss arising from:
            </p>
            <DashList
              items={[
                'operation on public roads or in prohibited areas;',
                'unsafe operating conditions;',
                'unauthorized modifications;',
                'integration with third-party hardware or software not approved by Neobotics;',
                'failure to follow instructions or warnings;',
                'negligent or reckless use;',
                'use in safety-critical or unlawful applications.',
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 14 · Indemnification ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>INDEMNIFICATION</Red>
            </DisplayHeading>
            <p style={para}>
              To the maximum extent permitted by law, Buyer agrees to indemnify,
              defend, and hold harmless Neobotics and its officers, directors,
              employees, volunteers, affiliates, licensors, suppliers, and service
              providers from claims, liabilities, damages, losses, and expenses,
              including reasonable attorneys&apos; fees, arising out of or related
              to:
            </p>
            <DashList
              items={[
                'Buyer’s misuse of the product;',
                'Buyer’s violation of law;',
                'Buyer’s modification, integration, or deployment of the product;',
                'injury or property damage caused by Buyer’s negligent, reckless, or unlawful conduct.',
              ]}
            />
            <p style={para}>
              If Buyer is a consumer purchaser, this section applies only to the
              extent permitted by applicable law.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 15 · Exclusive Remedies ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              EXCLUSIVE <Red>REMEDIES</Red>
            </DisplayHeading>
            <p style={para}>
              Except where prohibited by law, the remedies expressly stated in
              Section 6 are Buyer&apos;s exclusive remedies for breach of the
              limited hardware warranty.
            </p>
            <p style={para}>
              If a limitation of remedy fails of its essential purpose under
              applicable law, Buyer may have such additional remedies as the law
              provides.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 16 · Force Majeure ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              FORCE <Red>MAJEURE</Red>
            </DisplayHeading>
            <p style={para}>
              Neobotics will not be liable for delay or failure to perform arising
              from causes beyond its reasonable control, including supplier
              shortages, transportation disruptions, labor shortages, customs
              delays, severe weather, natural disasters, war, civil unrest,
              government action, public health emergencies, power outages, or
              internet disruptions.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 17 · Governing Law ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              GOVERNING <Red>LAW</Red>
            </DisplayHeading>
            <p style={para}>
              These Terms of Sale are governed by the laws of the Commonwealth of
              Massachusetts, without regard to conflict-of-laws principles, except
              to the extent superseded by applicable federal law or non-waivable
              consumer-protection law.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 18 · Dispute Resolution ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              DISPUTE <Red>RESOLUTION</Red>
            </DisplayHeading>
            <p style={para}>
              Any dispute arising out of or relating to these Terms of Sale or the
              sale of products by Neobotics shall be brought exclusively in the
              state or federal courts located in Massachusetts, unless a different
              dispute-resolution process is expressly agreed in writing.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 19 · Severability ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              <Red>SEVERABILITY</Red>
            </DisplayHeading>
            <p style={para}>
              If any provision of these Terms of Sale is found unenforceable, the
              remaining provisions will remain in full force and effect to the
              fullest extent permitted by law.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 20 · Entire Agreement ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              ENTIRE <Red>AGREEMENT</Red>
            </DisplayHeading>
            <p style={para}>
              These Terms of Sale, together with any applicable written warranty
              statement, return policy, shipping policy, and any order-specific
              written agreement signed by Neobotics, constitute the complete
              agreement governing the sale of the product.
            </p>
            <p style={para}>
              Any conflicting or additional terms proposed by Buyer, including in a
              purchase order, are rejected unless expressly accepted in writing by
              an authorized representative of Neobotics.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 21 · Contact Information ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              CONTACT <Red>INFORMATION</Red>
            </DisplayHeading>
            <DataTable
              columns={[
                { key: 'field', label: 'Field', mono: true, width: '34%' },
                { key: 'value', label: 'Detail', accent: true },
              ]}
              rows={[
                { field: 'Entity', value: 'Neobotics Foundation Inc.' },
                { field: 'Address', value: '285 3rd St., Cambridge, MA 02142' },
                {
                  field: 'Email',
                  value: (
                    <a href="mailto:support@neobotics.org" style={redLink}>
                      support@neobotics.org
                    </a>
                  ),
                },
                { field: 'Phone', value: '+1 (857) 763-8884' },
                {
                  field: 'Website',
                  value: (
                    <a href="https://www.neobotics.org" style={redLink}>
                      www.neobotics.org
                    </a>
                  ),
                },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Questions about these terms">
          If you need clarification on any provision, a signed copy of these
          Terms of Sale, or help with a warranty claim or RMA, email{' '}
          <a href="mailto:support@neobotics.org" style={redLink}>
            support@neobotics.org
          </a>{' '}
          and a member of the team will follow up.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Shipping', href: '/docs/legal/shipping' }}
        next={{ label: 'Privacy', href: '/docs/legal/privacy' }}
      />
    </DocsShell>
  );
}
