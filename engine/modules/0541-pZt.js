
function pZt(e) {
  if (!/^(0|[1-9]\d*)$/.test(e)) throw Error(`Invalid array index: "${e}"`);
  return Number(e);
}