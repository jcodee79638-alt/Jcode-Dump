
var itr = ne(() => {
  itr();
  Gt();
  e3e();
  ((fVs = nt({ type: ri("credential"), id: sdt, label: re }).annotate({
    identifier: "Connection.CredentialInfo",
  })),
    (pVs = nt({ type: ri("env"), name: re }).annotate({ identifier: "Connection.EnvInfo" })),
    (dVs = Io([fVs, pVs]).pipe(_D("type")).annotate({ identifier: "Connection.Info" })));
});