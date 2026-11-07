
var tXi = ne(async () => {
  Gt();
  BA();
  jA();
  Q5i();
  Ql();
  Vce();
  await Jn([Vy(), ek(), qLe()]);
  ((MXa = `... (line truncated to ${Cjr} chars)`),
    (TXa = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"])));
  wjr = class wjr extends ki()("ReadStop", {}) {};
  ((vXa = nt({
    filePath: re.annotate({ description: "The absolute path to the file or directory to read" }),
    offset: be(Ko).annotate({ description: "The line number to start reading from (1-indexed)" }),
    limit: be(Ko).annotate({
      description:
        "The maximum number of lines to read (defaults to 200; use offset/limit for relevant larger sections)",
    }),
  })),
    (eXi = t_(
      "read",
      ft(function* () {
        let e = yield* ui.Service,
          t = yield* jCe,
          r = yield* fR,
          s = yield* $f,
          a = Ge("ReadTool.miss")(function* (I) {
            let D = Eb.dirname(I),
              S = Eb.basename(I),
              T = yield* e.readDirectory(D).pipe(
                Vn((C) =>
                  C.filter(
                    (O) =>
                      O.toLowerCase().includes(S.toLowerCase()) || S.toLowerCase().includes(O.toLowerCase()),
                  )
                    .map((O) => Eb.join(D, O))
                    .slice(0, 3),
                ),
                $s(() => Jt([])),
              );
            if (T.length > 0)
              return yield* bn(
                Error(`File not found: ${I}

Did you mean one of these?
${T.join(`
`)}`),
              );
            return yield* bn(Error(`File not found: ${I}`));
          }),
          H = Ge("ReadTool.list")(function* (I) {
            let D = yield* e.readDirectoryEntries(I);
            return yield* ja(
              D,
              ni(function* (S) {
                if (S.type === "directory") return S.name + "/";
                if (S.type !== "symlink") return S.name;
                if ((yield* e.stat(Eb.join(I, S.name)).pipe($s(() => ti)))?.type === "Directory")
                  return S.name + "/";
                return S.name;
              }),
              { concurrency: "unbounded" },
            ).pipe(Vn((S) => S.sort((T, C) => T.localeCompare(C))));
          }),
          u = Ge("ReadTool.warm")(function* (I) {
            yield* r.touchFile(I).pipe(Bsn, zm(s));
          }),
          f = Ge("ReadTool.readSample")(function* (I, D, S) {
            if (D === 0) return new Uint8Array();
            return yield* FL(
              ft(function* () {
                let T = yield* e.open(I, { flag: "r" });
                return uD(yield* T.readAlloc(Math.min(S, D)), () => new Uint8Array());
              }),
            );
          }),
          d = Ge("ReadTool.lines")(function* (I, D) {
            let S = D.offset - 1,
              T = [],
              C = { bytes: 0, count: 0, cut: !1, more: !1, done: !1 },
              O = new TextDecoder("utf-8");
            return (
              yield* e.stream(I).pipe(
                xE((B) => O.decode(B, { stream: !0 })),
                d1e,
                FW((B) =>
                  ft(function* () {
                    if (C.done) return yield* new wjr();
                    if (((C.count += 1), C.count <= S)) return;
                    if (T.length >= D.limit) {
                      C.more = !0;
                      return;
                    }
                    let V = B.length > Cjr ? B.substring(0, Cjr) + MXa : B,
                      q = Buffer.byteLength(V, "utf-8") + (T.length > 0 ? 1 : 0);
                    if (C.bytes + q <= D.maxBytes) {
                      (T.push(V), (C.bytes += q));
                      return;
                    }
                    return ((C.cut = !0), (C.more = !0), (C.done = !0), yield* new wjr());
                  }),
                ),
                EA("ReadStop", () => ti),
              ),
              { raw: T, count: C.count, cut: C.cut, more: C.more, offset: D.offset }
            );
          }),
          _ = (I, D) => {
            switch (Eb.extname(I).toLowerCase()) {
              case ".zip":
              case ".tar":
              case ".gz":
              case ".exe":
              case ".dll":
              case ".so":
              case ".class":
              case ".jar":
              case ".war":
              case ".7z":
              case ".doc":
              case ".docx":
              case ".xls":
              case ".xlsx":
              case ".ppt":
              case ".pptx":
              case ".odt":
              case ".ods":
              case ".odp":
              case ".bin":
              case ".dat":
              case ".obj":
              case ".o":
              case ".a":
              case ".lib":
              case ".wasm":
              case ".pyc":
              case ".pyo":
                return !0;
            }
            if (D.length === 0) return !1;
            let T = 0;
            for (let C = 0; C < D.length; C++) {
              if (D[C] === 0) return !0;
              if (D[C] < 9 || (D[C] > 13 && D[C] < 32)) T++;
            }
            return T / D.length > 0.3;
          },
          L = Ge("ReadTool.execute")(function* (I, D) {
            let S = yield* Jc,
              T = I.filePath;
            if (!Eb.isAbsolute(T)) T = Eb.resolve(S.directory, T);
            T = ui.normalizePath(T);
            let C = Eb.relative(S.worktree, T),
              O = yield* e.stat(T).pipe(
                GM(
                  (Lt) => "reason" in Lt && Lt.reason._tag === "NotFound",
                  () => Jt(void 0),
                ),
              );
            if (
              (yield* tk(D, T, {
                bypass: Boolean(D.extra?.bypassCwdCheck),
                kind: O?.type === "Directory" ? "directory" : "file",
              }),
              yield* D.ask({
                permission: "read",
                patterns: [Eb.relative(S.worktree, T)],
                always: ["*"],
                metadata: {},
              }),
              !O)
            )
              return yield* a(T);
            if (O.type === "Directory") {
              let Lt = yield* H(T),
                Ht = I.limit ?? Z5i,
                Se = I.offset || 1,
                _e = Se - 1,
                we = Lt.slice(_e, _e + Ht),
                Pe = _e + we.length < Lt.length;
              return {
                title: C,
                output: [
                  `<path>${T}</path>`,
                  "<type>directory</type>",
                  "<entries>",
                  we.join(`
`),
                  Pe
                    ? `
(Showing ${we.length} of ${Lt.length} entries. Use 'offset' parameter to read beyond entry ${Se + we.length})`
                    : `
(${Lt.length} entries)`,
                  "</entries>",
                ].join(`
`),
                metadata: {
                  preview: we.slice(0, 20).join(`
`),
                  truncated: Pe,
                  loaded: [],
                  display: {
                    type: "directory",
                    path: T,
                    entries: we,
                    offset: Se,
                    totalEntries: Lt.length,
                    truncated: Pe,
                  },
                },
              };
            }
            let B = yield* t.resolve(D.messages, T, D.messageID),
              V = yield* f(T, Number(O.size), SXa),
              q = hOi(V, ui.mimeType(T));
            if (TXa.has(q) || lvt(q)) {
              let Lt = yield* e.readFile(T),
                Ht = lvt(q) ? "PDF read successfully" : "Image read successfully";
              return {
                title: C,
                output: Ht,
                metadata: { preview: Ht, truncated: !1, loaded: B.map((Se) => Se.filepath) },
                attachments: [
                  { type: "file", mime: q, url: `data:${q};base64,${Buffer.from(Lt).toString("base64")}` },
                ],
              };
            }
            if (_(T, V)) return yield* bn(Error(`Cannot read binary file: ${T}`));
            let se = /^(?:AGENTS|SKILL|RULES?|INSTRUCTIONS?)\.md$/i.test(Eb.basename(T)),
              ae = I.limit === void 0 && !se ? 12288 : xXa,
              z = yield* d(T, { limit: I.limit ?? (se ? 2000 : Z5i), offset: I.offset || 1, maxBytes: ae });
            if (z.count < z.offset && !(z.count === 0 && z.offset === 1))
              return yield* bn(Error(`Offset ${z.offset} is out of range for this file (${z.count} lines)`));
            let Ae = [
              `<path>${T}</path>`,
              "<type>file</type>",
              `<content>
`,
            ].join(`
`);
            Ae += z.raw.map((Lt, Ht) => `${Ht + z.offset}: ${Lt}`).join(`
`);
            let le = z.offset + z.raw.length - 1,
              Be = le + 1,
              Te = z.more || z.cut;
            if (z.cut)
              Ae += `

(Output capped at ${ae / 1024} KB. Showing lines ${z.offset}-${le}. Use offset=${Be} to continue.)`;
            else if (z.more)
              Ae += `

(Showing lines ${z.offset}-${le} of ${z.count}. Use offset=${Be} to continue.)`;
            else
              Ae += `

(End of file - total ${z.count} lines)`;
            if (
              ((Ae += `
</content>`),
              yield* u(T),
              B.length > 0)
            )
              Ae += `

<system-reminder>
${B.map((Lt) => Lt.content).join(`

`)}
</system-reminder>`;
            return {
              title: C,
              output: Ae,
              metadata: {
                preview: z.raw.slice(0, 20).join(`
`),
                truncated: Te,
                loaded: B.map((Lt) => Lt.filepath),
                display: {
                  type: "file",
                  path: T,
                  text: z.raw.join(`
`),
                  lineStart: z.offset,
                  lineEnd: le,
                  totalLines: z.count,
                  truncated: Te,
                },
              },
            };
          });
        return { description: Y5i, parameters: vXa, execute: (I, D) => L(I, D).pipe(on) };
      }),
    )));
});