
async function $s(c, t = "text") {
  if (we(c, document.baseURI)) {
    const e = await fetch(c);
    if (!e.ok) throw new Error(e.statusText);
    switch (t) {
      case "blob":
        return e.blob();
      case "bytes":
        return e.bytes();
      case "json":
        return e.json();
    }
    return e.text();
  }
  return new Promise((e, s) => {
    const i = new XMLHttpRequest();
    (i.open("GET", c, !0),
      (i.responseType = t === "bytes" ? "arraybuffer" : t),
      (i.onreadystatechange = () => {
        if (i.readyState === XMLHttpRequest.DONE) {
          if (i.status === 200 || i.status === 0) {
            switch (t) {
              case "bytes":
                e(new Uint8Array(i.response));
                return;
              case "blob":
              case "json":
                e(i.response);
                return;
            }
            e(i.responseText);
            return;
          }
          s(new Error(i.statusText));
        }
      }),
      i.send(null));
  });
}