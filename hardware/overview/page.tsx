import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  Fig,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout } from '@/components/docs/DocsPrimitives';
import { WiringDiagram } from '@/components/docs/WiringDiagram';

export const metadata: Metadata = {
  title: 'Hardware overview · NeoRacer Docs',
  description: 'A single-page anatomy of the NeoRacer V1: compute, sensors, drivetrain, power, and chassis at a glance.',
};

/* The real car, torn down and knolled. Label positions are percentages of
 * the photo (placed by hand with the click-to-label tool), each part has
 * its own colour, and every label links to its page. `flip` puts the pill
 * on the left of its dot (right-edge parts, and the LiPo so it stays clear
 * of the chassis label beside it). */
const ANATOMY_PARTS: {
  name: string;
  x: number;
  y: number;
  color: string;
  href: string;
  flip?: boolean;
}[] = [
  { name: 'Front bumper', x: 47.6, y: 2.9, color: '#64748B', href: '/docs/hardware/chassis-and-cad' },
  { name: 'Camera', x: 48.9, y: 8.6, color: '#FF0033', href: '/docs/hardware/sensors/camera' },
  { name: 'Jetson Orin Nano', x: 26.8, y: 19.9, color: '#0E8A4F', href: '/docs/hardware/compute' },
  { name: 'Sidepod', x: 95.6, y: 22.7, color: '#1B2036', href: '/docs/hardware/chassis-and-cad' },
  { name: 'OSCORE PCB', x: 81.4, y: 25.9, color: '#7A3FB0', href: '/docs/hardware/oscore-board' },
  { name: '1:12 chassis', x: 54.9, y: 52.4, color: '#B45309', href: '/docs/hardware/drivetrain' },
  { name: 'LiPo compartment', x: 46.6, y: 51.9, color: '#C2185B', href: '/docs/hardware/power', flip: true },
  { name: 'LiDAR', x: 37.1, y: 78.2, color: '#0E9594', href: '/docs/hardware/sensors/lidar' },
  { name: 'Dot matrix display', x: 54.1, y: 80.6, color: '#4F46E5', href: '/docs/hardware/dot-matrix' },
  { name: 'Cudy router', x: 70.9, y: 74.9, color: '#EA580C', href: '/docs/software/networking' },
  { name: 'Rear wing', x: 53.3, y: 95.3, color: '#0284C7', href: '/docs/hardware/chassis-and-cad' },
];

function AnatomyDiagram() {
  return (
    <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto', borderRadius: 8, overflow: 'hidden' }}>
      <Image
        src="/images/build/exploded-topdown.jpg"
        alt="The NeoRacer torn down: every component laid out around the bare chassis, photographed from above"
        width={902}
        height={1800}
        sizes="(max-width: 640px) 100vw, 560px"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      {ANATOMY_PARTS.map((p, i) => {
        const flip = p.flip || p.x > 72;
        const nn = String(i + 1).padStart(2, '0');
        return (
          <Link
            key={p.name}
            href={p.href}
            className="anatomy-label"
            aria-label={`${p.name}, open its page`}
            style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)', textDecoration: 'none' }}
          >
            <span
              style={{
                display: 'block',
                width: 11,
                height: 11,
                borderRadius: '50%',
                background: p.color,
                border: '2px solid #fff',
                boxShadow: `0 0 0 1.5px ${p.color}B3`,
              }}
            />
            <span
              className="anatomy-pill"
              style={{
                position: 'absolute',
                top: -4,
                ...(flip ? { right: 16 } : { left: 16 }),
                fontFamily: NB.monoFont,
                fontSize: 'clamp(8.5px, 1.9vw, 11px)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: p.color,
                background: 'rgba(255,255,255,0.93)',
                border: `1px solid ${p.color}59`,
                borderRadius: 4,
                padding: '1.5px 6px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontWeight: 900 }}>{nn}</span> {p.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default function HardwareOverviewPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Overview' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="H" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE NEORACER <Red>HARDWARE</Red>
            </DisplayHeading>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline">380 × 300 × 220 mm</ChromeBadge>
              <ChromeBadge variant="outline">Wheelbase 280 mm</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Fig
          label="FIG. A / THE PARTS OF THE NEORACER"
          caption="Click a label to open that part's page."
        >
          <AnatomyDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <Fig
          label="FIG. B / HOW IT ALL CONNECTS"
          caption="Click a component to see how it connects and how it is powered, or a signal label to see what the letters stand for."
        >
          <WiringDiagram />
        </Fig>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="3D visualizer">
          An interactive NeoRacer is available at{' '}
          <Link href="/kits/visualize" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            /kits/visualize
          </Link>
          , where you can rotate any component, look inside it, and read its full specs.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'First program', href: '/docs/getting-started/first-program' }}
        next={{ label: 'Compute', href: '/docs/hardware/compute' }}
      />
    </DocsShell>
  );
}
