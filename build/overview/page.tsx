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
    'Your NeoRacer arrives fully built, but it is modular. This is a friendly tour of the major components and how they fit together, for when you want to swap, repair, or customize your car.',
};

export default function BuildOverviewPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Build', href: '/docs/build/overview' },
          { label: 'Overview' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 28, paddingTop: 24 }}>
          <GhostNumeral n="B" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>BUILD / OVERVIEW</Eyebrow>
            <DisplayHeading size="xl">
              THE <Red>BUILD.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              Your NeoRacer arrives fully built and ready to drive, so you never
              have to assemble one to get going. We put this walkthrough together
              for the curious, and for anyone who wants to make the car their own.
              Every major part is{' '}
              <InfoNote term="modular" title="Modular">
                Each component is its own unit that connects through a standard
                mount and connector, so you can take one off and put another on
                without touching the rest of the car.
              </InfoNote>{' '}
              which means that once you can see how it all fits together, swapping
              a sensor, repairing a part, or rebuilding the whole thing from the
              chassis up becomes something you can actually do.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">Ships assembled</ChromeBadge>
              <ChromeBadge variant="outline">Modular by design</ChromeBadge>
              <ChromeBadge variant="outline">10 major components</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="tip" title="You don't have to build anything">
          The car ships assembled and calibrated, so nothing on this page is
          needed before your first drive. Think of it as a map of what is inside
          and how it connects, handy for the day you want to change something.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 26, paddingBottom: 6 }}>
          <Eyebrow>THE WALKTHROUGH</Eyebrow>
          <DisplayHeading size="lg">
            THE MAJOR <Red>COMPONENTS.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.6, color: NB.textMutedBeige, maxWidth: 720, marginBottom: 22 }}>
            Here is the car in the order it comes together, from the rolling
            chassis up to the network you use to talk to it. Each part links to
            its own page if you want the full detail.
          </p>

          <StepCard
            n="01"
            title="The chassis"
            image="/images/build/chassis.jpg"
            alt="The NeoRacer rolling chassis with red oil-filled shocks and off-road wheels"
            href="/docs/hardware/chassis-and-cad"
            linkLabel="Chassis & CAD"
          >
            Everything starts with the rolling chassis, a 1:12 scale platform with
            real oil-filled shocks, a brushed motor, an electronic speed
            controller, and a steering servo already wired in. The bay down the
            middle is where the battery and the electronics sit.
          </StepCard>

          <StepCard
            n="02"
            title="Jetson Orin Nano"
            image="/images/build/jetson.jpg"
            alt="NVIDIA Jetson Orin Nano on its carrier board with cooling fan and USB ports"
            href="/docs/hardware/compute"
            linkLabel="Compute"
          >
            The NVIDIA Jetson Orin Nano is the brain. It runs Linux, your Python,
            and the heavier vision and learning work, and it talks to the rest of
            the car over USB.
          </StepCard>

          <StepCard
            n="03"
            title="The OSCORE control board"
            image="/images/build/oscore-pcb-2.jpg"
            alt="The OSCORE ESP32-S3 control board with its wiring harness"
            href="/docs/hardware/oscore-board"
            linkLabel="OSCORE board"
          >
            The OSCORE board is the bridge between the brain and the moving parts.
            Built around an ESP32-S3, it takes the Jetson's commands and turns them
            into the signals that drive the motor and steer the servo, and it
            sends the IMU and wheel data back the other way. The harness you see
            here carries power in and every control line out.
          </StepCard>

          <StepCard
            n="04"
            title="LakiBeam L1 LiDAR"
            image="/images/build/lidar-2.jpg"
            alt="The LakiBeam L1 spinning LiDAR unit on its mount"
            href="/docs/hardware/sensors/lidar"
            linkLabel="LiDAR"
          >
            The LakiBeam L1 rides up at the nose and spins a laser around to map the
            walls and obstacles near the car. It is what lets the NeoRacer follow a
            wall, find a gap, and race a track it has never seen before. It sits on
            a short tower and connects back to the Jetson over USB.
          </StepCard>

          <StepCard
            n="05"
            title="The camera"
            image="/images/build/camera-2.jpg"
            alt="The NeoRacer camera in its printed front housing"
            href="/docs/hardware/sensors/camera"
            linkLabel="Camera"
          >
            The camera looks forward from a printed housing just behind the LiDAR.
            It is the car's eyes for lane following, colour and object detection,
            and anything else you want to teach it to see. A single ribbon runs it
            straight to the Jetson.
          </StepCard>

          <StepCard
            n="06"
            title="The LED dot matrix"
            image="/images/build/dot-matrix.jpg"
            alt="The 8 by 8 LED dot matrix display in its housing"
            href="/docs/getting-started/first-program"
            linkLabel="First program"
          >
            The 8 by 8 LED dot matrix is the car's face. It is the friendliest
            thing to program on day one, a little grid you can light up with
            patterns, numbers, or whatever status you want the car to show while it
            drives.
          </StepCard>

          <StepCard
            n="07"
            title="The front bumper"
            image="/images/build/front-bumper-2.jpg"
            alt="The NeoRacer front bumper with its four mounting screws"
          >
            The front bumper takes the hits. It bolts onto the nose with four
            screws and shields the camera, the LiDAR tower, and the front
            suspension when an early lap meets a wall. It is also one of the
            simplest parts to print again if you ever fancy a different shape.
          </StepCard>

          <StepCard
            n="08"
            title="The rear wing"
            image="/images/build/rear-wing-2.jpg"
            alt="The 3D-printed rear wing with its mounting arms and screws"
          >
            The rear wing bolts onto the tail with its two mounting arms. It
            finishes the racing silhouette and shields the back of the car the
            same way the bumper covers the front. Like the bumper, it is a
            printed part, so a custom wing is a fun first CAD project for your
            car.
          </StepCard>

          <StepCard
            n="09"
            title="The side covers"
            image="/images/build/side-cover-2.jpg"
            alt="A NeoRacer-branded side cover panel"
          >
            The side covers close up the electronics bay and carry the NeoRacer
            name. They keep dust and stray fingers out of the wiring, and they make
            an easy first canvas when you want to give your car its own look.
          </StepCard>

          <StepCard
            n="10"
            title="The network"
            image="/images/build/router-2.jpg"
            alt="The Cudy travel router that puts the car and laptop on one network"
            href="/docs/software/networking"
            linkLabel="Networking"
          >
            The kit includes a small travel router so the car and your laptop can
            share one network straight out of the box, no cables needed. Power it
            on, join its Wi-Fi, and you can reach the car's notebook interface and
            start sending it code. The networking page has the exact names and
            addresses.
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
