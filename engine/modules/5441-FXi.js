
var FXi = ne(async () => {
  Gt();
  OXi();
  Ql();
  Vce();
  jA();
  await Jn([Vy(), ek()]);
  ((mJa = [
    "goToDefinition",
    "findReferences",
    "hover",
    "documentSymbol",
    "workspaceSymbol",
    "goToImplementation",
    "prepareCallHierarchy",
    "incomingCalls",
    "outgoingCalls",
  ]),
    (_Ja = nt({
      operation: Jo(mJa).annotate({ description: "The LSP operation to perform" }),
      filePath: re.annotate({ description: "The absolute or relative path to the file" }),
      line: DI.check(pG(1)).annotate({ description: "The line number (1-based, as shown in editors)" }),
      character: DI.check(pG(1)).annotate({
        description: "The character offset (1-based, as shown in editors)",
      }),
      query: be(re).annotate({
        description: "Search query for workspaceSymbol. Empty string requests all symbols.",
      }),
    })),
    (NXi = t_(
      "lsp",
      ft(function* () {
        let e = yield* fR,
          t = yield* ui.Service;
        return {
          description: UXi,
          parameters: _Ja,
          execute: (r, s) =>
            ft(function* () {
              let a = yield* Jc,
                H = Rjr.isAbsolute(r.filePath) ? r.filePath : Rjr.join(a.directory, r.filePath);
              yield* tk(s, H);
              let u =
                r.operation === "workspaceSymbol"
                  ? { operation: r.operation }
                  : r.operation === "documentSymbol"
                    ? { operation: r.operation, filePath: H }
                    : { operation: r.operation, filePath: H, line: r.line, character: r.character };
              yield* s.ask({ permission: "lsp", patterns: ["*"], always: ["*"], metadata: u });
              let f = dJa(H).href,
                d = { file: H, line: r.line - 1, character: r.character - 1 },
                _ = Rjr.relative(a.worktree, H),
                L =
                  r.operation === "workspaceSymbol"
                    ? ""
                    : r.operation === "documentSymbol"
                      ? _
                      : `${_}:${r.line}:${r.character}`,
                I = L ? `${r.operation} ${L}` : r.operation;
              if (!(yield* t.existsSafe(H))) throw Error(`File not found: ${H}`);
              if (!(yield* e.hasClients(H))) throw Error("No LSP server available for this file type.");
              yield* e.touchFile(H, "document");
              let T = yield* (() => {
                switch (r.operation) {
                  case "goToDefinition":
                    return e.definition(d);
                  case "findReferences":
                    return e.references(d);
                  case "hover":
                    return e.hover(d);
                  case "documentSymbol":
                    return e.documentSymbol(f);
                  case "workspaceSymbol":
                    return e.workspaceSymbol(r.query ?? "");
                  case "goToImplementation":
                    return e.implementation(d);
                  case "prepareCallHierarchy":
                    return e.prepareCallHierarchy(d);
                  case "incomingCalls":
                    return e.incomingCalls(d);
                  case "outgoingCalls":
                    return e.outgoingCalls(d);
                }
              })();
              return {
                title: I,
                metadata: { result: T },
                output: T.length === 0 ? `No results found for ${r.operation}` : JSON.stringify(T, null, 2),
              };
            }).pipe(on),
        };
      }),
    )));
});
import * as iwe from "path";