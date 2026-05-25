const today = "2026-05-25";

const stages = [
  {
    id: "state",
    eyebrow: "pass 1",
    title: "current state",
    question: "How should the cohort read you this week?",
    mode: "color",
    options: [
      { id: "open", label: "Open", value: "blue", color: "#5FA8FF", desc: "Still forming direction; route context and adjacent examples." },
      { id: "shipping", label: "Shipping", value: "green", color: "#6EE7B7", desc: "Actively moving; route blockers, proof, and specific help." },
      { id: "available", label: "Available", value: "amber", color: "#FFB454", desc: "Can help others; route reviews, intros, and lightweight asks." },
    ],
  },
  {
    id: "craft",
    eyebrow: "pass 2",
    title: "contribution shape",
    question: "What kind of contribution should people expect?",
    mode: "shape",
    options: [
      { id: "engineering", label: "Engineering", value: "triangle", shape: "triangle", desc: "Systems, implementation, reliability, protocol work." },
      { id: "design", label: "Design", value: "circle", shape: "circle", desc: "UX, demos, product surface, visual language." },
      { id: "strategy", label: "Strategy", value: "diamond", shape: "diamond", desc: "Positioning, sequencing, partner fit, next move." },
      { id: "research", label: "Research", value: "hex", shape: "hex", desc: "Assumptions, experiments, mechanism design, proof pressure." },
    ],
  },
  {
    id: "routing",
    eyebrow: "pass 3",
    title: "routing line",
    question: "What interaction are you open to?",
    mode: "line",
    options: [
      { id: "independent", label: "Independent", value: "solo line", line: "solo", desc: "Heads-down; route only high-fit blockers." },
      { id: "pair", label: "Pair", value: "pair line", line: "pair", desc: "Open to live or async pairing with a narrow task." },
      { id: "review", label: "Review", value: "review line", line: "review", desc: "Send artifacts for critique and pressure testing." },
      { id: "route", label: "Route", value: "route line", line: "route", desc: "High-context introductions and connective tissue." },
    ],
  },
];

const state = {
  stage: 0,
  selections: {},
  drag: null,
  hover: null,
  copied: "",
  personId: "your-handle",
  visibility: "cohort-public",
};

const app = document.querySelector("#app");

const CX = 0;
const CY = 0;
const INNER = 70;
const OUTER = 136;
const LABEL = 162;

function activeStage() {
  return stages[state.stage];
}

function selected(stageId) {
  const stage = stages.find((item) => item.id === stageId);
  return stage?.options.find((option) => option.id === state.selections[stageId]) || null;
}

function complete() {
  return stages.every((stage) => selected(stage.id));
}

function progress() {
  return Math.round(stages.filter((stage) => selected(stage.id)).length / stages.length * 100);
}

function slugify(value) {
  return String(value || "your-handle")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "your-handle";
}

function angleFor(index, count) {
  return -Math.PI / 2 + index * Math.PI * 2 / count;
}

function polar(radius, angle) {
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

function segmentPath(index, count, inner = INNER, outer = OUTER) {
  const gap = 0.045;
  const start = angleFor(index, count) - Math.PI / count + gap;
  const end = angleFor(index, count) + Math.PI / count - gap;
  const a = polar(outer, start);
  const b = polar(outer, end);
  const c = polar(inner, end);
  const d = polar(inner, start);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${outer} ${outer} 0 ${large} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)} L ${c.x.toFixed(2)} ${c.y.toFixed(2)} A ${inner} ${inner} 0 ${large} 0 ${d.x.toFixed(2)} ${d.y.toFixed(2)} Z`;
}

function localPoint(event, svg) {
  const rect = svg.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 440 - 220;
  const y = ((event.clientY - rect.top) / rect.height) * 360 - 180;
  return { x, y };
}

function hitOption(point, stage = activeStage()) {
  const dist = Math.hypot(point.x - CX, point.y - CY);
  if (dist < INNER * 0.5 || dist > OUTER + 24) return null;
  let angle = Math.atan2(point.y, point.x) + Math.PI / 2;
  if (angle < 0) angle += Math.PI * 2;
  const slice = Math.PI * 2 / stage.options.length;
  const index = Math.round(angle / slice) % stage.options.length;
  return stage.options[index] || null;
}

function optionPoint(stageId, optionId, radius = 116) {
  const stage = stages.find((item) => item.id === stageId);
  const index = stage.options.findIndex((option) => option.id === optionId);
  return polar(radius, angleFor(index, stage.options.length));
}

function snapshot() {
  const stateChoice = selected("state");
  const craftChoice = selected("craft");
  const routeChoice = selected("routing");
  const markName = [stateChoice?.value, craftChoice?.value, routeChoice?.value].filter(Boolean).join(" ") || "unformed route";
  return {
    schema_version: 1,
    updated_at: today,
    person: slugify(state.personId),
    visibility: state.visibility,
    source: "shape-rotator-click-drag-routing-demo",
    routing_mark: {
      name: markName,
      state: stateChoice?.id || null,
      contribution: craftChoice?.id || null,
      interaction: routeChoice?.id || null,
    },
    profile_patch: {
      now: stateChoice ? `${stateChoice.label.toLowerCase()} this week` : "",
      skill_areas: craftChoice ? [craftChoice.id] : [],
      availability_pref: routeChoice?.label || "",
      routing_note: sentence(),
    },
  };
}

function sentence() {
  const stateChoice = selected("state");
  const craftChoice = selected("craft");
  const routeChoice = selected("routing");
  if (!stateChoice && !craftChoice && !routeChoice) return "Hold the center and drag through each ring.";
  return [
    stateChoice ? `${stateChoice.label} state` : "state unresolved",
    craftChoice ? `${craftChoice.label.toLowerCase()} contribution` : "contribution unresolved",
    routeChoice ? `${routeChoice.label.toLowerCase()} routing` : "routing unresolved",
  ].join(" / ");
}

function render() {
  const stage = activeStage();
  const snap = snapshot();
  app.innerHTML = `
    <header class="topbar">
      <a class="brand" href="/" aria-label="Shape Rotator routing instrument">
        <span class="brand-glyph" aria-hidden="true"></span>
        <span><span class="kicker">Shape Rotator cohort routing</span><strong>click-drag profile mark</strong></span>
      </a>
      <nav class="stage-tabs" aria-label="Routing mark passes">
        ${stages.map((item, index) => `
          <button class="stage-tab" data-action="stage" data-index="${index}" data-active="${index === state.stage}" data-done="${!!selected(item.id)}">
            <span>${item.eyebrow}</span><strong>${item.title}</strong>
          </button>
        `).join("")}
      </nav>
    </header>

    <section class="instrument-layout">
      <aside class="left-rail">
        <div class="rail-copy">
          <span class="kicker">${stage.eyebrow}</span>
          <h1>${stage.question}</h1>
          <p>${stageText(stage)}</p>
        </div>
        <div class="selected-stack">
          ${stages.map(renderPassRow).join("")}
        </div>
      </aside>

      <section class="instrument-shell">
        ${renderInstrument(stage)}
      </section>

      <aside class="readout">
        <div class="readout-head">
          <span class="kicker">live mark</span>
          <strong>${snap.routing_mark.name}</strong>
        </div>
        ${renderFinalGlyph()}
        <p>${sentence()}</p>
        <div class="form-grid">
          <label><span class="field-label">person id</span><input data-field="personId" value="${escapeHtml(state.personId)}" /></label>
          <label><span class="field-label">visibility</span><select data-field="visibility">${["cohort-public", "organizer-only", "public"].map((item) => `<option value="${item}" ${item === state.visibility ? "selected" : ""}>${item}</option>`).join("")}</select></label>
        </div>
        <div class="actions">
          <button class="btn primary" data-action="copy">Copy JSON</button>
          <button class="btn" data-action="reset">Reset</button>
        </div>
        <details class="schema">
          <summary>Schema preview</summary>
          <pre>${escapeHtml(JSON.stringify(snap, null, 2))}</pre>
        </details>
      </aside>
    </section>
    ${state.copied ? `<div class="toast">${state.copied}</div>` : ""}
  `;
  wire();
}

function stageText(stage) {
  if (stage.mode === "color") return "This pass is color only. Hold the center, drag toward a color, release.";
  if (stage.mode === "shape") return "This pass is shape only. The ring stays neutral so the geometry is the signal.";
  return "This pass is line behavior only. The line describes how people should route work to you.";
}

function renderPassRow(stage) {
  const choice = selected(stage.id);
  return `
    <button class="pass-row" data-action="stage" data-index="${stages.indexOf(stage)}" data-active="${stage.id === activeStage().id}" data-empty="${!choice}">
      <span class="pass-visual">${choice ? miniVisual(stage, choice) : ""}</span>
      <span><span>${stage.title}</span><strong>${choice?.label || "not set"}</strong></span>
    </button>
  `;
}

function renderInstrument(stage) {
  const choice = selected(stage.id);
  return `
    <svg class="instrument" data-stage="${stage.id}" viewBox="-220 -180 440 360" role="application" aria-label="${stage.question}">
      <defs>
        <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="blur"></feGaussianBlur><feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>
      </defs>
      <g class="mesh" aria-hidden="true">${meshLines()}</g>
      <circle class="ring-line" cx="0" cy="0" r="${INNER}"></circle>
      <circle class="ring-line outer" cx="0" cy="0" r="${OUTER}"></circle>
      ${stage.options.map((option, index) => renderSegment(stage, option, index)).join("")}
      ${renderCommittedPath()}
      ${state.drag ? `<line class="drag-line" x1="0" y1="0" x2="${state.drag.x.toFixed(1)}" y2="${state.drag.y.toFixed(1)}"></line>` : ""}
      <circle class="center-target" cx="0" cy="0" r="24"></circle>
      <text class="center-label" x="0" y="-2" text-anchor="middle">hold</text>
      <text class="center-label sub" x="0" y="13" text-anchor="middle">drag</text>
      ${choice ? `<text class="choice-label" x="0" y="168" text-anchor="middle">${choice.label}</text>` : ""}
    </svg>
  `;
}

function renderSegment(stage, option, index) {
  const active = state.hover?.stageId === stage.id && state.hover?.optionId === option.id;
  const committed = selected(stage.id)?.id === option.id;
  const mid = polar(LABEL, angleFor(index, stage.options.length));
  return `
    <g class="segment ${stage.mode}" data-option="${option.id}" data-active="${active}" data-committed="${committed}" style="--option-color:${option.color || "#F7F1EC"}">
      <path class="segment-hit" d="${segmentPath(index, stage.options.length)}"></path>
      ${stage.mode === "color" ? renderColorSegment(option, index, stage.options.length) : ""}
      ${stage.mode === "shape" ? renderShapeSegment(option, index, stage.options.length) : ""}
      ${stage.mode === "line" ? renderLineSegment(option, index, stage.options.length) : ""}
      <text class="segment-label" x="${mid.x.toFixed(1)}" y="${mid.y.toFixed(1)}" text-anchor="${mid.x < -12 ? "end" : mid.x > 12 ? "start" : "middle"}">${option.label}</text>
    </g>
  `;
}

function renderColorSegment(option, index, count) {
  const p = polar(104, angleFor(index, count));
  return `<circle class="color-port" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="18"></circle>`;
}

function renderShapeSegment(option, index, count) {
  const p = polar(104, angleFor(index, count));
  return shapeMarkup(option.shape, p.x, p.y, 38, "class=\"shape-port\"");
}

function renderLineSegment(option, index, count) {
  const p = polar(104, angleFor(index, count));
  const rotate = angleFor(index, count) * 180 / Math.PI;
  return `<g class="line-port line-${option.line}" transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${rotate.toFixed(1)})">${lineMark(option.line, 34)}</g>`;
}

function renderCommittedPath() {
  const points = stages.map((stage) => {
    const choice = selected(stage.id);
    return choice ? { ...optionPoint(stage.id, choice.id, 92 + stages.indexOf(stage) * 16), stage, choice } : null;
  }).filter(Boolean);
  if (!points.length) return "";
  return `
    <g class="committed-path">
      ${points.map((point, index) => index === 0 ? "" : `<line x1="${points[index - 1].x.toFixed(1)}" y1="${points[index - 1].y.toFixed(1)}" x2="${point.x.toFixed(1)}" y2="${point.y.toFixed(1)}"></line>`).join("")}
      ${points.map((point) => `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="5"></circle>`).join("")}
    </g>
  `;
}

function renderFinalGlyph() {
  const colorChoice = selected("state");
  const shapeChoice = selected("craft");
  const lineChoice = selected("routing");
  const color = colorChoice?.color || "#F7F1EC";
  return `
    <svg class="final-glyph" viewBox="-120 -94 240 188" aria-label="Routing mark preview">
      <g class="final-guide">${renderCommittedPath()}</g>
      ${shapeChoice ? shapeMarkup(shapeChoice.shape, 0, 0, 92, `class="final-shape" style="--mark-color:${color}"`) : `<circle class="final-placeholder" cx="0" cy="0" r="45"></circle>`}
      ${lineChoice ? `<g class="final-line line-${lineChoice.line}">${lineMark(lineChoice.line, 120)}</g>` : ""}
      ${colorChoice || shapeChoice || lineChoice ? `<circle class="final-core" cx="0" cy="0" r="7"></circle>` : ""}
    </svg>
  `;
}

function lineMark(type, width) {
  if (type === "pair") return `<line x1="${-width / 2}" y1="-5" x2="${width / 2}" y2="-5"></line><line x1="${-width / 2}" y1="5" x2="${width / 2}" y2="5"></line>`;
  if (type === "review") return `<line class="dotted" x1="${-width / 2}" y1="0" x2="${width / 2}" y2="0"></line>`;
  if (type === "route") return `<path class="routed" d="M ${-width / 2} 14 C ${-width / 5} -18, ${width / 5} 18, ${width / 2} -14"></path>`;
  return `<line x1="${-width / 2}" y1="0" x2="${width / 2}" y2="0"></line>`;
}

function shapeMarkup(shape, x, y, size, attrs = "") {
  if (shape === "circle") return `<circle ${attrs} cx="${x}" cy="${y}" r="${size / 2}"></circle>`;
  if (shape === "triangle") return `<polygon ${attrs} points="${x},${y - size / 2} ${x + size / 2},${y + size / 2} ${x - size / 2},${y + size / 2}"></polygon>`;
  if (shape === "diamond") return `<polygon ${attrs} points="${x},${y - size / 2} ${x + size / 2},${y} ${x},${y + size / 2} ${x - size / 2},${y}"></polygon>`;
  const points = Array.from({ length: 6 }, (_, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / 6;
    return `${(x + Math.cos(angle) * size / 2).toFixed(1)},${(y + Math.sin(angle) * size / 2).toFixed(1)}`;
  }).join(" ");
  return `<polygon ${attrs} points="${points}"></polygon>`;
}

function miniVisual(stage, option) {
  if (stage.mode === "color") return `<span class="mini color" style="--option-color:${option.color}"></span>`;
  if (stage.mode === "shape") return `<span class="mini shape shape-${option.shape}"></span>`;
  return `<span class="mini line line-${option.line}"></span>`;
}

function meshLines() {
  const lines = [];
  for (let value = -180; value <= 180; value += 24) {
    lines.push(`<line x1="-190" y1="${value}" x2="190" y2="${value}"></line>`);
    lines.push(`<line x1="${value}" y1="-150" x2="${value}" y2="150"></line>`);
  }
  return lines.join("");
}

function wire() {
  app.querySelectorAll("[data-action]").forEach((item) => item.addEventListener("click", onAction));
  app.querySelectorAll("[data-field]").forEach((item) => item.addEventListener("input", onField));
  const svg = app.querySelector(".instrument");
  if (!svg) return;
  svg.addEventListener("pointerdown", onPointerDown);
  svg.addEventListener("pointermove", onPointerMove);
  svg.addEventListener("pointerup", onPointerUp);
  svg.addEventListener("pointercancel", onPointerUp);
}

function onPointerDown(event) {
  const svg = event.currentTarget;
  event.preventDefault();
  const point = localPoint(event, svg);
  state.drag = point;
  updateHover(point);
  render();
}

function onPointerMove(event) {
  const svg = event.currentTarget;
  const point = localPoint(event, svg);
  if (state.drag) return;
  updateHover(point);
  renderHoverOnly();
}

function onWindowPointerMove(event) {
  if (!state.drag) return;
  const svg = app.querySelector(".instrument");
  if (!svg) return;
  const point = localPoint(event, svg);
  state.drag = point;
  updateHover(point);
  render();
}

function onPointerUp() {
  if (state.hover) {
    const committedStageId = state.hover.stageId;
    state.selections[committedStageId] = state.hover.optionId;
    advanceAfterCommit(committedStageId);
  }
  state.drag = null;
  state.hover = null;
  render();
}

function advanceAfterCommit(stageId) {
  const committedIndex = stages.findIndex((stage) => stage.id === stageId);
  const nextUnset = stages.findIndex((stage, index) => index > committedIndex && !selected(stage.id));
  if (nextUnset !== -1) {
    state.stage = nextUnset;
  }
}

function updateHover(point) {
  const option = hitOption(point);
  state.hover = option ? { stageId: activeStage().id, optionId: option.id } : null;
}

function renderHoverOnly() {
  app.querySelectorAll(".segment").forEach((item) => {
    item.dataset.active = String(state.hover?.optionId === item.dataset.option);
  });
}

function onAction(event) {
  const action = event.currentTarget.dataset.action;
  if (action === "stage") {
    state.stage = Number(event.currentTarget.dataset.index);
    state.drag = null;
    state.hover = null;
    render();
  }
  if (action === "reset") {
    state.selections = {};
    state.stage = 0;
    state.drag = null;
    state.hover = null;
    render();
  }
  if (action === "copy") copyText(JSON.stringify(snapshot(), null, 2));
}

function onField(event) {
  state[event.currentTarget.dataset.field] = event.currentTarget.value;
  const pre = app.querySelector(".schema pre");
  if (pre) pre.textContent = JSON.stringify(snapshot(), null, 2);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    state.copied = "JSON copied.";
  } catch {
    state.copied = "Clipboard unavailable.";
  }
  render();
  window.setTimeout(() => {
    state.copied = "";
    render();
  }, 1400);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

window.__routingInstrument = { state, stages, snapshot, render };
window.addEventListener("pointermove", onWindowPointerMove);
window.addEventListener("pointerup", onPointerUp);
window.addEventListener("pointercancel", onPointerUp);
render();
