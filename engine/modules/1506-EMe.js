
var EMe = ne(() => {
  EMe();
  Gt();
  Hu();
  ((gp = ks(re, ks(re, PH)).annotate({ identifier: "LLM.ProviderMetadata" })),
    (wEn = nt({ type: ri("text"), text: re }).annotate({ identifier: "Tool.TextContent" })),
    (kEn = nt({ type: ri("file"), uri: re, mime: re, name: Gn(re) }).annotate({
      identifier: "Tool.FileContent",
    })),
    (kG = Io([wEn, kEn]).pipe(_D("type")).annotate({ identifier: "LLM.ToolContent" })));
});