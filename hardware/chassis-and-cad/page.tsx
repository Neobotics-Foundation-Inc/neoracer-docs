import Link from 'next/link';
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
  Fig,
  NumberedFeatureCard,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { StepCard } from '@/components/docs/StepCard';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Chassis & CAD · Hardware · NeoRacer Docs',
  description:
    'The NeoRacer mechanical design is open and version-controlled: FreeCAD master, STEP, STL, and DWG files under CERN-OHL-S-2.0, ready to print and modify.',
};

const REPO_URL = 'https://github.com/Neobotics-Foundation-Inc/neoracer-hardware-files';

/* Simple repository tree diagram, drawn so the two top-level folders and
   their files read like a file browser inside the figure frame. */
function RepoTree() {
  return (
    <svg viewBox="0 0 520 286" width="100%" style={{ display: 'block', maxWidth: 560, margin: '0 auto' }}>
      <rect x="14" y="16" width="492" height="254" rx="6" fill={NB.haloWhite} stroke={NB.tarmacBlue} strokeWidth="1.5" />
      <text x="32" y="42" fontFamily={NB.monoFont} fontSize="13" fontWeight="700" fill={NB.tarmacBlue}>
        neoracer-hardware-files/
      </text>

      {/* full-vehicle branch */}
      <line x1="40" y1="48" x2="40" y2="150" stroke={NB.tarmacBlue} strokeWidth="1" opacity="0.4" />
      {[
        { y: 70, label: 'full-vehicle/', kind: 'dir' },
        { y: 92, label: 'master.FCStd', kind: 'FreeCAD' },
        { y: 114, label: 'neoracer.step', kind: 'STEP' },
        { y: 136, label: 'parts/*.stl', kind: 'STL' },
        { y: 158, label: 'neoracer-v1.dwg', kind: 'DWG' },
      ].map((r) => {
        const isDir = r.kind === 'dir';
        const x = isDir ? 40 : 64;
        return (
          <g key={r.label}>
            <line x1={isDir ? 40 : 56} y1={r.y - 4} x2={x - 4} y2={r.y - 4} stroke={NB.tarmacBlue} strokeWidth="1" opacity="0.4" />
            <text x={x} y={r.y} fontFamily={NB.monoFont} fontSize="12.5" fontWeight={isDir ? 700 : 400} fill={isDir ? NB.tarmacBlue : NB.textOnBeige}>
              {r.label}
            </text>
            {!isDir && (
              <text x={400} y={r.y} fontFamily={NB.monoFont} fontSize="10.5" fontWeight="700" fill={NB.neoboticsRed} letterSpacing="1.5">
                {r.kind}
              </text>
            )}
          </g>
        );
      })}

      {/* 3d-printed-parts branch */}
      {[
        { y: 198, label: '3d-printed-parts/', kind: 'dir' },
        { y: 220, label: 'parts.step', kind: 'STEP' },
        { y: 242, label: 'battery-cap.stl', kind: 'STL' },
      ].map((r) => {
        const isDir = r.kind === 'dir';
        const x = isDir ? 40 : 64;
        return (
          <g key={r.label}>
            <line x1={isDir ? 40 : 56} y1={r.y - 4} x2={x - 4} y2={r.y - 4} stroke={NB.tarmacBlue} strokeWidth="1" opacity="0.4" />
            <text x={x} y={r.y} fontFamily={NB.monoFont} fontSize="12.5" fontWeight={isDir ? 700 : 400} fill={isDir ? NB.tarmacBlue : NB.textOnBeige}>
              {r.label}
            </text>
            {!isDir && (
              <text x={400} y={r.y} fontFamily={NB.monoFont} fontSize="10.5" fontWeight="700" fill={NB.neoboticsRed} letterSpacing="1.5">
                {r.kind}
              </text>
            )}
          </g>
        );
      })}
      <line x1="40" y1="176" x2="40" y2="238" stroke={NB.tarmacBlue} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

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
              The NeoRacer is a 1:12 scale autonomous racing platform, and its full
              mechanical design is open. Every part lives in a public, version-controlled
              GitHub repository under a reciprocal open-hardware license, so you can read
              the chassis, print the 3D parts, and open the CAD to modify mounts for your
              own sensors.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">1:12 scale</ChromeBadge>
              <ChromeBadge variant="outline">CERN-OHL-S-2.0</ChromeBadge>
              <ChromeBadge variant="outline">FreeCAD · STEP · STL · DWG</ChromeBadge>
              <ChromeBadge variant="red">Public repo</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <StepCard
          title="The chassis"
          image="/images/build/chassis.jpg"
          alt="The NeoRacer rolling chassis with red oil-filled shocks and off-road wheels"
        >
          Everything starts with the rolling chassis, a 1:12 scale platform with
          real oil-filled shocks, a brushed motor, an electronic speed
          controller, and a steering servo already wired in. The bay down the
          middle is where the battery and the electronics sit.
        </StepCard>
      </ScrollReveal>

      <ScrollReveal>
        <StepCard
          title="The front bumper"
          image="/images/build/front-bumper-2.jpg"
          alt="The NeoRacer front bumper with its four mounting screws"
        >
          The front bumper bolts onto the nose with four screws and shields the
          camera, the LiDAR tower, and the front suspension in a crash.
        </StepCard>
      </ScrollReveal>

      <ScrollReveal>
        <StepCard
          title="The rear wing"
          image="/images/build/rear-wing-2.jpg"
          alt="The rear wing with its mounting arms and screws"
        >
          The rear wing bolts onto the tail with its two mounting arms and
          shields the back of the car the same way the bumper covers the
          front. Both the wing and the bumper are stock factory parts.
        </StepCard>
      </ScrollReveal>

      <ScrollReveal>
        <StepCard
          title="The side covers"
          image="/images/build/side-cover-2.jpg"
          alt="A NeoRacer-branded side cover panel"
        >
          The side covers close up the electronics bay and carry the NeoRacer
          name. They keep dust out of the wiring, and they are the simplest
          part to customize.
        </StepCard>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>01 / THE REPOSITORY</Eyebrow>
          <DisplayHeading size="lg">
            THE HARDWARE <Red>REPOSITORY</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.75, color: NB.textOnBeige, maxWidth: 700 }}>
            The whole mechanical design is tracked in{' '}
            <Link href={REPO_URL} style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              Neobotics-Foundation-Inc/neoracer-hardware-files
            </Link>
            . Because it is version-controlled, you can see exactly what changed between
            revisions, fork it, and bring your edits back as a pull request. Two top-level
            folders organize everything: one for the full vehicle and one for the parts
            you print.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Fig
          label="FIG. A / REPOSITORY LAYOUT"
          caption="The full vehicle and the printable parts each live in their own folder, with the original CAD alongside neutral and printable exports."
        >
          <RepoTree />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <MonoLabel>WHAT IS IN EACH FOLDER</MonoLabel>
          <DashList
            items={[
              <span key="fv">
                <strong style={{ color: NB.textOnBeige }}>full-vehicle/</strong> holds the
                complete assembly: a FreeCAD master, a STEP export, a set of STLs, and a V1
                DWG drawing.
              </span>,
              <span key="3d">
                <strong style={{ color: NB.textOnBeige }}>3d-printed-parts/</strong> holds a
                combined STEP of the printable parts plus a standalone battery-cap STL, so you
                can go straight to the{' '}
                <InfoNote term="slicer" title="Slicer">
                  Software that turns a 3D model into the layer-by-layer instructions a 3D printer follows. You load a part, choose settings, and it produces the file the printer runs.
                </InfoNote>{' '}
                for just the bits you print.
              </span>,
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>02 / THE FOUR FORMATS</Eyebrow>
          <DisplayHeading size="lg">
            THE FOUR <Red>FORMATS</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.75, color: NB.textOnBeige, maxWidth: 700, marginBottom: 8 }}>
            Each format does one job well. The reason the repo ships all four is that a
            single file cannot be both the editable source and a print-ready{' '}
            <InfoNote term="mesh" title="Mesh">
              A 3D shape described as a surface of many small triangles, rather than as a solid model with editable dimensions. Slicers and 3D printers work from meshes.
            </InfoNote>{' '}
            at the same time, so the design is exported into the format that fits each use.
          </p>
          <DataTable
            columns={[
              { key: 'fmt', label: 'Format', mono: true, accent: true, width: '120px' },
              { key: 'role', label: 'Role' },
              { key: 'use', label: 'What you do with it' },
            ]}
            rows={[
              {
                fmt: 'FreeCAD',
                role: 'Editable master',
                use: 'Open it to change geometry, add a mount, or re-export. This is the real source.',
              },
              {
                fmt: 'STEP',
                role: 'Neutral CAD interchange',
                use: 'Import into almost any CAD tool without losing the solid model. Good for measuring or referencing.',
              },
              {
                fmt: 'STL',
                role: 'Printable mesh',
                use: 'Drop straight into a slicer to 3D print the part. Geometry only, no editing history.',
              },
              {
                fmt: 'DWG',
                role: '2D drawing',
                use: 'A flat technical drawing of the V1 vehicle for dimensions and reference.',
              },
            ]}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>03 / TWO WAYS IN</Eyebrow>
          <DisplayHeading size="lg">
            PRINT OR <Red>MODIFY</Red>
          </DisplayHeading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              marginTop: 28,
            }}
          >
            <NumberedFeatureCard
              n={1}
              title="Print the parts"
              lede="Slice and print, no CAD needed."
              body="Open the combined STEP or the battery-cap STL from 3d-printed-parts/, load it into your slicer, and print a replacement or a spare. The mesh is print-ready as published."
              codeChip="3d-printed-parts/*.stl"
            />
            <NumberedFeatureCard
              n={2}
              title="Modify the mounts"
              lede="Open the master and make it yours."
              body="Open the FreeCAD master to move a mount, fit a different sensor, or rework the chassis. Re-export an STL when you are done and print your own revision."
              codeChip="full-vehicle/master · FreeCAD"
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Large files use Git LFS">
          The FreeCAD master is large (about 154 MB), which is past GitHub&apos;s normal blob
          limit, so the big files are stored with Git LFS. If you clone the repo, install Git
          LFS first so those files come down as real CAD rather than small pointer
          placeholders.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <Eyebrow>04 / THE LICENSE</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>LICENSE</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.75, color: NB.textOnBeige, maxWidth: 700 }}>
            The design is released under the CERN-OHL-S-2.0 license, the strongly reciprocal
            variant of the CERN Open Hardware License. In plain terms, you are free to study,
            build, modify, and redistribute the design. The reciprocal part means that if you
            share a modified version, you share it back under the same terms, so improvements
            stay open for the next student. The full license text travels with the repo.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <MonoLabel>CLONE THE DESIGN</MonoLabel>
          <Code lang="bash">{`git lfs install
git clone ${REPO_URL}.git
cd neoracer-hardware-files`}</Code>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 14.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 700, marginTop: 4 }}>
            Running git lfs install once on your machine makes sure the large CAD files are
            fetched in full when you clone.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="See where the parts go">
          For how the chassis fits together with the compute, sensors, and drivetrain it
          carries, the{' '}
          <Link href="/docs/hardware/overview" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            hardware overview
          </Link>{' '}
          has a top-down anatomy of the whole vehicle. For questions about the repo,
          reach us at{' '}
          <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            support@neobotics.org
          </a>
          .
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Power', href: '/docs/hardware/power' }}
        next={{ label: 'Electrical', href: '/docs/hardware/electrical' }}
      />
    </DocsShell>
  );
}
