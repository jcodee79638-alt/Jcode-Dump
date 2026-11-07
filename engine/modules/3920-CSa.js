
function CSa(e) {
  try {
    let [t, r] = e.split(",");
    return { mediaType: t.split(";")[0].split(":")[1], base64Content: r };
  } catch (t) {
    return { mediaType: void 0, base64Content: void 0 };
  }
}