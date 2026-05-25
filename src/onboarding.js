const today = "2026-05-25";

const stages = [
  stage("role", "I mostly work as...", "role", [
    opt("product", "Product / story", "narrative, shape interface, sequencing", { design: 24, strategy: 18, gtm: 8 }, { explore: 8, commit: 5 }),
    opt("engineering", "Engineering", "systems, protocol, reliability", { engineering: 34, research: 8 }, { commit: 16 }),
    opt("research", "Research", "questions, claims, lineage", { research: 34, strategy: 10 }, { explore: 16 }),
    opt("design", "Design", "UX, visual systems, demos", { design: 34, strategy: 8 }, { explore: 8, contribute: 4 }),
    opt("ops", "Community / ops", "people routing, context, cadence", { ops: 32, gtm: 8 }, { contribute: 16 }),
    opt("gtm", "GTM / BD", "users, partners, proof", { gtm: 34, strategy: 8 }, { commit: 8, contribute: 6 }),
  ]),
  stage("team", "The team I orbit is...", "team", [
    opt("none", "No team", "joining as an individual"),
    opt("jjhub", "JJHub", "agentic coding platform", { engineering: 18, design: 8 }),
    opt("teesql", "TeeSQL", "TEE Postgres / confidential DB", { engineering: 24, research: 8 }),
    opt("conclave", "Conclave", "confidential collaboration", { research: 18, ops: 8 }),
    opt("contexto", "Contexto", "context systems and routing", { design: 14, ops: 14 }),
    opt("pramaana", "Pramaana", "identity and registry", { research: 12, strategy: 12 }),
    opt("tinycloud", "TinyCloud", "local-first infra", { engineering: 22, ops: 8 }),
  ]),
  stage("geo", "I am usually around...", "geo", [
    opt("nyc", "NYC", "onsite / nearby", {}, { contribute: 6 }),
    opt("us", "US", "US time zones"),
    opt("europe", "Europe", "EU / UK overlap"),
    opt("remote", "Remote", "mostly async / travel", {}, { explore: 5 }),
    opt("sf", "SF Bay", "west coast overlap", { gtm: 6 }),
    opt("asia", "Asia", "APAC overlap"),
  ]),
  stage("domain", "My strongest domain signal is...", "domain", [
    opt("tee", "TEE", "trusted execution environments", { engineering: 20, research: 8 }, { commit: 8 }),
    opt("agentic", "Agentic", "agents, context, runtime", { engineering: 14, strategy: 10 }, { explore: 6 }),
    opt("design", "Design", "product surfaces and UX", { design: 28 }, { contribute: 4 }),
    opt("bd-gtm", "BD / GTM", "distribution and partners", { gtm: 28, strategy: 8 }, { contribute: 8 }),
    opt("research-product", "Research to product", "paper lineage into product", { research: 20, strategy: 16 }, { explore: 10 }),
    opt("mechanism", "Mechanism design", "markets, incentives, protocols", { research: 24, strategy: 12 }, { explore: 8, commit: 4 }),
  ]),
  stage("comm_style", "Reach me fastest by...", "comm_style", [
    opt("async-context", "Async with context", "artifact plus concrete ask", { ops: 8 }, { commit: 8 }, "Async first: send context, artifact, and the concrete ask."),
    opt("dm-first", "DM first", "quick DM then deeper doc", { ops: 8 }, { explore: 3, contribute: 4 }, "DM first is fine; move deeper work into a doc or issue."),
    opt("issue-pr", "Issue / PR", "reviewable work surface", { engineering: 8 }, { commit: 10 }, "Use an issue or PR for anything that needs real review."),
    opt("live-if-stuck", "Live if stuck", "call only after async context", { design: 4 }, { commit: 6, contribute: 5 }, "Async first; live call only when stuck or high-bandwidth discussion helps."),
    opt("office-hours", "Office-hours style", "lightweight windows for asks", { ops: 8 }, { contribute: 12 }, "Office-hours style is best for lightweight asks and routing."),
  ]),
  stage("contribute_interests", "I would help with...", "contribute_interests", [
    opt("architecture-review", "Architecture review", "boundaries, risk, failure modes", { engineering: 18, research: 6 }, { contribute: 16 }, "architecture review"),
    opt("product-pass", "Product / interface pass", "turn rough UX into path", { design: 22, strategy: 8 }, { contribute: 14 }, "product and interface pass"),
    opt("research-critique", "Research critique", "assumptions and measurement", { research: 24, strategy: 8 }, { contribute: 15 }, "research critique"),
    opt("intro-routing", "Intro routing", "who should see this and why", { ops: 16, gtm: 10 }, { contribute: 18 }, "high-context intro routing"),
    opt("demo-story", "Demo story", "positioning and demo flow", { design: 12, gtm: 12 }, { contribute: 12 }, "demo story and positioning"),
  ]),
  stage("availability_pref", "This week my rhythm is...", "availability_pref", [
    opt("async", "Async first", "written context works best", { ops: 4 }, { commit: 8, contribute: 6 }, "Prefer async first; calls are best after context is written down."),
    opt("live-blocks", "Live blocks", "short focused sessions", { design: 4, engineering: 4 }, { commit: 7, contribute: 9 }, "Open to focused live blocks with a narrow agenda."),
    opt("heads-down", "Heads-down", "route only high-fit asks", { strategy: 4 }, { commit: 18, contribute: -10 }, "Heads-down this week; route only high-fit asks or blockers."),
    opt("office-hours", "Open office hours", "light asks and quick conversations", { ops: 10, gtm: 8 }, { explore: 6, contribute: 18 }, "Open to lightweight asks and office-hours style routing."),
    opt("later", "Later this week", "not now, but soon", {}, { explore: 4, commit: 6 }, "Limited early week; better later in the week."),
  ]),
  stage("weekly_intention", "This week I want to...", "weekly_intention", [
    opt("ship-prototype", "Ship a prototype", "make it inspectable", { engineering: 8, design: 8 }, { commit: 18 }, "ship an inspectable prototype"),
    opt("tighten-scope", "Tighten scope", "decide what matters", { strategy: 18 }, { commit: 12 }, "tighten scope and decide the next concrete milestone"),
    opt("find-users", "Find users", "pressure-test with people", { gtm: 22 }, { explore: 10 }, "find the right users or partners to pressure-test the direction"),
    opt("unblock-technical", "Unblock technical risk", "debug or validate core path", { engineering: 18, research: 8 }, { commit: 18 }, "unblock the highest-risk technical path"),
    opt("learn-context", "Learn context", "map projects and constraints", { research: 14, ops: 6 }, { explore: 18 }, "learn the surrounding context and comparable attempts"),
  ]),
  stage("dietary_restrictions", "For meals, mark...", "dietary", [
    opt("none", "No restrictions", "nothing to plan around", {}, {}, "none"),
    opt("vegetarian", "Vegetarian", "vegetarian meals", {}, {}, "vegetarian"),
    opt("vegan", "Vegan", "vegan meals", {}, {}, "vegan"),
    opt("halal", "Halal", "halal meals", {}, {}, "halal"),
    opt("allergies", "Allergies", "needs detail in note", {}, {}, "allergies - see note"),
  ]),
  stage("anything_else", "Anything else to add?", "notes", [
    opt("nothing", "Nothing else", "generated profile is enough"),
    opt("context", "Add context", "explain a nuance"),
    opt("ask-agent", "Ask my agent", "draft missing fields from context"),
    opt("manual", "Manual note", "type the rest"),
  ]),
];

const state = {
  stage: 0,
  entries: [],
  others: {},
  revealed: false,
  dragging: null,
  toast: "",
  personId: "your-handle",
  visibility: "cohort-public",
  profile: { name: "", github: "", x: "", website: "", linkedin: "" },
};

const app = document.querySelector("#app");
const center = { x: 0, y: 180 };
const orbit = 172;
const view = { x: -220, y: -138, width: 440, height: 322 };
const startWorld = polar(deg(-142), orbit - 28);

function stage(id, title, field, options) {
  return { id, title, field, options: [...options, other(id)] };
}

function opt(id, label, desc, profile = {}, posture = {}, value = null) {
  return { id, label, desc, profile, posture, value: value ?? label };
}

function other(id) {
  return { id: "other", label: "Other", desc: "The suggestions missed it", profile: {}, posture: {}, value: "", isOther: true, source: id };
}

function currentStage() {
  return stages[state.stage];
}

function complete() {
  return state.entries.length === stages.length;
}

function selectedEntry(stageId) {
  return state.entries.find((entry) => entry.stage.id === stageId) || null;
}

function selectedOption(stageId) {
  return selectedEntry(stageId)?.option || null;
}

function answerValue(entry) {
  if (!entry) return "";
  if (entry.option.isOther) return (state.others[entry.stage.id] || "").trim();
  return entry.option.value || entry.option.label;
}

function displayOptions(stageItem) {
  const options = stageItem.options.filter((option) => !option.isOther);
  const ranked = options
    .map((option, index) => ({ option, index, score: optionScore(stageItem, option) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.option);
  return [...ranked, stageItem.options.find((option) => option.isOther)].filter(Boolean);
}

function optionScore(stageItem, option) {
  if (option.isOther) return -999;
  let score = 0;
  for (const entry of state.entries.filter((item) => item.stage.id !== stageItem.id)) {
    score += dot(entry.option.profile, option.profile) * 0.07;
    score += dot(entry.option.posture, option.posture) * 0.11;
    score += textAffinity(answerValue(entry), option.label) + textAffinity(answerValue(entry), option.desc) * 0.6;
  }
  const role = selectedOption("role")?.id;
  const geo = selectedOption("geo")?.id;
  if (role === "engineering" && ["tee", "agentic", "architecture-review", "unblock-technical"].includes(option.id)) score += 13;
  if (role === "design" && ["design", "product-pass", "demo-story", "live-if-stuck"].includes(option.id)) score += 13;
  if (role === "product" && ["design", "bd-gtm", "product-pass", "ship-prototype"].includes(option.id)) score += 11;
  if (role === "research" && ["research-product", "mechanism", "research-critique", "learn-context"].includes(option.id)) score += 11;
  if (geo === "remote" && ["async-context", "async", "heads-down"].includes(option.id)) score += 9;
  if (geo === "nyc" && ["live-blocks", "office-hours", "intro-routing"].includes(option.id)) score += 7;
  return score;
}

function dot(a = {}, b = {}) {
  return Object.entries(a).reduce((sum, [key, value]) => sum + value * (b[key] || 0), 0);
}

function textAffinity(a = "", b = "") {
  const text = `${a} ${b}`.toLowerCase();
  let score = 0;
  if (text.includes("design") || text.includes("product") || text.includes("interface")) score += 2;
  if (text.includes("engineer") || text.includes("technical") || text.includes("architecture")) score += 2;
  if (text.includes("research") || text.includes("mechanism")) score += 2;
  if (text.includes("async") || text.includes("context")) score += 1.5;
  if (text.includes("gtm") || text.includes("bd") || text.includes("users")) score += 1.5;
  return score;
}

function worldPointFor(stageIndex, laneIndex, laneCount, option) {
  if (option?.isOther) return polar(deg(-88 + stageIndex * 18), orbit - 44);
  const spread = Math.min(66, Math.max(36, laneCount * 9));
  const t = laneCount === 1 ? 0 : laneIndex / (laneCount - 1);
  const base = -92 + stageIndex * 21;
  const angle = base - spread / 2 + t * spread;
  const radius = orbit - 12 + (laneIndex % 3) * 9;
  return polar(deg(angle), radius);
}

function polar(angle, radius) {
  return { x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius };
}

function deg(value) {
  return value * Math.PI / 180;
}

function displayPoint(worldPoint) {
  const angle = deg(-state.stage * 15);
  const dx = worldPoint.x - center.x;
  const dy = worldPoint.y - center.y;
  const rotated = {
    x: center.x + dx * Math.cos(angle) - dy * Math.sin(angle),
    y: center.y + dx * Math.sin(angle) + dy * Math.cos(angle),
  };
  return { x: rotated.x - state.stage * 8, y: rotated.y + state.stage * 9 };
}

function activeOptions() {
  const stageItem = currentStage();
  const ordered = displayOptions(stageItem);
  const nonOther = ordered.filter((option) => !option.isOther);
  return ordered.map((option) => {
    const laneIndex = option.isOther ? nonOther.length : nonOther.findIndex((item) => item.id === option.id);
    const world = worldPointFor(state.stage, laneIndex, nonOther.length, option);
    return { option, world, point: displayPoint(world), predicted: !option.isOther && optionScore(stageItem, option) > 0 && laneIndex < 2 };
  });
}

function pathWorldPoints() {
  return [startWorld, ...state.entries.map((entry) => entry.world)];
}

function currentHandle() {
  return displayPoint(pathWorldPoints().at(-1));
}

function pathDisplayPoints() {
  return pathWorldPoints().map(displayPoint);
}

function normalizedRevealPoints() {
  const points = pathWorldPoints().slice(1);
  if (!points.length) return [];
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.min(190 / Math.max(1, maxX - minX), 190 / Math.max(1, maxY - minY));
  return points.map((point) => ({
    x: (point.x - (minX + maxX) / 2) * scale,
    y: (point.y - (minY + maxY) / 2) * scale,
  }));
}

function render() {
  const snap = snapshot();
  const stageItem = currentStage();
  const progress = Math.round(state.entries.length / stages.length * 100);
  app.innerHTML = `
    <header class="topbar">
      <div class="brand"><div class="brand-mark"></div><div><div class="kicker">Shape Rotator hidden-shape onboarding</div><h1>Draw your profile</h1></div></div>
      <div class="actions">
        <button class="btn" data-action="back" ${state.stage === 0 && !state.entries.length ? "disabled" : ""}>Back</button>
        <button class="btn" data-action="reset">Reset</button>
        <button class="btn primary" data-action="reveal" ${complete() ? "" : "disabled"}>${state.revealed ? "Hide reveal" : "Reveal shape"}</button>
      </div>
    </header>
    <section class="layout">
      <article class="stage">
        <header class="stage-head">
          <div class="kicker">${state.revealed ? "Reveal" : `Pass ${Math.min(state.stage + 1, stages.length)} of ${stages.length}`}</div>
          <h2>${state.revealed ? snap.hidden_shape.reveal_name : stageItem.title}</h2>
          <p>${state.revealed ? `${summary(snap)} The closed route is a memory hook for the profile, not a type label.` : promptCopy(stageItem)}</p>
        </header>
        <div class="field">${state.revealed ? renderReveal(snap) : renderInstrument(progress)}<div class="shape-name"><span class="micro">${state.revealed ? "closed route glyph" : "profile mark"}</span><strong>${state.revealed ? snap.hidden_shape.reveal_name : `${progress}%`}</strong></div></div>
        <footer class="stage-foot">${renderSteps()}</footer>
      </article>
      <div class="side">${state.revealed ? renderReadout(snap) : renderStagePanel(stageItem, snap)}${renderExport(snap)}</div>
    </section>
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
  `;
  bind();
}

function promptCopy(stageItem) {
  if (!state.entries.length) return "Hold the bright orb and drag it into one bubble. Release to commit a segment; the next field rotates into view.";
  const top = displayOptions(stageItem).filter((option) => !option.isOther).slice(0, 2).map((option) => option.label).join(" / ");
  const context = state.entries.slice(-2).map(answerValue).join(" + ");
  return `Predicted from ${context}: ${top}. Drag through the suggestion, bend away, or land on Other.`;
}

function renderInstrument(progress) {
  const options = activeOptions();
  const points = pathDisplayPoints();
  const handle = currentHandle();
  const liveLine = `<path class="line live live-dynamic" d=""></path>`;
  return `<svg class="trace" viewBox="${view.x} ${view.y} ${view.width} ${view.height}" role="application" aria-label="Hold the current orb and drag to the next profile bubble">
    <defs>
      <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="10" stdDeviation="7" flood-color="rgba(0,0,0,0.45)"></feDropShadow></filter>
      <linearGradient id="route-glow" x1="0" x2="1"><stop offset="0%" stop-color="#f1ece7"></stop><stop offset="100%" stop-color="#b43a19"></stop></linearGradient>
      <clipPath id="half-window"><rect x="${view.x}" y="${view.y}" width="${view.width}" height="${view.height - 12}" rx="8"></rect></clipPath>
    </defs>
    <g class="instrument" data-action="surface">
      <g class="orbit" clip-path="url(#half-window)">
        ${[-34, 0, 34].map((offset) => `<circle class="ring" cx="${center.x - state.stage * 8}" cy="${center.y + state.stage * 9}" r="${orbit + offset}"></circle>`).join("")}
        ${Array.from({ length: 18 }, (_, index) => {
          const a = deg(-178 + index * 14);
          const p1 = displayPoint(polar(a, orbit - 54));
          const p2 = displayPoint(polar(a, orbit + 34));
          return `<line class="spoke" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"></line>`;
        }).join("")}
      </g>
      <path class="line committed" d="${pathD(points)}"></path>
      ${liveLine}
      ${points.slice(1).map((point, index) => `<circle class="port active" cx="${point.x}" cy="${point.y}" r="7.5"></circle><text class="port-label" x="${point.x + 12}" y="${point.y + 4}">${index + 1}</text>`).join("")}
      ${options.map((item, index) => renderOption(item, index)).join("")}
      <g class="handle" data-action="handle" tabindex="0" role="button" aria-label="Current drawing handle">
        <circle class="handle-halo" cx="${handle.x}" cy="${handle.y}" r="23"></circle>
        <circle class="origin" cx="${handle.x}" cy="${handle.y}" r="9"></circle>
      </g>
    </g>
  </svg>`;
}

function renderOption(item, index) {
  const visual = optionVisual(item.option, index);
  const size = item.option.isOther ? 24 : item.predicted ? 36 : 30;
  return `<g class="option-port ${item.predicted ? "is-predicted" : ""}" data-action="option" data-stage="${currentStage().id}" data-option="${item.option.id}" tabindex="0" role="button" aria-label="${esc(item.option.label)}">
    ${glyphMarkup(visual.shape, item.point.x, item.point.y, size, `class="option-glyph ${item.predicted ? "predicted" : ""} ${item.option.isOther ? "other-port" : ""}" style="--option-color:${visual.color}"`)}
    <text class="bubble-num" x="${item.point.x}" y="${item.point.y + 4}" text-anchor="middle">${item.option.isOther ? "+" : index + 1}</text>
    ${optionLabelMarkup(item.option.label, item.point)}
  </g>`;
}

function renderReveal(snap) {
  const points = normalizedRevealPoints();
  return `<svg class="trace" viewBox="${view.x} ${view.y} ${view.width} ${view.height}" role="img" aria-label="Closed hidden profile route">
    <circle class="ring reveal-ring" cx="0" cy="18" r="118"></circle>
    <polygon class="closed" points="${points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}"></polygon>
    ${points.map((point, index) => `<circle class="port active" cx="${point.x}" cy="${point.y}" r="8"></circle><text class="port-label reveal-label" x="${point.x + 12}" y="${point.y + 4}">${index + 1} ${shortStage(snap.hidden_shape.vertices[index]?.stage)}</text>`).join("")}
  </svg>`;
}

function pathD(points) {
  if (points.length < 2) return "";
  return `M ${points.map((point) => `${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" L ")}`;
}

function bind() {
  app.querySelectorAll("[data-action]").forEach((el) => el.addEventListener("click", onAction));
  app.querySelectorAll("[data-field], [data-profile], [data-other]").forEach((el) => el.addEventListener("input", onField));
  const svg = app.querySelector(".trace");
  const handle = app.querySelector("[data-action='handle']");
  if (svg && handle) {
    handle.addEventListener("pointerdown", (event) => startDrag(event, svg));
    svg.addEventListener("pointermove", (event) => moveDrag(event, svg));
    svg.addEventListener("pointerup", (event) => endDrag(event, svg));
    svg.addEventListener("pointercancel", cancelDrag);
  }
  app.querySelectorAll(".option-port").forEach((el) => {
    el.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      commitOption(el.dataset.option);
    });
  });
  window.__shapeComposer = { state, commitOption, pick: commitByStage };
}

function onAction(event) {
  const action = event.currentTarget.dataset.action;
  if (action === "option") {
    commitOption(event.currentTarget.dataset.option);
    return;
  }
  if (action === "back") {
    state.entries.pop();
    state.stage = Math.max(0, state.entries.length);
    state.revealed = false;
    render();
    return;
  }
  if (action === "reset") {
    state.stage = 0;
    state.entries = [];
    state.others = {};
    state.revealed = false;
    state.dragging = null;
    render();
    return;
  }
  if (action === "jump") {
    const target = Number(event.currentTarget.dataset.index);
    state.entries = state.entries.slice(0, target);
    state.stage = target;
    state.revealed = false;
    render();
    return;
  }
  if (action === "reveal") {
    state.revealed = complete() && !state.revealed;
    render();
    return;
  }
  if (action === "copy") copy(markdown(snapshot()));
  if (action === "open-pr") openPr();
  if (action === "agent-fill") {
    state.others.anything_else = "Agent should draft missing profile fields from public repo/profile context and leave uncertain claims for review.";
    render();
  }
}

function startDrag(event, svg) {
  event.preventDefault();
  try { svg.setPointerCapture?.(event.pointerId); } catch {}
  state.dragging = { point: localPoint(event, svg), target: null };
}

function moveDrag(event, svg) {
  if (!state.dragging) return;
  const point = localPoint(event, svg);
  state.dragging = { point, target: hitOption(point) };
  const live = svg.querySelector(".live-dynamic");
  if (live) live.setAttribute("d", pathD([currentHandle(), point]));
}

function endDrag(event, svg) {
  if (!state.dragging) return;
  const point = localPoint(event, svg);
  const target = hitOption(point);
  state.dragging = null;
  const live = svg.querySelector(".live-dynamic");
  if (live) live.setAttribute("d", "");
  if (target) commitOption(target.option.id);
  else render();
}

function cancelDrag() {
  state.dragging = null;
  render();
}

function localPoint(event, svg) {
  const rect = svg.getBoundingClientRect();
  return {
    x: view.x + ((event.clientX - rect.left) / rect.width) * view.width,
    y: view.y + ((event.clientY - rect.top) / rect.height) * view.height,
  };
}

function hitOption(point) {
  return activeOptions().find((item) => Math.hypot(item.point.x - point.x, item.point.y - point.y) < (item.option.isOther ? 26 : 34)) || null;
}

function commitByStage(stageId, optionId) {
  if (currentStage().id !== stageId) return false;
  return commitOption(optionId);
}

function commitOption(optionId) {
  if (complete()) return false;
  const stageItem = currentStage();
  const target = activeOptions().find((item) => item.option.id === optionId);
  if (!target) return false;
  state.entries = state.entries.filter((entry) => entry.stage.id !== stageItem.id);
  state.entries.push({ stage: stageItem, option: target.option, world: target.world });
  state.revealed = false;
  state.stage = Math.min(stages.length - 1, state.entries.length);
  render();
  return true;
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

function renderSteps() {
  return `<div class="steps">${stages.map((stageItem, index) => {
    const entry = state.entries[index];
    return `<button class="step" data-action="jump" data-index="${index}" data-state="${entry ? "done" : index === state.stage ? "active" : "pending"}"><div class="step-k">${stageItem.id}</div><div class="step-v">${entry ? answerValue(entry) || "other" : "not drawn"}</div></button>`;
  }).join("")}</div>`;
}

function renderStagePanel(stageItem, snap) {
  const options = activeOptions();
  const selected = selectedEntry(stageItem.id);
  return `<aside class="panel question-panel">
    <div class="micro">Next field</div>
    <div class="selection-card">
      <span class="choice-index">${state.stage + 1}</span>
      <span><span class="choice-title">${selected ? selected.option.label : "Hold the orb, draw to a bubble"}</span><span class="choice-desc">${selected ? selected.option.desc : "The handle is the last point on your line. Releasing on a bubble commits the next segment."}</span></span>
    </div>
    <div class="predictive-note">${promptCopy(stageItem)}</div>
    <div class="choice-strip">${options.map((item, index) => {
      const visual = optionVisual(item.option, index);
      return `<button class="choice-chip ${item.option.isOther ? "is-other" : ""} ${item.predicted ? "is-predicted" : ""}" style="--option-color:${visual.color}" data-action="option" data-stage="${stageItem.id}" data-option="${item.option.id}" aria-pressed="${selected?.option.id === item.option.id}"><span class="choice-mark shape-${visual.shape}"></span><span>${item.option.isOther ? "Other" : shortOptionLabel(item.option.label)}</span></button>`;
    }).join("")}</div>
    ${selected?.option.isOther ? `<label class="other-box"><span class="field-label">Other ${stageItem.id}</span><textarea class="textarea" data-other="${stageItem.id}" placeholder="type the answer we missed">${esc(state.others[stageItem.id] || "")}</textarea></label>` : ""}
    ${stageItem.id === "anything_else" && selected?.option.id === "ask-agent" ? renderAgentAsk() : ""}
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

function snapshot() {
  const posture = { explore: 34, commit: 33, contribute: 33 };
  const profile = { engineering: 18, design: 18, strategy: 18, research: 18, ops: 18, gtm: 18 };
  for (const entry of state.entries) {
    Object.entries(entry.option.posture || {}).forEach(([key, value]) => posture[key] += value);
    Object.entries(entry.option.profile || {}).forEach(([key, value]) => profile[key] += value);
  }
  Object.keys(posture).forEach((key) => posture[key] = Math.max(0, posture[key]));
  const total = Object.values(posture).reduce((sum, value) => sum + value, 0) || 1;
  const internal = Object.fromEntries(Object.entries(posture).map(([key, value]) => [key, Math.round(value / total * 100)]));
  internal.contribute += 100 - Object.values(internal).reduce((sum, value) => sum + value, 0);
  Object.keys(profile).forEach((key) => profile[key] = clamp(profile[key]));
  const vertices = state.entries.map((entry, index) => ({
    stage: entry.stage.id,
    choice: answerValue(entry) || entry.option.label,
    x: Math.round(entry.world.x),
    y: Math.round(entry.world.y),
    ring_index: index + 1,
  }));
  return {
    schema_version: 1,
    updated_at: today,
    person: profileSlug(),
    visibility: state.visibility,
    source: "self-declared-continuous-radial-onboarding",
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
      notes: profileField("notes") === "Nothing else" ? "" : profileField("notes"),
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
      vertices,
    },
  };
}

function profileField(field) {
  const entry = state.entries.find((item) => item.stage.field === field);
  return entry ? answerValue(entry) : "";
}

function normalizeNone(value) {
  return value === "No team" ? "" : value;
}

function profileSlug() {
  return slugify(state.personId || state.profile.github || state.profile.name);
}

function slugify(value) {
  return String(value || "your-handle").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "your-handle";
}

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
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

function markdown(s) {
  return `---\nrecord_id: ${s.person}\nrecord_type: person\nname: ${yaml(s.profile.name || s.person)}\nteam: ${yamlOrNull(s.profile.team)}\nrole: ${yamlOrNull(s.profile.role)}\ngeo: ${yamlOrNull(s.profile.geo)}\ndomain: ${yamlOrNull(s.profile.domain)}\nlinks:\n  github: ${yamlOrNull(s.profile.links.github)}\n  x: ${yamlOrNull(s.profile.links.x)}\n  website: ${yamlOrNull(s.profile.links.website)}\n  linkedin: ${yamlOrNull(s.profile.links.linkedin)}\ncomm_style: ${yamlOrNull(s.profile.comm_style)}\ncontribute_interests: ${yamlOrNull(s.profile.contribute_interests)}\navailability_pref: ${yamlOrNull(s.profile.availability_pref)}\nweekly_intention: ${yamlOrNull(s.profile.weekly_intention)}\ndietary_restrictions: ${yamlOrNull(s.profile.dietary_restrictions)}\npreference_snapshot:\n  schema_version: ${s.schema_version}\n  updated_at: "${s.updated_at}"\n  visibility: ${s.visibility}\n  source: ${s.source}\n  internal_posture:\n${indent(mapYaml(s.internal_posture), 4)}\n  external_profile:\n${indent(mapYaml(s.external_profile), 4)}\n  routing_preferences:\n    wants:\n${indent(listYaml(s.routing_preferences.wants), 4)}\n    offers:\n${indent(listYaml(s.routing_preferences.offers), 4)}\n    avoids:\n${indent(listYaml(s.routing_preferences.avoids), 4)}\n  hidden_shape:\n    reveal_name: ${yaml(s.hidden_shape.reveal_name)}\n    vertices:\n${s.hidden_shape.vertices.length ? s.hidden_shape.vertices.map((vertex) => `      - stage: ${vertex.stage}\n        choice: ${yaml(vertex.choice)}\n        x: ${vertex.x}\n        y: ${vertex.y}\n        ring_index: ${vertex.ring_index}`).join("\n") : "      []"}\n---\n\n# ${s.profile.name || s.person}\n\n${summary(s)}${s.profile.notes ? `\n\n${s.profile.notes}` : ""}\n`;
}

function mapYaml(obj) {
  return Object.entries(obj).map(([key, value]) => `  ${key}: ${value}`).join("\n");
}

function listYaml(items) {
  return items.length ? items.map((value) => `    - ${yaml(value)}`).join("\n") : "    []";
}

function indent(text, spaces) {
  return text.split("\n").map((line) => `${" ".repeat(spaces)}${line}`).join("\n");
}

function yamlOrNull(value) {
  return value ? yaml(value) : "null";
}

function yaml(value) {
  const text = String(value ?? "");
  return /^[a-zA-Z0-9_@./:-]+$/.test(text) ? text : JSON.stringify(text);
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
    state.toast = "Markdown copied.";
  } catch {
    state.toast = "Clipboard unavailable; markdown is visible below.";
  }
  render();
  setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function openPr() {
  const snap = snapshot();
  window.open(`https://github.com/dmarzzz/shape-rotator-os/new/main?filename=${encodeURIComponent(`cohort-data/people/${snap.person}.md`)}&quick_pull=1&value=${encodeURIComponent(markdown(snap))}`, "_blank", "noopener");
}

function shortStage(id) {
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
  })[id] || id;
}

const visualPalette = [
  { shape: "circle", color: "#5FA8FF" },
  { shape: "triangle", color: "#6EE7B7" },
  { shape: "hex", color: "#C7A6FF" },
  { shape: "diamond", color: "#FFB454" },
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
  const strongest = Object.entries(option.profile || {}).sort((a, b) => b[1] - a[1])[0]?.[0];
  if (strongest && profileVisuals[strongest]) return profileVisuals[strongest];
  if (option.isOther) return { shape: "circle", color: "#F1ECE7" };
  return visualPalette[index % visualPalette.length];
}

function glyphMarkup(shape, x, y, size, attrs = "") {
  if (shape === "circle") return `<circle ${attrs} cx="${x}" cy="${y}" r="${size / 2}"></circle>`;
  if (shape === "square") return `<rect ${attrs} x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" rx="4"></rect>`;
  return `<polygon ${attrs} points="${glyphPoints(shape, x, y, size)}"></polygon>`;
}

function glyphPoints(shape, x, y, size) {
  if (shape === "triangle") return `${x},${y - size / 2} ${x + size / 2},${y + size / 2} ${x - size / 2},${y + size / 2}`;
  if (shape === "diamond") return `${x},${y - size / 2} ${x + size / 2},${y} ${x},${y + size / 2} ${x - size / 2},${y}`;
  const sides = shape === "pentagon" ? 5 : 6;
  return Array.from({ length: sides }, (_, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / sides;
    return `${(x + Math.cos(angle) * size / 2).toFixed(1)},${(y + Math.sin(angle) * size / 2).toFixed(1)}`;
  }).join(" ");
}

function optionLabelMarkup(label, point) {
  const lines = optionLabelLines(label);
  const y = point.y + 28 - (lines.length - 1) * 4.6;
  return `<text class="bubble-label" x="${point.x}" y="${y}" text-anchor="middle">${lines.map((line, index) => `<tspan x="${point.x}" dy="${index === 0 ? 0 : 9.2}">${esc(line)}</tspan>`).join("")}</text>`;
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

function shortOptionLabel(label) {
  return label
    .replace("Community / ops", "Ops")
    .replace("Research to product", "Research/product")
    .replace("Product / interface pass", "Product pass")
    .slice(0, 18);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

render();
