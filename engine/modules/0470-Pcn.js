
function Pcn(e, t) {
  let r = "",
    s = 0,
    a = -1,
    H = 0,
    u;
  for (let f = 0; f <= e.length; ++f) {
    if (f < e.length) u = e.charCodeAt(f);
    else if (u === 47) break;
    else u = 47;
    if (u === 47) {
      if (a === f - 1 || H === 1);
      else if (a !== f - 1 && H === 2) {
        if (
          r.length < 2 ||
          s !== 2 ||
          r.charCodeAt(r.length - 1) !== 46 ||
          r.charCodeAt(r.length - 2) !== 46
        ) {
          if (r.length > 2) {
            let d = r.lastIndexOf("/");
            if (d !== r.length - 1) {
              if (d === -1) ((r = ""), (s = 0));
              else ((r = r.slice(0, d)), (s = r.length - 1 - r.lastIndexOf("/")));
              ((a = f), (H = 0));
              continue;
            }
          } else if (r.length === 2 || r.length === 1) {
            ((r = ""), (s = 0), (a = f), (H = 0));
            continue;
          }
        }
        if (t) {
          if (r.length > 0) r += "/..";
          else r = "..";
          s = 2;
        }
      } else {
        if (r.length > 0) r += "/" + e.slice(a + 1, f);
        else r = e.slice(a + 1, f);
        s = f - a - 1;
      }
      ((a = f), (H = 0));
    } else if (u === 46 && H !== -1) ++H;
    else H = -1;
  }
  return r;
}