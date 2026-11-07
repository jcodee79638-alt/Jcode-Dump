
function Nq(e, t) {
  let r = e.prepare(t);
  try {
    return r.all();
  } finally {
    r.finalize();
  }
}