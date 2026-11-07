
function m3a(e, t) {
  let { id: r, choices: s, created: a, model: H, system_fingerprint: u, ...f } = e,
    d = {
      ...f,
      id: r,
      choices: s.map(({ message: _, finish_reason: L, index: I, logprobs: D, ...S }) => {
        if (!L) throw new bc(`missing finish_reason for choice ${I}`);
        let { content: T = null, function_call: C, tool_calls: O, ...B } = _,
          V = _.role;
        if (!V) throw new bc(`missing role for choice ${I}`);
        if (C) {
          let { arguments: q, name: Z } = C;
          if (q == null) throw new bc(`missing function_call.arguments for choice ${I}`);
          if (!Z) throw new bc(`missing function_call.name for choice ${I}`);
          return {
            ...S,
            message: {
              content: T,
              function_call: { arguments: q, name: Z },
              role: V,
              refusal: _.refusal ?? null,
            },
            finish_reason: L,
            index: I,
            logprobs: D,
          };
        }
        if (O)
          return {
            ...S,
            index: I,
            finish_reason: L,
            logprobs: D,
            message: {
              ...B,
              role: V,
              content: T,
              refusal: _.refusal ?? null,
              tool_calls: O.map((q, Z) => {
                let { function: se, type: ae, id: z, ...Ae } = q,
                  { arguments: le, name: Be, ...Te } = se || {};
                if (z == null)
                  throw new bc(`missing choices[${I}].tool_calls[${Z}].id
${TPt(e)}`);
                if (ae == null)
                  throw new bc(`missing choices[${I}].tool_calls[${Z}].type
${TPt(e)}`);
                if (Be == null)
                  throw new bc(`missing choices[${I}].tool_calls[${Z}].function.name
${TPt(e)}`);
                if (le == null)
                  throw new bc(`missing choices[${I}].tool_calls[${Z}].function.arguments
${TPt(e)}`);
                return { ...Ae, id: z, type: ae, function: { ...Te, name: Be, arguments: le } };
              }),
            },
          };
        return {
          ...S,
          message: { ...B, content: T, role: V, refusal: _.refusal ?? null },
          finish_reason: L,
          index: I,
          logprobs: D,
        };
      }),
      created: a,
      model: H,
      object: "chat.completion",
      ...(u ? { system_fingerprint: u } : {}),
    };
  return RVi(d, t);
}