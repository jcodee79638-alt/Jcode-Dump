
var W3s = (e) => {
    switch (e) {
      case "SHA-1":
        return "sha1";
      case "SHA-256":
        return "sha256";
      case "SHA-384":
        return "sha384";
      case "SHA-512":
        return "sha512";
    }
  },
  V3s = (e, t) =>
    ZA({
      try: () => Uint8Array.from(Xpt.createHash(W3s(e)).update(t).digest()),
      catch: (r) =>
        YC({
          module: "Crypto",
          method: "digest",
          _tag: "Unknown",
          description: "Could not compute digest",
          cause: r,
        }),
    }),
  q3s,
  $fn;