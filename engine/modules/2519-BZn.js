
var BZn = Ie(function (Buc, FZn) {
  var {
      ERR_FS_CP_DIR_TO_NON_DIR: jUo,
      ERR_FS_CP_EEXIST: PUo,
      ERR_FS_CP_EINVAL: LEt,
      ERR_FS_CP_FIFO_PIPE: CUo,
      ERR_FS_CP_NON_DIR_TO_DIR: wUo,
      ERR_FS_CP_SOCKET: kUo,
      ERR_FS_CP_SYMLINK_TO_SUBDIRECTORY: OUo,
      ERR_FS_CP_UNKNOWN: UUo,
      ERR_FS_EISDIR: NUo,
      ERR_INVALID_ARG_TYPE: FUo,
    } = EZn(),
    {
      constants: {
        errno: { EEXIST: BUo, EISDIR: RUo, EINVAL: rZ, ENOTDIR: WUo },
      },
    } = cr("os"),
    {
      chmod: VUo,
      copyFile: qUo,
      lstat: bZn,
      mkdir: jZn,
      readdir: GUo,
      readlink: IZn,
      stat: CSe,
      symlink: qur,
      unlink: PZn,
      utimes: XUo,
    } = cr("fs/promises"),
    {
      dirname: X7e,
      isAbsolute: DZn,
      join: yZn,
      parse: JUo,
      resolve: J7e,
      sep: KUo,
      toNamespacedPath: MZn,
    } = cr("path"),
    { fileURLToPath: zUo } = cr("url"),
    QUo = {
      dereference: !1,
      errorOnExist: !1,
      filter: void 0,
      force: !0,
      preserveTimestamps: !1,
      recursive: !1,
    };
  async function YUo(e, t, r) {
    if (r != null && typeof r !== "object") throw new FUo("options", ["Object"], r);
    return ZUo(MZn(xZn(e)), MZn(xZn(t)), { ...QUo, ...r });
  }
  function xZn(e) {
    return e != null && e.href && e.origin ? zUo(e) : e;
  }
  async function ZUo(e, t, r) {
    r.preserveTimestamps;
    let s = await CZn(e, t, r),
      { srcStat: a, destStat: H } = s;
    if ((await kZn(e, a, t), r.filter)) return OZn(SZn, H, e, t, r);
    return SZn(H, e, t, r);
  }
  async function CZn(e, t, r) {
    let { 0: s, 1: a } = await eNo(e, t, r);
    if (a) {
      if (wZn(s, a))
        throw new LEt({ message: "src and dest cannot be the same", path: t, syscall: "cp", errno: rZ });
      if (s.isDirectory() && !a.isDirectory())
        throw new jUo({
          message: `cannot overwrite directory ${e} with non-directory ${t}`,
          path: t,
          syscall: "cp",
          errno: RUo,
        });
      if (!s.isDirectory() && a.isDirectory())
        throw new wUo({
          message: `cannot overwrite non-directory ${e} with directory ${t}`,
          path: t,
          syscall: "cp",
          errno: WUo,
        });
    }
    if (s.isDirectory() && Gur(e, t))
      throw new LEt({
        message: `cannot copy ${e} to a subdirectory of self ${t}`,
        path: t,
        syscall: "cp",
        errno: rZ,
      });
    return { srcStat: s, destStat: a };
  }
  function wZn(e, t) {
    return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
  }
  function eNo(e, t, r) {
    let s = r.dereference ? (a) => CSe(a, { bigint: !0 }) : (a) => bZn(a, { bigint: !0 });
    return Promise.all([
      s(e),
      s(t).catch((a) => {
        if (a.code === "ENOENT") return null;
        throw a;
      }),
    ]);
  }
  async function SZn(e, t, r, s) {
    let a = X7e(r);
    if (await tNo(a)) return $Et(e, t, r, s);
    return (await jZn(a, { recursive: !0 }), $Et(e, t, r, s));
  }
  function tNo(e) {
    return CSe(e).then(
      () => !0,
      (t) => (t.code === "ENOENT" ? !1 : Promise.reject(t)),
    );
  }
  async function kZn(e, t, r) {
    let s = J7e(X7e(e)),
      a = J7e(X7e(r));
    if (a === s || a === JUo(a).root) return;
    let H;
    try {
      H = await CSe(a, { bigint: !0 });
    } catch (u) {
      if (u.code === "ENOENT") return;
      throw u;
    }
    if (wZn(t, H))
      throw new LEt({
        message: `cannot copy ${e} to a subdirectory of self ${r}`,
        path: r,
        syscall: "cp",
        errno: rZ,
      });
    return kZn(e, t, a);
  }
  var TZn = (e) => J7e(e).split(KUo).filter(Boolean);
  function Gur(e, t) {
    let r = TZn(e),
      s = TZn(t);
    return r.every((a, H) => s[H] === a);
  }
  async function OZn(e, t, r, s, a, H) {
    if (await a.filter(r, s)) return e(t, r, s, a, H);
  }
  function rNo(e, t, r, s) {
    if (s.filter) return OZn($Et, e, t, r, s);
    return $Et(e, t, r, s);
  }
  async function $Et(e, t, r, s) {
    let H = await (s.dereference ? CSe : bZn)(t);
    if (H.isDirectory() && s.recursive) return cNo(H, e, t, r, s);
    else if (H.isDirectory())
      throw new NUo({ message: `${t} is a directory (not copied)`, path: t, syscall: "cp", errno: rZ });
    else if (H.isFile() || H.isCharacterDevice() || H.isBlockDevice()) return nNo(H, e, t, r, s);
    else if (H.isSymbolicLink()) return uNo(e, t, r);
    else if (H.isSocket())
      throw new kUo({ message: `cannot copy a socket file: ${r}`, path: r, syscall: "cp", errno: rZ });
    else if (H.isFIFO())
      throw new CUo({ message: `cannot copy a FIFO pipe: ${r}`, path: r, syscall: "cp", errno: rZ });
    throw new UUo({ message: `cannot copy an unknown file type: ${r}`, path: r, syscall: "cp", errno: rZ });
  }
  function nNo(e, t, r, s, a) {
    if (!t) return UZn(e, r, s, a);
    return iNo(e, r, s, a);
  }
  async function iNo(e, t, r, s) {
    if (s.force) return (await PZn(r), UZn(e, t, r, s));
    else if (s.errorOnExist)
      throw new PUo({ message: `${r} already exists`, path: r, syscall: "cp", errno: BUo });
  }
  async function UZn(e, t, r, s) {
    if ((await qUo(t, r), s.preserveTimestamps)) return sNo(e.mode, t, r);
    return gEt(r, e.mode);
  }
  async function sNo(e, t, r) {
    if (oNo(e)) return (await aNo(r, e), vZn(e, t, r));
    return vZn(e, t, r);
  }
  function oNo(e) {
    return (e & 128) === 0;
  }
  function aNo(e, t) {
    return gEt(e, t | 128);
  }
  async function vZn(e, t, r) {
    return (await HNo(t, r), gEt(r, e));
  }
  function gEt(e, t) {
    return VUo(e, t);
  }
  async function HNo(e, t) {
    let r = await CSe(e);
    return XUo(t, r.atime, r.mtime);
  }
  function cNo(e, t, r, s, a) {
    if (!t) return ANo(e.mode, r, s, a);
    return NZn(r, s, a);
  }
  async function ANo(e, t, r, s) {
    return (await jZn(r), await NZn(t, r, s), gEt(r, e));
  }
  async function NZn(e, t, r) {
    let s = await GUo(e);
    for (let a = 0; a < s.length; a++) {
      let H = s[a],
        u = yZn(e, H),
        f = yZn(t, H),
        { destStat: d } = await CZn(u, f, r);
      await rNo(d, u, f, r);
    }
  }
  async function uNo(e, t, r) {
    let s = await IZn(t);
    if (!DZn(s)) s = J7e(X7e(t), s);
    if (!e) return qur(s, r);
    let a;
    try {
      a = await IZn(r);
    } catch (u) {
      if (u.code === "EINVAL" || u.code === "UNKNOWN") return qur(s, r);
      throw u;
    }
    if (!DZn(a)) a = J7e(X7e(r), a);
    if (Gur(s, a))
      throw new LEt({
        message: `cannot copy ${s} to a subdirectory of self ${a}`,
        path: r,
        syscall: "cp",
        errno: rZ,
      });
    if ((await CSe(t)).isDirectory() && Gur(a, s))
      throw new OUo({ message: `cannot overwrite ${a} with ${s}`, path: r, syscall: "cp", errno: rZ });
    return lNo(s, r);
  }
  async function lNo(e, t) {
    return (await PZn(t), qur(e, t));
  }
  FZn.exports = YUo;
});