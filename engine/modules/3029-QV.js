
var QV,
  nbe,
  _Lr,
  Cua,
  wua,
  XEi,
  JEi,
  $Mt,
  LLr = (e) =>
    ja(
      e[_Lr],
      (t) =>
        t.load.pipe(
          Vn((r) =>
            r === nbe ? { _tag: "Unavailable", key: t.key } : { _tag: "Available", key: t.key, ...r },
          ),
        ),
      { concurrency: "unbounded" },
    );