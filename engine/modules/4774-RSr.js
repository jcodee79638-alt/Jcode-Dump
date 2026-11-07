
function RSr(...e) {
  let t = globalThis.ReadableStream;
  if (typeof t > "u")
    throw Error(
      "`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`",
    );
  return new t(...e);
}