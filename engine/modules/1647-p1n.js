
var p1n = ne(() => {
  ((UYs = Array(20)
    .fill(0)
    .map((e, t) => " ".repeat(t))),
    (NYs = {
      " ": {
        "\n": Array(200)
          .fill(0)
          .map(
            (e, t) =>
              `
` + " ".repeat(t),
          ),
        "\r": Array(200)
          .fill(0)
          .map((e, t) => "\r" + " ".repeat(t)),
        "\r\n": Array(200)
          .fill(0)
          .map(
            (e, t) =>
              `\r
` + " ".repeat(t),
          ),
      },
      "\t": {
        "\n": Array(200)
          .fill(0)
          .map(
            (e, t) =>
              `
` + "\t".repeat(t),
          ),
        "\r": Array(200)
          .fill(0)
          .map((e, t) => "\r" + "\t".repeat(t)),
        "\r\n": Array(200)
          .fill(0)
          .map(
            (e, t) =>
              `\r
` + "\t".repeat(t),
          ),
      },
    }));
});