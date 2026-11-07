
function vaH(e, t = zne) {
  return async (r) => {
    let s = jZr(r),
      a = await t(O0 + (s.confirm ? "/api/native/keys/redeem" : "/api/native/keys/preview"), {
        method: "POST",
        headers: {
          authorization: `Bearer ${await e()}`,
          "X-Jac-Version": h_,
          "content-type": "application/json",
        },
        body: JSON.stringify(s),
        redirect: "error",
        signal: AbortSignal.timeout(20000),
      }).catch(() => {
        throw Error("Jac Code could not reach the key service. Check your connection and try again.");
      });
    if (a.status === 401 || a.status === 426)
      throw (await a.body?.cancel(), new Sc(a.status === 401 ? "signin" : "update"));
    if (!a.ok) {
      let H = await a.json().catch(() => null),
        u = H && typeof H === "object" && "error" in H ? H.error : void 0,
        f = u && typeof u === "object" && "code" in u ? String(u.code) : "",
        d = {
          key_unavailable: "This key is invalid, expired, used or revoked.",
          key_plan_conflict: "This key cannot replace your current plan.",
          key_plan_changed: "Your plan changed. Check the key again before activating it.",
        };
      throw new NFe(
        "Jac Code: " +
          (a.status === 429
            ? "Too many key attempts. Wait a few minutes and try again."
            : d[f] || "Could not activate this key. Check it again or contact Jac."),
      );
    }
    return PZr(await a.json());
  };
}