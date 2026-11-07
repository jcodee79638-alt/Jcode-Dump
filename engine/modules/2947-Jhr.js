
function Jhr(e) {
  return [
    {
      input: e?.input ?? 0,
      output: e?.output ?? 0,
      cache: { read: e?.cache_read ?? 0, write: e?.cache_write ?? 0 },
    },
    ...(e?.tiers?.map((r) => ({
      tier: r.tier,
      input: r.input,
      output: r.output,
      cache: { read: r.cache_read ?? 0, write: r.cache_write ?? 0 },
    })) ?? []),
    ...(e?.context_over_200k
      ? [
          {
            tier: { type: "context", size: 200000 },
            input: e.context_over_200k.input,
            output: e.context_over_200k.output,
            cache: { read: e.context_over_200k.cache_read ?? 0, write: e.context_over_200k.cache_write ?? 0 },
          },
        ]
      : []),
  ];
}