
function ub(e, { validate: t } = {}) {
  return {
    [JIr]: !0,
    _type: void 0,
    get jsonSchema() {
      if (typeof e === "function") e = e();
      return e;
    },
    validate: t,
  };
}