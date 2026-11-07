
function Mvn(e) {
  if (/^[A-Za-z0-9/_.-]+$/.test(e) && !e.startsWith("-") && !e.includes("..")) return;
  throw new yvn({
    branch: e,
    message:
      "Branch must contain only alphanumeric characters, /, _, ., and -, and cannot start with - or contain ..",
  });
}