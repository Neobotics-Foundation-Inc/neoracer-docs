import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ComingSoon,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, PhotoSteps } from '@/components/docs/Interactive';
import { SetupTimeline } from '@/components/docs/SetupTimeline';
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
              After logging in as{' '}
              <code style={{ fontFamily: NB.monoFont }}>racecar</code>, open the
              terminal in the home directory{' '}
              <code style={{ fontFamily: NB.monoFont }}>~</code>. The file system
              installed during setup is now visible on the car.
            </p>
          </div>
        </section>
      </MouseFollowGlow>

      {/* ── Home ─────────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              THE HOME <Red>DIRECTORY</Red>
            </DisplayHeading>
            <Code lang="bash">{`racecar@neoracer:~$ ls
data        Downloads   logs                osracer_demo   Public      Videos
Desktop     home        Music               osracer_ws     ros2_ws
Documents   jupyter_ws  neoracer-installer  Pictures       Templates`}</Code>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
              The car comes with stock Ubuntu directories such as Desktop, Documents,
              Downloads, and more. There are six directories that are installed
              on the car.
            </p>
            <div style={{ marginTop: 18 }}>
              <DataTable
                columns={[
                  { key: 'dir', label: 'Directory', accent: true, mono: true, width: '210px' },
                  { key: 'what', label: 'Description' },
                ]}
                rows={[
                  { dir: 'ros2_ws', what: 'Stores the latest version of the driver.' },
                  { dir: 'jupyter_ws', what: 'Stores the Python library, starter code, and any additional code you write.' },
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

      {/* ── The directories, collapsed by default ────────────────────── */}
      <ScrollReveal>
        <SetupTimeline
          items={[
            {
              title: <>ROS2_<Red>WS</Red></>,
              content: (
                <>
                  <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
                    <code style={{ fontFamily: NB.monoFont }}>ros2_ws</code>{' '}
                    stores the{' '}
                    <a
                      href="https://github.com/Neobotics-Foundation-Inc/neoracer_ros2_driver"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: NB.neoboticsRed, fontWeight: 700 }}
                    >
                      neoracer_ros2_driver
                    </a>{' '}
                    pulled from GitHub. You can view your dashboards, trained
                    models, launch and config files, and all the setup scripts
                    used to initialise the NeoRacer.
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
                  <Callout type="warn" title="This workspace gets overwritten">
                    When updating the car, the ROS 2 driver gets reset to the
                    latest published version, so edits you make here are
                    discarded. Copy anything you want to keep before updating.
                  </Callout>
                </>
              ),
            },
            {
              title: <>JUPYTER_<Red>WS</Red></>,
              content: (
                <>
                  <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
                    <code style={{ fontFamily: NB.monoFont }}>jupyter_ws</code>{' '}
                    is the main workspace where code is written. JupyterLab is
                    available in your browser as a service on port{' '}
                    <code style={{ fontFamily: NB.monoFont }}>8888</code>, and
                    its file system is this folder.
                  </p>
                  <Code lang="bash">{`~/jupyter_ws$ ls
neoracer-os  README.md

~/jupyter_ws/neoracer-os$ ls
labs  library

~/jupyter_ws/neoracer-os/labs$ ls
demo.py     lab_a  lab_c  lab_e  lab_g  template.py  utility
grand_prix  lab_b  lab_d  lab_f  lab_i  tests

~/jupyter_ws/neoracer-os/library$ ls
camera.py      drive.py  nav.py       racecar_core.py   simulation   vision.py
controller.py  led.py    physics.py   racecar_utils.py  slam.py
display.py     lidar.py  __pycache__  real              telemetry.py`}</Code>
                  <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 16 }}>
                    In the workspace there is{' '}
                    <code style={{ fontFamily: NB.monoFont }}>labs</code> and{' '}
                    <code style={{ fontFamily: NB.monoFont }}>library</code>.{' '}
                    <code style={{ fontFamily: NB.monoFont }}>labs</code> holds the
                    lab exercises and some template code.{' '}
                    <code style={{ fontFamily: NB.monoFont }}>library</code> has all
                    the <code style={{ fontFamily: NB.monoFont }}>rc.*</code> modules
                    that we use in the{' '}
                    <Link href="/docs/api-reference/python/drive" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Python API reference</Link>.
                    The <code style={{ fontFamily: NB.monoFont }}>tests</code>{' '}
                    folder holds the test notebook used in{' '}
                    <Link href="/docs/getting-started/test-the-system" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Test the system</Link>.
                  </p>

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
                    <Callout type="warn" title="There is no authentication on JupyterLab">
                      The service runs with authentication off, because the car&apos;s
                      networks are local and closed. Anyone already on the car&apos;s
                      Wi-Fi can open it and run code on the car. The authentication
                      is accessing the Wi-Fi.
                    </Callout>
                  </div>

                  <div style={{ marginTop: 30 }}>
                    <MonoLabel>Notebooks or scripts</MonoLabel>
                    <div style={{ marginTop: 14 }}>
                      <DataTable
                        columns={[
                          { key: 'k', label: '', accent: true },
                          { key: 'nb', label: 'Notebook (.ipynb)', mono: true },
                          { key: 'sc', label: 'Script (.py)', mono: true },
                        ]}
                        rows={[
                          { k: 'Good for', nb: 'Running small tests, checking values, teaching', sc: 'A normal program run start to finish' },
                          { k: 'How you run it', nb: 'Cell by cell in the browser', sc: 'python3 <file> from a terminal' },
                          { k: 'State', nb: 'Kept in the kernel between cells', sc: 'Gone when the program exits' },
                        ]}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 30 }}>
                    <MonoLabel>Restart the kernel</MonoLabel>
                    <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                      A notebook holds the car&apos;s sensors for as long as its
                      kernel is alive, even after the last cell has finished. If you
                      open a second notebook, or run a script while a notebook is
                      still loaded, the second one might fail.
                    </p>
                    <PhotoSteps
                      items={[
                        {
                          text: <>When you are done, open the <code style={{ fontFamily: NB.monoFont }}>Kernel</code> menu and choose <strong>Restart Kernel and Clear Outputs of All Cells</strong>.</>,
                          photos: [{ src: '/images/jupyter_clear_cells.png', alt: 'The Kernel menu with Restart Kernel and Clear Outputs of All Cells highlighted' }],
                        },
                      ]}
                    />
                  </div>
                </>
              ),
            },
            {
              title: <>OSRACER_<Red>WS</Red></>,
              content: (
                <>
                  <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
                    A second ROS 2 workspace, preinstalled on the image. It holds the
                    autonomy tier: the robot description, SLAM and Nav2.
                  </p>
                  <ComingSoon>
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
                  </ComingSoon>
                </>
              ),
            },
            {
              title: <>THE <Red>REST</Red></>,
              content: (
                <>
                  <MonoLabel>neoracer-installer</MonoLabel>
                  <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                    The installer downloads the driver onto the car. It is cloned
                    and run once during{' '}
                    <Link href="/docs/getting-started/install-driver" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>setup</Link>.
                    Its <code style={{ fontFamily: NB.monoFont }}>logs</code> folder
                    records every install run.
                  </p>
                  <Code lang="bash">{`~/neoracer-installer$ ls
docs  logs  README.md  scripts  tests`}</Code>

                  <div style={{ marginTop: 24 }}>
                    <MonoLabel>logs</MonoLabel>
                    <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                      This refers to the logs in the{' '}
                      <code style={{ fontFamily: NB.monoFont }}>~</code> directory,
                      not the logs in{' '}
                      <code style={{ fontFamily: NB.monoFont }}>neoracer-installer</code>.
                      Every run of the stack writes a timestamped folder here, and{' '}
                      <code style={{ fontFamily: NB.monoFont }}>logs/latest</code>{' '}
                      points at the most recent one. The health dashboard reads it.
                    </p>
                  </div>

                  <div style={{ marginTop: 24 }}>
                    <MonoLabel>data</MonoLabel>
                    <p style={{ fontFamily: NB.bodyFont, fontSize: 15.5, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 6 }}>
                      <code style={{ fontFamily: NB.monoFont }}>data</code> is
                      created by the camlabel dashboard the first time you use it.
                      It holds the captured images, their labels, and object
                      classes, in YOLO format. This folder becomes a training
                      dataset.
                    </p>
                  </div>
                </>
              ),
            },
          ]}
        />
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Remote desktop', href: '/docs/software/remote-desktop' }}
        next={{ label: 'API reference', href: '/docs/api-reference/python/core' }}
      />
    </DocsShell>
  );
}
