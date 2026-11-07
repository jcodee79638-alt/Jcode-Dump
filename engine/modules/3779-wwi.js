
function wwi({ mediaType: e, url: t, supportedUrls: r }) {
  return (
    (e = e.toLowerCase()),
    Object.entries(r)
      .map(([s, a]) => {
        let H = s.toLowerCase();
        return H === "*" || H === "*/*"
          ? { mediaTypePrefix: "", regexes: a }
          : { mediaTypePrefix: H.replace(/\*/, ""), regexes: a };
      })
      .filter(({ mediaTypePrefix: s }) => (s === "" || s.endsWith("/") ? e.startsWith(s) : e === s))
      .flatMap(({ regexes: s }) => s)
      .some((s) => s.test(t))
  );
}