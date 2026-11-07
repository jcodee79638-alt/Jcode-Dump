
var Eli = Ie(function (gli) {
  Object.defineProperty(gli, "__esModule", { value: !0 });
  gli.bundleBuilderFromSigningConfig = DKo;
  var YDt = _Z(),
    _li = Ldr(),
    hli = $dr(),
    Lli = Edr(),
    ZDt = vdr(),
    LKo = 1,
    $Ko = 2,
    gKo = 1,
    $li = 5000,
    EKo = 20000,
    IKo = { retries: 2 };
  function DKo(e) {
    let { signingConfig: t, identityProvider: r, bundleType: s } = e,
      a = e.fetchOptions || { timeout: $li, retry: IKo },
      H = yKo(t, r, a),
      u = MKo(t, a);
    switch (s) {
      case "messageSignature":
        return new hli.MessageSignatureBundleBuilder({ signer: H, witnesses: u });
      case "dsseEnvelope":
        return new _li.DSSEBundleBuilder({ signer: H, witnesses: u });
    }
  }
  function yKo(e, t, r) {
    let s = xKo(e);
    return new Lli.FulcioSigner({
      fulcioBaseURL: s.url,
      identityProvider: t,
      timeout: r.timeout,
      retry: r.retry,
    });
  }
  function MKo(e, t) {
    let r = [];
    if (e.rekorTlogConfig) {
      if (e.rekorTlogConfig.selector !== YDt.ServiceSelector.ANY)
        throw Error("Unsupported Rekor TLog selector in signing configuration");
      let s = SKo(e);
      r.push(
        new ZDt.RekorWitness({
          rekorBaseURL: s.url,
          majorApiVersion: s.majorApiVersion,
          retry: t.retry,
          timeout: s.majorApiVersion === 1 ? t.timeout : Math.min(t.timeout || $li, EKo),
        }),
      );
    }
    if (e.tsaConfig) {
      if (e.tsaConfig.selector !== YDt.ServiceSelector.ANY)
        throw Error("Unsupported TSA selector in signing configuration");
      let s = TKo(e);
      r.push(new ZDt.TSAWitness({ tsaBaseURL: s.url, retry: t.retry, timeout: t.timeout }));
    }
    return r;
  }
  function xKo(e) {
    let t = jdr(e.caUrls, LKo),
      r = bdr(t);
    if (r.length === 0) throw Error("No valid CA services found in signing configuration");
    return r[0];
  }
  function SKo(e) {
    let t = jdr(e.rekorTlogUrls, $Ko),
      r = bdr(t);
    if (r.length === 0) throw Error("No valid TLogs found in signing configuration");
    return r[0];
  }
  function TKo(e) {
    let t = jdr(e.tsaUrls, gKo),
      r = bdr(t);
    if (r.length === 0) throw Error("No valid TSAs found in signing configuration");
    return r[0];
  }
  function bdr(e) {
    let t = new Date();
    return e
      .filter((s) => {
        if (!s.validFor?.end) return !0;
        return s.validFor.end >= t;
      })
      .sort((s, a) => {
        let H = s.validFor?.start?.getTime() ?? 0;
        return (a.validFor?.start?.getTime() ?? 0) - H;
      });
  }
  function jdr(e, t) {
    return e.filter((r) => r.majorApiVersion <= t);
  }
});