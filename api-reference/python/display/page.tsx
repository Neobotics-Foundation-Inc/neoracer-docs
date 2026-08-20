import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout, Code, ApiMethods, type ApiMethod } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'rc.display · Python API · NeoRacer Docs',
  description:
    'The Display module: show_text drives the dot matrix on the back of the car, and show_color_image and show_lidar open windows on the Jetson desktop.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'rc.display.show_text(text, scroll_speed=2.0)',
    returns: 'None',
    summary:
      'Shows text on the dot matrix panel on the back of the car. Text wider than the panel scrolls automatically; the firmware ignores scroll_speed.',
  },
  {
    sig: 'rc.display.clear()',
    returns: 'None',
    summary:
      'Returns the dot matrix to its idle frame. To blank the panel instead, call show_text(" ").',
  },
  {
    sig: 'rc.display.show_color_image(image)',
    returns: 'None',
    summary:
      'Opens a window on the Jetson desktop showing the given color image. Needs a display: use it at the car or over Remote desktop, not plain SSH.',
  },
  {
    sig: 'rc.display.show_lidar(samples, radius=128, max_range=1000, highlighted_samples=[])',
    returns: 'None',
    summary:
      'Opens a window on the Jetson desktop plotting a LiDAR scan top-down, with the car at the centre. Needs a display, the same as show_color_image.',
  },
];

export default function DisplayApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'rc.display' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RC.<Red>DISPLAY</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The display module writes text to the dot matrix on the back of
              the car and opens image windows on the Jetson desktop.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            <Red>METHODS</Red>
          </DisplayHeading>
          <ApiMethods methods={METHODS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <DisplayHeading size="lg">
            EXAMPLE <Red>USAGE</Red>
          </DisplayHeading>
          <Code lang="python">{`import racecar_core

rc = racecar_core.create_racecar()

def start():
    rc.display.show_text("NEO")

def update():
    pass

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="The panel shows text only">
          The dot matrix accepts text through{' '}
          <code style={{ fontFamily: NB.monoFont }}>show_text</code>. The
          pixel-level methods from the generic library,{' '}
          <code style={{ fontFamily: NB.monoFont }}>set_matrix</code>,{' '}
          <code style={{ fontFamily: NB.monoFont }}>get_matrix</code> and{' '}
          <code style={{ fontFamily: NB.monoFont }}>set_matrix_intensity</code>,
          raise{' '}
          <code style={{ fontFamily: NB.monoFont }}>NotImplementedError</code>{' '}
          on the NeoRacer.
        </Callout>
      </ScrollReveal>

      <ScrollReveal>
        <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, paddingBottom: 8 }}>
          For full documentation, visit the{' '}
          <a
            href="https://mitracecarneo.github.io/racecar-neo-library/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: NB.neoboticsRed, fontWeight: 700 }}
          >
            racecar-neo-library documentation
          </a>.
        </p>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'rc.physics', href: '/docs/api-reference/python/physics' }}
        next={{ label: 'rc.vision', href: '/docs/api-reference/python/vision' }}
      />
    </DocsShell>
  );
}
