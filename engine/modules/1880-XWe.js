
var XWe = ne(async () => {
  OH();
  Gt();
  await Jn([XWe(), Kv()]);
  hLt = class hLt extends ki()("Image.ResizerUnavailableError", {}) {};
  LLt = class LLt extends ki()("Image.DecodeError", { resource: re }) {
    get message() {
      return `Image could not be decoded: ${this.resource}`;
    }
  };
  GWe = class GWe extends (
    ki()("Image.SizeError", {
      resource: re,
      width: Aa,
      height: Aa,
      bytes: Aa,
      maxWidth: Aa,
      maxHeight: Aa,
      maxBytes: Aa,
    })
  ) {
    get message() {
      return `Image ${this.resource} is ${this.width}x${this.height} with base64 size ${this.bytes}, exceeding configured limits ${this.maxWidth}x${this.maxHeight}/${this.maxBytes} bytes`;
    }
  };
  JWe = class JWe extends _i()("@opencode/Image") {};
  ((mTn = Es(
    JWe,
    ft(function* () {
      let e = yield* ZM,
        t = yield* pD(
          bl({ try: () => dTn().then(() => pTn), catch: () => new hLt() }).pipe(Hi((s) => s.make)),
        ),
        r = Ge("Image.normalize")(function* (s, a) {
          let H = Object.assign(
            {},
            ...(yield* e.entries()).flatMap((f) =>
              f.type === "document" && f.info.attachments?.image ? [f.info.attachments.image] : [],
            ),
          );
          return yield* (yield* t)(s, a, {
            autoResize: H.auto_resize ?? !0,
            maxWidth: H.max_width ?? 2000,
            maxHeight: H.max_height ?? 2000,
            maxBase64Bytes: H.max_base64_bytes ?? 5242880,
          });
        });
      return JWe.of({ normalize: r });
    }),
  )),
    (FXH = mTn.pipe(ou(Nht))),
    (_Tn = Ua({ service: JWe, layer: mTn, deps: [PY] })));
});
import wY from "path";