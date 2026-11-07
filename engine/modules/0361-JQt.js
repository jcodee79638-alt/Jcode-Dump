
class JQt {
  parameter;
  type;
  merge;
  constructor(e, t, r) {
    if (((this.parameter = e), (this.type = t), (this.merge = r), h1(t) && !Pan(t)))
      throw Error("Cannot use `Schema.optionalKey` with index signatures, use `Schema.optional` instead.");
  }
}