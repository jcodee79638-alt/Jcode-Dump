
var cjt,
  axr,
  o3i,
  aLe,
  a3i,
  H3i = async (e, t) => {
    if (e.length === 0) return;
    let r = [];
    for (let s of e)
      try {
        return await t(s);
      } catch (a) {
        r.push(a);
      }
    throw AggregateError(r, "Failed to open in all supported apps");
  },
  Ajt = async (e) => {
    e = { wait: !1, background: !1, newInstance: !1, allowNonzeroExitCode: !1, ...e };
    let t = e[cjt] === !0;
    if ((delete e[cjt], Array.isArray(e.app))) return H3i(e.app, (_) => Ajt({ ...e, app: _, [cjt]: !0 }));
    let { name: r, arguments: s = [] } = e.app ?? {};
    if (((s = [...s]), Array.isArray(r)))
      return H3i(r, (_) => Ajt({ ...e, app: { name: _, arguments: s }, [cjt]: !0 }));
    if (r === "browser" || r === "browserPrivate") {
      let _ = {
          "com.google.chrome": "chrome",
          "google-chrome.desktop": "chrome",
          "com.brave.browser": "brave",
          "org.mozilla.firefox": "firefox",
          "firefox.desktop": "firefox",
          "com.microsoft.msedge": "edge",
          "com.microsoft.edge": "edge",
          "com.microsoft.edgemac": "edge",
          "microsoft-edge.desktop": "edge",
          "com.apple.safari": "safari",
        },
        L = { chrome: "--incognito", brave: "--incognito", firefox: "--private-window", edge: "--inPrivate" },
        I;
      if (eJ) {
        let S = await WRi();
        I = txr.get(S) ?? {};
      } else I = await sxr();
      let D = I.id?.toLowerCase();
      if (Object.hasOwn(_, D)) {
        let S = _[D];
        if (r === "browserPrivate") {
          if (S === "safari") throw Error("Safari doesn't support opening in private mode via command line");
          s.push(L[S]);
        }
        return Ajt({ ...e, app: { name: hPe[S], arguments: s } });
      }
      throw Error(`${I.name} is not supported as a default browser`);
    }
    let a,
      H = [],
      u = {},
      f = !1;
    if (eJ && !iLe() && !i3i && !r) f = await RRi();
    if (aLe === "darwin") {
      if (((a = "open"), e.wait)) H.push("--wait-apps");
      if (e.background) H.push("--background");
      if (e.newInstance) H.push("--new");
      if (r) H.push("-a", r);
    } else if (aLe === "win32" || f) {
      if (((a = await ajt()), H.push(...tJ.argumentsPrefix), !eJ)) u.windowsVerbatimArguments = !0;
      if (eJ && e.target) e.target = await VRi(e.target);
      let _ = ["$ProgressPreference = 'SilentlyContinue';", "Start"];
      if (e.wait) _.push("-Wait");
      if (r) {
        if ((_.push(tJ.escapeArgument(r)), e.target)) s.push(e.target);
      } else if (e.target) _.push(tJ.escapeArgument(e.target));
      if (s.length > 0) ((s = s.map((L) => tJ.escapeArgument(L))), _.push("-ArgumentList", s.join(",")));
      if (((e.target = tJ.encodeCommand(_.join(" "))), !e.wait)) u.stdio = "ignore";
      if (eJ) u.cwd = Hxr.dirname(a);
    } else {
      if (r) a = r;
      else {
        let _ = !axr || axr === "/",
          L = !1;
        try {
          (await F2a.access(o3i, B2a.X_OK), (L = !0));
        } catch {}
        a = (A3i.versions.electron ?? (aLe === "android" || _ || !L)) ? "xdg-open" : o3i;
      }
      if (s.length > 0) H.push(...s);
      if (!e.wait) ((u.stdio = "ignore"), (u.detached = !0));
    }
    if (aLe === "darwin" && s.length > 0) H.push("--args", ...s);
    if (e.target) H.push(e.target);
    let d = N2a.spawn(a, H, u);
    if (e.wait)
      return new Promise((_, L) => {
        (d.once("error", L),
          d.once("close", (I) => {
            if (!e.allowNonzeroExitCode && I !== 0) {
              L(Error(`Exited with code ${I}`));
              return;
            }
            _(d);
          }));
      });
    if (t || aLe === "win32" || f)
      return new Promise((_, L) => {
        (d.once("error", L),
          d.once("spawn", () => {
            d.once("close", (I) => {
              if ((d.off("error", L), t && I !== 0)) {
                L(Error(`Exited with code ${I}`));
                return;
              }
              (d.unref(), _(d));
            });
          }));
      });
    return (
      d.unref(),
      new Promise((_, L) => {
        (d.once("error", L),
          d.once("spawn", () => {
            (d.off("error", L), _(d));
          }));
      })
    );
  },
  R2a = (e, t) => {
    if (typeof e !== "string") throw TypeError("Expected a `target`");
    return Ajt({ ...t, target: e });
  },
  hPe,
  u3i;