
function ICe(e) {
  if (!e) return "";
  return e
    .replace(/\bBearer\s+[A-Za-z0-9\-_.~+/]+=*/gi, "Bearer [REDACTED]")
    .replace(/\bgl(?:pat|oat|cbt|dt|oas|rt|soat|ffct|sapat)-[A-Za-z0-9_-]+/g, "[REDACTED]")
    .replace(/([?&](?:private_token|access_token|token)=)[^&\s"']*/gi, "$1[REDACTED]")
    .replace(/:\/\/([^:@/\s]+):([^@/\s]+)@/g, "://$1:[REDACTED]@");
}