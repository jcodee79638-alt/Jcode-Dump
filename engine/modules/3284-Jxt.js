
function Jxt(e) {
  if (!e) return;
  let t = 2166136261;
  for (let r = 0; r < e.length; r++) ((t ^= e.charCodeAt(r)), (t = Math.imul(t, 16777619)));
  return (t >>> 0).toString(36);
}