
function _c(e, t) {
  let r = GJe(),
    s = zjt({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, r, r === _ce ? void 0 : _ce].filter(
        (a) => !!a,
      ),
    });
  e.common.issues.push(s);
}