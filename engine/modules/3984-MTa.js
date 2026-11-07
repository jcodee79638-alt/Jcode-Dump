
function MTa({
  stream: e,
  messageMetadataSchema: t,
  dataPartSchemas: r,
  runUpdateMessageJob: s,
  onError: a,
  onToolCall: H,
  onData: u,
}) {
  return e.pipeThrough(
    new TransformStream({
      async transform(f, d) {
        await s(async ({ state: _, write: L }) => {
          var I, D, S, T;
          function C(q) {
            let se = _.message.parts.filter(Hje).find((ae) => ae.toolCallId === q);
            if (se == null)
              throw new aje({
                chunkType: "tool-invocation",
                chunkId: q,
                message: `No tool invocation found for tool call ID "${q}".`,
              });
            return se;
          }
          function O(q) {
            var Z;
            let se = _.message.parts.find((Ae) => EDr(Ae) && Ae.toolCallId === q.toolCallId),
              ae = q,
              z = se;
            if (se != null) {
              if (
                ((se.state = q.state),
                (z.input = ae.input),
                (z.output = ae.output),
                (z.errorText = ae.errorText),
                (z.rawInput = ae.rawInput),
                (z.preliminary = ae.preliminary),
                q.title !== void 0)
              )
                z.title = q.title;
              z.providerExecuted = (Z = ae.providerExecuted) != null ? Z : se.providerExecuted;
              let Ae = ae.providerMetadata;
              if (Ae != null)
                if (q.state === "output-available" || q.state === "output-error") {
                  let le = se;
                  le.resultProviderMetadata = Ae;
                } else se.callProviderMetadata = Ae;
            } else
              _.message.parts.push({
                type: `tool-${q.toolName}`,
                toolCallId: q.toolCallId,
                state: q.state,
                title: q.title,
                input: ae.input,
                output: ae.output,
                rawInput: ae.rawInput,
                errorText: ae.errorText,
                providerExecuted: ae.providerExecuted,
                preliminary: ae.preliminary,
                ...(ae.providerMetadata != null &&
                (q.state === "output-available" || q.state === "output-error")
                  ? { resultProviderMetadata: ae.providerMetadata }
                  : {}),
                ...(ae.providerMetadata != null &&
                !(q.state === "output-available" || q.state === "output-error")
                  ? { callProviderMetadata: ae.providerMetadata }
                  : {}),
              });
          }
          function B(q) {
            var Z, se;
            let ae = _.message.parts.find(
                (le) => le.type === "dynamic-tool" && le.toolCallId === q.toolCallId,
              ),
              z = q,
              Ae = ae;
            if (ae != null) {
              if (
                ((ae.state = q.state),
                (Ae.toolName = q.toolName),
                (Ae.input = z.input),
                (Ae.output = z.output),
                (Ae.errorText = z.errorText),
                (Ae.rawInput = (Z = z.rawInput) != null ? Z : Ae.rawInput),
                (Ae.preliminary = z.preliminary),
                q.title !== void 0)
              )
                Ae.title = q.title;
              Ae.providerExecuted = (se = z.providerExecuted) != null ? se : ae.providerExecuted;
              let le = z.providerMetadata;
              if (le != null)
                if (q.state === "output-available" || q.state === "output-error") {
                  let Be = ae;
                  Be.resultProviderMetadata = le;
                } else ae.callProviderMetadata = le;
            } else
              _.message.parts.push({
                type: "dynamic-tool",
                toolName: q.toolName,
                toolCallId: q.toolCallId,
                state: q.state,
                input: z.input,
                output: z.output,
                errorText: z.errorText,
                preliminary: z.preliminary,
                providerExecuted: z.providerExecuted,
                title: q.title,
                ...(z.providerMetadata != null &&
                (q.state === "output-available" || q.state === "output-error")
                  ? { resultProviderMetadata: z.providerMetadata }
                  : {}),
                ...(z.providerMetadata != null &&
                !(q.state === "output-available" || q.state === "output-error")
                  ? { callProviderMetadata: z.providerMetadata }
                  : {}),
              });
          }
          async function V(q) {
            if (q != null) {
              let Z = _.message.metadata != null ? bDr(_.message.metadata, q) : q;
              if (t != null)
                await w5e({
                  value: Z,
                  schema: t,
                  context: { field: "message.metadata", entityId: _.message.id },
                });
              _.message.metadata = Z;
            }
          }
          switch (f.type) {
            case "text-start": {
              let q = { type: "text", text: "", providerMetadata: f.providerMetadata, state: "streaming" };
              ((_.activeTextParts[f.id] = q), _.message.parts.push(q), L());
              break;
            }
            case "text-delta": {
              let q = _.activeTextParts[f.id];
              if (q == null)
                throw new aje({
                  chunkType: "text-delta",
                  chunkId: f.id,
                  message: `Received text-delta for missing text part with ID "${f.id}". Ensure a "text-start" chunk is sent before any "text-delta" chunks.`,
                });
              ((q.text += f.delta),
                (q.providerMetadata = (I = f.providerMetadata) != null ? I : q.providerMetadata),
                L());
              break;
            }
            case "text-end": {
              let q = _.activeTextParts[f.id];
              if (q == null)
                throw new aje({
                  chunkType: "text-end",
                  chunkId: f.id,
                  message: `Received text-end for missing text part with ID "${f.id}". Ensure a "text-start" chunk is sent before any "text-end" chunks.`,
                });
              ((q.state = "done"),
                (q.providerMetadata = (D = f.providerMetadata) != null ? D : q.providerMetadata),
                delete _.activeTextParts[f.id],
                L());
              break;
            }
            case "reasoning-start": {
              let q = {
                type: "reasoning",
                text: "",
                providerMetadata: f.providerMetadata,
                state: "streaming",
              };
              ((_.activeReasoningParts[f.id] = q), _.message.parts.push(q), L());
              break;
            }
            case "reasoning-delta": {
              let q = _.activeReasoningParts[f.id];
              if (q == null)
                throw new aje({
                  chunkType: "reasoning-delta",
                  chunkId: f.id,
                  message: `Received reasoning-delta for missing reasoning part with ID "${f.id}". Ensure a "reasoning-start" chunk is sent before any "reasoning-delta" chunks.`,
                });
              ((q.text += f.delta),
                (q.providerMetadata = (S = f.providerMetadata) != null ? S : q.providerMetadata),
                L());
              break;
            }
            case "reasoning-end": {
              let q = _.activeReasoningParts[f.id];
              if (q == null)
                throw new aje({
                  chunkType: "reasoning-end",
                  chunkId: f.id,
                  message: `Received reasoning-end for missing reasoning part with ID "${f.id}". Ensure a "reasoning-start" chunk is sent before any "reasoning-end" chunks.`,
                });
              ((q.providerMetadata = (T = f.providerMetadata) != null ? T : q.providerMetadata),
                (q.state = "done"),
                delete _.activeReasoningParts[f.id],
                L());
              break;
            }
            case "file": {
              (_.message.parts.push({
                type: "file",
                mediaType: f.mediaType,
                url: f.url,
                ...(f.providerMetadata != null ? { providerMetadata: f.providerMetadata } : {}),
              }),
                L());
              break;
            }
            case "source-url": {
              (_.message.parts.push({
                type: "source-url",
                sourceId: f.sourceId,
                url: f.url,
                title: f.title,
                providerMetadata: f.providerMetadata,
              }),
                L());
              break;
            }
            case "source-document": {
              (_.message.parts.push({
                type: "source-document",
                sourceId: f.sourceId,
                mediaType: f.mediaType,
                title: f.title,
                filename: f.filename,
                providerMetadata: f.providerMetadata,
              }),
                L());
              break;
            }
            case "tool-input-start": {
              let q = _.message.parts.filter(EDr);
              if (
                ((_.partialToolCalls[f.toolCallId] = {
                  text: "",
                  toolName: f.toolName,
                  index: q.length,
                  dynamic: f.dynamic,
                  title: f.title,
                }),
                f.dynamic)
              )
                B({
                  toolCallId: f.toolCallId,
                  toolName: f.toolName,
                  state: "input-streaming",
                  input: void 0,
                  providerExecuted: f.providerExecuted,
                  title: f.title,
                  providerMetadata: f.providerMetadata,
                });
              else
                O({
                  toolCallId: f.toolCallId,
                  toolName: f.toolName,
                  state: "input-streaming",
                  input: void 0,
                  providerExecuted: f.providerExecuted,
                  title: f.title,
                  providerMetadata: f.providerMetadata,
                });
              L();
              break;
            }
            case "tool-input-delta": {
              let q = _.partialToolCalls[f.toolCallId];
              if (q == null)
                throw new aje({
                  chunkType: "tool-input-delta",
                  chunkId: f.toolCallId,
                  message: `Received tool-input-delta for missing tool call with ID "${f.toolCallId}". Ensure a "tool-input-start" chunk is sent before any "tool-input-delta" chunks.`,
                });
              q.text += f.inputTextDelta;
              let { value: Z } = await uje(q.text);
              if (q.dynamic)
                B({
                  toolCallId: f.toolCallId,
                  toolName: q.toolName,
                  state: "input-streaming",
                  input: Z,
                  title: q.title,
                });
              else
                O({
                  toolCallId: f.toolCallId,
                  toolName: q.toolName,
                  state: "input-streaming",
                  input: Z,
                  title: q.title,
                });
              L();
              break;
            }
            case "tool-input-available": {
              if (f.dynamic)
                B({
                  toolCallId: f.toolCallId,
                  toolName: f.toolName,
                  state: "input-available",
                  input: f.input,
                  providerExecuted: f.providerExecuted,
                  providerMetadata: f.providerMetadata,
                  title: f.title,
                });
              else
                O({
                  toolCallId: f.toolCallId,
                  toolName: f.toolName,
                  state: "input-available",
                  input: f.input,
                  providerExecuted: f.providerExecuted,
                  providerMetadata: f.providerMetadata,
                  title: f.title,
                });
              if ((L(), H && !f.providerExecuted)) await H({ toolCall: f });
              break;
            }
            case "tool-input-error": {
              let q = _.message.parts.filter(Hje).find((se) => se.toolCallId === f.toolCallId);
              if (q != null ? q.type === "dynamic-tool" : !!f.dynamic)
                B({
                  toolCallId: f.toolCallId,
                  toolName: f.toolName,
                  state: "output-error",
                  input: f.input,
                  errorText: f.errorText,
                  providerExecuted: f.providerExecuted,
                  providerMetadata: f.providerMetadata,
                });
              else
                O({
                  toolCallId: f.toolCallId,
                  toolName: f.toolName,
                  state: "output-error",
                  input: void 0,
                  rawInput: f.input,
                  errorText: f.errorText,
                  providerExecuted: f.providerExecuted,
                  providerMetadata: f.providerMetadata,
                });
              L();
              break;
            }
            case "tool-approval-request": {
              let q = C(f.toolCallId);
              ((q.state = "approval-requested"), (q.approval = { id: f.approvalId }), L());
              break;
            }
            case "tool-output-denied": {
              let q = C(f.toolCallId);
              ((q.state = "output-denied"), L());
              break;
            }
            case "tool-output-available": {
              let q = C(f.toolCallId);
              if (q.type === "dynamic-tool")
                B({
                  toolCallId: f.toolCallId,
                  toolName: q.toolName,
                  state: "output-available",
                  input: q.input,
                  output: f.output,
                  preliminary: f.preliminary,
                  providerExecuted: f.providerExecuted,
                  providerMetadata: f.providerMetadata,
                  title: q.title,
                });
              else
                O({
                  toolCallId: f.toolCallId,
                  toolName: IDr(q),
                  state: "output-available",
                  input: q.input,
                  output: f.output,
                  providerExecuted: f.providerExecuted,
                  preliminary: f.preliminary,
                  providerMetadata: f.providerMetadata,
                  title: q.title,
                });
              L();
              break;
            }
            case "tool-output-error": {
              let q = C(f.toolCallId);
              if (q.type === "dynamic-tool")
                B({
                  toolCallId: f.toolCallId,
                  toolName: q.toolName,
                  state: "output-error",
                  input: q.input,
                  errorText: f.errorText,
                  providerExecuted: f.providerExecuted,
                  providerMetadata: f.providerMetadata,
                  title: q.title,
                });
              else
                O({
                  toolCallId: f.toolCallId,
                  toolName: IDr(q),
                  state: "output-error",
                  input: q.input,
                  rawInput: q.rawInput,
                  errorText: f.errorText,
                  providerExecuted: f.providerExecuted,
                  providerMetadata: f.providerMetadata,
                  title: q.title,
                });
              L();
              break;
            }
            case "start-step": {
              _.message.parts.push({ type: "step-start" });
              break;
            }
            case "finish-step": {
              ((_.activeTextParts = {}), (_.activeReasoningParts = {}));
              break;
            }
            case "start": {
              if (f.messageId != null) _.message.id = f.messageId;
              if ((await V(f.messageMetadata), f.messageId != null || f.messageMetadata != null)) L();
              break;
            }
            case "finish": {
              if (f.finishReason != null) _.finishReason = f.finishReason;
              if ((await V(f.messageMetadata), f.messageMetadata != null)) L();
              break;
            }
            case "message-metadata": {
              if ((await V(f.messageMetadata), f.messageMetadata != null)) L();
              break;
            }
            case "error": {
              a == null || a(Error(f.errorText));
              break;
            }
            default:
              if (DTa(f)) {
                if ((r == null ? void 0 : r[f.type]) != null) {
                  let se = _.message.parts.findIndex(
                      (z) => "id" in z && "data" in z && z.id === f.id && z.type === f.type,
                    ),
                    ae = se >= 0 ? se : _.message.parts.length;
                  await w5e({
                    value: f.data,
                    schema: r[f.type],
                    context: { field: `message.parts[${ae}].data`, entityName: f.type, entityId: f.id },
                  });
                }
                let q = f;
                if (q.transient) {
                  u == null || u(q);
                  break;
                }
                let Z =
                  q.id != null ? _.message.parts.find((se) => q.type === se.type && q.id === se.id) : void 0;
                if (Z != null) Z.data = q.data;
                else _.message.parts.push(q);
                (u == null || u(q), L());
              }
          }
          d.enqueue(f);
        });
      },
    }),
  );
}