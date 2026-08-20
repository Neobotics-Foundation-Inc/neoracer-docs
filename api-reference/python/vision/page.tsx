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
  title: 'rc.vision · Python API · NeoRacer Docs',
  description:
    'The Vision module: get_detections returns object detections from the inference node. Each detection carries a class label, a confidence score, and a bounding box.',
};

const METHODS: ApiMethod[] = [
  {
    sig: 'rc.vision.get_detections()',
    returns: 'List[Detection]',
    summary:
      'The object detections from the latest camera frame. Each Detection has class_id (the label string), score (confidence in 0 to 1), and bbox (center x, center y, width, height, in pixels).',
  },
  {
    sig: 'rc.vision.get_detections_async()',
    returns: 'List[Detection]',
    summary:
      'The same detections but readable outside the start/update loop. This function should only be used in a Jupyter Notebook cell, after rc.go_async() has been called.',
  },
];

export default function VisionApiPage() {
  return (
    <DocsShell>
      <Crumbs
        items={[
          { label: 'API Reference', href: '/docs/api-reference/python/core' },
          { label: 'rc.vision' },
        ]}
      />

      <MouseFollowGlow>
        <section style={{ position: 'relative', paddingBottom: 32, paddingTop: 24 }}>
          <GhostNumeral n="rc" top={-40} right={-20} size={420} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <DisplayHeading size="xl">
              RC.<Red>VISION</Red>
            </DisplayHeading>
            <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
              The vision module provides object detections from the model
              running on the car.
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
    pass

def update():
    for det in rc.vision.get_detections():
        cx, cy, w, h = det.bbox
        print(f"{det.class_id} at ({cx}, {cy}), score {det.score:.2f}")

rc.set_start_update(start, update)
rc.go()`}</Code>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Callout type="note" title="Where the detections come from">
          Detections are produced by the driver&apos;s inference node, which
          runs a trained model against the camera stream. Datasets for training
          are collected with the camlabel dashboard into{' '}
          <code style={{ fontFamily: NB.monoFont }}>~/data</code>, described on
          the{' '}
          <a href="/docs/software/workspaces" style={{ color: NB.neoboticsRed, fontWeight: 700 }}>
            File system
          </a>{' '}
          page. If no model is loaded, the list is empty.
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
        prev={{ label: 'rc.display', href: '/docs/api-reference/python/display' }}
        next={{ label: 'racecar_utils', href: '/docs/api-reference/python/utils' }}
      />
    </DocsShell>
  );
}
