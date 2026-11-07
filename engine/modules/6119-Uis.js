
async function Uis(e) {
  await Oce();
  await wCe();
  await Promise.resolve().then(() => Gw());
  await e$();
  await jI();
  await Ace();
  await Promise.resolve().then(() => jX());
  await ET();
  await XN();
  await Promise.resolve().then(() => Gt());
  let I = await KPt({ directory: e.directory });
  return o9.runPromise(
    ft(function* () {
      let D = yield* Mg,
        S = yield* cce,
        T = yield* VN,
        C = yield* FB,
        O = yield* gee,
        B = yield* D.get(Ec.make(e.id));
      if (Ois.resolve(B.directory).toLowerCase() !== Ois.resolve(e.directory).toLowerCase())
        throw Error("Choose this conversation's project first.");
      if ((yield* S.active()).length || (yield* T.list()).some((V) => V.status === "running"))
        return { idle: !1 };
      if ((yield* C.list()).length || (yield* O.list()).length) return { idle: !1 };
      return { idle: !0 };
    }).pipe(IA(Fh, I)),
  );
}