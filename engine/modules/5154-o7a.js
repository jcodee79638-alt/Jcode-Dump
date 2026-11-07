
function o7a(e, t) {
  if (t === QL) {
    if (c7a(e)) {
      let a = A4i(e);
      return { message: a === void 0 ? "Waiting for an available slot" : `Position ${a} in queue` };
    }
    return z6.isInstance(e) &&
      e.data.statusCode === 503 &&
      e.data.message === yAt &&
      e.data.responseHeaders?.[wFe] === kFe
      ? { message: IJt }
      : void 0;
  }
  if (yxe.isInstance(e)) return;
  if (z6.isInstance(e)) {
    let a = e.data.statusCode;
    if (
      !e.data.isRetryable &&
      !(a !== void 0 && a >= 500) &&
      !vbr(e.data.message) &&
      !vbr(e.data.responseBody)
    )
      return;
    if (e.data.responseBody?.includes("FreeUsageLimitError"))
      return {
        message: JVa,
        action: {
          reason: "free_tier_limit",
          provider: t,
          title: "Free limit reached",
          message:
            "Subscribe to OpenCode Go for reliable access to the best open-source models for $10/month.",
          label: "subscribe",
          link: KVa,
        },
      };
    if (e.data.responseBody?.includes("GoUsageLimitError")) {
      let H = H7a(e.data.responseBody),
        u = bbr(H?.metadata?.workspace),
        f = bbr(H?.metadata?.limitName),
        d = a7a(e.data.responseHeaders?.["retry-after"]),
        _ = Fhe(() => {
          if (d === void 0) return "";
          let D = Math.max(0, Math.ceil(d)),
            S = Math.floor(D / 86400),
            T = Math.floor((D % 86400) / 3600),
            C = Math.ceil((D % 3600) / 60),
            O = (B, V) => `${B} ${V}${B === 1 ? "" : "s"}`;
          if (S > 0) return T > 0 ? `${O(S, "day")} ${O(T, "hour")}` : O(S, "day");
          if (T > 0) return C > 0 ? `${O(T, "hour")} ${O(C, "minute")}` : O(T, "hour");
          return C > 0 ? O(C, "minute") : "less than a minute";
        }),
        L = `${f ? `${f} usage limit` : "Usage limit"} reached. It will reset in ${_}. To continue using this model now, enable usage from your available balance`,
        I = `https://opencode.ai/workspace/${u}/go`;
      return {
        message: `${L} - ${I}`,
        action: {
          reason: "account_rate_limit",
          provider: t,
          title: "Go limit reached",
          message: L,
          label: "open settings",
          link: I,
        },
      };
    }
    return { message: e.data.message.includes("Overloaded") ? "Provider is overloaded" : e.data.message };
  }
  let r = ux(e.data) ? e.data.message : void 0;
  if (typeof r !== "string") return;
  let s = r.toLowerCase();
  if (s.includes("too_many_requests")) return { message: "Too Many Requests" };
  if (s.includes("exhausted") || s.includes("unavailable")) return { message: "Provider is overloaded" };
  if (vbr(r)) return { message: r };
  return;
}