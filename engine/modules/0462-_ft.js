
var _ft = "~effect/platform/FileSystem",
  NU = (e) => (typeof e === "bigint" ? e : BigInt(e)),
  YBe,
  VmH,
  g1,
  Icn = (e) =>
    g1.of({
      ...e,
      [_ft]: _ft,
      exists: (t) =>
        Ev(
          e.access(t),
          eu(!0),
          EA("PlatformError", (r) => (r.reason._tag === "NotFound" ? Jt(!1) : bn(r))),
        ),
      readFileString: (t, r) =>
        Hi(e.readFile(t), (s) =>
          ZA({
            try: () => new TextDecoder(r).decode(s),
            catch: (a) =>
              FQ({
                module: "FileSystem",
                method: "readFileString",
                description: "invalid encoding",
                cause: a,
              }),
          }),
        ),
      stream: ni(function* (t, r) {
        let s = yield* e.open(t, { flag: "r" });
        if (r?.offset) yield* s.seek(r.offset, "start");
        let a = r?.bytesToRead !== void 0 ? NU(r.bytesToRead) : void 0,
          H = BigInt(0),
          u = NU(r?.chunkSize ?? 65536),
          f = s.readAlloc(u);
        return BYt(
          Jt(
            Hi(
              yH(() => {
                if (a !== void 0 && a <= H) return Xp();
                return a !== void 0 && a - H < u ? s.readAlloc(a - H) : f;
              }),
              xv({ onNone: () => Xp(), onSome: (d) => ((H += BigInt(d.length)), Jt(vS(d))) }),
            ),
          ),
        );
      }, hh),
      sink: (t, r) =>
        Ev(
          e.open(t, { flag: "w", ...r }),
          Vn((s) => ZHn((a) => s.writeAll(a))),
          ecn,
        ),
      writeFileString: (t, r, s) =>
        Hi(
          ZA({
            try: () => new TextEncoder().encode(r),
            catch: (a) =>
              FQ({
                module: "FileSystem",
                method: "writeFileString",
                description: "could not encode string",
                cause: a,
              }),
          }),
          (a) => e.writeFile(t, a, s),
        ),
    }),
  mD = (e, t) =>
    YC({
      module: "FileSystem",
      method: e,
      _tag: "NotFound",
      description: "No such file or directory",
      pathOrDescriptor: t,
    }),
  IFs = (e) =>
    g1.of({
      [_ft]: _ft,
      access(t) {
        return bn(mD("access", t));
      },
      chmod(t) {
        return bn(mD("chmod", t));
      },
      chown(t) {
        return bn(mD("chown", t));
      },
      copy(t) {
        return bn(mD("copy", t));
      },
      copyFile(t) {
        return bn(mD("copyFile", t));
      },
      exists() {
        return Jt(!1);
      },
      link(t) {
        return bn(mD("link", t));
      },
      makeDirectory() {
        return No("not implemented");
      },
      makeTempDirectory() {
        return No("not implemented");
      },
      makeTempDirectoryScoped() {
        return No("not implemented");
      },
      makeTempFile() {
        return No("not implemented");
      },
      makeTempFileScoped() {
        return No("not implemented");
      },
      open(t) {
        return bn(mD("open", t));
      },
      readDirectory(t) {
        return bn(mD("readDirectory", t));
      },
      readFile(t) {
        return bn(mD("readFile", t));
      },
      readFileString(t) {
        return bn(mD("readFileString", t));
      },
      readLink(t) {
        return bn(mD("readLink", t));
      },
      realPath(t) {
        return bn(mD("realPath", t));
      },
      remove() {
        return ti;
      },
      rename(t) {
        return bn(mD("rename", t));
      },
      sink(t) {
        return YHn(mD("sink", t));
      },
      stat(t) {
        return bn(mD("stat", t));
      },
      stream(t) {
        return NW(mD("stream", t));
      },
      symlink(t) {
        return bn(mD("symlink", t));
      },
      truncate(t) {
        return bn(mD("truncate", t));
      },
      utimes(t) {
        return bn(mD("utimes", t));
      },
      watch(t) {
        return NW(mD("watch", t));
      },
      writeFile(t) {
        return bn(mD("writeFile", t));
      },
      writeFileString(t) {
        return bn(mD("writeFileString", t));
      },
      ...e,
    }),
  Dcn = (e) => bf(g1)(IFs(e)),
  hft = "~effect/platform/FileSystem/File",
  ycn,
  XYt;