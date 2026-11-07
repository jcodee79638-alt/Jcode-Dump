
var b5n = ne(() => {
  M5n();
  v5n();
  p0t = {
    serializeRequest: (e) => {
      let t = y5n(e, T5n);
      return new TextEncoder().encode(JSON.stringify(t));
    },
    deserializeResponse: (e) => {
      if (e.length === 0) return {};
      return JSON.parse(new TextDecoder().decode(e));
    },
  };
});