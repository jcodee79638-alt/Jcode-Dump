
var kD = Ie(function (dha) {
  var wD = lxt(),
    By = wD,
    pha = fxt().isApiWritable;
  dha.NAMESPACE = {
    HTML: "http://www.w3.org/1999/xhtml",
    XML: "http://www.w3.org/XML/1998/namespace",
    XMLNS: "http://www.w3.org/2000/xmlns/",
    MATHML: "http://www.w3.org/1998/Math/MathML",
    SVG: "http://www.w3.org/2000/svg",
    XLINK: "http://www.w3.org/1999/xlink",
  };
  dha.IndexSizeError = function () {
    throw new wD(By.INDEX_SIZE_ERR);
  };
  dha.HierarchyRequestError = function () {
    throw new wD(By.HIERARCHY_REQUEST_ERR);
  };
  dha.WrongDocumentError = function () {
    throw new wD(By.WRONG_DOCUMENT_ERR);
  };
  dha.InvalidCharacterError = function () {
    throw new wD(By.INVALID_CHARACTER_ERR);
  };
  dha.NoModificationAllowedError = function () {
    throw new wD(By.NO_MODIFICATION_ALLOWED_ERR);
  };
  dha.NotFoundError = function () {
    throw new wD(By.NOT_FOUND_ERR);
  };
  dha.NotSupportedError = function () {
    throw new wD(By.NOT_SUPPORTED_ERR);
  };
  dha.InvalidStateError = function () {
    throw new wD(By.INVALID_STATE_ERR);
  };
  dha.SyntaxError = function () {
    throw new wD(By.SYNTAX_ERR);
  };
  dha.InvalidModificationError = function () {
    throw new wD(By.INVALID_MODIFICATION_ERR);
  };
  dha.NamespaceError = function () {
    throw new wD(By.NAMESPACE_ERR);
  };
  dha.InvalidAccessError = function () {
    throw new wD(By.INVALID_ACCESS_ERR);
  };
  dha.TypeMismatchError = function () {
    throw new wD(By.TYPE_MISMATCH_ERR);
  };
  dha.SecurityError = function () {
    throw new wD(By.SECURITY_ERR);
  };
  dha.NetworkError = function () {
    throw new wD(By.NETWORK_ERR);
  };
  dha.AbortError = function () {
    throw new wD(By.ABORT_ERR);
  };
  dha.UrlMismatchError = function () {
    throw new wD(By.URL_MISMATCH_ERR);
  };
  dha.QuotaExceededError = function () {
    throw new wD(By.QUOTA_EXCEEDED_ERR);
  };
  dha.TimeoutError = function () {
    throw new wD(By.TIMEOUT_ERR);
  };
  dha.InvalidNodeTypeError = function () {
    throw new wD(By.INVALID_NODE_TYPE_ERR);
  };
  dha.DataCloneError = function () {
    throw new wD(By.DATA_CLONE_ERR);
  };
  dha.nyi = function () {
    throw Error("NotYetImplemented");
  };
  dha.shouldOverride = function () {
    throw Error("Abstract function; should be overriding in subclass.");
  };
  dha.assert = function (e, t) {
    if (!e)
      throw Error(
        "Assertion failed: " +
          (t || "") +
          `
` +
          Error().stack,
      );
  };
  dha.expose = function (e, t) {
    for (var r in e) Object.defineProperty(t.prototype, r, { value: e[r], writable: pha });
  };
  dha.merge = function (e, t) {
    for (var r in t) e[r] = t[r];
  };
  dha.documentOrder = function (e, t) {
    return 3 - (e.compareDocumentPosition(t) & 6);
  };
  dha.toASCIILowerCase = function (e) {
    return e.replace(/[A-Z]+/g, function (t) {
      return t.toLowerCase();
    });
  };
  dha.toASCIIUpperCase = function (e) {
    return e.replace(/[a-z]+/g, function (t) {
      return t.toUpperCase();
    });
  };
});