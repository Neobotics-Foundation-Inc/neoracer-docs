import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { StepCard } from '@/components/docs/StepCard';
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Dot matrix · Hardware · NeoRacer Docs',
  description:
    'The 8 by 8 LED dot matrix at the back of the car. Programs write patterns, numbers, or status text to it over the /led_matrix/command topic.',
};

export default function DotMatrixPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Dot matrix' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="09" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE DOT <Red>MATRIX</Red>
            </DisplayHeading>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">8 × 8 LEDs</ChromeBadge>
              <ChromeBadge variant="outline">Rear-mounted</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <StepCard
          title="The LED dot matrix"
          image="/images/build/dot-matrix.jpg"
          alt="The 8 by 8 LED dot matrix display in its housing"
        >
          The 8 by 8 LED dot matrix mounts at the back of the car. Programs
          write patterns, numbers, or status text to it while the car drives,
          over the /led_matrix/command topic.
        </StepCard>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Remote control', href: '/docs/hardware/remote-control' }}
        next={{ label: 'Drivetrain', href: '/docs/hardware/drivetrain' }}
      />
    </DocsShell>
  );
}
