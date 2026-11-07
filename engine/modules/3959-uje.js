
async function uje(e) {
  if (e === void 0) return { value: void 0, state: "undefined-input" };
  let t = await LP({ text: e });
  if (t.success) return { value: t.value, state: "successful-parse" };
  if (((t = await LP({ text: lTa(e) })), t.success)) return { value: t.value, state: "repaired-parse" };
  return { value: void 0, state: "failed-parse" };
}