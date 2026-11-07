
function kaH(e, t = zne) {
  let r = async (s, a = !1, H = !0) => {
    try {
      let u = await t(O0 + s, {
        method: a ? "POST" : "GET",
        headers: {
          authorization: `Bearer ${await e()}`,
          "X-Jac-Version": h_,
          ...(!H ? { "X-Jac-Announcements": "omit" } : {}),
          ...(a ? { "content-type": "application/json" } : {}),
        },
        ...(a ? { body: JSON.stringify({ confirm: !0 }) } : {}),
        redirect: "error",
        signal: AbortSignal.timeout(20000),
      });
      if (!u.ok)
        throw (
          await u.body?.cancel(),
          new Sc(
            u.status === 426
              ? "update"
              : u.status === 401 || u.status === 403
                ? "signin"
                : a && u.status === 409
                  ? "reset"
                  : "unavailable",
          )
        );
      return mAe(await u.json());
    } catch (u) {
      if (u instanceof Sc) throw u;
      throw new Sc("unavailable");
    }
  };
  return {
    async get(s = {}) {
      let a = await r("/api/native/account", !1, s.announcements !== !1),
        H = mAe(a.user);
      if (
        typeof H.id !== "string" ||
        typeof H.username !== "string" ||
        typeof H.status !== "string" ||
        typeof H.role !== "string" ||
        typeof a.globalPaused !== "boolean" ||
        (H.email !== void 0 && H.email !== null && typeof H.email !== "string")
      )
        throw new Sc("unavailable");
      if (a.announcements !== void 0 && (!Array.isArray(a.announcements) || a.announcements.length > 10))
        throw new Sc("unavailable");
      let u = Array.isArray(a.announcements) ? a.announcements.map(qwr) : void 0;
      if (u && new Set(u.map((d) => d.id)).size !== u.length) throw new Sc("unavailable");
      let f = a.admission === void 0 ? void 0 : mAe(a.admission);
      if (
        f &&
        (typeof f.allowed !== "boolean" ||
          typeof f.code !== "string" ||
          (f.code !== "ready" && !PFe(f.code)) ||
          f.allowed !== (f.code === "ready") ||
          (f.retryAfter !== void 0 && (!Number.isSafeInteger(f.retryAfter) || Number(f.retryAfter) < 0)))
      )
        throw new Sc("unavailable");
      return {
        user: {
          id: H.id,
          username: H.username,
          ...(typeof H.email === "string" ? { email: H.email } : {}),
          status: H.status,
          role: H.role,
        },
        subscription: Xis(a.subscription),
        globalPaused: a.globalPaused,
        ...(u ? { announcements: u } : {}),
        ...(f
          ? {
              admission: {
                allowed: Boolean(f.allowed),
                code: f.code,
                ...(f.retryAfter !== void 0 ? { retryAfter: Number(f.retryAfter) } : {}),
              },
            }
          : {}),
      };
    },
    async reset(s) {
      if (!s) throw new Sc("cancelled");
      return Xis((await r("/api/native/reset", !0)).subscription);
    },
  };
}