
var vHe = ne(async () => {
  N2();
  N2();
  OY();
  EHe();
  au();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Kj();
  uvt();
  cee();
  Gt();
  await Jn([jI(), qL(), wX(), vHe()]);
  ((aja = {
    Updated: XL.MessageUpdated,
    Removed: XL.MessageRemoved,
    PartUpdated: XL.PartUpdated,
    PartDelta: XL.PartDelta,
    PartRemoved: XL.PartRemoved,
  }),
    (Hja = nt({ id: Td, time: mo.check(pG(0)) })),
    (cja = E1(Hja)),
    (cyr = {
      encode(e) {
        return Buffer.from(JSON.stringify(e)).toString("base64url");
      },
      decode(e) {
        return cja(JSON.parse(Buffer.from(e, "base64url").toString("utf8")));
      },
    }));
  ((Ayr = ni(function* (e, t, r) {
    let s = [],
      a = new Set(),
      H = (_) => {
        if (t.api.npm === "@ai-sdk/anthropic") return !0;
        if (t.api.npm === "@ai-sdk/openai") return !0;
        if (t.api.npm === "@ai-sdk/amazon-bedrock/mantle") return !0;
        if (t.api.npm === "@ai-sdk/amazon-bedrock") {
          if (!_.mime.startsWith("image/")) return !1;
          let L = t.api.id.toLowerCase();
          return (
            L.includes("anthropic.") || L.includes("nova") || L.includes("llama4") || L.includes("llama-4")
          );
        }
        if (t.api.npm === "@ai-sdk/xai") return _.mime.startsWith("image/");
        if (t.api.npm === "@ai-sdk/google-vertex/anthropic") return !0;
        if (t.api.npm === "@ai-sdk/google") {
          let L = t.api.id.toLowerCase();
          return L.includes("gemini-3") && !L.includes("gemini-2");
        }
        return !1;
      },
      u = (_) =>
        t.api.npm === "@ai-sdk/xai" &&
        _.mime.startsWith("image/") &&
        !["image/png", "image/jpeg", "image/webp"].includes(_.mime),
      f = (_) => {
        let L = _.output;
        if (typeof L === "string") return { type: "text", value: L };
        if (typeof L === "object") {
          let I = L,
            D = (I.attachments ?? []).filter((S) => S.url.startsWith("data:") && S.url.includes(","));
          return {
            type: "content",
            value: [
              ...(I.text ? [{ type: "text", text: I.text }] : []),
              ...D.map((S) => ({
                type: "media",
                mediaType: S.mime,
                data: Fhe(() => {
                  let T = S.url.indexOf(",");
                  return T === -1 ? S.url : S.url.slice(T + 1);
                }),
              })),
            ],
          };
        }
        return { type: "json", value: L };
      };
    for (let _ of e) {
      if (_.parts.length === 0) continue;
      if (_.info.role === "user") {
        let L = { id: _.info.id, role: "user", parts: [] };
        for (let I of _.parts) {
          if (I.type === "text" && !I.ignored && I.text !== "") L.parts.push({ type: "text", text: I.text });
          if (I.type === "file" && I.mime !== "text/plain" && I.mime !== "application/x-directory")
            if (r?.stripMedia && uXe(I.mime))
              L.parts.push({ type: "text", text: `[Attached ${I.mime}: ${I.filename ?? "file"}]` });
            else L.parts.push({ type: "file", url: I.url, mediaType: I.mime, filename: I.filename });
          if (I.type === "compaction") L.parts.push({ type: "text", text: "What did we do so far?" });
          if (I.type === "subtask")
            L.parts.push({ type: "text", text: "The following tool was executed by the user" });
        }
        if (L.parts.length > 0) s.push(L);
      }
      if (_.info.role === "assistant") {
        let L = `${t.providerID}/${t.id}` !== `${_.info.providerID}/${_.info.modelID}`,
          I = [];
        if (
          _.info.error &&
          !(
            ELt.isInstance(_.info.error) &&
            _.parts.some((T) => T.type !== "step-start" && T.type !== "reasoning")
          )
        )
          continue;
        let D = { id: _.info.id, role: "assistant", parts: [] },
          S = _.parts.some((T) => {
            if (T.type !== "reasoning") return !1;
            return T.metadata?.anthropic?.signature != null;
          });
        for (let T of _.parts) {
          if (T.type === "text") {
            let C = T.text === "" && S ? " " : T.text;
            D.parts.push({ type: "text", text: C, ...(L ? {} : { providerMetadata: T.metadata }) });
          }
          if (T.type === "step-start") D.parts.push({ type: "step-start" });
          if (T.type === "tool") {
            if ((a.add(T.tool), T.state.status === "completed")) {
              let C = T.state.time.compacted
                  ? "[Old tool result content cleared]"
                  : oja(T.state.output, r?.toolOutputMaxChars),
                O =
                  T.state.time.compacted || r?.stripMedia
                    ? []
                    : (T.state.attachments ?? []).filter((se) => !u(se)),
                V = O.filter((se) => uXe(se.mime)).filter((se) => !H(se));
              if (V.length > 0) I.push(...V);
              let q = O.filter((se) => !uXe(se.mime) || H(se)),
                Z = q.length > 0 ? { text: C, attachments: q } : C;
              D.parts.push({
                type: "tool-" + T.tool,
                state: "output-available",
                toolCallId: T.callID,
                input: T.state.input,
                output: Z,
                ...(T.metadata?.providerExecuted ? { providerExecuted: !0 } : {}),
                ...(L ? {} : { callProviderMetadata: fvt(T.metadata) }),
              });
            }
            if (T.state.status === "error") {
              let C = T.state.metadata?.interrupted === !0 ? T.state.metadata.output : void 0;
              if (typeof C === "string")
                D.parts.push({
                  type: "tool-" + T.tool,
                  state: "output-available",
                  toolCallId: T.callID,
                  input: T.state.input,
                  output: C,
                  ...(T.metadata?.providerExecuted ? { providerExecuted: !0 } : {}),
                  ...(L ? {} : { callProviderMetadata: fvt(T.metadata) }),
                });
              else
                D.parts.push({
                  type: "tool-" + T.tool,
                  state: "output-error",
                  toolCallId: T.callID,
                  input: T.state.input,
                  errorText: T.state.error,
                  ...(T.metadata?.providerExecuted ? { providerExecuted: !0 } : {}),
                  ...(L ? {} : { callProviderMetadata: fvt(T.metadata) }),
                });
            }
            if (T.state.status === "pending" || T.state.status === "running")
              D.parts.push({
                type: "tool-" + T.tool,
                state: "output-error",
                toolCallId: T.callID,
                input: T.state.input,
                errorText: "[Tool execution was interrupted]",
                ...(T.metadata?.providerExecuted ? { providerExecuted: !0 } : {}),
                ...(L ? {} : { callProviderMetadata: fvt(T.metadata) }),
              });
          }
          if (T.type === "reasoning") {
            if (L) {
              if (T.text.trim().length > 0) D.parts.push({ type: "text", text: T.text });
              continue;
            }
            D.parts.push({ type: "reasoning", text: T.text, providerMetadata: T.metadata });
          }
        }
        if (D.parts.length > 0) {
          if ((s.push(D), I.length > 0))
            s.push({
              id: Td.ascending(),
              role: "user",
              parts: [
                { type: "text", text: sja },
                ...I.map((T) => ({ type: "file", url: T.url, mediaType: T.mime, filename: T.filename })),
              ],
            });
        }
      }
    }
    let d = Object.fromEntries(Array.from(a).map((_) => [_, { toModelOutput: f }]));
    return yield* nA(() =>
      Y6i(
        s.filter((_) => _.parts.some((L) => L.type !== "step-start")),
        { tools: d },
      ),
    );
  })),
    (lXe = Ge("MessageV2.page")(function* (e) {
      let { db: t } = yield* Vd,
        r = e.before ? cyr.decode(e.before) : void 0,
        s = r ? Gc(Pi(tx.session_id, e.sessionID), Aja(r)) : Pi(tx.session_id, e.sessionID),
        a = yield* t
          .select()
          .from(tx)
          .where(s)
          .orderBy(TE(tx.time_created), TE(tx.id))
          .limit(e.limit + 1)
          .all()
          .pipe(on);
      if (a.length === 0) {
        if (!(yield* t.select({ id: la.id }).from(la).where(Pi(la.id, e.sessionID)).get().pipe(on)))
          return yield* new Xw({ message: `Session not found: ${e.sessionID}` });
        return { items: [], more: !1 };
      }
      let H = a.length > e.limit,
        u = H ? a.slice(0, e.limit) : a,
        f = yield* uja(t, u);
      f.reverse();
      let d = u.at(-1);
      return { items: f, more: H, cursor: H && d ? cyr.encode({ id: d.id, time: d.time_created }) : void 0 };
    })));
  gOi = Ge("MessageV2.get")(function* (e) {
    let { db: t } = yield* Vd,
      r = yield* t
        .select()
        .from(tx)
        .where(Gc(Pi(tx.id, e.messageID), Pi(tx.session_id, e.sessionID)))
        .get()
        .pipe(on);
    if (!r) return yield* new Xw({ message: `Message not found: ${e.messageID}` });
    return { info: LOi(r), parts: yield* uyr(e.messageID) };
  });
  pja = ni(function* (e) {
    return fja(yield* lja(e));
  });
  Z7c = G1e([DD]);
});
import qN from "path";