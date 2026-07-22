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
  description: 'Safety rules for running a NeoRacer indoors, in a classroom, or on your own.',
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
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="danger" title="The short version">
          <strong>1.</strong> Drive indoors.{' '}
          <strong>2.</strong> Keep people and pets outside the safe zone.{' '}
          <strong>3.</strong> Disconnecting the LiPo when you stop saves the
          pack.{' '}
          <strong>4.</strong> A smell, some smoke, or any swelling is the cue to
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
                  <InfoNote term="encoder" title="Encoder">
                    A sensor on the motor shaft that counts how far the drivetrain has turned. The car uses it to track its own speed and distance.
                  </InfoNote>
                  , and Jetson are not rated for moisture, sand, or grit, and outdoor runs add a property and liability question on top. A known, controlled floor keeps all of that out of the picture.
                </>
              }
            />
            <NumberedFeatureCard
              n={2}
              title="Attended charging"
              lede="Stay in the room while a pack charges."
              body={
                <>
                  Lithium-polymer chemistry stores a lot of energy in a small package, and its failure mode is a{' '}
                  <InfoNote term="thermal runaway" title="Thermal runaway">
                    A chain reaction where a battery's own heat makes it generate more heat, until it catches fire or vents. Once it starts it is hard to stop.
                  </InfoNote>{' '}
                  that lasts under a minute. Being in the room catches the early signs while there is still time to act.
                </>
              }
            />
            <NumberedFeatureCard
              n={3}
              title="Clear safe zone"
              lede="A driving area free of people, pets, and breakables runs smoothest."
              body="The car is capped at 6 m/s, over 20 km/h, and at indoor distances that's faster than your reaction time. About 1 m of clearance from anything you care about, yourself included, gives everyone room to stay out of the way."
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
          <Eyebrow>02 / OPERATING SAFELY</Eyebrow>
          <DisplayHeading size="lg">
            BEFORE AND DURING A <Red>RUN.</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Keep hands and loose objects clear of the moving parts, the tires, servo, encoder, and drivetrain, while the car is powered, and ask bystanders to keep back too.</>,
              <>Switch the power off before you plug or unplug anything. Hot-plugging a connector can damage the board or whatever is on the other end.</>,
              <>Keep metal out of the interfaces, and don&apos;t charge or run during a thunderstorm.</>,
              <>The car&apos;s autonomous behaviour is uncertain by design, so someone should always be watching with the transmitter in reach. A flick of <code style={{ fontFamily: NB.monoFont }}>CH7</code> back to RC takes the wheel.</>,
              <>Avoid a stalled motor left under power (a locked rotor) and continuous running above 40&nbsp;°C, both of which build heat fast.</>,
            ]}
          />
          <Callout type="warn" title="If a LiPo misbehaves">
            On any swelling, smoke, or odd smell, disconnect the pack from the power
            module and move it to a ventilated, fire-safe area. Keep a Class D
            extinguisher, a fire blanket, or a sand bucket within reach wherever you
            charge or run.
          </Callout>
          <Callout type="note" title="When you contact support">
            Email{' '}
            <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>support@neobotics.org</a>{' '}
            with your serial number, what happened, the steps and conditions at the
            time, and any photos or video. It gets you a faster answer.
          </Callout>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / FOR EDUCATORS</Eyebrow>
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
