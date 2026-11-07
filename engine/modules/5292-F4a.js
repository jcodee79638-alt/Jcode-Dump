
function F4a(e, t, r, s) {
  if (ALr(e))
    return Lh(e, ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", t], {
      cwd: r,
      env: s,
      stdin: "ignore",
      detached: !1,
    });
  return Lh(t, [], { shell: e, cwd: r, env: s, stdin: "ignore", detached: !1 });
}