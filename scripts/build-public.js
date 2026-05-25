const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const canonicalOnboarding = "https://radial-controls.pages.dev/continuous";

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const retiredHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=${canonicalOnboarding}" />
    <title>Onboarding V2 Retired · Redirecting to Onboarding V1</title>
  </head>
  <body>
    <main>
      <h1>Onboarding V2 has been retired.</h1>
      <p>Use the canonical Onboarding V1 continuous radial-controls flow instead.</p>
      <p><a href="${canonicalOnboarding}">Open Onboarding V1</a></p>
    </main>
  </body>
</html>
`;

fs.writeFileSync(path.join(dist, "index.html"), retiredHtml);
fs.writeFileSync(path.join(dist, "onboarding.html"), retiredHtml);

fs.writeFileSync(
  path.join(dist, "_headers"),
  [
    "/*",
    "  X-Frame-Options: DENY",
    "  X-Content-Type-Options: nosniff",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "",
  ].join("\n"),
);

fs.writeFileSync(
  path.join(dist, "_redirects"),
  [
    "/gesture.html https://sorting-hat-ak1.pages.dev/gesture.html 302",
    "/mark-composer.html https://sorting-hat-ak1.pages.dev/mark-composer.html 302",
    "/demo-one.html https://radial-controls.pages.dev/ 302",
    "/* https://radial-controls.pages.dev/continuous 302",
    "",
  ].join("\n"),
);

console.log(`Built retired Onboarding V2 redirect package in ${dist}`);
