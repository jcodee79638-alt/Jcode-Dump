
var FG = ne(() => {
  Gt();
  PMe();
  Cf();
  GS();
  FG();
  ((LIn = Cj(PH)),
    (JKs = E1(LIn)),
    (Cse = Kie(LIn)),
    (KKs = Jie(Qie)),
    (CMe = ks(re, PH)),
    (EIn = Ge("ProviderShared.systemUpdateText")(function* (e, t) {
      let r = [];
      for (let s of t.content) {
        if (!aWe(s, ["text"])) return yield* $Y(e, "system", ["text"]);
        r.push(s);
      }
      return r;
    })),
    (Vnr = Ge("ProviderShared.wrappedSystemUpdate")(function* (e, t) {
      let r = yield* EIn(e, t);
      return { type: "text", text: YKs(r), cache: r.at(-1)?.cache };
    })),
    (wMe = ["image/png", "image/jpeg", "image/gif", "image/webp"]),
    (ZKs = ["video/mp4", "video/webm", "video/quicktime"]),
    (ezs = ["audio/wav", "audio/mp3", "audio/aiff", "audio/aac", "audio/ogg", "audio/flac"]),
    (RRH = [...wMe, ...ZKs, ...ezs]),
    (tzs = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/),
    (v_t = Ge("ProviderShared.validateMedia")(function* (e, t, r) {
      let s = t.mediaType.toLowerCase();
      if (!r.has(s)) return yield* XS(`${e} does not support media type ${t.mediaType}`);
      let a;
      if (typeof t.data !== "string") {
        if (t.data.byteLength > x_t) return yield* XS(`${e} media exceeds the ${x_t} byte decoded limit`);
        a = Wnr.from(t.data).toString("base64");
      } else if (t.data.startsWith("data:")) {
        let u = /^data:([^;,]+);base64,([A-Za-z0-9+/]*={0,2})$/s.exec(t.data);
        if (!u) return yield* XS(`${e} media data URL must contain valid base64`);
        if (u[1].toLowerCase() !== s)
          return yield* XS(`${e} media type ${t.mediaType} does not match data URL type ${u[1]}`);
        a = u[2];
      } else a = t.data;
      if (Wnr.byteLength(a, "utf8") > hIn)
        return yield* XS(`${e} media exceeds the ${hIn} byte encoded limit`);
      if (!a || a.length % 4 !== 0 || !tzs.test(a)) return yield* XS(`${e} media must contain valid base64`);
      let H = Wnr.from(a, "base64");
      if (H.byteLength > x_t) return yield* XS(`${e} media exceeds the ${x_t} byte decoded limit`);
      if (H.toString("base64") !== a) return yield* XS(`${e} media must contain canonical base64`);
      return { mime: s, base64: a, dataUrl: `data:${s};base64,${a}`, bytes: H };
    })));
});