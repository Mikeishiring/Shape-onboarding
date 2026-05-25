# Onboarding V2

Public demo: https://shape-onboarding.pages.dev/

This repo is Onboarding V2: the current Shape Rotator hidden-shape preference onboarding flow. The root route is the continuous hidden-shape profile onboarding flow: a participant answers cohort setup questions by drawing through predictive radial bubbles, and every answer adds one point to a route that becomes the hidden shape.

Each setup question is a radial chart of cohort-derived suggestions, with `Other` always available at the bottom. The next question's bubbles reorder from the profile points already selected, so the flow feels like one line being bent by predictions rather than a stack of disconnected form fields. A normal answer auto-advances; `Other` pauses for typed context. The final output remains a normal `cohort-data/people/<slug>.md` profile edit with a hidden `preference_snapshot.hidden_shape` section for the route glyph.

Onboarding V1 lives in the `Radial-controls` repo. Sorting Hat is intentionally split into its own repo and Cloudflare Pages project because it is a separate routing-mark identity project, not an onboarding version.

## Run

```powershell
npm start
```

Then open `http://localhost:4173`.

Root and `http://localhost:4173/onboarding.html` load the Onboarding V2 hidden-shape flow.

## Verify

```powershell
npm run verify
```

This drives the onboarding route through all radial setup stages in headless Edge, captures `prototype-reveal.png` and `prototype-mobile.png`, and checks that the markdown export includes `hidden_shape`.

## Deploy

```powershell
npm run deploy
```

Cloudflare Pages is connected to `Mikeishiring/Shape-onboarding` and builds `npm run build` into `dist` on the `main` production branch. Pushing to `main` triggers a production deployment. This project should continue to deploy only Onboarding V2 to `shape-onboarding.pages.dev`.

## Project Boundary

- `Shape-onboarding`: Onboarding V2, the current hidden-shape onboarding flow. GitHub: `Mikeishiring/Shape-onboarding`. Cloudflare Pages: `shape-onboarding` / `https://shape-onboarding.pages.dev/`.
- `Sorting-hat`: separate routing-mark identity project, not an onboarding version. GitHub: `Mikeishiring/Sorting-hat`. Cloudflare Pages: `sorting-hat` / `https://sorting-hat-ak1.pages.dev/`.
- `Radial-controls`: Onboarding V1, the radial-controls onboarding prototype. GitHub: `Mikeishiring/Radial-controls`. Cloudflare Pages: `radial-controls` / `https://radial-controls.pages.dev/`.
- Old prototype routes redirect to their owning project instead of being served from this repo.

Related origin note: `radial-dial` is a reusable React marking-menu/radial-dials component, not one of the three deployed products above.

## What It Produces

- Shape Rotator person frontmatter for `cohort-data/people/<slug>.md`
- seeded setup fields: role, team, geo, domain, comm style, contribute interests, availability rhythm, weekly intention, dietary
- direct manual fields for name, GitHub, X/Twitter, website, and LinkedIn
- internal posture values that sum to 100
- external profile weights across engineering, design, strategy, research, ops, and GTM
- a hidden closed route glyph with vertices tied to onboarding choices

The current demo is frontend-only and meant for live testing before wiring back into the Shape Rotator OS profile edit flow.
