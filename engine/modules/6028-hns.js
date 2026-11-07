
function hns(e) {
  let t = [];
  for (let r = 0; r < e.length; r += mns) t.push(e.slice(r, r + mns));
  return t;
}