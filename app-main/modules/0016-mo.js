
async function mo(e, t, n = Ta) {
  let i = [250, 500, 1000, 1500, 2000];
  for (let r = 0; ; r++)
    try {
      return await _a(e, t, n);
    } catch (s) {
      let o = s && typeof s === "object" && "code" in s ? s.code : void 0;
      if (!["EBUSY", "EACCES", "EPERM", "ENOENT"].includes(String(o)) || r >= i.length) throw s;
      await new Promise((l) => setTimeout(l, i[r]));
    }
}