
var p2 = ne(() => {
  YA();
  upt();
  KH();
  q_();
  Yu();
  eie();
  aL();
  mRe();
  U6();
  b1e();
  ese();
  ((nse = Wr(3, (e, t, r) => hG({ ...e, headers: mG(e.headers, t, r) }))),
    (Pun = Wr(2, (e, t) => hG({ ...e, headers: $Re(e.headers, t) }))),
    (ter = Wr(2, (e, t) => hG({ ...e, body: t }))),
    (mRs = {
      ...wh,
      [ZZt]: ZZt,
      [ZW]: !0,
      toJSON() {
        return {
          _id: "HttpServerResponse",
          status: this.status,
          statusText: this.statusText,
          headers: DU(this.headers),
          cookies: this.cookies.toJSON(),
          body: this.body.toJSON(),
        };
      },
    }));
});