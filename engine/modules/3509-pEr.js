
class pEr {
  constructor(e = [], t = {}) {
    ((this.content = []), (this.indent = 0), (this.args = e), (this.closed = t));
  }
  indented(e) {
    this.indent += 1;
    try {
      e(this);
    } finally {
      this.indent -= 1;
    }
  }
  write(e) {
    if (typeof e === "function") {
      (e(this, { execution: "sync" }), e(this, { execution: "async" }));
      return;
    }
    let r = e
        .split(
          `
`,
        )
        .filter((H) => H),
      s = Math.min(...r.map((H) => H.length - H.trimStart().length)),
      a = r.map((H) => H.slice(s)).map((H) => " ".repeat(this.indent * 2) + H);
    for (let H of a) this.content.push(H);
  }
  compile() {
    let e = Function,
      t = this?.content ?? [""];
    return new e(
      ...Object.keys(this.closed),
      `return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`,
    )(...Object.values(this.closed));
  }
}