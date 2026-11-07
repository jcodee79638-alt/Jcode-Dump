
class gyi {
  constructor(e, t, r) {
    ((this.decodeTree = e),
      (this.emitCodePoint = t),
      (this.errors = r),
      (this.state = lT.EntityStart),
      (this.consumed = 1),
      (this.result = 0),
      (this.treeIndex = 0),
      (this.excess = 1),
      (this.decodeMode = nhe.Strict));
  }
  startEntity(e) {
    ((this.decodeMode = e),
      (this.state = lT.EntityStart),
      (this.result = 0),
      (this.treeIndex = 0),
      (this.excess = 1),
      (this.consumed = 1));
  }
  write(e, t) {
    switch (this.state) {
      case lT.EntityStart: {
        if (e.charCodeAt(t) === fT.NUM)
          return ((this.state = lT.NumericStart), (this.consumed += 1), this.stateNumericStart(e, t + 1));
        return ((this.state = lT.NamedEntity), this.stateNamedEntity(e, t));
      }
      case lT.NumericStart:
        return this.stateNumericStart(e, t);
      case lT.NumericDecimal:
        return this.stateNumericDecimal(e, t);
      case lT.NumericHex:
        return this.stateNumericHex(e, t);
      case lT.NamedEntity:
        return this.stateNamedEntity(e, t);
    }
  }
  stateNumericStart(e, t) {
    if (t >= e.length) return -1;
    if ((e.charCodeAt(t) | j_a) === fT.LOWER_X)
      return ((this.state = lT.NumericHex), (this.consumed += 1), this.stateNumericHex(e, t + 1));
    return ((this.state = lT.NumericDecimal), this.stateNumericDecimal(e, t));
  }
  addToNumericResult(e, t, r, s) {
    if (t !== r) {
      let a = r - t;
      ((this.result = this.result * Math.pow(s, a) + parseInt(e.substr(t, a), s)), (this.consumed += a));
    }
  }
  stateNumericHex(e, t) {
    let r = t;
    while (t < e.length) {
      let s = e.charCodeAt(t);
      if (M$r(s) || P_a(s)) t += 1;
      else return (this.addToNumericResult(e, r, t, 16), this.emitNumericEntity(s, 3));
    }
    return (this.addToNumericResult(e, r, t, 16), -1);
  }
  stateNumericDecimal(e, t) {
    let r = t;
    while (t < e.length) {
      let s = e.charCodeAt(t);
      if (M$r(s)) t += 1;
      else return (this.addToNumericResult(e, r, t, 10), this.emitNumericEntity(s, 2));
    }
    return (this.addToNumericResult(e, r, t, 10), -1);
  }
  emitNumericEntity(e, t) {
    var r;
    if (this.consumed <= t)
      return (
        (r = this.errors) === null ||
          r === void 0 ||
          r.absenceOfDigitsInNumericCharacterReference(this.consumed),
        0
      );
    if (e === fT.SEMI) this.consumed += 1;
    else if (this.decodeMode === nhe.Strict) return 0;
    if ((this.emitCodePoint(rGe(this.result), this.consumed), this.errors)) {
      if (e !== fT.SEMI) this.errors.missingSemicolonAfterCharacterReference();
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  stateNamedEntity(e, t) {
    let { decodeTree: r } = this,
      s = r[this.treeIndex],
      a = (s & PB.VALUE_LENGTH) >> 14;
    for (; t < e.length; t++, this.excess++) {
      let H = e.charCodeAt(t);
      if (((this.treeIndex = x$r(r, s, this.treeIndex + Math.max(1, a), H)), this.treeIndex < 0))
        return this.result === 0 || (this.decodeMode === nhe.Attribute && (a === 0 || w_a(H)))
          ? 0
          : this.emitNotTerminatedNamedEntity();
      if (((s = r[this.treeIndex]), (a = (s & PB.VALUE_LENGTH) >> 14), a !== 0)) {
        if (H === fT.SEMI) return this.emitNamedEntityData(this.treeIndex, a, this.consumed + this.excess);
        if (this.decodeMode !== nhe.Strict)
          ((this.result = this.treeIndex), (this.consumed += this.excess), (this.excess = 0));
      }
    }
    return -1;
  }
  emitNotTerminatedNamedEntity() {
    var e;
    let { result: t, decodeTree: r } = this,
      s = (r[t] & PB.VALUE_LENGTH) >> 14;
    return (
      this.emitNamedEntityData(t, s, this.consumed),
      (e = this.errors) === null || e === void 0 || e.missingSemicolonAfterCharacterReference(),
      this.consumed
    );
  }
  emitNamedEntityData(e, t, r) {
    let { decodeTree: s } = this;
    if ((this.emitCodePoint(t === 1 ? s[e] & ~PB.VALUE_LENGTH : s[e + 1], r), t === 3))
      this.emitCodePoint(s[e + 2], r);
    return r;
  }
  end() {
    var e;
    switch (this.state) {
      case lT.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== nhe.Attribute || this.result === this.treeIndex)
          ? this.emitNotTerminatedNamedEntity()
          : 0;
      case lT.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case lT.NumericHex:
        return this.emitNumericEntity(0, 3);
      case lT.NumericStart:
        return (
          (e = this.errors) === null ||
            e === void 0 ||
            e.absenceOfDigitsInNumericCharacterReference(this.consumed),
          0
        );
      case lT.EntityStart:
        return 0;
    }
  }
}