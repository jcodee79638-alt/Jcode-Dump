
function deo() {
  if (import.meta.url.includes("$bunfs"))
    return "fff native library was not embedded into this executable. Rebuild with `bun build --compile` and ensure the @ff-labs/fff-bin-* package for this platform is installed.";
  return "fff native library not found. Build from source with `cargo build --release -p fff-c` or install the platform package.";
}