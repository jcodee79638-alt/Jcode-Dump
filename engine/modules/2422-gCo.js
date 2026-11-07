
function gCo() {
  let e = process.env.OTEL_RESOURCE_ATTRIBUTES;
  if (!e) return {};
  try {
    return Object.fromEntries(
      e.split(",").map((t) => {
        let r = t.indexOf("=");
        if (r < 1) throw Error("Invalid OTEL_RESOURCE_ATTRIBUTES entry");
        return [decodeURIComponent(t.slice(0, r)), decodeURIComponent(t.slice(r + 1))];
      }),
    );
  } catch {
    return {};
  }
}