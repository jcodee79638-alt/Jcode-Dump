
function Pio(e) {
  return Sio().filter((t) => {
    let r = aTn.relative(e, t);
    return r !== "" && !r.startsWith("..") && !aTn.isAbsolute(r);
  });
}