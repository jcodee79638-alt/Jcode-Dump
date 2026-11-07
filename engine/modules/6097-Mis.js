
var Mis = ne(() => {
  Gt();
  Cf();
  ((zoH =
    /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i),
    (QoH = /(?:^|,)\s*?no-transform\s*?(?:,|$)/i),
    (YoH = new Set(["/event", "/global/event"])),
    (ZoH = /^\/session\/[^/]+\/(?:message|prompt_async)$/));
  yis = Cde()((e) =>
    ft(function* () {
      let t = yield* e,
        r = yield* Md;
      if (r.method === "HEAD") return t;
      if (t.headers["content-encoding"]) return t;
      if (t.headers["transfer-encoding"]) return t;
      let s = t.body;
      if (s._tag !== "Uint8Array") return t;
      if (s.body.byteLength < eaH) return t;
      let a = t.headers["cache-control"];
      if (a && QoH.test(a)) return t;
      let H = raH(r.url);
      if (YoH.has(H)) return t;
      if (r.method === "POST" && ZoH.test(H)) return t;
      let u = s.contentType;
      if (!zoH.test(u)) return t;
      let f = taH(r.headers["accept-encoding"]);
      if (!f) return t;
      let d = f === "gzip" ? KoH(s.body) : JoH(s.body);
      return nse(ter(t, v1e(d, u)), "content-encoding", f);
    }),
  ).layer;
});