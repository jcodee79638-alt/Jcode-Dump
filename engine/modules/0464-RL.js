
var RL =
  (e, t) =>
  (r, [s]) => {
    let a = "Unknown";
    switch (r.code) {
      case "ENOENT":
        a = "NotFound";
        break;
      case "EACCES":
        a = "PermissionDenied";
        break;
      case "EEXIST":
        a = "AlreadyExists";
        break;
      case "EISDIR":
        a = "BadResource";
        break;
      case "ENOTDIR":
        a = "BadResource";
        break;
      case "EBUSY":
        a = "Busy";
        break;
      case "ELOOP":
        a = "BadResource";
        break;
    }
    return YC({ _tag: a, module: e, method: t, pathOrDescriptor: s, syscall: r.syscall, cause: r });
  };