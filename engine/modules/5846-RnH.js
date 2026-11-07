
function RnH(e, t, r) {
  return Rwe.$match(r, {
    InvalidWorkspace: () =>
      Jt(
        ow(new Bwe({ message: "Invalid workspace query parameter", kind: "Query", field: "workspace" }), {
          status: 400,
        }),
      ),
    MissingWorkspace: ({ workspaceID: s }) => Jt(OnH(s)),
    Remote: ({ request: s, workspace: a, target: H, url: u }) => NnH(e, s, a, H, u),
    Local: ({ directory: s, workspaceID: a }) => t.pipe(IA(aYe, aYe.of({ directory: s, workspaceID: a }))),
  });
}