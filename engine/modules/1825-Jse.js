
var Jse = ne(() => {
  Jse();
  Gt();
  Hu();
  g_();
  Hu();
  ((Lxn = ua({ type: "file.edited", schema: { file: re } })),
    ($xn = { Edited: Lxn, Definitions: jl(Lxn) }),
    (xD = nt({ path: du, type: Jo(["file", "directory"]) }).annotate({ identifier: "FileSystem.Entry" })),
    (gxn = nt({ text: re, start: Ko, end: Ko }).annotate({ identifier: "FileSystem.Submatch" })),
    (Xse = nt({ entry: xD, line: qc, offset: Ko, text: re, submatches: On(gxn) }).annotate({
      identifier: "FileSystem.Match",
    })));
  Ght = class Ght extends (
    Pa("FileSystem.FindInput")({ query: re, type: Jo(["file", "directory"]).pipe(Gn), limit: qc.pipe(Gn) })
  ) {};
});