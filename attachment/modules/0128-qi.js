
class qi {
  #t = Object.freeze({ cMapUrl: "CMap", standardFontDataUrl: "font", wasmUrl: "wasm" });
  constructor({ cMapUrl: t = null, standardFontDataUrl: e = null, wasmUrl: s = null }) {
    ((this.cMapUrl = t), (this.standardFontDataUrl = e), (this.wasmUrl = s));
  }
  async fetch({ kind: t, filename: e }) {
    switch (t) {
      case "cMapUrl":
      case "standardFontDataUrl":
      case "wasmUrl":
        break;
      default:
        $(`Not implemented: ${t}`);
    }
    const s = this[t];
    if (!s) throw new Error(`Ensure that the \`${t}\` API parameter is provided.`);
    const i = `${s}${e}`;
    return this._fetch(i, t).catch((n) => {
      throw new Error(`Unable to load ${this.#t[t]} data at: ${i}`);
    });
  }
  async _fetch(t, e) {
    $("Abstract method `_fetch` called.");
  }
}