
function V6i({ status: e, statusText: t, headers: r, textStream: s }) {
  return new Response(s.pipeThrough(new TextEncoderStream()), {
    status: e != null ? e : 200,
    statusText: t,
    headers: V5e(r, { "content-type": "text/plain; charset=utf-8" }),
  });
}