
function sN(e, ...t) {
  {
    let r = Jao[e],
      s = ume(r) ? r.apply(null, t) : r;
    throw Error(`[Immer] ${s}`);
  }
  throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`);
}