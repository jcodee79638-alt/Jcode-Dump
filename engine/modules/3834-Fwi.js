
function Fwi({ stream: e, schema: t }) {
  return e
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new P5e())
    .pipeThrough(
      new TransformStream({
        async transform({ data: r }, s) {
          if (r === "[DONE]") return;
          s.enqueue(await LP({ text: r, schema: t }));
        },
      }),
    );
}