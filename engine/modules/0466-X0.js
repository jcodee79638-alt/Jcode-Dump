
var X0 = (e) => (t) => FQ({ module: "FileSystem", method: e, description: t.message ?? String(t) }),
  DFs,
  yFs,
  MFs,
  xFs,
  SFs,
  TFs,
  vFs,
  KYt = (e) => {
    let t = yE(xu.mkdtemp, RL("FileSystem", e), X0(e));
    return (r) =>
      yH(() => {
        let s = r?.prefix ?? "",
          a = typeof r?.directory === "string" ? _1e.join(r.directory, ".") : xcn.tmpdir();
        return t(s ? _1e.join(a, s) : a + "/");
      });
  },
  bFs,
  zYt = (e) => {
    let t = yE(xu.rm, RL("FileSystem", e), X0(e));
    return (r, s) => t(r, { recursive: s?.recursive ?? !1, force: s?.force ?? !1 });
  },
  jFs,
  PFs,
  CFs = (e) => {
    let t = yE(xu.open, RL("FileSystem", e), X0(e)),
      r = yE(xu.close, RL("FileSystem", e), X0(e));
    return (s, a) =>
      Ev(
        Bd(t(s, a?.flag ?? "r", a?.mode), (H) => on(r(H))),
        Vn((H) => kFs(ycn(H), a?.flag?.startsWith("a") ?? !1)),
      );
  },
  wFs,
  kFs,
  Scn = (e) => {
    let t = KYt(e);
    return ni(function* (r) {
      let s = yield* t(r),
        a = Mcn.randomBytes(6).toString("hex"),
        H = _1e.join(s, r?.suffix ? `${a}${r.suffix}` : a);
      return (yield* vcn(H, new Uint8Array(0)), H);
    });
  },
  OFs,
  UFs,
  NFs = (e, t) =>
    bl({ try: () => xu.promises.readdir(e, t), catch: (r) => RL("FileSystem", "readDirectory")(r, [e]) }),
  FFs = (e) =>
    Fd((t, r) => {
      try {
        xu.readFile(e, { signal: r }, (s, a) => {
          if (s) t(bn(RL("FileSystem", "readFile")(s, [e])));
          else t(Jt(a));
        });
      } catch (s) {
        t(bn(X0("readFile")(s)));
      }
    }),
  BFs,
  RFs,
  WFs,
  Tcn = (e) => ({
    type: e.isFile()
      ? "File"
      : e.isDirectory()
        ? "Directory"
        : e.isSymbolicLink()
          ? "SymbolicLink"
          : e.isBlockDevice()
            ? "BlockDevice"
            : e.isCharacterDevice()
              ? "CharacterDevice"
              : e.isFIFO()
                ? "FIFO"
                : e.isSocket()
                  ? "Socket"
                  : "Unknown",
    mtime: Sv(e.mtime),
    atime: Sv(e.atime),
    birthtime: Sv(e.birthtime),
    dev: e.dev,
    rdev: Sv(e.rdev),
    ino: Sv(e.ino),
    mode: e.mode,
    nlink: Sv(e.nlink),
    uid: Sv(e.uid),
    gid: Sv(e.gid),
    size: NU(e.size),
    blksize: e.blksize !== void 0 ? Lo(NU(e.blksize)) : eH(),
    blocks: Sv(e.blocks),
  }),
  QYt,
  VFs,
  qFs,
  GFs,
  XFs = (e) =>
    l1e((t) =>
      Bd(
        jn(() => {
          let r = xu.watch(e, { recursive: !0 }, (s, a) => {
            if (!a) return;
            switch (s) {
              case "rename": {
                KC(
                  EQt(QYt(a), {
                    onSuccess: (H) => kW(t, { _tag: "Create", path: a }),
                    onFailure: (H) => kW(t, { _tag: "Remove", path: a }),
                  }),
                );
                return;
              }
              case "change": {
                JM(t, { _tag: "Update", path: a });
                return;
              }
            }
          });
          return (
            r.on("error", (s) => {
              OW(
                t,
                fie(
                  YC({
                    module: "FileSystem",
                    _tag: "Unknown",
                    method: "watch",
                    pathOrDescriptor: e,
                    cause: s,
                  }),
                ),
              );
            }),
            r.on("close", () => {
              i1e(t);
            }),
            r
          );
        }),
        (r) => jn(() => r.close()),
      ),
    ),
  JFs = (e, t) =>
    QYt(t).pipe(
      Vn((r) =>
        e.pipe(
          f2e((s) => s.register(t, r)),
          uD(() => XFs(t)),
        ),
      ),
      hh,
    ),
  vcn = (e, t, r) =>
    Fd((s, a) => {
      try {
        xu.writeFile(e, t, { signal: a, flag: r?.flag, mode: r?.mode }, (H) => {
          if (H) s(bn(RL("FileSystem", "writeFile")(H, [e])));
          else s(ti);
        });
      } catch (H) {
        s(bn(X0("writeFile")(H)));
      }
    }),
  KFs,
  bcn;