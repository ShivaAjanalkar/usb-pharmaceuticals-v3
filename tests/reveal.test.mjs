import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const compiled = ts.transpileModule(readFileSync(new URL("../src/lib/reveal.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function fixture({ observerAvailable = true } = {}) {
  const listeners = new Map();
  const instances = [];
  const animations = [];
  const document = { visibilityState: "visible", addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name) };
  class Observer {
    targets = new Set(); disconnected = false;
    constructor(callback) { this.callback = callback; instances.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.disconnected = true; this.targets.clear(); }
    enter(target, bottom = 400) { this.callback([{ target, isIntersecting: true, boundingClientRect: { bottom } }]); }
  }
  const module = { exports: {} };
  vm.runInNewContext(compiled, { module, exports: module.exports, document, window: { innerHeight: 1000 }, IntersectionObserver: observerAvailable ? Observer : undefined });
  const element = (top, bottom = top + 100) => ({
    style: {}, children: [],
    getBoundingClientRect: () => ({ top, bottom }),
    contains(other) { return this.children.includes(other); },
    animate(keyframes, options) { const animation = { target: this, keyframes, options, cancelled: false, cancel() { this.cancelled = true; } }; animations.push(animation); return animation; },
  });
  const start = (targets, intro = false) => module.exports.observeReveals({ querySelectorAll: () => targets }, intro, false);
  return { document, listeners, instances, animations, element, start };
}

test("long sections observe each off-screen card instead of revealing the whole grid early", () => {
  const f = fixture(); const visible = f.element(200); const next = f.element(1400); const last = f.element(4000);
  const stop = f.start([visible, next, last]); const observer = f.instances[0];
  assert.equal(f.animations.length, 0); assert.equal(observer.targets.size, 2);
  observer.enter(next); assert.equal(f.animations.length, 1); assert.equal(f.animations[0].target, next);
  assert(observer.targets.has(last)); assert.equal(Object.keys(last.style).length, 0);
  stop();
});
test("intro content gets a bounded stagger and cleanup restores the original visible state", () => {
  const f = fixture(); const targets = Array.from({ length: 8 }, () => f.element(200)); const stop = f.start(targets, true);
  assert.equal(f.animations.length, 8); assert(f.animations.every(a => a.options.delay <= 225));
  stop(); assert(f.animations.every(a => a.cancelled)); assert(f.instances[0].disconnected); assert.equal(f.listeners.size, 0);
  assert(targets.every(target => Object.keys(target.style).length === 0));
});
test("a fast scroll past content never strands it hidden", () => {
  const f = fixture(); const target = f.element(2000); const stop = f.start([target]);
  f.instances[0].enter(target, -20); assert.equal(f.animations.length, 0); assert.equal(Object.keys(target.style).length, 0);
  stop();
});
test("backgrounding the page cancels delayed entrances", () => {
  const f = fixture(); const stop = f.start([f.element(100), f.element(200)], true);
  f.document.visibilityState = "hidden"; f.listeners.get("visibilitychange")();
  assert(f.animations.every(a => a.cancelled)); stop();
});
test("missing observer support keeps all content readable", () => {
  const f = fixture({ observerAvailable: false }); const target = f.element(3000); const stop = f.start([target]);
  assert.equal(f.animations.length, 0); assert.equal(Object.keys(target.style).length, 0); stop();
});
test("nested reveal markers do not animate both a parent and its child", () => {
  const f = fixture(); const parent = f.element(100); const child = f.element(150); parent.children.push(child);
  const stop = f.start([parent, child], true); assert.equal(f.animations.length, 1); assert.equal(f.animations[0].target, parent); stop();
});
