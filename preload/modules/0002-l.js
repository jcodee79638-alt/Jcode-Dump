
function l(e) {
  let o = e instanceof Error ? e.message : "Jac Code could not complete this request. Try again.";
  return Error(o.replace(/^Error invoking remote method 'jac:invoke': (?:Error: )?/, ""));
}