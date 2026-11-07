
function rn(c, t, e, s) {
  return fetch(c, {
    method: "GET",
    headers: t,
    signal: s.signal,
    mode: "cors",
    credentials: e ? "include" : "same-origin",
    redirect: "follow",
  });
}