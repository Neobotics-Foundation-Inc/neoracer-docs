import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Code, ApiMethods, type ApiMethod } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'racecar_core · Python API · NeoRacer Docs',
  description:
    'The racecar_core module: create_racecar, set_start_update, go, go_async, get_delta_time, and set_update_slow_time.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'racecar_core.create_racecar(isSimulation: bool | None = None)',
    returns: 'Racecar',
    summary:
      'Creates a racecar object.',
  },
  {
    sig: 'rc.set_start_update(start: Callable[[], None], update: Callable[[], None], update_slow: Callable[[], None] | None = None)',
    returns: 'None',
    summary: (
      <>
        Sets a <code style={{ fontFamily: NB.monoFont }}>start</code> function to run once at the beginning, an{' '}
        <code style={{ fontFamily: NB.monoFont }}>update</code> function to run repeatedly, once per frame, and an
        optional <code style={{ fontFamily: NB.monoFont }}>update_slow</code> function that runs once per set interval
        (default one second). The argument functions should not take any
        parameters.
      </>
    ),
  },
  {
    sig: 'rc.go()',
    returns: 'None',
    summary:
      'Starts the program. It blocks execution until the program exits.',
  },
  {
    sig: 'rc.go_async()',
    returns: 'None',
    summary: (
      <>
        Starts the sensor streams in the background without blocking. Used in
        Jupyter Notebooks instead of <code style={{ fontFamily: NB.monoFont }}>go</code>, so the <code style={{ fontFamily: NB.monoFont }}>*_async</code> methods return
        data.
      </>
    ),
  },
  {
    sig: 'rc.get_delta_time()',
    returns: 'float',
    summary:
      'Returns the number of seconds between the start of the current frame and the start of the previous frame.',
  },
  {
    sig: 'rc.set_update_slow_time(time: float = 1.0)',
    returns: 'None',
    summary: (
      <>
        Sets the interval in seconds between calls to the <code style={{ fontFamily: NB.monoFont }}>update_slow</code> function
        registered with <code style={{ fontFamily: NB.monoFont }}>set_start_update</code>.
      </>
    ),
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
          <GhostNumeral n="01" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RACECAR_<Red>CORE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The racecar_core module creates the car object, contains
              multiple submodules to interact with the car, and runs your
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
    print("start: runs once")
    rc.drive.stop()

def update():
    # runs every frame
    print("update: runs every frame")

def update_slow():
    # runs once per second by default
    print("still driving")

rc.set_start_update(start, update, update_slow)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Software · File system', href: '/docs/software/workspaces' }}
        next={{ label: 'rc.drive', href: '/docs/api-reference/python/drive' }}
      />
    </DocsShell>
  );
}
