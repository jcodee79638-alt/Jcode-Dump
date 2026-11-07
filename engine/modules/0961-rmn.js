
function rmn(e) {
  if (!e) return !1;
  try {
    let t = new ydt("input", '"use strict"; return input;')(!0);
    if (t !== !0)
      (console.warn(`Unable to use jit mappers due to incompatibility: corrupted jit function output.
Falling back to premade mappers.
Error details:`),
        console.error(`Expected to receive \`true\`, got: ${t}`));
    return !0;
  } catch (t) {
    return (
      console.warn(`Unable to use jit mappers due to incompatibility.
Falling back to premade mappers.
Error details:`),
      console.error(t),
      !1
    );
  }
}