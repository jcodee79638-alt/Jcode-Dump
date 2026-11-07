
var Ljt = ne(() => {
  au();
  Gt();
  BDr();
  Ljt();
  vxr = class vxr extends ki()("ImageResizerUnavailableError", {}) {
    get message() {
      return "Prepare this image using Jac Code's attachment picker.";
    }
  };
  vBa = class vBa extends ki()("ImageInvalidDataUrlError", { url: re }) {
    get message() {
      return "Image URL must be a bounded inline image";
    }
  };
  Y3i = class Y3i extends ki()("ImageDecodeError", {}) {
    get message() {
      return "This image could not be read safely. Upload it through Jac Code's attachment picker.";
    }
  };
  bBa = class bBa extends (
    ki()("ImageSizeError", { bytes: Aa, max: Aa, width: Aa, height: Aa, max_width: Aa, max_height: Aa })
  ) {
    get message() {
      return "Prepare a smaller image using Jac Code's attachment picker.";
    }
  };
  nJe = class nJe extends _i()("@opencode/Image") {};
  ((jBa = bf(nJe, {
    normalize: (e) =>
      ZA({
        try: () => {
          if (KTt(e.url).mime !== e.mime) throw Error("Invalid image");
          return e;
        },
        catch: () => new Y3i(),
      }),
  })),
    (Z3i = Ll({ service: nJe, layer: jBa, deps: [] })));
});