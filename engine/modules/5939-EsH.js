
function EsH(e) {
  let t = new URL(e.url, "http://localhost").searchParams,
    r = t.get("location[workspace]") || e.headers["x-opencode-workspace"],
    s =
      t.get("location[directory]") ||
      (e.headers["x-opencode-directory"] ? IsH(e.headers["x-opencode-directory"]) : process.cwd());
  return Rv.make({ directory: bo.make(s), workspaceID: r ? YS.make(r) : void 0 });
}