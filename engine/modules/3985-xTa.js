
function xTa({
  messageId: e,
  originalMessages: t = [],
  onStepFinish: r,
  onFinish: s,
  onError: a,
  stream: H,
}) {
  let u = t == null ? void 0 : t[t.length - 1];
  if ((u == null ? void 0 : u.role) !== "assistant") u = void 0;
  else e = u.id;
  let f = !1,
    d = H.pipeThrough(
      new TransformStream({
        transform(T, C) {
          if (T.type === "start") {
            let O = T;
            if (O.messageId == null && e != null) O.messageId = e;
          }
          if (T.type === "abort") f = !0;
          C.enqueue(T);
        },
      }),
    );
  if (s == null && r == null) return d;
  let _ = yTa({ lastMessage: u ? structuredClone(u) : void 0, messageId: e != null ? e : "" }),
    L = async (T) => {
      await T({ state: _, write: () => {} });
    },
    I = !1,
    D = async () => {
      if (I || !s) return;
      I = !0;
      let T = _.message.id === (u == null ? void 0 : u.id);
      await s({
        isAborted: f,
        isContinuation: T,
        responseMessage: _.message,
        messages: [...(T ? t.slice(0, -1) : t), _.message],
        finishReason: _.finishReason,
      });
    },
    S = async () => {
      if (!r) return;
      let T = _.message.id === (u == null ? void 0 : u.id);
      try {
        await r({
          isContinuation: T,
          responseMessage: structuredClone(_.message),
          messages: [...(T ? t.slice(0, -1) : t), structuredClone(_.message)],
        });
      } catch (C) {
        a(C);
      }
    };
  return MTa({ stream: d, runUpdateMessageJob: L, onError: a }).pipeThrough(
    new TransformStream({
      async transform(T, C) {
        if (T.type === "finish-step") await S();
        C.enqueue(T);
      },
      async cancel() {
        await D();
      },
      async flush() {
        await D();
      },
    }),
  );
}