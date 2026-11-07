
function YZs(e) {
  switch (e) {
    case "x64":
    case "amd64":
      return "x86_64";
    case "arm64":
      return "aarch64";
    case "arm":
      return "arm";
    default:
      throw Error(`Unsupported architecture: ${e}`);
  }
}