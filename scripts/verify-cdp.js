const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9223;
const userDataDir = path.join(os.tmpdir(), `radial-edge-${Date.now()}`);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readJson(url) {
  const response = await fetch(url);
  return response.json();
}

async function waitForCdp() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      return await readJson(`http://127.0.0.1:${port}/json/version`);
    } catch {
      await delay(100);
    }
  }
  throw new Error("CDP endpoint did not become available");
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  };

  return new Promise((resolve, reject) => {
    ws.onopen = () => {
      resolve({
        send(method, params = {}, sessionId) {
          const message = { id: ++id, method, params };
          if (sessionId) message.sessionId = sessionId;
          ws.send(JSON.stringify(message));
          return new Promise((resolveSend, rejectSend) => {
            pending.set(id, { resolve: resolveSend, reject: rejectSend });
          });
        },
        close() {
          ws.close();
        },
      });
    };
    ws.onerror = reject;
  });
}

async function main() {
  const edge = spawn(edgePath, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ], { stdio: "ignore" });

  let cdp;
  try {
    const version = await waitForCdp();
    cdp = await connect(version.webSocketDebuggerUrl);
    const target = await cdp.send("Target.createTarget", {
      url: "http://localhost:4173/onboarding.html",
    });
    const attached = await cdp.send("Target.attachToTarget", {
      targetId: target.targetId,
      flatten: true,
    });
    const sessionId = attached.sessionId;

    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    }, sessionId);
    await delay(700);

    const flowResult = await cdp.send("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: `(async () => {
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const center = (el) => {
          const rect = el.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        };
        const pick = async (stage, option) => {
          const el = document.querySelector('[data-stage="' + stage + '"][data-option="' + option + '"]');
          if (!el) throw new Error("missing option " + stage + ":" + option);
          const handle = document.querySelector('[data-action="handle"]');
          const svg = document.querySelector(".trace");
          if (!handle || !svg) throw new Error("missing drag handle");
          const start = center(handle);
          const mark = el.querySelector(".option-glyph") || el;
          const end = center(mark);
          const pointer = { bubbles: true, cancelable: true, view: window, pointerId: 7, pointerType: "mouse", isPrimary: true };
          handle.dispatchEvent(new PointerEvent("pointerdown", { ...pointer, clientX: start.x, clientY: start.y }));
          svg.dispatchEvent(new PointerEvent("pointermove", { ...pointer, clientX: (start.x + end.x) / 2, clientY: (start.y + end.y) / 2 }));
          svg.dispatchEvent(new PointerEvent("pointermove", { ...pointer, clientX: end.x, clientY: end.y }));
          svg.dispatchEvent(new PointerEvent("pointerup", { ...pointer, clientX: end.x, clientY: end.y }));
        };
        const route = [
          ["role", "product"],
          ["team", "none"],
          ["geo", "nyc"],
          ["domain", "design"],
          ["comm_style", "async-context"],
          ["contribute_interests", "product-pass"],
          ["availability_pref", "async"],
          ["weekly_intention", "ship-prototype"],
          ["dietary_restrictions", "none"],
          ["anything_else", "nothing"]
        ];
        for (const [stage, option] of route) {
          await pick(stage, option);
          await wait(300);
        }
        const reveal = document.querySelector('[data-action="reveal"]');
        if (!reveal) {
          return {
            ok: false,
            reason: "missing reveal action",
            state: window.__hiddenOnboarding?.state,
            selected: Array.from(document.querySelectorAll(".choice-chip")).map((el) => ({
              option: el.dataset.option,
              pressed: el.getAttribute("aria-pressed"),
            })),
            primary: document.querySelector(".primary-button")?.outerHTML,
          };
        }
        reveal.click();
        await wait(350);
        return { ok: true };
      })()`,
    }, sessionId);
    if (flowResult.exceptionDetails) {
      throw new Error(flowResult.exceptionDetails.text || "flow evaluation failed");
    }
    if (flowResult.result.value && flowResult.result.value.ok === false) {
      throw new Error(JSON.stringify(flowResult.result.value, null, 2));
    }

    const desktop = await cdp.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `({
        shape: document.querySelector(".shape-name strong")?.textContent,
        hiddenShapeExported: document.querySelector(".preview")?.textContent.includes("hidden_shape:"),
        markdownHead: document.querySelector(".preview")?.textContent.slice(0, 240),
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      })`,
    }, sessionId);
    const desktopShot = await cdp.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    }, sessionId);
    fs.writeFileSync("prototype-reveal.png", Buffer.from(desktopShot.data, "base64"));

    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 900,
      deviceScaleFactor: 1,
      mobile: true,
    }, sessionId);
    await cdp.send("Page.navigate", { url: "http://localhost:4173/onboarding.html" }, sessionId);
    await delay(700);
    const mobile = await cdp.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `({
        h1: document.querySelector("h1")?.textContent,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      })`,
    }, sessionId);
    const mobileShot = await cdp.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    }, sessionId);
    fs.writeFileSync("prototype-mobile.png", Buffer.from(mobileShot.data, "base64"));

    console.log(JSON.stringify({
      desktop: desktop.result.value,
      mobile: mobile.result.value,
    }, null, 2));
  } finally {
    if (cdp) cdp.close();
    edge.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
