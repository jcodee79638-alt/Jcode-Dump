
var Ide = ne(() => {
  ((r) => {
    function e(s) {
      return FLn("sha1").update(s).digest("hex");
    }
    r.fast = e;
    function t(s) {
      return FLn("sha256").update(s).digest("hex");
    }
    r.sha256 = t;
  })((qU ||= {}));
});
import Mmt from "path";
import zqs from "os";
import { randomBytes as Qqs, randomUUID as Yqs } from "crypto";
import {
  mkdir as xmt,
  readFile as Zqs,
  rm as mMe,
  stat as eGs,
  utimes as tGs,
  writeFile as BLn,
} from "fs/promises";