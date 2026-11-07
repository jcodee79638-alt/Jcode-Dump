
function ri(e) {
  const n = nn(e).split(/[?#]/, 1)[0];
  return /^[a-z][a-z0-9+.-]*:/i.test(n) || /^(?:[a-z]:|[/\\])/i.test(n)
    ? "[unavailable source]"
    : /(?:^|[/\\])(?:\.\.|\.env|private|credentials?)(?:[./\\]|$)/i.test(n)
      ? "[redacted source]"
      : n;
}
Oe(["keydown", "input", "click"]);