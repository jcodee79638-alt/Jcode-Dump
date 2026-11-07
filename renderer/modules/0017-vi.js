
function vi(e, n, i) {
  let s = e.value;
  return (
    (!e.comparator || !e.comparator(s, n)) &&
      ((e.value = n),
      e.observers &&
        e.observers.length &&
        $n(() => {
          for (let l = 0; l < e.observers.length; l += 1) {
            const a = e.observers[l],
              c = vr && vr.running;
            (c && vr.disposed.has(a),
              (c ? !a.tState : !a.state) && (a.pure ? et.push(a) : Pt.push(a), a.observers && $i(a)),
              c || (a.state = Nt));
          }
          if (et.length > 1e6) throw ((et = []), new Error());
        }, !1)),
    n
  );
}