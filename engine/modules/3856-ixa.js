
function ixa({ prompt: e, user: t = "user", assistant: r = "assistant" }) {
  let s = "";
  if (e[0].role === "system")
    ((s += `${e[0].content}

`),
      (e = e.slice(1)));
  for (let { role: a, content: H } of e)
    switch (a) {
      case "system":
        throw new Oq({ message: "Unexpected system message in prompt: ${content}", prompt: e });
      case "user": {
        let u = H.map((f) => {
          switch (f.type) {
            case "text":
              return f.text;
          }
        })
          .filter(Boolean)
          .join("");
        s += `${t}:
${u}

`;
        break;
      }
      case "assistant": {
        let u = H.map((f) => {
          switch (f.type) {
            case "text":
              return f.text;
            case "tool-call":
              throw new gv({ functionality: "tool-call messages" });
          }
        }).join("");
        s += `${r}:
${u}

`;
        break;
      }
      case "tool":
        throw new gv({ functionality: "tool messages" });
      default:
        throw Error(`Unsupported role: ${a}`);
    }
  return (
    (s += `${r}:
`),
    {
      prompt: s,
      stopSequences: [
        `
${t}:`,
      ],
    }
  );
}