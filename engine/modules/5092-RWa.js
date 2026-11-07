
function RWa(e, t, r) {
  let s = (a) => !r || r.has(a);
  switch (e) {
    case "runReadFile":
      return { toolName: "read", args: { filePath: kze(t.filepath, "filepath") } };
    case "runReadFiles": {
      let a = (t.filepaths ?? []).map((H) => kze(H, "filepath"));
      if (a.length <= 1) return { toolName: "read", args: { filePath: a[0] ?? "" } };
      return { toolName: "read", args: { filePaths: a } };
    }
    case "runWriteFile": {
      let a = kze(t.filepath, "filepath");
      if (s("write")) return { toolName: "write", args: { filePath: a, content: t.contents } };
      let H = String(t.filepath ?? ""),
        u = String(t.contents ?? "");
      return {
        toolName: "apply_patch",
        args: {
          patchText: [
            "*** Begin Patch",
            `*** Add File: ${H}`,
            ...u
              .split(
                `
`,
              )
              .map((d) => `+${d}`),
            "*** End Patch",
          ].join(`
`),
        },
      };
    }
    case "runEditFile": {
      let a = String(t.oldString ?? t.old_string ?? ""),
        H = String(t.newString ?? t.new_string ?? ""),
        u = kze(t.filepath, "filepath");
      if (s("edit")) return { toolName: "edit", args: { filePath: u, oldString: a, newString: H } };
      let f = String(t.filepath ?? ""),
        d = a,
        _ = H,
        L = d.split(`
`),
        I = _.split(`
`);
      return {
        toolName: "apply_patch",
        args: {
          patchText: [
            "*** Begin Patch",
            `*** Update File: ${f}`,
            "@@",
            ...L.map((S) => `-${S}`),
            ...I.map((S) => `+${S}`),
            "*** End Patch",
          ].join(`
`),
        },
      };
    }
    case "runShellCommand": {
      let a = t.command;
      if (!a || typeof a !== "string")
        throw new Ca({ message: "runShellCommand: command is required and must be a string" });
      if (a.length > 1e4)
        throw new Ca({ message: "runShellCommand: command exceeds maximum length of 10000 characters" });
      return { toolName: "bash", args: { command: a, description: "DWS shell command" } };
    }
    case "runCommand": {
      let a = t.program;
      if (!a || typeof a !== "string")
        throw new Ca({ message: "runCommand: program is required and must be a string" });
      wze(a, "program");
      let H = t.flags ?? [],
        u = t.arguments ?? [];
      for (let f of H) if (typeof f === "string") wze(f, "flag");
      for (let f of u) if (typeof f === "string") wze(f, "argument");
      return {
        toolName: "bash",
        args: { command: [a, ...H, ...u].map((f) => gCe(String(f))).join(" "), description: `DWS run: ${a}` },
      };
    }
    case "runGitCommand": {
      let a = t.command;
      if (!a || typeof a !== "string")
        throw new Ca({ message: "runGitCommand: command is required and must be a string" });
      wze(a, "git command");
      let H = t.arguments ?? [];
      for (let u of H) if (typeof u === "string") wze(u, "git argument");
      return {
        toolName: "bash",
        args: {
          command: ["git", a, ...H].map((u) => gCe(String(u))).join(" "),
          description: `DWS git: ${a}`,
        },
      };
    }
    case "listDirectory":
      return { toolName: "read", args: { filePath: kze(t.directory ?? ".", "directory") } };
    case "findFiles":
      return { toolName: "glob", args: { pattern: t.name_pattern ?? t.namePattern } };
    case "grep":
      return {
        toolName: "grep",
        args: { pattern: t.pattern, path: t.search_directory ?? t.searchDirectory },
      };
    case "mkdir": {
      let a = String(t.directory_path ?? t.directoryPath ?? "");
      if (!a) throw new Ca({ message: "mkdir: directory_path is required" });
      if (a.includes("\x00")) throw new Ca({ message: "mkdir: directory_path contains null bytes" });
      return { toolName: "bash", args: { command: `mkdir -p ${gCe(a)}`, description: "DWS mkdir" } };
    }
    case "runHTTPRequest": {
      let a = String(t.method ?? "GET").toUpperCase();
      if (!["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"].includes(a))
        throw new Ca({ message: `runHTTPRequest: invalid HTTP method '${a}'` });
      let u = String(t.path ?? "");
      if (!u) throw new Ca({ message: "runHTTPRequest: path is required" });
      let f = null;
      try {
        f = new URL(u);
      } catch {
        f = null;
      }
      if (f) {
        if (!BWa.includes(f.protocol))
          throw new Ca({
            message: `runHTTPRequest: only http:// and https:// schemes are allowed, got '${f.protocol}'`,
          });
      } else if (!u.startsWith("/"))
        throw new Ca({
          message: `runHTTPRequest: only http:// and https:// schemes are allowed, got a non-URL value '${u}' (curl would guess the protocol)`,
        });
      let d = gCe(a),
        _ = gCe(u),
        L = t.body ? ` -d ${gCe(String(t.body))}` : "";
      return {
        toolName: "bash",
        args: { command: `curl -s -X ${d} -- ${_}${L}`, description: `DWS HTTP ${a}` },
      };
    }
    default:
      return { toolName: e, args: t };
  }
}