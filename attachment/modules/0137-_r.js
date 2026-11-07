
class _r extends Qi {
  _createCanvas(t, e) {
    return process
      .getBuiltinModule("module")
      .createRequire(import.meta.url)("@napi-rs/canvas")
      .createCanvas(t, e);
  }
}