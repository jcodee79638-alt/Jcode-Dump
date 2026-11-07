
function d8s(e) {
  let t = e.now ?? Date.now,
    r = e.fetcher ?? zne,
    s = null,
    a,
    H = (f) => f && !f.refreshing && f.expiresAt > t() + 30000 && f.expiresAt <= t() + 300000,
    u = () => {
      if (H(s)) return Promise.resolve(s.accessToken);
      if (a) return a;
      return (
        (a = e.store
          .withLock(async (f) => {
            let d = f.current;
            if (!d || d.refreshing) {
              if (d) await f.save(null);
              throw new Sc();
            }
            if (H(d)) return ((s = d), d.accessToken);
            await f.save({ ...d, refreshing: !0 });
            try {
              let _ = await u8s(
                r,
                { grant_type: "refresh_token", client_id: "jaccode-windows", refresh_token: d.refreshToken },
                void 0,
                t,
              );
              return (await f.save(_), (s = _), _.accessToken);
            } catch (_) {
              throw ((s = null), await f.save(_ instanceof Sc && _.kind === "update" ? d : null), _);
            }
          })
          .finally(() => {
            a = void 0;
          })),
        a
      );
    };
  return {
    getAccessToken: u,
    async register(f) {
      try {
        (await f8s(f.email, f.password, r), await this.login(f));
      } finally {
        f.password = "";
      }
    },
    async login(f) {
      let d = await (f ? Wen({ fetcher: r, prompt: async () => f, now: t }) : (e.signIn ?? Wen)()).catch(
        async (_) => {
          if (_ instanceof BFe) ((s = null), await e.store.withLock((L) => L.save(null)));
          throw _;
        },
      );
      await e.store.withLock(async (_) => {
        (await _.save(d), (s = d));
      });
    },
    async ensureSignedIn() {
      try {
        await u();
      } catch (f) {
        if (!(f instanceof Sc) || f.kind !== "signin") throw f;
        await this.login();
      }
    },
    async logout() {
      ((s = null),
        await e.store.withLock(async (f) => {
          try {
            if (f.current && !f.current.refreshing)
              await (
                await r(`${O0}/api/oauth/revoke`, {
                  method: "POST",
                  headers: { "content-type": "application/json", "X-Jac-Version": h_ },
                  body: JSON.stringify({
                    client_id: "jaccode-windows",
                    refresh_token: f.current.refreshToken,
                  }),
                  redirect: "error",
                  signal: AbortSignal.timeout(20000),
                })
              ).body?.cancel();
          } catch {
          } finally {
            await f.save(null);
          }
        }),
        (s = null));
    },
  };
}