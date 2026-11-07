
var OXe = Ie(function (m9i) {
  Object.defineProperty(m9i, "__esModule", { value: !0 });
  var Uje = wXe();
  class d9i extends Error {
    constructor(e, t, r, s) {
      super(s || `can't resolve reference ${r} from id ${t}`);
      ((this.missingRef = Uje.resolveUrl(e, t, r)),
        (this.missingSchema = Uje.normalizeId(Uje.getFullPath(e, this.missingRef))));
    }
  }
  m9i.default = d9i;
});