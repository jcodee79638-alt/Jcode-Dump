
function _s(e) {
  let n = 0,
    i = 0,
    s = !1;
  return e
    .split(
      `
`,
    )
    .filter((l) => l.length > 0)
    .map((l) => {
      const a = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(l);
      return a
        ? ((n = Number(a[1])),
          (i = Number(a[2])),
          (s = !0),
          { text: l, kind: "hunk", before: void 0, after: void 0 })
        : (l.startsWith("diff ") && (s = !1),
          l.startsWith("+") && !l.startsWith("+++")
            ? { text: l, kind: "added", before: void 0, after: s ? i++ : void 0 }
            : l.startsWith("-") && !l.startsWith("---")
              ? { text: l, kind: "removed", before: s ? n++ : void 0, after: void 0 }
              : s && l.startsWith(" ")
                ? { text: l, kind: "context", before: n++, after: i++ }
                : { text: l, kind: "meta", before: void 0, after: void 0 });
    });
}