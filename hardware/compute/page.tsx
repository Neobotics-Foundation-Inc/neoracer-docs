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
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'Compute · Hardware · NeoRacer Docs',
  description: 'NVIDIA Jetson Orin Nano host with 67 TOPS of AI acceleration, plus a real-time microcontroller stack for motor, servo, and IMU.',
};

export default function ComputePage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Compute' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="03" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE COMPUTE <Red>STACK</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              One Linux host runs{' '}
              <InfoNote term="ROS 2" title="ROS 2">The Robot Operating System, a framework that lets separate programs on a robot pass messages to each other. It is the standard way most robotics software is built.</InfoNote>, your Python, the camera pipeline, and
              any neural net you want to deploy. A real-time microcontroller
              stack handles motor commands and{' '}
              <InfoNote term="IMU" title="IMU">An inertial measurement unit, a chip that reports acceleration and rotation. It lets the robot sense how it is moving and which way it is pointing.</InfoNote>{' '}so the high-level loop never
              blocks the wheels.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">NVIDIA Jetson Orin Nano</ChromeBadge>
              <ChromeBadge variant="outline"><AnimatedNumeral value={67} suffix=" TOPS" /> AI accelerator</ChromeBadge>
              <ChromeBadge variant="outline">Ubuntu + ROS 2 Humble</ChromeBadge>
              <ChromeBadge variant="outline">Wi-Fi 6</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>01 / WHAT THE JETSON DOES</Eyebrow>
          <DisplayHeading size="lg">
            THE JETSON <Red>HOST</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Runs Ubuntu (the NeoRacer image ships pre-configured).</>,
              <>Hosts the ROS 2 graph, every node from FIG. A on the{' '}
                <a href="/docs/software/ros2-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>ROS 2 driver</a>{' '}
                page lives here.</>,
              <>Drives the camera pipeline at 640×480 / 60 fps.</>,
              <>Provides the AI accelerator for any TensorRT, ONNX, or PyTorch model you deploy.</>,
              <>Bridges Wi-Fi for SSH, ROS 2 topics, and OTA updates.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / WHAT THE MCU DOES</Eyebrow>
          <DisplayHeading size="lg">
            THE MICROCONTROLLER <Red>STACK</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The Jetson shines at perception and planning, but guaranteed
            real-time response is not its strength: a Python garbage-collection
            pause is longer than one control loop tick. That's where the
            microcontroller stack comes in. It streams serial frames to the
            Jetson over USB, the driver node bridges them into ROS 2, and it
            takes care of the time-critical loops the Jetson can't.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, marginTop: 22 }}>
            <NumberedFeatureCard n={1} title="Motor control" lede="PWM out to the ESC. Encoder counts in." body="Closed-loop velocity control runs at a fixed kHz tick so you don't see torque ripple from a stalled Python loop." />
            <NumberedFeatureCard n={2} title="Servo control" lede="Steering angle commanded over PWM." body="Trim and centre offsets are stored in flash so a re-flash of the Jetson doesn't lose your calibration." />
            <NumberedFeatureCard n={3} title="IMU fusion" lede="Fused orientation at 200 Hz." body="The MCU (microcontroller unit) does the bias subtraction and orientation fusion so the Jetson sees clean orientation+angular-rate samples on /imu, no warm-up delay." />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>03 / WHO LIVES WHERE</Eyebrow>
          <DisplayHeading size="lg">
            THE WORK <Red>SPLIT</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Anything where timing has to be exact lives on the MCU, and
            everything else lives on the Jetson. In practice you'll spend about
            99 % of your time writing code on the Jetson side. The MCU is
            usually something you configure rather than program.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="Want a deeper headroom check?">
          You can run <code style={{ fontFamily: NB.monoFont }}>tegrastats</code> over
          SSH while your code is running. It reports the AI accelerator load,
          CPU per-core load, RAM, and thermal headroom in real time, and it's the
          same tool NVIDIA uses internally.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Hardware overview', href: '/docs/hardware/overview' }}
        next={{ label: 'Sensors', href: '/docs/hardware/sensors' }}
      />
    </DocsShell>
  );
}
