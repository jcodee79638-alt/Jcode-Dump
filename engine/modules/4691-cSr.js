
var cSr = ne(() => {
  ZB();
  Uxr();
  CPe = class CPe {
    constructor(e, t) {
      ((this.iterator = e), (this.controller = t));
    }
    async *decoder() {
      let e = new lce();
      for await (let t of this.iterator) for (let r of e.decode(t)) yield JSON.parse(r);
      for (let t of e.flush()) yield JSON.parse(t);
    }
    [Symbol.asyncIterator]() {
      return this.decoder();
    }
    static fromResponse(e, t) {
      if (!e.body) {
        if ((t.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative"))
          throw new Cu(
            "The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api",
          );
        throw new Cu("Attempted to iterate over a response with no body");
      }
      return new CPe(pJe(e.body), t);
    }
  };
});