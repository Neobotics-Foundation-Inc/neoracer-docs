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
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

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
              independent suspension, and 80 mm all-terrain tyres.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">Ackermann steering</ChromeBadge>
              <ChromeBadge variant="outline">Four-wheel drive</ChromeBadge>
              <ChromeBadge variant="outline">
                <AnimatedNumeral value={280} prefix="Wheelbase " suffix=" mm" />
              </ChromeBadge>
              <ChromeBadge variant="outline">
                <AnimatedNumeral value={80} prefix="Tyres ≤ " suffix=" mm" />
              </ChromeBadge>
              <ChromeBadge variant="red">
                <AnimatedNumeral value={6} prefix="Capped at " suffix=" m/s" />
              </ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>01 / MOTOR</Eyebrow>
        <DisplayHeading size="lg">
          THE BRUSHED <Red>MOTOR</Red>
        </DisplayHeading>
        <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
          A purpose-spec brushed motor with integrated encoder. The motor
          converts electrical energy into mechanical energy to provide power.
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
          <Eyebrow>02 / SERVO</Eyebrow>
        <DisplayHeading size="lg">
          THE STEERING <Red>SERVO</Red>
        </DisplayHeading>
        <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
          The steering servo is heavily over-specified for a 380 mm car. That
          margin is intentional, you can hit a wall at modest speed and the
          servo will not strip its gears. It's also waterproof, which mostly
          matters for spilled drinks in classroom labs.
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

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / KINEMATICS</Eyebrow>
        <DisplayHeading size="lg">
          STEERING <Red>KINEMATICS</Red>
        </DisplayHeading>
        <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
          Steering follows simple bicycle geometry: steering angle{' '}
          <code style={{ fontFamily: NB.monoFont }}>δ</code> and wheelbase{' '}
          <code style={{ fontFamily: NB.monoFont }}>L = 280 mm</code> give path
          curvature κ = tan(δ) / L. That kinematic relation is the low-speed
          baseline, and the Playground&apos;s 2D hub runs on it directly. The 3D
          challenge sim now goes further and models the car as a{' '}
          <InfoNote term="dynamic bicycle" title="Dynamic bicycle model">
            A bicycle model with real tyre behaviour: each tyre makes force from
            its slip angle, bounded by a friction circle, with weight shifting
            fore-aft and side to side under throttle and cornering, plus a light
            sprung mass that pitches and rolls. It captures the slide and
            understeer a kinematic model can&apos;t.
          </InfoNote>, tuned to the real RC car&apos;s mildly understeering feel.
          Pure-pursuit or{' '}
          <InfoNote term="MPC" title="MPC">
            Model Predictive Control. A controller that predicts the car's
            motion a short way into the future and picks the steering and
            throttle that best follow the planned path. It runs that prediction
            again every cycle as new sensor data arrives.
          </InfoNote>{' '}controllers
          written for F1TENTH still carry over directly; the dynamic model just
          means tyre slip and weight transfer show up at the limit, the way they
          do on the real car.
        </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="warn" title="Tyre choice changes lap times">
          Hard plastic floors and the stock tyres give roughly 0.7 g of lateral
          grip. Carpet cuts that in half. So when a wall-follow controller is
          smooth in the sim but oscillates on carpet, slip is usually the
          culprit, and checking that first tends to save you a round of
          gain-tuning.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'IMU', href: '/docs/hardware/sensors/imu' }}
        next={{ label: 'Power', href: '/docs/hardware/power' }}
      />
    </DocsShell>
  );
}
