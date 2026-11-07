
var MOi = "New session - ",
  xOi = "Child session - ",
  TOi,
  $ja,
  Ije,
  gja,
  dvt,
  Eja,
  vOi,
  bOi,
  dXe,
  RB,
  jOi,
  POi,
  lyr,
  COi,
  Ija,
  Dja,
  yja,
  Mja,
  xja,
  Sja,
  Tja,
  vja,
  bja,
  pb,
  wOi = (e) => {
    let t = (T) => (Number.isFinite(T) ? T : 0),
      r = (T) => Math.max(0, t(T)),
      s = r(e.usage.inputTokens ?? 0),
      a = r(e.usage.outputTokens ?? 0),
      H = r(e.usage.reasoningTokens ?? 0),
      u = r(e.usage.cacheReadInputTokens ?? 0),
      f = r(
        Number(
          e.usage.cacheWriteInputTokens ??
            e.metadata?.anthropic?.cacheCreationInputTokens ??
            e.metadata?.vertex?.cacheCreationInputTokens ??
            e.metadata?.bedrock?.usage?.cacheWriteInputTokens ??
            e.metadata?.venice?.usage?.cacheCreationInputTokens ??
            0,
        ),
      ),
      d = r(s - u - f),
      L = {
        total: e.usage.totalTokens,
        input: d,
        output: r(a - H),
        reasoning: H,
        cache: { write: f, read: u },
      },
      I = s,
      D =
        e.model.cost?.tiers
          ?.filter((T) => T.tier.type === "context" && I > T.tier.size)
          .sort((T, C) => C.tier.size - T.tier.size)[0] ??
        (e.model.cost?.experimentalOver200K && I > 200000 ? e.model.cost.experimentalOver200K : e.model.cost),
      S = e.metadata?.copilot?.totalNanoAiu;
    return {
      cost:
        typeof S === "number" && Number.isFinite(S) && S >= 0
          ? new BB(S).div(100000000000).toNumber()
          : r(
              new BB(0)
                .add(new BB(L.input).mul(t(D?.input ?? 0)).div(1e6))
                .add(new BB(L.output).mul(t(D?.output ?? 0)).div(1e6))
                .add(new BB(L.cache.read).mul(t(D?.cache?.read ?? 0)).div(1e6))
                .add(new BB(L.cache.write).mul(t(D?.cache?.write ?? 0)).div(1e6))
                .add(new BB(L.reasoning).mul(t(D?.output ?? 0)).div(1e6))
                .toNumber(),
            ),
      tokens: L,
    };
  },
  fyr,
  Mg,
  jja,
  Pja,
  Cja,
  WB;