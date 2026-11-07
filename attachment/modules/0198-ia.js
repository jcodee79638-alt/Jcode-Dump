
class ia extends ns {
  constructor(t) {
    super(t, na, ra);
    const { url: e } = t;
    tt(e.protocol === "file:", "PDFNodeStream only supports file:// URLs.");
  }
}