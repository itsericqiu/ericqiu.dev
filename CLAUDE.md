# ericqiu.dev — Claude Code Context

## Project Purpose
This is an Astro-based rebuild of the live portfolio site at https://www.ericqiu.dev (originally built with Typedream/Next.js). The goal is to faithfully replicate the live site's visual design and behavior as a self-hosted version deployable via Cloudflare Pages.

## Deployment
- Platform: Cloudflare Pages (via `wrangler.json`)
- Build: `npm run build` → `dist/`
- Dev: `npm run dev`

## Design Reference
The live site at https://www.ericqiu.dev is the visual source of truth. Key differences to be aware of:
- Live site uses Typedream CMS with ~1200px section containers
- This rebuild uses `--max-width: 900px` for main content sections
- Live site nav spans full browser width — replicated here (no max-width on `.nav-inner`)

## Typography
- `--font-sans`: Inter (body, hero h1)
- `--font-mono`: Space Mono (nav, company names, code)
- `--font-heading`: Quicksand (hero subtitle, CTA)
- `--font-serif`: Libre Caslon Text (accent/decorative)
- All loaded from Google Fonts

## Layout
- Fixed nav: 60px height, full browser width, `backdrop-filter: blur(12px)`
- `div.nav-spacer` (60px, `var(--bg-primary)`) is placed before `<Hero>` in index.astro so the translucent nav shows the page background color at the top, not the dark hero
- Hero section: `background: #000000`, padding starts at 20px top (spacer handles the nav offset)

## Animations
- Scroll-reveal (`.reveal` class + IntersectionObserver) applied **only to experience cards** (`ExperienceCard.astro`)
- Section titles, education rows, skills section, and CTA card do NOT animate (matches live site)
- Cards within a row have staggered `transition-delay` via `animDelay` prop

## Known Fixes Applied (vs initial scaffold)
- Nav max-width removed → full browser width
- Nav opacity: `0.95` → `0.80` (more translucent)
- Nav spacer added before hero for white-bar effect
- Hero h1: `2.5rem` → `3.5rem`; subtitle: `1.5rem` → `1.75rem`
- Nav logo text: `1rem` → `1.125rem`; nav links: `0.875rem` → `1rem`
- Experience card: removed `min-height: 300px`, padding `28px 32px`, more vertical gaps between elements, logo width `65%`
- Education card school logo max-width: `253px` → `200px`
- Emoji rendering: `👋` wrapped in `<span class="wave">` with emoji font stack; both emojis get `font-variant-emoji: emoji` + `-webkit-font-smoothing: auto`
- Reveal animation scoped to experience cards only
- Favicon: `favicon.png` is the coffee illustration (256×256, same image as live site from Typedream CDN); `favicon.svg` deleted; `Base.astro` updated to `<link rel="icon" href="/favicon.png">`
- Note: `coffee-3d.png` and `favicon.png` are the same source image — the hero uses it at full scale, favicon at 256×256

## File Structure
```
src/
  components/
    Nav.astro          — fixed nav, theme toggle, full-width layout
    Hero.astro         — dark hero section with 3D coffee image
    ExperienceCard.astro — work experience cards with scroll reveal
    EducationCard.astro  — education rows (no animation)
    Footer.astro       — footer with bio and links
  layouts/
    Base.astro         — global CSS variables, fonts, reveal animation JS
  pages/
    index.astro        — main page: nav-spacer, Hero, Work, Education, Skills, CTA, Footer
public/
  logos/               — company/school logos (bloomberg.png, addepar.png, etc.)
  coffee-3d.png        — hero 3D illustration
  profile.jpg          — profile photo (used in footer)
```
