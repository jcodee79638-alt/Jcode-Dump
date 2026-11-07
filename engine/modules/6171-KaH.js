
function KaH(e) {
  if (e instanceof NFe) return e.message;
  if (
    e instanceof Error &&
    /^(Upgrade paused to protect|Your Jac Code database|Close other Jac Code sessions|This draft collection)/.test(
      e.message,
    )
  )
    return e.message;
  if (tkr && !Hte) return `Jac Code could not start its engine (${Skt}). Close and reopen the app.`;
  if (e instanceof Error && e.message.startsWith("This conversation contains restored pending work."))
    return e.message;
  if (
    e instanceof Error &&
    /^(Wait for the current work to finish before changing access|Choose this conversation's project first)/.test(
      e.message,
    )
  )
    return e.message;
  if (e instanceof Error && e.name === "SessionError")
    return e.message
      .replace(/Run jac login in a terminal window\./g, "Sign in inside Jac Code.")
      .replace(/Sign in to Jac Code with jac login\./g, "Sign in to Jac Code.");
  return "Jac Code could not complete this request. Try again or contact Jac.";
}