
function wBi(e, t, r) {
  if (!e) throw Error(`${r} does not support task creation (required for ${t})`);
  switch (t) {
    case "tools/call":
      if (!e.tools?.call)
        throw Error(`${r} does not support task creation for tools/call (required for ${t})`);
      break;
    default:
      break;
  }
}