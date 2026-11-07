
var ixt = ne(async () => {
  Gt();
  jA();
  OH();
  BA();
  await Jn([ixt(), eN()]);
  a_a = `... (line truncated to ${Yqe} chars)`;
  rhe = class rhe extends ki()("ReadTool.BinaryFileError", { resource: re }) {
    get message() {
      return `Cannot read binary file: ${this.resource}`;
    }
  };
  nxt = class nxt extends ki()("ReadTool.MediaIngestLimitError", { resource: re, maximumBytes: Aa }) {
    get message() {
      return `Media exceeds ${this.maximumBytes} byte ingestion limit: ${this.resource}`;
    }
  };
  oyi = class oyi extends ki()("ReadTool.MalformedUtf8Error", { resource: re }) {
    get message() {
      return `File is not valid UTF-8: ${this.resource}`;
    }
  };
  ayi = class ayi extends ki()("ReadTool.OffsetOutOfRangeError", { offset: Aa }) {
    get message() {
      return `Offset ${this.offset} is out of range`;
    }
  };
  _$r = class _$r extends (
    ki()("ReadTool.PathKindError", { resource: re, expected: Jo(["a file", "a file or directory"]) })
  ) {
    get message() {
      return `Path is not ${this.expected}: ${this.resource}`;
    }
  };
  Hyi = nt({ offset: qc.pipe(be), limit: qc.check(zie(eGe)).pipe(be) });
  h$r = class h$r extends (
    Pa("ReadTool.TextPage")({
      type: ri("text-page"),
      content: re,
      mime: re,
      offset: qc,
      truncated: Vi,
      next: qc.pipe(be),
    })
  ) {};
  L$r = class L$r extends Pa("ReadTool.ListPage")({ entries: On(xD), truncated: Vi, next: qc.pipe(be) }) {};
  tGe = class tGe extends _i()("@opencode/ReadToolFileSystem") {};
  ((cyi = new Set([
    ".zip",
    ".tar",
    ".gz",
    ".exe",
    ".dll",
    ".so",
    ".class",
    ".jar",
    ".war",
    ".7z",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".odt",
    ".ods",
    ".odp",
    ".bin",
    ".dat",
    ".obj",
    ".o",
    ".a",
    ".lib",
    ".wasm",
    ".pyc",
    ".pyo",
  ])),
    (A_a = Ge("ReadTool.inspect")(function* (e, t) {
      let r = yield* e.stat(t),
        s = r.type === "File" ? "file" : r.type === "Directory" ? "directory" : void 0;
      if (!s) return yield* bn(new _$r({ resource: t, expected: "a file or directory" }));
      return s;
    })),
    (u_a = Ge("ReadTool.read")(function* (e, t, r, s = {}) {
      let a = yield* e.realPath(t);
      return yield* FL(
        ft(function* () {
          let H = yield* e.open(a, { flag: "r" }),
            u = yield* H.stat;
          if (u.type !== "File") return yield* bn(new _$r({ resource: r, expected: "a file" }));
          let f = uD(yield* H.readAlloc(Math.min(65536, Number(u.size) || 4096)), () => new Uint8Array()),
            d = H_a(f);
          if (d) {
            if (u.size > cbe) return yield* bn(new nxt({ resource: r, maximumBytes: cbe }));
            let z = [f],
              Ae = f.length;
            while (Ae <= cbe) {
              let le = yield* H.readAlloc(Math.min(65536, cbe + 1 - Ae));
              if (vl(le)) break;
              (z.push(le.value), (Ae += le.value.length));
            }
            if (Ae > cbe) return yield* bn(new nxt({ resource: r, maximumBytes: cbe }));
            return {
              uri: iyi(a).href,
              name: ube.basename(a),
              content: Buffer.concat(
                z.map((le) => Buffer.from(le)),
                Ae,
              ).toString("base64"),
              encoding: "base64",
              mime: d,
            };
          }
          if (Abe(f, [37, 80, 68, 70]) || cyi.has(ube.extname(r).toLowerCase()))
            return yield* bn(new rhe({ resource: r }));
          if (!(u.size > rxt || s.offset !== void 0 || s.limit !== void 0)) {
            if (syi(r, f)) return yield* bn(new rhe({ resource: r }));
            let z = new TextDecoder("utf-8", { fatal: !0 }),
              Ae = [yield* Zqe(r, z, f)];
            while (!0) {
              let le = yield* H.readAlloc(65536);
              if (vl(le)) break;
              Ae.push(yield* c_a(r, z, le.value));
            }
            return (
              Ae.push(yield* Zqe(r, z)),
              {
                uri: iyi(a).href,
                name: ube.basename(a),
                content: Ae.join(""),
                encoding: "utf8",
                mime: ui.mimeType(a),
              }
            );
          }
          let L = s.offset ?? 1,
            I = Math.min(s.limit ?? eGe, eGe),
            D = [],
            S = new TextDecoder("utf-8", { fatal: !0 }),
            T = "",
            C = !1,
            O = 1,
            B = 0,
            V,
            q = (z) => {
              if (O < L) return (O++, !0);
              if (D.length >= I || B >= rxt) return ((V = O), !1);
              let Ae = z.length > Yqe ? z.slice(0, Yqe) + a_a : z,
                le = Buffer.byteLength(Ae, "utf-8") + (D.length > 0 ? 1 : 0);
              if (B + le > rxt) return ((V = O), !1);
              return (D.push(Ae), (B += le), O++, !0);
            },
            Z = (z) => {
              let Ae = z;
              while (!0) {
                let le = Ae.indexOf(`
`);
                if (le === -1) {
                  if (!C) {
                    if (((T += Ae), T.length > Yqe)) ((T = T.slice(0, Yqe + 1)), (C = !0));
                  }
                  break;
                }
                let Be = T + (C ? "" : Ae.slice(0, le));
                if (
                  ((T = ""), (C = !1), (Ae = Ae.slice(le + 1)), !q(Be.endsWith("\r") ? Be.slice(0, -1) : Be))
                )
                  return !1;
              }
              return !0;
            },
            se = ni(function* (z) {
              let Ae = 0;
              while (Ae < z.length) {
                if (D.length >= I || B >= rxt) return ((V = O), !1);
                let le = z.indexOf(10, Ae),
                  Be = le === -1 ? z.length : le + 1,
                  Te = z.subarray(Ae, Be);
                if (syi(r, Te)) return yield* bn(new rhe({ resource: r }));
                if (!Z(yield* Zqe(r, S, Te))) return !1;
                Ae = Be;
              }
              return !0;
            }),
            ae = !(yield* se(f));
          while (!ae) {
            let z = yield* H.readAlloc(65536);
            if (vl(z)) break;
            ae = !(yield* se(z.value));
          }
          if (!ae) {
            let z = yield* Zqe(r, S);
            if (!C) T += z;
            if (T) q(T.endsWith("\r") ? T.slice(0, -1) : T);
          }
          if (D.length === 0 && L !== 1) return yield* bn(new ayi({ offset: L }));
          return new h$r({
            type: "text-page",
            content: D.join(`
`),
            mime: ui.mimeType(a),
            offset: L,
            truncated: V !== void 0,
            ...(V === void 0 ? {} : { next: V }),
          });
        }),
      );
    })),
    (l_a = Ge("ReadTool.list")(function* (e, t, r = {}) {
      let s = yield* e.realPath(t),
        a = yield* e.readDirectoryEntries(s),
        H = r.offset ?? 1,
        u = Math.min(r.limit ?? eGe, eGe),
        d = (yield* ja(
          a,
          (I) =>
            ft(function* () {
              let D = ube.join(s, I.name),
                S = yield* e.realPath(D).pipe($s(() => ti));
              if (!S || !ui.contains(s, S)) return;
              let T = yield* e.stat(S).pipe($s(() => ti)),
                C = T?.type === "Directory" ? "directory" : T?.type === "File" ? "file" : void 0;
              if (!C) return;
              return xD.make({ path: du.make(I.name + (C === "directory" ? ube.sep : "")), type: C });
            }),
          { concurrency: 16 },
        ))
          .filter((I) => I !== void 0)
          .sort((I, D) =>
            I.type === D.type ? I.path.localeCompare(D.path) : I.type === "directory" ? -1 : 1,
          ),
        _ = d.slice(H - 1, H - 1 + u),
        L = H - 1 + _.length < d.length;
      return new L$r({ entries: _, truncated: L, ...(L ? { next: H + _.length } : {}) });
    })),
    (f_a = Es(
      tGe,
      ft(function* () {
        let e = yield* ui.Service;
        return tGe.of({
          inspect: (t) => A_a(e, t),
          read: (t, r, s) => u_a(e, t, r, s),
          list: (t, r) => l_a(e, t, r),
        });
      }),
    )),
    (Ayi = Ua({ service: tGe, layer: f_a, deps: [ui.node] })));
});