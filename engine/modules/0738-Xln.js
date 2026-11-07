
var Xln = ne(() => {
  KH();
  Dd();
  hRe();
  U6();
  Mer();
  p2();
  Wln();
  Lft();
  ((E3s = yer({
    fileResponse(e, t, r, s, a, H, u) {
      let f =
        u === 0 ? Vln.from([]) : qln.createReadStream(e, { start: a, end: H === void 0 ? void 0 : H - 1 });
      return lpt(f, {
        headers: {
          ...s,
          "content-type": s["content-type"] ?? Cer.getType(e) ?? "application/octet-stream",
          "content-length": u.toString(),
        },
        status: t,
        statusText: r,
      });
    },
    fileWebResponse(e, t, r, s, a) {
      return lpt(Vln.fromWeb(e.stream()), {
        headers: KQ(
          s,
          BU({
            "content-type": s["content-type"] ?? Cer.getType(e.name) ?? "application/octet-stream",
            "content-length": e.size.toString(),
          }),
        ),
        status: t,
        statusText: r,
      });
    },
  })),
    (Gln = Ev(Es(ORe)(E3s), ou(h1e), ou(iun))));
});
import { Duplex as D3s, Readable as y3s } from "stream";