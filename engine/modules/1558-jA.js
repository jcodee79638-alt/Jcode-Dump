
var jA = ne(() => {
  Gt();
  $Me();
  YM();
  OH();
  vy();
  sDn = Tl(vgn(), 1);
  ((D) => {
    class e extends ki()("FileSystemError", { method: re, cause: be(yd()) }) {
      get message() {
        let S = this.cause instanceof Error ? this.cause.message : this.cause && String(this.cause);
        return `Filesystem operation failed: ${this.method}${S ? `: ${S}` : ""}`;
      }
    }
    D.FileSystemError = e;
    class t extends _i()("@opencode/FileSystem") {}
    ((D.Service = t), (D.use = vm(t)));
    let s = Es(
      t,
      ft(function* () {
        let S = yield* g1,
          T = Ge("FileSystem.existsSafe")(function* (Lt) {
            return yield* S.exists(Lt).pipe(PU(() => !1));
          }),
          C = Ge("FileSystem.readFileStringSafe")(function* (Lt) {
            return yield* S.readFileString(Lt).pipe(
              GC("PlatformError", "NotFound", () => Jt(void 0)),
              GC("PlatformError", "PermissionDenied", () => Jt(void 0)),
            );
          }),
          O = Ge("FileSystem.isDir")(function* (Lt) {
            return (yield* S.stat(Lt).pipe($s(() => ti)))?.type === "Directory";
          }),
          B = Ge("FileSystem.isFile")(function* (Lt) {
            return (yield* S.stat(Lt).pipe($s(() => ti)))?.type === "File";
          }),
          V = Ge("FileSystem.readDirectoryEntries")(function* (Lt) {
            return yield* bl({
              try: async () =>
                (await iDn.readdir(Lt, { withFileTypes: !0 })).map((Se) => ({
                  name: Se.name,
                  type: Se.isDirectory()
                    ? "directory"
                    : Se.isSymbolicLink()
                      ? "symlink"
                      : Se.isFile()
                        ? "file"
                        : "other",
                })),
              catch: (Ht) => new e({ method: "readDirectoryEntries", cause: Ht }),
            });
          }),
          q = Ge("FileSystem.resolve")(function* (Lt) {
            let Ht = air(_(Lt));
            return yield* S.realPath(Ht).pipe(
              GC("PlatformError", "NotFound", () => Jt(Ht)),
              on,
            );
          }),
          Z = Ge("FileSystem.readJson")(function* (Lt) {
            let Ht = yield* S.readFileString(Lt);
            return yield* ZA({
              try: () => JSON.parse(Ht),
              catch: (Se) => new e({ method: "readJson", cause: Se }),
            });
          }),
          se = Ge("FileSystem.writeJson")(function* (Lt, Ht, Se) {
            let _e = JSON.stringify(Ht, null, 2);
            if ((yield* S.writeFileString(Lt, _e), Se)) yield* S.chmod(Lt, Se);
          }),
          ae = Ge("FileSystem.ensureDir")(function* (Lt) {
            yield* S.makeDirectory(Lt, { recursive: !0 }).pipe(
              GM(
                (Ht) => Ht.reason._tag === "AlreadyExists",
                (Ht) => O(Lt).pipe(Hi((Se) => (Se ? ti : bn(Ht)))),
              ),
            );
          }),
          z = Ge("FileSystem.writeWithDirs")(function* (Lt, Ht, Se) {
            let _e = typeof Ht === "string" ? S.writeFileString(Lt, Ht) : S.writeFile(Lt, Ht);
            if (
              (yield* _e.pipe(
                GM(
                  (we) => we.reason._tag === "NotFound",
                  () =>
                    ft(function* () {
                      (yield* S.makeDirectory(N_t(Lt), { recursive: !0 }), yield* _e);
                    }),
                ),
              ),
              Se)
            )
              yield* S.chmod(Lt, Se);
          }),
          Ae = Ge("FileSystem.glob")(function* (Lt, Ht) {
            return yield* bl({
              try: () => wG.scan(Lt, Ht),
              catch: (Se) => new e({ method: "glob", cause: Se }),
            });
          }),
          le = Ge("FileSystem.findUp")(function* (Lt, Ht, Se) {
            let _e = [],
              we = Ht;
            while (!0) {
              let Pe = oir(we, Lt);
              if (yield* S.exists(Pe)) _e.push(Pe);
              if (Se === we) break;
              let ye = N_t(we);
              if (ye === we) break;
              we = ye;
            }
            return _e;
          }),
          Be = Ge("FileSystem.up")(function* (Lt) {
            let Ht = [],
              Se = Lt.start;
            while (!0) {
              for (let we of Lt.targets) {
                let Pe = oir(Se, we);
                if (yield* S.exists(Pe)) Ht.push(Pe);
              }
              if (Lt.stop === Se) break;
              let _e = N_t(Se);
              if (_e === Se) break;
              Se = _e;
            }
            return Ht;
          }),
          Te = Ge("FileSystem.globUp")(function* (Lt, Ht, Se) {
            let _e = [],
              we = Ht;
            while (!0) {
              let Pe = yield* Ae(Lt, { cwd: we, absolute: !0, include: "file", dot: !0 }).pipe(
                $s(() => Jt([])),
              );
              if ((_e.push(...Pe), Se === we)) break;
              let ye = N_t(we);
              if (ye === we) break;
              we = ye;
            }
            return _e;
          });
        return t.of({
          ...S,
          existsSafe: T,
          readFileStringSafe: C,
          isDir: O,
          isFile: B,
          readDirectoryEntries: V,
          resolve: q,
          readJson: Z,
          writeJson: se,
          ensureDir: ae,
          writeWithDirs: z,
          findUp: le,
          up: Be,
          globUp: Te,
          glob: Ae,
          globMatch: wG.match,
        });
      }),
    );
    D.node = iA({ service: t, layer: s, deps: [BMe] });
    function H(S) {
      return sDn.lookup(S) || "application/octet-stream";
    }
    D.mimeType = H;
    function u(S) {
      let T = air(_(S));
      try {
        return nDn.native(T);
      } catch {
        return T;
      }
    }
    D.normalizePath = u;
    function f(S) {
      if (S === "*") return S;
      let T = S.match(/^(.*)[\\/]\*$/);
      if (!T) return u(S);
      let C = /^[A-Za-z]:$/.test(T[1]) ? T[1] + "\\" : T[1];
      return oir(u(C), "*");
    }
    D.normalizePathPattern = f;
    function d(S) {
      let T = air(_(S));
      try {
        return u(nDn(T));
      } catch (C) {
        if (C?.code === "ENOENT") return u(T);
        throw C;
      }
    }
    D.resolve = d;
    function _(S) {
      return S.replace(/^\/([a-zA-Z]):(?:[\\/]|$)/, (T, C) => `${C.toUpperCase()}:/`)
        .replace(/^\/([a-zA-Z])(?:\/|$)/, (T, C) => `${C.toUpperCase()}:/`)
        .replace(/^\/cygdrive\/([a-zA-Z])(?:\/|$)/, (T, C) => `${C.toUpperCase()}:/`)
        .replace(/^\/mnt\/([a-zA-Z])(?:\/|$)/, (T, C) => `${C.toUpperCase()}:/`);
    }
    D.windowsPath = _;
    function L(S, T) {
      return I(S, T) || I(T, S);
    }
    D.overlaps = L;
    function I(S, T) {
      let C = sQs(S, T);
      return C === "" || (!iQs(C) && C !== ".." && !C.startsWith(`..${oQs}`));
    }
    D.contains = I;
  })((ui ||= {}));
});