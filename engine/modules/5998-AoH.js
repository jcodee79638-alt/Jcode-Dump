
function AoH(e) {
  if (e instanceof uVe) return `Session not found: ${e.sessionID}`;
  if (e instanceof TCr) return "Destination directory belongs to another project";
  if (e instanceof Nwt)
    return "Unable to apply your changes in the destination directory. The files may conflict with existing changes.";
  return e.message;
}