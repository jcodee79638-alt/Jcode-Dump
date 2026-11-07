
function RMa(e, t) {
  var r;
  let s = (r = t == null ? void 0 : t.useReferences) != null ? r : !1;
  return ub(() => eDr(nTt(e, { target: "draft-7", io: "input", reused: s ? "ref" : "inline" })), {
    validate: async (a) => {
      let H = await sTt(e, a);
      return H.success ? { success: !0, value: H.data } : { success: !1, error: H.error };
    },
  });
}