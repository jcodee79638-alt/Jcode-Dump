
function Br(c) {
  switch (c[0]) {
    case "RadialAxial":
      return new Or(c);
    case "Mesh":
      return new Lr(c);
    case "Dummy":
      return new Nr();
  }
  throw new Error(`Unknown IR type: ${c[0]}`);
}