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
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Safety' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="13" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              SAFETY <Red>RULES</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer is a small autonomous robot, and treated well it has
              a multi-year service life. A few habits keep it that way, since a
              careless run can damage the car or damage property. A few minutes
              here before the first run sets you up for all of them.
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
          <strong>3.</strong> Battery care lives on{' '}
          <a href="/docs/getting-started/charge-and-power" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Charge &amp; power</a>.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>01 / RULE-BY-RULE</Eyebrow>
          <DisplayHeading size="lg">
            THE GROUND <Red>RULES</Red>
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
              title="Clear safe zone"
              lede="A driving area free of people, pets, and breakables runs smoothest."
              body="The car is capped at 6 m/s, over 20 km/h, and at indoor distances that's faster than your reaction time. About 1 m of clearance from anything you care about, yourself included, gives everyone room to stay out of the way."
            />
</div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / OPERATING SAFELY</Eyebrow>
          <DisplayHeading size="lg">
            BEFORE AND DURING A <Red>RUN</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Keep hands and loose objects clear of the moving parts, the tires, servo, encoder, and drivetrain, while the car is powered, and ask bystanders to keep back too.</>,
              <>Switch the power off before you plug or unplug anything. Hot-plugging a connector can damage the board or whatever is on the other end.</>,
              <>Keep metal out of the interfaces, and don&apos;t run during a thunderstorm.</>,
              <>The car&apos;s autonomous behaviour is uncertain by design, so someone should always be watching with the transmitter in reach. A flick of <code style={{ fontFamily: NB.monoFont }}>CH7</code> back to RC takes the wheel.</>,
              <>Avoid a stalled motor left under power (a locked rotor) and continuous running above 40&nbsp;°C, both of which build heat fast.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Chassis & CAD', href: '/docs/hardware/chassis-and-cad' }}
        next={{ label: 'OS & image', href: '/docs/software/os-and-image' }}
      />
    </DocsShell>
  );
}
