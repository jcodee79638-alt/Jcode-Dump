
function ca(e, t = process.env) {
  let n = process.platform === "win32" ? ["git.exe"] : ["git"],
    i =
      process.platform === "win32"
        ? [
            t.ProgramFiles && xe.default.join(t.ProgramFiles, "Git", "cmd"),
            t["ProgramFiles(x86)"] && xe.default.join(t["ProgramFiles(x86)"], "Git", "cmd"),
          ]
        : ["/usr/bin", "/usr/local/bin"];
  return [
    ...new Set(
      i
        .concat((t.PATH ?? t.Path ?? "").split(xe.default.delimiter))
        .filter((r) => typeof r === "string" && !!r)
        .map((r) => r.replace(/^"|"$/g, ""))
        .filter((r) => xe.default.isAbsolute(r) && !ds(e, xe.default.resolve(r)))
        .slice(0, 64)
        .flatMap((r) => n.map((s) => xe.default.join(r, s))),
    ),
  ];
}