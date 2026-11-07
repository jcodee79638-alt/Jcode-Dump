
class Xft {
  _tag = "ConfigError";
  name = "ConfigError";
  cause;
  constructor(e) {
    this.cause = e;
  }
  get message() {
    return this.cause.toString();
  }
  toString() {
    return `ConfigError(${this.message})`;
  }
}