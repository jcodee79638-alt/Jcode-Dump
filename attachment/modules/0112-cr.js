
class cr {
  static get decoder() {
    return k(this, "decoder", new TextDecoder());
  }
  static get encoder() {
    return k(this, "encoder", new TextEncoder());
  }
}