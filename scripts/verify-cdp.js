const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const redirects = fs.readFileSync(path.join(dist, "_redirects"), "utf8");
const index = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const required = [
  "/* https://radial-controls.pages.dev/continuous 302",
  "/gesture.html https://sorting-hat-ak1.pages.dev/gesture.html 302",
  "/mark-composer.html https://sorting-hat-ak1.pages.dev/mark-composer.html 302",
];

const missing = required.filter((line) => !redirects.includes(line));
if (missing.length) {
  throw new Error(`Missing retired-route redirects:\n${missing.join("\n")}`);
}

if (!index.includes("Onboarding V2 has been retired") || !index.includes("radial-controls.pages.dev/continuous")) {
  throw new Error("Retired fallback page does not point to Onboarding V1 continuous.");
}

console.log(JSON.stringify({
  status: "retired",
  canonical: "https://radial-controls.pages.dev/continuous",
  preservedRoutes: ["gesture.html", "mark-composer.html", "demo-one.html"],
}, null, 2));
