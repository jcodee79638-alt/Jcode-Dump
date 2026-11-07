
var Yes = ne(async () => {
  BA();
  Gt();
  $H();
  xx();
  jT();
  await Jn([ek(), bT(), Tx()]);
  ((zes = nt({ ...Tb, path: re })),
    (ciH = nt({ ...Tb, pattern: re })),
    (AiH = nt({
      ...Tb,
      query: re,
      dirs: be(Jo(["true", "false"])),
      type: be(Jo(["file", "directory"])),
      limit: be(O6.check(ARe(), pG(1), zie(200))),
    })),
    (uiH = nt({ ...Tb, query: re })),
    (liH = nt({
      path: nt({ text: re }),
      lines: nt({ text: re }),
      line_number: Ko,
      absolute_offset: Ko,
      submatches: On(nt({ match: nt({ text: re }), start: Ko, end: Ko })),
    })),
    (fiH = nt({ name: re, path: re, absolute: re, type: Jo(["file", "directory"]), ignored: Vi }).annotate({
      identifier: "FileNode",
    })),
    (piH = nt({
      type: Jo(["text", "binary"]),
      content: re,
      diff: be(re),
      patch: be(
        nt({
          oldFileName: re,
          newFileName: re,
          oldHeader: be(re),
          newHeader: be(re),
          hunks: On(nt({ oldStart: Ko, oldLines: Ko, newStart: Ko, newLines: Ko, lines: On(re) })),
          index: be(re),
        }),
      ),
      encoding: be(ri("base64")),
      mimeType: be(re),
    }).annotate({ identifier: "FileContent" })),
    (diH = nt({ path: re, added: Ko, removed: Ko, status: Jo(["added", "deleted", "modified"]) }).annotate({
      identifier: "File",
    })),
    (Vwe = {
      findText: "/find",
      findFile: "/find/file",
      findSymbol: "/find/symbol",
      list: "/file",
      content: "/file/content",
      status: "/file/status",
    }),
    (Qes = kE("file")
      .add(
        zd("file")
          .add(
            MH("findText", Vwe.findText, { query: ciH, success: zs(On(liH), "Matches") }).annotateMerge(
              Fn({
                identifier: "find.text",
                summary: "Find text",
                description: "Search for text patterns across files in the project using ripgrep.",
              }),
            ),
            MH("findFile", Vwe.findFile, { query: AiH, success: zs(On(re), "File paths") }).annotateMerge(
              Fn({
                identifier: "find.files",
                summary: "Find files",
                description: "Search for files or directories by name or pattern in the project directory.",
              }),
            ),
            MH("findSymbol", Vwe.findSymbol, { query: uiH, success: zs(On(y5a), "Symbols") }).annotateMerge(
              Fn({
                identifier: "find.symbols",
                summary: "Find symbols",
                description: "Search for workspace symbols like functions, classes, and variables using LSP.",
              }),
            ),
            MH("list", Vwe.list, { query: zes, success: zs(On(fiH), "Files and directories") }).annotateMerge(
              Fn({
                identifier: "file.list",
                summary: "List files",
                description: "List files and directories in a specified path.",
              }),
            ),
            MH("content", Vwe.content, { query: zes, success: zs(piH, "File content") }).annotateMerge(
              Fn({
                identifier: "file.read",
                summary: "Read file",
                description: "Read the content of a specified file.",
              }),
            ),
            MH("status", Vwe.status, { query: jo, success: zs(On(diH), "File status") }).annotateMerge(
              Fn({
                identifier: "file.status",
                summary: "Get file status",
                description: "Get the git status of all files in the project.",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "file", description: "Experimental HttpApi file routes." }))
          .middleware(Fm)
          .middleware(Nm)
          .middleware(tm),
      )
      .annotateMerge(
        Fn({
          title: "opencode experimental HttpApi",
          version: "0.0.1",
          description: "Experimental HttpApi surface for selected instance routes.",
        }),
      )));
});