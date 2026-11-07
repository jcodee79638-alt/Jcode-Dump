
function RPi(e, t) {
  let r = KDa(
    (s) => (
      (s.addIssue = (a) => {
        if (typeof a === "string") s.issues.push(Dhe(a, s.value, r._zod.def));
        else {
          let H = a;
          if (H.fatal) H.continue = !1;
          if ((H.code ?? (H.code = "custom"), !("input" in H))) H.input = s.value;
          (H.inst ?? (H.inst = r), H.continue ?? (H.continue = !r._zod.def.abort), s.issues.push(Dhe(H)));
        }
      }),
      e(s.value, s)
    ),
    t,
  );
  return r;
}