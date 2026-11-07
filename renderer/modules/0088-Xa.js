
function Xa(e) {
  return e.reduce(
    (n, i) => (
      (i.role === "user" &&
        !i.parts.some((s) => s.type === "file" || (s.type === "text" && s.text?.trim()))) ||
        (i.role === "user"
          ? n.push({ id: i.id, user: i, responses: [] })
          : (n.length || n.push({ id: i.id, responses: [] }), n.at(-1).responses.push(i))),
      n
    ),
    [],
  );
}