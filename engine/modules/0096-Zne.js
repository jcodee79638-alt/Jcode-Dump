
function Zne(e, t) {
  let r = e.prepare(t);
  try {
    return r.get();
  } finally {
    r.finalize();
  }
}