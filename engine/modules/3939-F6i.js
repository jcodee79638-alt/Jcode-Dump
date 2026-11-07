
function F6i(e, t) {
  if (t instanceof Error)
    (e.recordException({ name: t.name, message: t.message, stack: t.stack }),
      e.setStatus({ code: Aje.SpanStatusCode.ERROR, message: t.message }));
  else e.setStatus({ code: Aje.SpanStatusCode.ERROR });
}