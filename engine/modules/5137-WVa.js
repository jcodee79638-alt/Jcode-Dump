
function WVa(e) {
  let t = JTt(Object.keys(e.tools), gT(e.agent.permission, e.permission ?? []));
  return kKt(e.tools, (r, s) => e.user.tools?.[s] !== !1 && !t.has(s));
}