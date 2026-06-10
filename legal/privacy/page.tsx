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
  title: 'Privacy · Legal · NeoRacer Docs',
  description:
    'The Neobotics Privacy Policy, rendered for the NeoRacer docs. What we collect, how we use it, the service providers we rely on, retention, and your rights.',
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

export default function PrivacyPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Legal', href: '/docs/legal/warranty' },
          { label: 'Privacy' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="P" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>LEGAL / PRIVACY</Eyebrow>
            <DisplayHeading size="xl">
              THE PRIVACY <Red>POLICY.</Red>
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
              This is the Neobotics Privacy Policy, rendered for the docs so the
              text you read here matches the version on neobotics.org. It
              describes the information we collect when you use the site, how we
              use it, the service providers we rely on, how long we keep it, and
              the rights you have over it.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Neobotics Foundation Inc.</ChromeBadge>
              <ChromeBadge variant="outline">Effective April 23, 2026</ChromeBadge>
              <ChromeBadge variant="outline">Last updated 2026-04-23</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="This mirrors the published policy">
          The text below reproduces the Privacy Policy section by section. It is
          a good-faith summary of current practices, provided for transparency,
          and it is not legal advice. To request a copy or ask about any
          provision, email{' '}
          <a href="mailto:support@neobotics.org" style={redLink}>
            support@neobotics.org
          </a>
          .
        </Callout>
      </ScrollReveal>

      {/* ── 01 · Who we are ──────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <GhostNumeral n="01" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SECTION 01</Eyebrow>
            <DisplayHeading size="lg">
              WHO WE <Red>ARE.</Red>
            </DisplayHeading>
            <p style={para}>
              Neobotics Foundation Inc. (Neobotics, we, our) is a 501(c)(3)
              public charity incorporated in Massachusetts (EIN 33-4004770). This
              policy describes the information we collect when you use{' '}
              <a href="https://www.neobotics.org" style={redLink}>
                neobotics.org
              </a>{' '}
              and how we use it.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · Information we collect ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <GhostNumeral n="02" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SECTION 02</Eyebrow>
            <DisplayHeading size="lg">
              INFORMATION WE <Red>COLLECT.</Red>
            </DisplayHeading>
            <DashList
              items={[
                <>
                  <strong>Contact information you provide:</strong> name, email,
                  organization, role, and any message content when you submit an
                  interest form, pre-order, or contact us directly.
                </>,
                <>
                  <strong>Pre-order and donation information:</strong> shipping
                  address, billing address, and payment details. Payments are
                  processed by Bank of America Flex Microform and Zeffy, and we
                  do not store card numbers on our servers.
                </>,
                <>
                  <strong>Account information:</strong> if you create an account,
                  we store an email address, display name, and authentication
                  tokens via Amazon Cognito.
                </>,
                <>
                  <strong>Usage and device data:</strong> IP address, browser
                  type, device type, pages visited, referrer, and timestamps,
                  collected via Google Analytics (GA4) through Google Tag Manager
                  and by the LinkedIn Insight Tag.
                </>,
                <>
                  <strong>Cookies:</strong> first-party cookies for session
                  management and third-party cookies from Google Tag Manager,
                  GA4, LinkedIn, and payment providers. You can disable cookies
                  in your browser, though some site features may stop working.
                </>,
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · How we use it ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <GhostNumeral n="03" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SECTION 03</Eyebrow>
            <DisplayHeading size="lg">
              HOW WE USE <Red>IT.</Red>
            </DisplayHeading>
            <DashList
              items={[
                'Respond to inquiries, fulfill pre-orders, and issue tax receipts.',
                'Operate and improve the site and our educational programs.',
                'Measure site performance, marketing campaigns, and grant outcomes.',
                'Comply with legal obligations, including IRS reporting for 501(c)(3) status and tax receipts.',
              ]}
            />
            <p style={para}>
              We do not sell your personal information. We do not share it with
              third parties except the service providers listed below, or when
              legally required.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · Service providers ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <GhostNumeral n="04" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SECTION 04</Eyebrow>
            <DisplayHeading size="lg">
              SERVICE <Red>PROVIDERS.</Red>
            </DisplayHeading>
            <p style={para}>
              We rely on a small set of vetted service providers. Each maintains
              its own privacy policy, linked below.
            </p>
            <DataTable
              columns={[
                { key: 'provider', label: 'Provider', accent: true },
                { key: 'role', label: 'Role', width: '28%' },
                { key: 'policy', label: 'Privacy policy', mono: true, width: '30%' },
              ]}
              rows={[
                {
                  provider: 'AWS',
                  role: 'Hosting, auth, database',
                  policy: (
                    <a href="https://aws.amazon.com/privacy/" target="_blank" rel="noopener noreferrer" style={redLink}>
                      aws.amazon.com/privacy
                    </a>
                  ),
                },
                {
                  provider: 'Google Analytics / Tag Manager',
                  role: 'Analytics',
                  policy: (
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={redLink}>
                      policies.google.com/privacy
                    </a>
                  ),
                },
                {
                  provider: 'LinkedIn Insight Tag',
                  role: 'Campaign measurement',
                  policy: (
                    <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={redLink}>
                      linkedin.com/legal/privacy-policy
                    </a>
                  ),
                },
                {
                  provider: 'Zeffy',
                  role: 'Donations',
                  policy: (
                    <a href="https://www.zeffy.com/en-us/privacy-policy" target="_blank" rel="noopener noreferrer" style={redLink}>
                      zeffy.com/privacy-policy
                    </a>
                  ),
                },
                {
                  provider: 'Bank of America / CyberSource Flex Microform',
                  role: 'Payments',
                  policy: (
                    <a href="https://www.cybersource.com/privacy/" target="_blank" rel="noopener noreferrer" style={redLink}>
                      cybersource.com/privacy
                    </a>
                  ),
                },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · Your rights ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <GhostNumeral n="05" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SECTION 05</Eyebrow>
            <DisplayHeading size="lg">
              YOUR <Red>RIGHTS.</Red>
            </DisplayHeading>
            <p style={para}>
              You may request access to, correction of, or deletion of your
              personal information by emailing{' '}
              <a href="mailto:support@neobotics.org" style={redLink}>
                support@neobotics.org
              </a>
              .
            </p>
            <p style={para}>
              If you are a California resident (CCPA/CPRA), or a Virginia,
              Colorado, Connecticut, or Utah resident, you have additional rights
              including the right to opt out of targeted advertising. EU and UK
              residents have rights under GDPR and UK GDPR, including data
              portability and the right to withdraw consent.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 06 · Children's privacy ──────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <GhostNumeral n="06" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SECTION 06</Eyebrow>
            <DisplayHeading size="lg">
              CHILDREN&apos;S <Red>PRIVACY.</Red>
            </DisplayHeading>
            <p style={para}>
              Our educational content is designed for K-12 and undergraduate
              audiences, and we do not knowingly collect personal information
              from children under 13 without verifiable parental consent. If you
              believe a child has submitted information, email us and we will
              delete it.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 07 · Data retention and security ─────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <GhostNumeral n="07" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SECTION 07</Eyebrow>
            <DisplayHeading size="lg">
              DATA RETENTION AND <Red>SECURITY.</Red>
            </DisplayHeading>
            <p style={para}>
              We retain personal information for as long as needed to provide the
              services, meet tax and audit requirements, or enforce our
              agreements. We use industry-standard technical and organizational
              measures, including HTTPS/TLS, HSTS, and encrypted storage on AWS,
              though we cannot guarantee absolute security.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 08 · Changes to this policy ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <GhostNumeral n="08" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SECTION 08</Eyebrow>
            <DisplayHeading size="lg">
              CHANGES TO THIS <Red>POLICY.</Red>
            </DisplayHeading>
            <p style={para}>
              We may update this policy from time to time. Material changes will
              be posted here with a new last-updated date. Continued use of the
              site after changes means you accept the revised policy.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 09 · Contact ─────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={sectionStyle}>
          <GhostNumeral n="09" top={-30} right={-20} size={360} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>SECTION 09</Eyebrow>
            <DisplayHeading size="lg">
              <Red>CONTACT.</Red>
            </DisplayHeading>
            <MonoLabel>Where to reach us</MonoLabel>
            <DataTable
              columns={[
                { key: 'field', label: 'Field', mono: true, width: '34%' },
                { key: 'value', label: 'Detail', accent: true },
              ]}
              rows={[
                { field: 'Entity', value: 'Neobotics Foundation Inc.' },
                { field: 'Location', value: 'Boston, Massachusetts, USA' },
                {
                  field: 'Email',
                  value: (
                    <a href="mailto:support@neobotics.org" style={redLink}>
                      support@neobotics.org
                    </a>
                  ),
                },
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
        <Callout type="note" title="Questions about your data">
          This policy is a transparency summary, not legal advice, and it has not
          been reviewed by counsel. If you have a specific compliance question,
          want a copy of your data, or would like something deleted, email{' '}
          <a href="mailto:support@neobotics.org" style={redLink}>
            support@neobotics.org
          </a>{' '}
          and a member of the team will follow up.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Terms of sale', href: '/docs/legal/terms-of-sale' }}
        next={{ label: 'Documentation home', href: '/docs' }}
      />
    </DocsShell>
  );
}
