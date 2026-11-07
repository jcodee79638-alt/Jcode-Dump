
var LLi = Ie(function (dLi) {
  var D8;
  Object.defineProperty(dLi, "__esModule", { value: !0 });
  dLi.isUniversal =
    dLi.isTag =
    dLi.isString =
    dLi.isSelector =
    dLi.isRoot =
    dLi.isPseudo =
    dLi.isNesting =
    dLi.isIdentifier =
    dLi.isComment =
    dLi.isCombinator =
    dLi.isClassName =
    dLi.isAttribute =
      void 0;
  dLi.isNode = V_r;
  dLi.isPseudoElement = pLi;
  dLi.isPseudoClass = saa;
  dLi.isContainer = oaa;
  dLi.isNamespace = aaa;
  var PE = ib(),
    iaa =
      ((D8 = {}),
      (D8[PE.ATTRIBUTE] = !0),
      (D8[PE.CLASS] = !0),
      (D8[PE.COMBINATOR] = !0),
      (D8[PE.COMMENT] = !0),
      (D8[PE.ID] = !0),
      (D8[PE.NESTING] = !0),
      (D8[PE.PSEUDO] = !0),
      (D8[PE.ROOT] = !0),
      (D8[PE.SELECTOR] = !0),
      (D8[PE.STRING] = !0),
      (D8[PE.TAG] = !0),
      (D8[PE.UNIVERSAL] = !0),
      D8);
  function V_r(e) {
    return typeof e === "object" && iaa[e.type];
  }
  function vB(e, t) {
    return V_r(t) && t.type === e;
  }
  dLi.isAttribute = vB.bind(null, PE.ATTRIBUTE);
  dLi.isClassName = vB.bind(null, PE.CLASS);
  dLi.isCombinator = vB.bind(null, PE.COMBINATOR);
  dLi.isComment = vB.bind(null, PE.COMMENT);
  dLi.isIdentifier = vB.bind(null, PE.ID);
  dLi.isNesting = vB.bind(null, PE.NESTING);
  dLi.isPseudo = vB.bind(null, PE.PSEUDO);
  dLi.isRoot = vB.bind(null, PE.ROOT);
  dLi.isSelector = vB.bind(null, PE.SELECTOR);
  dLi.isString = vB.bind(null, PE.STRING);
  dLi.isTag = vB.bind(null, PE.TAG);
  dLi.isUniversal = vB.bind(null, PE.UNIVERSAL);
  function pLi(e) {
    return (
      dLi.isPseudo(e) &&
      e.value &&
      (e.value.startsWith("::") ||
        e.value.toLowerCase() === ":before" ||
        e.value.toLowerCase() === ":after" ||
        e.value.toLowerCase() === ":first-letter" ||
        e.value.toLowerCase() === ":first-line")
    );
  }
  function saa(e) {
    return dLi.isPseudo(e) && !pLi(e);
  }
  function oaa(e) {
    return !!(V_r(e) && e.walk);
  }
  function aaa(e) {
    return dLi.isAttribute(e) || dLi.isTag(e);
  }
});