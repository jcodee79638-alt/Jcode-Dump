
async function Uva(e) {
  let t = await eXe(e);
  try {
    return iPn(t);
  } catch (r) {
    throw new Y5e(
      {
        path: e,
        message: `${e}: Failed to parse YAML frontmatter: ${r instanceof Error ? r.message : String(r)}`,
      },
      { cause: r },
    );
  }
}