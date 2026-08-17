import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Drivetrain · Hardware · NeoRacer Docs',
  description: 'Ackermann steering, four-wheel drive, brushed motor at 11,000 RPM no-load, and a 20 kg waterproof high-torque servo.',
};

export default function DrivetrainPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Drivetrain' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="09" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE <Red>DRIVETRAIN</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              A traditional{' '}
              <InfoNote term="Ackermann steering" title="Ackermann steering">
                A steering layout where the two front wheels turn at slightly
                different angles so each traces a clean arc around the same
                center, the way a real car steers. It avoids the tyre scrub you
                get when both front wheels point the same way.
              </InfoNote>{' '}
              geometry with four-wheel drive,
              independent suspension, and 80 mm all-terrain tyres. Steering
              follows simple bicycle geometry.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
        <DisplayHeading size="lg">
          THE BRUSHED MOTOR + <Red>ESC</Red>
        </DisplayHeading>
        <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
          A purpose-spec brushed motor with integrated encoder. The motor
          converts electrical energy into mechanical energy to provide power.
        </p>
        <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 14 }}>
          The motor is driven by an ESC (electronic speed controller). It reads
          the control signal and adjusts the power delivered to the motor
          accordingly, which sets both the speed and the direction the motor
          turns. This is what gives precise control over the motor&apos;s speed
          and torque. The signal comes from the{' '}
          <a href="/docs/hardware/oscore-board" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            OSCORE board
          </a>
          .
        </p>
        <div style={{ marginTop: 18 }}>
          <MonoLabel>Motor specs</MonoLabel>
          <DataTable
            columns={[
              { key: 'k', label: 'Parameter', accent: true, width: '180px' },
              { key: 'v', label: 'Specification', mono: true },
            ]}
            rows={[
              { k: 'Type', v: 'Brushed DC with integrated encoder' },
              { k: 'No-load speed', v: '~11,000 RPM' },
              { k: 'Drive', v: 'All four wheels, fixed reduction' },
              { k: 'Closed loop', v: 'MCU velocity controller' },
            ]}
          />
        </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
        <DisplayHeading size="lg">
          THE STEERING <Red>SERVO</Red>
        </DisplayHeading>
        <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
          The steering servo turns the front wheels. It is much stronger than a
          car this size needs, so it will not strip its gears if the car hits a
          wall. It is also waterproof.
        </p>
        <div style={{ marginTop: 18 }}>
          <MonoLabel>Servo specs</MonoLabel>
          <DataTable
            columns={[
              { key: 'k', label: 'Parameter', accent: true, width: '180px' },
              { key: 'v', label: 'Specification', mono: true },
            ]}
            rows={[
              { k: 'Stall torque', v: '20 kg·cm' },
              { k: 'Waterproof', v: 'Yes' },
              { k: 'Geometry', v: 'Ackermann linkage' },
            ]}
          />
        </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Dot matrix', href: '/docs/hardware/dot-matrix' }}
        next={{ label: 'OSCORE board', href: '/docs/hardware/oscore-board' }}
      />
    </DocsShell>
  );
}
