
function Ne(c) {
  if (typeof c != "string") return null;
  if (c.endsWith("/")) return c;
  throw new Error(`Invalid factory url: "${c}" must include trailing slash.`);
}