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
import { Crumbs, PrevNext, Callout, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Shipping · Legal · NeoRacer Docs',
  description:
    'The NeoRacer shipping policy: coverage, regions, processing time, delivery windows, customs, tracking, and what happens to lost or undeliverable packages.',
};

const lede: React.CSSProperties = {
  fontFamily: NB.bodyFont,
  fontSize: 16,
  lineHeight: 1.65,
  color: NB.textMutedBeige,
  maxWidth: 720,
};

const link: React.CSSProperties = { color: NB.neoboticsRed, fontWeight: 700 };

export default function ShippingPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Legal', href: '/docs/legal/warranty' },
          { label: 'Shipping' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="SHIP" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE SHIPPING <Red>POLICY.</Red>
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
              This page is a faithful rendering of the Neobotics Foundation Inc.
              Shipping Policy for the NeoRacer autonomous car kit and related
              products. It covers where we ship, how long processing and delivery
              take, who handles customs, and what happens when a package is delayed,
              lost, or undeliverable. The official PDF is the governing document. By
              placing an order with Neobotics, you agree to this Shipping Policy.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Effective 3/13/2026</ChromeBadge>
              <ChromeBadge variant="outline">Last updated 3/13/2026</ChromeBadge>
              <ChromeBadge variant="outline">Neobotics Foundation Inc.</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · Shipping coverage ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>01 / SHIPPING COVERAGE</Eyebrow>
            <DisplayHeading size="lg">
              SHIPPING <Red>COVERAGE.</Red>
            </DisplayHeading>
            <p style={lede}>
              Neobotics ships to domestic and international destinations that
              Neobotics makes available at checkout or confirms in writing at the
              time of order. Destination availability may change based on carrier
              service, export controls, customs requirements, product-specific
              restrictions, and operational feasibility, subject to the conditions
              below.
            </p>
            <DashList
              items={[
                'applicable law',
                'export control restrictions',
                'carrier availability',
                'customs restrictions',
                'product-specific limitations',
                'payment verification',
                'operational feasibility',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              Because shipping availability may change over time due to logistics
              disruptions, carrier limitations, customs rules, trade restrictions,
              or other factors, Neobotics does not guarantee permanent shipping
              availability to every country at all times. If we are unable to ship
              to your destination after an order is placed, we will notify you and,
              if appropriate, cancel the order and issue a refund for amounts paid
              that cannot be fulfilled.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Regions ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>02 / REGIONS WE COMMONLY EXPECT TO SERVE</Eyebrow>
            <DisplayHeading size="lg">
              REGIONS WE <Red>SERVE.</Red>
            </DisplayHeading>
            <p style={lede}>
              Subject to the limitations above, Neobotics expects to serve customers
              in many regions worldwide where international courier and postal
              delivery is available, including potentially:
            </p>
            <DashList
              items={[
                'United States',
                'Canada',
                'Europe',
                'United Kingdom',
                'parts of Asia',
                'Australia and New Zealand',
                'Latin America',
                'selected countries in the Middle East and Africa',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              Actual shipping availability depends on then-current destination
              coverage, carrier serviceability, customs compliance, sanctions
              screening, and any destination-specific product restrictions.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · Order processing time ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>03 / ORDER PROCESSING TIME</Eyebrow>
            <DisplayHeading size="lg">
              ORDER PROCESSING <Red>TIME.</Red>
            </DisplayHeading>
            <p style={lede}>
              Unless otherwise stated on the product page, quote, or order
              confirmation, most in-stock orders are typically processed within 2 to
              7 business days after:
            </p>
            <DashList
              items={[
                'payment is successfully received',
                'billing and shipping information is verified',
                'any required compliance or export screening is completed',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>Processing times may be longer during:</p>
            <DashList
              items={[
                'holidays',
                'product launches',
                'preorder or backorder periods',
                'severe weather events',
                'inventory shortages',
                'high-volume sales periods',
                'customs or trade disruptions',
              ]}
            />
            <Callout type="note" title="Weekends and major holidays">
              Orders are not processed, packed, or shipped on weekends or major
              holidays unless otherwise stated.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · Estimated delivery timelines ──────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>04 / ESTIMATED DELIVERY TIMELINES</Eyebrow>
            <DisplayHeading size="lg">
              ESTIMATED DELIVERY <Red>TIMELINES.</Red>
            </DisplayHeading>
            <p style={lede}>
              Delivery timelines depend on the destination country, warehouse
              location, shipping method, customs processing, and carrier
              performance. Typical estimated delivery windows after shipment are as
              follows.
            </p>

            <div style={{ marginTop: 20 }}>
              <MonoLabel>A. Domestic U.S. orders</MonoLabel>
            </div>
            <DataTable
              columns={[
                { key: 'method', label: 'Method', width: '55%' },
                { key: 'window', label: 'Estimated delivery', mono: true, accent: true },
              ]}
              rows={[
                { method: 'Standard shipping', window: '3 to 7 business days' },
                { method: 'Expedited shipping', window: '2 to 4 business days' },
              ]}
            />

            <div style={{ marginTop: 28 }}>
              <MonoLabel>B. International orders</MonoLabel>
            </div>
            <DataTable
              columns={[
                { key: 'method', label: 'Method', width: '55%' },
                { key: 'window', label: 'Estimated delivery', mono: true, accent: true },
              ]}
              rows={[
                { method: 'Express courier services', window: '5 to 12 business days' },
                { method: 'Standard international shipping', window: '7 to 21 business days' },
                { method: 'Economy or postal shipping', window: '10 to 45 business days' },
              ]}
            />

            <Callout type="warn" title="Estimates only, not guarantees">
              These are estimates only, not guarantees. Seeed Studio&apos;s own
              published shipping materials likewise indicate that lower-cost parcel
              methods can take substantially longer depending on destination and
              logistics conditions.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · Shipping methods ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>05 / SHIPPING METHODS</Eyebrow>
            <DisplayHeading size="lg">
              SHIPPING <Red>METHODS.</Red>
            </DisplayHeading>
            <p style={lede}>
              Neobotics may use one or more of the following shipping methods
              depending on the destination, package size, product type, and current
              carrier options:
            </p>
            <DashList
              items={[
                'express carriers, such as DHL, FedEx, UPS, or equivalent',
                'standard parcel carriers',
                'postal or economy services where available',
                'region-specific logistics partners',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              Available shipping options will typically appear at checkout or be
              stated in an invoice or order confirmation when applicable. Neobotics
              reserves the right to choose the shipping carrier and service level
              that best matches the selected shipping option and destination, unless
              a specific method is expressly agreed in writing.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 06 · Shipping rates ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="06" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>06 / SHIPPING RATES</Eyebrow>
            <DisplayHeading size="lg">
              SHIPPING <Red>RATES.</Red>
            </DisplayHeading>
            <p style={lede}>Shipping charges are calculated based on factors such as:</p>
            <DashList
              items={[
                'destination',
                'package dimensions and weight',
                'product type',
                'shipping speed',
                'insurance, if applicable',
                'carrier surcharges',
                'customs handling considerations',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              Shipping charges will be displayed at checkout or included in your
              invoice, quote, or order summary where applicable. Neobotics may offer
              free shipping promotions, discounted shipping, or special institutional
              shipping arrangements at its discretion.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 07 · Customs, duties, taxes ────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="07" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>07 / CUSTOMS, DUTIES, TAXES, AND IMPORT FEES</Eyebrow>
            <DisplayHeading size="lg">
              CUSTOMS AND IMPORT <Red>FEES.</Red>
            </DisplayHeading>
            <p style={lede}>
              For international orders, the customer is generally responsible for any
              applicable:
            </p>
            <DashList
              items={[
                'customs duties',
                'import taxes',
                'VAT or GST',
                'brokerage fees',
                'clearance charges',
                'other destination-country fees',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              These charges are typically imposed by the destination country and are
              not controlled by Neobotics unless expressly stated otherwise at
              checkout or in writing. Customs rules vary significantly by country,
              and import delays may occur for reasons beyond our control. Seeed
              Studio&apos;s published terms also note that customs obligations and
              trade terms can vary by shipment and destination.
            </p>
            <Callout type="note" title="Importer information for clearance">
              The customer is responsible for providing any information reasonably
              required for customs clearance, except that Neobotics does not request
              Social Security numbers in the ordinary course of business. If a
              carrier or customs authority requires importer information for
              clearance, that request may come directly from the carrier or customs
              broker rather than from Neobotics.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 08 · Shipping address accuracy ─────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="08" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>08 / SHIPPING ADDRESS ACCURACY</Eyebrow>
            <DisplayHeading size="lg">
              SHIPPING ADDRESS <Red>ACCURACY.</Red>
            </DisplayHeading>
            <p style={lede}>
              Customers are responsible for providing complete and accurate shipping
              information. Please verify:
            </p>
            <DashList
              items={[
                'recipient name',
                'institution or organization name, if applicable',
                'street address',
                'apartment, suite, lab, room, or department number',
                'city, state or province',
                'postal code',
                'country',
                'phone number',
                'email address',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              Neobotics is not responsible for delays, failed delivery, misdelivery,
              or extra charges resulting from inaccurate or incomplete shipping
              information provided by the customer. If you need to request an address
              correction, contact us immediately at{' '}
              <a href="mailto:support@neobotics.org" style={link}>
                support@neobotics.org
              </a>
              . We cannot guarantee that address changes can be made after an order
              has been submitted or shipped.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 09 · Shipment confirmation and tracking ────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="09" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>09 / SHIPMENT CONFIRMATION AND TRACKING</Eyebrow>
            <DisplayHeading size="lg">
              CONFIRMATION AND <Red>TRACKING.</Red>
            </DisplayHeading>
            <p style={lede}>
              If tracking is available for your order, Neobotics will provide
              shipment confirmation and tracking information once the order has
              shipped. Tracking updates may not appear immediately. In some cases,
              tracking information may take several business days to become active
              depending on the carrier and shipping method. Lower-cost international
              methods may show limited or delayed tracking visibility.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 10 · Delays ────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="10" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>10 / DELAYS</Eyebrow>
            <DisplayHeading size="lg">
              SHIPPING <Red>DELAYS.</Red>
            </DisplayHeading>
            <p style={lede}>
              Delivery dates are estimates only and are not guaranteed unless
              expressly stated in writing by Neobotics. Neobotics is not responsible
              for shipping delays caused by circumstances outside our reasonable
              control, including:
            </p>
            <DashList
              items={[
                'customs inspections or customs holds',
                'weather events',
                'transportation disruptions',
                'carrier capacity issues',
                'strikes or labor shortages',
                'trade restrictions',
                'public emergencies',
                'war or civil unrest',
                'inaccurate address information',
                'remote destination service limitations',
                'seasonal shipping congestion',
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 11 · Lost, stolen, or damaged packages ─────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="11" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>11 / LOST, STOLEN, OR DAMAGED PACKAGES</Eyebrow>
            <DisplayHeading size="lg">
              LOST OR DAMAGED <Red>PACKAGES.</Red>
            </DisplayHeading>
            <p style={lede}>
              If your package is lost, stolen, or arrives damaged, please contact us
              at{' '}
              <a href="mailto:support@neobotics.org" style={link}>
                support@neobotics.org
              </a>{' '}
              as soon as possible.
            </p>

            <div style={{ marginTop: 20 }}>
              <MonoLabel>Damaged shipments</MonoLabel>
            </div>
            <p style={{ ...lede, marginTop: 8 }}>If your package arrives visibly damaged:</p>
            <DashList
              items={[
                'take photos of the package and product immediately',
                'retain all packaging materials',
                'notify Neobotics promptly, preferably within 5 business days of delivery',
              ]}
            />

            <div style={{ marginTop: 24 }}>
              <MonoLabel>Lost packages</MonoLabel>
            </div>
            <p style={{ ...lede, marginTop: 8 }}>
              If tracking shows no movement for an extended period or the package
              appears lost in transit, Neobotics may, at its discretion:
            </p>
            <DashList
              items={[
                'open a carrier claim',
                'request additional information from the customer',
                'issue a replacement shipment',
                'issue a refund if appropriate',
              ]}
            />

            <div style={{ marginTop: 24 }}>
              <MonoLabel>Stolen packages</MonoLabel>
            </div>
            <p style={{ ...lede, marginTop: 8 }}>
              If tracking shows the package as delivered but you cannot locate it,
              please:
            </p>
            <DashList
              items={[
                'check with household members, coworkers, mailrooms, front desks, or campus receiving staff',
                'contact the carrier',
                'notify Neobotics',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              Neobotics is not automatically responsible for theft after confirmed
              delivery, but we may assist in carrier investigation where reasonably
              possible.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 12 · Refused, undeliverable, or unclaimed shipments ────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="12" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>12 / REFUSED, UNDELIVERABLE, OR UNCLAIMED SHIPMENTS</Eyebrow>
            <DisplayHeading size="lg">
              UNDELIVERABLE <Red>SHIPMENTS.</Red>
            </DisplayHeading>
            <p style={lede}>
              If a shipment is refused, unclaimed, returned to sender, or
              undeliverable due to customer-related issues such as:
            </p>
            <DashList
              items={[
                'incorrect address',
                'failure to pay customs fees',
                'failure to respond to carrier requests',
                'failure to receive the package',
                'local import restrictions',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              then Neobotics may deduct from any refund:
            </p>
            <DashList
              items={[
                'original shipping charges',
                'return shipping charges',
                'customs charges',
                'carrier fees',
                'restocking fees, where applicable',
              ]}
            />
            <Callout type="warn" title="Returned international shipments">
              In some cases, returned international shipments may be destroyed or
              abandoned by the carrier or customs authority rather than returned to
              origin, and no refund may be available.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 13 · Partial shipments ─────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="13" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>13 / PARTIAL SHIPMENTS</Eyebrow>
            <DisplayHeading size="lg">
              PARTIAL <Red>SHIPMENTS.</Red>
            </DisplayHeading>
            <p style={lede}>
              If your order contains multiple items, Neobotics may ship the items
              separately depending on inventory availability, warehouse location, or
              package constraints. We reserve the right to make partial shipments
              unless otherwise agreed in writing.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 14 · Preorders and backorders ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="14" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>14 / PREORDERS AND BACKORDERS</Eyebrow>
            <DisplayHeading size="lg">
              PREORDERS AND <Red>BACKORDERS.</Red>
            </DisplayHeading>
            <p style={lede}>
              If an item is listed as a preorder or backorder item, estimated ship
              dates are approximate and may change. If your order contains both
              in-stock and preorder/backorder items, we may either:
            </p>
            <DashList
              items={[
                'hold the full order until all items are available; or',
                'split the order into multiple shipments, with additional shipping charges where disclosed or agreed',
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 15 · Export compliance and destination restrictions ────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="15" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>15 / EXPORT COMPLIANCE AND DESTINATION RESTRICTIONS</Eyebrow>
            <DisplayHeading size="lg">
              EXPORT <Red>COMPLIANCE.</Red>
            </DisplayHeading>
            <p style={lede}>
              Neobotics may decline or cancel orders to destinations that are
              restricted by:
            </p>
            <DashList
              items={[
                'export control laws',
                'sanctions laws',
                'carrier embargoes',
                'customs restrictions',
                'product safety or battery transport rules',
                'internal risk review',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              We reserve the right to request additional information needed to
              complete compliance screening before shipment.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 16 · Institutional and school deliveries ───────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="16" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>16 / INSTITUTIONAL AND SCHOOL DELIVERIES</Eyebrow>
            <DisplayHeading size="lg">
              INSTITUTIONAL <Red>DELIVERIES.</Red>
            </DisplayHeading>
            <p style={lede}>
              For shipments to schools, universities, districts, camps, labs, or
              other institutions, the customer is responsible for ensuring that:
            </p>
            <DashList
              items={[
                'shipping addresses are accurate and complete',
                'receiving departments are aware of the expected delivery',
                'loading dock, mailroom, or campus delivery requirements are communicated in advance',
                'authorized personnel are available to receive the shipment',
              ]}
            />
            <p style={{ ...lede, marginTop: 16 }}>
              Neobotics is not responsible for internal routing delays within a
              school, campus, or institutional facility after delivery to the address
              provided.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 17 · Title and risk of loss ────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="17" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>17 / TITLE AND RISK OF LOSS</Eyebrow>
            <DisplayHeading size="lg">
              TITLE AND RISK OF <Red>LOSS.</Red>
            </DisplayHeading>
            <p style={lede}>
              Unless otherwise required by applicable law or expressly agreed in
              writing:
            </p>
            <DashList
              items={[
                'title to the products passes upon full payment; and',
                'risk of loss passes when the shipment is delivered to the first carrier or, where required by law, upon delivery to the destination',
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 18 · Policy changes ────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="18" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>18 / POLICY CHANGES</Eyebrow>
            <DisplayHeading size="lg">
              POLICY <Red>CHANGES.</Red>
            </DisplayHeading>
            <p style={lede}>
              Neobotics may update this Shipping Policy from time to time to reflect
              changes in shipping operations, carrier relationships, international
              coverage, legal requirements, or customer service practices. Any
              updated version will be posted with a revised Last Updated date.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 19 · Contact ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 56 }}>
          <GhostNumeral n="19" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>19 / CONTACT US</Eyebrow>
            <DisplayHeading size="lg">
              CONTACT <Red>US.</Red>
            </DisplayHeading>
            <p style={lede}>
              If you have questions about shipping, delivery estimates, customs, or
              destination availability, please contact:
            </p>
            <DashList
              items={[
                'Neobotics Foundation Inc.',
                '285 3rd St., Cambridge, MA 02142',
                <>
                  Email:{' '}
                  <a href="mailto:support@neobotics.org" style={link}>
                    support@neobotics.org
                  </a>
                </>,
                'Phone: +1 (857) 763-8884',
                <>
                  Website:{' '}
                  <a href="https://www.neobotics.org" style={link}>
                    www.neobotics.org
                  </a>
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="This page mirrors the official policy">
          The text above is a faithful rendering of the Neobotics Shipping Policy
          (effective 3/13/2026). The official PDF is the governing document. If
          anything here is unclear or appears to conflict with the PDF, email{' '}
          <a href="mailto:support@neobotics.org" style={link}>
            support@neobotics.org
          </a>{' '}
          and we will help.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Returns & refunds', href: '/docs/legal/return-and-refund' }}
        next={{ label: 'Terms of sale', href: '/docs/legal/terms-of-sale' }}
      />
    </DocsShell>
  );
}
