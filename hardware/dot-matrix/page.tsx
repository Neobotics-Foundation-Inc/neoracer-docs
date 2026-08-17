import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';
import { SensorSheet } from '@/components/docs/SensorSheet';
import { Crumbs, PrevNext, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Dot matrix · Hardware · NeoRacer Docs',
  description:
    'The 8 by 8 LED dot matrix at the back of the car. Programs write characters to it through rc.display.',
};

export default function DotMatrixPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Hardware', href: '/docs/hardware/overview' },
          { label: 'Dot matrix' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="08" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE DOT <Red>MATRIX</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The dot matrix is an 8 by 8 LED display at the back of the car.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <SensorSheet
            title="The dot matrix"
            image="/images/build/dot-matrix.jpg"
            alt="The 8 by 8 LED dot matrix display in its housing"
            specs={[
              ['Module', 'MAX7219 8 × 8'],
              ['Voltage', '5V'],
              ['Input current', '320 mA'],
              ['Size', '32 × 32 × 13 mm'],
            ]}
          >
            The dot matrix is useful for debugging as programs write
            characters to it. It displays an N on boot.
          </SensorSheet>
        </section>
      </ScrollReveal>

      {/* ── Section · Using the display ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <DisplayHeading size="lg">
            USING THE <Red>DISPLAY</Red>
          </DisplayHeading>
          <p
            style={{
              fontFamily: NB.bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: NB.textMutedBeige,
              maxWidth: 720,
            }}
          >
            The MAX7219 is a common LED driver module. It works with many
            microcontrollers, so the same panel can be wired to an Arduino or
            an ESP32 in your own projects. On the NeoRacer the driver runs it
            for you, and your code writes to it through{' '}
            <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>rc.display</code>:
          </p>
          <Code lang="python">
{`rc.display.show_text("NEORACER")   # text wider than the panel scrolls
rc.display.clear()                 # return to the idle frame`}
          </Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Remote control', href: '/docs/hardware/remote-control' }}
        next={{ label: 'Drivetrain', href: '/docs/hardware/drivetrain' }}
      />
    </DocsShell>
  );
}
