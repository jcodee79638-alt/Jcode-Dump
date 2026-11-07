
function z4i(e, t, r, s, a, H, u, f, d, _, L) {
  if (t === z7a) {
    let I = s[r];
    H.push({ type: "capture", name: I });
  } else if (t === Q7a) H.push({ type: "string", value: a[r] });
  else if (H.length > 0) {
    if (H[0].type !== "string") throw Error("Predicates must begin with a literal value");
    let I = H[0].value;
    switch (I) {
      case "any-not-eq?":
      case "not-eq?":
      case "any-eq?":
      case "eq?":
        q4i(H, e, I, u);
        break;
      case "any-not-match?":
      case "not-match?":
      case "any-match?":
      case "match?":
        G4i(H, e, I, u);
        break;
      case "not-any-of?":
      case "any-of?":
        X4i(H, e, I, u);
        break;
      case "is?":
      case "is-not?":
        J4i(H, e, I, _, L);
        break;
      case "set!":
        K4i(H, e, d);
        break;
      default:
        f[e].push({ operator: I, operands: H.slice(1) });
    }
    H.length = 0;
  }
}