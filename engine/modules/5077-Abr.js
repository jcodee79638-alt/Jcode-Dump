
var Abr = ne(() => {
  nR();
  x7();
  H0();
  $Ce = class $Ce extends Ni {
    constructor() {
      super(...arguments);
      LCe.add(this);
    }
    async unwrap(e, t, r = this._client.webhookSecret, s = 300) {
      return (await this.verifySignature(e, t, r, s), JSON.parse(e));
    }
    async verifySignature(e, t, r = this._client.webhookSecret, s = 300) {
      if (
        typeof crypto > "u" ||
        typeof crypto.subtle.importKey !== "function" ||
        typeof crypto.subtle.verify !== "function"
      )
        throw Error("Webhook signature verification is only supported when the `crypto` global is defined");
      us(this, LCe, "m", E7i).call(this, r);
      let a = Xa([t]).values,
        H = us(this, LCe, "m", NPt).call(this, a, "webhook-signature"),
        u = us(this, LCe, "m", NPt).call(this, a, "webhook-timestamp"),
        f = us(this, LCe, "m", NPt).call(this, a, "webhook-id"),
        d = parseInt(u, 10);
      if (isNaN(d)) throw new Cee("Invalid webhook timestamp format");
      let _ = Math.floor(Date.now() / 1000);
      if (_ - d > s) throw new Cee("Webhook timestamp is too old");
      if (d > _ + s) throw new Cee("Webhook timestamp is too new");
      let L = H.split(" ").map((T) => (T.startsWith("v1,") ? T.substring(3) : T)),
        I = r.startsWith("whsec_") ? Buffer.from(r.replace("whsec_", ""), "base64") : Buffer.from(r, "utf-8"),
        D = f ? `${f}.${u}.${e}` : `${u}.${e}`,
        S = await crypto.subtle.importKey("raw", I, { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
      for (let T of L)
        try {
          let C = Buffer.from(T, "base64");
          if (await crypto.subtle.verify("HMAC", S, C, new TextEncoder().encode(D))) return;
        } catch {
          continue;
        }
      throw new Cee("The given webhook signature does not match the expected signature");
    }
  };
  ((LCe = new WeakSet()),
    (E7i = function (t) {
      if (typeof t !== "string" || t.length === 0)
        throw Error(
          "The webhook secret must either be set using the env var, OPENAI_WEBHOOK_SECRET, on the client class, OpenAI({ webhookSecret: '123' }), or passed to this function",
        );
    }),
    (NPt = function (t, r) {
      if (!t) throw Error("Headers are required");
      let s = t.get(r);
      if (s === null || s === void 0) throw Error(`Missing required header: ${r}`);
      return s;
    }));
});