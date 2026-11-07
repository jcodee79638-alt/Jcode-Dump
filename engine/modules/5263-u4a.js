
function u4a(e) {
  if (e === "pwsh")
    return '# PowerShell (7+) shell notes\n- This cross-platform shell supports pipeline chain operators (`&&` and `||`).\n- Use double quotes for interpolated strings (`"Hello $name"`), single quotes for verbatim strings.\n- Prefer full cmdlet names like `Get-ChildItem`, `Set-Content`, `Remove-Item`, and `New-Item` over aliases.\n- Use `$(...)` for subexpressions. Use `@(...)` for array expressions.\n- To call a native executable whose path contains spaces, use the call operator: `& "path/to/exe" args`.\n- Escape special characters with the PowerShell backtick character.';
  if (e === "powershell")
    return '# Windows PowerShell (5.1) shell notes\n- Use `cmd1; if ($?) { cmd2 }` to chain dependent commands.\n- Use double quotes for interpolated strings (`"Hello $name"`), single quotes for verbatim strings.\n- Prefer full cmdlet names like `Get-ChildItem`, `Set-Content`, `Remove-Item`, and `New-Item` over aliases.\n- Use `$(...)` for subexpressions. Use `@(...)` for array expressions.\n- To call a native executable whose path contains spaces, use the call operator: `& "path/to/exe" args`.\n- Escape special characters with the PowerShell backtick character.';
  return "";
}