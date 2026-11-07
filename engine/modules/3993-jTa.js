
function jTa(e) {
  let t = void 0,
    r = "",
    s = "",
    a = void 0,
    H = "";
  function u({ controller: f, partialOutput: d = void 0 }) {
    (f.enqueue({ part: { type: "text-delta", id: t, text: s, providerMetadata: a }, partialOutput: d }),
      (s = ""));
  }
  return new TransformStream({
    async transform(f, d) {
      var _;
      if (f.type === "finish-step" && s.length > 0) u({ controller: d });
      if (f.type !== "text-delta" && f.type !== "text-start" && f.type !== "text-end") {
        d.enqueue({ part: f, partialOutput: void 0 });
        return;
      }
      if (t == null) t = f.id;
      else if (f.id !== t) {
        d.enqueue({ part: f, partialOutput: void 0 });
        return;
      }
      if (f.type === "text-start") {
        d.enqueue({ part: f, partialOutput: void 0 });
        return;
      }
      if (f.type === "text-end") {
        if (s.length > 0) u({ controller: d });
        d.enqueue({ part: f, partialOutput: void 0 });
        return;
      }
      ((r += f.text), (s += f.text), (a = (_ = f.providerMetadata) != null ? _ : a));
      let L = await e.parsePartialOutput({ text: r });
      if (L !== void 0) {
        let I = typeof L.partial === "string" ? L.partial : JSON.stringify(L.partial);
        if (I !== H) (u({ controller: d, partialOutput: L.partial }), (H = I));
      }
    },
  });
}