# NeoRacer Docs

The customer documentation for the [NeoRacer](https://neobotics.org), the 1/12 scale autonomous racing car from the Neobotics Foundation. These pages are what you see at **[neobotics.org/docs](https://neobotics.org/docs)**.

## How it works

This repository is the public source of the docs **pages**. It is mounted into the Neobotics website as a **git submodule** at `src/app/docs`, so changes that land here flow to the live docs on neobotics.org/docs.

The pages are Next.js App Router routes (`.tsx`). They render through a docs design system, the layout, headings, callouts, diagrams, the inline explainer, and the design tokens, that lives in the website itself. Those `@/...` imports resolve during the website build. **This repo does not build on its own**; it is only ever built as part of the website. That separation is deliberate: the documentation content is public, while the rendering system and the rest of the site stay private.

## Editing a page

A route folder maps to a URL. `getting-started/unbox/page.tsx` serves `/docs/getting-started/unbox`. Edit the text and structure in the page file and open a pull request; once it is merged the site redeploys with the change.

The components the pages import (`DocsShell`, `Eyebrow`, `DisplayHeading`, `Callout`, `Code`, `DataTable`, `InfoNote`, the diagrams) come from the website's docs design system. Match what neighbouring pages already do; the props are consistent across the docs.

## What is here

Route folders, one per section of `/docs`:

`getting-started/` · `hardware/` (including `sensors/` and the OSCORE board) · `software/` · `api-reference/` (Python + ROS 2) · `calibration/` · `roboracer/` · `troubleshooting/` · `reference/` · `legal/`
