
function LXa(e, t, r, s = !1) {
  if (t === r) throw Error("No changes to apply: oldString and newString are identical.");
  if (t === "")
    throw Error(
      "oldString cannot be empty when editing an existing file. Provide the exact text to replace, or use write for an intentional full-file replacement.",
    );
  let a = !0;
  for (let H of [AXa, uXa, lXa, fXa, pXa, dXa, _Xa, hXa, mXa])
    for (let u of H(e, t)) {
      let f = e.indexOf(u);
      if (f === -1) continue;
      if (((a = !1), $Xa(u, t)))
        throw Error(
          "Refusing replacement because the matched span is much larger than oldString. Re-read the file and provide the full exact oldString for the intended replacement.",
        );
      if (s) return e.replaceAll(u, r);
      let d = e.lastIndexOf(u);
      if (f !== d) continue;
      return e.substring(0, f) + r + e.substring(f + u.length);
    }
  if (a)
    throw Error(
      "Could not find oldString in the file. It must match exactly, including whitespace, indentation, and line endings.",
    );
  throw Error(
    "Found multiple matches for oldString. Provide more surrounding context to make the match unique.",
  );
}