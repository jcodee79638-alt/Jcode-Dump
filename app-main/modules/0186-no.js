
function no(e) {
  let t = new Map(),
    n = new Map(),
    i = { observations: Promise.resolve() };
  async function r(a) {
    let d = await e.tasks.get(N(a));
    return { ...d, directory: await e.known(d.directory) };
  }
  async function s(a, d) {
    let c = await e.load({ id: a, directory: d });
    if (c.chat.id !== a || !at(await e.known(c.chat.directory), d))
      throw Error("This conversation does not belong to the selected project.");
    return c;
  }
  async function o(a, d) {
    if (pt((await e.engine.applyAccess({ directory: a, id: d })).mode) === "read")
      throw Error("Choose Ask or Full access before changing project files or running commands.");
  }
  async function l() {
    ((i.queue ??= e.queue
      .pause(!0)
      .then(() => {
        return;
      })
      .catch((a) => {
        throw ((i.queue = void 0), a);
      })),
      await i.queue);
  }
  async function u() {
    return (await l(), e.queue.list());
  }
  async function p(a, d = !0) {
    let c = xa(a),
      y = (await u()).items.find((v) => v.id === c);
    if (!y) throw Error("This queued request is unavailable.");
    if (d && !at(await e.known(y.directory), y.directory))
      throw Error("Choose this queued request's original project again.");
    return y;
  }
  function w() {
    Promise.resolve()
      .then(() => e.dispatchQueue())
      .catch(() => {});
  }
  async function f(a, d) {
    if (!Array.isArray(a) || a.length > le.files) throw new T("total");
    let c = await Promise.all(
      a.map(async (E) => {
        let S = G(E, ["id", "filename", "mime", "size"]),
          x = await e.attachments.metadata(N(S.id));
        if (x.id !== S.id || x.filename !== S.filename || x.mime !== S.mime || x.size !== S.size)
          throw new T("document");
        return x;
      }),
    );
    if (new Set(c.map((E) => E.id)).size !== c.length) throw new T("document");
    let y = (await Promise.all(c.map((E) => e.attachments.load(E.id)))).flat(),
      v = y.filter((E) => E.mime === "image/jpeg");
    if (
      v.length > ze.images ||
      v.reduce((E, S) => E + qt(S.url).bytes, 0) > ze.totalImageBytes ||
      y
        .filter((E) => E.mime === "text/plain")
        .reduce((E, S) => E + Buffer.byteLength(S.url.slice(S.url.indexOf(",") + 1), "base64"), 0) +
        Buffer.byteLength(d) >
        le.textBytes
    )
      throw new T("total");
    return c;
  }
  async function h(a, d) {
    return (
      e.running().find((c) => c.sessionId === d && at(c.directory, a)) ??
      (await e.tasks.list(d))
        .filter((c) => c.sessionId === d && at(c.directory, a))
        .sort((c, y) => y.startedAt - c.startedAt)[0]
    );
  }
  async function m(a) {
    let d = await e.projects.profiles(a),
      c = d.find((v) => v.id === "default") ?? d[0];
    if (c) return e.projects.completionExpectations(a, c.id);
    let y = (await e.projects.setup(a)).suggestedProfiles[0];
    return [...new Set([y?.commands.build, y?.commands.test].filter((v) => !!v).map(to))];
  }
  function b(a, d = !1) {
    let c = i.observations
      .catch(() => {})
      .then(async () => {
        let y = await e.projects.listRuns(await e.known(a)).catch((v) => {
          for (let E of t.values()) {
            if (!at(E.directory, a)) continue;
            if (E.run.state === "running") E.failures++;
            if (E.run.state !== "running" && !E.recorded) E.attempts++;
          }
          throw v;
        });
        for (let v of y) {
          let E = t.get(v.id);
          if (!E || !at(E.directory, a)) continue;
          if (((E.failures = 0), E.run.state === "running" && v.state !== "running"))
            e.profileChanged(a, structuredClone(v));
          if (((E.run = structuredClone(v)), v.state === "running" || E.recorded || (d && E.attempts >= 3)))
            continue;
          if (E.taskId && v.exitCode !== null && (v.kind === "build" || v.kind === "test")) {
            if (
              (E.attempts++,
              !(await (async () => {
                if (!at((await r(E.taskId)).directory, a))
                  throw Error("This command's task no longer belongs to its project.");
                return (
                  await e.tasks.recordCheck(E.taskId, {
                    id: `profile_${v.id}`,
                    label: to(v.command),
                    status:
                      v.state === "passed" && v.exitCode === 0
                        ? "passed"
                        : v.state === "failed"
                          ? "failed"
                          : "unknown",
                    ...(v.exitCode === null ? {} : { exitCode: v.exitCode }),
                    output: v.output.slice(-4000),
                  }),
                  !0
                );
              })().catch(() => !1)))
            )
              continue;
            e.emit({ type: "refresh" });
          }
          E.recorded = !0;
        }
        return y;
      });
    return ((i.observations = c), c);
  }
  let C = () =>
    [...t.values()].filter((a) =>
      a.run.state === "running" ? !e.subscribeProfiles && a.failures < 3 : !a.recorded && a.attempts < 3,
    );
  function g() {
    if (i.poll || !C().length) return;
    ((i.poll = setTimeout(() => {
      ((i.poll = void 0),
        Promise.allSettled([...new Set(C().map((a) => a.directory))].map((a) => b(a, !0))).then(g));
    }, 150)),
      i.poll.unref());
  }
  e.subscribeProfiles?.((a, d) => {
    let c = t.get(d.id);
    if (!c || !at(c.directory, a) || d.state === "running") return;
    if (c.run.state === "running") e.profileChanged(a, structuredClone(d));
    ((c.run = structuredClone(d)),
      b(a, !0)
        .catch(() => {})
        .finally(g));
  });
  async function k(a) {
    let d = G(a, ["taskId"], !0),
      c = d.taskId === void 0 ? void 0 : await r(d.taskId);
    await l();
    let y = await e.queue.list();
    return eo({
      appVersion: e.version(),
      connection: e.engine.connection(),
      ...(c ? { task: c } : {}),
      account: await e.account().catch(() => {
        return;
      }),
      queued: y.items.filter((v) => v.state === "queued" || v.state === "paused" || v.state === "admitting")
        .length,
      running: e.running().length + [...t.values()].filter((v) => v.run.state === "running").length,
    });
  }
  return {
    async connection(a) {
      return (G(a, [], !0), e.engine.connection());
    },
    async reconnect(a) {
      let d = G(a, ["id", "directory"], !0);
      if ((d.id === void 0) !== (d.directory === void 0))
        throw Error("Choose both a conversation and its project.");
      let c = d.id === void 0 ? void 0 : N(d.id),
        y = d.directory === void 0 ? void 0 : await e.known(d.directory);
      return (await e.engine.reconnect(), c && y ? s(c, y) : void 0);
    },
    async recoverTask(a) {
      let d = G(a, ["id"]),
        c = await r(d.id),
        y = await s(c.sessionId, c.directory).catch(() => {
          return;
        });
      return qs(c, y, e.engine.connection());
    },
    async queueState(a) {
      return (G(a, [], !0), u());
    },
    async queuePrompt(a) {
      let d = G(a, ["id", "directory", "text", "attachments", "thinking", "model"]),
        c = await e.known(d.directory),
        y = N(d.id),
        v = q(d.text, 200000),
        E = An(d.thinking),
        S = d.model === void 0 ? Tn : tt(d.model),
        x = await f(d.attachments, v);
      if (
        (Rn(
          S,
          x.map((B) => B.mime),
        ),
        !v.trim() && !x.length)
      )
        throw Error("Write a message or add an attachment.");
      await s(y, c);
      let I = pt((await e.engine.applyAccess({ id: y, directory: c })).mode);
      await l();
      let U = await e.queue.add({
        sessionId: y,
        directory: c,
        text: v,
        attachments: x,
        thinking: E,
        model: S,
        accessMode: I,
      });
      return (w(), U);
    },
    async updateQueuedPrompt(a) {
      let d = G(a, ["id", "text"]),
        c = await p(d.id),
        y = q(d.text, 200000);
      return (await f(c.attachments, y), await e.queue.update(c.id, y), u());
    },
    async queueAction(a) {
      let d = G(a, ["id", "action"]);
      if (
        d.action !== "remove" &&
        d.action !== "up" &&
        d.action !== "down" &&
        d.action !== "pause" &&
        d.action !== "resume"
      )
        throw Error("Choose a supported queue action.");
      let c = await p(d.id, d.action !== "remove" && d.action !== "pause");
      return (await e.queue.action(c.id, d.action), w(), u());
    },
    async pauseQueue(a) {
      let d = G(a, ["paused"]),
        c = ft(d.paused);
      if ((await u(), await e.queue.pause(c), !c)) w();
      return u();
    },
    async taskTimeline(a) {
      let d = G(a, ["id"]);
      return e.tasks.timeline((await r(d.id)).id);
    },
    async restoreTaskFile(a) {
      let d = G(a, ["id", "path", "fingerprint", "confirmed"]);
      if (d.confirmed !== !0) throw Error("Confirm restoration before continuing.");
      let c = Pe(d.path),
        y = q(d.fingerprint, 64);
      if (!/^[a-f0-9]{64}$/.test(y)) throw Error("Choose a current task file comparison.");
      return e.idleMutation(async () => {
        let v = await r(d.id);
        if (
          (await e.assertIdle(),
          await o(v.directory, v.sessionId),
          !(await e.confirm({ kind: "restore", task: v, path: c })))
        )
          return { restored: 0, conflicts: [] };
        (await e.assertIdle(), await e.known(v.directory), await o(v.directory, v.sessionId));
        let E = await e.tasks.restoreFile(v.id, c, y);
        return (e.emit({ type: "refresh", sessionId: v.sessionId }), E);
      });
    },
    async compareTasks(a) {
      let d = G(a, ["left", "right"]),
        c = await r(d.left),
        y = await r(d.right);
      return e.tasks.compareTasks(c.id, y.id);
    },
    async searchProject(a) {
      let d = G(a, ["directory", "query"]);
      return e.projects.search(await e.known(d.directory), q(d.query, 256));
    },
    async projectSetup(a) {
      let d = G(a, ["directory"]);
      return e.projects.setup(await e.known(d.directory));
    },
    async runProfiles(a) {
      let d = G(a, ["directory"]);
      return e.projects.profiles(await e.known(d.directory));
    },
    async saveRunProfile(a) {
      let d = G(a, ["directory", "sessionId", "profile"]),
        c = Sa(d.profile),
        y = N(d.sessionId);
      return e.idleMutation(async () => {
        let v = await e.known(d.directory);
        return (await s(y, v), await o(v, y), await e.assertIdle(), e.projects.saveProfile(v, c));
      });
    },
    async removeRunProfile(a) {
      let d = G(a, ["directory", "sessionId", "id"]),
        c = Vr(d.id),
        y = N(d.sessionId);
      return e.idleMutation(async () => {
        let v = await e.known(d.directory);
        return (await s(y, v), await o(v, y), await e.assertIdle(), e.projects.removeProfile(v, c));
      });
    },
    async runProfile(a) {
      let d = G(a, ["directory", "sessionId", "profileId", "kind", "taskId"]),
        c = Vr(d.profileId),
        y = ro(d.kind),
        v = N(d.sessionId);
      return e.idleMutation(async () => {
        let E = await e.known(d.directory);
        await s(v, E);
        let S = d.taskId === void 0 ? await h(E, v) : await r(d.taskId);
        if (S && (S.sessionId !== v || !at(await e.known(S.directory), E)))
          throw Error("Choose a task in this conversation and project.");
        (await e.assertIdle(), await o(E, v));
        let I = (await e.projects.profiles(E)).find((J) => J.id === c)?.commands[y];
        if (!I) throw Error("Choose an existing profile command.");
        let U = [...I],
          B = await e.projects.completionExpectations(E, c);
        if (!(await e.confirm({ kind: "run", directory: E, command: [...U] })))
          throw Error("The project command was cancelled.");
        (await e.assertIdle(), await e.known(E), await s(v, E), await o(E, v));
        for (let [J, H] of t) {
          if (t.size < 100) break;
          if (H.run.state !== "running") t.delete(J);
        }
        if (t.size >= 100) throw Error("Finish a tracked project command before starting another.");
        let K = await e.projects.run(E, c, y, U);
        if (
          (t.set(K.id, {
            directory: E,
            ...(S ? { taskId: S.id } : {}),
            run: structuredClone(K),
            recorded: !1,
            attempts: 0,
            failures: 0,
          }),
          S)
        ) {
          if (n.size >= 100) n.delete(n.keys().next().value);
          n.set(S.id, [...B]);
        }
        return (e.profileChanged(E, structuredClone(K)), g(), K);
      });
    },
    async profileRuns(a) {
      let d = G(a, ["directory"]);
      return b(await e.known(d.directory));
    },
    async cancelProfile(a) {
      let d = G(a, ["id"]),
        c = Ea(d.id);
      if (!t.get(c)) throw Error("Choose an existing project command.");
      (await e.projects.cancelRun(c), g());
    },
    async completionReview(a) {
      let d = G(a, ["id"]),
        c = await r(d.id);
      return (await b(c.directory), tn(await r(c.id), n.get(c.id) ?? (await m(c.directory))));
    },
    async attachmentReferences(a) {
      let d = G(a, ["id"]),
        c = N(d.id);
      return (await e.attachments.metadata(c), e.attachments.view(c));
    },
    async attachmentContent(a) {
      let d = G(a, ["id", "referenceId"]),
        c = N(d.id);
      return (await e.attachments.metadata(c), e.attachments.content(c, N(d.referenceId)));
    },
    async chatAttachmentReferences(a) {
      let d = G(a, ["id", "directory"]),
        c = await e.known(d.directory),
        y = N(d.id);
      return (await s(y, c), e.attachments.references(y));
    },
    supportReport: k,
    async exportSupportReport(a) {
      let d = await k(a),
        c = Buffer.from(JSON.stringify(d, null, 2));
      if (c.length > 65536) throw Error("This support report exceeds its local export limit.");
      return { saved: await e.saveSupport({ filename: `Jac-Code-support-${d.supportId}.json`, bytes: c }) };
    },
  };
}