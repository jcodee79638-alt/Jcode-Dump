
function YMa(e) {
  var t, r, s;
  let a = [];
  for (let { role: H, content: u, ...f } of e) {
    let d = k5e({ ...f });
    switch (H) {
      case "system": {
        a.push({ role: "system", content: u, ...d });
        break;
      }
      case "user": {
        if (u.length === 1 && u[0].type === "text") {
          a.push({ role: "user", content: u[0].text, ...k5e(u[0]) });
          break;
        }
        a.push({
          role: "user",
          content: u.map((_) => {
            var L;
            let I = k5e(_);
            switch (_.type) {
              case "text":
                return { type: "text", text: _.text, ...I };
              case "file": {
                if (_.mediaType.startsWith("image/")) {
                  let D = _.mediaType === "image/*" ? "image/jpeg" : _.mediaType;
                  return {
                    type: "image_url",
                    image_url: {
                      url: _.data instanceof URL ? _.data.toString() : `data:${D};base64,${vTt(_.data)}`,
                    },
                    ...I,
                  };
                }
                if (_.mediaType.startsWith("audio/")) {
                  if (_.data instanceof URL) throw new gv({ functionality: "audio file parts with URLs" });
                  let D = QMa(_.mediaType);
                  if (D === null) throw new gv({ functionality: `audio media type ${_.mediaType}` });
                  return { type: "input_audio", input_audio: { data: vTt(_.data), format: D }, ...I };
                }
                if (_.mediaType === "application/pdf") {
                  if (_.data instanceof URL) throw new gv({ functionality: "PDF file parts with URLs" });
                  return {
                    type: "file",
                    file: {
                      filename: (L = _.filename) != null ? L : "document.pdf",
                      file_data: `data:application/pdf;base64,${vTt(_.data)}`,
                    },
                    ...I,
                  };
                }
                if (_.mediaType.startsWith("text/"))
                  return {
                    type: "text",
                    text:
                      _.data instanceof URL
                        ? _.data.toString()
                        : typeof _.data === "string"
                          ? new TextDecoder().decode(IX(_.data))
                          : new TextDecoder().decode(_.data),
                    ...I,
                  };
                throw new gv({ functionality: `file part media type ${_.mediaType}` });
              }
            }
          }),
          ...d,
        });
        break;
      }
      case "assistant": {
        let _ = "",
          L = "",
          I = [];
        for (let D of u) {
          let S = k5e(D);
          switch (D.type) {
            case "text": {
              _ += D.text;
              break;
            }
            case "reasoning": {
              L += D.text;
              break;
            }
            case "tool-call": {
              let T =
                (r = (t = D.providerOptions) == null ? void 0 : t.google) == null
                  ? void 0
                  : r.thoughtSignature;
              I.push({
                id: D.toolCallId,
                type: "function",
                function: { name: D.toolName, arguments: JSON.stringify(D.input) },
                ...S,
                ...(T ? { extra_content: { google: { thought_signature: String(T) } } } : {}),
              });
              break;
            }
          }
        }
        a.push({
          role: "assistant",
          content: _,
          ...(L.length > 0 ? { reasoning_content: L } : {}),
          tool_calls: I.length > 0 ? I : void 0,
          ...d,
        });
        break;
      }
      case "tool": {
        for (let _ of u) {
          if (_.type === "tool-approval-response") continue;
          let L = _.output,
            I;
          switch (L.type) {
            case "text":
            case "error-text":
              I = L.value;
              break;
            case "execution-denied":
              I = (s = L.reason) != null ? s : "Tool execution denied.";
              break;
            case "content":
            case "json":
            case "error-json":
              I = JSON.stringify(L.value);
              break;
          }
          let D = k5e(_);
          a.push({ role: "tool", tool_call_id: _.toolCallId, content: I, ...D });
        }
        break;
      }
      default:
        throw Error(`Unsupported role: ${H}`);
    }
  }
  return a;
}