
async function* qwi({ execute: e, input: t, options: r }) {
  let s = e(t, r);
  if (JMa(s)) {
    let a;
    for await (let H of s) ((a = H), yield { type: "preliminary", output: H });
    yield { type: "final", output: a };
  } else yield { type: "final", output: await s };
}