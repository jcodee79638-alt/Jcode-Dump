
var QJn = Ie(function (zcc, zJn) {
  var Hwo = ({ content: e, originalContent: t = {} }) => {
    let r = e.scripts;
    if (!r) return t;
    if ((() => Object.entries(r).some(([a, H]) => typeof a !== "string" || typeof H !== "string"))())
      throw Object.assign(TypeError("package.json scripts should be a key-value pair of strings."), {
        code: "ESCRIPTSINVALID",
      });
    return { ...t, scripts: { ...r } };
  };
  zJn.exports = Hwo;
});