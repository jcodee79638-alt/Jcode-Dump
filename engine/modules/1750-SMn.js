
function SMn() {
  switch ("win32") {
    case "darwin":
      return "dylib";
    case "win32":
      return "dll";
    default:
      return "so";
  }
}