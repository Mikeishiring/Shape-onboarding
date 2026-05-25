const today = "2026-05-25";

const questions = [
  q("role", "I mostly work as...", "Start with the identity people should route around.", "role", [
    o("product", "Product / story", "shape interface, narrative, sequencing", { x: 76, y: -62 }, { explore: 6, commit: 5 }, { design: 20, strategy: 18, gtm: 8 }),
    o("engineering", "Engineering", "systems, protocol, infra, reliability", { x: 104, y: -4 }, { commit: 14 }, { engineering: 34, research: 8 }),
    o("research", "Research", "questions, claims, assumptions, lineage", { x: 62, y: 72 }, { explore: 14 }, { research: 34, strategy: 12 }),
    o("design", "Design", "UX, visual systems, demos, information design", { x: -18, y: 106 }, { explore: 6, contribute: 4 }, { design: 34, strategy: 8 }),
    o("ops", "Community / ops", "coordination, context, people routing", { x: -94, y: 42 }, { contribute: 16 }, { ops: 34, gtm: 10 }),
    o("gtm", "GTM / BD", "users, partners, distribution, market proof", { x: -86, y: -48 }, { commit: 8, contribute: 6 }, { gtm: 34, strategy: 8 }),
  ]),
  q("team", "My team is...", "Pick a known cohort team, or use Other if the list misses you.", "team", [
    o("none", "No team", "joining as an individual", { x: 0, y: -106 }),
    o("jjhub", "JJHub", "agentic coding platform", { x: 84, y: -56 }),
    o("teesql", "TeeSQL", "TEE Postgres / confidential DB", { x: 108, y: 16 }),
    o("conclave", "Conclave", "confidential collaboration", { x: 48, y: 94 }),
    o("contexto", "Contexto", "context systems and routing", { x: -48, y: 94 }),
    o("pramaana", "Pramaana", "identity and registry", { x: -108, y: 16 }),
    o("tinycloud", "TinyCloud", "local-first infra", { x: -84, y: -56 }),
  ]),
  q("geo", "I am usually around...", "These are suggestions from the cohort surface, not a closed list.", "geo", [
    o("nyc", "NYC", "onsite / nearby", { x: 82, y: -74 }),
    o("us", "US", "US time zones", { x: 112, y: -4 }),
    o("europe", "Europe", "EU / UK overlap", { x: 62, y: 84 }),
    o("remote", "Remote", "mostly async / travel", { x: -34, y: 106 }),
    o("sf", "SF Bay", "west coast overlap", { x: -106, y: 24 }),
    o("asia", "Asia", "APAC overlap", { x: -76, y: -72 }),
  ]),
  q("domain", "The strongest domain signal is...", "This maps to Shape Rotator's controlled skill-area vocabulary.", "domain", [
    o("tee", "TEE", "trusted execution environments", { x: 88, y: -70 }, { commit: 8 }, { engineering: 20, research: 8 }),
    o("agentic", "Agentic", "agents, routing, context, runtime", { x: 112, y: 4 }, { explore: 6 }, { engineering: 14, strategy: 10 }),
    o("design", "Design", "product surfaces and UX", { x: 62, y: 86 }, { contribute: 4 }, { design: 28 }),
    o("bd-gtm", "BD / GTM", "distribution and partners", { x: -26, y: 110 }, { contribute: 8 }, { gtm: 28, strategy: 8 }),
    o("research-to-product", "Research to product", "paper lineage into product", { x: -102, y: 32 }, { explore: 10 }, { research: 20, strategy: 16 }),
    o("mechanism-design", "Mechanism design", "markets, incentives, protocols", { x: -84, y: -68 }, { explore: 8, commit: 4 }, { research: 24, strategy: 12 }),
  ]),
  q("comm_style", "Reach me fastest by...", "This writes the comm style field directly.", "comm_style", [
    o("async-context", "Async with context", "send the artifact and the ask", { x: 84, y: -78 }, { commit: 8 }, { ops: 6 }, "Async first: send context, artifact, and the concrete ask."),
    o("dm-first", "DM first", "quick DM, then route to deeper doc", { x: 112, y: -2 }, { explore: 3, contribute: 4 }, { ops: 8 }, "DM first is fine; move deeper work into a doc or issue."),
    o("issue-pr", "Issue / PR", "put work where it can be reviewed", { x: 48, y: 98 }, { commit: 10 }, { engineering: 8 }, "Use an issue or PR for anything that needs real review."),
    o("live-if-stuck", "Live if stuck", "async first, call when blocked", { x: -52, y: 96 }, { commit: 6, contribute: 5 }, { design: 4 }, "Async first; live call only when stuck or high-bandwidth discussion helps."),
    o("office-hours", "Office-hours style", "lightweight windows for asks", { x: -112, y: 0 }, { contribute: 12 }, { ops: 8 }, "Office-hours style is best for lightweight asks and routing."),
  ]),
  q("contribute_interests", "I would happily help with...", "This fills contribute interests and routing offers.", "contribute_interests", [
    o("architecture-review", "Architecture review", "boundaries, risk, failure modes", { x: 82, y: -76 }, { contribute: 16 }, { engineering: 18, research: 6 }, "architecture review"),
    o("product-pass", "Product / interface pass", "turn rough UX into a clearer path", { x: 112, y: -4 }, { contribute: 14 }, { design: 22, strategy: 8 }, "product and interface pass"),
    o("research-critique", "Research critique", "assumptions, measurement, lineage", { x: 58, y: 90 }, { contribute: 15 }, { research: 24, strategy: 8 }, "research critique"),
    o("intro-routing", "Intro routing", "who should see this and why", { x: -48, y: 98 }, { contribute: 18 }, { ops: 16, gtm: 10 }, "high-context intro routing"),
    o("demo-story", "Demo story", "positioning, demo flow, narrative", { x: -112, y: 0 }, { contribute: 12 }, { design: 12, gtm: 12 }, "demo story and positioning"),
  ]),
  q("availability_pref", "This week my rhythm is...", "This is a boundary. It should not become a productivity score.", "availability_pref", [
    o("async", "Async first", "I can respond well with written context", { x: 86, y: -74 }, { commit: 8, contribute: 6 }, { ops: 4 }, "Prefer async first; calls are best after context is written down."),
    o("live-blocks", "Live blocks", "short focused collaboration sessions", { x: 112, y: -2 }, { commit: 7, contribute: 9 }, { design: 4, engineering: 4 }, "Open to focused live blocks with a narrow agenda."),
    o("heads-down", "Heads-down", "route only high-fit asks", { x: 42, y: 102 }, { commit: 18, contribute: -10 }, { strategy: 4 }, "Heads-down this week; route only high-fit asks or blockers."),
    o("office-hours", "Open office hours", "light asks and quick conversations", { x: -62, y: 90 }, { explore: 6, contribute: 18 }, { ops: 10, gtm: 8 }, "Open to lightweight asks and office-hours style routing."),
    o("later", "Later this week", "not now, but soon", { x: -112, y: -4 }, { explore: 4, commit: 6 }, {}, "Limited early week; better later in the week."),
  ]),
  q("weekly_intention", "This week I want to...", "Pick the nearest intention, then add text at the end if needed.", "weekly_intention", [
    o("ship-prototype", "Ship a prototype", "make the thing inspectable", { x: 82, y: -78 }, { commit: 18 }, { engineering: 8, design: 8 }, "ship an inspectable prototype"),
    o("tighten-scope", "Tighten scope", "decide what matters and cut the rest", { x: 112, y: -2 }, { commit: 12 }, { strategy: 18 }, "tighten scope and decide the next concrete milestone"),
    o("find-users", "Find users", "talk to people who would care", { x: 48, y: 98 }, { explore: 10 }, { gtm: 22 }, "find the right users or partners to pressure-test the direction"),
    o("unblock-technical", "Unblock technical risk", "debug, validate, or harden a core path", { x: -56, y: 94 }, { commit: 18 }, { engineering: 18, research: 8 }, "unblock the highest-risk technical path"),
    o("learn-context", "Learn the context", "map adjacent projects and constraints", { x: -112, y: -4 }, { explore: 18 }, { research: 14, ops: 6 }, "learn the surrounding context and comparable attempts"),
  ]),
  q("dietary_restrictions", "For meals, mark...", "Use Other for anything that should not be compressed into a chip.", "dietary", [
    o("none", "No restrictions", "nothing to plan around", { x: 82, y: -76 }, {}, {}, "none"),
    o("vegetarian", "Vegetarian", "vegetarian meals", { x: 112, y: -4 }, {}, {}, "vegetarian"),
    o("vegan", "Vegan", "vegan meals", { x: 42, y: 102 }, {}, {}, "vegan"),
    o("halal", "Halal", "halal meals", { x: -62, y: 90 }, {}, {}, "halal"),
    o("allergies", "Allergies", "needs detail below", { x: -112, y: -4 }, {}, {}, "allergies - see note"),
  ]),
  q("anything_else", "Anything else to add?", "Add whatever did not fit the rings. This becomes body text, not a ranking.", "notes", [
    o("nothing", "Nothing else", "the generated profile is enough", { x: 82, y: -72 }),
    o("context", "Add context", "I want to explain a nuance", { x: 112, y: -2 }),
    o("ask-agent", "Ask my agent", "let an agent draft missing fields", { x: 40, y: 104 }),
    o("manual", "Manual note", "I want to type the rest", { x: -72, y: 82 }),
  ]),
];

const state = {
  stage: 0,
  selections: {},
  others: {},
  revealed: false,
  personId: "your-handle",
  visibility: "cohort-public",
  copied: "",
  profile: {
    name: "",
    github: "",
    x: "",
    website: "",
    linkedin: "",
  },
};

const app = document.querySelector("#app");

function q(id, title, copy, field, options) {
  return { id, title, copy, field, options: [...options, otherOption(id)] };
}

function o(id, label, desc, point, posture = {}, profile = {}, value = null) {
  return { id, label, desc, point, posture, profile, value: value ?? label };
}

function otherOption(id) {
  return {
    id: "other",
    label: "Other",
    desc: "The cohort suggestions missed this. Type your own answer.",
    point: { x: 0, y: 122 },
    posture: {},
    profile: {},
    value: "",
    isOther: true,
    source: id,
  };
}

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function slugify(value) {
  return String(value || "your-handle").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "your-handle";
}

function currentStage() {
  return questions[state.stage];
}

function selectedOption(question) {
  return question.options.find((option) => option.id === state.selections[question.id]) || null;
}

function complete() {
  return questions.every((question) => !!state.selections[question.id]);
}

function selectedEntries() {
  return questions.map((question) => {
    const option = selectedOption(question);
    if (!option) return null;
    return {
      question,
      option,
      value: answerValue(question, option),
    };
  }).filter(Boolean);
}

function answerValue(question, option) {
  if (!option) return "";
  if (option.isOther) return String(state.others[question.id] || "").trim();
  return option.value || option.label;
}

function stagePoint(entry, index) {
  const count = questions.length;
  const base = -Math.PI / 2 + index * Math.PI * 2 / count;
  const local = Math.atan2(entry.option.point.y, entry.option.point.x) * 0.32;
  const radius = 72 + Math.hypot(entry.option.point.x, entry.option.point.y) * 0.38;
  return {
    x: Math.cos(base + local) * radius,
    y: Math.sin(base + local) * radius,
    label: entry.value || entry.option.label,
    stage: entry.question.id,
  };
}

function routePoints() {
  return [{ x: 0, y: 0, label: "origin", stage: "origin" }, ...selectedEntries().map(stagePoint)];
}

function profileSlug() {
  return slugify(state.personId || state.profile.github || state.profile.name);
}

function profileField(field) {
  const entry = selectedEntries().find((item) => item.question.field === field);
  return entry?.value || "";
}

function snapshot() {
  const posture = { explore: 34, commit: 33, contribute: 33 };
  const profile = { engineering: 18, design: 18, strategy: 18, research: 18, ops: 18, gtm: 18 };
  for (const entry of selectedEntries()) {
    Object.entries(entry.option.posture || {}).forEach(([key, value]) => posture[key] += value);
    Object.entries(entry.option.profile || {}).forEach(([key, value]) => profile[key] += value);
  }
  Object.keys(posture).forEach((key) => posture[key] = Math.max(0, posture[key]));
  const total = Object.values(posture).reduce((sum, value) => sum + value, 0) || 1;
  const internal = Object.fromEntries(Object.entries(posture).map(([key, value]) => [key, Math.round(value / total * 100)]));
  internal.contribute += 100 - Object.values(internal).reduce((sum, value) => sum + value, 0);
  Object.keys(profile).forEach((key) => profile[key] = clamp(profile[key]));

  const note = profileField("notes");
  const route = routePoints().slice(1);
  return {
    schema_version: 1,
    updated_at: today,
    person: profileSlug(),
    visibility: state.visibility,
    source: "self-declared-radial-onboarding",
    profile: {
      name: state.profile.name.trim(),
      team: normalizeNone(profileField("team")),
      role: profileField("role"),
      geo: profileField("geo"),
      domain: profileField("domain"),
      links: {
        github: state.profile.github.trim(),
        x: state.profile.x.trim(),
        website: state.profile.website.trim(),
        linkedin: state.profile.linkedin.trim(),
      },
      comm_style: profileField("comm_style"),
      contribute_interests: profileField("contribute_interests"),
      availability_pref: profileField("availability_pref"),
      weekly_intention: profileField("weekly_intention"),
      dietary_restrictions: profileField("dietary"),
      notes: note === "Nothing else" ? "" : note,
    },
    internal_posture: internal,
    external_profile: profile,
    routing_preferences: {
      wants: [profileField("weekly_intention")].filter(Boolean),
      offers: [profileField("contribute_interests")].filter(Boolean),
      avoids: profileField("availability_pref").toLowerCase().includes("heads-down") ? ["generic networking", "low-context requests"] : ["generic networking"],
    },
    hidden_shape: {
      reveal_name: shapeName(internal, profile),
      vertices: route.map((point, index) => ({
        stage: point.stage,
        choice: point.label,
        x: Math.round(point.x),
        y: Math.round(point.y),
        ring_index: index + 1,
      })),
    },
  };
}

function normalizeNone(value) {
  return value === "No team" ? "" : value;
}

const visualPalette = [
  { shape: "triangle", color: "#6EE7B7" },
  { shape: "circle", color: "#5FA8FF" },
  { shape: "diamond", color: "#FFB454" },
  { shape: "hex", color: "#C7A6FF" },
  { shape: "square", color: "#5AF0FF" },
  { shape: "pentagon", color: "#F47152" },
];

const profileVisuals = {
  engineering: { shape: "triangle", color: "#6EE7B7" },
  design: { shape: "circle", color: "#5FA8FF" },
  strategy: { shape: "diamond", color: "#FFB454" },
  research: { shape: "hex", color: "#C7A6FF" },
  ops: { shape: "square", color: "#5AF0FF" },
  gtm: { shape: "pentagon", color: "#F47152" },
};

function optionVisual(option, index = 0) {
  const strongestProfile = Object.entries(option.profile || {}).sort((a, b) => b[1] - a[1])[0]?.[0];
  if (strongestProfile && profileVisuals[strongestProfile]) return profileVisuals[strongestProfile];
  if (option.isOther) return { shape: "circle", color: "#F1ECE7" };
  return visualPalette[index % visualPalette.length];
}

function glyphPoints(shape, x, y, size) {
  if (shape === "triangle") return `${x},${y - size / 2} ${x + size / 2},${y + size / 2} ${x - size / 2},${y + size / 2}`;
  if (shape === "diamond") return `${x},${y - size / 2} ${x + size / 2},${y} ${x},${y + size / 2} ${x - size / 2},${y}`;
  const sides = shape === "pentagon" ? 5 : 6;
  return Array.from({ length: sides }, (_, pointIndex) => {
    const angle = -Math.PI / 2 + pointIndex * Math.PI * 2 / sides;
    return `${(x + Math.cos(angle) * size / 2).toFixed(1)},${(y + Math.sin(angle) * size / 2).toFixed(1)}`;
  }).join(" ");
}

function glyphMarkup(shape, x, y, size, attrs = "") {
  if (shape === "circle") return `<circle ${attrs} cx="${x}" cy="${y}" r="${size / 2}"></circle>`;
  if (shape === "square") return `<rect ${attrs} x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" rx="4"></rect>`;
  return `<polygon ${attrs} points="${glyphPoints(shape, x, y, size)}"></polygon>`;
}

function shapeName(internal, profile) {
  if (!complete()) return "unresolved route";
  const posture = Object.entries(internal).sort((a, b) => b[1] - a[1])[0][0];
  const domain = Object.entries(profile).sort((a, b) => b[1] - a[1])[0][0];
  const postureWords = { explore: "scout", commit: "keystone", contribute: "relay" };
  const domainWords = { engineering: "brace", design: "lens", strategy: "map", research: "proof", ops: "hub", gtm: "signal" };
  return `${postureWords[posture]} ${domainWords[domain]}`;
}

function summary(snap = snapshot()) {
  const topPosture = Object.entries(snap.internal_posture).sort((a, b) => b[1] - a[1])[0][0];
  const topProfile = Object.entries(snap.external_profile).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([key]) => key).join(", ");
  return `This reads as ${topPosture}-leaning, with ${topProfile} as the strongest external signals.`;
}

function render() {
  const snap = snapshot();
  const question = currentStage();
  const selected = selectedOption(question);
  const progress = Math.round((selectedEntries().length / questions.length) * 100);
  app.innerHTML = `
    <header class="topbar">
      <div class="brand"><div class="brand-mark"></div><div><div class="kicker">Shape Rotator cohort ritual</div><h1>Draw your profile</h1></div></div>
      <div class="actions">
        <button class="btn" data-action="back" ${state.stage === 0 ? "disabled" : ""}>Back</button>
        <button class="btn" data-action="reset">Reset</button>
        <button class="btn primary" data-action="${complete() ? "reveal" : "next"}" ${!selected && !complete() ? "disabled" : ""}>${complete() ? "Reveal shape" : "Continue"}</button>
      </div>
    </header>
    <section class="layout">
      <article class="stage">
        <header class="stage-head">
          <div class="kicker">${state.revealed ? "Reveal" : `Stage ${state.stage + 1} of ${questions.length}`}</div>
          <h2>${state.revealed ? snap.hidden_shape.reveal_name : question.title}</h2>
          <p>${state.revealed ? `${summary(snap)} The closed line is a memory hook, not a type label.` : question.copy}</p>
        </header>
        <div class="field">${renderTrace(snap)}<div class="shape-name"><span class="micro">${state.revealed ? "closed route glyph" : "radial path"}</span><strong>${state.revealed ? snap.hidden_shape.reveal_name : `${progress}%`}</strong></div></div>
        <footer class="stage-foot">${renderSteps()}</footer>
      </article>
      <div class="side">${state.revealed ? renderReadout(snap) : renderQuestionPanel(question, snap)}${renderExport(snap)}</div>
    </section>
    ${state.copied ? `<div class="toast">${state.copied}</div>` : ""}
  `;
  app.querySelectorAll("[data-action]").forEach((el) => el.addEventListener("click", onAction));
  app.querySelectorAll(".option-port").forEach((el) => el.addEventListener("keydown", onOptionKeydown));
  app.querySelectorAll("[data-field], [data-profile], [data-other]").forEach((el) => el.addEventListener("input", onField));
}

function onOptionKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  onAction({ currentTarget: event.currentTarget });
}

function renderTrace(snap) {
  const points = routePoints();
  const drawPoints = state.revealed ? points.slice(1) : points;
  const question = currentStage();
  const routeDrift = state.revealed ? "rotate(0deg) scale(1)" : `rotate(${-6 * state.stage}deg) scale(.96)`;
  const closeLine = state.revealed && complete() ? `<polygon class="closed" points="${points.slice(1).map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ")}"></polygon>` : "";
  const currentBase = -Math.PI / 2 + state.stage * Math.PI * 2 / questions.length;
  return `<svg class="trace" viewBox="-170 -145 340 290" role="img" aria-label="Radial onboarding path">
    <defs>
      <radialGradient id="bubble-fill" cx="36%" cy="28%" r="74%">
        <stop offset="0%" stop-color="rgba(241,236,231,0.26)"></stop>
        <stop offset="58%" stop-color="rgba(143,34,14,0.30)"></stop>
        <stop offset="100%" stop-color="rgba(23,20,21,0.92)"></stop>
      </radialGradient>
      <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="8" stdDeviation="5" flood-color="rgba(0,0,0,0.42)"></feDropShadow>
      </filter>
    </defs>
    <g class="trace-base">
      <circle class="ring" cx="0" cy="0" r="44"></circle><circle class="ring" cx="0" cy="0" r="84"></circle><circle class="ring" cx="0" cy="0" r="124"></circle>
      ${questions.map((_, index) => {
        const angle = -Math.PI / 2 + index * Math.PI * 2 / questions.length;
        return `<line class="spoke" x1="${Math.cos(angle) * 34}" y1="${Math.sin(angle) * 34}" x2="${Math.cos(angle) * 132}" y2="${Math.sin(angle) * 132}"></line>`;
      }).join("")}
      ${!state.revealed ? `<line class="active-spoke" x1="${Math.cos(currentBase) * 28}" y1="${Math.sin(currentBase) * 28}" x2="${Math.cos(currentBase) * 138}" y2="${Math.sin(currentBase) * 138}"></line>` : ""}
    </g>
    <g class="trace-g route-g" style="transform:${routeDrift}">
      ${closeLine}
      ${drawPoints.slice(1).map((point, index) => `<line class="line ${index === drawPoints.length - 2 && !state.revealed ? "latest" : ""}" x1="${drawPoints[index].x}" y1="${drawPoints[index].y}" x2="${point.x}" y2="${point.y}"></line>`).join("")}
      ${state.revealed ? "" : `<circle class="origin" cx="0" cy="0" r="4"></circle>`}
      ${points.slice(1).map((point) => `<circle class="port active" cx="${point.x}" cy="${point.y}" r="7.5"></circle>`).join("")}
      ${state.revealed ? snap.hidden_shape.vertices.map((point, index) => `<text class="port-label reveal-label" x="${point.x > 72 ? point.x - 12 : point.x + 12}" y="${point.y + 3}" text-anchor="${point.x > 72 ? "end" : "start"}">${index + 1} ${shortStage(point.stage)}</text>`).join("") : ""}
    </g>
    ${state.revealed ? "" : `<g class="options-g">${renderOptionPorts(question)}</g>`}
  </svg>`;
}

function shortStage(stage) {
  return ({
    role: "role",
    team: "team",
    geo: "geo",
    domain: "domain",
    comm_style: "comm",
    contribute_interests: "offer",
    availability_pref: "time",
    weekly_intention: "intent",
    dietary_restrictions: "meal",
    anything_else: "note",
  })[stage] || stage;
}

function renderOptionPorts(question) {
  return question.options.map((option, index) => {
    const point = optionDisplayPoint(question, option, index);
    const selected = state.selections[question.id] === option.id;
    const visual = optionVisual(option, index);
    const size = selected ? 34 : option.isOther ? 22 : 28;
    return `<g class="option-port" data-action="select" data-stage="${question.id}" data-option="${option.id}" tabindex="0" role="button" aria-label="${esc(option.label)}">
      ${glyphMarkup(visual.shape, point.x, point.y, size, `class="option-glyph shape-${visual.shape} ${selected ? "active" : ""} ${option.isOther ? "other-port" : ""}" style="--option-color:${visual.color}"`)}
      <text class="bubble-num" x="${point.x}" y="${point.y + 4}" text-anchor="middle">${option.isOther ? "+" : index + 1}</text>
      ${optionLabelMarkup(option.label, point)}
    </g>`;
  }).join("");
}

function optionDisplayPoint(question, option, index) {
  if (option.isOther) {
    return { x: 0, y: 122, labelX: 0, labelY: 145, anchor: "middle" };
  }
  const nonOther = question.options.filter((item) => !item.isOther);
  const count = nonOther.length;
  const optionIndex = nonOther.findIndex((item) => item.id === option.id);
  const spread = Math.min(Math.PI * 0.92, Math.PI * 0.18 * Math.max(2, count - 1));
  const base = -Math.PI / 2 + state.stage * Math.PI * 2 / questions.length;
  const offset = count === 1 ? 0 : -spread / 2 + (spread * optionIndex) / (count - 1);
  const optionRadius = 94 + (Math.hypot(option.point.x, option.point.y) - 104) * 0.18;
  const angle = base + offset;
  const x = Math.cos(angle) * optionRadius;
  const y = Math.sin(angle) * optionRadius;
  const labelRadius = optionRadius + 28;
  const rawLabelX = Math.cos(angle) * labelRadius;
  const rawLabelY = Math.sin(angle) * labelRadius + 3;
  const labelX = rawLabelX < -92 ? -132 : rawLabelX > 92 ? 132 : rawLabelX;
  const labelY = Math.max(-122, Math.min(128, rawLabelY));
  const edgeAnchor = rawLabelX < -92 ? "start" : rawLabelX > 92 ? "end" : null;
  return {
    x,
    y,
    labelX,
    labelY,
    anchor: edgeAnchor || (labelX > 16 ? "start" : labelX < -16 ? "end" : "middle"),
  };
}

function shortOptionLabel(label) {
  return label
    .replace("Community / ops", "Ops")
    .replace("Research to product", "Research/product")
    .replace("Product / interface pass", "Product pass")
    .replace("concrete", "")
    .slice(0, 18);
}

function optionLabelMarkup(label, point) {
  const lines = optionLabelLines(label);
  const y = point.labelY - (lines.length - 1) * 4.6;
  return `<text class="bubble-label" x="${point.labelX}" y="${y}" text-anchor="${point.anchor}">${lines.map((line, index) => `<tspan x="${point.labelX}" dy="${index === 0 ? 0 : 9.2}">${esc(line)}</tspan>`).join("")}</text>`;
}

function optionLabelLines(label) {
  const compact = shortOptionLabel(label).replace(/\s+\/\s+/g, "/").trim();
  if (compact.length <= 11) return [compact];
  const slashParts = compact.split("/");
  if (slashParts.length === 2 && slashParts.every((part) => part.length <= 12)) return slashParts;

  const words = compact.split(/\s+/).filter(Boolean);
  if (words.length < 2) return [compact.slice(0, 14)];

  const lines = ["", ""];
  for (const word of words) {
    const target = lines[0].length <= lines[1].length ? 0 : 1;
    lines[target] = `${lines[target]} ${word}`.trim();
  }
  return lines.map((line) => line.slice(0, 13));
}

function renderSteps() {
  return `<div class="steps">${questions.map((question, index) => {
    const entry = selectedEntries().find((item) => item.question.id === question.id);
    return `<button class="step" data-action="jump" data-index="${index}" data-state="${entry ? "done" : index === state.stage ? "active" : "pending"}"><div class="step-k">${question.id}</div><div class="step-v">${entry ? entry.value || "other" : "not set"}</div></button>`;
  }).join("")}</div>`;
}

function renderQuestionPanel(question, snap) {
  const selected = selectedOption(question);
  return `<aside class="panel question-panel">
    <div class="micro">Radial readout</div>
    <div class="selection-card">
      <span class="choice-index">${selected ? (selected.isOther ? "+" : question.options.indexOf(selected) + 1) : state.stage + 1}</span>
      <span><span class="choice-title">${selected ? selected.label : "Choose from the visual field"}</span><span class="choice-desc">${selected ? selected.desc : "The chart is the control. This panel only mirrors the selected signal."}</span></span>
    </div>
    <div class="choice-strip">${question.options.map((option, index) => {
      const visual = optionVisual(option, index);
      return `<button class="choice-chip ${option.isOther ? "is-other" : ""}" style="--option-color:${visual.color}" data-action="select" data-stage="${question.id}" data-option="${option.id}" aria-pressed="${state.selections[question.id] === option.id}"><span class="choice-mark shape-${visual.shape}"></span><span>${option.isOther ? "Other" : shortOptionLabel(option.label)}</span></button>`;
    }).join("")}</div>
    ${selected?.isOther ? `<label class="other-box"><span class="field-label">Other ${question.id}</span><textarea class="textarea" data-other="${question.id}" placeholder="type the answer we missed">${esc(state.others[question.id] || "")}</textarea></label>` : ""}
    ${question.id === "anything_else" && selected?.id === "ask-agent" ? renderAgentAsk() : ""}
    <div class="summary">${summary(snap)}</div>
  </aside>`;
}

function renderAgentAsk() {
  return `<div class="agent-box"><div class="micro">Agent handoff draft</div><p>Ask your agent to inspect your public profile, repo activity, and cohort context, then draft missing fields for steward review.</p><button class="btn" data-action="agent-fill">Draft from agent context</button></div>`;
}

function renderReadout(snap) {
  return `<aside class="panel"><div class="micro">Generated readout</div><div class="summary">${summary(snap)}</div><div class="bars">${Object.entries(snap.external_profile).map(([key, value]) => `<div class="bar"><span>${key}</span><span class="track"><span class="fill" style="width:${value}%"></span></span><span>${value}</span></div>`).join("")}</div></aside>`;
}

function renderExport(snap) {
  const md = markdown(snap);
  return `<aside class="panel"><div class="micro">Profile setup · PR path</div><div class="manual-grid">
    <label class="row"><span class="field-label">person id</span><input class="input" data-field="personId" value="${esc(state.personId)}" placeholder="your-slug"></label>
    <label class="row"><span class="field-label">visibility</span><select class="select" data-field="visibility">${["cohort-public", "organizer-only", "public"].map((value) => `<option ${state.visibility === value ? "selected" : ""}>${value}</option>`).join("")}</select></label>
    ${manualField("name", "name", "your name")}
    ${manualField("github", "github", "username")}
    ${manualField("x", "x / twitter", "@handle")}
    ${manualField("website", "website", "https://...")}
    ${manualField("linkedin", "linkedin", "username")}
  </div><div class="output-actions"><button class="btn primary" data-action="open-pr">Open GitHub PR draft</button><button class="btn" data-action="copy">Copy markdown</button></div><div class="path">cohort-data/people/${snap.person}.md</div><pre class="preview">${esc(md)}</pre></aside>`;
}

function manualField(key, label, placeholder) {
  return `<label class="row"><span class="field-label">${label}</span><input class="input" data-profile="${key}" value="${esc(state.profile[key])}" placeholder="${esc(placeholder)}"></label>`;
}

function onAction(event) {
  const action = event.currentTarget.dataset.action;
  if (action === "select") {
    const stageId = event.currentTarget.dataset.stage;
    const optionId = event.currentTarget.dataset.option;
    const stageAtSelect = state.stage;
    const shouldAdvance = stageId === currentStage().id && optionId !== "other" && state.stage < questions.length - 1;
    state.selections[stageId] = optionId;
    state.revealed = false;
    render();
    if (shouldAdvance) {
      setTimeout(() => {
        if (state.stage === stageAtSelect && state.selections[stageId] === optionId && !state.revealed) {
          state.stage = Math.min(questions.length - 1, state.stage + 1);
          render();
        }
      }, 220);
    }
    return;
  }
  if (action === "next") {
    state.stage = Math.min(questions.length - 1, state.stage + 1);
    render();
    return;
  }
  if (action === "back") {
    state.stage = Math.max(0, state.stage - 1);
    state.revealed = false;
    render();
    return;
  }
  if (action === "jump") {
    state.stage = Number(event.currentTarget.dataset.index);
    state.revealed = false;
    render();
    return;
  }
  if (action === "reset") {
    state.stage = 0;
    state.selections = {};
    state.others = {};
    state.revealed = false;
    render();
    return;
  }
  if (action === "reveal") {
    state.revealed = true;
    render();
    return;
  }
  if (action === "agent-fill") {
    state.others.anything_else = "Agent should draft missing profile fields from my public repo/profile context and leave uncertain claims for review.";
    render();
    return;
  }
  if (action === "copy") copy(markdown(snapshot()));
  if (action === "open-pr") {
    const snap = snapshot();
    window.open(`https://github.com/dmarzzz/shape-rotator-os/new/main?filename=${encodeURIComponent(`cohort-data/people/${snap.person}.md`)}&quick_pull=1&value=${encodeURIComponent(markdown(snap))}`, "_blank", "noopener");
  }
}

function onField(event) {
  const fieldName = event.currentTarget.dataset.field;
  const profileName = event.currentTarget.dataset.profile;
  const otherName = event.currentTarget.dataset.other;
  if (fieldName) state[fieldName] = event.currentTarget.value;
  if (profileName) state.profile[profileName] = event.currentTarget.value;
  if (otherName) state.others[otherName] = event.currentTarget.value;
  refreshPreview();
}

function refreshPreview() {
  const snap = snapshot();
  const preview = app.querySelector(".preview");
  const path = app.querySelector(".path");
  if (preview) preview.textContent = markdown(snap);
  if (path) path.textContent = `cohort-data/people/${snap.person}.md`;
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    state.copied = "Markdown copied.";
  } catch {
    state.copied = "Clipboard unavailable; markdown is visible below.";
  }
  render();
  setTimeout(() => {
    state.copied = "";
    render();
  }, 1800);
}

function markdown(s) {
  return `---\nrecord_id: ${s.person}\nrecord_type: person\nname: ${yaml(s.profile.name || s.person)}\nteam: ${yamlOrNull(s.profile.team)}\nrole: ${yamlOrNull(s.profile.role)}\ngeo: ${yamlOrNull(s.profile.geo)}\ndomain: ${yamlOrNull(s.profile.domain)}\nlinks:\n  github: ${yamlOrNull(s.profile.links.github)}\n  x: ${yamlOrNull(s.profile.links.x)}\n  website: ${yamlOrNull(s.profile.links.website)}\n  linkedin: ${yamlOrNull(s.profile.links.linkedin)}\ncomm_style: ${yamlOrNull(s.profile.comm_style)}\ncontribute_interests: ${yamlOrNull(s.profile.contribute_interests)}\navailability_pref: ${yamlOrNull(s.profile.availability_pref)}\nweekly_intention: ${yamlOrNull(s.profile.weekly_intention)}\ndietary_restrictions: ${yamlOrNull(s.profile.dietary_restrictions)}\npreference_snapshot:\n  schema_version: ${s.schema_version}\n  updated_at: \"${s.updated_at}\"\n  visibility: ${s.visibility}\n  source: ${s.source}\n  internal_posture:\n${indent(mapYaml(s.internal_posture), 4)}\n  external_profile:\n${indent(mapYaml(s.external_profile), 4)}\n  routing_preferences:\n    wants:\n${indent(listYaml(s.routing_preferences.wants), 4)}\n    offers:\n${indent(listYaml(s.routing_preferences.offers), 4)}\n    avoids:\n${indent(listYaml(s.routing_preferences.avoids), 4)}\n  hidden_shape:\n    reveal_name: ${yaml(s.hidden_shape.reveal_name)}\n    vertices:\n${s.hidden_shape.vertices.length ? s.hidden_shape.vertices.map((vertex) => `      - stage: ${vertex.stage}\n        choice: ${yaml(vertex.choice)}\n        x: ${vertex.x}\n        y: ${vertex.y}\n        ring_index: ${vertex.ring_index}`).join("\n") : "      []"}\n---\n\n# ${s.profile.name || s.person}\n\n${summary(s)}${s.profile.notes ? `\n\n${s.profile.notes}` : ""}\n`;
}

function mapYaml(obj) {
  return Object.entries(obj).map(([key, value]) => `  ${key}: ${value}`).join("\n");
}

function listYaml(items) {
  return items.length ? items.map((value) => `    - ${yaml(value)}`).join("\n") : "    []";
}

function yaml(value) {
  return /^[a-z0-9_@./:-]+$/i.test(String(value)) ? String(value) : JSON.stringify(String(value));
}

function yamlOrNull(value) {
  return String(value || "").trim() ? yaml(value) : "null";
}

function indent(text, spaces) {
  return text.split("\n").map((line) => " ".repeat(spaces) + line).join("\n");
}

function esc(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

window.__hiddenOnboarding = { state, questions, snapshot, render };
render();
