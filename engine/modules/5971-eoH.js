
function eoH(e) {
  for (let t of [
    "Unauthorized",
    "EffectHttpApiErrorBadRequest",
    "EffectHttpApiErrorNotFound",
    "effect_HttpApiError_BadRequest",
    "effect_HttpApiError_NotFound",
  ]) {
    if (Lwr(e.paths, t)) continue;
    delete e.components?.schemas?.[t];
  }
}