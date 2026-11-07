
var IYn = Ie(function (yuc, EYn) {
  var fur = $Yn(),
    hOo = (e, t = {}) => {
      for (let [r, s] of Object.entries(e)) {
        let a = fur[r];
        if (a && a.flatten) a.flatten(r, e, t);
        else if (/@.*:registry$/i.test(r) || /^\/\//.test(r)) t[r] = s;
      }
      return t;
    },
    gYn = Object.entries(fur).reduce(
      (e, [t, { short: r = [], default: s }]) => {
        for (let a of [].concat(r)) e.shorthands[a] = [`--${t}`];
        return ((e.defaults[t] = s), e);
      },
      { shorthands: {}, defaults: {} },
    ),
    LOo = {
      "enjoy-by": ["--before"],
      d: ["--loglevel", "info"],
      dd: ["--loglevel", "verbose"],
      ddd: ["--loglevel", "silly"],
      quiet: ["--loglevel", "warn"],
      q: ["--loglevel", "warn"],
      s: ["--loglevel", "silent"],
      silent: ["--loglevel", "silent"],
      verbose: ["--loglevel", "verbose"],
      desc: ["--description"],
      help: ["--usage"],
      local: ["--no-global"],
      n: ["--no-yes"],
      no: ["--no-yes"],
      porcelain: ["--parseable"],
      readonly: ["--read-only"],
      reg: ["--registry"],
      iwr: ["--include-workspace-root"],
      ws: ["--workspaces"],
      ...gYn.shorthands,
    },
    $Oo = ["_auth", "_authToken", "_password", "certfile", "email", "keyfile", "username"],
    gOo = ["http_proxy", "https_proxy", "proxy", "no_proxy"];
  EYn.exports = {
    defaults: gYn.defaults,
    definitions: fur,
    flatten: hOo,
    nerfDarts: $Oo,
    proxyEnv: gOo,
    shorthands: LOo,
  };
});
import { fileURLToPath as EOo } from "url";