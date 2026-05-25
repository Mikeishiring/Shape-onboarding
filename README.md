# Onboarding V2 Retired Archive

Retired host: https://shape-onboarding.pages.dev/

Onboarding V2 has been removed from active use. The canonical onboarding product is now Onboarding V1, specifically the continuous radial-controls flow at https://radial-controls.pages.dev/continuous.

This repo is kept only as an archive of the retired hidden-shape experiment. The Cloudflare Pages project `shape-onboarding` should redirect normal traffic to Onboarding V1. The old V2 source remains in `src/` for reference, but it should not be deployed as the public onboarding surface.

Sorting Hat remains intentionally split into its own repo and Cloudflare Pages project because it is a separate routing-mark identity project, not an onboarding version.

## Run

```powershell
npm start
```

Then open `http://localhost:4173`.

Root and `http://localhost:4173/onboarding.html` show a retired fallback page that points to Onboarding V1.

## Verify

```powershell
npm run verify
```

This checks that the built Cloudflare package redirects normal onboarding traffic to Onboarding V1 while preserving old Sorting Hat routes.

## Deploy

```powershell
npm run deploy
```

Cloudflare Pages is connected to `Mikeishiring/Shape-onboarding` and builds `npm run build` into `dist` on the `main` production branch. Pushing to `main` triggers a production deployment. This project should deploy only the retirement redirect package to `shape-onboarding.pages.dev`.

## Project Boundary

- `Radial-controls`: canonical onboarding product, formerly Onboarding V1. GitHub: `Mikeishiring/Radial-controls`. Cloudflare Pages: `radial-controls` / `https://radial-controls.pages.dev/`.
- `Shape-onboarding`: retired Onboarding V2 archive. GitHub: `Mikeishiring/Shape-onboarding`. Cloudflare Pages: `shape-onboarding` / `https://shape-onboarding.pages.dev/`, redirected to Onboarding V1.
- `Sorting-hat`: separate routing-mark identity project, not an onboarding version. GitHub: `Mikeishiring/Sorting-hat`. Cloudflare Pages: `sorting-hat` / `https://sorting-hat-ak1.pages.dev/`.
- Old prototype routes redirect to their owning project instead of being served from this repo.

Related origin note: `radial-dial` is a reusable React marking-menu/radial-dials component, not one of the three deployed products above.

## Retired V2 Source

The retired V2 experiment produced Shape Rotator person frontmatter, seeded setup fields, hidden route glyphs, and `preference_snapshot.hidden_shape` output. That direction is no longer the active onboarding product.
