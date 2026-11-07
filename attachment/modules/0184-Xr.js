
class Xr extends ns {
  _responseOrigin = null;
  constructor(t) {
    super(t, Yr, Kr);
    const { httpHeaders: e, url: s } = t;
    (tt(/https?:/.test(s.protocol), "PDFFetchStream only supports http(s):// URLs."),
      (this.headers = tn(!0, e)));
  }
}