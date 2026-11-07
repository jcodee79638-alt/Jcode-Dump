
var zCr = ne(async () => {
  Gt();
  $H();
  jT();
  await JQe();
  KnH = nt({ ...ErH.fields });
  nkt = class nkt extends (
    $y("MoveSessionError")(
      { name: ri("MoveSessionError"), data: nt({ message: re }) },
      { httpApiStatus: 400 },
    )
  ) {};
  Jes = kE("controlPlane").add(
    zd("controlPlane")
      .add(
        sc("moveSession", `${JnH}/move-session`, {
          payload: KnH,
          success: zs(lf, "Session moved"),
          error: nkt,
        }).annotateMerge(
          Fn({
            identifier: "experimental.controlPlane.moveSession",
            summary: "Move session",
            description:
              "Move a session to another project directory, optionally transferring local changes.",
          }),
        ),
      )
      .annotateMerge(Fn({ title: "controlPlane", description: "Control-plane orchestration routes." })),
  );
});