
function xpe(e, t, r, s) {
  switch (e._tag) {
    case "Filter": {
      let a = s(e);
      if (a !== void 0) return [{ path: t, message: a }];
      switch (e.issue._tag) {
        case "InvalidValue":
          return [{ path: t, message: CQt(Son(e.filter), af(e.actual)) }];
        default:
          return xpe(e.issue, t, r, s);
      }
    }
    case "Encoding":
      return xpe(e.issue, t, r, s);
    case "Pointer":
      return xpe(e.issue, [...t, ...e.path], r, s);
    case "Composite":
      return e.issues.flatMap((a) => xpe(a, t, r, s));
    case "AnyOf": {
      let a = mBe(e);
      if (e.issues.length === 0) {
        if (a !== void 0) return [{ path: t, message: a }];
        let H = CQt(hlt(e.ast), af(e.actual));
        return [{ path: t, message: H }];
      }
      return e.issues.flatMap((H) => xpe(H, t, r, s));
    }
    default:
      return [{ path: t, message: r(e) }];
  }
}