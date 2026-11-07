
function EMn(e) {
  let t = {
    ...e.options,
    ...(e.temperature === void 0 ? {} : { temperature: e.temperature }),
    ...(e.top_p === void 0 ? {} : { top_p: e.top_p }),
  };
  return {
    model: e.model,
    variant: e.variant,
    request: Object.keys(t).length ? { body: t } : void 0,
    system: e.prompt,
    description: e.description,
    mode: e.mode,
    hidden: e.hidden,
    color: e.color,
    steps: e.steps,
    disabled: e.disable,
    permissions: gMn(e.permission),
  };
}