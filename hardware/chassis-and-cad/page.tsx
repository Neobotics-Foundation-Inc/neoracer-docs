import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { PhotoCard } from '@/components/docs/PhotoCard';
import { Crumbs, PrevNext, DataTable } from '@/components/docs/DocsPrimitives';

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
          <GhostNumeral n="11" top={-30} right={-20} size={400} />
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
            The chassis is the base of the car. It comes with the shocks, the
            motor, the ESC, and the steering servo already fitted. The battery
            and the electronics sit in the bay down the middle.
          </PhotoCard>

          <PhotoCard
            title="The front bumper"
            image="/images/build/front-bumper-2.jpg"
            fit="cover"
            bandHeight={258}
            alt="The NeoRacer front bumper with its four mounting screws"
          >
            The front bumper bolts onto the nose with four screws. It protects
            the camera, the LiDAR, and the front suspension in a crash.
          </PhotoCard>

          <PhotoCard
            title="The rear wing"
            image="/images/build/rear-wing-3.jpg"
            fit="cover"
            bandHeight={258}
            alt="The rear wing with its mounting arms and screws"
          >
            The rear wing bolts onto the tail with two arms. It protects the
            back of the car.
          </PhotoCard>

          <PhotoCard
            title="The side covers"
            image="/images/build/side-cover-2.jpg"
            fit="cover"
            bandHeight={258}
            alt="A NeoRacer-branded side cover panel"
          >
            The side covers close the electronics bay and keep dust off the
            wiring.
          </PhotoCard>
        </div>
      </ScrollReveal>

      {/* ── Dimensions ─────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            THE <Red>DIMENSIONS</Red>
          </DisplayHeading>
          <DataTable
            columns={[
              { key: 'dim', label: 'Dimension', width: '38%' },
              { key: 'value', label: 'Value' },
            ]}
            rows={[
              { dim: 'Length', value: '380 mm' },
              { dim: 'Width', value: '300 mm' },
              { dim: 'Height', value: '220 mm' },
              { dim: 'Wheelbase', value: '280 mm' },
              { dim: 'Wheel diameter', value: '80 mm' },
              { dim: 'Weight', value: 'Under 3 kg' },
              { dim: 'Scale', value: '1:12' },
            ]}
          />
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
            For any measurement not listed here, open{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>
              neoracer-full-vehicle-drawing.dwg
            </code>{' '}
            in the repository. It is the fully dimensioned 2D drawing of the
            car.
          </p>
        </section>
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
        next={{ label: 'OS & image', href: '/docs/software/os-and-image' }}
      />
    </DocsShell>
  );
}
