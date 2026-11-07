
function WnH(e, t) {
  return ft(function* () {
    let r = yield* Md,
      s = kes(Bes(r)),
      a = s
        ? yield* Mg.use((u) => u.get(s)).pipe(
            GM(
              (u) => Xw.isInstance(u),
              () => Jt(void 0),
            ),
            jQ(() => Jt(void 0)),
          )
        : void 0,
      H = yield* BnH(r, a);
    return yield* RnH(e, t, H);
  });
}