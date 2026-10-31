# Plan: Re-hue website to 5-hex primary palette + restricted typography

**Status: COMPLETE (colour + typography)**

## 1. Colour (DONE)

Palette applied: `#8dd9ea` (light cyan foreground), `#5ce2d3` (turquoise foreground), `#012947` (deep navy bg), `#002042` (midnight blue bg), `#002f3b` (dark teal bg). All mounted components use only these 5 hexes; build + typecheck pass.

## 2. Typography (DONE)

- `index.html` — Roboto/Roboto Slab replaced with all 6 approved fonts (League Spartan, Archivo Black, Anton, Bebas Neue, Playfair Display, Canvas Sans).
- `tailwind.config.ts` — `fontFamily` extension added mapping all 6 approved fonts.
- `client/global.css` — `body` set to `font-sans` (Canvas Sans).
- Component font classes applied per mapping: hero h1 → Anton, badge → Bebas Neue, section titles → League Spartan, body → Canvas Sans.

**Validation:** `npm run build` (client + server) succeeds; `npm run typecheck` shows only pre-existing errors unrelated to edits; grep confirms zero `Roboto` references in source.
