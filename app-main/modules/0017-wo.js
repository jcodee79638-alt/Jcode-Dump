
function wo(e) {
  let t = e && typeof e === "object" && "code" in e ? e.code : void 0;
  if (t === "ENOENT") return { code: "APP_FILE_MISSING", message: "A required application file is missing." };
  if (["EBUSY", "EACCES", "EPERM"].includes(String(t)))
    return {
      code: "APP_FILE_BUSY",
      message:
        "Windows is preventing access to an application file. Close other Jac Code windows and try again.",
    };
  let n = e instanceof Error ? e.message : "";
  if (n.includes("signature"))
    return { code: "SIGNATURE_REJECTED", message: "The application verification record is not authentic." };
  if (n.includes("changed"))
    return { code: "APP_FILE_CHANGED", message: "An application file does not match the authentic release." };
  if (n.includes("Linked"))
    return {
      code: "LINKED_APP_FILE",
      message: "An application file or folder uses an unsupported filesystem link.",
    };
  if (n.includes("Unexpected runtime"))
    return { code: "EXTRA_APP_FILE", message: "The application folder contains an unexpected file." };
  return { code: "APP_CHECK_FAILED", message: "The application verification record could not be checked." };
}