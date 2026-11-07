
var O1e = "~effect/http/HttpClientResponse",
  Lun = (e, t) => new $un(e, t),
  opt = (e) =>
    e.status >= 200 && e.status < 300
      ? Jt(e)
      : bn(
          new N6({
            reason: new kZt({ response: e, request: e.request, description: "non 2xx status code" }),
          }),
        ),
  $un;