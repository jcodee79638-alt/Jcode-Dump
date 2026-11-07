
function mua(e, t, r) {
  let s = J_e(e);
  if (s === "nu" || s === "fish") return ["-c", t];
  if (s === "zsh")
    return [
      "-l",
      "-c",
      `
        [[ -f ~/.zshenv ]] && source ~/.zshenv >/dev/null 2>&1 || true
        [[ -f "\${ZDOTDIR:-$HOME}/.zshrc" ]] && source "\${ZDOTDIR:-$HOME}/.zshrc" >/dev/null 2>&1 || true
        cd -- "$1"
        eval ${JSON.stringify(t)}
      `,
      "opencode",
      r,
    ];
  if (s === "bash")
    return [
      "-l",
      "-c",
      `
        shopt -s expand_aliases
        [[ -f ~/.bashrc ]] && source ~/.bashrc >/dev/null 2>&1 || true
        cd -- "$1"
        eval ${JSON.stringify(t)}
      `,
      "opencode",
      r,
    ];
  if (s === "cmd") return ["/c", t];
  if (ALr(e)) return ["-NoProfile", "-Command", t];
  return ["-c", t];
}