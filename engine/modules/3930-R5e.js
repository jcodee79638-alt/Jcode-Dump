
function R5e({
  maxOutputTokens: e,
  temperature: t,
  topP: r,
  topK: s,
  presencePenalty: a,
  frequencyPenalty: H,
  seed: u,
  stopSequences: f,
}) {
  if (e != null) {
    if (!Number.isInteger(e))
      throw new UE({ parameter: "maxOutputTokens", value: e, message: "maxOutputTokens must be an integer" });
    if (e < 1)
      throw new UE({ parameter: "maxOutputTokens", value: e, message: "maxOutputTokens must be >= 1" });
  }
  if (t != null) {
    if (typeof t !== "number")
      throw new UE({ parameter: "temperature", value: t, message: "temperature must be a number" });
  }
  if (r != null) {
    if (typeof r !== "number")
      throw new UE({ parameter: "topP", value: r, message: "topP must be a number" });
  }
  if (s != null) {
    if (typeof s !== "number")
      throw new UE({ parameter: "topK", value: s, message: "topK must be a number" });
  }
  if (a != null) {
    if (typeof a !== "number")
      throw new UE({ parameter: "presencePenalty", value: a, message: "presencePenalty must be a number" });
  }
  if (H != null) {
    if (typeof H !== "number")
      throw new UE({ parameter: "frequencyPenalty", value: H, message: "frequencyPenalty must be a number" });
  }
  if (u != null) {
    if (!Number.isInteger(u))
      throw new UE({ parameter: "seed", value: u, message: "seed must be an integer" });
  }
  return {
    maxOutputTokens: e,
    temperature: t,
    topP: r,
    topK: s,
    presencePenalty: a,
    frequencyPenalty: H,
    stopSequences: f,
    seed: u,
  };
}