
var Dt = { sessions: 256, perSession: 100, bytes: 524288 },
  $t = /^[A-Za-z0-9_-]{1,100}$/,
  Wn = (e) => Bt.createHash("sha256").update(e).digest("hex");