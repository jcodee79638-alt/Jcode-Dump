
function Sa(e) {
  let t = G(e, ["id", "name", "commands", "updatedAt"]),
    n = G(t.commands, ["start", "build", "test"]);
  if (!Number.isSafeInteger(t.updatedAt) || Number(t.updatedAt) < 0 || !Object.keys(n).length)
    throw Error("Choose a valid run profile.");
  return {
    id: Vr(t.id),
    name: q(t.name, 100),
    updatedAt: Number(t.updatedAt),
    commands: Object.fromEntries(
      Object.entries(n).map(([i, r]) => {
        if (!Array.isArray(r) || !r.length || r.length > 32)
          throw Error("Choose argv arrays for profile commands.");
        return [ro(i), r.map((s) => q(s, 2048))];
      }),
    ),
  };
}