
var kj = "~effect/http/HttpServerRespondable",
  rer = (e) => Ma(e, kj),
  _Rs,
  hRs,
  wun = (e, t) => {
    if (F6(e)) return Jt(e);
    else if (rer(e)) return jf(e[kj](), () => Jt(t));
    else if (Rft(e)) return Jt(_Rs);
    else if (Nin(e)) return Jt(hRs);
    return Jt(t);
  },
  kun = (e, t) => {
    if (F6(e)) return Jt(e);
    else if (rer(e)) return jf(e[kj](), () => Jt(t));
    return Jt(t);
  };