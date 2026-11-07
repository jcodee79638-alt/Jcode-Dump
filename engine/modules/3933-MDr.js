
async function MDr(e) {
  if (e.prompt == null && e.messages == null)
    throw new Oq({ prompt: e, message: "prompt or messages must be defined" });
  if (e.prompt != null && e.messages != null)
    throw new Oq({ prompt: e, message: "prompt and messages cannot be defined at the same time" });
  if (
    e.system != null &&
    typeof e.system !== "string" &&
    !Che(e.system).every((s) => typeof s === "object" && s !== null && "role" in s && s.role === "system")
  )
    throw new Oq({
      prompt: e,
      message: "system must be a string, SystemModelMessage, or array of SystemModelMessage",
    });
  let t;
  if (e.prompt != null && typeof e.prompt === "string") t = [{ role: "user", content: e.prompt }];
  else if (e.prompt != null && Array.isArray(e.prompt)) t = e.prompt;
  else if (e.messages != null) t = e.messages;
  else throw new Oq({ prompt: e, message: "prompt or messages must be defined" });
  if (t.length === 0) throw new Oq({ prompt: e, message: "messages must not be empty" });
  let r = await Ww({ value: t, schema: Va(QSa) });
  if (!r.success)
    throw new Oq({
      prompt: e,
      message: "The messages do not match the ModelMessage[] schema.",
      cause: r.error,
    });
  return { messages: t, system: e.system };
}