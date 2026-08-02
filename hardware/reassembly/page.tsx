import Link from 'next/link';
import Image from 'next/image';
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
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Reassembly · Hardware · NeoRacer Docs',
  description:
    'The step-by-step guide for putting a NeoRacer back together after a teardown. In progress; the photo sequence below already covers the full reassembly order.',
};

const STEPS: {
  n: string;
  title: string;
  image: string;
  alt: string;
  body: string;
  href?: string;
  linkLabel?: string;
}[] = [
  {
    n: '01',
    title: 'The chassis',
    image: '/images/build/steps/step-01-chassis.jpg',
    alt: 'The bare rolling chassis with its rear shock tower and oil-filled shocks',
    body: 'Reassembly starts where the component tour starts, with the rolling chassis. Set it on a clear table with the rear shock tower facing you. Everything from here bolts onto this frame.',
  },
  {
    n: '02',
    title: 'The front end',
    image: '/images/build/steps/step-02-front-end.jpg',
    alt: 'The front bumper and printed upper bracket seated over the red front shock tower',
    body: 'The front bumper and the printed upper bracket come together at the front shock tower. Seat the bracket over the tower, start every screw, and then tighten them down evenly.',
  },
  {
    n: '03',
    title: 'The camera mount',
    image: '/images/build/steps/step-03-camera-mount.jpg',
    alt: 'The empty camera bracket on the front end, open side facing forward',
    body: 'With the front end together, the camera bracket goes on top with its open side facing forward, ready to take the camera box.',
  },
  {
    n: '04',
    title: 'The camera',
    image: '/images/build/steps/step-04-camera.jpg',
    alt: 'The camera box mounted in its bracket with the lens facing forward',
    body: 'The camera box drops into the bracket, lens forward. Leave its cable free for now; it connects once the top layer goes on.',
    href: '/docs/hardware/sensors/camera',
    linkLabel: 'Camera',
  },
  {
    n: '05',
    title: 'The mid section',
    image: '/images/build/steps/step-05-mid-section.jpg',
    alt: 'The printed mid section with its orange battery lid held above the chassis',
    body: 'The printed mid section, with its orange battery lid, lowers onto the chassis as one piece and screws down to the chassis plate.',
  },
  {
    n: '06',
    title: 'The board wiring',
    image: '/images/build/steps/step-06-pcb-wiring.jpg',
    alt: "The OSCORE board's harness routed along the underside of the mid section",
    body: "The OSCORE board's harness routes along the underside of the mid section, with the USB leads left out to meet the Jetson.",
    href: '/docs/hardware/oscore-board',
    linkLabel: 'OSCORE board',
  },
  {
    n: '07',
    title: 'The LiDAR',
    image: '/images/build/steps/step-07-lidar.jpg',
    alt: 'The LiDAR unit and its four screws beside the printed top plate',
    body: 'The top layer starts with the LiDAR. Four screws fasten it onto the printed top plate, scanner up.',
    href: '/docs/hardware/sensors/lidar',
    linkLabel: 'LiDAR',
  },
  {
    n: '08',
    title: 'The Jetson',
    image: '/images/build/steps/step-08-jetson-ready.jpg',
    alt: 'The top plate with the LiDAR set, beside the Jetson Orin Nano and its four screws',
    body: 'With the LiDAR set in the plate, the Jetson Orin Nano lines up beside it with its four screws.',
    href: '/docs/hardware/compute',
    linkLabel: 'Compute',
  },
  {
    n: '09',
    title: 'The top plate',
    image: '/images/build/steps/step-09-top-plate.jpg',
    alt: 'The loaded top plate with the LiDAR in place and the Jetson Orin Nano mounted beside it',
    body: 'The Jetson screws down, fan up, ports facing the rear, and the loaded top plate goes onto the car.',
  },
  {
    n: '10',
    title: 'The chassis screws',
    image: '/images/build/steps/step-10-chassis-screws.jpg',
    alt: 'The two long screws on the rear deck that fasten the lower printed section to the chassis',
    body: 'At the tail, the two long screws run through the lower printed section and into the chassis, tying the printed body to the frame.',
  },
  {
    n: '11',
    title: 'The layer screws',
    image: '/images/build/steps/step-11-layer-screws.jpg',
    alt: 'The two screws and washers that fasten the top layer to the lower printed section',
    body: 'The next two screws, with their washers, attach the top layer to the lower printed section.',
  },
  {
    n: '12',
    title: 'The dot matrix',
    image: '/images/build/steps/step-12-dot-matrix.jpg',
    alt: 'The 8 by 8 dot matrix mounted at the tail of the top stack, facing backwards',
    body: 'The dot matrix mounts at the tail of the top stack, facing backwards, so the car keeps its face.',
  },
  {
    n: '13',
    title: 'The side covers',
    image: '/images/build/steps/step-13-side-covers.jpg',
    alt: 'The NeoRacer side cover mounted on the finished car',
    body: 'The side covers close the electronics bay and put the name back on the car.',
  },
  {
    n: '14',
    title: 'Back in one piece',
    image: '/images/build/steps/step-14-complete.jpg',
    alt: 'The fully reassembled NeoRacer, low studio angle, with the camera, LiDAR, and rear wing all mounted',
    body: "That's the build. Camera up front, LiDAR on top, wing on the tail, and a car that is ready to drive the moment a charged battery goes in.",
    href: '/docs/getting-started/charge-and-power',
    linkLabel: 'Charge & power',
  },
];

/* Full-bleed: stretch past the 920px reading column to the main column's
   width (100cqi, set up in DocsShell), with a small gutter. Browsers without
   container-query units simply keep the normal column width. */
const bleed: React.CSSProperties = {
  marginLeft: 'calc((100% - 100cqi) / 2 + 18px)',
  marginRight: 'calc((100% - 100cqi) / 2 + 18px)',
};

export default function ReassemblyPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Reassembly' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 28, paddingTop: 24 }}>
          <GhostNumeral n="16" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE <Red>REASSEMBLY</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              Taking the car apart is half the fun of a modular platform, and
              this page is the way back. It walks the NeoRacer from a pile of
              parts to a rolling car, one step at a time, with a photo at every
              stage so you always know what done looks like. The{' '}
              <Link href="/docs/hardware/overview" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
                hardware overview
              </Link>{' '}
              is the companion page if you want to know what each part does
              before you bolt it back on.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">In progress</ChromeBadge>
              <ChromeBadge variant="outline">Photo per step</ChromeBadge>
              <ChromeBadge variant="outline">Full guide in progress</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="This guide is still being finalized">
          The photo sequence below is live, and the finished guide, with the
          exact fastener details for every step, lands here as it is written.
          The{' '}
          <Link href="/docs/hardware/overview" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            hardware overview
          </Link>{' '}
          covers what each part does, and{' '}
          <a href="mailto:support@neobotics.org" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            support@neobotics.org
          </a>{' '}
          is happy to walk you through a specific step in the meantime.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingTop: 28, paddingBottom: 40 }}>
          <Eyebrow>THE STEPS</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>SEQUENCE</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.6, color: NB.textMutedBeige, maxWidth: 720, marginBottom: 22 }}>
            The build runs nose to tail: chassis, front end, camera, the
            printed mid section with its electronics, the top plate with the
            sensors, the screws that tie the layers down, and the covers to
            close it up.
          </p>

          <div style={bleed}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" style={{ gap: 16 }}>
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="border border-[#EBE3DA] hover:border-[#FF0033] hover:-translate-y-1 transition-all duration-200"
                  style={{
                    background: NB.haloWhite,
                    borderRadius: 12,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '4 / 3', background: '#f1ece3' }}>
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        background: NB.neoboticsRed,
                        color: NB.haloWhite,
                        fontFamily: NB.headingFont,
                        fontSize: 13,
                        fontWeight: 900,
                        letterSpacing: '0.06em',
                        padding: '3px 9px',
                        borderRadius: 5,
                      }}
                    >
                      {s.n}
                    </span>
                  </div>
                  <div style={{ padding: '13px 15px 15px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: NB.headingFont,
                        fontSize: 16.5,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                        color: NB.textOnBeige,
                        margin: '0 0 6px',
                      }}
                    >
                      {s.title}
                    </h3>
                    <p style={{ fontFamily: NB.bodyFont, fontSize: 13.5, lineHeight: 1.55, color: NB.textMutedBeige, margin: 0 }}>
                      {s.body}
                    </p>
                    {s.href && (
                      <Link
                        href={s.href}
                        style={{
                          marginTop: 'auto',
                          paddingTop: 10,
                          fontFamily: NB.monoFont,
                          fontSize: 11.5,
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: NB.neoboticsRed,
                          textDecoration: 'none',
                        }}
                      >
                        {s.linkLabel} →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Safety', href: '/docs/hardware/safety' }}
        next={{ label: 'OS & image', href: '/docs/software/os-and-image' }}
      />
    </DocsShell>
  );
}
