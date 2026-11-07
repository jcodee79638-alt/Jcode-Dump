
var oMt = ne(() => {
  oMt();
  Gt();
  Hu();
  YRe();
  Hu();
  ((nEi = cBs.pipe(R2s(jAn()), Jl("ProjectCopy.StrategyID"))),
    (iEi = nt({ projectID: eY, strategy: nEi, sourceDirectory: bo, directory: bo, name: Gn(re) }).annotate({
      identifier: "ProjectCopy.CreateInput",
    })),
    (sEi = nt({ projectID: eY, directory: bo, force: Vi }).annotate({
      identifier: "ProjectCopy.RemoveInput",
    })),
    (oEi = nt({ directory: bo }).annotate({ identifier: "ProjectCopy.Copy" })));
});
import aEi from "path";