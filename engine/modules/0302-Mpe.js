
var Mpe,
  TQt = (e) => {
    if (Mpe.has(e)) return Mpe.get(e);
    else throw Error("Unable to get redacted value" + (e.label ? ` with label: "${e.label}"` : ""));
  },
  $on = (e) => (typeof e === "string" ? e : TQt(e));