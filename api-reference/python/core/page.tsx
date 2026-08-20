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
  title: 'racecar_core · Python API · NeoRacer Docs',
  description:
    'The racecar_core module: create_racecar, set_start_update, go, go_async, get_delta_time, and set_update_slow_time.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'racecar_core.create_racecar()',
    returns: 'Racecar',
    summary:
      'Creates the rc object.',
  },
  {
    sig: 'rc.set_start_update(start, update, update_slow=None)',
    returns: 'None',
    summary:
      'Tells the car which functions to run. The start function runs once at the beginning. The update function runs repeatedly, once per frame. The optional update_slow function runs once per second.',
  },
  {
    sig: 'rc.go()',
    returns: 'None',
    summary:
      'Starts the program. It blocks until the program exits.',
  },
  {
    sig: 'rc.go_async()',
    returns: 'None',
    summary:
      'Starts the sensor streams in the background without blocking. Used in Jupyter Notebooks instead of go, so the *_async methods return data.',
  },
  {
    sig: 'rc.get_delta_time()',
    returns: 'float',
    summary:
      'Returns the number of seconds the previous frame took.',
  },
  {
    sig: 'rc.set_update_slow_time(time=1.0)',
    returns: 'None',
    summary: 'Sets the interval in seconds between calls to update_slow.',
  },
];

export default function CoreApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'racecar_core' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RACECAR_<Red>CORE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The racecar_core module creates the car object and runs your
              program.
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
    rc.drive.stop()

def update():
    # runs every frame
    pass

def update_slow():
    # runs once per second by default
    print("still driving")

rc.set_start_update(start, update, update_slow)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="In a Jupyter Notebook">
          In a Jupyter Notebook, call{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc.go_async()</code> once
          before reading any{' '}
          <code style={{ fontFamily: NB.monoFont }}>*_async</code> method.
          Without it they return empty data.
        </Callout>
      </ScrollReveal>

      <PrevNext next={{ label: 'rc.drive', href: '/docs/api-reference/python/drive' }} />
    </DocsShell>
  );
}
