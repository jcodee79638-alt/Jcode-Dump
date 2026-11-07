
var lVi = () => typeof window < "u" && typeof window.document < "u" && typeof navigator < "u",
  RRa = () => {
    let e = BRa();
    if (e === "deno")
      return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": Lce,
        "X-Stainless-OS": AVi(Deno.build.os),
        "X-Stainless-Arch": cVi(Deno.build.arch),
        "X-Stainless-Runtime": "deno",
        "X-Stainless-Runtime-Version":
          typeof Deno.version === "string" ? Deno.version : (Deno.version?.deno ?? "unknown"),
      };
    if (typeof EdgeRuntime < "u")
      return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": Lce,
        "X-Stainless-OS": "Unknown",
        "X-Stainless-Arch": `other:${EdgeRuntime}`,
        "X-Stainless-Runtime": "edge",
        "X-Stainless-Runtime-Version": globalThis.process.version,
      };
    if (e === "node")
      return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": Lce,
        "X-Stainless-OS": AVi(globalThis.process.platform ?? "unknown"),
        "X-Stainless-Arch": cVi(globalThis.process.arch ?? "unknown"),
        "X-Stainless-Runtime": "node",
        "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown",
      };
    let t = WRa();
    if (t)
      return {
        "X-Stainless-Lang": "js",
        "X-Stainless-Package-Version": Lce,
        "X-Stainless-OS": "Unknown",
        "X-Stainless-Arch": "unknown",
        "X-Stainless-Runtime": `browser:${t.browser}`,
        "X-Stainless-Runtime-Version": t.version,
      };
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Lce,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": "unknown",
      "X-Stainless-Runtime-Version": "unknown",
    };
  },
  cVi = (e) => {
    if (e === "x32") return "x32";
    if (e === "x86_64" || e === "x64") return "x64";
    if (e === "arm") return "arm";
    if (e === "aarch64" || e === "arm64") return "arm64";
    if (e) return `other:${e}`;
    return "unknown";
  },
  AVi = (e) => {
    if (((e = e.toLowerCase()), e.includes("ios"))) return "iOS";
    if (e === "android") return "Android";
    if (e === "darwin") return "MacOS";
    if (e === "win32") return "Windows";
    if (e === "freebsd") return "FreeBSD";
    if (e === "openbsd") return "OpenBSD";
    if (e === "linux") return "Linux";
    if (e) return `Other:${e}`;
    return "Unknown";
  },
  uVi,
  fVi = () => uVi ?? (uVi = RRa());