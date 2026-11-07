
class j {
  static get isLittleEndian() {
    const t = new Uint8Array(4);
    t[0] = 1;
    const e = new Uint32Array(t.buffer, 0, 1);
    return k(this, "isLittleEndian", e[0] === 1);
  }
  static get isOffscreenCanvasSupported() {
    return k(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas < "u");
  }
  static get isImageDecoderSupported() {
    return k(this, "isImageDecoderSupported", typeof ImageDecoder < "u");
  }
  static get isFloat16ArraySupported() {
    return k(this, "isFloat16ArraySupported", typeof Float16Array < "u");
  }
  static get isSanitizerSupported() {
    return k(this, "isSanitizerSupported", typeof Sanitizer < "u");
  }
  static get platform() {
    const { platform: t, userAgent: e } = navigator;
    return k(this, "platform", {
      isAndroid: e.includes("Android"),
      isLinux: t.includes("Linux"),
      isMac: t.includes("Mac"),
      isWindows: t.includes("Win"),
      isFirefox: e.includes("Firefox"),
    });
  }
  static get isCanvasFilterSupported() {
    let t;
    return (
      this.isOffscreenCanvasSupported
        ? (t = new OffscreenCanvas(1, 1).getContext("2d"))
        : typeof document < "u" && (t = document.createElement("canvas").getContext("2d")),
      k(this, "isCanvasFilterSupported", t?.filter !== void 0)
    );
  }
  static get isAlphaColorInputSupported() {
    if (typeof document > "u") return k(this, "isAlphaColorInputSupported", !1);
    const t = document.createElement("input");
    return (
      (t.type = "color"),
      t.setAttribute("alpha", ""),
      (t.value = "#ff000080"),
      k(this, "isAlphaColorInputSupported", t.value !== "#ff0000")
    );
  }
  static get isBackdropFilterSupported() {
    return k(
      this,
      "isBackdropFilterSupported",
      typeof CSS < "u" && CSS.supports("backdrop-filter", "blur(1px)"),
    );
  }
}