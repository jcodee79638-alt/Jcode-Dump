
function rs(e) {
  let t = { directory: cn(e) },
    n = se(t.directory),
    i = { value: !1 };
  function r(a) {
    let d = (Yi.get(n) ?? Promise.resolve()).catch(() => {}).then(async () => (await w(), a()));
    return (Yi.set(n, d), d);
  }
  async function s(a) {
    if (!Nn.test(a)) throw Error("Choose an existing task.");
    let d = await an(t, `${a}/task.json`, Zi).catch(() => {
      return;
    });
    if (!d) throw Error("This task is unavailable.");
    let c = JSON.parse(new TextDecoder().decode(d.bytes));
    if (!oa(c, a)) throw Error("This task record is damaged and cannot be used.");
    return c;
  }
  async function o() {
    let a = (await z.readdir(t.directory)).filter((d) => Nn.test(d)).sort();
    return (
      await Promise.all(
        a.map((d) =>
          s(d).catch(() => {
            return;
          }),
        ),
      )
    ).filter((d) => d !== void 0);
  }
  async function l(a) {
    let d = new TextEncoder().encode(JSON.stringify(a));
    if (d.length > Zi) throw Error("Task metadata exceeds the local storage limit.");
    await Ln(t, `${a.task.id}/task.json`, d);
  }
  async function u(a, d) {
    if (!Nn.test(a) || !/^(?:before|after)(?:\.pending-[0-9a-f-]{36})?$/.test(d))
      throw Error("Invalid checkpoint location.");
    let c = await X(t, `${a}/${d}`, !0);
    if (!c.exists) return;
    (await Dn({ directory: c.filename }), await z.rm(c.filename, { recursive: !0, force: !0 }));
  }
  async function p(a, d) {
    if ((await $n(t)) + a <= ie.totalBytes) return;
    let c = (await o())
      .filter((y) => y.task.id !== d && y.task.state !== "running")
      .sort((y, v) => (y.task.endedAt ?? y.task.startedAt) - (v.task.endedAt ?? v.task.startedAt));
    for (let y of c)
      if (
        (await l({
          ...y,
          before: void 0,
          after: void 0,
          task: {
            ...y.task,
            checkpoint: {
              ...y.task.checkpoint,
              available: !1,
              reason: "Checkpoint evicted to keep local storage within its limit.",
            },
          },
        }),
        await u(y.task.id, "before"),
        await u(y.task.id, "after"),
        (await $n(t)) + a <= ie.totalBytes)
      )
        return;
    for (let y of c) {
      let v = await X(t, y.task.id);
      if (
        (await Dn({ directory: v.filename }),
        await z.rm(v.filename, { recursive: !0, force: !0 }),
        (await $n(t)) + a <= ie.totalBytes)
      )
        return;
    }
    throw Error("Local checkpoint storage is full. Finish active tasks before starting another checkpoint.");
  }
  async function w() {
    if (i.value) return;
    t.directory = await je(t.directory);
    for (let a of (await z.readdir(t.directory)).filter((d) => Nn.test(d))) {
      let d = await X(t, a);
      if (!(await z.lstat(d.filename)).isDirectory()) continue;
      for (let y of await z.readdir(d.filename)) {
        if (/^(?:before|after)\.pending-[0-9a-f-]{36}$/.test(y)) await u(a, y);
        if (/^\.task-write-[0-9a-f-]{36}$/.test(y)) {
          let v = await X(t, `${a}/${y}`);
          if ((await z.lstat(v.filename)).isFile()) await z.unlink(v.filename);
        }
      }
      let c = await s(a).catch(() => {
        return;
      });
      if (!c || c.task.state !== "running") continue;
      await l(
        qn(
          {
            ...c,
            task: {
              ...c.task,
              state: "interrupted",
              endedAt: Date.now(),
              checkpoint: {
                ...c.task.checkpoint,
                available: !1,
                reason:
                  "The app closed before the final checkpoint. Restore is unavailable; no work was replayed.",
              },
            },
          },
          {
            id: "task-interrupted",
            at: Date.now(),
            kind: "interrupted",
            label: "App closed before the final checkpoint",
            status: "unknown",
          },
        ),
      );
    }
    i.value = !0;
  }
  async function f(a, d) {
    await p(Vi, a.task.id);
    let c = `${d}.pending-${Le.randomUUID()}`;
    await je(W.default.join(t.directory, a.task.id, c));
    let y = new Set(),
      v = await Xi(
        a.task.directory,
        async (E, S) => {
          if (y.has(E.hash)) return;
          (await Ln(t, `${a.task.id}/${c}/${E.hash}`, S), y.add(E.hash));
        },
        t.directory,
      ).catch(async (E) => {
        throw (await u(a.task.id, c), E);
      });
    return (
      await z.rename(
        (await X(t, `${a.task.id}/${c}`)).filename,
        (await X(t, `${a.task.id}/${d}`, !0)).filename,
      ),
      v
    );
  }
  function h(a, d) {
    let c = Object.entries({ ...a.reasons, ...d?.reasons }).map(([y]) => y);
    return {
      available: !0,
      files: a.files.length,
      bytes: a.bytes + (d?.bytes ?? 0),
      skipped: a.skipped + (d?.skipped ?? 0),
      ...(c.length ? { reason: `Skipped: ${c.join("; ")}. Counts include excluded directory roots.` } : {}),
    };
  }
  async function m(a, d) {
    let c = wt(d);
    if (
      !a.task.checkpoint.available ||
      !a.after ||
      Ce(c) ||
      !a.task.files.some((E) => E.path === c && E.status !== "deleted")
    )
      throw Error("This task artifact is unavailable.");
    let y = rt(a.after, c);
    if (!y) throw Error("This task artifact was not captured.");
    let v = await an(t, `${a.task.id}/after/${y.hash}`, ie.fileBytes);
    if (v.hash !== y.hash || v.bytes.length !== y.size) throw Error("This task artifact is damaged.");
    return { filename: W.default.basename(c), bytes: v.bytes };
  }
  async function b(a, d, c) {
    let y = a[d] && rt(a[d], c);
    if (!y) return;
    let v = await an(t, `${a.task.id}/${d}/${y.hash}`, ie.fileBytes);
    if (v.hash !== y.hash || v.bytes.length !== y.size) throw Error("This task comparison is damaged.");
    return v.bytes;
  }
  async function C(a, d) {
    let c = wt(d);
    if (!a.task.checkpoint.available || !a.before || !a.after || !a.task.files.some((S) => S.path === c))
      throw Error("This task comparison is unavailable.");
    let y = await b(a, "before", c),
      v = await b(a, "after", c),
      E = await on(a.task.directory)
        .then(() => On(a.task.directory, c))
        .catch(() => "unavailable");
    return {
      path: c,
      ...es(c, y, v),
      canStage: !1,
      canRestore:
        a.task.state !== "running" &&
        E === (rt(a.after, c)?.hash ?? null) &&
        !a.restored?.some((S) => S.path === c),
      fingerprint: Nr(a, c, E),
    };
  }
  async function g(a, d, c) {
    if (a.task.state === "running" || !a.task.checkpoint.available || !a.before || !a.after)
      throw Error("This task checkpoint is unavailable for restore.");
    await on(a.task.directory);
    let y = { restored: 0, conflicts: [] },
      v = [...(a.restored ?? [])];
    for (let E of d) {
      let S = await (async () => {
        let x = wt(E);
        if (Ce(x) || !a.task.files.some((O) => O.path === x)) throw Error("This task file is unavailable.");
        let I = rt(a.before, x),
          U = rt(a.after, x),
          B = await b(a, "before", x),
          K = await On(a.task.directory, x),
          J = v.find((O) => O.path === x);
        if (J)
          return K === (I?.hash ?? null) && (c === void 0 || J.fingerprint === c) ? "already" : "conflict";
        if (K !== (U?.hash ?? null) || (c !== void 0 && Nr(a, x, K) !== c)) return "conflict";
        if (B) await Qi(a.task.directory, x);
        let H = await X(a.task.directory, x, !0);
        if ((await On(a.task.directory, x)) !== (U?.hash ?? null)) return "conflict";
        if (B)
          await Ln(a.task.directory, x, B, () =>
            On(a.task.directory, x).then((O) => O === (U?.hash ?? null)),
          );
        if (!B && H.exists) await z.unlink(H.filename);
        return (v.push({ path: x, fingerprint: Nr(a, x, K), at: Date.now() }), "restored");
      })().catch(() => "conflict");
      if (S === "restored") y.restored++;
      if (S === "conflict") y.conflicts.push(E);
    }
    if (y.restored)
      await l({
        ...a,
        restored: v,
        task: {
          ...a.task,
          ...(a.task.files.every((E) => v.some((S) => S.path === E.path)) ? { restoredAt: Date.now() } : {}),
        },
      });
    return y;
  }
  async function k(a, d) {
    if (!ss(d) || d.at < a.task.startedAt) throw Error("Choose a valid task observation.");
    let c = qn(a, d);
    if (c === a) return;
    (await p(Buffer.byteLength(JSON.stringify(c)), a.task.id), await l(c));
  }
  return {
    initialize: () => r(async () => {}),
    begin: (a) =>
      r(async () => {
        if (!a.sessionId || a.sessionId.length > 256) throw Error("Choose a chat for this task.");
        let d = await on(a.directory);
        if (St(d, t.directory) && se(d) === se(t.directory))
          throw Error("Choose a project outside the checkpoint store.");
        let c = await o(),
          y = c.filter((x) => x.task.state !== "running").sort((x, I) => x.task.startedAt - I.task.startedAt);
        if (c.length >= ie.entries && !y.length)
          throw Error(
            "The local task history is full of active tasks. Finish a task before starting another.",
          );
        for (let x of y.slice(0, Math.max(0, c.length - ie.entries + 1))) {
          let I = await X(t, x.task.id);
          (await Dn({ directory: I.filename }), await z.rm(I.filename, { recursive: !0, force: !0 }));
        }
        await p(Vi);
        let v = {
          id: `task_${Le.randomUUID()}`,
          sessionId: a.sessionId,
          directory: d,
          title: a.title.slice(0, 256),
          state: "running",
          startedAt: Date.now(),
          checkpoint: {
            available: !1,
            files: 0,
            bytes: 0,
            skipped: 0,
            reason: "Checkpoint is being prepared.",
          },
          files: [],
          checks: [],
          supportId: Le.randomUUID(),
        };
        (await je(W.default.join(t.directory, v.id)), await l({ version: 1, task: v }));
        let E = await f({ version: 1, task: v }, "before").catch(async (x) => {
            throw (
              await l({
                version: 1,
                task: {
                  ...v,
                  state: "failed",
                  endedAt: Date.now(),
                  checkpoint: { ...v.checkpoint, reason: "The initial checkpoint could not be captured." },
                },
              }),
              x
            );
          }),
          S = {
            version: 1,
            task: { ...v, checkpoint: h(E) },
            before: E,
            events: [
              {
                id: "task-started",
                at: v.startedAt,
                kind: "started",
                label: "Task started and checkpoint captured",
                status: "running",
              },
            ],
          };
        return (await l(S), structuredClone(S.task));
      }),
    finish: (a, d) =>
      r(async () => {
        if (!["completed", "failed", "interrupted", "cancelled"].includes(d.state))
          throw Error("Choose a final task state.");
        let c = await s(a);
        if (c.task.state !== "running") return structuredClone(c.task);
        let y = c.before
            ? await f(c, "after").catch(() => {
                return;
              })
            : void 0,
          v = {
            ...c.task,
            state: d.state,
            endedAt: Date.now(),
            checks: [...c.task.checks, ...d.checks.filter((S) => !c.task.checks.some((x) => x.id === S.id))]
              .slice(0, 64)
              .map((S) => ({
                id: S.id.slice(0, 256),
                label:
                  S.label.length <= 256 ? S.label : "Check command exceeds the 256 character recording limit",
                status:
                  S.label.length > 256
                    ? "unknown"
                    : ["passed", "failed", "unknown"].includes(S.status)
                      ? S.status
                      : "unknown",
                ...(Number.isSafeInteger(S.exitCode) ? { exitCode: S.exitCode } : {}),
                ...(S.output ? { output: S.output.slice(0, 4000) } : {}),
              })),
            files: c.before && y ? is(c.before, y) : [],
            checkpoint:
              c.before && y
                ? h(c.before, y)
                : {
                    ...c.task.checkpoint,
                    available: !1,
                    reason: "The final checkpoint could not be captured. Restore is unavailable.",
                  },
          },
          E = [
            ...v.checks.map((S) => ({
              id: `check-${Le.createHash("sha256").update(S.id).digest("hex")}`,
              at: v.endedAt,
              kind: "check",
              label: S.label.replace(/[\x00-\x1f]/g, " ").trim() || "Recorded check",
              status: S.status,
            })),
            {
              id: "task-files",
              at: v.endedAt,
              kind: "files",
              label: y ? `${v.files.length} file changes recorded` : "Final checkpoint unavailable",
              status: y ? "passed" : "unknown",
            },
            {
              id: "task-finished",
              at: v.endedAt,
              kind:
                v.state === "cancelled"
                  ? "cancelled"
                  : v.state === "interrupted"
                    ? "interrupted"
                    : "completed",
              label: v.state === "completed" ? "Task execution finished" : `Task ${v.state}`,
              status: v.state === "completed" ? "passed" : v.state === "failed" ? "failed" : "unknown",
            },
          ];
        return (await l(E.reduce(qn, { ...c, task: v, after: y })), structuredClone(v));
      }),
    list: (a) =>
      r(async () =>
        (await o())
          .map((d) => d.task)
          .filter((d) => a === void 0 || d.sessionId === a)
          .sort((d, c) => c.startedAt - d.startedAt),
      ),
    get: (a) => r(async () => structuredClone((await s(a)).task)),
    restore: (a) =>
      r(async () => {
        let d = await s(a);
        return g(
          d,
          d.task.files.map((c) => c.path),
        );
      }),
    restoreFile: (a, d, c) =>
      r(async () => {
        if (!Lr.test(c)) throw Error("Choose a current task file comparison.");
        let y = wt(d);
        return g(await s(a), [y], c);
      }),
    observe: (a, d) => r(async () => k(await s(a), d)),
    recordCheck: (a, d) =>
      r(async () => {
        let c = await s(a);
        if (
          !d ||
          typeof d.id !== "string" ||
          !d.id.length ||
          d.id.length > 256 ||
          d.id.includes("\x00") ||
          typeof d.label !== "string" ||
          !d.label.trim() ||
          d.label.length > 256 ||
          d.label.includes("\x00") ||
          !["passed", "failed", "unknown"].includes(d.status) ||
          !Number.isSafeInteger(d.exitCode) ||
          (d.output !== void 0 &&
            (typeof d.output !== "string" || d.output.length > 4000 || d.output.includes("\x00")))
        )
          throw Error("Choose a bounded check result with an observed command exit.");
        let y = {
            id: d.id,
            label: d.label,
            status:
              d.exitCode !== 0
                ? "failed"
                : d.status === "passed" && !/[;\r\n|&]/.test(d.label)
                  ? "passed"
                  : "unknown",
            exitCode: d.exitCode,
            ...(d.output === void 0 ? {} : { output: d.output }),
          },
          v = c.task.checks.find((S) => S.id === y.id);
        if (v) {
          if (JSON.stringify(v) !== JSON.stringify(y))
            throw Error("This check identifier already records a different result.");
          return structuredClone(c.task);
        }
        if (c.task.checks.length >= 64) throw Error("This task has reached its 64 recorded check limit.");
        let E = qn(
          { ...c, task: { ...c.task, checks: [...c.task.checks, y] } },
          {
            id: `check-${Le.createHash("sha256").update(y.id).digest("hex")}`,
            at: Date.now(),
            kind: "check",
            label: y.label.replace(/[\x00-\x1f]/g, " ").trim(),
            status: y.status,
          },
        );
        return (
          await p(Buffer.byteLength(JSON.stringify(E)), c.task.id),
          await l(E),
          structuredClone(E.task)
        );
      }),
    timeline: (a) =>
      r(async () => {
        let d = await s(a);
        return {
          taskId: a,
          startedAt: d.task.startedAt,
          endedAt: d.task.endedAt,
          events: structuredClone(d.events ?? []).sort((c, y) => c.at - y.at || c.id.localeCompare(y.id)),
          truncated: d.truncated === !0,
        };
      }),
    compareTasks: (a, d) =>
      r(async () => {
        let c = await s(a),
          y = await s(d);
        if ([c, y].some((x) => x.task.state === "running" || !x.task.checkpoint.available || !x.after))
          throw Error("Choose two finished tasks with available checkpoints.");
        let v = [
            ...new Set(
              [...c.task.files, ...y.task.files, ...c.after.files, ...y.after.files].map((x) => x.path),
            ),
          ]
            .sort()
            .filter(
              (x) =>
                c.task.files.some((I) => I.path === x) ||
                y.task.files.some((I) => I.path === x) ||
                rt(c.after, x)?.hash !== rt(y.after, x)?.hash,
            ),
          E = [],
          S = { bytes: 0, truncated: !!c.after?.incomplete || !!y.after?.incomplete };
        for (let x of v) {
          if (E.length >= 100 || S.bytes >= 2000000) {
            S.truncated = !0;
            break;
          }
          let I = await b(c, "after", x),
            U = await b(y, "after", x);
          if (
            [c.after, y.after].some((K) => K.uncaptured.some((J) => !J || x === J || x.startsWith(J + "/")))
          ) {
            S.truncated = !0;
            continue;
          }
          if (((I?.length ?? 0) + (U?.length ?? 0)) * 4 + S.bytes > 2000000) {
            S.truncated = !0;
            continue;
          }
          let B = es(x, I, U);
          ((S.bytes += ((I?.length ?? 0) + (U?.length ?? 0)) * 4),
            E.push({
              path: x,
              identical:
                (I === void 0 && U === void 0) ||
                (I !== void 0 &&
                  U !== void 0 &&
                  Le.createHash("sha256").update(I).digest("hex") ===
                    Le.createHash("sha256").update(U).digest("hex")),
              left: B.before,
              right: B.after,
              patch: B.patch,
            }));
        }
        return {
          left: structuredClone(c.task),
          right: structuredClone(y.task),
          files: E,
          checks: [
            ...tn(c.task, []).checks.map((x) => ({ side: "left", check: x })),
            ...tn(y.task, []).checks.map((x) => ({ side: "right", check: x })),
          ],
          truncated: S.truncated,
        };
      }),
    branch: (a, d) =>
      r(async () => {
        let c = await s(a),
          y = await on(c.task.directory),
          v = cn(d);
        if (St(y, v) || St(v, y) || St(t.directory, v) || St(v, t.directory) || Ce(v))
          throw Error("Choose a fresh folder outside the original project and checkpoint store.");
        await X(
          W.default.parse(v).root,
          W.default.relative(W.default.parse(v).root, v).replaceAll("\\", "/"),
          !0,
        );
        let E = await z.lstat(v).then(
          (I) => {
            if (!I.isDirectory()) throw Error("Choose an empty destination folder.");
            return !0;
          },
          (I) => {
            if (I.code === "ENOENT") return !1;
            throw I;
          },
        );
        if (E && (await z.readdir(v)).length) throw Error("Choose an empty destination folder.");
        let S = new Map(),
          x = await Xi(
            y,
            async (I, U) => {
              S.set(I.path, U);
            },
            t.directory,
          );
        if (x.incomplete)
          throw Error(
            `Branch was not copied: skipped ${x.skipped} entries (${Object.keys(x.reasons).join("; ")}).`,
          );
        if (!E) await z.mkdir(v);
        if ((await z.readdir(v)).length)
          throw Error("The destination changed. Choose an empty destination folder.");
        for (let I of x.files) {
          if ((await Qi(v, I.path), (await X(v, I.path, !0)).exists))
            throw Error("The destination changed while copying this branch.");
          await Ln(v, I.path, S.get(I.path), async () => !(await X(v, I.path, !0)).exists);
        }
        return { directory: v };
      }),
    artifact: (a, d) => r(async () => m(await s(a), d)),
    compare: (a, d) => r(async () => C(await s(a), d)),
    archive: (a) =>
      r(async () => {
        let d = await s(a);
        if (d.task.state === "running" || !d.task.checkpoint.available || !d.after)
          throw Error("This task archive is unavailable.");
        let c = Object.create(null);
        for (let v of d.task.files.filter((E) => E.status !== "deleted"))
          c[wt(v.path)] = (await m(d, v.path)).bytes;
        await Promise.resolve().then(() => Gi());
        return Hi(c, { level: 6 });
      }),
  };
}