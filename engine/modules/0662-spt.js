
var spt = ne(() => {
  BH();
  KH();
  mI();
  vQt();
  Hf();
  R_();
  Yu();
  eie();
  U6();
  b1e();
  ese();
  JBs = {
    [XZt]: XZt,
    ...KF,
    toJSON() {
      return {
        _id: "HttpClientRequest",
        method: this.method,
        url: this.url,
        urlParams: this.urlParams,
        hash: this.hash,
        headers: DU(this.headers),
        body: this.body.toJSON(),
      };
    },
    pipe() {
      return vA(this, arguments);
    },
  };
  ((KBs = QQ("GET", "", UZt, eH(), FU, Qpe)),
    (KM = P1e("GET")),
    (u2 = P1e("POST")),
    (zBs = Wr(2, (e, t) => {
      let r = e;
      if (t.method) r = QBs(r, t.method);
      if (t.url) r = hun(r, t.url);
      if (t.headers) r = YW(r, t.headers);
      if (t.urlParams) r = YBs(r, t.urlParams);
      if (t.hash) r = ZBs(r, t.hash);
      if (t.body) r = yRe(r, t.body);
      if (t.accept) r = ipt(r, t.accept);
      if (t.acceptJson) r = _G(r);
      return r;
    })),
    (QBs = Wr(2, (e, t) => QQ(t, e.url, e.urlParams, e.hash, e.headers, e.body))),
    (npt = Wr(3, (e, t, r) => QQ(e.method, e.url, e.urlParams, e.hash, mG(e.headers, t, r), e.body))),
    (YW = Wr(2, (e, t) => QQ(e.method, e.url, e.urlParams, e.hash, $Re(e.headers, t), e.body))),
    (JZt = Wr(2, (e, t) => npt(e, "Authorization", `Bearer ${$on(t)}`))),
    (ipt = Wr(2, (e, t) => npt(e, "Accept", t))),
    (_G = ipt("application/json")),
    (hun = Wr(2, (e, t) => {
      if (typeof t === "string") return QQ(e.method, t, e.urlParams, e.hash, e.headers, e.body);
      let r = new URL(t.toString()),
        s = zW(r.searchParams),
        a = Sv(r.hash === "" ? void 0 : r.hash.slice(1));
      return ((r.search = ""), (r.hash = ""), QQ(e.method, r.toString(), s, a, e.headers, e.body));
    })),
    (YBs = Wr(2, (e, t) => QQ(e.method, e.url, cun(e.urlParams, t), e.hash, e.headers, e.body))),
    (ZBs = Wr(2, (e, t) => QQ(e.method, e.url, e.urlParams, Lo(t), e.headers, e.body))),
    (yRe = Wr(2, (e, t) => {
      let r = e.headers;
      if (t._tag === "Empty" || t._tag === "FormData") r = M1e(M1e(r, "Content-Type"), "Content-length");
      else {
        if (t.contentType) r = mG(r, "content-type", t.contentType);
        if (t.contentLength !== void 0) r = mG(r, "content-length", t.contentLength.toString());
      }
      return QQ(e.method, e.url, e.urlParams, e.hash, r, t);
    })),
    (eRs = Wr(
      (e) => XBs(e[0]),
      (e, t, r) => yRe(e, Ype(t, r)),
    )));
});