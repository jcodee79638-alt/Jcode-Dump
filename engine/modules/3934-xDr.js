
function xDr(e) {
  if (!pDr.isInstance(e)) return e;
  let t = (process == null ? void 0 : "development") === "production",
    r = "https://ai-sdk.dev/unauthenticated-ai-gateway";
  if (t)
    return new pc({
      name: "GatewayError",
      message: `Unauthenticated. Configure AI_GATEWAY_API_KEY or use a provider module. Learn more: ${r}`,
    });
  return Object.assign(
    Error(`\x1B[1m\x1B[31mUnauthenticated request to AI Gateway.\x1B[0m

To authenticate, set the \x1B[33mAI_GATEWAY_API_KEY\x1B[0m environment variable with your API key.

Alternatively, you can use a provider module instead of the AI Gateway.

Learn more: \x1B[34m${r}\x1B[0m

`),
    { name: "GatewayAuthenticationError" },
  );
}