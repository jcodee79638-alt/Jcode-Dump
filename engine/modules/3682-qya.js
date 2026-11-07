
function qya(e, t) {
  return new Vya({ type: "catch", innerType: e, catchValue: typeof t === "function" ? t : Ovi(t) });
}