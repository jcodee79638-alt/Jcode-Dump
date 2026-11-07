
function kBi(e, t, r) {
  if (!e) throw Error(`${r} does not support task creation (required for ${t})`);
  switch (t) {
    case "sampling/createMessage":
      if (!e.sampling?.createMessage)
        throw Error(`${r} does not support task creation for sampling/createMessage (required for ${t})`);
      break;
    case "elicitation/create":
      if (!e.elicitation?.create)
        throw Error(`${r} does not support task creation for elicitation/create (required for ${t})`);
      break;
    default:
      break;
  }
}