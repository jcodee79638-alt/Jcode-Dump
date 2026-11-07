
var ZMe = ne(() => {
  Gt();
  Hu();
  Hu();
  ((LWe = nt({ start: mo, end: mo, text: re }).annotate({ identifier: "Prompt.Source" })),
    ($We = nt({ uri: re, mime: re, name: re.pipe(Gn), description: re.pipe(Gn), source: LWe.pipe(Gn) })
      .annotate({ identifier: "Prompt.FileAttachment" })
      .pipe(
        Bl((e) => ({
          create: (t) =>
            e.make({ uri: t.uri, mime: t.mime, name: t.name, description: t.description, source: t.source }),
        })),
      )),
    (eht = nt({ name: re, source: LWe.pipe(Gn) }).annotate({ identifier: "Prompt.AgentAttachment" })),
    (q6 = nt({ text: re, files: On($We).pipe(Gn), agents: On(eht).pipe(Gn) })
      .annotate({ identifier: "Prompt" })
      .pipe(
        Bl((e) => ({
          equivalence: BAn(e),
          fromUserMessage: (t) =>
            e.make({
              text: t.text,
              ...(t.files === void 0 ? {} : { files: t.files }),
              ...(t.agents === void 0 ? {} : { agents: t.agents }),
            }),
        })),
      )));
});