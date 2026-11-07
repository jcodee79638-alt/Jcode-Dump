
async function Fen(e, t, r, s, a = Date.now, H) {
  let u = crypto.randomUUID();
  (t.set("X-Jac-Request", u), t.set("X-Jac-Recovery-Version", "2"));
  let f = H?.values().next().value;
  if (f) (H?.delete(f), t.set("X-Jac-Previous-Request", f));
  let d = (ye) => {
      if (!H) return;
      if (H.size >= 16) H.delete(H.values().next().value);
      H.add(ye);
    },
    _ = new AbortController(),
    L = AbortSignal.any([e.signal, _.signal]),
    I,
    D = 0,
    S,
    T = 0,
    C = 0,
    O = 0,
    B = () => Error(cQ),
    V = () => {
      if (L.aborted) throw new DOMException("The request was cancelled.", "AbortError");
    },
    q = async () => {
      (V(),
        await new Promise((ye, ot) => {
          let Ee = () => {
              (clearTimeout(Ve), ot(new DOMException("The request was cancelled.", "AbortError")));
            },
            Ve = setTimeout(() => {
              (L.removeEventListener("abort", Ee), ye());
            }, 1000);
          L.addEventListener("abort", Ee, { once: !0 });
        }));
    },
    Z = async () => {
      S ??= a() + 90000;
      while (!0) {
        if ((V(), ++T > 100 || a() >= S)) throw B();
        let ye = new Headers({
          Authorization: `Bearer ${await s()}`,
          "X-Jac-Version": t.get("X-Jac-Version") ?? "",
        });
        V();
        let ot = await r(`${new URL(e.url).origin}/v1/responses/${u}?after=${D}`, {
          method: "GET",
          headers: ye,
          redirect: "error",
          signal: AbortSignal.any([L, AbortSignal.timeout(Math.max(1, Math.min(1e4, S - a())))]),
        }).catch(() => {
          return;
        });
        if ((V(), ot?.ok)) {
          let Ee = ot.headers.get("X-Jac-Recovery-State");
          if (!Ee || !["live", "complete", "unknown"].includes(Ee)) throw (await ot.body?.cancel(), B());
          let Ve = ot.headers.get("X-Jac-Recovery-Verified") ?? "";
          if (
            Ee === "live" &&
            ot.headers.get("X-Jac-Recovery-Version") === "2" &&
            /^[1-9][0-9]{0,15}$/.test(Ve) &&
            Number.isSafeInteger(Number(Ve)) &&
            Number(Ve) > O
          )
            ((O = Number(Ve)), (S = void 0), (T = 0));
          return ot;
        }
        if (ot && ![404, 429, 503].includes(ot.status)) throw (await ot.body?.cancel(), B());
        (await ot?.body?.cancel(), await q());
      }
    },
    se = await r(e, { headers: t, redirect: "error", signal: L }).catch(() => {
      return;
    });
  if (f && se?.headers.get("X-Jac-Recovery-Ack") !== f) d(f);
  let ae = se && (await s8s(se, L));
  if (ae || L.aborted) se?.body?.cancel().catch(() => {});
  V();
  let z = se && !ae ? se : await Z();
  if (!z.ok) return z;
  let Ae = z.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  if (Ae !== "text/event-stream" && Ae !== "application/json") return z;
  let le = z,
    Be = z.headers.has("X-Jac-Recovery-State"),
    Te = async () => {
      V();
      let ye = await I.read();
      if ((V(), !ye.done)) {
        if (((C += ye.value.byteLength), C > jJt.wire + 2097152)) throw B();
      }
      return ye;
    };
  if (Ae === "application/json")
    while (!0) {
      let ye = [];
      I = le.body?.getReader();
      try {
        if (!I) throw B();
        while (!0) {
          let Ee = await Te();
          if (Ee.done) break;
          ye.push(Ee.value);
        }
        if (!ye.length && le.headers.get("X-Jac-Recovery-State") === "live") {
          (I.releaseLock(), await q(), (le = await Z()));
          continue;
        }
        if (!ye.length && le.headers.has("X-Jac-Recovery-State")) throw B();
        let ot = Buffer.concat(ye);
        return (
          JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(ot)),
          I.releaseLock(),
          d(u),
          new Response(ot, { status: le.status, headers: le.headers })
        );
      } catch {
        if (
          (V(),
          await I?.cancel().catch(() => {}),
          I?.releaseLock(),
          (le = await Z()),
          !le.headers.get("content-type")?.startsWith("application/json"))
        )
          throw (await le.body?.cancel(), B());
      }
    }
  let Lt = "",
    Ht = new TextDecoder("utf-8", { fatal: !0 }),
    Se = !1,
    _e = !1;
  I = le.body?.getReader();
  let we = () => {
    I?.cancel().catch(() => {});
  };
  L.addEventListener("abort", we, { once: !0 });
  let Pe = async () => {
    if (
      (await I?.cancel().catch(() => {}),
      I?.releaseLock(),
      (le = await Z()),
      !le.headers.get("content-type")?.startsWith("text/event-stream"))
    )
      throw (await le.body?.cancel(), B());
    if (
      ((Be = !0), (Lt = ""), (Ht = new TextDecoder("utf-8", { fatal: !0 })), (I = le.body?.getReader()), !I)
    )
      throw B();
  };
  return new Response(
    new ReadableStream(
      {
        async pull(ye) {
          try {
            while (!0) {
              V();
              let ot = /\r\n\r\n|\n\n|\r\r/.exec(Lt);
              if (ot) {
                let Fe = Lt.slice(0, ot.index + ot[0].length);
                if (((Lt = Lt.slice(Fe.length)), new TextEncoder().encode(Fe).byteLength > Nen)) throw B();
                let it = Fe.split(/\r\n|\n|\r/),
                  At = it
                    .filter((Et) => Et === "data" || Et.startsWith("data:"))
                    .map((Et) => Et.slice(5).replace(/^ /, "")).join(`
`);
                if (!At) continue;
                let et = it.filter((Et) => Et.startsWith("id:"));
                if (et.length > 1 || (et.length && !/^id: [1-9][0-9]{0,15}$/.test(et[0]))) throw B();
                let ut = et.length ? Number(et[0].slice(4)) : void 0;
                if ((Be && ut === void 0) || (ut !== void 0 && !Number.isSafeInteger(ut))) throw B();
                if (ut !== void 0 && ut <= D) {
                  if (Be) continue;
                  throw B();
                }
                if (ut !== void 0 && ut !== D + 1) throw B();
                if (At === "[DONE]") Se = !0;
                let ht = !1;
                if (At !== "[DONE]") {
                  let Et = JSON.parse(At);
                  if (Et && typeof Et === "object" && "error" in Et)
                    ((Se = !0),
                      (ht =
                        !!Et.error &&
                        typeof Et.error === "object" &&
                        "message" in Et.error &&
                        !!DAt(Et.error.message)));
                }
                if ((ye.enqueue(new TextEncoder().encode(Fe)), ht)) d(u);
                if (ut !== void 0) ((D = ut), (S = void 0), (T = 0));
                return;
              }
              if (new TextEncoder().encode(Lt).byteLength > Nen) throw B();
              if (!I) throw B();
              let Ee = await Te().catch(async () => {
                (V(), await Pe());
                return;
              });
              if (!Ee) continue;
              try {
                Lt += Ee.done ? Ht.decode() : Ht.decode(Ee.value, { stream: !0 });
              } catch {
                if (Be) throw B();
                await Pe();
                continue;
              }
              if (!Ee.done) continue;
              if (Se && !Lt.trim()) {
                ((_e = !0), d(u), L.removeEventListener("abort", we), I.releaseLock(), ye.close());
                return;
              }
              let Ve = le.headers.get("X-Jac-Recovery-State");
              if (Be && Ve !== "live") throw B();
              if (Be) await q();
              await Pe();
            }
          } catch {
            (L.removeEventListener("abort", we),
              await I?.cancel().catch(() => {}),
              ye.error(L.aborted ? new DOMException("The request was cancelled.", "AbortError") : B()));
          }
        },
        async cancel() {
          if (_e) return;
          (_.abort(), L.removeEventListener("abort", we), await I?.cancel().catch(() => {}));
        },
      },
      { highWaterMark: 1 },
    ),
    { status: z.status, headers: z.headers },
  );
}