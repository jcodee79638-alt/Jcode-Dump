
function mc(e, t) {
  let r = L5e(),
    s = _Tt({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, r, r === _He ? void 0 : _He].filter(
        (a) => !!a,
      ),
    });
  e.common.issues.push(s);
}