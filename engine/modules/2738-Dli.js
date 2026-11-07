
var Dli = Ie(function (NTe) {
  var bKo =
    (NTe && NTe.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(NTe, "__esModule", { value: !0 });
  NTe.CIContextProvider = void 0;
  var jKo = bKo(C4e()),
    PKo = [CKo, wKo];
  class Ili {
    audience;
    constructor(e = "sigstore") {
      this.audience = e;
    }
    async getToken() {
      return Promise.any(PKo.map((e) => e(this.audience))).catch(() =>
        Promise.reject("CI: no tokens available"),
      );
    }
  }
  NTe.CIContextProvider = Ili;
  async function CKo(e) {
    if (!process.env.ACTIONS_ID_TOKEN_REQUEST_URL || !process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN)
      return Promise.reject("no token available");
    let t = new URL(process.env.ACTIONS_ID_TOKEN_REQUEST_URL);
    return (
      t.searchParams.append("audience", e),
      (
        await (0, jKo.default)(t.href, {
          retry: 2,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN}`,
          },
        })
      )
        .json()
        .then((s) => s.value)
    );
  }
  async function wKo() {
    if (!process.env.SIGSTORE_ID_TOKEN) return Promise.reject("no token available");
    return process.env.SIGSTORE_ID_TOKEN;
  }
});