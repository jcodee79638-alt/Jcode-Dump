
function Ex(e) {
  return ft(function* () {
    return { ...(yield* e.init()), id: e.id };
  });
}