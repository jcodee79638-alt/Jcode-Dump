
function NRi(e) {
  for (let t of e.split(`
`)) {
    if (/^\s*#/.test(t)) continue;
    let r = /^\s*root\s*=\s*(?<mountPoint>"[^"]*"|'[^']*'|[^#]*)/.exec(t);
    if (!r) continue;
    return r.groups.mountPoint.trim().replaceAll(/^["']|["']$/g, "");
  }
}
import H2a from "path";
import { promisify as c2a } from "util";
import A2a from "child_process";
import YMr, { constants as BRi } from "fs/promises";