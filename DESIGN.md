# 20fourr — Design system

The contract for every page on the marketing site. Tokens live at the top of
`app/globals.css`; this file says what they mean and when to use them. Change the two together.

Product truth (who the users are, what may and may not be claimed) is in `PRODUCT.md`. The brand
commitments there are fixed and this system is built on them: ink ground, paper bands, amber as
the only saturated colour, green only for verified states, Big Shoulders + IBM Plex Sans + IBM
Plex Mono, mono button labels.

## Principles

1. **One thing leads per viewport.** One headline, one primary (amber) button, one proof object.
   Everything else steps down in size, weight or colour until the order is obvious in a squint.
2. **Show the mechanism, don't decorate it.** Real app screens, the duty ticket, the badge
   vocabulary. No stock imagery, no icon-tile grids standing in for content, no invented numbers.
3. **Space is the hierarchy.** Sections are separated by generous, consistent space and by changes
   of ground — not by rules, boxes and labels stacked on every heading.
4. **Restraint with colour.** Greyscale does 95% of the work. Amber marks the action, the live
   state and the one emphasised word. Green means *verified* and nothing else.
5. **Motion explains, it does not perform.** One orchestrated moment per page, crossfades where
   state changes, and nothing that hides content by default.

## Colour

Dark, fixed scheme. The use scene is a person hiring security on a phone, often after hours; the
ground is ink everywhere and there is no light/dark switch.

| Token | Value | Use |
|---|---|---|
| `--ink-0` | `#0E1316` | Deepest ground — inset stages behind screenshots, footer |
| `--ink` | `#12181B` | Page ground |
| `--ink-2` | `#1B2429` | Raised surface — panels, cards, the alternate band |
| `--ink-3` | `#232F35` | Hover / pressed surface |
| `--paper` | `#EDEFE7` | Text on ink; ground of the one paper band |
| `--amber` | `#E8A33D` | Primary button fill, live state, emphasised word |
| `--amber-hi` | `#F2B457` | Primary button hover |
| `--amber-dim` | `#8A5A12` | Amber as **text on paper** (5.1:1) |
| `--verified` / `--verified-dim` | `#3FA66B` / `#2C7A4B` | Verified states only, on ink / on paper |
| `--steel` | `#92A0A6` | Secondary text on ink (6.7:1) |
| `--steel-3` | `#84919A` | Tertiary text on ink (≥4.9:1 on `--ink-2`) |
| `--steel-dim` | `#5C6A70` | Secondary text on paper (4.8:1) |
| `--hair` / `--hair-strong` | steel at 16% / 30% | Dividers / control borders |

**Components never read raw values.** They read the semantic layer — `--bg`, `--bg-2`, `--bg-3`,
`--text`, `--text-2`, `--text-3`, `--line`, `--line-strong`, `--line-soft`, `--edge`, `--accent`,
`--ok` — which is declared for ink at `:root` and re-declared by `.band--paper` / `.on-paper`.
The same card CSS then works on either ground.

**Contrast floor:** body and small text ≥ 4.5:1, large display ≥ 3:1, checked for every text token
against every ground it sits on. Two values changed in this system for that reason: `--amber-dim`
was `#B87F2A` (2.96:1 on paper — failed) and `--text-3` was a 74% steel mix (3.8:1 on `--ink-2` —
failed).

**Band rhythm:** `.band` (ink) → `.band--ink-2` (raised) → `.band--deep` (ink-0). Adjacent bands
must differ in ground. **One** `.band--paper` per page at most, spent on the content that most
needs to be read slowly (on the homepage: what verification does not mean).

## Typography

| Role | Face | Setting |
|---|---|---|
| Display — `h1`, `h2` | Big Shoulders | 300, UPPERCASE, `opsz` 48–72, line-height 1 |
| Titles — `h3`, `h4` | IBM Plex Sans | 600, sentence case, −0.012em |
| Text | IBM Plex Sans | 400 / 500 |
| Data, codes, figures, button labels, state labels | IBM Plex Mono | 500, tabular numerals |
| Hindi (`[lang="hi"]`) | IBM Plex Sans Devanagari | 500 for headings, no case transform |

Scale (fluid display steps jump steeply; text steps are fixed):

| Token | Size | Use |
|---|---|---|
| `--fs-d1` | 42 → 64px | The page's one `h1` |
| `--fs-d2` | 34 → 52px | Section heads |
| `--fs-d3` | 24 → 32px | Sub-section heads |
| `--fs-xl` | 20px | Card and step titles |
| `--fs-lg` | 18px | Ledes |
| `--fs-md` | 16px | Body |
| `--fs-sm` | 14px | Secondary text, buttons |
| `--fs-xs` | 12px | Captions, fine print |
| `--fs-2xs` | 11px | Mono state labels |

Rules:
- Body measure 58–68ch. Headings `text-wrap: balance`; paragraphs `pretty`.
- **No eyebrow kickers above headings.** A heading carries its own weight. Mono `.label` is for
  data and states — a status, a code, a column name — never a section kicker.
- Uppercase only on `h1`/`h2` and mono labels. Never on anything a visitor reads as a sentence.
- Big Shoulders never goes above weight 400 at display size; heavy condensed caps read as a
  sports poster, the opposite of the claim.

## Space

4px grid: `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 ·
`--s-8` 64 · `--s-9` 96 · `--s-10` 128.

| Token | Value | Use |
|---|---|---|
| `--band-y` | 88 → 144px | Vertical padding of every section |
| `--head-y` | 40 → 64px | Section head to its content |
| `--measure` | 1200px | Max content width |
| `--gut` | 20 → 40px | Side gutter (16px+ at phone width, never less) |

Groups are tight, separations generous: more space above a heading than below it, and a section
head always sits closer to its own content than to the previous section.

## Shape and depth

- Radii: `--r-sm` 6px (buttons, inputs, chips), `--r-md` 10px (cards), `--r-lg` 16px (panels,
  screenshot stages). Phone frames keep their own device radius.
- Raised surfaces get a 1px `--line` border plus an inset top-edge highlight (`--edge`), and
  `--shadow-1` (cards) or `--shadow-2` (panels). Shadows always have offset and blur — no zero-blur
  block shadows, no coloured halos except the amber glow under the primary button.
- Grids of related items share hairline seams (1px gap on a `--line` background) rather than each
  item drawing its own box.

## Controls

- **Primary** `.btn--primary` — amber fill, ink label, 48px (56px `--lg`, 36px `--sm`). One per
  viewport. Hover lifts to `--amber-hi` and deepens the glow.
- **Secondary** `.btn--ghost` / `.btn--outline` — 4% text-tint fill, `--line-strong` border.
- **Text link** `.text-link` — mono, accent colour, underline on hover, optional `.btn__arw`
  arrow that nudges 3px right on hover.
- Inputs and selects: `--bg-2` fill, `--line-strong` border, 48px tall, same radius as buttons,
  so a select beside a button reads as one row.
- Every interactive element has a visible `:focus-visible` ring: 2px amber, 3px offset.

## Components

Reuse these before inventing a new container. All read the semantic layer, so they work on ink
and on paper.

| Class | What it is | Use for |
|---|---|---|
| `.sechead` | Section `h2` + `.lede`, 24px apart, `--head-y` above content | Every section opening. `--sub` for a second head inside one band |
| `.h-d3` | Display face at `--fs-d3` on any element | Sub-section heads that are not `h2` in the outline |
| `.split` / `.split__aside` | 5/7 grid, aside optionally sticky | Heading beside a long list (badges, FAQ) |
| `.stage` / `.step__stage` | Deep inset panel, amber wash from above, faint dot grid | Behind every app screenshot. Screenshots already carry their device outline — never add a second bezel |
| `.step__n` | Mono status pill pinned to a stage's top-left | The *state* a screenshot shows (Accepted, Rated, Step 01) |
| `.picker` | Step list (WAI-ARIA tablist) beside one sticky stage | A sequence of screens read one at a time, desktop. `.carousel` is its mobile form |
| seam grid (`.tiers4`, `.badges`) | 1px `--line` gaps, outer radius `--r-lg` | Sets of peer items that belong to one table |
| `.rule` | Raised card: icon tile, title, body, label footer | Stand-alone guarantees |
| `.notice` | Panel with a mono header strip and columns | A caution the visitor must read (the paper band) |
| `.ledger` | Panel with a header strip and key/value rows (`dl`) | Named consequences, statutes, terms |
| `.aside-panel` | Panel with a meta strip | Content for a secondary audience inside a page for another |
| `.closer` | Large panel with an amber glow | The page's final call to action |
| `.bookbar` | Select + primary button in one bar | A choice that retargets the one action beside it |
| `.label` | Mono 11px uppercase, `--text-3` | Codes, states, column names, card footers — placed **after** or beside a title, never above it |

Card anatomy is always: title → body → metadata. A label never precedes the heading it belongs to.

## Motion

| Token | Value | Use |
|---|---|---|
| `--dur-1` | 140ms | Hover, press |
| `--dur-2` | 240ms | State change |
| `--dur-3` | 520ms | Crossfade, entrance |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | Everything that arrives |
| `--ease-io` | `cubic-bezier(.65,0,.35,1)` | Things that move between two places |

- **One orchestrated moment per page.** Homepage: the duty ticket's rows light in sequence.
- Scroll reveal is a 16px transform-only rise from an already-visible state. Nothing is ever
  hidden waiting for JavaScript.
- `prefers-reduced-motion: reduce` shows every end state and removes every transition that moves.

## Browser surfaces

Themed, not left at defaults: text selection (amber at 30%), caret (amber), scrollbar (ink),
focus ring (amber), underline offset (0.22em), tabular numerals in every figure.

## Voice on the page

Copy is the product's own and is not rewritten by design work. Legal, compliance and factual
language — PSARA citations, percentages, refund tiers, disclaimers, badge definitions — is never
shortened or softened without the client's sign-off. Badge names are shared verbatim with the
provider directory.
