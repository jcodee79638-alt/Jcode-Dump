
function XLt(e, t, r, s = 1) {
  return e
    .update(la)
    .set({
      cost: Zt`${la.cost} + ${r.cost * s}`,
      tokens_input: Zt`${la.tokens_input} + ${r.tokens.input * s}`,
      tokens_output: Zt`${la.tokens_output} + ${r.tokens.output * s}`,
      tokens_reasoning: Zt`${la.tokens_reasoning} + ${r.tokens.reasoning * s}`,
      tokens_cache_read: Zt`${la.tokens_cache_read} + ${r.tokens.cache.read * s}`,
      tokens_cache_write: Zt`${la.tokens_cache_write} + ${r.tokens.cache.write * s}`,
      time_updated: Zt`${la.time_updated}`,
    })
    .where(Pi(la.id, t))
    .run()
    .pipe(on);
}