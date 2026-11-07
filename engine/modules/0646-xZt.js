
var xZt = (e) => {
    switch (e._tag) {
      case "Weak":
        return `W/"${e.value}"`;
      case "Strong":
        return `"${e.value}"`;
    }
  },
  _Re,
  tun = (e) => {
    let t = xv(e.mtime, { onNone: () => "0", onSome: (r) => r.getTime().toString(16) });
    return `${e.size.toString(16)}-${t}`;
  },
  nun = (e) => `${e.size.toString(16)}-${e.lastModified.toString(16)}`,
  iun,
  y1e;