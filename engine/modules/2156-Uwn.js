
var Uwn = ne(() => {
  R0();
  Jg();
  Jq();
  $6();
  BH();
  Ypt();
  _ie();
  jwn();
  wwn();
  oHr();
  ((b_o = ni(function* (e) {
    let t = yield* J$t,
      r = yield* Pwn(e.resource),
      s = { name: Cwn(r) },
      a = yield* bwn({
        label: "OtlpLogger",
        url: e.url,
        headers: e.headers,
        maxBatchSize: e.maxBatchSize ?? 1000,
        exportInterval: e.exportInterval ?? Pv(1),
        body: (u) => t.logs({ resourceLogs: [{ resource: r, scopeLogs: [{ scope: s, logRecords: u }] }] }),
        shutdownTimeout: e.shutdownTimeout ?? Pv(3),
      }),
      H = { excludeLogSpans: e.excludeLogSpans ?? !1, clock: yield* y6 };
    return GRe((u) => {
      a.push(j_o(u, H));
    });
  })),
    (xme = {
      SEVERITY_NUMBER_UNSPECIFIED: 0,
      SEVERITY_NUMBER_TRACE: 1,
      SEVERITY_NUMBER_TRACE2: 2,
      SEVERITY_NUMBER_TRACE3: 3,
      SEVERITY_NUMBER_TRACE4: 4,
      SEVERITY_NUMBER_DEBUG: 5,
      SEVERITY_NUMBER_DEBUG2: 6,
      SEVERITY_NUMBER_DEBUG3: 7,
      SEVERITY_NUMBER_DEBUG4: 8,
      SEVERITY_NUMBER_INFO: 9,
      SEVERITY_NUMBER_INFO2: 10,
      SEVERITY_NUMBER_INFO3: 11,
      SEVERITY_NUMBER_INFO4: 12,
      SEVERITY_NUMBER_WARN: 13,
      SEVERITY_NUMBER_WARN2: 14,
      SEVERITY_NUMBER_WARN3: 15,
      SEVERITY_NUMBER_WARN4: 16,
      SEVERITY_NUMBER_ERROR: 17,
      SEVERITY_NUMBER_ERROR2: 18,
      SEVERITY_NUMBER_ERROR3: 19,
      SEVERITY_NUMBER_ERROR4: 20,
      SEVERITY_NUMBER_FATAL: 21,
      SEVERITY_NUMBER_FATAL2: 22,
      SEVERITY_NUMBER_FATAL3: 23,
      SEVERITY_NUMBER_FATAL4: 24,
    }));
});