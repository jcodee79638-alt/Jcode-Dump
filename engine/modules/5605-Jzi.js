
var Jzi = ne(() => {
  (function (e) {
    ((e.Base32IncorrectEncoding = "B32_ENC_INVALID"),
      (e.DecodeTimeInvalidCharacter = "DEC_TIME_CHAR"),
      (e.DecodeTimeValueMalformed = "DEC_TIME_MALFORMED"),
      (e.EncodeTimeNegative = "ENC_TIME_NEG"),
      (e.EncodeTimeSizeExceeded = "ENC_TIME_SIZE_EXCEED"),
      (e.EncodeTimeValueMalformed = "ENC_TIME_MALFORMED"),
      (e.PRNGDetectFailure = "PRNG_DETECT"),
      (e.ULIDInvalid = "ULID_INVALID"),
      (e.Unexpected = "UNEXPECTED"),
      (e.UUIDInvalid = "UUID_INVALID"));
  })(u$e || (u$e = {}));
  $we = class $we extends Error {
    constructor(e, t) {
      super(`${t} (${e})`);
      ((this.name = "ULIDError"), (this.code = e));
    }
  };
});