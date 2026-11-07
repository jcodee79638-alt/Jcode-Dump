
async function ZMr() {
  if (I2a.platform !== "darwin") throw Error("macOS only");
  let { stdout: e } = await y2a("defaults", [
      "read",
      "com.apple.LaunchServices/com.apple.launchservices.secure",
      "LSHandlers",
    ]),
    r =
      /LSHandlerRoleAll = "(?!-)(?<id>[^"]+?)";\s+?LSHandlerURLScheme = (?:http|https);/.exec(e)?.groups.id ??
      "com.apple.Safari";
  if (r === "com.apple.safari") return "com.apple.Safari";
  return r;
}