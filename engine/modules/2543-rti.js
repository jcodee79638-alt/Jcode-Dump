
var rti = Ie(function (olc, flr) {
  var { mkdir: $Fo, readFile: gFo, rm: Alr, stat: ulr, truncate: EFo, writeFile: IFo } = cr("fs/promises"),
    llr = wSe(),
    tti = VSe(),
    DFo = clr(),
    rB = kSe(),
    Boe = cr("path"),
    KSe = BV(),
    yFo = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    MFo = (e) => ({ concurrency: 20, log: { silly() {} }, ...e });
  flr.exports = xFo;
  async function xFo(e, t) {
    ((t = MFo(t)), t.log.silly("verify", "verifying cache at", e));
    let r = [SFo, vFo, bFo, PFo, wFo, kFo, TFo],
      s = {};
    for (let a of r) {
      let H = a.name,
        u = new Date(),
        f = await a(e, t);
      if (f)
        Object.keys(f).forEach((_) => {
          s[_] = f[_];
        });
      let d = new Date();
      if (!s.runTime) s.runTime = {};
      s.runTime[H] = d - u;
    }
    return (
      (s.runTime.total = s.endTime - s.startTime),
      t.log.silly("verify", "verification finished for", e, "in", `${s.runTime.total}ms`),
      s
    );
  }
  async function SFo() {
    return { startTime: new Date() };
  }
  async function TFo() {
    return { endTime: new Date() };
  }
  async function vFo(e, t) {
    return (t.log.silly("verify", "fixing cache permissions"), await $Fo(e, { recursive: !0 }), null);
  }
  async function bFo(e, t) {
    t.log.silly("verify", "garbage collecting content");
    await Promise.resolve().then(() => MEt());
    let s = rB.lsStream(e),
      a = new Set();
    (s.on("data", (d) => {
      if (t.filter && !t.filter(d)) return;
      let _ = KSe.parse(d.integrity);
      for (let L in _) a.add(_[L].toString());
    }),
      await new Promise((d, _) => {
        s.on("end", d).on("error", _);
      }));
    let H = llr.contentDir(e),
      u = await DFo(Boe.join(H, "**"), { follow: !1, nodir: !0, nosort: !0 }),
      f = { verifiedContent: 0, reclaimedCount: 0, reclaimedSize: 0, badContentCount: 0, keptSize: 0 };
    return (
      await nZ(
        u,
        async (d) => {
          let _ = d.split(/[/\\]/),
            L = _.slice(_.length - 3).join(""),
            I = _[_.length - 4],
            D = KSe.fromHex(L, I);
          if (a.has(D.toString())) {
            let S = await jFo(d, D);
            if (!S.valid) (f.reclaimedCount++, f.badContentCount++, (f.reclaimedSize += S.size));
            else (f.verifiedContent++, (f.keptSize += S.size));
          } else {
            f.reclaimedCount++;
            let S = await ulr(d);
            (await Alr(d, { recursive: !0, force: !0 }), (f.reclaimedSize += S.size));
          }
          return f;
        },
        { concurrency: t.concurrency },
      ),
      f
    );
  }
  async function jFo(e, t) {
    let r = {};
    try {
      let { size: s } = await ulr(e);
      ((r.size = s), (r.valid = !0), await KSe.checkStream(new tti.ReadStream(e), t));
    } catch (s) {
      if (s.code === "ENOENT") return { size: 0, valid: !1 };
      if (s.code !== "EINTEGRITY") throw s;
      (await Alr(e, { recursive: !0, force: !0 }), (r.valid = !1));
    }
    return r;
  }
  async function PFo(e, t) {
    t.log.silly("verify", "rebuilding index");
    await Promise.resolve().then(() => MEt());
    let s = await rB.ls(e),
      a = { missingContent: 0, rejectedEntries: 0, totalEntries: 0 },
      H = {};
    for (let u in s)
      if (yFo(s, u)) {
        let f = rB.hashKey(u),
          d = s[u],
          _ = t.filter && !t.filter(d);
        if ((_ && a.rejectedEntries++, H[f] && !_)) H[f].push(d);
        else if (H[f] && _);
        else if (_) ((H[f] = []), (H[f]._path = rB.bucketPath(e, u)));
        else ((H[f] = [d]), (H[f]._path = rB.bucketPath(e, u)));
      }
    return (await nZ(Object.keys(H), (u) => CFo(e, H[u], a, t), { concurrency: t.concurrency }), a);
  }
  async function CFo(e, t, r) {
    await EFo(t._path);
    for (let s of t) {
      let a = llr(e, s.integrity);
      try {
        (await ulr(a),
          await rB.insert(e, s.key, s.integrity, { metadata: s.metadata, size: s.size, time: s.time }),
          r.totalEntries++);
      } catch (H) {
        if (H.code === "ENOENT") (r.rejectedEntries++, r.missingContent++);
        else throw H;
      }
    }
  }
  function wFo(e, t) {
    return (
      t.log.silly("verify", "cleaning tmp directory"),
      Alr(Boe.join(e, "tmp"), { recursive: !0, force: !0 })
    );
  }
  async function kFo(e, t) {
    let r = Boe.join(e, "_lastverified");
    return (t.log.silly("verify", "writing verifile to " + r), IFo(r, `${Date.now()}`));
  }
  flr.exports.lastRun = OFo;
  async function OFo(e) {
    let t = await gFo(Boe.join(e, "_lastverified"), { encoding: "utf8" });
    return new Date(+t);
  }
});