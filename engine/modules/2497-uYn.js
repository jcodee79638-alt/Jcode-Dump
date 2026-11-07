
var uYn = Ie(function ($uc, AYn) {
  var z8o = ["type", "description", "default", "key"],
    Q8o = [
      "default",
      "defaultDescription",
      "deprecated",
      "description",
      "exclusive",
      "flatten",
      "hint",
      "key",
      "short",
      "type",
      "typeDescription",
      "usage",
      "envExport",
      "alias",
      "required",
    ],
    {
      semver: { type: Y8o },
      Umask: { type: Z8o },
      url: { type: eOo },
      path: { type: tOo },
    } = $Se();
  class aYn {
    constructor(e, t) {
      if (
        ((this.key = e),
        (this.envExport = !0),
        Object.assign(this, t),
        this.validate(),
        !this.defaultDescription)
      )
        this.defaultDescription = cYn(this.default);
      if (!this.typeDescription) this.typeDescription = HYn(this.type);
      if (!this.hint)
        if (this.type === Number) this.hint = "<number>";
        else this.hint = `<${this.key}>`;
      if (!this.usage) this.usage = rOo(this);
    }
    validate() {
      for (let e of z8o)
        if (!Object.prototype.hasOwnProperty.call(this, e)) throw Error(`config lacks ${e}: ${this.key}`);
      if (!this.key) throw Error(`config lacks key: ${this.key}`);
      for (let e of Object.keys(this))
        if (!Q8o.includes(e)) throw Error(`config defines unknown field ${e}: ${this.key}`);
    }
    describe() {
      let e = w7e(this.description),
        t = this.envExport
          ? ""
          : `
This value is not exported to the environment for child processes.
`,
        r = !this.deprecated
          ? ""
          : `* DEPRECATED: ${w7e(this.deprecated)}
`,
        s = !this.exclusive
          ? ""
          : `
This config cannot be used with: \`${this.exclusive.join("`, `")}\``;
      return nOo(`#### \`${this.key}\`

* Default: ${w7e(this.defaultDescription)}
* Type: ${w7e(this.typeDescription)}
${r}
${e}
${s}
${t}`);
    }
  }
  var rOo = (e) => {
      let t = "";
      if (!Array.isArray(e.type)) {
        if (e.short) t = `-${e.short}|`;
        if (e.type === Boolean && e.default !== !1) t = `${t}--no-${e.key}`;
        else t = `${t}--${e.key}`;
        if (e.type !== Boolean) t = `${t} ${e.hint}`;
        return t;
      }
      if (((t = `--${e.key}`), e.short)) t = `-${e.short}|--${e.key}`;
      let r = e.type,
        s = r.includes(Array),
        a = r.includes(Boolean);
      if (((r = r.filter((f) => f !== null && f !== Array && f !== Boolean)), !r.length)) return t;
      let H;
      if (!r.some((f) => typeof f !== "string")) H = `<${r.filter((f) => f).join("|")}>`;
      else H = e.hint;
      if (a) t = `--no-${e.key}|${t}`;
      let u = `${t} ${H}`;
      if (s) return `${u} [${u} ...]`;
      else return u;
    },
    HYn = (e) => {
      if (Array.isArray(e)) {
        let t = e.filter((u) => u !== Array).map((u) => HYn(u)),
          r = t.length > 1 ? [t.pop()] : [],
          s = t.length > 1 ? ", or " : " or ",
          a = [t.join(", ")].concat(r).join(s),
          H = e.includes(Array) ? " (can be set multiple times)" : "";
        return `${a}${H}`;
      }
      switch (e) {
        case String:
          return "String";
        case Number:
          return "Number";
        case Z8o:
          return "Octal numeric string in range 0000..0777 (0..511)";
        case Boolean:
          return "Boolean";
        case Date:
          return "Date";
        case tOo:
          return "Path";
        case Y8o:
          return "SemVer string";
        case eOo:
          return "URL";
        default:
          return cYn(e);
      }
    },
    cYn = (e) => (typeof e === "string" ? JSON.stringify(e) : String(e)),
    w7e = (e) => {
      let t = e.match(/\n +/);
      return !t
        ? e.trim()
        : e
            .split(t[0])
            .join(
              `
`,
            )
            .trim();
    },
    oYn = (e) => {
      let t = Math.min(Math.max(20, process.stdout.columns) || 80, 80) - 5;
      return w7e(e)
        .split(/[ \n]+/)
        .reduce((r, s) => {
          let a = r
              .split(
                `
`,
              )
              .pop(),
            H =
              a.length && a.length + s.length > t
                ? `
`
                : " ";
          return r + H + s;
        });
    },
    nOo = (e) => {
      let t = !1;
      return e
        .split(
          `

`,
        )
        .map((r) => {
          if (t || r.startsWith("```")) return ((t = !r.endsWith("```")), r);
          if (r.charAt(0) === "*")
            return (
              "* " +
              r
                .slice(1)
                .trim()
                .split(
                  `
* `,
                )
                .map((s) =>
                  oYn(s).replace(
                    /\n/g,
                    `
  `,
                  ),
                ).join(`
* `)
            );
          else return oYn(r);
        }).join(`

`);
    };
  AYn.exports = aYn;
});