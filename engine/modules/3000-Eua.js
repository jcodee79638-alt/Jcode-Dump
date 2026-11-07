
function Eua() {
  let e = process.env.BUN_PTY_LIB;
  if (e && IEi(e)) return e;
  try {
    let L = $Ei();
    if (L) return L;
  } catch {}
  let t = "win32",
    r = "x64",
    s =
      t === "darwin"
        ? r === "arm64"
          ? ["librust_pty_arm64.dylib", "librust_pty.dylib"]
          : ["librust_pty.dylib"]
        : t === "win32"
          ? ["rust_pty.dll"]
          : r === "arm64"
            ? ["librust_pty_arm64.so", "librust_pty.so"]
            : ["librust_pty.so"],
    a = Bun.fileURLToPath(import.meta.url),
    H = EEi(a),
    u = $ua(H),
    f = u === "src" || u === "dist" ? EEi(H) : H,
    d = [
      fMt(f, "rust-pty", "target", "release"),
      fMt(f, "..", "bun-pty", "rust-pty", "target", "release"),
      fMt(process.cwd(), "node_modules", "bun-pty", "rust-pty", "target", "release"),
    ],
    _ = [];
  for (let L of d) for (let I of s) _.push(fMt(L, I));
  for (let L of _) if (IEi(L)) return L;
  throw Error(`librust_pty shared library not found.
Checked:
  - BUN_PTY_LIB=${e ?? "<unset>"}
  - ${_.join(`
  - `)}

Set BUN_PTY_LIB or ensure one of these paths contains the file.`);
}