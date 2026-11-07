
function gSa({ warning: e, provider: t, model: r }) {
  let s = `AI SDK Warning (${t} / ${r}):`;
  switch (e.type) {
    case "unsupported": {
      let a = `${s} The feature "${e.feature}" is not supported.`;
      if (e.details) a += ` ${e.details}`;
      return a;
    }
    case "compatibility": {
      let a = `${s} The feature "${e.feature}" is used in a compatibility mode.`;
      if (e.details) a += ` ${e.details}`;
      return a;
    }
    case "other":
      return `${s} ${e.message}`;
    default:
      return `${s} ${JSON.stringify(e, null, 2)}`;
  }
}