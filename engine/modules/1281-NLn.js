
var NLn = ne(() => {
  ((Ese = Xqs.homedir()),
    ({ env: Ede } = process),
    (Imt = Ede.XDG_DATA_HOME || (Ese ? ymt.join(Ese, ".local", "share") : void 0)),
    (Dmt = Ede.XDG_CONFIG_HOME || (Ese ? ymt.join(Ese, ".config") : void 0)),
    (OLn = Ede.XDG_STATE_HOME || (Ese ? ymt.join(Ese, ".local", "state") : void 0)),
    (ULn = Ede.XDG_CACHE_HOME || (Ese ? ymt.join(Ese, ".cache") : void 0)),
    (iFH = Ede.XDG_RUNTIME_DIR || void 0),
    (Jqs = (Ede.XDG_DATA_DIRS || "/usr/local/share/:/usr/share/").split(":")));
  if (Imt) Jqs.unshift(Imt);
  Kqs = (Ede.XDG_CONFIG_DIRS || "/etc/xdg").split(":");
  if (Dmt) Kqs.unshift(Dmt);
});
import { createHash as FLn } from "crypto";