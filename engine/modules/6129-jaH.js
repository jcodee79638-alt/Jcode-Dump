
function jaH(e, t = fetch) {
  let r = async (s, a = "ack") => {
    try {
      if (s !== void 0 && (!s || s.length > 200 || /[\u0000-\u001f\u007f-\u009f]/.test(s)))
        throw new Sc("unavailable");
      let H = await t(
        O0 + "/api/native/announcements" + (s === void 0 ? "" : `/${encodeURIComponent(s)}/${a}`),
        {
          method: s === void 0 ? "GET" : "POST",
          headers: {
            authorization: `Bearer ${await e()}`,
            "X-Jac-Version": h_,
            ...(s === void 0 ? {} : { "content-type": "application/json" }),
          },
          ...(s === void 0 ? {} : { body: "{}" }),
          redirect: "error",
          signal: AbortSignal.timeout(20000),
        },
      );
      if (!H.ok)
        throw (
          await H.body?.cancel(),
          new Sc(
            H.status === 426 ? "update" : H.status === 401 || H.status === 403 ? "signin" : "unavailable",
          )
        );
      let u = await H.json();
      if (!u || typeof u !== "object" || Array.isArray(u)) throw new Sc("unavailable");
      return u;
    } catch (H) {
      if (H instanceof Sc) throw H;
      throw new Sc("unavailable");
    }
  };
  return {
    async get() {
      let s = await r();
      if (!Array.isArray(s.announcements) || s.announcements.length > 10) throw new Sc("unavailable");
      let a = s.announcements.map(qwr);
      if (new Set(a.map((H) => H.id)).size !== a.length) throw new Sc("unavailable");
      return a;
    },
    async ack(s) {
      if ((await r(s)).ok !== !0) throw new Sc("unavailable");
    },
    async seen(s) {
      if ((await r(s, "seen")).ok !== !0) throw new Sc("unavailable");
    },
  };
}