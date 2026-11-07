
var SX = ne(async () => {
  au();
  Gt();
  jA();
  o0();
  l8i();
  await Jn([A8i(), f8i(), SX()]);
  ((eva = BKt(7)), (NDr = UDr.join(fje, "*")));
  RN = class RN extends _i()("@opencode/Truncate") {};
  ((rva = Es(
    RN,
    ft(function* () {
      let e = yield* ui.Service,
        t = Ge("Truncate.cleanup")(function* () {
          let H = Date.now() - $E(eva),
            u = yield* e.readDirectory(fje).pipe(
              Vn((f) => f.filter((d) => d.startsWith("tool_"))),
              $s(() => Jt([])),
            );
          for (let f of u) {
            let d = UDr.join(fje, f),
              _ = yield* e.stat(d).pipe($s(() => Jt(void 0))),
              L = _ && OL(_.mtime);
            if (!L || L.getTime() >= H) continue;
            yield* e.remove(d).pipe($s(() => ti));
          }
        }),
        r = Ge("Truncate.write")(function* (H) {
          let u = UDr.join(fje, u8i.ascending());
          return (yield* e.ensureDir(fje).pipe(on), yield* e.writeFileString(u, H).pipe(on), u);
        }),
        s = Ge("Truncate.limits")(function* () {
          let H = yield* x6(Eg);
          if (vl(H)) return { maxLines: p8i, maxBytes: d8i };
          let u = yield* H.value.get().pipe($s(() => Jt(void 0)));
          return { maxLines: u?.tool_output?.max_lines ?? p8i, maxBytes: u?.tool_output?.max_bytes ?? d8i };
        }),
        a = Ge("Truncate.output")(function* (H, u = {}, f) {
          let d = yield* s(),
            _ = u.maxLines ?? d.maxLines,
            L = u.maxBytes ?? d.maxBytes,
            I = u.direction ?? "head",
            D = H.split(`
`),
            S = Buffer.byteLength(H, "utf-8");
          if (D.length <= _ && S <= L) return { content: H, truncated: !1 };
          let T = [],
            C = 0,
            O = 0,
            B = !1;
          if (I === "head")
            for (C = 0; C < D.length && C < _; C++) {
              let z = Buffer.byteLength(D[C], "utf-8") + (C > 0 ? 1 : 0);
              if (O + z > L) {
                B = !0;
                break;
              }
              (T.push(D[C]), (O += z));
            }
          else
            for (C = D.length - 1; C >= 0 && T.length < _; C--) {
              let z = Buffer.byteLength(D[C], "utf-8") + (T.length > 0 ? 1 : 0);
              if (O + z > L) {
                B = !0;
                break;
              }
              (T.unshift(D[C]), (O += z));
            }
          let V = B ? S - O : D.length - T.length,
            q = B ? "bytes" : "lines",
            Z = T.join(`
`),
            se = yield* r(H),
            ae = tva(f)
              ? `The tool call succeeded but the output was truncated. Full output saved to: ${se}
Use the Task tool to have explore agent process this file with Grep and Read (with offset/limit). Do NOT read the full file yourself - delegate to save context.`
              : `The tool call succeeded but the output was truncated. Full output saved to: ${se}
Use Grep to search the full content or Read with offset/limit to view specific sections.`;
          return {
            content:
              I === "head"
                ? `${Z}

...${V} ${q} truncated...

${ae}`
                : `...${V} ${q} truncated...

${ae}

${Z}`,
            truncated: !0,
            outputPath: se,
          };
        });
      return (
        yield* t().pipe(
          jf((H) => cf("truncation cleanup failed", { cause: BC(H) })),
          xie(Die(cut(1))),
          nBe(Hie(1)),
          EI,
        ),
        RN.of({ cleanup: t, write: r, output: a, limits: s })
      );
    }),
  )),
    (K5e = Ll({ service: RN, layer: rva, deps: [ui.node] })));
});
import nva from "path";