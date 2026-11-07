
var Z5e = ne(() => {
  Z5e();
  Gt();
  OY();
  ((gva = fG(nt({ message: re, path: On(re) }), [ks(re, PH)])),
    (Eva = ud.create("ConfigJsonError", { path: re, message: be(re) })),
    (Iva = ud.create("ConfigInvalidError", { path: re, issues: be(On(gva)), message: be(re) })),
    (Y5e = ud.create("ConfigFrontmatterError", { path: re, message: re })),
    (Dva = ud.create("ConfigDirectoryTypoError", { path: re, dir: re, suggestion: re })),
    (yva = ud.create("ConfigRemoteAuthError", { url: re, remote: re })));
});
import { chmod as Mva, mkdir as O8i, readFile as U8i, stat as AVc, writeFile as zTt } from "fs/promises";
import { createWriteStream as xva, existsSync as N8i, statSync as lVc } from "fs";
import { realpathSync as Sva } from "fs";
import { dirname as QTt, isAbsolute as dVc, join as F8i, resolve as mVc, win32 as k8i } from "path";
import { Readable as Tva } from "stream";
import { pipeline as vva } from "stream/promises";