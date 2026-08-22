import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'FAQ · Troubleshooting · NeoRacer Docs',
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
        directly sell LiPo batteries. The{' '}
        <a href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          Hardware power page
        </a>{' '}
        has the specifications you need to pick a{' '}
        <InfoNote term="3S pack" title="3S Pack">
          A battery with three lithium cells wired in series. More cells in
          series means higher voltage, so the S count tells you the pack's
          voltage range.
        </InfoNote>{' '}
        that fits.
      </>
    ),
  },
  {
    group: 'kits',
    q: "Can I run the car outside?",
    a: (
      <>
        The NeoRacer is designed for indoor use on smooth surfaces. Outdoor
        running on pavement is fine for short tests, but the{' '}
        <InfoNote term="LiDAR" title="LiDAR">
          A sensor that measures distance by bouncing laser pulses off
          surfaces and timing how long they take to return. The car uses it to
          map walls and obstacles around it.
        </InfoNote>{' '}
        struggles in direct sun and the wheels were tuned for smooth gym
        floors.
      </>
    ),
  },
  {
    group: 'kits',
    q: "What's the top speed?",
    a: (
      <>
        The firmware caps the drivetrain at 6 m/s, and the driver ships with
        the full range unlocked. The caps are real parameters you can read and
        lower to derate the car for a classroom; the{' '}
        <a href="/docs/calibration/motor-trim" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          Motor trim
        </a>{' '}
        page shows where they live.
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
        Pull the driver repository and re-run the setup script, which is safe
        to run repeatedly:{' '}
        <code style={{ fontFamily: NB.monoFont }}>cd ~/ros2_ws/src/neoracer_ros2_driver && git pull && bash scripts/setup_all.sh</code>,
        then <code style={{ fontFamily: NB.monoFont }}>racecar service restart</code>.
        The car needs internet for the pull, the same way as during{' '}
        <a href="/docs/getting-started/prepare-the-car" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
          Prepare the car
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
        The clean classroom setup is one cudy router per car: each car plugs
        into its own router (Wi-Fi{' '}
        <code style={{ fontFamily: NB.monoFont }}>neoracer-[Car ID]</code>,
        password <code style={{ fontFamily: NB.monoFont }}>neobotics</code>) and
        each student reaches their car at{' '}
        <code style={{ fontFamily: NB.monoFont }}>192.168.10.100</code> on their
        own network, so there is no shared access point to overload. A car can
        also broadcast its own Wi-Fi
        (<code style={{ fontFamily: NB.monoFont }}>neoracer-1</code>, car at{' '}
        <code style={{ fontFamily: NB.monoFont }}>10.42.0.1</code>) when a router
        isn&apos;t around.
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
        <code style={{ fontFamily: NB.monoFont }}>journalctl -u neoracer-jupyter -n 60</code>
        . Most cases get diagnosed inside an hour.
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
        . The short version: one year on parts that fail under normal
        classroom use.
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
          { label: 'Troubleshooting', href: '/docs/troubleshooting/wont-power-on' },
          { label: 'FAQ' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
      <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
        <GhostNumeral n="?" top={-50} right={-20} size={440} />
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
            If a question shows up in support more than twice, it lands here
            with a canonical answer. They're grouped into four sections: kits,
            software, classroom, and support. Each answer links out to the page
            that covers it in full detail.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <ChromeBadge variant="red">
              <AnimatedNumeral value={FAQS.length} suffix=" answers" />
            </ChromeBadge>
            <ChromeBadge variant="outline">Updated continuously</ChromeBadge>
          </div>
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
          with the question. If we end up answering it more than twice, it
          joins this page so the next person doesn't have to ask.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: "Wi-Fi can't connect", href: '/docs/troubleshooting/wifi-cant-connect' }}
        next={{ label: 'Specifications', href: '/docs/reference/specifications' }}
      />
    </DocsShell>
  );
}
