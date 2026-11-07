
var api = Ie(function (tqe) {
  var BQo =
    (tqe && tqe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(tqe, "__esModule", { value: !0 });
  tqe.readTarget = WQo;
  var RQo = BQo(cr("fs")),
    Iae = rmr();
  async function WQo(e, t) {
    let r = await VQo(e, t);
    return new Promise((s, a) => {
      RQo.default.readFile(r, "utf-8", (H, u) => {
        if (H)
          a(
            new Iae.TUFError({
              code: "TUF_READ_TARGET_ERROR",
              message: `error reading target ${r}`,
              cause: H,
            }),
          );
        else s(u);
      });
    });
  }
  async function VQo(e, t) {
    let r;
    try {
      r = await e.getTargetInfo(t);
    } catch (a) {
      throw new Iae.TUFError({
        code: "TUF_REFRESH_METADATA_ERROR",
        message: "error refreshing TUF metadata",
        cause: a,
      });
    }
    if (!r) throw new Iae.TUFError({ code: "TUF_FIND_TARGET_ERROR", message: `target ${t} not found` });
    let s = await e.findCachedTarget(r);
    if (!s)
      try {
        s = await e.downloadTarget(r);
      } catch (a) {
        throw new Iae.TUFError({
          code: "TUF_DOWNLOAD_TARGET_ERROR",
          message: `error downloading target ${s}`,
          cause: a,
        });
      }
    return s;
  }
});