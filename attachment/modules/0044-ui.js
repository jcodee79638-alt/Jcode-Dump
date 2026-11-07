
class ui {
  #t = new Map();
  times = [];
  time(t) {
    (this.#t.has(t) && H(`Timer is already running for ${t}`), this.#t.set(t, Date.now()));
  }
  timeEnd(t) {
    (this.#t.has(t) || H(`Timer has not been started for ${t}`),
      this.times.push({ name: t, start: this.#t.get(t), end: Date.now() }),
      this.#t.delete(t));
  }
  toString() {
    const t = Math.max(...this.times.map((e) => e.name.length));
    return this.times
      .map(
        (e) => `${e.name.padEnd(t)} ${e.end - e.start}ms
`,
      )
      .join("");
  }
}