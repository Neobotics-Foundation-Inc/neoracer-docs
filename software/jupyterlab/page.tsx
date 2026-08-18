import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, PrevNext, Callout, Code, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'JupyterLab · Software · NeoRacer Docs',
  description:
    'JupyterLab runs on the car at port 8888 and serves ~/jupyter_ws. Where your files live, how the racecar-neo-library is wired in, notebooks against scripts, and why the kernel has to be restarted between runs.',
};

export default function JupyterLabPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/networking' },
          { label: 'JupyterLab' },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="JL" top={-30} right={-20} size={430} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              WRITE CODE IN <Red>JUPYTERLAB</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              JupyterLab runs on the car and you open it in a browser. It is an
              editor, a file browser, and a terminal on the Jetson, so you can
              write a program and run it against the real sensors without
              installing anything on your laptop.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">port 8888</ChromeBadge>
              <ChromeBadge variant="outline">serves ~/jupyter_ws</ChromeBadge>
              <ChromeBadge variant="outline">no token, no password</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── 01 · Open it ────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              OPEN <Red>IT</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              JupyterLab is one of the four services that start at boot, so
              there is nothing to launch. Join the car&apos;s network and open
              its address on port{' '}
              <code style={{ fontFamily: NB.monoFont }}>8888</code> in a browser.
            </p>
            <Code lang="bash">{`http://192.168.10.100:8888     # cudy router
http://10.42.0.1:8888          # the car's access point`}</Code>
            <Callout type="note" title="There is no login">
              The service runs with authentication off, because the car&apos;s
              networks are local and closed. Anyone already on the car&apos;s
              Wi-Fi can open it and run code on the car. That is fine on a bench
              or a track and worth knowing about in a shared space.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 02 · What is in there ───────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHERE THE FILES <Red>LIVE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The file browser on the left is rooted at{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/jupyter_ws</code> on the
              Jetson. Everything else on the car sits outside that root, so you
              cannot wander into the driver or the system by accident.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'path', label: 'Path', accent: true, mono: true },
                  { key: 'what', label: 'What it is' },
                ]}
                rows={[
                  { path: '~/jupyter_ws', what: 'The root JupyterLab serves. Your own files can go straight here.' },
                  { path: 'neoracer-os/library', what: 'The racecar-neo-library source, the rc.* modules you import.' },
                  { path: 'neoracer-os/labs', what: 'The lab notebooks and scripts the car ships with, including the tests used in Setup.' },
                ]}
              />
            </div>
            <Callout type="tip" title="Same files over SSH">
              This is an ordinary directory on the Jetson, so{' '}
              <code style={{ fontFamily: NB.monoFont }}>scp</code>,{' '}
              <code style={{ fontFamily: NB.monoFont }}>git</code>, and an SSH
              session all see exactly what the browser shows. Use whichever
              suits the job.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 · The library ────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              WHY <Red>IMPORT</Red> ALREADY WORKS
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              <code style={{ fontFamily: NB.monoFont }}>import racecar_core</code>{' '}
              works from any file in the workspace, with no path juggling. The
              driver setup writes a{' '}
              <InfoNote term=".pth file" title="Python .pth file">
                A one-line file Python reads at startup. It adds the directory
                named inside it to the import path, so a package outside the
                usual locations can still be imported by name.
              </InfoNote>{' '}
              called <code style={{ fontFamily: NB.monoFont }}>racecar_student.pth</code>{' '}
              that points Python at{' '}
              <code style={{ fontFamily: NB.monoFont }}>neoracer-os/library</code>.
            </p>
            <MonoLabel>Switching which library is active</MonoLabel>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
              If you keep more than one copy of the library, for example a fork
              you are working on, the CLI manages which one that file points to.
              A folder you name here is read as{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/jupyter_ws/&lt;folder&gt;/library</code>.
            </p>
            <Code lang="bash">{`racecar library --status           # which copy is active
racecar library --list             # valid folders in ~/jupyter_ws
racecar library --select my-fork   # point at ~/jupyter_ws/my-fork/library
racecar library --reset            # delete the .pth file`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 14 }}>
              Every module and method is in the{' '}
              <Link href="/docs/api-reference/python/drive" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Python API reference</Link>.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 · Notebooks and scripts ──────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              NOTEBOOKS OR <Red>SCRIPTS</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              Both run the same library against the same car. They suit
              different jobs.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'k', label: '', accent: true },
                  { key: 'nb', label: 'Notebook (.ipynb)', mono: true },
                  { key: 'sc', label: 'Script (.py)', mono: true },
                ]}
                rows={[
                  { k: 'Good for', nb: 'Reading one sensor, checking a value, teaching', sc: 'A full driving program you run start to finish' },
                  { k: 'How you run it', nb: 'Cell by cell in the browser', sc: 'python3 <file> from a terminal' },
                  { k: 'State', nb: 'Kept in the kernel between cells', sc: 'Gone when the program exits' },
                ]}
              />
            </div>
            <Code lang="bash">{`# A script, from an SSH session or the JupyterLab terminal.
python3 ~/jupyter_ws/neoracer-os/labs/drive_square.py`}</Code>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 · The kernel owns the sensors ────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <GhostNumeral n="05" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              RESTART THE <Red>KERNEL</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              A notebook holds the car&apos;s sensors for as long as its kernel
              is alive, even after the last cell has finished. If you open a
              second notebook, or run a script while a notebook is still loaded,
              the second one gets nothing. This is the most common confusion on
              the car and it is not a fault.
            </p>
            <DashList
              items={[
                <>When you finish with a notebook, open the{' '}
                  <code style={{ fontFamily: NB.monoFont }}>Kernel</code> menu and
                  choose <strong>Restart Kernel and Clear Outputs of All Cells</strong>.
                  That releases the sensors and leaves the file clean for the
                  next person.</>,
                <>A notebook that suddenly reads zeros usually means another
                  kernel still holds the hardware. Shut the other one down from
                  the <strong>Running Terminals and Kernels</strong> tab in the
                  left sidebar.</>,
                <>Logs for the service itself go to the journal, not to a file:{' '}
                  <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>journalctl -u neoracer-jupyter -f</code>.</>,
              ]}
            />
            <Callout type="warn" title="A running notebook can still drive the car">
              A kernel with a live{' '}
              <code style={{ fontFamily: NB.monoFont }}>rc</code> object keeps
              control of the motors. Before you walk away from the car, restart
              the kernel and flip SWB up on the{' '}
              <Link href="/docs/hardware/remote-control" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>transmitter</Link>.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Workspaces', href: '/docs/software/workspaces' }}
        next={{ label: 'OS & image', href: '/docs/software/os-and-image' }}
      />
    </DocsShell>
  );
}
