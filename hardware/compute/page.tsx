import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
  Fig,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';
import { JetsonPortsDiagram } from '@/components/docs/Diagrams';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';

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
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            THE <Red>JETSON</Red>
          </DisplayHeading>
          <DashList
            items={[
              <>Sits on an open-source J401 carrier board.</>,
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
              The J401 carrier board fits an HDMI connector where the stock
              devkit has DisplayPort. The four Type-A ports are USB 3.2 at
              10 Gb/s, the RJ45 port is gigabit Ethernet, and the USB-C port
              carries data only. For more information, look{' '}
              <a
                href="https://www.seeedstudio.com/reComputer-J401-Carrier-Board-for-Jetson-Orin-NX-Orin-Nano-p-5636.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: NB.neoboticsRed, fontWeight: 700 }}
              >
                here
              </a>
              .
            </>
          }
        >
          <JetsonPortsDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The NeoRacer&apos;s base configuration is as follows:
          </p>
          <DashList
            items={[
              <>The DC power jack is fed by the power module, which connects to
                the battery.</>,
              <>The HDMI port always has a connector in it: a monitor while you
                are working at the car, or the HDMI dummy plug the car ships
                with, which keeps a desktop rendering for{' '}
                <a href="/docs/software/remote-desktop" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>remote desktop</a>.</>,
              <>One USB 3.2 port connects to the OSCORE board and one to the
                camera.</>,
              <>The other two USB 3.2 ports are free. During setup, one of
                them is used for the keyboard and mouse.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 4 }}>
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
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ paddingBottom: 36 }}>
        <Callout type="tip" title="Checking how hard the Jetson is working">
          You can run <code style={{ fontFamily: NB.monoFont }}>tegrastats</code> over
          SSH while your code is running. It reports the AI accelerator load,
          CPU per-core load, RAM, and thermal headroom in real time, and it's the
          same tool NVIDIA uses internally.
        </Callout>
        </div>
      </ScrollReveal>

      {/* ── Powering off ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            POWERING <Red>OFF</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Cutting power before the Jetson has shut down can corrupt its
            file system. Instead, we recommend following these steps:
          </p>
          <DashList
            items={[
              <>Shut down any running notebook cells or host apps like RViz.</>,
              <>Shut down the Jetson from a terminal:</>,
            ]}
          />
          <Code lang="bash">{`sudo shutdown -h now`}</Code>
          <DashList
            items={[
              <>Once the Jetson&apos;s power indicator is out, switch the car
                off.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Hardware overview', href: '/docs/hardware/overview' }}
        next={{ label: 'LiDAR', href: '/docs/hardware/sensors/lidar' }}
      />
    </DocsShell>
  );
}
