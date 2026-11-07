
function STa({ response: e, status: t, statusText: r, headers: s, stream: a, consumeSseStream: H }) {
  let u = a.pipeThrough(new X6i());
  if (H) {
    let [f, d] = u.tee();
    ((u = f), H({ stream: d }));
  }
  q6i({
    response: e,
    status: t,
    statusText: r,
    headers: Object.fromEntries(V5e(s, J6i).entries()),
    stream: u.pipeThrough(new TextEncoderStream()),
  });
}