
function l4a(e) {
  if (e === "powershell")
    return "If the commands depend on each other and must run sequentially, avoid '&&' in this shell because Windows PowerShell (5.1) does not support it. Use PowerShell conditionals such as `cmd1; if ($?) { cmd2 }` when later commands must depend on earlier success.";
  if (nqi.has(e))
    return "If the commands depend on each other and must run sequentially, use a single bash tool call with '&&' to chain them together (e.g., `git add . && git commit -m \"message\" && git push`). For instance, if one operation must complete before another starts (like New-Item before Copy-Item, Write before bash for git operations, or git add before git commit), run these operations sequentially instead.";
  if (iqi.has(e))
    return "If the commands depend on each other and must run sequentially, use a single bash tool call with `&&` to chain them together (e.g., `mkdir out && dir out`). For instance, if one operation must complete before another starts, run these operations sequentially instead.";
  return "If the commands depend on each other and must run sequentially, use a single Bash call with '&&' to chain them together (e.g., `git add . && git commit -m \"message\" && git push`). For instance, if one operation must complete before another starts (like mkdir before cp, Write before Bash for git operations, or git add before git commit), run these operations sequentially instead.";
}