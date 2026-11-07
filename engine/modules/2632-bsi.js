
var bsi = Ie(function (_Te) {
  var LVo =
    (_Te && _Te.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  Object.defineProperty(_Te, "__esModule", { value: !0 });
  _Te.parseProxyResponse = void 0;
  var $Vo = LVo(A_e()),
    CIt = (0, $Vo.default)("https-proxy-agent:parse-proxy-response");
  function gVo(e) {
    return new Promise((t, r) => {
      let s = 0,
        a = [];
      function H() {
        let L = e.read();
        if (L) _(L);
        else e.once("readable", H);
      }
      function u() {
        (e.removeListener("end", f), e.removeListener("error", d), e.removeListener("readable", H));
      }
      function f() {
        (u(), CIt("onend"), r(Error("Proxy connection ended before receiving CONNECT response")));
      }
      function d(L) {
        (u(), CIt("onerror %o", L), r(L));
      }
      function _(L) {
        (a.push(L), (s += L.length));
        let I = Buffer.concat(a, s),
          D = I.indexOf(`\r
\r
`);
        if (D === -1) {
          (CIt("have not received end of HTTP headers yet..."), H());
          return;
        }
        let S = I.slice(0, D).toString("ascii").split(`\r
`),
          T = S.shift();
        if (!T) return (e.destroy(), r(Error("No header received from proxy CONNECT response")));
        let C = T.split(" "),
          O = +C[1],
          B = C.slice(2).join(" "),
          V = {};
        for (let q of S) {
          if (!q) continue;
          let Z = q.indexOf(":");
          if (Z === -1) return (e.destroy(), r(Error(`Invalid header from proxy CONNECT response: "${q}"`)));
          let se = q.slice(0, Z).toLowerCase(),
            ae = q.slice(Z + 1).trimStart(),
            z = V[se];
          if (typeof z === "string") V[se] = [z, ae];
          else if (Array.isArray(z)) z.push(ae);
          else V[se] = ae;
        }
        (CIt("got proxy server response: %o %o", T, V),
          u(),
          t({ connect: { statusCode: O, statusText: B, headers: V }, buffered: I }));
      }
      (e.on("error", d), e.on("end", f), H());
    });
  }
  _Te.parseProxyResponse = gVo;
});