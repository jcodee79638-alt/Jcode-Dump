
async function jwi(e, t) {
  var r, s;
  try {
    let a = await W1a({ url: e, abortSignal: t == null ? void 0 : t.abortSignal });
    if (!a.ok) throw (await KIr(a), new $T({ url: e, statusCode: a.status, statusText: a.statusText }));
    let H = await PTt({
        response: a,
        url: e,
        maxBytes: (r = t == null ? void 0 : t.maxBytes) != null ? r : jTt,
      }),
      u = (s = a.headers.get("content-type")) != null ? s : void 0;
    return new Blob([H], u ? { type: u } : void 0);
  } catch (a) {
    if ($T.isInstance(a)) throw a;
    throw new $T({ url: e, cause: a });
  }
}