import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { StepCard } from '@/components/docs/StepCard';

export const metadata: Metadata = {
  title: 'Build overview · NeoRacer Docs',
  description:
    'Your NeoRacer arrives fully built, but it is modular. The major components and how they fit together, for when you want to swap, repair, or customize your car.',
};

export default function BuildOverviewPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Build', href: '/docs/build/overview' },
          { label: 'Overview' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 28, paddingTop: 24 }}>
          <GhostNumeral n="B" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE <Red>BUILD</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              Your NeoRacer arrives fully built and ready to drive; no assembly
              is needed. This page covers the major components for when you want
              to swap, repair, or customize something. Every major part is{' '}
              <InfoNote term="modular" title="Modular">
                Each component is its own unit that connects through a standard
                mount and connector, so you can take one off and put another on
                without touching the rest of the car.
              </InfoNote>{' '}
              so you can swap a sensor, repair a part, or rebuild the whole car
              from the chassis up.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">Ships assembled</ChromeBadge>
              <ChromeBadge variant="outline">Modular by design</ChromeBadge>
              <ChromeBadge variant="outline">4 major components</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="tip" title="You don't have to build anything">
          The car ships assembled and calibrated, so nothing on this page is
          needed before your first drive. It is a map of what is inside and how
          it connects, for when you want to change something.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 26, paddingBottom: 6 }}>
          <Eyebrow>THE WALKTHROUGH</Eyebrow>
          <DisplayHeading size="lg">
            THE MAJOR <Red>COMPONENTS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.6, color: NB.textMutedBeige, maxWidth: 720, marginBottom: 22 }}>
            Here is the car in the order it comes together, from the rolling
            chassis up to the network you use to talk to it. Each part links to
            its own page if you want the full detail.
          </p>

          <StepCard
            n="01"
            title="The LED dot matrix"
            image="/images/build/dot-matrix.jpg"
            alt="The 8 by 8 LED dot matrix display in its housing"
            href="/docs/getting-started/first-program"
            linkLabel="First program"
          >
            The 8 by 8 LED dot matrix mounts at the back of the car. Programs
            write patterns, numbers, or status text to it while the car drives,
            over the /led_matrix/command topic.
          </StepCard>

          <StepCard
            n="02"
            title="The front bumper"
            image="/images/build/front-bumper-2.jpg"
            alt="The NeoRacer front bumper with its four mounting screws"
          >
            The front bumper bolts onto the nose with four screws and shields the
            camera, the LiDAR tower, and the front suspension in a crash.
          </StepCard>

          <StepCard
            n="03"
            title="The rear wing"
            image="/images/build/rear-wing-2.jpg"
            alt="The rear wing with its mounting arms and screws"
          >
            The rear wing bolts onto the tail with its two mounting arms and
            shields the back of the car the same way the bumper covers the
            front. Both the wing and the bumper are stock factory parts.
          </StepCard>

          <StepCard
            n="04"
            title="The side covers"
            image="/images/build/side-cover-2.jpg"
            alt="A NeoRacer-branded side cover panel"
          >
            The side covers close up the electronics bay and carry the NeoRacer
            name. They keep dust out of the wiring, and they are the simplest
            part to customize.
          </StepCard>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Hardware · Safety', href: '/docs/hardware/safety' }}
        next={{ label: 'Build · Reassembly', href: '/docs/build/reassembly' }}
      />
    </DocsShell>
  );
}
