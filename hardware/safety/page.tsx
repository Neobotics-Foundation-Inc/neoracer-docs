import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
  DashList,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Safety · Hardware · NeoRacer Docs',
  description: 'Safety rules for running a NeoRacer indoors, in a classroom, or unsupervised.',
};

export default function SafetyPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Safety' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="!" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / SAFETY · START HERE</Eyebrow>
            <DisplayHeading size="xl">
              SAFETY <Red>RULES.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer is a small autonomous robot, and treated well it has a
              multi-year service life. A few habits keep it that way, since a
              careless run can damage the car, damage property, or, with the
              LiPo, start a fire. A few minutes here before the first run sets
              you up for all of them.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Worth a read first</ChromeBadge>
              <ChromeBadge variant="outline">Indoor only</ChromeBadge>
              <ChromeBadge variant="outline">Adult supervision for LiPo</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="danger" title="The short version">
          <strong>1.</strong> The car is happiest indoors.{' '}
          <strong>2.</strong> An adult in the room while a LiPo is charging
          catches trouble early.{' '}
          <strong>3.</strong> Humans, pets, and toddlers do best outside the
          safe zone.{' '}
          <strong>4.</strong> Disconnecting the LiPo when you stop saves the
          pack.{' '}
          <strong>5.</strong> A smell, some smoke, or any swelling is the cue to
          stop and isolate.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>01 / RULE-BY-RULE</Eyebrow>
          <DisplayHeading size="lg">
            THE FIVE <Red>RULES.</Red>
          </DisplayHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, marginTop: 22 }}>
            <NumberedFeatureCard
              n={1}
              title="Indoor only"
              lede="Indoor floors are where the car runs best."
              body={
                <>
                  The motor,{' '}
                  <InfoNote term="encoders" title="Encoders">
                    Sensors that count how far each wheel has turned. The car uses them to track its own speed and distance.
                  </InfoNote>
                  , and Jetson are not rated for moisture, sand, or grit, and outdoor runs add a property and liability question on top. A known, controlled floor keeps all of that out of the picture.
                </>
              }
            />
            <NumberedFeatureCard
              n={2}
              title="LiPo supervision"
              lede="An adult nearby during a charge is the simplest safeguard."
              body={
                <>
                  Lithium-polymer chemistry stores a lot of energy in a small package, and its failure mode is a{' '}
                  <InfoNote term="thermal runaway" title="Thermal runaway">
                    A chain reaction where a battery's own heat makes it generate more heat, until it catches fire or vents. Once it starts it is hard to stop.
                  </InfoNote>{' '}
                  that lasts under a minute. Someone in the room catches the early signs while there is still time to act.
                </>
              }
            />
            <NumberedFeatureCard
              n={3}
              title="Clear safe zone"
              lede="A driving area free of people, pets, and breakables runs smoothest."
              body="The car can hit 25 km/h, and at indoor distances that's faster than your reaction time. About 1 m of clearance from anything you care about, yourself included, gives everyone room to stay out of the way."
            />
            <NumberedFeatureCard
              n={4}
              title="Disconnect when idle"
              lede="Unplugging the LiPo's XT60 lead at the end of a session keeps the pack healthy."
              body="A connected pack trickles current through the regulators, and overnight that drains it into deep discharge territory and shortens its life. Disconnecting and storing at ~3.85 V/cell avoids all of that."
            />
            <NumberedFeatureCard
              n={5}
              title="Smell, smoke, or swelling means stop"
              lede="Any of the three is the moment to disconnect and isolate the pack."
              body="LiPo failure shows clear early signs, so moving the pack to a fire-safe location and waiting is the safe move. Sometimes 30 minutes settles it, and sometimes the pack is best retired."
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / FOR EDUCATORS</Eyebrow>
          <DisplayHeading size="lg">
            CLASSROOM <Red>SUPPLEMENTS.</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>One charging adult per ~4 students charging at once keeps eyes on every pack.</>,
              <>A dedicated, fire-safe charging spot, a concrete floor or a LiPo bag, gives the chemistry somewhere safe to fail.</>,
              <>A safe driving zone marked with tape or cones tells students where the car will and won't go.</>,
              <>A first-aid kit on site and a Class D extinguisher or sand bucket within reach cover the rare bad day.</>,
              <>A printed copy of this page in the lab means the rules are there when the screen isn't.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Electrical', href: '/docs/hardware/electrical' }}
        next={{ label: 'OS & image', href: '/docs/software/os-and-image' }}
      />
    </DocsShell>
  );
}
