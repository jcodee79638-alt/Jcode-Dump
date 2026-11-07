
var jcn = ne(() => {
  Jg();
  BH();
  BH();
  RQ();
  KH();
  Dd();
  Hf();
  PW();
  s1e();
  aL();
  JYt();
  ((DFs = (() => {
    let e = yE(xu.access, RL("FileSystem", "access"), X0("access"));
    return (t, r) => {
      let s = xu.constants.F_OK;
      if (r?.readable) s |= xu.constants.R_OK;
      if (r?.writable) s |= xu.constants.W_OK;
      return e(t, s);
    };
  })()),
    (yFs = (() => {
      let e = yE(xu.cp, RL("FileSystem", "copy"), X0("copy"));
      return (t, r, s) =>
        e(t, r, {
          force: s?.overwrite ?? !1,
          preserveTimestamps: s?.preserveTimestamps ?? !1,
          recursive: !0,
        });
    })()),
    (MFs = (() => {
      let e = yE(xu.copyFile, RL("FileSystem", "copyFile"), X0("copyFile"));
      return (t, r) => e(t, r);
    })()),
    (xFs = (() => {
      let e = yE(xu.chmod, RL("FileSystem", "chmod"), X0("chmod"));
      return (t, r) => e(t, r);
    })()),
    (SFs = (() => {
      let e = yE(xu.chown, RL("FileSystem", "chown"), X0("chown"));
      return (t, r, s) => e(t, r, s);
    })()),
    (TFs = (() => {
      let e = yE(xu.link, RL("FileSystem", "link"), X0("link"));
      return (t, r) => e(t, r);
    })()),
    (vFs = (() => {
      let e = yE(xu.mkdir, RL("FileSystem", "makeDirectory"), X0("makeDirectory"));
      return (t, r) => e(t, { recursive: r?.recursive ?? !1, mode: r?.mode });
    })()),
    (bFs = KYt("makeTempDirectory")),
    (jFs = zYt("remove")),
    (PFs = (() => {
      let e = KYt("makeTempDirectoryScoped"),
        t = zYt("makeTempDirectoryScoped");
      return (r) => Bd(e(r), (s) => on(t(s, { recursive: !0 })));
    })()),
    (wFs = CFs("open")),
    (kFs = (() => {
      let e = (L) => yE(xu.read, RL("FileSystem", L), X0(L)),
        t = e("read"),
        r = e("readAlloc"),
        s = yE(xu.fstat, RL("FileSystem", "stat"), X0("stat")),
        a = yE(xu.ftruncate, RL("FileSystem", "truncate"), X0("truncate")),
        H = yE(xu.fsync, RL("FileSystem", "sync"), X0("sync")),
        u = (L) => yE(xu.write, RL("FileSystem", L), X0(L)),
        f = u("write"),
        d = u("writeAll");
      class _ {
        [hft];
        fd;
        append;
        position = BigInt(0);
        constructor(L, I) {
          ((this[hft] = hft), (this.fd = L), (this.append = I));
        }
        get stat() {
          return Vn(s(this.fd), Tcn);
        }
        get sync() {
          return H(this.fd);
        }
        seek(L, I) {
          let D = NU(L);
          return jn(() => {
            if (I === "start") this.position = D;
            else if (I === "current") this.position = this.position + D;
            return this.position;
          });
        }
        read(L) {
          return yH(() => {
            let I = this.position;
            return Vn(t(this.fd, { buffer: L, position: I }), (D) => {
              let S = NU(D);
              return ((this.position = I + S), S);
            });
          });
        }
        readAlloc(L) {
          let I = Number(L);
          return yH(() => {
            let D = Buffer.allocUnsafeSlow(I),
              S = this.position;
            return Vn(r(this.fd, { buffer: D, position: S }), (T) => {
              if (T === 0) return eH();
              if (((this.position = S + BigInt(T)), T === I)) return Lo(D);
              let C = Buffer.allocUnsafeSlow(T);
              return (D.copy(C, 0, 0, T), Lo(C));
            });
          });
        }
        truncate(L) {
          return Vn(a(this.fd, L ? Number(L) : void 0), () => {
            if (!this.append) {
              let I = BigInt(L ?? 0);
              if (this.position > I) this.position = I;
            }
          });
        }
        write(L) {
          return yH(() => {
            let I = this.position;
            return Vn(f(this.fd, L, void 0, void 0, this.append ? void 0 : Number(I)), (D) => {
              let S = NU(D);
              if (!this.append) this.position = I + S;
              return S;
            });
          });
        }
        writeAllChunk(L) {
          return yH(() => {
            let I = this.position;
            return Hi(d(this.fd, L, void 0, void 0, this.append ? void 0 : Number(I)), (D) => {
              if (D === 0)
                return bn(
                  YC({
                    module: "FileSystem",
                    method: "writeAll",
                    _tag: "WriteZero",
                    pathOrDescriptor: this.fd,
                    description: "write returned 0 bytes written",
                  }),
                );
              if (!this.append) this.position = I + BigInt(D);
              return D < L.length ? this.writeAllChunk(L.subarray(D)) : ti;
            });
          });
        }
        writeAll(L) {
          return this.writeAllChunk(L);
        }
      }
      return (L, I) => new _(L, I);
    })()),
    (OFs = Scn("makeTempFile")),
    (UFs = (() => {
      let e = Scn("makeTempFileScoped"),
        t = zYt("makeTempFileScoped");
      return (r) => Bd(e(r), (s) => on(t(_1e.dirname(s), { recursive: !0 })));
    })()),
    (BFs = (() => {
      let e = yE(xu.readlink, RL("FileSystem", "readLink"), X0("readLink"));
      return (t) => e(t);
    })()),
    (RFs = (() => {
      let e = yE(xu.realpath, RL("FileSystem", "realPath"), X0("realPath"));
      return (t) => e(t);
    })()),
    (WFs = (() => {
      let e = yE(xu.rename, RL("FileSystem", "rename"), X0("rename"));
      return (t, r) => e(t, r);
    })()),
    (QYt = (() => {
      let e = yE(xu.stat, RL("FileSystem", "stat"), X0("stat"));
      return (t) => Vn(e(t), Tcn);
    })()),
    (VFs = (() => {
      let e = yE(xu.symlink, RL("FileSystem", "symlink"), X0("symlink"));
      return (t, r) => e(t, r);
    })()),
    (qFs = (() => {
      let e = yE(xu.truncate, RL("FileSystem", "truncate"), X0("truncate"));
      return (t, r) => e(t, r !== void 0 ? Number(r) : void 0);
    })()),
    (GFs = (() => {
      let e = yE(xu.utimes, RL("FileSystem", "utime"), X0("utime"));
      return (t, r, s) => e(t, r, s);
    })()),
    (KFs = Vn(x6(XYt), (e) =>
      Icn({
        access: DFs,
        chmod: xFs,
        chown: SFs,
        copy: yFs,
        copyFile: MFs,
        link: TFs,
        makeDirectory: vFs,
        makeTempDirectory: bFs,
        makeTempDirectoryScoped: PFs,
        makeTempFile: OFs,
        makeTempFileScoped: UFs,
        open: wFs,
        readDirectory: NFs,
        readFile: FFs,
        readLink: BFs,
        realPath: RFs,
        remove: jFs,
        rename: WFs,
        stat: QYt,
        symlink: VFs,
        truncate: qFs,
        utimes: GFs,
        watch(t) {
          return JFs(e, t);
        },
        writeFile: vcn,
      }),
    )),
    (bcn = Es(g1)(KFs)));
});