
async function ptn(e) {
  let t = Pu.join(e, "restored-inputs-v6.json");
  if (!(await UM(t))) return [];
  let r = JSON.parse((await dI(t, 4194304)).toString("utf8"));
  if (
    !NM(r) ||
    r.version !== 1 ||
    Object.keys(r).sort().join(",") !== "inputs,version" ||
    !Array.isArray(r.inputs) ||
    r.inputs.length > 20000 ||
    r.inputs.some(
      (s) =>
        !NM(s) ||
        Object.keys(s).sort().join(",") !== "inputId,sessionId" ||
        typeof s.sessionId !== "string" ||
        !/^[A-Za-z0-9_.-]{1,200}$/.test(s.sessionId) ||
        typeof s.inputId !== "string" ||
        !/^[A-Za-z0-9_.-]{1,200}$/.test(s.inputId),
    )
  )
    throw Ap();
  return r.inputs;
}