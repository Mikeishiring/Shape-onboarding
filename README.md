# Shape Onboarding

Public demo: https://shape-onboarding.pages.dev/

This is a standalone prototype for the Shape Rotator preference onboarding idea. The root route is the hidden-shape onboarding flow: a participant answers profile setup questions by clicking radial bubbles, and every answer adds a point to a route that closes into a reveal glyph at the end.

Each setup question is a radial chart of cohort-derived suggestions, with `Other` always available at the bottom. A normal answer auto-advances; `Other` pauses for typed context. The final output remains a normal `cohort-data/people/<slug>.md` profile edit with a hidden `preference_snapshot.hidden_shape` section for the route glyph.

The older three-control radial weighting prototype is preserved at `/demo-one.html`.

## Run

```powershell
npm start
```

Then open `http://localhost:4173`.

The onboarding experiment is also available at `http://localhost:4173/onboarding.html`; both root and `/onboarding.html` load the same public demo.

## Verify

```powershell
npm run verify
```

This drives the onboarding route through all radial setup stages in headless Edge, captures `prototype-reveal.png` and `prototype-mobile.png`, and checks that the markdown export includes `hidden_shape`.

## Deploy

```powershell
npm run deploy
```

This builds a clean `dist/` directory and deploys it to the Cloudflare Pages project `radial-controls` on the `main` production branch.

## What It Produces

- Shape Rotator person frontmatter for `cohort-data/people/<slug>.md`
- seeded setup fields: role, team, geo, domain, comm style, contribute interests, availability rhythm, weekly intention, dietary
- direct manual fields for name, GitHub, X/Twitter, website, and LinkedIn
- internal posture values that sum to 100
- external profile weights across engineering, design, strategy, research, ops, and GTM
- a hidden closed route glyph with vertices tied to onboarding choices

The current demo is frontend-only and meant for live testing before wiring back into the Shape Rotator OS profile edit flow.
