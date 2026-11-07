
var sQe = ne(() => {
  Gt();
  sXa = String.fromCharCode(U5i);
  ((qce = Ge("Bom.readFile")(function* (e, t) {
    return pR(new TextDecoder("utf-8", { ignoreBOM: !0 }).decode(yield* e.readFile(t)));
  })),
    (ZLe = Ge("Bom.syncFile")(function* (e, t, r) {
      let s = yield* qce(e, t);
      if (s.bom === r) return s.text;
      return (yield* e.writeWithDirs(t, rO(s.text, r)), s.text);
    })));
});
import * as Gce from "path";