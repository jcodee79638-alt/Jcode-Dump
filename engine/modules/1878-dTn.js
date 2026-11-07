
var dTn = ne(async () => {
  HTn();
  Gt();
  await XWe();
  ((Bao = [80, 85, 70, 55, 40]),
    (Rao = ft(function* () {
      globalThis.__OPENCODE_PHOTON_WASM_PATH = Nao.isAbsolute(fLt) ? fLt : Fao(new URL(fLt, import.meta.url));
      let e = yield* pD(
        bl({ try: () => Promise.resolve().then(() => Tl(fTn(), 1)), catch: () => new hLt() }),
      );
      return Ge("Image.Photon.normalize")(function* (t, r, s) {
        let a = yield* e,
          H = yield* ZA({
            try: () => a.PhotonImage.new_from_byteslice(Buffer.from(r.content, "base64")),
            catch: () => new LLt({ resource: t }),
          });
        try {
          let u = H.get_width(),
            f = H.get_height(),
            d = Buffer.byteLength(r.content, "utf-8");
          if (u <= s.maxWidth && f <= s.maxHeight && d <= s.maxBase64Bytes) return r;
          if (!s.autoResize)
            return yield* new GWe({
              resource: t,
              width: u,
              height: f,
              bytes: d,
              maxWidth: s.maxWidth,
              maxHeight: s.maxHeight,
              maxBytes: s.maxBase64Bytes,
            });
          let _ = Math.min(1, s.maxWidth / u, s.maxHeight / f),
            L = Array.from({ length: 32 }).reduce((I) => {
              let D = I.at(-1) ?? {
                  width: Math.max(1, Math.round(u * _)),
                  height: Math.max(1, Math.round(f * _)),
                },
                S =
                  I.length === 0
                    ? D
                    : {
                        width: D.width === 1 ? 1 : Math.max(1, Math.floor(D.width * 0.75)),
                        height: D.height === 1 ? 1 : Math.max(1, Math.floor(D.height * 0.75)),
                      };
              return I.some((T) => T.width === S.width && T.height === S.height) ? I : [...I, S];
            }, []);
          for (let I of L) {
            let D = a.resize(H, I.width, I.height, a.SamplingFilter.Lanczos3);
            try {
              let S = [
                ["image/png", () => D.get_bytes()],
                ...Bao.map((T) => ["image/jpeg", () => D.get_bytes_jpeg(T)]),
              ];
              for (let [T, C] of S) {
                let O = Buffer.from(C()).toString("base64");
                if (Buffer.byteLength(O, "utf-8") <= s.maxBase64Bytes)
                  return { ...r, content: O, encoding: "base64", mime: T };
              }
            } finally {
              D.free();
            }
          }
          return yield* new GWe({
            resource: t,
            width: u,
            height: f,
            bytes: d,
            maxWidth: s.maxWidth,
            maxHeight: s.maxHeight,
            maxBytes: s.maxBase64Bytes,
          });
        } finally {
          H.free();
        }
      });
    })));
});