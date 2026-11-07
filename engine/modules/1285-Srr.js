
var Srr = ne(() => {
  Ide();
  Gt();
  ((O) => {
    let e;
    function t(B) {
      e = B;
    }
    O.setGlobal = t;
    let r = () => {
        if (!e) throw Error("Flock global not set");
        return Mmt.join(e.state, "locks");
      },
      s = { staleMs: 60000, timeoutMs: 300000, baseDelayMs: 100, maxDelayMs: 2000 };
    function a(B) {
      if (typeof B !== "object" || B === null || !("code" in B)) return;
      let V = B.code;
      if (typeof V !== "string") return;
      return V;
    }
    function H(B, V) {
      return new Promise((q, Z) => {
        if (V?.aborted) {
          Z(V.reason ?? Error("Aborted"));
          return;
        }
        let se,
          ae = () => {
            (V?.removeEventListener("abort", z), q());
          },
          z = () => {
            if (se) clearTimeout(se);
            (V?.removeEventListener("abort", z), Z(V?.reason ?? Error("Aborted")));
          };
        (V?.addEventListener("abort", z, { once: !0 }), (se = setTimeout(ae, B)));
      });
    }
    function u(B) {
      let V = Math.floor(B * 0.3),
        q = Math.floor(Math.random() * (2 * V + 1)) - V;
      return Math.max(0, B + q);
    }
    function f() {
      return performance.now();
    }
    function d() {
      return performance.timeOrigin + f();
    }
    async function _(B) {
      try {
        return await eGs(B);
      } catch (V) {
        let q = a(V);
        if (q === "ENOENT" || q === "ENOTDIR") return;
        throw V;
      }
    }
    async function L(B, V, q, Z) {
      let se = d(),
        ae = await _(V);
      if (ae) return se - ae.mtimeMs > Z;
      let z = await _(q);
      if (z) return se - z.mtimeMs > Z;
      let Ae = await _(B);
      if (!Ae) return !1;
      return se - Ae.mtimeMs > Z;
    }
    async function I(B, V) {
      let q = Yqs?.() ?? Qqs(16).toString("hex"),
        Z = Mmt.join(B, "meta.json"),
        se = Mmt.join(B, "heartbeat");
      try {
        await xmt(B, { mode: 448 });
      } catch (Be) {
        if (a(Be) !== "EEXIST") throw Be;
        if (!(await L(B, se, Z, V.staleMs))) return { acquired: !1 };
        let Te = B + ".breaker";
        try {
          await xmt(Te, { mode: 448 });
        } catch (Lt) {
          let Ht = a(Lt);
          if (Ht === "EEXIST") {
            let Se = await _(Te);
            if (Se && d() - Se.mtimeMs > V.staleMs)
              await mMe(Te, { recursive: !0, force: !0 }).catch(() => {
                return;
              });
            return { acquired: !1 };
          }
          if (Ht === "ENOENT" || Ht === "ENOTDIR") return { acquired: !1 };
          throw Lt;
        }
        try {
          if (!(await L(B, se, Z, V.staleMs))) return { acquired: !1 };
          await mMe(B, { recursive: !0, force: !0 });
          try {
            await xmt(B, { mode: 448 });
          } catch (Lt) {
            let Ht = a(Lt);
            if (Ht === "EEXIST" || Ht === "ENOTEMPTY") return { acquired: !1 };
            throw Lt;
          }
        } finally {
          await mMe(Te, { recursive: !0, force: !0 }).catch(() => {
            return;
          });
        }
      }
      let ae = { token: q, pid: process.pid, hostname: zqs.hostname(), createdAt: new Date().toISOString() };
      (await BLn(se, "", { flag: "wx" }).catch(async () => {
        throw (
          await mMe(B, { recursive: !0, force: !0 }),
          Error("Lock acquired but heartbeat already existed (possible compromise).")
        );
      }),
        await BLn(Z, JSON.stringify(ae, null, 2), { flag: "wx" }).catch(async () => {
          throw (
            await mMe(B, { recursive: !0, force: !0 }),
            Error("Lock acquired but meta.json already existed (possible compromise).")
          );
        }));
      let z;
      return {
        acquired: !0,
        startHeartbeat: (Be = Math.max(100, Math.floor(V.staleMs / 3))) => {
          if (z) return;
          ((z = setInterval(() => {
            let Te = new Date();
            tGs(se, Te, Te).catch(() => {
              return;
            });
          }, Be)),
            z.unref?.());
        },
        release: async () => {
          if (z) (clearInterval(z), (z = void 0));
          if (
            (
              await Zqs(Z, "utf8")
                .then((Te) => {
                  let Lt = JSON.parse(Te);
                  if (!Lt || typeof Lt !== "object") return {};
                  return { token: "token" in Lt && typeof Lt.token === "string" ? Lt.token : void 0 };
                })
                .catch((Te) => {
                  let Lt = a(Te);
                  if (Lt === "ENOENT" || Lt === "ENOTDIR")
                    throw Error("Refusing to release: lock is compromised (metadata missing).");
                  if (Te instanceof SyntaxError)
                    throw Error("Refusing to release: lock is compromised (metadata invalid).");
                  throw Te;
                })
            ).token !== q
          )
            throw Error("Refusing to release: lock token mismatch (not the owner).");
          await mMe(B, { recursive: !0, force: !0 });
        },
      };
    }
    async function D(B, V, q) {
      let Z = f() + q.timeoutMs,
        se = 0,
        ae = 0,
        z = q.baseDelayMs;
      while (!0) {
        V.signal?.throwIfAborted();
        let Ae = await I(B, q);
        if (Ae.acquired) return Ae;
        if (f() > Z) throw Error(`Timed out waiting for lock: ${V.key}`);
        se += 1;
        let le = u(z);
        (await V.onWait?.({ key: V.key, attempt: se, delay: le, waited: ae }),
          await H(le, V.signal),
          (ae += le),
          (z = Math.min(q.maxDelayMs, Math.floor(z * 1.7))));
      }
    }
    async function S(B, V = {}) {
      V.signal?.throwIfAborted();
      let q = {
          staleMs: V.staleMs ?? s.staleMs,
          timeoutMs: V.timeoutMs ?? s.timeoutMs,
          baseDelayMs: V.baseDelayMs ?? s.baseDelayMs,
          maxDelayMs: V.maxDelayMs ?? s.maxDelayMs,
        },
        Z = V.dir ?? r();
      await xmt(Z, { recursive: !0 });
      let se = Mmt.join(Z, qU.fast(B) + ".lock"),
        ae = await D(se, { key: B, onWait: V.onWait, signal: V.signal }, q);
      ae.startHeartbeat();
      let z = () => ae.release();
      return {
        release: z,
        [Symbol.asyncDispose]() {
          return z();
        },
      };
    }
    O.acquire = S;
    async function T(B, V, q = {}) {
      await using Z = await S(B, q);
      return (q.signal?.throwIfAborted(), await V());
    }
    ((O.withLock = T),
      (O.effect = Ge("Flock.effect")(function* (B, V = {}) {
        return yield* Bd(
          nA((q) => Dde.acquire(B, { ...V, signal: q })).pipe(
            gI("Flock.acquire", { attributes: { key: B } }),
          ),
          (q) => nA(() => q.release()).pipe(gI("Flock.release")),
        ).pipe(Qf);
      })));
  })((Dde ||= {}));
});