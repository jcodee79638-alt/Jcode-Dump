
var wRi = () => {
    if (kRi.platform !== "linux") return !1;
    if (n2a.release().toLowerCase().includes("microsoft")) {
      if (iLe()) return !1;
      return !0;
    }
    try {
      if (KMr.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft")) return !iLe();
    } catch {}
    if (KMr.existsSync("/proc/sys/fs/binfmt_misc/WSLInterop") || KMr.existsSync("/run/WSL")) return !iLe();
    return !1;
  },
  eJ;