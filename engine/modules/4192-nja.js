
function nja(e) {
  let t = oyr(e),
    r = typeof t?.message === "string" ? (oyr(t.message) ?? t) : t;
  if (!r) return;
  let s = JSON.stringify(r);
  if (r.type !== "error") return;
  switch (r?.error?.code) {
    case "context_length_exceeded":
      return {
        type: "context_overflow",
        message: "Input exceeds context window of this model",
        responseBody: s,
      };
    case "insufficient_quota":
      return {
        type: "api_error",
        message: "Quota exceeded. Check your plan and billing details.",
        isRetryable: !1,
        responseBody: s,
      };
    case "usage_not_included":
      return {
        type: "api_error",
        message: "To use Codex with your ChatGPT plan, upgrade to Plus: https://chatgpt.com/explore/plus.",
        isRetryable: !1,
        responseBody: s,
      };
    case "invalid_prompt":
      return {
        type: "api_error",
        message: typeof r?.error?.message === "string" ? r?.error?.message : "Invalid prompt.",
        isRetryable: !1,
        responseBody: s,
      };
    case "server_is_overloaded":
    case "server_error":
      return {
        type: "api_error",
        message: typeof r?.error?.message === "string" ? r?.error?.message : "Server error.",
        isRetryable: !0,
        responseBody: s,
      };
  }
  return {
    type: "api_error",
    message: typeof r?.error?.message === "string" ? r.error.message : "Server error.",
    isRetryable: !0,
    responseBody: s,
  };
}