import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, Callout, Code, PrevNext, DataTable } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'File system · Software · NeoRacer Docs',
  description:
    "A walk through the NeoRacer's home directory: ros2_ws holds the driver, jupyter_ws holds your code and is what JupyterLab serves, osracer_ws is the vendor stack, and neoracer-installer is what put it all there.",
};

export default function FileSystemPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Software', href: '/docs/software/networking' },
          { label: 'File system' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="03" top={-30} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              THE FILE <Red>SYSTEM</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 700 }}>
              Log in as <code style={{ fontFamily: NB.monoFont }}>racecar</code>{' '}
              and you land in the home directory. This is what is in it, and
              which parts you are meant to touch.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Home ─────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              THE HOME <Red>DIRECTORY</Red>
            </DisplayHeading>
            <Code lang="bash">{`racecar@neoracer:~$ ls
data        Downloads   logs                osracer_demo   Public      Videos
Desktop     home        Music               osracer_ws     ros2_ws
Documents   jupyter_ws  neoracer-installer  Pictures       Templates`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              Most of that is stock Ubuntu. Desktop, Documents, Downloads,
              Music, Pictures, Public, Templates and Videos come with the
              desktop and the car does not use them. These six are the ones
              you will actually use.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'dir', label: 'Directory', accent: true, mono: true, width: '210px' },
                  { key: 'what', label: 'What it is' },
                ]}
                rows={[
                  { dir: 'ros2_ws', what: 'The driver. The software that runs the car.' },
                  { dir: 'jupyter_ws', what: 'Your code, and the Python library it imports.' },
                  { dir: 'osracer_ws', what: 'The vendor stack: robot description, SLAM and Nav2.' },
                  { dir: 'neoracer-installer', what: 'The installer that set the car up.' },
                  { dir: 'logs', what: 'One timestamped folder per run of the driver.' },
                  { dir: 'data', what: 'Object-detection datasets, written by the camlabel dashboard.' },
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── ros2_ws ──────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              ROS2_WS, THE <Red>DRIVER</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The workspace every terminal opens on. You edit things in{' '}
              <code style={{ fontFamily: NB.monoFont }}>src</code>;{' '}
              <code style={{ fontFamily: NB.monoFont }}>build</code>,{' '}
              <code style={{ fontFamily: NB.monoFont }}>install</code> and{' '}
              <code style={{ fontFamily: NB.monoFont }}>log</code> are output
              that <code style={{ fontFamily: NB.monoFont }}>racecar build</code>{' '}
              regenerates.
            </p>
            <Code lang="bash">{`~/ros2_ws$ ls
build  install  log  src

~/ros2_ws/src$ ls
lakibeam1  neoracer_ros2_driver

~/ros2_ws/src/neoracer_ros2_driver$ ls
CHANGELOG.md     docs      neoracer_ros2_driver  scripts
CITATION.cff     launch    package.xml           setup.cfg
config           LICENSE   README.md             setup.py
CONTRIBUTING.md  models    resource              test`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              Inside the driver package,{' '}
              <code style={{ fontFamily: NB.monoFont }}>launch</code> holds the
              launch files, <code style={{ fontFamily: NB.monoFont }}>config</code>{' '}
              the YAML that tunes them,{' '}
              <code style={{ fontFamily: NB.monoFont }}>scripts</code> the{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar</code> command
              and the systemd services, and{' '}
              <code style={{ fontFamily: NB.monoFont }}>neoracer_ros2_driver</code>{' '}
              the node source itself.
            </p>
            <Callout type="warn" title="racecar update overwrites this">
              <code style={{ fontFamily: NB.monoFont }}>racecar update</code>{' '}
              resets the driver repo to the latest published version, so edits
              you make here are discarded. Copy anything you want to keep before
              running it.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── jupyter_ws ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              JUPYTER_WS, YOUR <Red>CODE</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              The one you actually work in, and the only one you need day to
              day. JupyterLab serves this directory, so the file browser in
              your browser is exactly this folder. Everything else on the car
              sits outside that root, so you cannot wander into the driver or
              the system by accident.
            </p>
            <Code lang="bash">{`~/jupyter_ws$ ls
neoracer-os  README.md

~/jupyter_ws/neoracer-os$ ls
labs  library

~/jupyter_ws/neoracer-os/labs$ ls
demo.py     lab_a  lab_c  lab_e  lab_g  template.py  ultimate-wall-follower
grand_prix  lab_b  lab_d  lab_f  lab_i  tests        utility

~/jupyter_ws/neoracer-os/library$ ls
camera.py      drive.py  nav.py       racecar_core.py   simulation   vision.py
controller.py  led.py    physics.py   racecar_utils.py  slam.py
display.py     lidar.py  __pycache__  real              telemetry.py`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              <code style={{ fontFamily: NB.monoFont }}>labs</code> holds the lab
              exercises the car ships with, plus{' '}
              <code style={{ fontFamily: NB.monoFont }}>template.py</code> to
              start from and{' '}
              <code style={{ fontFamily: NB.monoFont }}>tests</code>, which is
              what Setup runs to check the car.{' '}
              <code style={{ fontFamily: NB.monoFont }}>library</code> is the
              Python you import: one file per{' '}
              <code style={{ fontFamily: NB.monoFont }}>rc.*</code> module, with{' '}
              <code style={{ fontFamily: NB.monoFont }}>real</code> and{' '}
              <code style={{ fontFamily: NB.monoFont }}>simulation</code> holding
              the two backends that sit behind the same API. Your own files can
              go straight in{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/jupyter_ws</code>.
            </p>
            <Callout type="tip" title="Same files over SSH">
              This is an ordinary directory on the Jetson, so{' '}
              <code style={{ fontFamily: NB.monoFont }}>scp</code>,{' '}
              <code style={{ fontFamily: NB.monoFont }}>git</code>, and an SSH
              session all see exactly what the browser shows. Use whichever
              suits the job.
            </Callout>

            <div style={{ marginTop: 30 }}>
              <MonoLabel>Opening JupyterLab</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                It is one of the four services that start at boot, so there is
                nothing to launch. Join the car&apos;s network and open its
                address on port{' '}
                <code style={{ fontFamily: NB.monoFont }}>8888</code>.
              </p>
              <Code lang="bash">{`http://192.168.10.100:8888     # cudy router
http://10.42.0.1:8888          # the car's access point`}</Code>
              <Callout type="note" title="There is no login">
                The service runs with authentication off, because the car&apos;s
                networks are local and closed. Anyone already on the car&apos;s
                Wi-Fi can open it and run code on the car. That is fine on a
                bench or a track and worth knowing about in a shared space.
              </Callout>
            </div>

            <div style={{ marginTop: 30 }}>
              <MonoLabel>Why import already works</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                <code style={{ fontFamily: NB.monoFont }}>import racecar_core</code>{' '}
                works from any file in the workspace, with no path juggling. The
                driver setup writes a{' '}
                <InfoNote term=".pth file" title="Python .pth file">
                  A one-line file Python reads at startup. It adds the directory
                  named inside it to the import path, so a package outside the
                  usual locations can still be imported by name.
                </InfoNote>{' '}
                called{' '}
                <code style={{ fontFamily: NB.monoFont }}>racecar_student.pth</code>{' '}
                that points Python at{' '}
                <code style={{ fontFamily: NB.monoFont }}>neoracer-os/library</code>.
              </p>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 12 }}>
                If you keep more than one copy of the library, for example a
                fork you are working on, the CLI manages which one that file
                points to. A folder you name here is read as{' '}
                <code style={{ fontFamily: NB.monoFont }}>~/jupyter_ws/&lt;folder&gt;/library</code>.
              </p>
              <Code lang="bash">{`racecar library --status           # which copy is active
racecar library --list             # valid folders in ~/jupyter_ws
racecar library --select my-fork   # point at ~/jupyter_ws/my-fork/library
racecar library --reset            # delete the .pth file`}</Code>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 12 }}>
                Every module and method is in the{' '}
                <Link href="/docs/api-reference/python/drive" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Python API reference</Link>.
              </p>
            </div>

            <div style={{ marginTop: 30 }}>
              <MonoLabel>Notebooks or scripts</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Both run the same library against the same car. They suit
                different jobs.
              </p>
              <div style={{ marginTop: 14 }}>
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

            <div style={{ marginTop: 30 }}>
              <MonoLabel>Restart the kernel</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                A notebook holds the car&apos;s sensors for as long as its
                kernel is alive, even after the last cell has finished. If you
                open a second notebook, or run a script while a notebook is
                still loaded, the second one gets nothing. This is the most
                common confusion on the car and it is not a fault.
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
          </div>
        </section>
      </ScrollReveal>

      {/* ── osracer_ws ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 44 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              OSRACER_WS, THE <Red>VENDOR STACK</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
              A second ROS 2 workspace, preinstalled on the image. It holds the
              autonomy tier: the robot description, SLAM and Nav2.
            </p>
            <Code lang="bash">{`~/osracer_ws$ ls
build  install  log  src

~/osracer_ws/src$ ls
lakibeam1  osracer

~/osracer_ws/src/osracer$ ls
CHANGELOG.md     osracer_calib       osracer_description  osracer_slam
docs             osracer_debug       osracer_navigation   README.md
LICENSE          osracer_demo        osracer_race         ruff.toml
osracer_bringup  osracer_dependency  osracer_sim          tools`}</Code>
            <Callout type="note" title="Both workspaces carry lakibeam1">
              The LiDAR driver appears in both{' '}
              <code style={{ fontFamily: NB.monoFont }}>src</code> folders. It is
              one shared source rather than two copies, but only one can resolve
              at a time, which is why{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar ws</code> swaps a
              terminal between the two instead of stacking them.
            </Callout>
            <Code lang="bash">{`racecar ws            # which one am I on?
racecar ws osracer    # this terminal now uses the vendor workspace
racecar ws neoracer   # back to the default`}</Code>
            <Callout type="note" title="Not runnable yet">
              Reaching the autonomy packages needs a layer between the driver
              and them, and that layer is not installed on a shipped car. Treat{' '}
              <code style={{ fontFamily: NB.monoFont }}>~/osracer_ws</code> as
              reference material for now. The{' '}
              <Link href="/docs/api-reference/cli" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>racecar CLI</Link>{' '}
              page says the same about{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar mapping</code>{' '}
              and{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar navigation</code>.
            </Callout>
          </div>
        </section>
      </ScrollReveal>

      {/* ── The rest ─────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 24 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              THE <Red>REST</Red>
            </DisplayHeading>

            <MonoLabel>neoracer-installer</MonoLabel>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
              The installer that put the driver on the car. You clone and run it
              once during{' '}
              <Link href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>setup</Link>,
              and it stays behind afterwards. Its{' '}
              <code style={{ fontFamily: NB.monoFont }}>logs</code> folder
              records every install run, which is what support asks for when a
              setup goes wrong.
            </p>
            <Code lang="bash">{`~/neoracer-installer$ ls
docs  logs  README.md  scripts  tests`}</Code>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>logs</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Not the installer&apos;s logs, the driver&apos;s. Every run of
                the stack writes a timestamped folder here, and{' '}
                <code style={{ fontFamily: NB.monoFont }}>logs/latest</code>{' '}
                points at the most recent one. The health dashboard reads it.
              </p>
            </div>

            <div style={{ marginTop: 24 }}>
              <MonoLabel>data</MonoLabel>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                Written by the camlabel dashboard, and created the first time
                you use it. It holds the images you capture, the labels you draw
                on them, and the object classes you define, laid out in YOLO
                format. That means the folder is a training dataset as it
                stands: point an object-detection training run at it and it
                works, no conversion step.
              </p>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 12 }}>
                camlabel is one of five lab dashboards. They install switched
                off and you start one for a session, because each holds the
                camera or the GPU while it runs.
              </p>
              <Code lang="bash">{`racecar service start camlabel     # then open port 8082 in a browser`}</Code>
              <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 12 }}>
                A model you train from it is loaded by the driver&apos;s
                inference node. Turning a{' '}
                <code style={{ fontFamily: NB.monoFont }}>.pt</code> into the
                engine the car runs is{' '}
                <code style={{ fontFamily: NB.monoFont }}>racecar compile</code>,
                on the{' '}
                <Link href="/docs/api-reference/cli" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>racecar CLI</Link>{' '}
                page.
              </p>
            </div>

          </div>
        </section>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Remote desktop', href: '/docs/software/remote-desktop' }}
        next={{ label: 'OS & image', href: '/docs/software/os-and-image' }}
      />
    </DocsShell>
  );
}
