
async function _tn(e, t, r, s) {
  (await qJt(e), await FAt(e));
  let a = await Xfe(t, r),
    H = P8s(),
    u = Pu.join(e.data, "restore-v6");
  (await PAt(u, { recursive: !0, mode: 448 }), await p6(u), await VJt(u));
  let f = Pu.join(u, H),
    d = Pu.join(u, ".pending-" + H),
    _ = !1,
    L = !1;
  try {
    (await RJt(e, {
      version: 1,
      token: H,
      phase: "staging",
      safety: H,
      entries: ZDe.map((_e) => ({ role: _e, old: null, next: null })),
    }),
      (_ = !0),
      await PAt(d, { mode: 448 }),
      await JJt(e, d, H),
      await stn(d),
      await Xfe(d, H),
      await CAt(d, f));
    let I = a.manifest.files.find((_e) => _e.path === "database.sqlite"),
      D = await dI(Pu.join(t, "database.sqlite"), Ch.database);
    if (D.length !== I.bytes || CC(D) !== I.sha256) throw Ap();
    let S = await O8s(e, D, XF(e, "database", H).after),
      T = await ptn(e.data),
      C = [...new Map([...T, ...S].map((_e) => [_e.sessionId + ":" + _e.inputId, _e])).values()];
    if (C.length > 20000) throw Ap();
    await Qne(XF(e, "ledger", H).after, JSON.stringify({ version: 1, inputs: C }));
    let O = await dI(Pu.join(t, "settings.json"), Ch.settings),
      B = a.manifest.files.find((_e) => _e.path === "settings.json");
    if (O.length !== B.bytes || CC(O) !== B.sha256) throw Ap();
    let V = Atn(JSON.parse(O.toString("utf8")));
    await Qne(XF(e, "settings", H).after, JSON.stringify({ ...(await GJt(e)), ...V }));
    let q = a.manifest.files.find((_e) => _e.path === "projects.json"),
      Z = q ? await dI(Pu.join(t, "projects.json"), 1048576) : void 0;
    if (q && Z && (Z.length !== q.bytes || CC(Z) !== q.sha256)) throw Ap();
    let se = [
      ...new Map(
        [...(Z ? utn(JSON.parse(Z.toString("utf8"))) : []), ...(await ltn(e))].map((_e) => [
          _e.directory.toLowerCase(),
          _e,
        ]),
      ).values(),
    ];
    if (se.length > 2000 || Buffer.byteLength(JSON.stringify(se)) > 1048576) throw Ap();
    await Qne(XF(e, "projects", H).after, JSON.stringify(se));
    let ae = XF(e, "attachments", H).after;
    await PAt(ae, { mode: 448 });
    let z = await XJt(Pu.join(e.userData, "attachments"), Ch.files);
    if (z.truncated || z.files.some((_e) => !YDe(_e))) throw Ap();
    for (let _e of z.files.filter((we) => we !== ".references-v6.json"))
      await Qne(
        Pu.join(ae, _e),
        await dI(Pu.join(e.userData, "attachments", _e), _e.endsWith(".json") ? 1048576 : Ch.attachment),
      );
    for (let _e of a.manifest.files.filter(
      (we) => we.path.startsWith("attachments/") && we.path !== "attachments/.references-v6.json",
    )) {
      let we = await dI(Pu.join(t, ..._e.path.split("/")), _e.bytes);
      if (we.length !== _e.bytes || CC(we) !== _e.sha256) throw Ap();
      let Pe = Pu.join(ae, _e.path.slice(12));
      if (await UM(Pe)) {
        if (CC(await dI(Pe, _e.bytes)) !== _e.sha256) throw Ap();
        continue;
      }
      await Qne(Pe, we);
    }
    let Ae = a.manifest.files.find((_e) => _e.path === "attachments/.references-v6.json"),
      le = Ae ? await dI(Pu.join(t, "attachments", ".references-v6.json"), 524288) : void 0;
    if (Ae && le && (le.length !== Ae.bytes || CC(le) !== Ae.sha256)) throw Ap();
    let Be = [
        ...(le ? WJt(JSON.parse(le.toString("utf8"))).sessions : []),
        ...(await ftn(Pu.join(e.userData, "attachments"))).sessions,
      ],
      Te = new Map();
    Be.forEach((_e) => Te.set(_e.id, [...new Set([...(Te.get(_e.id) ?? []), ..._e.attachments])]));
    let Lt = WJt({ version: 1, sessions: [...Te].map(([_e, we]) => ({ id: _e, attachments: we })) });
    (await Qne(Pu.join(ae, ".references-v6.json"), JSON.stringify(Lt)), await Xfe(t, r));
    let Ht = [];
    for (let _e of ZDe)
      Ht.push({ role: _e, old: await Yne(XF(e, _e, H).target, _e), next: await Yne(XF(e, _e, H).after, _e) });
    await s?.afterStage?.();
    let Se = { version: 1, token: H, phase: "prepared", safety: H, entries: Ht };
    await RJt(e, Se);
    for (let _e of Ht) {
      let we = XF(e, _e.role, H);
      if ((await Yne(we.target, _e.role)) !== _e.old || (await Yne(we.after, _e.role)) !== _e.next)
        throw Ap();
      if (_e.old !== null) await CAt(we.target, we.before);
      if (_e.next !== null) await CAt(we.after, we.target);
      await s?.afterSwap?.(_e.role);
    }
    return (
      await RJt(e, { ...Se, phase: "committed" }),
      (L = !0),
      await s?.afterCommit?.(),
      await mtn(e, { ...Se, phase: "committed" }),
      await VJt(u),
      { restored: !0, restart: !0 }
    );
  } catch (I) {
    if (_ && !L) await FAt(e);
    if (!_)
      for (let D of ZDe) {
        let S = XF(e, D, H).after;
        if (await UM(S)) await JF(S, { recursive: D === "attachments" });
      }
    if (L) return { restored: !0, restart: !0 };
    throw I;
  } finally {
    if (await UM(d)) await JF(d, { recursive: !0 });
  }
}