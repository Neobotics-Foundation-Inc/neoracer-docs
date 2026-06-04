import Link from 'next/link';
import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  MonoLabel,
  DashList,
} from '@/components/docs/Editorial';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral, InfoNote } from '@/components/docs/Interactive';
import { Crumbs, Callout, PrevNext, Code } from '@/components/docs/DocsPrimitives';

export const metadata: Metadata = {
  title: 'Install the ROS 2 driver · Getting Started · NeoRacer Docs',
  description:
    'The NeoRacer ships without the ROS 2 driver installed. Clone the neoracer_ros2_driver and the LakiBeam LiDAR driver into a workspace, colcon build, and run teleop.',
};

const SYS = [
  ['Compute', 'Jetson Orin Nano (JetPack 6.2)'],
  ['OS', 'Ubuntu 22.04.5 LTS (jammy)'],
  ['Python', '3.10.12'],
  ['ROS 2', 'Humble'],
  ['Username', 'racecar'],
  ['Hostname', 'neoracer'],
  ['Static IP', '192.168.1.[100 + Car ID]'],
  ['Wi-Fi SSID', 'neoracer_[Car ID]'],
];

export default function InstallDriverPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Getting Started', href: '/docs/getting-started/unbox' },
          { label: 'Install the ROS 2 driver' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="ws" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>GETTING STARTED / INSTALL THE ROS 2 DRIVER</Eyebrow>
            <DisplayHeading size="xl">
              INSTALL THE ROS 2 <Red>DRIVER.</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The NeoRacer ships with the Jetson, ROS 2 Humble, and the sensors
              wired, but not the driver that ties them together. This is the
              one-time setup that clones the driver into a workspace, builds it
              with{' '}
              <InfoNote term="colcon" title="colcon">
                The standard build tool for ROS 2. It compiles every package in a
                workspace and sets up the paths so you can run them.
              </InfoNote>
              , and gets the sensors and motors live behind a single{' '}
              <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>teleop</code>{' '}
              command.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red"><AnimatedNumeral value={30} prefix="~" suffix=" minutes" /></ChromeBadge>
              <ChromeBadge variant="outline">One-time</ChromeBadge>
              <ChromeBadge variant="outline">Jetson Orin Nano</ChromeBadge>
              <ChromeBadge variant="outline">ROS 2 Humble</ChromeBadge>
              <ChromeBadge variant="outline">colcon build</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <Callout type="note" title="The car does not come with the driver installed">
          This is deliberate: the driver is open source (
          <a href="https://github.com/Neobotics-Foundation-Inc/neoracer_ros2_driver" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            neoracer_ros2_driver
          </a>
          , GPLv3), so you build it on the car and own every line. You do this
          once. After that, <code style={{ fontFamily: NB.monoFont }}>teleop</code>{' '}
          brings the whole stack up.
        </Callout>
      </ScrollReveal>

      {/* ── System info ──────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 40 }}>
          <Eyebrow>01 / WHAT YOU'RE WORKING ON</Eyebrow>
          <DisplayHeading size="lg">
            THE SYSTEM <Red>SPECS.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Every NeoRacer follows the same naming so scripts and instructions
            line up. Car ID is the number on your unit, so Car 1 is at{' '}
            <code style={{ fontFamily: NB.monoFont }}>192.168.1.101</code> on the{' '}
            <code style={{ fontFamily: NB.monoFont }}>neoracer_1</code> network.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              marginTop: 18,
            }}
          >
            {SYS.map(([k, v]) => (
              <div key={k} style={{ background: NB.haloWhite, border: `1px solid ${NB.borderOnBeige}`, padding: '12px 14px' }}>
                <div style={{ fontFamily: NB.monoFont, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: NB.textMutedBeige, fontWeight: 700, marginBottom: 4 }}>{k}</div>
                <div style={{ fontFamily: NB.headingFont, fontSize: 15, fontWeight: 700, color: NB.textOnBeige }}>{v}</div>
              </div>
            ))}
          </div>
          <Callout type="tip" title="Get onto the car first">
            The car broadcasts its own Wi-Fi, <code style={{ fontFamily: NB.monoFont }}>neoracer_[Car ID]</code>.
            Join it from your laptop (password{' '}
            <code style={{ fontFamily: NB.monoFont }}>neobotics</code>), then SSH in:
            {' '}<code style={{ fontFamily: NB.monoFont }}>ssh racecar@neoracer</code> (or the
            static IP). The full access walkthrough is on{' '}
            <Link href="/docs/software/networking" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>Networking</Link>.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── Step 1 apt ───────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <Eyebrow>02 / SYSTEM DEPENDENCIES</Eyebrow>
          <DisplayHeading size="lg">
            SYSTEM <Red>DEPENDENCIES.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            On the car, install the system packages the driver and its tooling
            need (ROS 2 joystick stack, rqt, build tools, the Jetson kernel
            headers for the joystick driver), then the Python libraries.
          </p>
          <Code lang="bash">{`sudo apt update && sudo apt upgrade -y
sudo apt install ros-humble-rqt-common-plugins -y
sudo apt install ros-humble-joy ros-humble-joy-linux ros-humble-teleop-twist-joy -y
sudo apt install vim tmux screen terminator -y
sudo apt install ufw -y
sudo apt install joystick -y
sudo apt install dkms git build-essential nvidia-l4t-kernel-headers -y
sudo apt install python3-pip -y`}</Code>
          <Code lang="bash">{`pip3 install opencv-python==4.8.1.78
pip3 install numpy==1.26.2
pip3 install nptyping==1.4.4
pip3 install jupyterlab`}</Code>
        </section>
      </ScrollReveal>

      {/* ── Step 2 aliases + dirs ────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <Eyebrow>03 / ALIASES + DIRECTORIES</Eyebrow>
          <DisplayHeading size="lg">
            ALIASES AND <Red>DIRECTORIES.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Add these to <code style={{ fontFamily: NB.monoFont }}>~/.bashrc</code> so the
            workspace is sourced in every shell and{' '}
            <code style={{ fontFamily: NB.monoFont }}>teleop</code> launches the whole
            stack. Then make the two working directories the tooling expects.
          </p>
          <Code lang="bash">{`# in ~/.bashrc
source ~/osracer_ws/install/setup.bash   # or ros2_ws, depending on your stack
alias teleop="ros2 launch neoracer_ros2_driver teleop.launch.py"
alias rqt_image_view="ros2 run rqt_image_view rqt_image_view"
alias rqt_runtime_monitor="ros2 run rqt_runtime_monitor rqt_runtime_monitor"`}</Code>
          <Code lang="bash">{`mkdir ~/data
mkdir ~/jupyter_ws`}</Code>
        </section>
      </ScrollReveal>

      {/* ── Step 3 jupyter service ───────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <Eyebrow>04 / HEADLESS ACCESS</Eyebrow>
          <DisplayHeading size="lg">
            THE JUPYTERLAB <Red>SERVICE.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            JupyterLab is the one thing that does auto-start, so you can reach the
            car from a browser with no SSH. Open the firewall port, then create
            the service.
          </p>
          <Code lang="bash">{`sudo ufw allow 8888
export PATH="$HOME/.local/bin:$PATH"
sudo vim /etc/systemd/system/jupyterlab.service`}</Code>
          <Code lang="bash">{`[Unit]
Description=Jupyter Lab
After=network.target

[Service]
Environment=PATH=/home/nvidia/.local/bin:/usr/local/bin:/user/bin:/bin
Type=simple
User=nvidia
ExecStart=/bin/bash -c "source /home/nvidia/osracer_ws/install/setup.bash && source /opt/ros/humble/setup.bash && /home/nvidia/.local/bin/jupyter lab --no-browser --ip=0.0.0.0 --port=8888 --NotebookApp.token=''"
WorkingDirectory=/home/nvidia/jupyter_ws
Restart=always

[Install]
WantedBy=multi-user.target`}</Code>
          <Callout type="warn" title="Match the user and home path to yours">
            The unit above uses <code style={{ fontFamily: NB.monoFont }}>nvidia</code> and{' '}
            <code style={{ fontFamily: NB.monoFont }}>/home/nvidia</code>. If your account
            is <code style={{ fontFamily: NB.monoFont }}>racecar</code>, set{' '}
            <code style={{ fontFamily: NB.monoFont }}>User=racecar</code> and the home
            paths to <code style={{ fontFamily: NB.monoFont }}>/home/racecar</code> so the
            service finds your workspace.
          </Callout>
          <Code lang="bash">{`sudo loginctl enable-linger $USER
sudo systemctl daemon-reload
sudo systemctl enable jupyterlab.service
sudo systemctl start jupyterlab.service
sudo journalctl -u jupyterlab.service -f   # to debug`}</Code>
        </section>
      </ScrollReveal>

      {/* ── Step 4 joystick ──────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <Eyebrow>05 / JOYSTICK DRIVER</Eyebrow>
          <DisplayHeading size="lg">
            THE JOYSTICK <Red>DRIVER.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The controller uses the xpad kernel module, built against your kernel
            with DKMS so it survives kernel updates. This is why the kernel
            headers went in back in step 02.
          </p>
          <Code lang="bash">{`sudo git clone https://github.com/paroj/xpad.git /usr/src/xpad-0.4
sudo dkms install -m xpad -v 0.4`}</Code>
        </section>
      </ScrollReveal>

      {/* ── Step 5 clone + build (the main event) ────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <Eyebrow>06 / CLONE + BUILD</Eyebrow>
          <DisplayHeading size="lg">
            THE <Red>COLCON BUILD.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Clone the driver and the Richbeam LakiBeam LiDAR driver into your
            workspace's <code style={{ fontFamily: NB.monoFont }}>src</code>, then build
            the whole stack with colcon. The{' '}
            <code style={{ fontFamily: NB.monoFont }}>--symlink-install</code> flag lets
            you edit Python files without rebuilding every time.
          </p>
          <Code lang="bash">{`cd ~/osracer_ws/src   # or ~/ros2_ws, depending on your stack
git clone https://github.com/Neobotics-Foundation-Inc/neoracer_ros2_driver.git
git clone https://github.com/RichbeamTechnology/Lakibeam_ROS2_Driver.git
cd ..
colcon build --symlink-install
source install/setup.bash
source ~/.bashrc   # should see no errors now`}</Code>
          <Callout type="tip" title="That's the install done">
            Once colcon finishes with no errors and the new shell sources clean,
            the driver is built and the <code style={{ fontFamily: NB.monoFont }}>teleop</code>{' '}
            alias is live.
          </Callout>
        </section>
      </ScrollReveal>

      {/* ── Run it ───────────────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 36 }}>
          <Eyebrow>07 / RUN THE STACK</Eyebrow>
          <DisplayHeading size="lg">
            RUN THE <Red>STACK.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            The driver is not auto-started, you bring it up when you want it, in
            any terminal:
          </p>
          <Code lang="bash">{`teleop   # = ros2 launch neoracer_ros2_driver teleop.launch.py`}</Code>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            That single launch starts the four pieces of the car:
          </p>
          <DashList
            items={[
              <><strong>controller_node</strong>: the ESP32 bridge. Reads the{' '}
                <InfoNote term="IMU" title="IMU">
                  Inertial measurement unit. A sensor that reports the car's
                  acceleration and rotation, used to track how it is moving and
                  which way it is facing.
                </InfoNote>{' '}
                and wheel{' '}
                <InfoNote term="odometry" title="Odometry">
                  Position estimated from how far the wheels have turned. It
                  drifts over time, which is why other sensors are used to
                  correct it.
                </InfoNote>
                , and turns{' '}
                <code style={{ fontFamily: NB.monoFont, color: NB.neoboticsRed }}>/drive</code>{' '}
                commands into motor and servo motion. Publishes{' '}
                <code style={{ fontFamily: NB.monoFont }}>/imu</code> and{' '}
                <code style={{ fontFamily: NB.monoFont }}>/odom</code>.</>,
              <><strong>joy_node</strong>: the Xbox controller, on{' '}
                <code style={{ fontFamily: NB.monoFont }}>/joy</code>.</>,
              <><strong>camera_node</strong>: the colour camera, on{' '}
                <code style={{ fontFamily: NB.monoFont }}>/camera</code>.</>,
              <><strong>LakiBeam LiDAR</strong>: the scanner, on{' '}
                <code style={{ fontFamily: NB.monoFont }}>/scan</code>.</>,
            ]}
          />
          <p style={{ fontFamily: NB.bodyFont, fontSize: 15, lineHeight: 1.6, color: NB.textMutedBeige, maxWidth: 720, marginTop: 12 }}>
            For headless work, JupyterLab is already serving at{' '}
            <code style={{ fontFamily: NB.monoFont }}>http://192.168.1.[100 + Car ID]:8888</code>{' '}
            over the car's Wi-Fi, so a browser on the car's network reaches it
            with no SSH.
          </p>
        </section>
      </ScrollReveal>

      {/* ── Frontend library ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ paddingBottom: 32 }}>
          <MonoLabel>The rc.* library on top</MonoLabel>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720, marginTop: 8 }}>
            The driver publishes the topics; the{' '}
            <Link href="/docs/software/racecar-neo-library" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>racecar-neo-library</Link>{' '}
            (the <code style={{ fontFamily: NB.monoFont }}>rc.*</code> Python API you write
            programs against) wraps them. Install it with the{' '}
            <a href="https://github.com/MITRacecarNeo/racecar-neo-installer" target="_blank" rel="noopener noreferrer" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
              racecar-neo-installer
            </a>
            , then your code talks to the same{' '}
            <code style={{ fontFamily: NB.monoFont }}>/drive</code>,{' '}
            <code style={{ fontFamily: NB.monoFont }}>/scan</code>, and{' '}
            <code style={{ fontFamily: NB.monoFont }}>/camera</code> that{' '}
            <code style={{ fontFamily: NB.monoFont }}>teleop</code> spawns.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="apt errors about nvidia-l4t-kernel during install?">
          If apt fails on{' '}
          <code style={{ fontFamily: NB.monoFont }}>nvidia-l4t-bootloader</code> /{' '}
          <code style={{ fontFamily: NB.monoFont }}>nvidia-l4t-kernel-headers</code>, the
          dpkg info directory needs a reset:
          <Code lang="bash">{`sudo mv /var/lib/dpkg/info/ /var/lib/dpkg/backup/
sudo mkdir /var/lib/dpkg/info/
sudo apt-get update
sudo apt-get -f install
sudo mv /var/lib/dpkg/backup/* /var/lib/dpkg/info/
sudo rm -rf /var/lib/dpkg/backup/
sudo apt update && sudo apt upgrade -y`}</Code>
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Charge & power', href: '/docs/getting-started/charge-and-power' }}
        next={{ label: 'First drive', href: '/docs/getting-started/first-drive' }}
      />
    </DocsShell>
  );
}
