
function Df(e, t, r) {
  let s = Array.isArray(t) ? [...t] : [],
    a = Array.isArray(t) ? r : t,
    H = zCe([e, ...s], { ...a, stdin: "pipe", stdout: "pipe", stderr: "pipe" });
  if (!H.stdin || !H.stdout || !H.stderr) throw Error("Process output not available");
  return H;
}