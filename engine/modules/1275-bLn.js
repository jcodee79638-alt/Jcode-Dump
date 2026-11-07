
var bLn = ne(() => {
  Yu();
  Ov();
  AV = { cause: yd(), message: be(re), operation: be(re) };
  mmt = class mmt extends ki("effect/sql/SqlError/ConnectionError")("ConnectionError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !0;
    }
  };
  _mt = class _mt extends ki("effect/sql/SqlError/AuthenticationError")("AuthenticationError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !1;
    }
  };
  hmt = class hmt extends ki("effect/sql/SqlError/AuthorizationError")("AuthorizationError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !1;
    }
  };
  xLn = class xLn extends ki("effect/sql/SqlError/SqlSyntaxError")("SqlSyntaxError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !1;
    }
  };
  Cqs = { ...AV, constraint: re };
  yrr = class yrr extends ki("effect/sql/SqlError/UniqueViolation")("UniqueViolation", Cqs) {
    [ID] = ID;
    get isRetryable() {
      return !1;
    }
  };
  Lmt = class Lmt extends ki("effect/sql/SqlError/ConstraintError")("ConstraintError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !1;
    }
  };
  SLn = class SLn extends ki("effect/sql/SqlError/DeadlockError")("DeadlockError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !0;
    }
  };
  TLn = class TLn extends ki("effect/sql/SqlError/SerializationError")("SerializationError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !0;
    }
  };
  $mt = class $mt extends ki("effect/sql/SqlError/LockTimeoutError")("LockTimeoutError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !0;
    }
  };
  vLn = class vLn extends ki("effect/sql/SqlError/StatementTimeoutError")("StatementTimeoutError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !0;
    }
  };
  gmt = class gmt extends ki("effect/sql/SqlError/UnknownError")("UnknownError", AV) {
    [ID] = ID;
    get isRetryable() {
      return !1;
    }
  };
  wqs = Io([mmt, _mt, hmt, xLn, yrr, Lmt, SLn, TLn, $mt, vLn, gmt]);
  dMe = class dMe extends ki("effect/sql/SqlError")("SqlError", { reason: wqs }) {
    [yLn] = yLn;
    cause = this.reason;
    get message() {
      return this.reason.message || this.reason._tag;
    }
    get isRetryable() {
      return this.reason.isRetryable;
    }
  };
});