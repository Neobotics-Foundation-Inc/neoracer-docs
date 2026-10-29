# NeoRacer docs design rules

This file records how a docs page is built and styled. A new page must follow
these rules so it reads like the rest of the documentation. The components
named here live in the website repository under `src/components/docs/`, and
the design tokens live in `src/lib/nb-tokens.ts` (imported as `NB`).

Every change to the docs is versioned. See `CHANGELOG.md` and `version.ts`
at this repo root.

## Page anatomy

Every page is a `page.tsx` under its section folder and renders in this
order, with nothing else at the top level:

1. `<DocsShell>` wraps the whole page.
2. `<Crumbs>` with the section crumb first, then the page name.
3. The hero, wrapped in `<MouseFollowGlow>`.
4. The content sections, each wrapped in `<ScrollReveal>`.
5. `<PrevNext>` as the last element before `</DocsShell>`.

## Metadata

Every page exports a `Metadata` object with all three of:

- `alternates: { canonical: 'https://neobotics.org/docs/<section>/<page>' }`.
- `title: '<Page name> · <Section> · NeoRacer Docs'`.
- `description`: one or two plain sentences stating what the page covers.
  The search index is generated from this text, so write it for a reader,
  not for a crawler.

## The hero

The hero is a `<section>` with `position: relative`, `paddingTop: 24` and
`paddingBottom: 32`, inside `<MouseFollowGlow>`. It contains, in order:

- One `<GhostNumeral>` (see the next rule).
- A `<div style={{ position: 'relative', zIndex: 1 }}>` holding the heading,
  the lede and the badges.
- `<DisplayHeading size="xl">` with the page title in uppercase and exactly
  one word wrapped in `<Red>`.
- A lede paragraph: `NB.bodyFont`, `fontSize: 18`, `lineHeight: 1.55`,
  `color: NB.textMutedBeige`, `maxWidth: 700`.
- Optionally a badge row (see Badges).

## Ghost numerals

A page has exactly one `<GhostNumeral>`, in the hero. Its `n` is the page's
position within its sidebar section in `nav.ts`, as two digits ("01", "05").
Gated pages hold their slot in the count. Letters are not allowed. Sections
inside a page never carry their own numerals, and prose never refers to
section numbers. The standard call is
`<GhostNumeral n="NN" top={-30} right={-20} size={420} />`.

The only exception is the not-found catch-all page, which uses `n="?"`.

## Badges

Badges are `<ChromeBadge>` in a flex row under the lede
(`display: flex, gap: 8, marginTop: 16, flexWrap: wrap`).

- A procedure page carries one time badge:
  `<ChromeBadge variant="outline" icon={<ClockGlyph />}>` with
  `<AnimatedNumeral value={N} prefix="~" suffix=" minutes" />`.
- `variant="outline"` is the default look. `variant="red"` is for one short
  hardware identity tag at most. Do not stack decorative badges; if a badge
  repeats something the lede already says, drop it.

## Section headings

An in-page section is a `<section>` inside `<ScrollReveal>`, usually with
`paddingBottom: 32` to `40`. Its heading is `<DisplayHeading size="lg">`,
uppercase, with one word in `<Red>`. `size="lg"` renders the mono section
style with the red kicker bar; `size="xl"` is only for the hero.

## Body text

- Body paragraph: `NB.bodyFont`, `fontSize: 16`, `lineHeight: 1.65`,
  `color: NB.textMutedBeige`, `maxWidth: 720`. A follow-on paragraph adds
  `marginTop: 14`.
- Inline code and file names: `<code style={{ fontFamily: NB.monoFont }}>`.
- Inline links: `<a>` with `color: NB.neoboticsRed, fontWeight: 700`.
  External links also take `target="_blank" rel="noopener noreferrer"`.
- `<MonoLabel>` is the small uppercase label that introduces a table, a list
  of steps or a photo block ("Motor specs", "The ESC switch").

## Writing style

Short plain sentences, actor first, one fact per sentence. No fluff, no
jokes, no emojis. Address the reader as "you". Name exact things: the real
file name, the real command, the real button label. If a procedure was not
run end to end on real hardware, the page does not ship (see Gated pages).

## Lists and steps

- `<DashList>` for unordered items. Lead each item with a bold phrase when
  the list mixes topics ("**A charged battery.** The firmware refuses...").
- `<NumberedSteps>` for ordered actions. Each step is
  `{ title, detail, mono? }`; set `mono: true` only when the title is a
  literal control or command name.
- Do not number steps in prose across sections. Refer to a section by its
  name instead.

## Callouts (note boxes)

`<Callout type="..." title="...">` renders a solid header strip with a fixed
eyebrow per type. Pick the type by meaning:

| Type     | Eyebrow  | Use for                                           |
| -------- | -------- | ------------------------------------------------- |
| `note`   | Note     | context and reassurance the reader may skip       |
| `tip`    | Tip      | a shortcut or a quicker path                      |
| `warn`   | Heads up | something that commonly goes wrong                |
| `danger` | Danger   | risk of damage, data loss or injury               |

Brand red is reserved for `danger`. Give every callout a short title.

## InfoNote

`<InfoNote term="..." title="...">` defines a term inline, in place, the
first time the page uses it. The children are the definition. Use it instead
of a parenthetical explanation.

## Code blocks

`<Code lang="...">` with a template literal. `lang` is `bash`, `python`,
`yaml` or `output`. Commands are written exactly as the reader runs them,
with placeholders in angle brackets (`<car-address>`). Comments inside a
block start with `#` and are sentences.

## Tables

`<DataTable>` with `columns` of `{ key, label, accent?, mono?, width? }`.
The first column takes `accent: true`. Use `mono: true` for columns holding
values, commands or part numbers. Spec tables use the column pair
Parameter (width 180px, accent) and Specification (mono). Problem tables use
Message (accent) and What to do.

## Figures

A figure is `<Fig label="FIG. X / NAME" caption="...">`. Lettering restarts
on every page: the first figure on a page is FIG. A, the second FIG. B. The
label is uppercase. The caption is one italic sentence; when the figure is
interactive, the caption tells the reader so ("Click a component to see how
it connects."). Figure art that sits on white takes `bg={NB.haloWhite}`.

A plain image inside a Fig uses next/image with its real `width` and
`height`, `width: '100%'`, `height: 'auto'` and a `maxWidth` around 720.

## Diagrams

Reusable diagrams live in `src/components/docs/Diagrams.tsx` (and sibling
files) in the website repository, never inline in a page. They draw with NB
tokens only: `NB.tarmacBlue` linework and labels, `NB.neoboticsRed` accents,
`NB.monoFont` captions. An interactive diagram expands on click to an info
card, and its Fig caption says what clicking does.

## Photos

Photos live in the website repository under `public/images/<area>/`. Inside
step content, photos attach through `<PhotoSteps>`: each item is
`{ text, photos: [{ src, alt }] }`, which renders the "show a photo" chip
and a lightbox. Write a real `alt` sentence. Compress photos to roughly
1600 px on the long edge before committing.

## Navigation wiring

Adding, removing or renaming a page touches four places:

1. `nav.ts` in the website repository (the sidebar tree).
2. The search index: run `node scripts/build-search-index.mjs` in the
   website repository after any nav or metadata change.
3. `<PrevNext>` on the page and on both neighbours, so the reading chain
   stays unbroken. A label is always the target page's sidebar name from
   `nav.ts`, nothing more, including across a section boundary. A link to
   `/docs` is labelled "Home". Crumbs and every other reference to a page
   also use its sidebar name, even when the page's own title differs.
4. The contents list on the docs home page derives its counts and links
   from `nav.ts`, so it updates on its own.

The sidebar order is the reading order, and gated pages are skipped in the
PrevNext chain until they un-gate.

## Gated pages

A page that is not ready ships with `disabled: true` on its `nav.ts` leaf.
It renders greyed out and unclickable in the sidebar, is excluded from the
search index, and keeps its numeral slot in its section. A page un-gates
only once its procedure has been run end to end on real hardware, and
un-gating is a MINOR version bump (see `CHANGELOG.md`).

## Legal pages

Legal pages are PDF shells, not prose pages. The pattern: hero with ghost
numeral and `<DisplayHeading>`, no lede, one solid red button
(`background: NB.neoboticsRed`, `color: NB.haloWhite`, radius 8, no arrow)
linking the official PDF in `public/docs/`, a mono file-name caption under
the button, and `<PrevNext>`. The PDF is the single source of truth; the
page never restates its content.

## Versioning

One merged docs PR is one version bump. The changelog entry and the
`version.ts` bump ride in the same PR as the change. MAJOR is a new car
generation or a ground-up restructure, MINOR is a change to the page list or
a substantial rewrite of a page, PATCH is everything else. The PR body
quotes the changelog entry.
