
var NJn = Ie(function (Gcc, UJn) {
  class OJn extends Error {
    constructor(e) {
      let t = "Invalid auth configuration found: ";
      ((t += e
        .map((r) => {
          if (r.action === "delete") return `\`${r.key}\` is not allowed in ${r.where} config`;
          else if (r.action === "rename")
            return `\`${r.from}\` must be renamed to \`${r.to}\` in ${r.where} config`;
        })
        .join(", ")),
        (t += "\nPlease run `npm config fix` to repair your configuration.`"));
      super(t);
      ((this.code = "ERR_INVALID_AUTH"), (this.problems = e));
    }
  }
  UJn.exports = { ErrInvalidAuth: OJn };
});