
function mMn(e, t = []) {
  return { headers: kWe(e.headers), body: wWe(e.body), settings: cxe(e, ["headers", "body", ...t]) };
}