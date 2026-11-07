
var xe = pe(require("node:path"), 1),
  qe = require("node:fs/promises"),
  as = require("node:child_process"),
  cs = require("node:util"),
  os = cs.promisify(as.execFile),
  He = "Git review is unavailable in this folder. You can keep coding and viewing files.",
  ds = (e, t) => {
    let n = xe.default.relative(e, t);
    return !n || (!n.startsWith("..") && !xe.default.isAbsolute(n));
  };