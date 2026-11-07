
var AHe = (e) => e.pipe(SRe({ retryOn: "errors-and-responses", times: 2, schedule: slt(200).pipe(olt) }));