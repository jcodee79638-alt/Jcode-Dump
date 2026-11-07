
function ySa(e) {
  return e.pipeThrough(
    new TransformStream({
      transform(t, r) {
        switch (t.type) {
          case "finish":
            r.enqueue({ ...t, finishReason: T6i(t.finishReason), usage: v6i(t.usage) });
            break;
          default:
            r.enqueue(t);
            break;
        }
      },
    }),
  );
}