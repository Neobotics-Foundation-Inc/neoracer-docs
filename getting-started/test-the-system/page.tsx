import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  DashList,
  ChromeBadge,
  ClockGlyph,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, PhotoSteps } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Test the system · Setup · NeoRacer Docs',
  description:
    'Validate the install by running the Async Core Test notebook in JupyterLab. It checks every sensor and control surface on the car and prints a pass/fail summary.',
};

const SUMMARY = `================================================================
  NeoRacer - Async Core Test Results
================================================================
  [PASS] Forward camera (/camera/color)
  [PASS] LIDAR (/scan)
  [PASS] IMU (/imu/fused, /mag)
  [PASS] Controller (/joy)
  [PASS] Drive publisher (/drive)
  [PASS] Mux observation (/mux_out)
  [PASS] Battery voltage (/battery/voltage)
  [PASS] FlySky RC (/rc/channels)
  [PASS] Encoder (/encoder/speed)
  [PASS] Dot-matrix (/dotmatrix/text)
  [PASS] Telemetry (CSV + PNG + /diagnostics)
  [PASS] Vision (/edgetpu/inference)
  [PASS] Diagnostics (/diagnostics)
----------------------------------------------------------------
  Not available on this platform (raises NotImplementedError):
  [ -- ] Depth stream (/camera/depth)
         no depth sensor; forward camera is monocular
  [ -- ] Battery current (/battery/current)
         no current shunt on the OSRbot base
  [ -- ] LED strip (/led/pixels)
         no addressable strip
  [ -- ] Dot-matrix pixels (/dotmatrix/pixels)
         panel firmware takes text only
================================================================
  Overall: ALL PASS
================================================================`;

export default function TestTheSystemPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Setup', href: '/docs/getting-started/unbox' },
          { label: 'Test the system' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="06" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              TEST THE <Red>SYSTEM</Red>
            </DisplayHeading>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="outline" icon={<ClockGlyph />}>~15 minutes</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* You'll need */}
      <ScrollReveal>
        <section style={{ paddingBottom: 24 }}>
          <MonoLabel>You'll need</MonoLabel>
          <DashList
            items={[
              <>A NeoRacer.</>,
              <>A laptop connected to the NeoRacer&apos;s router.</>,
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── Run the Async Core Test ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            RUN THE ASYNC CORE <Red>TEST</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The Async Core Test notebook checks every sensor and control
            surface on the car and prints a pass/fail summary at the end.
          </p>
          <PhotoSteps
            items={[
              {
                text: <>Open{' '}
                  <code style={{ fontFamily: NB.monoFont }}>http://192.168.10.100:8888</code>{' '}
                  in a browser. JupyterLab opens with the file browser on the left.</>,
                photos: [{ src: '/images/jupyter/jupyter_opening_page.png', alt: 'JupyterLab open in a browser at 192.168.10.100:8888, with the file browser highlighted on the left' }],
              },
              {
                text: <>In the file browser, go to{' '}
                  <code style={{ fontFamily: NB.monoFont }}>neoracer-os</code> →{' '}
                  <code style={{ fontFamily: NB.monoFont }}>labs</code> →{' '}
                  <code style={{ fontFamily: NB.monoFont }}>tests</code>.</>,
                photos: [{ src: '/images/jupyter/jupyter_access_async.png', alt: 'The file browser path neoracer-os/labs/tests with the test files listed' }],
              },
              {
                text: <>Double-click{' '}
                  <code style={{ fontFamily: NB.monoFont }}>test_async_core_real.ipynb</code>{' '}
                  to open it.</>,
                photos: [{ src: '/images/jupyter/jupyter_open_async.png', alt: 'The Async Core Test notebook open in JupyterLab' }],
              },
              {
                text: <>Run the notebook from the toolbar at the top of the tab.
                  The play button (red box) runs the selected cell and moves to
                  the next one; the double arrow (blue box) restarts the kernel
                  and runs every cell in order. Either works, as long as the
                  cells run in order.</>,
                photos: [{ src: '/images/jupyter/jupyter_run_cells.png', alt: 'The notebook toolbar with the run-cell button boxed in red and the restart-and-run-all button boxed in blue' }],
              },
              {
                text: <>Each test follows the same shape: a title, a short
                  explanation of what is being tested, the code, and the output
                  it prints below. Watch the outputs as they appear.</>,
                photos: [{ src: '/images/jupyter/jupyter_typical_cell.png', alt: 'A typical test cell with its title and explanation, code block, and printed output' }],
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* ── The summary ──────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            READ THE <Red>SUMMARY</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The last cell of the notebook prints a summary of every test. On a
            healthy car it looks like this:
          </p>
          <Code lang="output">{SUMMARY}</Code>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The four <code style={{ fontFamily: NB.monoFont }}>[ -- ]</code>{' '}
            entries are expected: they are features the NeoRacer&apos;s hardware
            does not have, and the library reports them as{' '}
            <code style={{ fontFamily: NB.monoFont }}>NotImplementedError</code>{' '}
            by design. Anything printed as{' '}
            <code style={{ fontFamily: NB.monoFont }}>[FAIL]</code> names the
            subsystem to look at.
          </p>
        </section>
      </ScrollReveal>

      {/* ── Clean up ─────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <DisplayHeading size="lg">
            RESET THE <Red>NOTEBOOK</Red>
          </DisplayHeading>
          <PhotoSteps
            items={[
              {
                text: <>When you are done, open the{' '}
                  <code style={{ fontFamily: NB.monoFont }}>Kernel</code> menu
                  and choose{' '}
                  <strong>Restart Kernel and Clear Outputs of All Cells</strong>.</>,
                photos: [{ src: '/images/jupyter/jupyter_clear_cells.png', alt: 'The Kernel menu with Restart Kernel and Clear Outputs of All Cells highlighted' }],
              },
            ]}
          />
          <Callout type="warn" title="Always reset after running">
            Restarting the kernel releases the car&apos;s sensors so other
            programs can use them, and clearing the outputs leaves the notebook
            clean for the next run. Do this every time you finish with the
            notebook.
          </Callout>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Connect to the router', href: '/docs/getting-started/connect-to-router' }}
        next={{ label: 'Hardware overview', href: '/docs/hardware/overview' }}
      />
    </DocsShell>
  );
}
