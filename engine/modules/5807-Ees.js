
function Ees(e) {
  return bQ(fBe(e)).pipe(
    yie({
      onFailure: RCr,
      onSuccess: (t) => {
        let r = t.indexOf(":");
        if (r === -1) return RCr();
        return { username: t.slice(0, r), password: T6(t.slice(r + 1)) };
      },
    }),
  );
}