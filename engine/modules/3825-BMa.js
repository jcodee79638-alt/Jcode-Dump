
function BMa(e, t) {
  var r;
  let s = (r = t == null ? void 0 : t.useReferences) != null ? r : !1;
  return ub(() => OMa(e, { $refStrategy: s ? "root" : "none" }), {
    validate: async (a) => {
      let H = await e.safeParseAsync(a);
      return H.success ? { success: !0, value: H.data } : { success: !1, error: H.error };
    },
  });
}