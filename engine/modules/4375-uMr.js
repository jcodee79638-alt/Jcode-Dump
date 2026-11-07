
class uMr {
  constructor(e) {
    this._client = e;
  }
  async *callToolStream(e, t = NX, r) {
    let s = this._client,
      a = { ...r, task: r?.task ?? (s.isToolTask(e.name) ? {} : void 0) },
      H = s.requestStream({ method: "tools/call", params: e }, t, a),
      u = s.getToolOutputValidator(e.name);
    for await (let f of H) {
      if (f.type === "result" && u) {
        let d = f.result;
        if (!d.structuredContent && !d.isError) {
          yield {
            type: "error",
            error: new Vu(
              Wl.InvalidRequest,
              `Tool ${e.name} has an output schema but did not return structured content`,
            ),
          };
          return;
        }
        if (d.structuredContent)
          try {
            let _ = u(d.structuredContent);
            if (!_.valid) {
              yield {
                type: "error",
                error: new Vu(
                  Wl.InvalidParams,
                  `Structured content does not match the tool's output schema: ${_.errorMessage}`,
                ),
              };
              return;
            }
          } catch (_) {
            if (_ instanceof Vu) {
              yield { type: "error", error: _ };
              return;
            }
            yield {
              type: "error",
              error: new Vu(
                Wl.InvalidParams,
                `Failed to validate structured content: ${_ instanceof Error ? _.message : String(_)}`,
              ),
            };
            return;
          }
      }
      yield f;
    }
  }
  async getTask(e, t) {
    return this._client.getTask({ taskId: e }, t);
  }
  async getTaskResult(e, t, r) {
    return this._client.getTaskResult({ taskId: e }, t, r);
  }
  async listTasks(e, t) {
    return this._client.listTasks(e ? { cursor: e } : void 0, t);
  }
  async cancelTask(e, t) {
    return this._client.cancelTask({ taskId: e }, t);
  }
  requestStream(e, t, r) {
    return this._client.requestStream(e, t, r);
  }
}