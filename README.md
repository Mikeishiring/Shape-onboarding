# Shape Onboarding

Public demo: https://shape-onboarding.pages.dev/

This repo is only for the Shape Rotator preference onboarding flow. The root route is the continuous hidden-shape profile onboarding flow: a participant answers cohort setup questions by clicking predictive radial bubbles, and every answer adds one point to a route that rotates left as the line accumulates.

Each setup question is a radial chart of cohort-derived suggestions, with `Other` always available at the bottom. The next question's bubbles reorder from the profile points already selected, so the flow feels like one line being bent by predictions rather than a stack of disconnected form fields. A normal answer auto-advances; `Other` pauses for typed context. The final output remains a normal `cohort-data/people/<slug>.md` profile edit with a hidden `preference_snapshot.hidden_shape` section for the route glyph.

The Sorting Hat routing instrument is intentionally split into its own repo and Cloudflare Pages project so the onboarding surface is not mixed with the routing-mark prototype.

## Run

```powershell
npm start
```

Then open `http://localhost:4173`.

Root and `http://localhost:4173/onboarding.html` load the hidden-shape onboarding flow.

## Verify

```powershell
npm run verify
```

This drives the onboarding route through all radial setup stages in headless Edge, captures `prototype-reveal.png` and `prototype-mobile.png`, and checks that the markdown export includes `hidden_shape`.

## Deploy

```powershell
npm run deploy
```

Cloudflare Pages is connected to `Mikeishiring/Shape-onboarding` and builds `npm run build` into `dist` on the `main` production branch. Pushing to `main` triggers a production deployment. This project should continue to deploy only to `shape-onboarding.pages.dev`.

## What It Produces

- Shape Rotator person frontmatter for `cohort-data/people/<slug>.md`
- seeded setup fields: role, team, geo, domain, comm style, contribute interests, availability rhythm, weekly intention, dietary
- direct manual fields for name, GitHub, X/Twitter, website, and LinkedIn
- internal posture values that sum to 100
- external profile weights across engineering, design, strategy, research, ops, and GTM
- a hidden closed route glyph with vertices tied to onboarding choices

The current demo is frontend-only and meant for live testing before wiring back into the Shape Rotator OS profile edit flow.
