
function JQa(e, t = Xzi) {
  if (isNaN(e)) throw new $we(u$e.EncodeTimeValueMalformed, `Time must be a number: ${e}`);
  else if (e > qzi)
    throw new $we(u$e.EncodeTimeSizeExceeded, `Cannot encode a time larger than ${qzi}: ${e}`);
  else if (e < 0) throw new $we(u$e.EncodeTimeNegative, `Time must be positive: ${e}`);
  else if (Number.isInteger(e) === !1)
    throw new $we(u$e.EncodeTimeValueMalformed, `Time must be an integer: ${e}`);
  let r,
    s = "";
  for (let a = t; a > 0; a--) ((r = e % swt), (s = Gzi.charAt(r) + s), (e = (e - r) / swt));
  return s;
}