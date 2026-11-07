
async function k8s(e) {
  let t = Pu.join(e.data, "restore-v6", "journal.json");
  if (!(await UM(t))) return;
  let r = JSON.parse((await dI(t, 32768)).toString("utf8"));
  if (
    !NM(r) ||
    Object.keys(r).sort().join(",") !== "entries,phase,safety,seal,token,version" ||
    r.version !== 1 ||
    typeof r.token !== "string" ||
    !uQ(r.token) ||
    r.safety !== r.token ||
    !["staging", "prepared", "committed"].includes(String(r.phase)) ||
    !Array.isArray(r.entries) ||
    r.entries.length !== ZDe.length
  )
    throw Ap();
  let { seal: s, ...a } = r;
  if (typeof s !== "string" || s !== (await FJt(Pu.dirname(t), JSON.stringify(a)))) throw Ap();
  if (
    r.entries.some(
      (H, u) =>
        !NM(H) ||
        Object.keys(H).sort().join(",") !== "next,old,role" ||
        H.role !== ZDe[u] ||
        [H.old, H.next].some((f) => f !== null && (typeof f !== "string" || !/^[a-f0-9]{64}$/.test(f))),
    )
  )
    throw Ap();
  return a;
}