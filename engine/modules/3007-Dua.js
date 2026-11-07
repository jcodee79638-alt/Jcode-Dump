
function Dua(e, t, r) {
  let s = SEi(e, t, r);
  return {
    pid: s.pid,
    onData(a) {
      return s.onData(a);
    },
    onExit(a) {
      return s.onExit(a);
    },
    write(a) {
      s.write(a);
    },
    resize(a, H) {
      s.resize(a, H);
    },
    kill(a) {
      s.kill(a);
    },
  };
}