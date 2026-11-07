
var WIr = ne(() => {
  RIr();
  P5e = class P5e extends TransformStream {
    constructor({ onError: e, onRetry: t, onComment: r, maxBufferSize: s } = {}) {
      let a;
      super({
        start(H) {
          a = STt({
            onEvent: (u) => {
              H.enqueue(u);
            },
            onError(u) {
              (typeof e == "function" && e(u),
                (e === "terminate" || u.type === "max-buffer-size-exceeded") && H.error(u));
            },
            onRetry: t,
            onComment: r,
            maxBufferSize: s,
          });
        },
        transform(H) {
          a.feed(H);
        },
      });
    }
  };
});