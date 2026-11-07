
function m4a(e, t, r, s) {
  let a = nqi.has(e),
    H = l4a(e);
  if (iqi.has(e))
    return {
      intro: `Executes a given ${rqi(e)} command with optional timeout, ensuring proper handling and security measures.`,
      workdirSection:
        "All commands run in the current working directory by default. Use the `workdir` parameter if you need to run a command in a different directory. AVOID changing directories inside the command - use `workdir` instead.",
      commandSection: d4a(H, r, s),
      gitCommands: "git commands",
      gitCommandRestriction: "git commands",
      createPrInstruction: "Create PR using a temporary body file so cmd.exe quoting stays simple.",
      createPrExample: `(
  echo ## Summary
  echo - ^<1-3 bullet points^>
) > pr-body.txt
gh pr create --title "the pr title" --body-file pr-body.txt`,
    };
  if (a)
    return {
      intro: `Executes a given ${rqi(e)} command with optional timeout, ensuring proper handling and security measures.`,
      workdirSection:
        "All commands run in the current working directory by default. Use the `workdir` parameter if you need to run a command in a different directory. AVOID changing directories inside the command - use `workdir` instead.",
      commandSection: p4a(e, H, t === "win32" ? "\\" : "/", r, s),
      gitCommands: "git commands",
      gitCommandRestriction: "git commands",
      createPrInstruction:
        "Create PR using gh pr create with a PowerShell here-string to pass the body correctly.",
      createPrExample: `gh pr create --title "the pr title" --body @'
## Summary
- <1-3 bullet points>
'@`,
    };
  return {
    intro:
      "Executes a given bash command in a persistent shell session with optional timeout, ensuring proper handling and security measures.",
    workdirSection:
      "All commands run in the current working directory by default. Use the `workdir` parameter if you need to run a command in a different directory. AVOID using `cd <directory> && <command>` patterns - use `workdir` instead.",
    commandSection: f4a(H, r, s),
    gitCommands: "bash commands",
    gitCommandRestriction: "git bash commands",
    createPrInstruction:
      "Create PR using gh pr create with the format below. Use a HEREDOC to pass the body to ensure correct formatting.",
    createPrExample: `gh pr create --title "the pr title" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>`,
  };
}