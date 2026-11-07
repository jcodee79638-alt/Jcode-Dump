
function t3s(e) {
  switch (e._tag) {
    case "ReachedLimit":
      switch (e.limit) {
        case "MaxParts":
          return Ey.fromReason("TooManyParts", e);
        case "MaxFieldSize":
          return Ey.fromReason("FieldTooLarge", e);
        case "MaxPartSize":
          return Ey.fromReason("FileTooLarge", e);
        case "MaxTotalSize":
          return Ey.fromReason("BodyTooLarge", e);
      }
    default:
      return Ey.fromReason("Parse", e);
  }
}