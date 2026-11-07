
var ade = ne(() => {
  ade();
  Gt();
  Hu();
  g_();
  itr();
  Hu();
  ntr();
  ((rY = Rpn),
    (otr = idt),
    (atr = nt({ key: re, op: Jo(["eq", "neq"]), value: re }).annotate({ identifier: "Integration.When" })),
    (Jpn = nt({ type: ri("text"), key: re, message: re, placeholder: Gn(re), when: Gn(atr) }).annotate({
      identifier: "Integration.TextPrompt",
    })),
    (Kpn = nt({
      type: ri("select"),
      key: re,
      message: re,
      options: On(nt({ label: re, value: re, hint: Gn(re) })),
      when: Gn(atr),
    }).annotate({ identifier: "Integration.SelectPrompt" })),
    (zpn = Io([Jpn, Kpn]).pipe(_D("type"))),
    (Qpn = nt({ id: otr, type: ri("oauth"), label: re, prompts: Gn(On(zpn)) }).annotate({
      identifier: "Integration.OAuthMethod",
    })),
    (Ypn = nt({ type: ri("key"), label: Gn(re) }).annotate({ identifier: "Integration.KeyMethod" })),
    (Zpn = nt({ type: ri("env"), names: On(re) }).annotate({ identifier: "Integration.EnvMethod" })),
    (edn = Io([Qpn, Ypn, Zpn]).pipe(_D("type")).annotate({ identifier: "Integration.Method" })),
    (mVs = ks(re, re).annotate({ identifier: "Integration.Inputs" })),
    (Gpn = ua({ type: "integration.updated", schema: {} })),
    (Xpn = ua({ type: "integration.connection.updated", schema: { integrationID: rY } })),
    (tdn = { Updated: Gpn, ConnectionUpdated: Xpn, Definitions: jl(Gpn, Xpn) }),
    (_Vs = nt({ id: rY, name: re }).annotate({ identifier: "Integration.Ref" })));
  adt = class adt extends (
    Pa("Integration.Info")({ id: rY, name: re, methods: On(edn), connections: On(dVs) })
  ) {};
  ((r3e = re.pipe(
    Jl("Integration.AttemptID"),
    Bl((e) => ({ create: () => e.make("con_" + t0()) })),
  )),
    (t3e = nt({ created: Aa, expires: Aa })));
  Htr = class Htr extends (
    Pa("Integration.Attempt")({
      attemptID: r3e,
      url: re,
      instructions: re,
      mode: Jo(["auto", "code"]),
      time: t3e,
    })
  ) {};
  rdn = Io([
    nt({ status: ri("pending"), time: t3e }),
    nt({ status: ri("complete"), time: t3e }),
    nt({ status: ri("failed"), message: re, time: t3e }),
    nt({ status: ri("expired"), time: t3e }),
  ])
    .pipe(_D("status"))
    .annotate({ identifier: "Integration.AttemptStatus" });
});