import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
  DashList,
  NumberedFeatureCard,
  Fig,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';
import { JetsonPortsDiagram } from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import Image from 'next/image';

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
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE COMPUTE <Red>STACK</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer&apos;s Jetson is its Linux computer. It runs{' '}
              <InfoNote term="ROS 2" title="ROS 2">The Robot Operating System, a framework that lets separate programs on a robot pass messages to each other. It is the standard way most robotics software is built.</InfoNote>, all Python code, the camera, and any
              neural networks deployed.
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
        <Image
          src="/images/build/jetson.jpg"
          alt="NVIDIA Jetson Orin Nano on its carrier board with cooling fan and USB ports"
          width={1536}
          height={1024}
          sizes="(max-width: 640px) 100vw, 560px"
          style={{ width: '100%', maxWidth: 560, height: 'auto', display: 'block', margin: '0 auto 18px', borderRadius: 10 }}
        />
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            THE JETSON <Red>HOST</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Runs Ubuntu 22.04 (the NeoRacer image ships pre-configured).</>,
              <>Drives the camera pipeline at 640×480 / 60 fps.</>,
              <>Provides the AI accelerator for any TensorRT, ONNX, or PyTorch model you deploy.</>,
              <>Can act as a Wi-Fi access point for direct connection. For more
                information, see{' '}
                <a href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</a>.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Fig
          label="FIG. A / JETSON PORTS"
          caption={
            <>
              Every connection on the Jetson. Power arrives from the power
              module on the DC barrel jack, the OSCORE data lead and the camera
              take two USB-A ports, and the Cudy router&apos;s LAN port connects
              over RJ45. The HDMI port carries the dummy plug whenever a
              monitor is not attached, two USB-A ports stay free for the setup
              keyboard and mouse, USB-C is unused, and the M.2 Wi-Fi card on
              the underside runs the two antennas.
            </>
          }
        >
          <JetsonPortsDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            THE MICROCONTROLLER <Red>STACK</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The Jetson handles vision and planning, leaving exact timing to
            the{' '}
            <a href="/docs/hardware/oscore-board" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>OSCORE board</a>.
            The MCU talks to the Jetson over USB through the driver node.
            Everything else lives on the Jetson, which is where you write code.
            The MCU is usually something you configure rather than program.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, marginTop: 22 }}>
            <NumberedFeatureCard n={1} title="Motor control" lede="PWM out to the ESC. Encoder counts in." body="Closed-loop velocity control runs at a fixed kHz tick so you don't see torque ripple from a stalled Python loop." />
            <NumberedFeatureCard n={2} title="Servo control" lede="Steering angle commanded over PWM." body="Trim and centre offsets are stored in flash so a re-flash of the Jetson doesn't lose your calibration." />
            <NumberedFeatureCard n={3} title="IMU fusion" lede="Fused orientation at 200 Hz." body="The MCU (microcontroller unit) does the bias subtraction and orientation fusion so the Jetson sees clean orientation+angular-rate samples on /imu, no warm-up delay." />
          </div>
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
        next={{ label: 'LiDAR', href: '/docs/hardware/sensors/lidar' }}
      />
    </DocsShell>
  );
}
