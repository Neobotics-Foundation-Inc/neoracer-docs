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
    'The racecar_core module: create_racecar, set_start_update, go, go_async, get_delta_time, and set_update_slow_time. The program lifecycle every rc.* module hangs off.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'racecar_core.create_racecar()',
    returns: 'Racecar',
    summary:
      'Creates the rc object every program starts from. All the rc.* modules on the following pages hang off it.',
  },
  {
    sig: 'rc.set_start_update(start, update, update_slow=None)',
    returns: 'None',
    summary:
      'Registers your functions. start runs once when the program begins; update runs every frame; update_slow, if given, runs once per fixed interval.',
  },
  {
    sig: 'rc.go()',
    returns: 'None',
    summary:
      'Starts the program. Call it at the bottom of the file after set_start_update. It blocks until the program exits.',
  },
  {
    sig: 'rc.go_async()',
    returns: 'None',
    summary:
      'Starts the sensor streams in the background without taking over the program. Use it in a Jupyter Notebook: call it once in an early cell, then read the *_async methods from any later cell.',
  },
  {
    sig: 'rc.get_delta_time()',
    returns: 'float',
    summary:
      'The number of seconds the previous frame took. Use it inside update to run timers, as in the drive example.',
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
              program. Every program uses the same structure: define{' '}
              <code style={{ fontFamily: NB.monoFont }}>start</code> and{' '}
              <code style={{ fontFamily: NB.monoFont }}>update</code>, register
              them, and call <code style={{ fontFamily: NB.monoFont }}>go</code>.
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
          A notebook has no single program to hand over to, so use{' '}
          <code style={{ fontFamily: NB.monoFont }}>rc.go_async()</code> instead
          of <code style={{ fontFamily: NB.monoFont }}>rc.go()</code>. It starts
          the sensor streams in the background, and the{' '}
          <code style={{ fontFamily: NB.monoFont }}>*_async</code> methods on
          the other pages read them. Without it they return empty data.
        </Callout>
      </ScrollReveal>

      <PrevNext next={{ label: 'rc.drive', href: '/docs/api-reference/python/drive' }} />
    </DocsShell>
  );
}
