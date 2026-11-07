
function utn(e) {
  if (!Array.isArray(e) || e.length > 2000) throw Ap();
  return e.map((t) => {
    if (
      !NM(t) ||
      typeof t.id !== "string" ||
      !/^[A-Za-z0-9_-]{1,100}$/.test(t.id) ||
      typeof t.name !== "string" ||
      t.name.length > 260 ||
      typeof t.directory !== "string" ||
      t.directory.length > 4096 ||
      !Pu.isAbsolute(t.directory) ||
      /[\u0000-\u001f]/.test(t.directory)
    )
      throw Ap();
    return { id: t.id, name: t.name, directory: t.directory };
  });
}