
var iki = ne(() => {
  od();
  Ih();
  W1();
  W1();
  od();
  Ih();
  W1();
  od();
  Ih();
  W1();
  od();
  W1();
  od();
  Ih();
  W1();
  W1();
  Ih();
  W1();
  Ih();
  ((zMa = os({
    error: os({
      message: lr(),
      type: lr().nullish(),
      param: cTt().nullish(),
      code: Ip([lr(), zu()]).nullish(),
    }),
  })),
    (U5e = { errorSchema: zMa, errorToMessage: (e) => e.error.message }));
  O5e = os({
    user: lr().optional(),
    reasoningEffort: lr().optional(),
    textVerbosity: lr().optional(),
    strictJsonSchema: ru().optional(),
  });
  ((tki = UD({
    prompt_tokens: zu().nullish(),
    completion_tokens: zu().nullish(),
    total_tokens: zu().nullish(),
    prompt_tokens_details: os({ cached_tokens: zu().nullish() }).nullish(),
    completion_tokens_details: os({
      reasoning_tokens: zu().nullish(),
      accepted_prediction_tokens: zu().nullish(),
      rejected_prediction_tokens: zu().nullish(),
    }).nullish(),
  }).nullish()),
    (txa = UD({
      id: lr().nullish(),
      created: zu().nullish(),
      model: lr().nullish(),
      choices: Va(
        os({
          message: os({
            role: Fs("assistant").nullish(),
            content: lr().nullish(),
            reasoning_content: lr().nullish(),
            reasoning: lr().nullish(),
            tool_calls: Va(
              os({
                id: lr().nullish(),
                function: os({ name: lr(), arguments: lr() }),
                extra_content: os({ google: os({ thought_signature: lr().nullish() }).nullish() }).nullish(),
              }),
            ).nullish(),
          }),
          finish_reason: lr().nullish(),
        }),
      ),
      usage: tki,
    })),
    (rxa = UD({
      id: lr().nullish(),
      created: zu().nullish(),
      model: lr().nullish(),
      choices: Va(
        os({
          delta: os({
            role: ax(["assistant"]).nullish(),
            content: lr().nullish(),
            reasoning_content: lr().nullish(),
            reasoning: lr().nullish(),
            tool_calls: Va(
              os({
                index: zu().nullish(),
                id: lr().nullish(),
                function: os({ name: lr().nullish(), arguments: lr().nullish() }),
                extra_content: os({ google: os({ thought_signature: lr().nullish() }).nullish() }).nullish(),
              }),
            ).nullish(),
          }).nullish(),
          finish_reason: lr().nullish(),
        }),
      ),
      usage: tki,
    })));
  ((Ywi = os({
    echo: ru().optional(),
    logitBias: M_(lr(), zu()).optional(),
    suffix: lr().optional(),
    user: lr().optional(),
  })),
    (rki = os({ prompt_tokens: zu(), completion_tokens: zu(), total_tokens: zu() })),
    (oxa = os({
      id: lr().nullish(),
      created: zu().nullish(),
      model: lr().nullish(),
      choices: Va(os({ text: lr(), finish_reason: lr() })),
      usage: rki.nullish(),
    })),
    (iDr = os({ dimensions: zu().optional(), user: lr().optional() })),
    (cxa = os({
      data: Va(os({ embedding: Va(zu()) })),
      usage: os({ prompt_tokens: zu() }).nullish(),
      providerMetadata: M_(lr(), M_(lr(), cTt())).optional(),
    })),
    (Zwi = os({ data: Va(os({ b64_json: lr() })) })));
});