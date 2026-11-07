
function Fqe(e) {
  let t = kv(e.codec),
    r = Kie(e.codec),
    s = BAn(e.codec);
  return $Lr([
    {
      key: e.key,
      load: e.load.pipe(
        Vn((a) => {
          if (Nua(a)) return a;
          let H = () => ({
            value: r(a),
            ...(e.removed ? { removed: dLr(e.key, "removal", e.removed(a)) } : {}),
          });
          return {
            baseline: () => ({ text: dLr(e.key, "baseline", e.baseline(a)), snapshot: H() }),
            compare: (u) =>
              xv(t(u), {
                onNone: () => ({ _tag: "Incompatible" }),
                onSome: (f) =>
                  s(f, a)
                    ? { _tag: "Unchanged" }
                    : {
                        _tag: "Updated",
                        render: () => ({ text: dLr(e.key, "update", e.update(f, a)), snapshot: H() }),
                      },
              }),
          };
        }),
      ),
    },
  ]);
}