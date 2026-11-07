
var Mts = ne(() => {
  Zse();
  SY();
  Gt();
  $H();
  Xy();
  ((tsH = nt({
    limit: be(O6.check(ARe(), pG(1), zie(200))).annotate({
      description:
        "Maximum number of messages to return. When omitted, the endpoint returns its default page size.",
    }),
    order: be(Io([ri("asc"), ri("desc")])).annotate({
      description: "Message order for the first page. Use desc for newest first or asc for oldest first.",
    }),
    cursor: be(
      re.annotate({
        description:
          "Opaque pagination cursor returned as cursor.previous or cursor.next in the previous response. Do not combine with order.",
      }),
    ),
  }).annotate({ identifier: "SessionMessagesQuery" })),
    (yts = zd("server.message")
      .add(
        MH("session.messages", "/api/session/:sessionID/message", {
          params: { sessionID: P$ },
          query: tsH,
          success: nt({ data: On(xY), cursor: nt({ previous: re.pipe(be), next: re.pipe(be) }) }).annotate({
            identifier: "SessionMessagesResponse",
          }),
          error: [SJ, Wf, l9],
        }).annotateMerge(
          Fn({
            identifier: "v2.session.messages",
            summary: "Get session messages",
            description:
              "Retrieve projected messages for a session. Items keep the requested order across pages; use cursor.next or cursor.previous to move through the ordered timeline.",
          }),
        ),
      )
      .annotateMerge(Fn({ title: "messages", description: "Experimental message routes." }))));
});