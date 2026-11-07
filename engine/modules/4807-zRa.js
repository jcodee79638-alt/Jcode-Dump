
async function* zRa(e, t) {
  if (!e.body) {
    if ((t.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative"))
      throw new bc(
        "The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api",
      );
    throw new bc("Attempted to iterate over a response with no body");
  }
  let r = new PVi(),
    s = new GPe(),
    a = WSr(e.body);
  for await (let H of QRa(a))
    for (let u of s.decode(H)) {
      let f = r.decode(u);
      if (f) yield f;
    }
  for (let H of s.flush()) {
    let u = r.decode(H);
    if (u) yield u;
  }
}