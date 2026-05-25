const postureKeys = ["explore", "commit", "contribute"];

const postureLabels = {
  explore: "Explore",
  commit: "Commit",
  contribute: "Contribute",
};

const profileAxes = [
  { key: "engineering", label: "Engineering", color: "#4f7df3", shape: "square" },
  { key: "design", label: "Design", color: "#e94d43", shape: "circle" },
  { key: "strategy", label: "Strategy", color: "#f2c94c", shape: "triangle" },
  { key: "research", label: "Research", color: "#63d6c6", shape: "hex" },
  { key: "ops", label: "Ops", color: "#6bd58c", shape: "diamond" },
  { key: "gtm", label: "GTM", color: "#b48cff", shape: "pentagon" },
];

const state = {
  posture: {
    explore: 35,
    commit: 25,
    contribute: 40,
  },
  profile: {
    engineering: 80,
    design: 35,
    strategy: 65,
    research: 55,
    ops: 20,
    gtm: 25,
  },
};

const seededState = {
  posture: {
    explore: 25,
    commit: 45,
    contribute: 30,
  },
  profile: {
    engineering: 72,
    design: 48,
    strategy: 68,
    research: 60,
    ops: 24,
    gtm: 38,
  },
};

const svgNs = "http://www.w3.org/2000/svg";
const jsonOut = document.querySelector("#jsonOut");
const summaryText = document.querySelector("#summaryText");
const copyStatus = document.querySelector("#copyStatus");
const seedProfileBtn = document.querySelector("#seedProfileBtn");
const copyJsonBtn = document.querySelector("#copyJsonBtn");
const radar = document.querySelector("#radar");
const radarGrid = radar.querySelector(".radar-grid");
const radarAxes = radar.querySelector(".radar-axes");
const radarPoints = radar.querySelector(".radar-points");
const radarFill = radar.querySelector(".radar-fill");
const radarLine = radar.querySelector(".radar-line");

let activeDial = null;
let activeRadarAxis = null;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function roundTotal(values) {
  const rounded = {};
  let total = 0;
  for (const key of postureKeys) {
    rounded[key] = Math.round(values[key]);
    total += rounded[key];
  }
  const diff = 100 - total;
  const largest = postureKeys.reduce((winner, key) => rounded[key] > rounded[winner] ? key : winner, postureKeys[0]);
  rounded[largest] += diff;
  return rounded;
}

function setPostureValue(targetKey, nextValue) {
  const current = { ...state.posture };
  const oldValue = current[targetKey];
  const clamped = clamp(nextValue, 0, 100);
  const otherKeys = postureKeys.filter((key) => key !== targetKey);
  const remainingOld = otherKeys.reduce((sum, key) => sum + current[key], 0);
  const remainingNew = 100 - clamped;

  current[targetKey] = clamped;

  if (remainingOld <= 0) {
    const share = remainingNew / otherKeys.length;
    for (const key of otherKeys) current[key] = share;
  } else {
    for (const key of otherKeys) {
      current[key] = remainingNew * (state.posture[key] / remainingOld);
    }
  }

  const rounded = roundTotal(current);
  Object.assign(state.posture, rounded);

  if (Math.abs(oldValue - clamped) > 0.2) {
    copyStatus.textContent = "";
  }

  render();
}

function valueToAngle(value) {
  return -140 + (value / 100) * 280;
}

function angleToValue(angle) {
  const normalized = clamp((angle + 140) / 280, 0, 1);
  return Math.round(normalized * 100);
}

function pointerValueFromEvent(event, element) {
  const rect = element.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = event.clientX - cx;
  const dy = event.clientY - cy;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
  const wrapped = angle > 180 ? angle - 360 : angle;
  return angleToValue(wrapped);
}

function renderDials() {
  for (const key of postureKeys) {
    const dial = document.querySelector(`.dial[data-key="${key}"]`);
    const value = state.posture[key];
    const face = dial.querySelector(".dial-face");
    const valueText = dial.querySelector(`[data-value="${key}"]`);
    const angle = valueToAngle(value);
    face.style.setProperty("--dash-offset", String(364 - (364 * value / 100)));
    face.style.setProperty("--pointer-angle", `${angle}deg`);
    face.setAttribute("aria-valuenow", String(value));
    face.setAttribute("aria-valuetext", `${value}% ${postureLabels[key]}`);
    valueText.textContent = `${value}%`;
  }
}

function pointForAxis(index, value, radius = 126) {
  const center = { x: 215, y: 180 };
  const angle = -Math.PI / 2 + index * (Math.PI * 2 / profileAxes.length);
  const scaled = radius * (value / 100);
  return {
    x: center.x + Math.cos(angle) * scaled,
    y: center.y + Math.sin(angle) * scaled,
    angle,
    center,
  };
}

function outerPointForAxis(index, radius = 144) {
  const center = { x: 215, y: 180 };
  const angle = -Math.PI / 2 + index * (Math.PI * 2 / profileAxes.length);
  return {
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
    angle,
    center,
  };
}

function pointsToString(points) {
  return points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
}

function createSvgElement(tag, attrs = {}) {
  const element = document.createElementNS(svgNs, tag);
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, value);
  }
  return element;
}

function shapePath(shape, x, y, size) {
  if (shape === "triangle") {
    const h = size * 0.9;
    return `${x},${y - h / 2} ${x + size / 2},${y + h / 2} ${x - size / 2},${y + h / 2}`;
  }
  if (shape === "hex") {
    return Array.from({ length: 6 }, (_, i) => {
      const a = Math.PI / 6 + i * Math.PI / 3;
      return `${(x + Math.cos(a) * size / 2).toFixed(1)},${(y + Math.sin(a) * size / 2).toFixed(1)}`;
    }).join(" ");
  }
  if (shape === "diamond") {
    return `${x},${y - size / 2} ${x + size / 2},${y} ${x},${y + size / 2} ${x - size / 2},${y}`;
  }
  if (shape === "pentagon") {
    return Array.from({ length: 5 }, (_, i) => {
      const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
      return `${(x + Math.cos(a) * size / 2).toFixed(1)},${(y + Math.sin(a) * size / 2).toFixed(1)}`;
    }).join(" ");
  }
  return "";
}

function renderRadarStatic() {
  radarGrid.replaceChildren();
  radarAxes.replaceChildren();

  for (const ring of [25, 50, 75, 100]) {
    const ringPoints = profileAxes.map((_, index) => pointForAxis(index, ring));
    radarGrid.appendChild(createSvgElement("polygon", {
      points: pointsToString(ringPoints),
    }));
  }

  profileAxes.forEach((axis, index) => {
    const outer = outerPointForAxis(index);
    const label = outerPointForAxis(index, 168);
    radarAxes.appendChild(createSvgElement("line", {
      class: "radar-axis",
      x1: "215",
      y1: "180",
      x2: outer.x.toFixed(1),
      y2: outer.y.toFixed(1),
    }));

    const text = createSvgElement("text", {
      class: "radar-label",
      x: label.x.toFixed(1),
      y: label.y.toFixed(1),
      "text-anchor": label.x < 190 ? "end" : label.x > 240 ? "start" : "middle",
      "dominant-baseline": "middle",
    });
    text.textContent = axis.label;
    radarAxes.appendChild(text);

    const valueText = createSvgElement("text", {
      class: "radar-value-label",
      x: label.x.toFixed(1),
      y: (label.y + 16).toFixed(1),
      "text-anchor": label.x < 190 ? "end" : label.x > 240 ? "start" : "middle",
      "dominant-baseline": "middle",
      "data-axis-value": axis.key,
    });
    radarAxes.appendChild(valueText);
  });
}

function renderRadar() {
  const points = profileAxes.map((axis, index) => pointForAxis(index, state.profile[axis.key]));
  radarFill.setAttribute("points", pointsToString(points));
  radarLine.setAttribute("points", `${pointsToString(points)} ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`);
  radarPoints.replaceChildren();

  profileAxes.forEach((axis, index) => {
    const point = pointForAxis(index, state.profile[axis.key]);
    const group = createSvgElement("g", {
      class: "radar-point",
      tabindex: "0",
      role: "slider",
      "aria-label": `${axis.label} profile weight`,
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": String(state.profile[axis.key]),
      "data-axis": axis.key,
    });

    const hit = createSvgElement("circle", {
      cx: point.x.toFixed(1),
      cy: point.y.toFixed(1),
      r: "18",
      fill: "transparent",
    });
    group.appendChild(hit);

    if (axis.shape === "circle") {
      group.appendChild(createSvgElement("circle", {
        class: "radar-shape",
        cx: point.x.toFixed(1),
        cy: point.y.toFixed(1),
        r: "8",
        fill: axis.color,
      }));
    } else if (axis.shape === "square") {
      group.appendChild(createSvgElement("rect", {
        class: "radar-shape",
        x: (point.x - 8).toFixed(1),
        y: (point.y - 8).toFixed(1),
        width: "16",
        height: "16",
        rx: "3",
        fill: axis.color,
      }));
    } else {
      group.appendChild(createSvgElement("polygon", {
        class: "radar-shape",
        points: shapePath(axis.shape, point.x, point.y, 19),
        fill: axis.color,
      }));
    }

    radarPoints.appendChild(group);
  });

  for (const axis of profileAxes) {
    const label = radar.querySelector(`[data-axis-value="${axis.key}"]`);
    if (label) label.textContent = `${state.profile[axis.key]}%`;
  }
}

function setRadarValue(axisKey, value) {
  state.profile[axisKey] = clamp(Math.round(value), 0, 100);
  copyStatus.textContent = "";
  render();
}

function radarValueFromEvent(event, axisKey) {
  const axisIndex = profileAxes.findIndex((axis) => axis.key === axisKey);
  const axis = pointForAxis(axisIndex, 100);
  const rect = radar.getBoundingClientRect();
  const scaleX = 430 / rect.width;
  const scaleY = 360 / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  const vx = Math.cos(axis.angle);
  const vy = Math.sin(axis.angle);
  const projected = (x - axis.center.x) * vx + (y - axis.center.y) * vy;
  return clamp(Math.round(projected / 126 * 100), 0, 100);
}

function band(value) {
  if (value >= 71) return "high";
  if (value >= 31) return "medium";
  return "low";
}

function postureSummary() {
  const entries = postureKeys
    .map((key) => ({ key, value: state.posture[key] }))
    .sort((a, b) => b.value - a.value);
  const primary = entries[0];
  const secondary = entries.filter((entry) => entry.value >= 25 && entry.key !== primary.key);

  if (primary.value < 42) {
    return "Internal posture is balanced across exploration, committed work, and contribution capacity.";
  }

  const lead = `Internal posture is mostly ${postureLabels[primary.key].toLowerCase()}`;
  if (secondary.length === 0) return `${lead}.`;
  return `${lead}, with ${secondary.map((entry) => postureLabels[entry.key].toLowerCase()).join(" and ")} still present.`;
}

function profileSummary() {
  const high = profileAxes.filter((axis) => state.profile[axis.key] >= 71).map((axis) => axis.label.toLowerCase());
  const medium = profileAxes.filter((axis) => state.profile[axis.key] >= 45 && state.profile[axis.key] < 71).map((axis) => axis.label.toLowerCase());

  if (high.length === 0 && medium.length === 0) {
    return "External read is intentionally quiet, with no strong surface area declared yet.";
  }

  const primary = high.length ? `${high.join(" + ")} heavy` : `${medium.slice(0, 2).join(" + ")} leaning`;
  const secondary = medium.length && high.length ? `, with ${medium.slice(0, 2).join(" and ")} overlap` : "";
  return `External read is ${primary}${secondary}.`;
}

function snapshot() {
  return {
    preference_snapshot: {
      schema_version: 1,
      updated_at: new Date().toISOString().slice(0, 10),
      internal_posture: { ...state.posture },
      external_profile: { ...state.profile },
      bands: {
        internal_posture: Object.fromEntries(postureKeys.map((key) => [key, band(state.posture[key])])),
        external_profile: Object.fromEntries(profileAxes.map((axis) => [axis.key, band(state.profile[axis.key])])),
      },
      availability: {
        status: "open-to-async",
        note: "Can review two projects this week, prefer async first.",
      },
      routing_preferences: {
        wants: ["high-context intros", "technical review"],
        avoids: ["generic networking"],
      },
      visibility: "cohort-public",
      source: "self-declared-draft",
    },
  };
}

function render() {
  renderDials();
  renderRadar();
  summaryText.textContent = `${postureSummary()} ${profileSummary()}`;
  jsonOut.textContent = JSON.stringify(snapshot(), null, 2);
}

function wireDials() {
  document.querySelectorAll(".dial").forEach((dial) => {
    const key = dial.dataset.key;
    const face = dial.querySelector(".dial-face");

    face.addEventListener("pointerdown", (event) => {
      activeDial = { key, face };
      face.setPointerCapture(event.pointerId);
      setPostureValue(key, pointerValueFromEvent(event, face));
    });

    face.addEventListener("pointermove", (event) => {
      if (!activeDial || activeDial.key !== key) return;
      setPostureValue(key, pointerValueFromEvent(event, face));
    });

    face.addEventListener("pointerup", () => {
      activeDial = null;
    });

    face.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 10 : 5;
      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        event.preventDefault();
        setPostureValue(key, state.posture[key] + step);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        event.preventDefault();
        setPostureValue(key, state.posture[key] - step);
      }
    });
  });
}

function wireRadar() {
  radar.addEventListener("pointerdown", (event) => {
    const point = event.target.closest(".radar-point");
    if (!point) return;
    activeRadarAxis = point.dataset.axis;
    point.setPointerCapture(event.pointerId);
    setRadarValue(activeRadarAxis, radarValueFromEvent(event, activeRadarAxis));
  });

  radar.addEventListener("pointermove", (event) => {
    if (!activeRadarAxis) return;
    setRadarValue(activeRadarAxis, radarValueFromEvent(event, activeRadarAxis));
  });

  radar.addEventListener("pointerup", () => {
    activeRadarAxis = null;
  });

  radar.addEventListener("keydown", (event) => {
    const point = event.target.closest(".radar-point");
    if (!point) return;
    const axisKey = point.dataset.axis;
    const step = event.shiftKey ? 10 : 5;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setRadarValue(axisKey, state.profile[axisKey] + step);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setRadarValue(axisKey, state.profile[axisKey] - step);
    }
  });
}

seedProfileBtn.addEventListener("click", () => {
  Object.assign(state.posture, seededState.posture);
  Object.assign(state.profile, seededState.profile);
  copyStatus.textContent = "Seeded from example profile fields.";
  render();
});

copyJsonBtn.addEventListener("click", async () => {
  const text = JSON.stringify(snapshot(), null, 2);
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Copied snapshot JSON.";
  } catch {
    copyStatus.textContent = "Clipboard unavailable. JSON is shown below.";
  }
});

renderRadarStatic();
wireDials();
wireRadar();
render();
