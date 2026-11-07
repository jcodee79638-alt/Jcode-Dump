
var ZJn = Ie(function (Qcc, YJn) {
  var cwo = ({ content: e, originalContent: t = {} }) => {
    let r = e.workspaces;
    if (!r) return t;
    let s = () => r.some((a) => typeof a !== "string");
    if (!r.length || s())
      throw Object.assign(TypeError("workspaces should be an array of strings."), {
        code: "EWORKSPACESINVALID",
      });
    return { ...t, workspaces: [...r] };
  };
  YJn.exports = cwo;
});