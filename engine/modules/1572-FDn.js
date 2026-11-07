
var FDn,
  Ose = (e) => (e instanceof globalThis.Error ? e : new globalThis.Error(String(e))),
  bQs = (e) => {
    switch (e.code) {
      case "ENOENT":
        return "NotFound";
      case "EACCES":
        return "PermissionDenied";
      case "EEXIST":
        return "AlreadyExists";
      case "EISDIR":
        return "BadResource";
      case "ENOTDIR":
        return "BadResource";
      case "EBUSY":
        return "Busy";
      case "ELOOP":
        return "BadResource";
      default:
        return "Unknown";
    }
  },
  BDn = (e) => {
    let t = [],
      r = [],
      s = (u) => {
        switch (u._tag) {
          case "StandardCommand":
            t.push(u);
            return;
          case "PipedCommand":
            (s(u.left), r.push(u.options), s(u.right));
            return;
        }
      };
    if ((s(e), t.length === 0)) throw Error("flatten produced empty commands array");
    let [a, ...H] = t;
    return { commands: [a, ...H], opts: r };
  },
  WG = (e, t, r) => {
    let s = BDn(r)
      .commands.map((a) => `${a.command} ${a.args.join(" ")}`)
      .join(" | ");
    return YC({
      _tag: bQs(t),
      module: "ChildProcess",
      method: e,
      pathOrDescriptor: s,
      syscall: t.syscall,
      cause: t,
    });
  },
  jQs,
  PQs,
  qMe;