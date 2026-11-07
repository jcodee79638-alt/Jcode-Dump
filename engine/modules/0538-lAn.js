
function lAn(e, t) {
  let r = t;
  for (let s of e)
    switch (s.op) {
      case "replace": {
        r = s.path === "" ? s.value : uAn(r, s.path, s.value, "replace");
        break;
      }
      case "add": {
        r = S2s(r, s.path, s.value);
        break;
      }
      case "remove": {
        r = uAn(r, s.path, void 0, "remove");
        break;
      }
    }
  return r;
}