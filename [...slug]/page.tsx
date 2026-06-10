import Link from 'next/link';
import type { Metadata } from 'next';
import DocsShell from '@/components/docs/DocsShell';
import { NB } from '@/lib/nb-tokens';
import {
  Eyebrow,
  DisplayHeading,
  Red,
  GhostNumeral,
  MonoLabel,
  ChromeBadge,
} from '@/components/docs/Editorial';
import { Crumbs } from '@/components/docs/DocsPrimitives';
import { docsNav, type DocsNavGroup, type DocsNavLeaf } from '@/lib/docs/nav';

/* ─────────────────────────────────────────────────────────────────────────
 * Docs catch-all (placeholder for unwritten pages).
 *
 * Next.js routes more-specific paths before this, any real page under
 * /docs/* wins over this file. This renders for everything else that the
 * sidebar references but hasn't been authored yet.
 *
 * The page reads the slug, walks docsNav to find a matching leaf, and shows:
 *   - a humanised title (from the nav title if found, else the slug)
 *   - which spine/group it belongs to ("Part of: Hardware › Sensors")
 *   - sibling links so the user can navigate to neighbouring real pages
 *   - links back to existing pages
 *
 * Designed to feel like a deliberate placeholder, not a 404.
 * ─────────────────────────────────────────────────────────────────────── */

type MatchResult = {
  leaf?: DocsNavLeaf;
  groupTrail: string[];
  siblings: DocsNavLeaf[];
};

function isGroup(item: DocsNavGroup | DocsNavLeaf): item is DocsNavGroup {
  return (item as DocsNavGroup).children !== undefined;
}

function findInNav(
  items: (DocsNavGroup | DocsNavLeaf)[],
  href: string,
  trail: string[] = [],
): MatchResult | null {
  for (const item of items) {
    if (isGroup(item)) {
      const next = [...trail, item.title];
      const found = findInNav(item.children, href, next);
      if (found) {
        // If a direct leaf-only match found, also surface its siblings.
        if (found.siblings.length === 0) {
          found.siblings = item.children.filter(
            (c): c is DocsNavLeaf => !isGroup(c),
          );
        }
        return found;
      }
    } else if (item.href === href) {
      return { leaf: item, groupTrail: trail, siblings: [] };
    }
  }
  return null;
}

function humaniseSlug(slug: string[]): string {
  const last = slug[slug.length - 1] ?? 'page';
  return last
    .split('-')
    .map((w) => (w.length <= 2 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const href = '/docs/' + params.slug.join('/');
  const match = findInNav(docsNav, href);
  const title = match?.leaf?.title ?? humaniseSlug(params.slug);
  return {
    title: `${title} · NeoRacer Docs (coming soon)`,
    description: `${title} is part of the NeoRacer documentation roadmap. This page is planned but not yet written.`,
    robots: { index: false, follow: true },
  };
}

export default function DocsCatchAllPage({ params }: { params: { slug: string[] } }) {
  const href = '/docs/' + params.slug.join('/');
  const match = findInNav(docsNav, href);
  const title = match?.leaf?.title ?? humaniseSlug(params.slug);
  const trail = match?.groupTrail ?? [];
  const siblings = (match?.siblings ?? []).filter((s) => s.href !== href);

  const crumbItems = [{ label: 'Docs', href: '/docs' }];
  trail.forEach((t) => crumbItems.push({ label: t, href: '' as string }));
  crumbItems.push({ label: title, href: '' as string });

  return (
    <DocsShell>
      <Crumbs
        items={crumbItems.map((c) => ({ label: c.label, href: c.href || undefined }))}
      />

      <section style={{ position: 'relative', paddingBottom: 32 }}>
        <GhostNumeral n="?" top={-40} right={-20} size={420} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>{trail.length > 0 ? trail.join(' / ').toUpperCase() : 'DOCS ROADMAP'}</Eyebrow>
          <DisplayHeading size="xl">
            {title.toUpperCase().split(' ').slice(0, -1).join(' ')}{' '}
            <Red>{title.toUpperCase().split(' ').slice(-1).join(' ')}.</Red>
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 18, lineHeight: 1.55, color: NB.textMutedBeige, maxWidth: 680 }}>
            This page is part of the v1 NeoRacer documentation roadmap, and
            we&apos;re writing it now. The sidebar already includes it so the
            full information architecture is visible, but the content itself
            isn&apos;t live yet.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <ChromeBadge variant="red">Coming soon</ChromeBadge>
            {trail.map((t) => (
              <ChromeBadge key={t} variant="outline">{t}</ChromeBadge>
            ))}
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <section style={{ paddingBottom: 32 }}>
          <Eyebrow>While you wait</Eyebrow>
          <DisplayHeading size="lg">
            NEIGHBOURING <Red>PAGES</Red>.
          </DisplayHeading>
          <p style={{ fontFamily: NB.bodyFont, fontSize: 16, lineHeight: 1.65, color: NB.textMutedBeige, maxWidth: 720 }}>
            Other pages in this section. Some may already be written.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 18 }}>
            {siblings.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                style={{
                  background: NB.haloWhite,
                  border: `1px solid ${NB.borderOnBeige}`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  textDecoration: 'none',
                  color: NB.textOnBeige,
                  boxShadow: NB.shadowCard,
                }}
              >
                <MonoLabel>Sibling page</MonoLabel>
                <div style={{ fontFamily: NB.headingFont, fontSize: 16, fontWeight: 700, letterSpacing: '0.01em' }}>
                  {s.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ paddingBottom: 24 }}>
        <Eyebrow>Or jump to</Eyebrow>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
          <Link
            href="/docs"
            style={{
              background: NB.haloWhite,
              border: `1px solid ${NB.tarmacBlue}`,
              borderRadius: 8,
              padding: '10px 16px',
              fontFamily: NB.bodyFont,
              fontSize: 14,
              fontWeight: 700,
              color: NB.tarmacBlue,
              textDecoration: 'none',
            }}
          >
            Docs home
          </Link>
          <Link
            href="/docs/getting-started/unbox"
            style={{
              background: NB.neoboticsRed,
              color: NB.haloWhite,
              borderRadius: 8,
              padding: '10px 16px',
              fontFamily: NB.bodyFont,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: NB.shadowAccent,
            }}
          >
            Start: Unbox →
          </Link>
        </div>
      </section>
    </DocsShell>
  );
}
