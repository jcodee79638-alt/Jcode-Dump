
var x_i = Ie(function (gLc, lqe) {
  var __filename =
    "C:\\Users\\Jac\\Desktop\\Jac Code\\node_modules\\.bun\\write-file-atomic@7.0.1\\node_modules\\write-file-atomic\\lib\\index.js";
  lqe.exports = Kta;
  lqe.exports.sync = zta;
  lqe.exports._getTmpname = Zmr;
  lqe.exports._cleanupOnExit = e_r;
  var uf = cr("fs"),
    D_i = cr("crypto"),
    { onExit: y_i } = I_i(),
    M_i = cr("path"),
    { promisify: xB } = cr("util"),
    bae = {},
    qta = (function () {
      try {
        let t = cr("worker_threads");
        return t.threadId;
      } catch (t) {
        return 0;
      }
    })(),
    Gta = 0;
  function Zmr(e) {
    return (
      e +
      "." +
      D_i.createHash("sha1")
        .update(__filename)
        .update(String(process.pid))
        .update(String(qta))
        .update(String(++Gta))
        .digest()
        .readUInt32BE(0)
    );
  }
  function e_r(e) {
    return () => {
      try {
        uf.unlinkSync(typeof e === "function" ? e() : e);
      } catch {}
    };
  }
  function Xta(e) {
    return new Promise((t) => {
      if (!bae[e]) bae[e] = [];
      if ((bae[e].push(t), bae[e].length === 1)) t();
    });
  }
  function n1t(e) {
    if (e.code === "ENOSYS") return !0;
    if (!process.getuid || process.getuid() !== 0) {
      if (e.code === "EINVAL" || e.code === "EPERM") return !0;
    }
    return !1;
  }
  async function Jta(e, t, r = {}) {
    if (typeof r === "string") r = { encoding: r };
    let s,
      a,
      H = y_i(e_r(() => a)),
      u = M_i.resolve(e);
    try {
      await Xta(u);
      let f = await xB(uf.realpath)(e).catch(() => e);
      if (((a = Zmr(f)), !r.mode || !r.chown)) {
        let d = await xB(uf.stat)(f).catch(() => {});
        if (d) {
          if (r.mode == null) r.mode = d.mode;
          if (r.chown == null && process.getuid) r.chown = { uid: d.uid, gid: d.gid };
        }
      }
      if (((s = await xB(uf.open)(a, "w", r.mode)), r.tmpfileCreated)) await r.tmpfileCreated(a);
      if (ArrayBuffer.isView(t)) await xB(uf.write)(s, t, 0, t.length, 0);
      else if (t != null) await xB(uf.write)(s, String(t), 0, String(r.encoding || "utf8"));
      if (r.fsync !== !1) await xB(uf.fsync)(s);
      if ((await xB(uf.close)(s), (s = null), r.chown))
        await xB(uf.chown)(a, r.chown.uid, r.chown.gid).catch((d) => {
          if (!n1t(d)) throw d;
        });
      if (r.mode)
        await xB(uf.chmod)(a, r.mode).catch((d) => {
          if (!n1t(d)) throw d;
        });
      await xB(uf.rename)(a, f);
    } finally {
      if (s) await xB(uf.close)(s).catch(() => {});
      if ((H(), await xB(uf.unlink)(a).catch(() => {}), bae[u].shift(), bae[u].length > 0)) bae[u][0]();
      else delete bae[u];
    }
  }
  async function Kta(e, t, r, s) {
    if (r instanceof Function) ((s = r), (r = {}));
    let a = Jta(e, t, r);
    if (s)
      try {
        let H = await a;
        return s(H);
      } catch (H) {
        return s(H);
      }
    return a;
  }
  function zta(e, t, r) {
    if (typeof r === "string") r = { encoding: r };
    else if (!r) r = {};
    try {
      e = uf.realpathSync(e);
    } catch (d) {}
    let s = Zmr(e);
    if (!r.mode || !r.chown)
      try {
        let d = uf.statSync(e);
        if (((r = Object.assign({}, r)), !r.mode)) r.mode = d.mode;
        if (!r.chown && process.getuid) r.chown = { uid: d.uid, gid: d.gid };
      } catch (d) {}
    let a,
      H = e_r(s),
      u = y_i(H),
      f = !0;
    try {
      if (((a = uf.openSync(s, "w", r.mode || 438)), r.tmpfileCreated)) r.tmpfileCreated(s);
      if (ArrayBuffer.isView(t)) uf.writeSync(a, t, 0, t.length, 0);
      else if (t != null) uf.writeSync(a, String(t), 0, String(r.encoding || "utf8"));
      if (r.fsync !== !1) uf.fsyncSync(a);
      if ((uf.closeSync(a), (a = null), r.chown))
        try {
          uf.chownSync(s, r.chown.uid, r.chown.gid);
        } catch (d) {
          if (!n1t(d)) throw d;
        }
      if (r.mode)
        try {
          uf.chmodSync(s, r.mode);
        } catch (d) {
          if (!n1t(d)) throw d;
        }
      (uf.renameSync(s, e), (f = !1));
    } finally {
      if (a)
        try {
          uf.closeSync(a);
        } catch (d) {}
      if ((u(), f)) H();
    }
  }
});