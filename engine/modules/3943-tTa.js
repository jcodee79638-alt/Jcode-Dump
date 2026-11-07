
function tTa() {
  let e = eTa();
  return (t) => {
    let r = Che(t),
      s = [...e, ...r];
    function a(H) {
      let u = s.map(H).filter(Boolean);
      return async (f) => {
        for (let d of u)
          try {
            await d(f);
          } catch (_) {}
      };
    }
    return {
      onStart: a((H) => H.onStart),
      onStepStart: a((H) => H.onStepStart),
      onToolCallStart: a((H) => H.onToolCallStart),
      onToolCallFinish: a((H) => H.onToolCallFinish),
      onStepFinish: a((H) => H.onStepFinish),
      onFinish: a((H) => H.onFinish),
    };
  };
}