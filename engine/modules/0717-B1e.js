
var B1e,
  vln = (e) => e,
  xer,
  l3s = (e) => {
    switch (e._tag) {
      case "UnixAddress":
        return `unix://${e.path}`;
      case "TcpAddress":
        return `http://${e.hostname}:${e.port}`;
    }
  },
  f3s = (e) => Hi(B1e, (t) => e(l3s(t.address))),
  p3s,
  bln = (e) => zg(p3s).pipe(Jm(e)),
  d3s;