
function G6i({ response: e, status: t, statusText: r, headers: s, textStream: a }) {
  q6i({
    response: e,
    status: t,
    statusText: r,
    headers: Object.fromEntries(V5e(s, { "content-type": "text/plain; charset=utf-8" }).entries()),
    stream: a.pipeThrough(new TextEncoderStream()),
  });
}