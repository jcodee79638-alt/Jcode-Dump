
var g7i = async (e) => {
  let t = await Promise.allSettled(e),
    r = t.filter((a) => a.status === "rejected");
  if (r.length) {
    for (let a of r) console.error(a.reason);
    throw Error(`${r.length} promise(s) failed - see the above errors`);
  }
  let s = [];
  for (let a of t) if (a.status === "fulfilled") s.push(a.value);
  return s;
};