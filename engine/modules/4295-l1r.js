
class l1r {
  constructor(e) {
    if (
      ((this._options = e),
      (this._requestMessageId = 0),
      (this._requestHandlers = new Map()),
      (this._requestHandlerAbortControllers = new Map()),
      (this._notificationHandlers = new Map()),
      (this._responseHandlers = new Map()),
      (this._progressHandlers = new Map()),
      (this._timeoutInfo = new Map()),
      (this._pendingDebouncedNotifications = new Set()),
      (this._taskProgressTokens = new Map()),
      (this._requestResolvers = new Map()),
      this.setNotificationHandler(yvt, (t) => {
        this._oncancel(t);
      }),
      this.setNotificationHandler(Svt, (t) => {
        this._onprogress(t);
      }),
      this.setRequestHandler(xvt, (t) => ({})),
      (this._taskStore = e?.taskStore),
      (this._taskMessageQueue = e?.taskMessageQueue),
      this._taskStore)
    )
      (this.setRequestHandler(Tvt, async (t, r) => {
        let s = await this._taskStore.getTask(t.params.taskId, r.sessionId);
        if (!s) throw new Vu(Wl.InvalidParams, "Failed to retrieve task: Task not found");
        return { ...s };
      }),
        this.setRequestHandler(bvt, async (t, r) => {
          let s = async () => {
            let a = t.params.taskId;
            if (!(await this._taskStore.getTask(a, r.sessionId)))
              throw new Vu(Wl.InvalidParams, `Task not found: ${a}`);
            if (this._taskMessageQueue) {
              let u;
              while ((u = await this._taskMessageQueue.dequeue(a, r.sessionId))) {
                if (u.type === "response" || u.type === "error") {
                  let f = u.message,
                    d = f.id,
                    _ = this._requestResolvers.get(d);
                  if (_)
                    if ((this._requestResolvers.delete(d), u.type === "response")) _(f);
                    else {
                      let L = f,
                        I = new Vu(L.error.code, L.error.message, L.error.data);
                      _(I);
                    }
                  else {
                    let L = u.type === "response" ? "Response" : "Error";
                    this._onerror(Error(`${L} handler missing for request ${d}`));
                  }
                  continue;
                }
                await this._transport?.send(u.message, { relatedRequestId: r.requestId });
              }
            }
            let H = await this._taskStore.getTask(a, r.sessionId);
            if (!H) throw new Vu(Wl.InvalidParams, `Task not found: ${a}`);
            if (!kHe(H.status)) return (await this._waitForTaskUpdate(a, r.signal, r.sessionId), await s());
            if (kHe(H.status)) {
              let u = await this._taskStore.getTaskResult(a, r.sessionId);
              return (
                this._clearTaskQueue(a, r.sessionId),
                { ...u, _meta: { ...u._meta, [CHe]: { taskId: a } } }
              );
            }
            return await s();
          };
          return await s();
        }),
        this.setRequestHandler(jvt, async (t, r) => {
          try {
            let { tasks: s, nextCursor: a } = await this._taskStore.listTasks(t.params?.cursor, r.sessionId);
            return { tasks: s, nextCursor: a, _meta: {} };
          } catch (s) {
            throw new Vu(
              Wl.InvalidParams,
              `Failed to list tasks: ${s instanceof Error ? s.message : String(s)}`,
            );
          }
        }),
        this.setRequestHandler(Cvt, async (t, r) => {
          try {
            let s = await this._taskStore.getTask(t.params.taskId, r.sessionId);
            if (!s) throw new Vu(Wl.InvalidParams, `Task not found: ${t.params.taskId}`);
            if (kHe(s.status))
              throw new Vu(Wl.InvalidParams, `Cannot cancel task in terminal status: ${s.status}`);
            (await this._taskStore.updateTaskStatus(
              t.params.taskId,
              "cancelled",
              "Client cancelled task execution.",
              r.sessionId,
            ),
              this._clearTaskQueue(t.params.taskId, r.sessionId));
            let a = await this._taskStore.getTask(t.params.taskId, r.sessionId);
            if (!a) throw new Vu(Wl.InvalidParams, `Task not found after cancellation: ${t.params.taskId}`);
            return { _meta: {}, ...a };
          } catch (s) {
            if (s instanceof Vu) throw s;
            throw new Vu(
              Wl.InvalidRequest,
              `Failed to cancel task: ${s instanceof Error ? s.message : String(s)}`,
            );
          }
        }));
  }
  async _oncancel(e) {
    if (!e.params.requestId) return;
    this._requestHandlerAbortControllers.get(e.params.requestId)?.abort(e.params.reason);
  }
  _setupTimeout(e, t, r, s, a = !1) {
    this._timeoutInfo.set(e, {
      timeoutId: setTimeout(s, t),
      startTime: Date.now(),
      timeout: t,
      maxTotalTimeout: r,
      resetTimeoutOnProgress: a,
      onTimeout: s,
    });
  }
  _resetTimeout(e) {
    let t = this._timeoutInfo.get(e);
    if (!t) return !1;
    let r = Date.now() - t.startTime;
    if (t.maxTotalTimeout && r >= t.maxTotalTimeout)
      throw (
        this._timeoutInfo.delete(e),
        Vu.fromError(Wl.RequestTimeout, "Maximum total timeout exceeded", {
          maxTotalTimeout: t.maxTotalTimeout,
          totalElapsed: r,
        })
      );
    return (clearTimeout(t.timeoutId), (t.timeoutId = setTimeout(t.onTimeout, t.timeout)), !0);
  }
  _cleanupTimeout(e) {
    let t = this._timeoutInfo.get(e);
    if (t) (clearTimeout(t.timeoutId), this._timeoutInfo.delete(e));
  }
  async connect(e) {
    if (this._transport)
      throw Error(
        "Already connected to a transport. Call close() before connecting to a new transport, or use a separate Protocol instance per connection.",
      );
    this._transport = e;
    let t = this.transport?.onclose;
    this._transport.onclose = () => {
      (t?.(), this._onclose());
    };
    let r = this.transport?.onerror;
    this._transport.onerror = (a) => {
      (r?.(a), this._onerror(a));
    };
    let s = this._transport?.onmessage;
    ((this._transport.onmessage = (a, H) => {
      if ((s?.(a, H), qhe(a) || Dvt(a))) this._onresponse(a);
      else if ($Xe(a)) this._onrequest(a, H);
      else if (eUi(a)) this._onnotification(a);
      else this._onerror(Error(`Unknown message type: ${JSON.stringify(a)}`));
    }),
      await this._transport.start());
  }
  _onclose() {
    let e = this._responseHandlers;
    ((this._responseHandlers = new Map()),
      this._progressHandlers.clear(),
      this._taskProgressTokens.clear(),
      this._pendingDebouncedNotifications.clear());
    for (let r of this._timeoutInfo.values()) clearTimeout(r.timeoutId);
    this._timeoutInfo.clear();
    for (let r of this._requestHandlerAbortControllers.values()) r.abort();
    this._requestHandlerAbortControllers.clear();
    let t = Vu.fromError(Wl.ConnectionClosed, "Connection closed");
    ((this._transport = void 0), this.onclose?.());
    for (let r of e.values()) r(t);
  }
  _onerror(e) {
    this.onerror?.(e);
  }
  _onnotification(e) {
    let t = this._notificationHandlers.get(e.method) ?? this.fallbackNotificationHandler;
    if (t === void 0) return;
    Promise.resolve()
      .then(() => t(e))
      .catch((r) => this._onerror(Error(`Uncaught error in notification handler: ${r}`)));
  }
  _onrequest(e, t) {
    let r = this._requestHandlers.get(e.method) ?? this.fallbackRequestHandler,
      s = this._transport,
      a = e.params?._meta?.[CHe]?.taskId,
      H = s?.sessionId,
      u = this._taskStore,
      f = !0,
      d;
    if (a && u && this._taskMessageQueue && H !== void 0)
      ((f = !1),
        (d = (async () => {
          if (!(await u.getTask(a, H))) throw new Vu(Wl.InvalidParams, `Task not found: ${a}`);
          f = !0;
        })()));
    if (r === void 0) {
      let S = { jsonrpc: "2.0", id: e.id, error: { code: Wl.MethodNotFound, message: "Method not found" } };
      if (a && d) {
        let T = { type: "error", message: S, timestamp: Date.now() };
        d.then(
          () => this._enqueueTaskMessage(a, T, H),
          () => s?.send(S),
        ).catch((C) => this._onerror(Error(`Failed to send an error response: ${C}`)));
      } else if (a && this._taskMessageQueue)
        this._enqueueTaskMessage(a, { type: "error", message: S, timestamp: Date.now() }, s?.sessionId).catch(
          (T) => this._onerror(Error(`Failed to enqueue error response: ${T}`)),
        );
      else s?.send(S).catch((T) => this._onerror(Error(`Failed to send an error response: ${T}`)));
      return;
    }
    let _ = new AbortController();
    this._requestHandlerAbortControllers.set(e.id, _);
    let L = QOi(e.params) ? e.params.task : void 0,
      I = this._taskStore ? this.requestTaskStore(e, s?.sessionId) : void 0,
      D = {
        signal: _.signal,
        sessionId: s?.sessionId,
        _meta: e.params?._meta,
        sendNotification: async (S) => {
          if (_.signal.aborted) return;
          let T = { relatedRequestId: e.id };
          if (a) T.relatedTask = { taskId: a };
          await this.notification(S, T);
        },
        sendRequest: async (S, T, C) => {
          if (_.signal.aborted) throw new Vu(Wl.ConnectionClosed, "Request was cancelled");
          let O = { ...C, relatedRequestId: e.id };
          if (a && !O.relatedTask) O.relatedTask = { taskId: a };
          let B = O.relatedTask?.taskId ?? a;
          if (B && I) await I.updateTaskStatus(B, "input_required");
          return await this.request(S, T, O);
        },
        authInfo: t?.authInfo,
        requestId: e.id,
        requestInfo: t?.requestInfo,
        taskId: a,
        taskStore: I,
        taskRequestedTtl: L?.ttl,
        closeSSEStream: t?.closeSSEStream,
        closeStandaloneSSEStream: t?.closeStandaloneSSEStream,
      };
    (d ?? Promise.resolve())
      .then(() => {
        if (d && _.signal.aborted) throw new Vu(Wl.ConnectionClosed, "Request was cancelled");
        if (L) this.assertTaskHandlerCapability(e.method);
      })
      .then(() => r(e, D))
      .then(
        async (S) => {
          if (_.signal.aborted) return;
          let T = { result: S, jsonrpc: "2.0", id: e.id };
          if (a && this._taskMessageQueue)
            await this._enqueueTaskMessage(
              a,
              { type: "response", message: T, timestamp: Date.now() },
              s?.sessionId,
            );
          else await s?.send(T);
        },
        async (S) => {
          if (_.signal.aborted) return;
          let T = {
            jsonrpc: "2.0",
            id: e.id,
            error: {
              code: Number.isSafeInteger(S.code) ? S.code : Wl.InternalError,
              message: S.message ?? "Internal error",
              ...(S.data !== void 0 && { data: S.data }),
            },
          };
          if (a && this._taskMessageQueue && f)
            await this._enqueueTaskMessage(
              a,
              { type: "error", message: T, timestamp: Date.now() },
              s?.sessionId,
            );
          else await s?.send(T);
        },
      )
      .catch((S) => this._onerror(Error(`Failed to send response: ${S}`)))
      .finally(() => {
        if (this._requestHandlerAbortControllers.get(e.id) === _)
          this._requestHandlerAbortControllers.delete(e.id);
      });
  }
  _onprogress(e) {
    let { progressToken: t, ...r } = e.params,
      s = Number(t),
      a = this._progressHandlers.get(s);
    if (!a) {
      this._onerror(Error(`Received a progress notification for an unknown token: ${JSON.stringify(e)}`));
      return;
    }
    let H = this._responseHandlers.get(s),
      u = this._timeoutInfo.get(s);
    if (u && H && u.resetTimeoutOnProgress)
      try {
        this._resetTimeout(s);
      } catch (f) {
        (this._responseHandlers.delete(s), this._progressHandlers.delete(s), this._cleanupTimeout(s), H(f));
        return;
      }
    a(r);
  }
  _onresponse(e) {
    let t = Number(e.id),
      r = this._requestResolvers.get(t);
    if (r) {
      if ((this._requestResolvers.delete(t), qhe(e))) r(e);
      else {
        let H = new Vu(e.error.code, e.error.message, e.error.data);
        r(H);
      }
      return;
    }
    let s = this._responseHandlers.get(t);
    if (s === void 0) {
      this._onerror(Error(`Received a response for an unknown message ID: ${JSON.stringify(e)}`));
      return;
    }
    (this._responseHandlers.delete(t), this._cleanupTimeout(t));
    let a = !1;
    if (qhe(e) && e.result && typeof e.result === "object") {
      let H = e.result;
      if (H.task && typeof H.task === "object") {
        let u = H.task;
        if (typeof u.taskId === "string") ((a = !0), this._taskProgressTokens.set(u.taskId, t));
      }
    }
    if (!a) this._progressHandlers.delete(t);
    if (qhe(e)) s(e);
    else {
      let H = Vu.fromError(e.error.code, e.error.message, e.error.data);
      s(H);
    }
  }
  get transport() {
    return this._transport;
  }
  async close() {
    await this._transport?.close();
  }
  async *requestStream(e, t, r) {
    let { task: s } = r ?? {};
    if (!s) {
      try {
        yield { type: "result", result: await this.request(e, t, r) };
      } catch (H) {
        yield { type: "error", error: H instanceof Vu ? H : new Vu(Wl.InternalError, String(H)) };
      }
      return;
    }
    let a;
    try {
      let H = await this.request(e, Xhe, r);
      if (H.task) ((a = H.task.taskId), yield { type: "taskCreated", task: H.task });
      else throw new Vu(Wl.InternalError, "Task creation did not return a task");
      while (!0) {
        let u = await this.getTask({ taskId: a }, r);
        if ((yield { type: "taskStatus", task: u }, kHe(u.status))) {
          if (u.status === "completed")
            yield { type: "result", result: await this.getTaskResult({ taskId: a }, t, r) };
          else if (u.status === "failed")
            yield { type: "error", error: new Vu(Wl.InternalError, `Task ${a} failed`) };
          else if (u.status === "cancelled")
            yield { type: "error", error: new Vu(Wl.InternalError, `Task ${a} was cancelled`) };
          return;
        }
        if (u.status === "input_required") {
          yield { type: "result", result: await this.getTaskResult({ taskId: a }, t, r) };
          return;
        }
        let f = u.pollInterval ?? this._options?.defaultTaskPollInterval ?? 1000;
        (await new Promise((d) => setTimeout(d, f)), r?.signal?.throwIfAborted());
      }
    } catch (H) {
      yield { type: "error", error: H instanceof Vu ? H : new Vu(Wl.InternalError, String(H)) };
    }
  }
  request(e, t, r) {
    let { relatedRequestId: s, resumptionToken: a, onresumptiontoken: H, task: u, relatedTask: f } = r ?? {};
    return new Promise((d, _) => {
      let L = (B) => {
        _(B);
      };
      if (!this._transport) {
        L(Error("Not connected"));
        return;
      }
      if (this._options?.enforceStrictCapabilities === !0)
        try {
          if ((this.assertCapabilityForMethod(e.method), u)) this.assertTaskCapability(e.method);
        } catch (B) {
          L(B);
          return;
        }
      r?.signal?.throwIfAborted();
      let I = this._requestMessageId++,
        D = { ...e, jsonrpc: "2.0", id: I };
      if (r?.onprogress)
        (this._progressHandlers.set(I, r.onprogress),
          (D.params = { ...e.params, _meta: { ...(e.params?._meta || {}), progressToken: I } }));
      if (u) D.params = { ...D.params, task: u };
      if (f) D.params = { ...D.params, _meta: { ...(D.params?._meta || {}), [CHe]: f } };
      let S = (B) => {
        (this._responseHandlers.delete(I),
          this._progressHandlers.delete(I),
          this._cleanupTimeout(I),
          this._transport
            ?.send(
              {
                jsonrpc: "2.0",
                method: "notifications/cancelled",
                params: { requestId: I, reason: String(B) },
              },
              { relatedRequestId: s, resumptionToken: a, onresumptiontoken: H },
            )
            .catch((q) => this._onerror(Error(`Failed to send cancellation: ${q}`))));
        let V = B instanceof Vu ? B : new Vu(Wl.RequestTimeout, String(B));
        _(V);
      };
      (this._responseHandlers.set(I, (B) => {
        if (r?.signal?.aborted) return;
        if (B instanceof Error) return _(B);
        try {
          let V = $7(t, B.result);
          if (!V.success) _(V.error);
          else d(V.data);
        } catch (V) {
          _(V);
        }
      }),
        r?.signal?.addEventListener("abort", () => {
          S(r?.signal?.reason);
        }));
      let T = r?.timeout ?? vCa,
        C = () => S(Vu.fromError(Wl.RequestTimeout, "Request timed out", { timeout: T }));
      this._setupTimeout(I, T, r?.maxTotalTimeout, C, r?.resetTimeoutOnProgress ?? !1);
      let O = f?.taskId;
      if (O) {
        let B = (V) => {
          let q = this._responseHandlers.get(I);
          if (q) q(V);
          else this._onerror(Error(`Response handler missing for side-channeled request ${I}`));
        };
        (this._requestResolvers.set(I, B),
          this._enqueueTaskMessage(O, { type: "request", message: D, timestamp: Date.now() }).catch((V) => {
            (this._cleanupTimeout(I), _(V));
          }));
      } else
        this._transport
          .send(D, {
            relatedRequestId: s,
            resumptionToken: a,
            onresumptiontoken: H,
            isRequestActive: () => this._responseHandlers.has(I),
          })
          .catch((B) => {
            (this._cleanupTimeout(I), _(B));
          });
    });
  }
  async getTask(e, t) {
    return this.request({ method: "tasks/get", params: e }, vvt, t);
  }
  async getTaskResult(e, t, r) {
    return this.request({ method: "tasks/result", params: e }, t, r);
  }
  async listTasks(e, t) {
    return this.request({ method: "tasks/list", params: e }, Pvt, t);
  }
  async cancelTask(e, t) {
    return this.request({ method: "tasks/cancel", params: e }, sUi, t);
  }
  async notification(e, t) {
    if (!this._transport) throw Error("Not connected");
    this.assertNotificationCapability(e.method);
    let r = t?.relatedTask?.taskId;
    if (r) {
      let u = {
        ...e,
        jsonrpc: "2.0",
        params: { ...e.params, _meta: { ...(e.params?._meta || {}), [CHe]: t.relatedTask } },
      };
      await this._enqueueTaskMessage(r, { type: "notification", message: u, timestamp: Date.now() });
      return;
    }
    if (
      (this._options?.debouncedNotificationMethods ?? []).includes(e.method) &&
      !e.params &&
      !t?.relatedRequestId &&
      !t?.relatedTask
    ) {
      if (this._pendingDebouncedNotifications.has(e.method)) return;
      (this._pendingDebouncedNotifications.add(e.method),
        Promise.resolve().then(() => {
          if ((this._pendingDebouncedNotifications.delete(e.method), !this._transport)) return;
          let u = { ...e, jsonrpc: "2.0" };
          if (t?.relatedTask)
            u = {
              ...u,
              params: { ...u.params, _meta: { ...(u.params?._meta || {}), [CHe]: t.relatedTask } },
            };
          this._transport?.send(u, t).catch((f) => this._onerror(f));
        }));
      return;
    }
    let H = { ...e, jsonrpc: "2.0" };
    if (t?.relatedTask)
      H = { ...H, params: { ...H.params, _meta: { ...(H.params?._meta || {}), [CHe]: t.relatedTask } } };
    await this._transport.send(H, t);
  }
  setRequestHandler(e, t) {
    let r = A1r(e);
    (this.assertRequestHandlerCapability(r),
      this._requestHandlers.set(r, (s, a) => {
        let H = u1r(e, s);
        return Promise.resolve(t(H, a));
      }));
  }
  removeRequestHandler(e) {
    this._requestHandlers.delete(e);
  }
  assertCanSetRequestHandler(e) {
    if (this._requestHandlers.has(e))
      throw Error(`A request handler for ${e} already exists, which would be overridden`);
  }
  setNotificationHandler(e, t) {
    let r = A1r(e);
    this._notificationHandlers.set(r, (s) => {
      let a = u1r(e, s);
      return Promise.resolve(t(a));
    });
  }
  removeNotificationHandler(e) {
    this._notificationHandlers.delete(e);
  }
  _cleanupTaskProgressHandler(e) {
    let t = this._taskProgressTokens.get(e);
    if (t !== void 0) (this._progressHandlers.delete(t), this._taskProgressTokens.delete(e));
  }
  async _enqueueTaskMessage(e, t, r) {
    if (!this._taskStore || !this._taskMessageQueue)
      throw Error("Cannot enqueue task message: taskStore and taskMessageQueue are not configured");
    let s = this._options?.maxTaskQueueSize;
    await this._taskMessageQueue.enqueue(e, t, r ?? this._transport?.sessionId, s);
  }
  async _clearTaskQueue(e, t) {
    if (this._taskMessageQueue) {
      let r = await this._taskMessageQueue.dequeueAll(e, t);
      for (let s of r)
        if (s.type === "request" && $Xe(s.message)) {
          let a = s.message.id,
            H = this._requestResolvers.get(a);
          if (H)
            (H(new Vu(Wl.InternalError, "Task cancelled or completed")), this._requestResolvers.delete(a));
          else this._onerror(Error(`Resolver missing for request ${a} during task ${e} cleanup`));
        }
    }
  }
  async _waitForTaskUpdate(e, t, r) {
    let s = this._options?.defaultTaskPollInterval ?? 1000;
    try {
      let a = await this._taskStore?.getTask(e, r);
      if (a?.pollInterval) s = a.pollInterval;
    } catch {}
    return new Promise((a, H) => {
      if (t.aborted) {
        H(new Vu(Wl.InvalidRequest, "Request cancelled"));
        return;
      }
      let u = setTimeout(a, s);
      t.addEventListener(
        "abort",
        () => {
          (clearTimeout(u), H(new Vu(Wl.InvalidRequest, "Request cancelled")));
        },
        { once: !0 },
      );
    });
  }
  requestTaskStore(e, t) {
    let r = this._taskStore;
    if (!r) throw Error("No task store configured");
    return {
      createTask: async (s) => {
        if (!e) throw Error("No request provided");
        return await r.createTask(s, e.id, { method: e.method, params: e.params }, t);
      },
      getTask: async (s) => {
        let a = await r.getTask(s, t);
        if (!a) throw new Vu(Wl.InvalidParams, "Failed to retrieve task: Task not found");
        return a;
      },
      storeTaskResult: async (s, a, H) => {
        await r.storeTaskResult(s, a, H, t);
        let u = await r.getTask(s, t);
        if (u) {
          let f = yXe.parse({ method: "notifications/tasks/status", params: u });
          if ((await this.notification(f), kHe(u.status))) this._cleanupTaskProgressHandler(s);
        }
      },
      getTaskResult: (s) => r.getTaskResult(s, t),
      updateTaskStatus: async (s, a, H) => {
        let u = await r.getTask(s, t);
        if (!u) throw new Vu(Wl.InvalidParams, `Task "${s}" not found - it may have been cleaned up`);
        if (kHe(u.status))
          throw new Vu(
            Wl.InvalidParams,
            `Cannot update task "${s}" from terminal status "${u.status}" to "${a}". Terminal states (completed, failed, cancelled) cannot transition to other states.`,
          );
        await r.updateTaskStatus(s, a, H, t);
        let f = await r.getTask(s, t);
        if (f) {
          let d = yXe.parse({ method: "notifications/tasks/status", params: f });
          if ((await this.notification(d), kHe(f.status))) this._cleanupTaskProgressHandler(s);
        }
      },
      listTasks: (s) => r.listTasks(s, t),
    };
  }
}