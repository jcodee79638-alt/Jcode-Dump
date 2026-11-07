
var fQt = ne(() => {
  YA();
  nlt = bA("effect/Random", {
    defaultValue: () => ({
      nextIntUnsafe() {
        return (
          Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER + 1)) +
          Number.MIN_SAFE_INTEGER
        );
      },
      nextDoubleUnsafe() {
        return Math.random();
      },
    }),
  });
});