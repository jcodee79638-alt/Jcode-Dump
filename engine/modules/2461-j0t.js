
var j0t = Ie(function (kAc, OKn) {
  var { spawn: Bwo } = cr("child_process"),
    CKn = cr("os"),
    wKn = Jht(),
    b0t = jKn(),
    yAr = (e, t, r = {}, s = {}) => {
      if (r.shell) return kKn(e, t, r, s);
      let a,
        H,
        u = new Promise((S, T) => {
          ((a = S), (H = T));
        }),
        f = Error("command failed"),
        d = [],
        _ = [],
        L = (S) => ({ cmd: e, args: t, ...S, ...Wwo(d, _, r), ...s }),
        I = (S, T) => {
          let C = L(T);
          H(Object.assign(S, C));
        },
        D = Bwo(e, t, r);
      if (((u.stdin = D.stdin), (u.process = D), D.on("error", I), D.stdout))
        (D.stdout.on("data", (S) => d.push(S)), D.stdout.on("error", I));
      if (D.stderr) (D.stderr.on("data", (S) => _.push(S)), D.stderr.on("error", I));
      return (
        D.on("close", (S, T) => {
          if (S || T) I(f, { code: S, signal: T });
          else a(L({ code: S, signal: T }));
        }),
        u
      );
    },
    kKn = (e, t, r, s) => {
      let a = r.shell;
      if (a === !0) a = process.env.ComSpec || "cmd.exe";
      let H = { ...r, shell: !1 },
        u = [],
        f = e;
      if (/(?:^|\\)cmd(?:\.exe)?$/i.test(a)) {
        let _ = !1,
          L = "",
          I = !1;
        for (let S = 0; S < e.length; ++S) {
          let T = e.charAt(S);
          if (T === " " && !I) break;
          if (((L += T), T === '"' || T === "'")) I = !I;
        }
        let D;
        try {
          D = wKn
            .sync(L, {
              path: (H.env && PKn(H.env, "PATH")) || process.env.PATH,
              pathext: (H.env && PKn(H.env, "PATHEXT")) || process.env.PATHEXT,
            })
            .toLowerCase();
        } catch (S) {
          D = L.toLowerCase();
        }
        _ = D.endsWith(".cmd") || D.endsWith(".bat");
        for (let S of t) f += ` ${b0t.cmd(S, _)}`;
        (u.push("/d", "/s", "/c", f), (H.windowsVerbatimArguments = !0));
      } else {
        for (let _ of t) f += ` ${b0t.sh(_)}`;
        u.push("-c", f);
      }
      return yAr(a, u, H, s);
    },
    Rwo = (e, t = {}, r = {}) => {
      let s = { ...t, shell: !0 },
        a = [].concat(e),
        H = "win32";
      if (H === "linux" && CKn.release().toLowerCase().includes("microsoft")) {
        if (((H = "wsl"), !process.env.BROWSER))
          return Promise.reject(Error("Set the BROWSER environment variable to your desired browser."));
      }
      let u = s.command;
      if (!u)
        if (H === "win32") ((s.shell = process.env.ComSpec), (u = 'start ""'));
        else if (H === "wsl") u = "sensible-browser";
        else if (H === "darwin") u = "open";
        else u = "xdg-open";
      return kKn(u, a, s, r);
    };
  yAr.open = Rwo;
  var DAr = (e = "pipe", t) => {
      if (e === "pipe" || e === null) return !0;
      if (Array.isArray(e)) return DAr(e[t], t);
      return !1;
    },
    Wwo = (e, t, { stdioString: r = !0, stdio: s }) => {
      let a = { stdout: null, stderr: null };
      if (DAr(s, 1)) {
        if (((a.stdout = Buffer.concat(e)), r)) a.stdout = a.stdout.toString().trim();
      }
      if (DAr(s, 2)) {
        if (((a.stderr = Buffer.concat(t)), r)) a.stderr = a.stderr.toString().trim();
      }
      return a;
    },
    PKn = (e, t) => {
      t = t.toLowerCase();
      for (let r of Object.keys(e).sort()) if (r.toLowerCase() === t) return e[r];
    };
  OKn.exports = yAr;
});