import { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  DisplayHeading,
  Red,
  GhostNumeral,
  ChromeBadge,
  NumberedFeatureCard,
  SymptomBanner,
} from '@/components/docs/Editorial';
import { Crumbs, PrevNext, Callout, Code } from '@/components/docs/DocsPrimitives';
import { ScrollReveal, MouseFollowGlow, AnimatedNumeral } from '@/components/docs/Interactive';

export const metadata: Metadata = {
  title: 'Camera no feed · Troubleshooting · NeoRacer Docs',
  description:
    'rc.camera.get_color_image returns a black frame, or /camera/color publishes nothing. Three causes and a quick diagnostic.',
};

export default function CameraNoFeedPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'Troubleshooting', href: '/docs/troubleshooting/wont-power-on' },
          { label: 'Camera no feed' },
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 24, paddingTop: 24 }}>
          <GhostNumeral n="04" top={-30} right={-20} size={460} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              NO CAMERA <Red>FEED</Red>
            </DisplayHeading>
            <p
              style={{
                fontFamily: NB.bodyFont,
                fontSize: 18,
                lineHeight: 1.55,
                color: NB.textMutedBeige,
                maxWidth: 680,
              }}
            >
              Either the camera node didn't start, the USB cable is loose,
              or the webcam doesn't advertise the MJPG format the driver
              expects. Three checks, in the order the data takes to reach
              your code.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <ChromeBadge variant="red">
                <AnimatedNumeral prefix="~" value={2} suffix=" minutes" />
              </ChromeBadge>
              <ChromeBadge variant="outline">Visible from SSH</ChromeBadge>
              <ChromeBadge variant="outline">Common right after a re-flash</ChromeBadge>
            </div>
          </div>
        </section>
      </MouseFollowGlow>

      <ScrollReveal>
        <SymptomBanner
          seeing={
            <>
              <code style={{ fontFamily: NB.monoFont }}>rc.camera.get_color_image()</code>{' '}
              returns a frame full of zeros, or{' '}
              <code style={{ fontFamily: NB.monoFont }}>ros2 topic hz /camera</code>{' '}
              reports no publisher.
            </>
          }
          expected={
            <>
              A 640×480 JPEG frame at 60 fps on{' '}
              <code style={{ fontFamily: NB.monoFont }}>/camera</code>. In
              Python, a NumPy array shaped <code style={{ fontFamily: NB.monoFont }}>(H, W, 3)</code> with
              real pixel values.
            </>
          }
        />
      </ScrollReveal>

      {/* ── Section 01 · Driver up? ─────────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="01" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              NODE <Red>STATUS</Red>
            </DisplayHeading>
            <Code lang="bash">{`# 1. Is the teleop driver running?
ssh racecar@neoracer
racecar status                                       # shows running nodes
ros2 topic list | grep camera                        # /camera/color should be there

# 2. Does the kernel see the webcam, and does it advertise MJPG?
ls -l /dev/osrbot_usb_cam                            # udev symlink
v4l2-ctl --list-formats-ext -d /dev/osrbot_usb_cam   # MJPG format must appear

# 3. If teleop is up but /camera/color publishes nothing, bring the stack back up.
racecar teleop

# 4. Confirm the topic publishes.
ros2 topic hz /camera`}</Code>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Section 02 · Probable causes ──────────────────────────────── */}
      <ScrollReveal>
        <section style={{ position: 'relative', paddingBottom: 48 }}>
          <GhostNumeral n="02" top={-30} right={-20} size={400} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="lg">
              LIKELY <Red>CAUSES</Red>
            </DisplayHeading>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 18,
                marginTop: 20,
              }}
            >
              <NumberedFeatureCard
                n={1}
                title="Lens sticker"
                lede="The shipping film stays on more often than you'd think."
                body={
                  <>
                    The factory applies a clear protective film to the lens,
                    and it's the quickest thing to rule out, so it's worth a
                    peek before anything else. A frame that's uniformly dim but
                    not pure black is usually this.
                  </>
                }
                codeChip="visual check · peel film"
              />
              <NumberedFeatureCard
                n={2}
                title="camera_node crashed"
                lede="systemd thinks it's up but it isn't producing."
                body={
                  <>
                    <code style={{ fontFamily: NB.monoFont }}>racecar service restart</code>{' '}
                    clears most stuck states. If the log shows a permissions
                    error on <code style={{ fontFamily: NB.monoFont }}>/dev/video0</code>,
                    re-run <code style={{ fontFamily: NB.monoFont }}>bash scripts/setup_udev.sh</code>{' '}
                    and log out and back in so the group applies.
                  </>
                }
                codeChip="racecar service restart"
              />
              <NumberedFeatureCard
                n={3}
                title="Loose USB cable"
                lede="The camera is a USB device at the front of the car."
                body={
                  <>
                    Follow the camera&apos;s USB cable to the hub and reseat both
                    ends. Once it&apos;s re-seated,{' '}
                    <code style={{ fontFamily: NB.monoFont }}>racecar service restart</code>{' '}
                    lets the driver re-enumerate the bus.
                  </>
                }
                codeChip="reseat · restart"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="tip" title="See a frame from your laptop">
          Quick sanity check that doesn't require any Python on your laptop:
          <Code lang="bash">{`# From your laptop, with ROS 2 installed and DDS reachable:
ros2 run image_view image_view --ros-args -r image:=/camera`}</Code>
          If a window pops open with a live feed, the data path is fine and
          you only need to point your Python script at the right topic.
        </Callout>
      </ScrollReveal>

      <PrevNext
        prev={{ label: 'Motor jitter', href: '/docs/troubleshooting/motor-jitter' }}
        next={{ label: "Wi-Fi can't connect", href: '/docs/troubleshooting/wifi-cant-connect' }}
      />
    </DocsShell>
  );
}
