
function wze(e, t) {
  if (/[;&|`$()<>]/.test(e))
    throw new Ca({
      message: `Invalid ${t}: contains shell metacharacters. Use structured arguments instead.`,
    });
}