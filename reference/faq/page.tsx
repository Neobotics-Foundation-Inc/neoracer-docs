import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'FAQ · Reference · NeoRacer Docs',
  description:
    'Questions that get asked enough that they deserve a single canonical answer. Battery choice, ROS 1 support, Windows compatibility, classroom counts, more.',
};

type Faq = {
  q: string;
  a: React.ReactNode;
  group: 'kits' | 'software' | 'classroom' | 'support';
};

const FAQS: Faq[] = [
  {
    group: 'kits',
    q: "Why doesn't the kit include a battery?",
    a: (
      <>
        Due to various international shipping regulations, Neobotics does not
        directly sell LiPo batteries.{' '}
        <a href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          Charge &amp; power
        </a>{' '}
        has the specifications you need to pick a 3S pack that fits.
      </>
    ),
  },
  {
    group: 'kits',
    q: "Can I run the car outside?",
    a: (
      <>
        The NeoRacer is designed for indoor use on smooth surfaces. Short
        tests on pavement are fine, but the LiDAR does not read reliably in
        direct sunlight and the wheels are tuned for smooth indoor floors.
      </>
    ),
  },
  {
    group: 'kits',
    q: "What's the top speed?",
    a: (
      <>
        The firmware caps the drivetrain at 6 m/s, and the driver ships with
        the full range unlocked. The caps can be lowered for a classroom; the{' '}
        <a href="/docs/api-reference/ros2/params" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          ROS 2 params
        </a>{' '}
        page lists them.
      </>
    ),
  },
  {
    group: 'software',
    q: 'Does it support ROS 1?',
    a: (
      <>
        No. The on-car stack is ROS 2 Humble. Bridging from ROS 1 is possible
        through the ros1_bridge tool, but we don't ship or support that path.
      </>
    ),
  },
  {
    group: 'software',
    q: 'Can I develop on Windows?',
    a: (
      <>
        Yes, but indirectly. You write Python on Windows, push to the car
        over SSH, and run on the car's Ubuntu. The{' '}
        <a
          href="https://playground.neobotics.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: NB.neoboticsRed, fontWeight: 700 }}
        >
          NeoRacer Playground
        </a>{' '}
        runs in any modern browser, so you can build and iterate fully on
        Windows before touching the car.
      </>
    ),
  },
  {
    group: 'software',
    q: 'How do I update the on-car software?',
    a: (
      <>
        Run <code style={{ fontFamily: NB.monoFont }}>racecar update</code> on
        the car. It pulls the latest driver, reruns setup, and restarts the
        services. The car needs internet, as during{' '}
        <a href="/docs/getting-started/prepare-the-car" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          Prepare the car
        </a>. Details are on{' '}
        <a href="/docs/api-reference/cli/setup" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          CLI &middot; Maintenance
        </a>.
      </>
    ),
  },
  {
    group: 'software',
    q: 'Will my F1TENTH code run on NeoRacer?',
    a: (
      <>
        Yes. The ROS 2 topic names and message types match the F1TENTH
        reference build, so your existing nodes run on a NeoRacer unchanged.
      </>
    ),
  },
  {
    group: 'classroom',
    q: 'How do multiple cars share one classroom?',
    a: (
      <>
        Use one cudy router per car. Each student joins their own car&apos;s
        network, so there is no shared access point to overload. Addresses and
        setup are on{' '}
        <a href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          Networking
        </a>.
      </>
    ),
  },
  {
    group: 'support',
    q: 'Where do I file a bug?',
    a: (
      <>
        Email{' '}
        <a
          href="mailto:support@neobotics.org"
          style={{ color: NB.neoboticsRed, fontWeight: 700 }}
        >
          support@neobotics.org
        </a>{' '}
        with the car's serial number and, if relevant, the output of{' '}
        <code style={{ fontFamily: NB.monoFont }}>racecar status</code> and{' '}
        <code style={{ fontFamily: NB.monoFont }}>journalctl -u neoracer-teleop -n 60</code>.
      </>
    ),
  },
  {
    group: 'support',
    q: "Where's the warranty page?",
    a: (
      <>
        Under{' '}
        <a href="/docs/legal/warranty" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          Legal → Warranty
        </a>
        . The short version: nine months from delivery, covering defects
        under normal use.
      </>
    ),
  },
];

const GROUP_LABELS: Record<Faq['group'], string> = {
  kits: 'KITS & HARDWARE',
  software: 'SOFTWARE',
  classroom: 'CLASSROOM',
  support: 'SUPPORT',
};

function QnA({ f }: { f: Faq }) {
  return (
    <div
      style={{
        background: NB.haloWhite,
        border: `1px solid ${NB.borderOnBeige}`,
        borderRadius: 12,
        padding: '18px 20px',
        boxShadow: '0 3px 0 -1px rgba(27,32,54,0.06), 0 10px 22px -8px rgba(27,32,54,0.14)',
      }}
    >
      <div
        style={{
          fontFamily: NB.headingFont,
          fontSize: 17,
          fontWeight: 700,
          color: NB.textOnBeige,
          marginBottom: 8,
          letterSpacing: '0.01em',
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
        }}
      >
        <span
          aria-hidden
          style={{
            fontFamily: NB.monoFont,
            fontSize: 11,
            fontWeight: 700,
            color: NB.neoboticsRed,
            letterSpacing: '0.16em',
          }}
        >
          Q.
        </span>
        {f.q}
      </div>
      <div
        style={{
          fontFamily: NB.bodyFont,
          fontSize: 14.5,
          lineHeight: 1.65,
          color: NB.textMutedBeige,
          paddingLeft: 28,
        }}
      >
        {f.a}
      </div>
    </div>
  );
}

export default function FaqPage() {
  const groups: Faq['group'][] = ['kits', 'software', 'classroom', 'support'];
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Reference', href: '/docs/reference/safety' },
          { label: 'FAQ' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
      <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
        <GhostNumeral n="05" top={-50} right={-20} size={440} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <DisplayHeading size="xl">
            FREQUENTLY ASKED <Red>QUESTIONS</Red>
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
            Answers to common questions about the NeoRacer.
          </p>
        </div>
      </section>
      </MouseFollowGlow>

      {groups.map((g) => {
        const items = FAQS.filter((f) => f.group === g);
        if (!items.length) return null;
        return (
          <ScrollReveal key={g}>
            <section style={{ paddingBottom: 36 }}>
              <MonoLabel>{GROUP_LABELS[g]}</MonoLabel>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 12,
                  marginTop: 10,
                }}
              >
                {items.map((f) => (
                  <QnA key={f.q} f={f} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        );
      })}

      <ScrollReveal>
        <Callout type="tip" title="Don't see your question?">
          Email{' '}
          <a
            href="mailto:support@neobotics.org"
            style={{ color: NB.neoboticsRed, fontWeight: 700 }}
          >
            support@neobotics.org
          </a>{' '}
          with the question.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Passwords', href: '/docs/reference/passwords' }}
        next={{ label: 'Warranty', href: '/docs/legal/warranty' }}
      />
    </DocsShell>
  );
}
