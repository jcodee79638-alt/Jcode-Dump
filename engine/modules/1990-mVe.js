
var mVe = ne(() => {
  mVe();
  Gt();
  Hu();
  g_();
  Hu();
  ((mvn = ua({ type: "reference.updated", schema: {} })),
    (_vn = { Updated: mvn, Definitions: jl(mvn) }),
    (hvn = nt({ type: ri("local"), path: bo, description: re.pipe(Gn), hidden: Vi.pipe(Gn) }).annotate({
      identifier: "Reference.LocalSource",
    })),
    (Lvn = nt({
      type: ri("git"),
      repository: re,
      branch: re.pipe(Gn),
      description: re.pipe(Gn),
      hidden: Vi.pipe(Gn),
    }).annotate({ identifier: "Reference.GitSource" })),
    ($vn = Io([hvn, Lvn]).pipe(_D("type")).annotate({ identifier: "Reference.Source" })));
  zor = class zor extends (
    Pa("Reference.Info")({ name: re, path: bo, description: re.pipe(Gn), hidden: Vi.pipe(Gn), source: $vn })
  ) {};
});
import Evn from "path";
import { fileURLToPath as BHo } from "url";