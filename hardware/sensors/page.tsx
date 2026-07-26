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
import { Crumbs, PrevNext } from '@/components/docs/DocsPrimitives';
import { SensorSuiteGrid } from '@/components/docs/SensorSuite';

export const metadata: Metadata = {
  title: 'Sensors · Hardware · NeoRacer Docs',
  description: 'The four perception sources on the NeoRacer: LiDAR, camera, IMU, and motor encoders.',
};

export default function SensorsIndexPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Sensors' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="S" top={-40} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>HARDWARE / SENSORS</Eyebrow>
            <DisplayHeading size="xl">
              THE SENSOR <Red>SUITE.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The scanner sees the room, the camera sees colour, the IMU knows
              which way is up, and the encoders count exactly how far the wheels
              turned. Between them, you have everything a basic racing stack
              needs.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">Sim ↔ car parity on all four</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <SensorSuiteGrid />
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Compute', href: '/docs/hardware/compute' }}
        next={{ label: 'LiDAR', href: '/docs/hardware/sensors/lidar' }}
      />
    </DocsShell>
  );
}
