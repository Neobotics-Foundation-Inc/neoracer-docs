import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { PhotoCard } from '@/components/docs/PhotoCard';
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Chassis & CAD · Hardware · NeoRacer Docs',
  description:
    'The parts that make up the NeoRacer body: the rolling chassis, the front bumper, the rear wing, and the side covers. The full mechanical design is open under CERN-OHL-S-2.0.',
};

const REPO_URL = 'https://github.com/Neobotics-Foundation-Inc/neoracer-hardware-files';

export default function ChassisAndCadPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Chassis & CAD' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="12" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE CHASSIS AND <Red>CAD</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer is a 1:12 scale autonomous racing platform, and its
              full mechanical design is open. Every part lives in a public
              repository under a reciprocal open-hardware license, so you can
              print the parts or open the CAD and modify them.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">1:12 scale</ChromeBadge>
              <ChromeBadge variant="outline">CERN-OHL-S-2.0</ChromeBadge>
              <ChromeBadge variant="red">Public repo</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 22, marginBottom: 12 }}>
          <PhotoCard
            title="The chassis"
            image="/images/build/chassis.jpg"
            fit="cover"
            bandHeight={258}
            alt="The NeoRacer rolling chassis with red oil-filled shocks and off-road wheels"
          >
            Everything starts with the rolling chassis, a 1:12 scale platform
            with real oil-filled shocks, a brushed motor, an electronic speed
            controller, and a steering servo already wired in. The bay down the
            middle is where the battery and the electronics sit.
          </PhotoCard>

          <PhotoCard
            title="The front bumper"
            image="/images/build/front-bumper-2.jpg"
            fit="cover"
            bandHeight={258}
            alt="The NeoRacer front bumper with its four mounting screws"
          >
            The front bumper bolts onto the nose with four screws and shields
            the camera, the LiDAR tower, and the front suspension in a crash.
          </PhotoCard>

          <PhotoCard
            title="The rear wing"
            image="/images/build/rear-wing-3.jpg"
            fit="cover"
            bandHeight={258}
            alt="The rear wing with its mounting arms and screws"
          >
            The rear wing bolts onto the tail with its two mounting arms and
            shields the back of the car the same way the bumper covers the
            front. Both the wing and the bumper are stock factory parts.
          </PhotoCard>

          <PhotoCard
            title="The side covers"
            image="/images/build/side-cover-2.jpg"
            fit="cover"
            bandHeight={258}
            alt="A NeoRacer-branded side cover panel"
          >
            The side covers close up the electronics bay and carry the NeoRacer
            name. They keep dust out of the wiring, and they are the simplest
            part to customize.
          </PhotoCard>
        </div>
      </ScrollReveal>

      {/* ── The repository ─────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            THE HARDWARE <Red>REPOSITORY</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The mechanical design is tracked in{' '}
            <Link href={REPO_URL} style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              neoracer-hardware-files
            </Link>
            , which holds three folders:
          </p>
          <DashList
            items={[
              <><strong>full-vehicle</strong> is the whole car: the editable FreeCAD project it is all designed in, plus exports for other CAD tools, a mesh for viewing and printing, and a 2D drawing.</>,
              <><strong>3d-printed-parts</strong> is the subset you print yourself.</>,
              <><strong>oscore-board</strong> is the electronics: the schematic, the hardware manual, and the board model.</>,
            ]}
          />
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 14 }}>
            The repository README describes every file, which one to open for
            what you are doing, and how to clone it.
          </p>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'OSCORE board', href: '/docs/hardware/oscore-board' }}
        next={{ label: 'Safety', href: '/docs/hardware/safety' }}
      />
    </DocsShell>
  );
}
