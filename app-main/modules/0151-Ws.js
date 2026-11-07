
function Ws(e, t = {}) {
  if (
    t.runTimeoutMs !== void 0 &&
    (!Number.isSafeInteger(t.runTimeoutMs) || t.runTimeoutMs < 25 || t.runTimeoutMs > Ee.runMs)
  )
    throw Error("Choose a finite command timeout of at most two minutes.");
  if (t.parentPid !== void 0 && (!Number.isSafeInteger(t.parentPid) || t.parentPid < 1))
    throw Error("Choose a valid owner process.");
  let n = { storage: L.default.resolve(e) },
    i = [],
    r = new Map(),
    s = { closing: !1 },
    o = Promise.resolve();
  function l(g, k) {
    try {
      Promise.resolve(t.onRun?.(g, structuredClone(k))).catch(() => {});
    } catch {}
  }
  function u(g) {
    let k = o.then(g);
    return (
      (o = k.then(
        () => {
          return;
        },
        () => {
          return;
        },
      )),
      k
    );
  }
  async function p() {
    n.storage = await ot(n.storage, !0);
    let g = await Ft(n.storage, "profiles-v6.json", Hn).catch((a) => {
      if (a.code !== "ENOENT") throw a;
    });
    if (!g) return {};
    let k = JSON.parse(g.toString("utf8"));
    if (
      !At(k) ||
      Object.keys(k).length > 200 ||
      Object.entries(k).some(
        ([a, d]) =>
          !/^[a-f0-9]{64}$/.test(a) ||
          !Array.isArray(d) ||
          d.length > 20 ||
          d.some((c) => !Ds(c)) ||
          new Set(d.map((c) => c.id)).size !== d.length,
      )
    )
      throw Error("Saved run profiles are unavailable. Your project files are kept.");
    return k;
  }
  async function w(g) {
    let k = Buffer.from(JSON.stringify(g));
    if (k.length > Hn) throw Error("Saved run profiles have reached their local storage limit.");
    (await ot(n.storage),
      await Ft(n.storage, "profiles-v6.json", Hn).catch((c) => {
        if (c.code !== "ENOENT") throw c;
      }));
    let a = `profiles-${pn.randomUUID()}.tmp`,
      d = await Z.open(L.default.join(n.storage, a), "wx", 384);
    try {
      (await d.writeFile(k), await d.sync());
    } finally {
      await d.close();
    }
    try {
      (await ot(n.storage),
        await Ft(n.storage, "profiles-v6.json", Hn).catch((c) => {
          if (c.code !== "ENOENT") throw c;
        }),
        await Z.rename(L.default.join(n.storage, a), L.default.join(n.storage, "profiles-v6.json")));
    } finally {
      await Z.unlink(L.default.join(n.storage, a)).catch(() => {});
    }
  }
  let f = (g) => pn.createHash("sha256").update(he(g)).digest("hex");
  async function h(g, k) {
    if (typeof k !== "string" || !k.trim() || k.length > Ee.query || /[\0\r\n]/.test(k))
      throw Error("Enter a literal search of 1 to 256 characters on one line.");
    let a = await st(g),
      d = { query: k, matches: [], filesScanned: 0, truncated: !1 },
      c = { bytes: 0, entries: 0, until: Date.now() + Ee.searchMs },
      y = [""],
      v = k.toLowerCase();
    while (y.length) {
      if (d.filesScanned >= Ee.files || c.bytes >= Ee.bytes || c.entries >= 1e4 || Date.now() >= c.until) {
        d.truncated = !0;
        break;
      }
      let E = y.pop();
      await ot(L.default.join(a, E));
      let S = await Z.opendir(L.default.join(a, E));
      try {
        for await (let x of S) {
          if (
            ++c.entries > 1e4 ||
            Date.now() >= c.until ||
            d.filesScanned >= Ee.files ||
            c.bytes >= Ee.bytes
          ) {
            d.truncated = !0;
            break;
          }
          let I = E ? `${E}/${x.name}` : x.name;
          if (hn(I) || x.isSymbolicLink()) continue;
          if (x.isDirectory()) {
            y.push(I);
            continue;
          }
          if (!x.isFile()) continue;
          d.filesScanned++;
          let U = await Ft(a, I, Math.min(Ee.fileBytes, Ee.bytes - c.bytes)).catch(() => {
            return;
          });
          if (!U) {
            d.truncated = !0;
            continue;
          }
          if (((c.bytes += U.length), U.includes(0) || !Fs.isUtf8(U))) continue;
          let B = U.toString("utf8").split(/\r?\n/),
            K = I.toLowerCase().includes(v) ? 60 : 0,
            J = [];
          for (let H = 0; H < B.length; H++) {
            let O = B[H].toLowerCase().indexOf(v);
            if (O < 0) continue;
            let V = /\b(?:function|class|interface|type|const|let|def|fn|struct|enum|export)\b/.test(B[H])
                ? 35
                : 0,
              fe = Math.max(0, O - 90);
            if (
              (J.push({
                path: I,
                line: H + 1,
                text: `${fe ? "…" : ""}${B[H].slice(fe, fe + 320)}`,
                score: 20 + K + V,
              }),
              J.length > Ee.matches)
            ) {
              d.truncated = !0;
              break;
            }
          }
          if (K && !J.length) J.push({ path: I, line: 1, text: B[0].slice(0, 320), score: K });
          if (d.matches.length + J.length > Ee.matches) d.truncated = !0;
          d.matches = [...d.matches, ...J]
            .sort((H, O) => O.score - H.score || H.path.localeCompare(O.path) || H.line - O.line)
            .slice(0, Ee.matches);
        }
      } finally {
        await Promise.resolve()
          .then(() => S.close())
          .catch(() => {});
      }
    }
    return (await st(a), d);
  }
  async function m(g) {
    let k = await st(g),
      a = { kind: "Unrecognized project", requirements: [], suggestedProfiles: [], issues: [] },
      d = await Ft(k, "package.json", 65536).catch((c) => {
        if (c.code !== "ENOENT") a.issues.push("package.json could not be safely inspected.");
      });
    if (d) {
      let c = await Promise.resolve()
        .then(() => JSON.parse(d.toString("utf8")))
        .catch(() => {
          return;
        });
      if (!At(c)) a.issues.push("package.json is not a valid object.");
      if (At(c)) {
        a.kind = "Node.js";
        let y =
            typeof c.packageManager === "string" && /^(bun|pnpm|yarn)@/.test(c.packageManager)
              ? c.packageManager.split("@")[0]
              : "npm",
          v =
            At(c.engines) && typeof c.engines.node === "string"
              ? c.engines.node.slice(0, 100)
              : "No version range declared",
          E = await Zn("node", k).catch(() => {
            return;
          });
        a.requirements.push({
          id: "node",
          label: "Node.js",
          status: E ? "available" : "missing",
          detail: `${v}. ${E ? "Executable located; version was not executed or verified." : "Install Node.js yourself, then reopen Jac Code to refresh PATH."}`,
        });
        let S = await $s([y, "run", "build"], k).then(
          () => !0,
          () => !1,
        );
        a.requirements.push({
          id: y,
          label: y,
          status: S ? "available" : "missing",
          detail: S
            ? "Executable located; no manifest code has run."
            : `Install or enable ${y} yourself, then reopen Jac Code. No dependencies were installed.`,
        });
        let x = {};
        if (At(c.scripts)) {
          let I =
            typeof c.scripts.start === "string"
              ? "start"
              : typeof c.scripts.dev === "string"
                ? "dev"
                : void 0;
          if (I) x.start = [y, "run", I];
          if (typeof c.scripts.build === "string") x.build = [y, "run", "build"];
          if (typeof c.scripts.test === "string") x.test = [y, "run", "test"];
          if (Object.keys(x).length)
            a.suggestedProfiles.push({ id: "manifest", name: "Package scripts", commands: x, updatedAt: 0 });
        }
        if (!x.test) a.issues.push("No test script declared. Test verification remains unknown.");
        if (!x.build) a.issues.push("No build script declared. Build verification remains unknown.");
      }
    }
    for (let c of [
      {
        file: "pyproject.toml",
        kind: "Python",
        command: "python",
        guidance: "Install Python yourself and configure the project's virtual environment.",
      },
      {
        file: "requirements.txt",
        kind: "Python",
        command: "python",
        guidance: "Install Python yourself and configure the project's virtual environment.",
      },
      {
        file: "Cargo.toml",
        kind: "Rust",
        command: "cargo",
        guidance: "Install the Rust toolchain yourself, then reopen Jac Code.",
      },
      { file: "go.mod", kind: "Go", command: "go", guidance: "Install Go yourself, then reopen Jac Code." },
    ]) {
      let y = await Ft(k, c.file, 65536).catch((S) => {
        if (S.code !== "ENOENT") a.issues.push(`${c.file} could not be safely inspected.`);
      });
      if (!y || a.requirements.some((S) => S.id === c.command)) continue;
      a.kind = a.kind === "Unrecognized project" ? c.kind : `${a.kind} + ${c.kind}`;
      let v = await Zn(c.command, k).catch(() => {
          return;
        }),
        E = y
          .toString("utf8")
          .match(
            c.kind === "Python"
              ? /^\s*requires-python\s*=\s*["']([^"'\r\n]{1,100})["']/m
              : c.kind === "Rust"
                ? /^\s*rust-version\s*=\s*["']([^"'\r\n]{1,100})["']/m
                : /^go\s+([^\s]{1,100})/m,
          )?.[1];
      if (
        (a.requirements.push({
          id: c.command,
          label: c.kind,
          status: v ? "available" : "missing",
          detail: `${E ? `Declared runtime requirement: ${E}. ` : ""}${v ? `Executable located. Inspect ${c.file} for other requirements; no code or version check was executed.` : c.guidance}`,
        }),
        c.kind === "Rust" || c.kind === "Go")
      )
        a.suggestedProfiles.push({
          id: c.command,
          name: `${c.kind} checks`,
          commands: { build: [c.command, "build"], test: [c.command, "test"] },
          updatedAt: 0,
        });
      if (c.kind === "Python")
        a.issues.push(
          "Python commands depend on your environment. Save explicit build/test argv after reviewing the project documentation.",
        );
    }
    if (!a.requirements.length)
      a.issues.push(
        "No supported manifest was found. Add explicit commands from your project documentation.",
      );
    return a;
  }
  async function b(g) {
    let k = await st(g);
    return structuredClone((await p())[f(k)] ?? []);
  }
  async function C(g, k) {
    let a = await b(g),
      d = k ? a.filter((c) => c.id === k) : a.length ? a : (await m(g)).suggestedProfiles;
    if (k && !d.length) throw Error("Choose an existing run profile.");
    return d
      .flatMap((c) => [c.commands.build, c.commands.test].filter((y) => !!y))
      .map((c) => c.map((y) => (/\s|"/.test(y) ? JSON.stringify(y) : y)).join(" "))
      .filter((c, y, v) => v.indexOf(c) === y);
  }
  return {
    search: h,
    setup: m,
    profiles: b,
    completionExpectations: C,
    saveProfile: (g, k) =>
      u(async () => {
        if (!Ds(k)) throw Error("Enter a name and start, build, or test commands as safe argv arrays.");
        let a = await st(g),
          d = await p();
        if (!d[f(a)] && Object.keys(d).length >= 200)
          throw Error("Saved profiles have reached the project limit.");
        let c = d[f(a)] ?? [];
        if (!c.some((y) => y.id === k.id) && c.length >= 20)
          throw Error("Save at most 20 profiles per project.");
        if (i.some((y) => he(y.directory) === he(a) && y.value.state === "running"))
          throw Error("Stop the running command before changing profiles.");
        return (
          (d[f(a)] = [...c.filter((y) => y.id !== k.id), { ...structuredClone(k), updatedAt: Date.now() }]),
          await w(d),
          structuredClone(d[f(a)])
        );
      }),
    removeProfile: (g, k) =>
      u(async () => {
        if (!Wr.test(k)) throw Error("Choose an existing run profile.");
        let a = await st(g);
        if (i.some((c) => he(c.directory) === he(a) && c.value.state === "running"))
          throw Error("Stop the running command before changing profiles.");
        let d = await p();
        return ((d[f(a)] = (d[f(a)] ?? []).filter((c) => c.id !== k)), await w(d), structuredClone(d[f(a)]));
      }),
    run: (g, k, a, d) =>
      u(async () => {
        if (s.closing)
          throw Error("Project commands are closing. Reopen Jac Code before running another command.");
        if (!Wr.test(k) || !Us.includes(a)) throw Error("Choose an existing profile and command.");
        let c = await st(g);
        if (i.some((O) => he(O.directory) === he(c) && O.value.state === "running"))
          throw Error("A project command is already running. Stop it before starting another.");
        let y = (await b(c)).find((O) => O.id === k)?.commands[a];
        if (!y || !Hr(y)) throw Error("This profile has no valid command for that action.");
        if (d && JSON.stringify(y) !== JSON.stringify(d))
          throw Error("The command changed after confirmation. Review and confirm its current arguments.");
        let v = await $s(y, c),
          E =
            process.platform === "win32"
              ? t.guardExecutable
                ? await Gn(t.guardExecutable)
                : void 0
              : void 0;
        if (process.platform === "win32" && !E)
          throw Error(
            "Safe project command execution is unavailable. Reinstall the latest Jac Code version.",
          );
        await st(c);
        let S = {
          id: pn.randomUUID(),
          profileId: k,
          kind: a,
          command: [...y],
          startedAt: Date.now(),
          state: "running",
          exitCode: null,
          output: "",
          truncated: !1,
        };
        while (i.length >= Ee.runs) {
          let O = i.findIndex((V) => V.value.state !== "running");
          if (O < 0) throw Error("Finish a running command before starting another.");
          i.splice(O, 1);
        }
        let x = Bs.spawn(E ?? v[0], E ? [] : v.slice(1), {
          cwd: E ? L.default.dirname(E) : c,
          shell: !1,
          windowsHide: !0,
          detached: process.platform !== "win32",
          stdio: [E ? "pipe" : "ignore", "pipe", "pipe"],
          env: ha(c),
        });
        if (E)
          (x.stdin?.on("error", () => {}),
            x.stdin?.write(
              JSON.stringify({
                version: 1,
                parentPid: t.parentPid ?? process.pid,
                executable: v[0],
                args: v.slice(1),
                cwd: c,
              }) +
                `
`,
            ));
        i.push({ directory: c, value: S });
        let I = { total: 0 },
          U = (O) => {
            let V = Ee.outputBytes - I.total;
            if (O.length > V) S.truncated = !0;
            if (V <= 0) return;
            let fe = O.subarray(0, V).toString("utf8"),
              Je = Buffer.byteLength(fe) <= V ? fe : fe.slice(0, -1);
            ((S.output += Je), (I.total += Buffer.byteLength(Je)));
          };
        (x.stdout?.on("data", U), x.stderr?.on("data", U));
        let B = {},
          K = (O) => {
            if (S.state !== "running" || B.state) return;
            if (((B.state = O), process.platform !== "win32" && x.pid))
              try {
                process.kill(-x.pid, "SIGKILL");
              } catch {
                x.kill("SIGKILL");
              }
            if (E) x.stdin?.end();
          };
        r.set(S.id, { child: x, stop: K });
        let J = setTimeout(() => K("timed_out"), pa(a, t.runTimeoutMs));
        J.unref();
        let H = { value: !1 };
        return (
          x.once("error", () => {
            (U(
              Buffer.from(`
The command could not start. Check the executable and project setup.`),
            ),
              (H.value = !0));
          }),
          x.once("close", (O) => {
            if ((clearTimeout(J), S.state === "running"))
              ((S.state = B.state ?? (!H.value && O === 0 ? "passed" : "failed")), (S.endedAt = Date.now()));
            ((S.exitCode = !H.value && Number.isSafeInteger(O) ? O : null), r.delete(S.id), l(c, S));
          }),
          l(c, S),
          structuredClone(S)
        );
      }),
    async listRuns(g) {
      let k = await st(g);
      return structuredClone(
        i
          .filter((a) => he(a.directory) === he(k))
          .map((a) => a.value)
          .reverse(),
      );
    },
    async cancelRun(g) {
      if (typeof g !== "string" || !/^[a-f0-9-]{36}$/.test(g)) throw Error("Choose an existing run.");
      r.get(g)?.stop("cancelled");
    },
    async close() {
      ((s.closing = !0),
        await o,
        await Promise.all(
          [...r.values()].map(
            (g) =>
              new Promise((k) => {
                (g.child.once("close", () => k()), g.stop("cancelled"));
              }),
          ),
        ));
    },
  };
}