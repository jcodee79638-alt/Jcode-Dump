
var Wgr = Ie(function (gGe, Rxi) {
  var Rgr = kD();
  gGe = Rxi.exports = {
    CSSStyleDeclaration: Sxt(),
    CharacterData: uGe(),
    Comment: fgr(),
    DOMException: lxt(),
    DOMImplementation: $Ge(),
    DOMTokenList: z$r(),
    Document: jxt(),
    DocumentFragment: dgr(),
    DocumentType: Cxt(),
    Element: Ebe(),
    HTMLParser: Bxt(),
    NamedNodeMap: rgr(),
    Node: ob(),
    NodeList: ahe(),
    NodeFilter: dGe(),
    ProcessingInstruction: _gr(),
    Text: ugr(),
    Window: Vgr(),
  };
  Rgr.merge(gGe, Mgr());
  Rgr.merge(gGe, vxt().elements);
  Rgr.merge(gGe, jgr().elements);
});