
function ua(e) {
  let t = nt(e.schema);
  return nt({
    id: rtr,
    metadata: Gn(ks(re, PH)),
    type: ri(e.type),
    durable: Gn(nt({ aggregateID: re, seq: DI, version: DI })),
    location: Gn(Rv),
    data: t,
  })
    .annotate({ identifier: e.type })
    .pipe(Bl(() => ({ type: e.type, ...(e.durable === void 0 ? {} : { durable: e.durable }), data: t })));
}