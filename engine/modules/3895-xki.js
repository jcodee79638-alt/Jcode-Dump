
function xki(e) {
  return JSON.parse(
    JSON.stringify(
      { ...e, models: Object.fromEntries(Object.entries(e.models).filter(([, t]) => Jie(Dki)(t))) },
      (t, r) => {
        if (typeof r === "function" || typeof r === "symbol" || r === void 0) return;
        if (typeof r === "bigint") return r.toString();
        return r;
      },
    ),
  );
}