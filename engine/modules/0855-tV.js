
var tV = ne(() => {
  tV();
  Gt();
  Hu();
  Hde();
  Hu();
  ((EG = re.pipe(Jl("ModelV2.ID"))),
    (ltr = re.pipe(Jl("VariantID"))),
    (IG = nt({ id: EG, providerID: gG, variant: ltr.pipe(Gn) }).annotate({ identifier: "Model.Ref" })),
    (idn = re.pipe(Jl("Family"))),
    (sdn = nt({ tools: Vi, input: On(re), output: On(re) }).annotate({ identifier: "Model.Capabilities" })),
    (odn = nt({
      tier: nt({ type: ri("context"), size: DI }).pipe(Gn),
      input: mo,
      output: mo,
      cache: nt({ read: mo, write: mo }),
    }).annotate({ identifier: "Model.Cost" })),
    (adn = Io([nt({ id: EG, ...ctr.fields }), nt({ id: EG, ...Atr.fields })])
      .pipe(_D("type"))
      .annotate({ identifier: "Model.Api" })),
    (Hdn = nt({
      id: EG,
      providerID: gG,
      family: idn.pipe(Gn),
      name: re,
      api: adn,
      capabilities: sdn,
      request: nt({ ...n3e.fields, variant: re.pipe(Gn) }),
      variants: nt({ id: ltr, ...n3e.fields }).pipe(On),
      time: nt({ released: mo }),
      cost: On(odn),
      status: Jo(["alpha", "beta", "deprecated", "active"]),
      enabled: Vi,
      limit: nt({ context: DI, input: DI.pipe(Gn), output: DI }),
    })
      .annotate({ identifier: "ModelV2.Info" })
      .pipe(
        Bl((e) => ({
          empty: (t, r) =>
            e.make({
              id: r,
              providerID: t,
              name: r,
              api: { id: r, type: "native", settings: {} },
              capabilities: { tools: !1, input: [], output: [] },
              request: { headers: {}, body: {} },
              variants: [],
              time: { released: 0 },
              cost: [],
              status: "active",
              enabled: !0,
              limit: { context: 0, output: 0 },
            }),
        })),
      )));
});