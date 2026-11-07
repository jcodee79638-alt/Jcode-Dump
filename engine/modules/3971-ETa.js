
function ETa({ status: e, statusText: t, headers: r, stream: s, consumeSseStream: a }) {
  let H = s.pipeThrough(new X6i());
  if (a) {
    let [u, f] = H.tee();
    ((H = u), a({ stream: f }));
  }
  return new Response(H.pipeThrough(new TextEncoderStream()), {
    status: e,
    statusText: t,
    headers: V5e(r, J6i),
  });
}