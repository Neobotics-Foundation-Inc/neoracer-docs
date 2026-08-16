import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

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
        <div style={{ marginTop: 18, background: NB.haloWhite, border: `1px solid ${NB.borderOnBeige}`, borderRadius: 10, padding: '16px 18px', boxShadow: NB.shadowCard }}>
          <div style={{ fontFamily: NB.monoFont, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: NB.textMutedBeige }}>
            Motor specs
          </div>
          <div style={{ marginTop: 8, fontFamily: NB.monoFont, fontSize: 14, lineHeight: 1.85, color: NB.textOnBeige }}>
            Type:&nbsp;&nbsp;&nbsp;&nbsp;Brushed DC w/ integrated encoder
            <br />
            No-load:&nbsp;<span style={{ color: NB.neoboticsRed }}>~11,000 RPM</span>
            <br />
            Drive:&nbsp;&nbsp;&nbsp;All four wheels, fixed reduction
            <br />
            Closed loop: MCU (microcontroller unit) velocity controller (see <a href="/docs/hardware/compute" style={{ color: NB.neoboticsRed }}>Compute</a>)
          </div>
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
        <div style={{ marginTop: 18, background: NB.haloWhite, border: `1px solid ${NB.borderOnBeige}`, borderRadius: 10, padding: '16px 18px', boxShadow: NB.shadowCard }}>
          <div style={{ fontFamily: NB.monoFont, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: NB.textMutedBeige }}>
            Servo specs
          </div>
          <div style={{ marginTop: 8, fontFamily: NB.monoFont, fontSize: 14, lineHeight: 1.85, color: NB.textOnBeige }}>
            Stall torque:&nbsp;<span style={{ color: NB.neoboticsRed }}>20 kg·cm</span>
            <br />
            Waterproof:&nbsp;&nbsp;Yes
            <br />
            Geometry:&nbsp;&nbsp;&nbsp;Ackermann linkage
            <br />
            Calibration: <a href="/docs/calibration/servo-center" style={{ color: NB.neoboticsRed }}>servo-center cookbook</a>
          </div>
        </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'IMU', href: '/docs/hardware/sensors/imu' }}
        next={{ label: 'OSCORE board', href: '/docs/hardware/oscore-board' }}
      />
    </DocsShell>
  );
}
