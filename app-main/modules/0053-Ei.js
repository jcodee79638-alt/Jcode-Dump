
function Ei(e) {
  let t = j(e);
  return {
    id: M(t.id),
    sessionId: M(t.sessionID),
    questions: jn(t.questions).map((n) => {
      let i = Q(n);
      return {
        header: M(i.header),
        question: M(i.question),
        multiple: i.multiple === !0,
        custom: i.custom !== !1,
        options: jn(i.options).map((r) => {
          let s = Q(r);
          return { label: M(s.label), description: M(s.description) };
        }),
      };
    }),
  };
}