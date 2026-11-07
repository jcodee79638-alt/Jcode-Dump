
function tje(e) {
  let t = [],
    r = 4096;
  for (let s = 0; s < e.length; s += 4096) t.push(String.fromCodePoint(...e.subarray(s, s + 4096)));
  return S1a(t.join(""));
}