
function jft(e) {
  let t = Sft(e);
  return (r, s) =>
    _1(t(Lo(r), s ?? VQt), (a) => {
      if (a._tag === "None") return bn(new hy(a));
      return Jt(a.value);
    });
}