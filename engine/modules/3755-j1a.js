
function j1a({ address: e, family: t, hostname: r }) {
  if (t === 4 ? !zIr(e) || QIr(e) : t === 6 ? vwi(e) : !0)
    throw new $T({ url: r, message: `Hostname ${r} resolved to disallowed IP address ${e}` });
}