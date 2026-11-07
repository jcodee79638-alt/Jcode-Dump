
function E8s(e, t = fetch, r = Date.now) {
  let s,
    a = "";
  return async (H) => {
    let u = r();
    if (H.kind === "heartbeat") {
      if (s !== void 0 && u - s < 60000) return !1;
      s = u;
    }
    if (H.kind === "update") {
      if (
        !["checking", "downloading", "verifying", "ready", "installed", "failed"].includes(H.state) ||
        (H.code !== void 0 && !["network", "verification", "installation", "unknown"].includes(H.code)) ||
        (H.targetVersion !== void 0 && (!$8s.test(H.targetVersion) || H.targetVersion.length > 32))
      )
        return !1;
      let f = `${H.state}:${H.code ?? ""}:${H.targetVersion ?? ""}`;
      if (f === a) return !1;
      a = f;
    }
    try {
      let f = await t(`${O0}/api/native/diagnostics`, {
        method: "POST",
        redirect: "error",
        signal: AbortSignal.timeout(5000),
        headers: {
          authorization: `Bearer ${await e()}`,
          "content-type": "application/json",
          "X-Jac-Version": h_,
        },
        body: JSON.stringify({
          kind: H.kind,
          version: h_,
          ...(H.kind === "update"
            ? {
                state: H.state,
                ...(H.code ? { code: H.code } : {}),
                ...(H.targetVersion ? { targetVersion: H.targetVersion } : {}),
              }
            : {}),
        }),
      });
      return (await f.body?.cancel(), f.ok);
    } catch {
      return !1;
    }
  };
}