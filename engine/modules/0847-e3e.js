
var e3e = ne(() => {
  e3e();
  Gt();
  Hu();
  ntr();
  Hu();
  ((sdt = re.pipe(
    Jl("Credential.ID"),
    Bl((e) => ({ create: () => e.make("cred_" + t0()) })),
  )),
    (Wpn = nt({
      type: ri("oauth"),
      methodID: idt,
      refresh: re,
      access: re,
      expires: Ko,
      metadata: Gn(ks(re, PH)),
    }).annotate({ identifier: "Credential.OAuth" })),
    (Vpn = nt({ type: ri("key"), key: re, metadata: Gn(ks(re, PH)) }).annotate({
      identifier: "Credential.Key",
    })),
    (lVs = Io([Wpn, Vpn]).pipe(_D("type")).annotate({ identifier: "Credential.Value" })));
});