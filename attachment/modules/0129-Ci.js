
class Ci extends qi {
  async _fetch(t, e) {
    const s = e === "cMapUrl" && !t.endsWith(".bcmap") ? "text" : "bytes",
      i = await $s(t, s);
    return i instanceof Uint8Array ? i : es(i);
  }
}