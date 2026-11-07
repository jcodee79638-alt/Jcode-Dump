
var gsi = Ie(function (u8) {
  var nVo =
      (u8 && u8.__createBinding) ||
      (Object.create
        ? function (e, t, r, s) {
            if (s === void 0) s = r;
            var a = Object.getOwnPropertyDescriptor(t, r);
            if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable))
              a = {
                enumerable: !0,
                get: function () {
                  return t[r];
                },
              };
            Object.defineProperty(e, s, a);
          }
        : function (e, t, r, s) {
            if (s === void 0) s = r;
            e[s] = t[r];
          }),
    iVo =
      (u8 && u8.__setModuleDefault) ||
      (Object.create
        ? function (e, t) {
            Object.defineProperty(e, "default", { enumerable: !0, value: t });
          }
        : function (e, t) {
            e.default = t;
          }),
    Lsi =
      (u8 && u8.__importStar) ||
      function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (e != null) {
          for (var r in e) if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) nVo(t, e, r);
        }
        return (iVo(t, e), t);
      };
  Object.defineProperty(u8, "__esModule", { value: !0 });
  u8.req = u8.json = u8.toBuffer = void 0;
  var sVo = Lsi(cr("http")),
    oVo = Lsi(cr("https"));
  async function $si(e) {
    let t = 0,
      r = [];
    for await (let s of e) ((t += s.length), r.push(s));
    return Buffer.concat(r, t);
  }
  u8.toBuffer = $si;
  async function aVo(e) {
    let r = (await $si(e)).toString("utf8");
    try {
      return JSON.parse(r);
    } catch (s) {
      let a = s;
      throw ((a.message += ` (input: ${r})`), a);
    }
  }
  u8.json = aVo;
  function HVo(e, t = {}) {
    let s = ((typeof e === "string" ? e : e.href).startsWith("https:") ? oVo : sVo).request(e, t),
      a = new Promise((H, u) => {
        s.once("response", H).once("error", u).end();
      });
    return ((s.then = a.then.bind(a)), s);
  }
  u8.req = HVo;
});