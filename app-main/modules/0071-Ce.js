
function Ce(e) {
  let t = e
    .replaceAll("\\", "/")
    .replace(/^[a-z]:\//i, "")
    .toLowerCase()
    .split("/");
  if (t.some((n) => n === ".." || n.includes(":") || n.includes("\x00"))) return "unsafe path";
  if (
    t.some((n) =>
      /^(?:\.env.*|private|\.private|\.ssh|\.aws|\.azure|\.gnupg|\.kube|\.config|credentials?.*|secrets?.*|owner[-_.].*|keys?|\.tools)$/.test(
        n,
      ),
    )
  )
    return "secret or private file";
  if (
    t.some((n) =>
      /^(?:\.git|\.hg|\.svn|\.jj|node_modules|bower_components|vendor|deps|build|dist|out|target|coverage|\.cache|\.next|\.nuxt|\.turbo|releases?|\.venv|venv|__pycache__|\.task-write-.*)$/.test(
        n,
      ),
    )
  )
    return "generated files or dependencies";
  if (
    t.some(
      (n) =>
        /(?:promt|system.*prompt|prompt.*system)/.test(n) ||
        /^(?:owner-secrets\.|wrangler\.|id_(?:rsa|dsa|ecdsa|ed25519)(?:\.|$)|\.npmrc$|\.netrc$|\.pypirc$|auth(?:entication)?[._-]|tokens?[._-])/.test(
          n,
        ) ||
        /\.(?:pem|key|p12|pfx|jks|keystore|dpapi|sqlite3?|db|log)$/.test(n),
    )
  )
    return "secret or private file";
  return;
}