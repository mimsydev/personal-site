# Personal Site Project Plan

Oct 4, 2026 · @Johnathan Rhoades

## Overview

Get a plain Zola landing page live on your domain in the first two sessions, then design it properly and build out from there. Each task below is sized for one 1–2 hour session; tick it off when done.

**Decided so far**

- Generator: Zola (Rust), served at `/rust`, with Blazor at `/dotnet` later
- Hosting: Cloudflare Workers (static assets), deployed from GitHub Actions on push
- Design: Figma mockups
- Domain: already owned; no branding yet

**Suggested tools for what's still open**

| Need | Tool | Why |
| --- | --- | --- |
| Mockups | [Figma](https://www.figma.com) (free tier) | Your pick; use auto layout and variables for colors |
| Color palette | [Realtime Colors](https://www.realtimecolors.com) | Previews a palette on a real page, light and dark |
| Palette ideas | [Coolors](https://coolors.co) | Quick generation and contrast checks |
| Typography | [Google Fonts](https://fonts.google.com), [Fontpair](https://www.fontpair.co) | Free, self-hostable fonts and proven pairings |
| Type scale | [Typescale](https://typescale.com) | Picks consistent heading sizes |
| Contrast check | Figma's Stark plugin or [WebAIM](https://webaim.org/resources/contrastchecker/) | Meets WCAG AA |
| Icons | [Lucide](https://lucide.dev), [Simple Icons](https://simpleicons.org) | Clean UI icons; brand icons for socials |
| Logo or monogram | Figma itself | A simple wordmark or initials is enough |
| Inspiration | [Land-book](https://land-book.com), [personalsit.es](https://personalsit.es) | Real developer sites to borrow ideas from |

**Session habit:** start by reading the next unchecked task, end by committing and writing one line of notes on where you stopped.

## Phase 1: Plain landing page live (2–3 sessions)

Goal: your name, one line about you, and social links, served at `yourdomain/rust` with `/` redirecting there. No design work yet; ugly is fine.

**Session 1 — Local Zola site**

- [ ] Install Zola and confirm `zola --version`
- [ ] Create the repo with the layout: `rust/`, `shared/`, `content/`, `dotnet/` (empty for now)
- [ ] Run `zola init` inside `rust/`, set `base_url` to your domain plus `/rust`
- [ ] Add `templates/index.html` with name, tagline, and links to GitHub and LinkedIn
- [ ] Run `zola serve` and check it locally
- [ ] Push to GitHub

**Session 2 — Deploy**

- [ ] Create a Cloudflare API token with Workers Scripts edit rights (plus Workers Routes and DNS edit for the custom domain)
- [ ] Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets
- [ ] Add the workflow (Zola build step only; skip the .NET step for now)
- [ ] Generate `dist/_redirects` with `/ /rust/ 302`
- [ ] Push and confirm the `*.workers.dev` URL works

**Session 3 — Domain**

- [ ] Point your domain at Cloudflare (move nameservers if it's registered elsewhere)
- [ ] Detach the domain from any old Pages project, let the `custom_domain` route in `wrangler.toml` attach it to the Worker, and confirm HTTPS
- [ ] Visit `/` and confirm it redirects to `/rust`

**Done when:** a push to `main` updates the live site within a couple of minutes.

## Phase 2: Visual design in Figma (4–5 sessions)

Goal: a small design system and mockups for the landing page, blog list, and blog post, in light and dark, desktop and mobile.

**Session 4 — Direction**

- [ ] Collect 8–10 sites you like from Land-book and personalsit.es into a Figma moodboard page
- [ ] Write three words for how the site should feel (for example: calm, precise, friendly)
- [ ] Note what to borrow from each reference: layout, type, color, or detail

**Session 5 — Color and type**

- [ ] Build a palette in Realtime Colors: background, surface, text, muted text, one accent
- [ ] Make a dark version of each color
- [ ] Check text and accent contrast against WCAG AA
- [ ] Pick a font pairing (or one font plus a monospace for code) and a type scale
- [ ] Save colors as Figma variables with light and dark modes, and type as text styles

**Session 6 — Brand and components**

- [ ] Make a simple wordmark or monogram and a favicon version
- [ ] Set a spacing scale (4 or 8 px base) and max content width
- [ ] Build components: nav, social link row, button, post card, project card, footer, theme toggle

**Session 7 — Landing page mockups**

- [ ] Desktop (1440 wide) and mobile (390 wide) frames, light and dark
- [ ] Sections: hero with name and tagline, short about, featured projects, latest posts, socials

**Session 8 — Blog mockups and review**

- [ ] Blog index and single post layouts, including code blocks, headings, and images
- [ ] Review everything at real size on your phone using the Figma mobile app
- [ ] Fix anything that feels cramped or off, then freeze v1

**Tip:** keep it restrained. One accent color, generous whitespace, and good type will carry the design.

## Phase 3: Build the design in Zola (3–4 sessions)

Goal: the live landing page matches the Figma mockups, with working dark mode.

**Session 9 — Design tokens and base layout**

- [ ] Write `shared/site.css` with CSS custom properties copied from your Figma variables
- [ ] Add dark values under `prefers-color-scheme: dark` and a `[data-theme]` override
- [ ] Self-host the fonts (download from Google Fonts) and add font-display swap
- [ ] Create `templates/base.html` with head, nav, and footer; have `index.html` extend it

**Session 10 — Landing page sections**

- [ ] Build the hero, about, and socials sections from the mockups
- [ ] Add social icons as inline SVG from Simple Icons
- [ ] Check the layout at 390 px and 1440 px widths

**Session 11 — Theme toggle and favicon**

- [ ] Add a small script that toggles `data-theme` and remembers the choice in localStorage
- [ ] Prevent a flash of the wrong theme by setting it in the head before paint
- [ ] Export favicon and an Apple touch icon from Figma

**Session 12 — Check and ship**

- [ ] Run Lighthouse; aim for 95+ on performance and accessibility
- [ ] Test keyboard navigation and visible focus states
- [ ] Deploy and check on a real phone

## Phase 4: Blog (3 sessions)

Goal: Markdown posts in the shared `content/` folder, rendered with an index page, post pages, and an RSS feed.

**Session 13 — Blog section**

- [ ] Create `content/blog/_index.md` and link Zola to the shared content folder (symlink or a copy step in CI)
- [ ] Build `section.html` (post list) and `page.html` (single post) from the mockups
- [ ] Add front matter conventions: title, date, description, tags

**Session 14 — Post details**

- [ ] Turn on Zola syntax highlighting and pick a theme that matches your palette
- [ ] Style headings, lists, quotes, images, and inline code
- [ ] Show date and reading time; add tags via Zola taxonomies
- [ ] Show the three latest posts on the landing page

**Session 15 — Feed and first post**

- [ ] Enable `generate_feeds` and link the feed in the head
- [ ] Write and publish a first short post (for example, how you built this site)

## Phase 5: Projects, SEO, and polish (3 sessions)

**Session 16 — Projects**

- [ ] Pick 3–5 projects; write a short entry for each: what it is, your role, stack, links
- [ ] Add a projects section (or page) using the project card component

**Session 17 — SEO and sharing**

- [ ] Add title and meta description per page from front matter
- [ ] Design an Open Graph image template in Figma (1200 × 630) and export a default
- [ ] Add Open Graph and Twitter card tags; test with a link preview checker
- [ ] Enable the Zola sitemap and add `robots.txt`

**Session 18 — Extras**

- [ ] Add privacy-friendly analytics (Cloudflare Web Analytics is free and built in)
- [ ] Add a 404 page in your style
- [ ] Optional: `/uses` or `/now` page, resume link

## Phase 6: Blazor site at /dotnet (later, 4–6 sessions)

Start this only once the Rust site is complete and you're posting regularly.

- [ ] Scaffold a BlazorStatic project in `dotnet/` with `<base href="/dotnet/">`
- [ ] Reuse `shared/site.css` and port the base layout and landing page as Razor components
- [ ] Render the shared `content/blog` Markdown posts
- [ ] Add canonical tags pointing each page to its `/rust` equivalent
- [ ] Add the .NET build step to the workflow and merge output into `dist/dotnet`
- [ ] Add a small "view this site in Rust / .NET" switch in the footer of both

## Open questions

- [ ] Is your domain registered with Cloudflare, or will you move nameservers? (needed by Session 3)
- [ ] Write Zola templates from scratch, or start from a theme and restyle it? (Session 1)
- [ ] Which socials to list beyond GitHub and LinkedIn? (Session 1)
- [ ] Projects on the landing page only, or a separate projects page? (Session 7)
- [ ] Comments on posts (for example Giscus via GitHub Discussions), or none? (Session 14)
