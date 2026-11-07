
function vh() {
  const [e, n] = S(!1),
    [i, s] = S(""),
    [l, a] = S(""),
    [c, d] = S([]),
    [f, u] = S([]),
    [h, m] = S(),
    [y, b] = S(""),
    [j, w] = S(!1),
    [L, O] = S(),
    [_, R] = S(),
    [A, J] = S(fh),
    [D, B] = S(!1),
    [H, V] = S(!1),
    [E, me] = S(),
    P = () => !E() || E().plan.toLowerCase() === "free",
    v = () => (P() ? "off" : A().thinking),
    [M, N] = S(),
    [re, F] = S(!1),
    [p, ee] = S(!0),
    [ie, te] = S(!1),
    [U, C] = S("login"),
    [I, ne] = S(),
    [se, ce] = S("appearance"),
    [ae, de] = S(),
    [ve, ke] = S(),
    [le, be] = S(!1),
    [Te, $e] = S(),
    [pe, Re] = S(),
    [De, st] = S({ paused: !0, items: [] }),
    [ue, Ue] = S({}),
    [$t, Fe] = S(),
    [pn, bn] = S([]),
    [Pr, Yn] = S(""),
    pt = nl(),
    wn = new Set(),
    [Rr, It] = S(),
    [gt, zt] = S(),
    [Ir, Vn] = S(""),
    [Li, _n] = S(),
    [Kn, qr] = S(""),
    [Wt, Mi] = S(Date.now()),
    [Di, Zn] = S(!1),
    [Ni, Lr] = S(!0),
    [Gn, Mr] = S(!1),
    [yn, yt] = S(!1),
    [zi, an] = S({}),
    [Oi, Ui] = S({}),
    [Dr, Nr] = S(),
    Ge = Pe(() => _()?.chat.directory ?? L()?.directory),
    zr = () => c().find((k) => k.directory === Ge())?.name ?? (L()?.directory === Ge() ? L()?.name : void 0),
    kn = () => _()?.chat.id ?? L()?.directory ?? "new",
    Ne = () => A().drafts[kn()] ?? { text: "", attachments: [] },
    kt = () => _()?.status === "busy",
    qt = () => kt() && pe()?.state !== "stopped",
    Ot = () => pe()?.state === "connected",
    Fi = () => De().items.filter((k) => k.state !== "submitted").length,
    xn = () => _()?.chat.accessMode ?? A().accessMode ?? "ask",
    Or = () => e() && !i() && !re() && (!p() || ie());
  Ie(() => {
    const k = M()?.status;
    ((k === "downloading" || k === "verifying" || k === "ready") && F(!0), k === "current" && F(!1));
  });
  let Ve = 0,
    Lt,
    Qn = 0,
    Xn,
    er = Promise.resolve(),
    sn,
    tr = !0,
    Mt = !1,
    nr = 0,
    Yt = 0,
    rr = 0;
  const Cn = new Set();
  let bt,
    xt = 0,
    ft,
    ln = !1,
    Vt = !1;
  const [ir, ar] = S(0),
    on = new Map();
  function Kt() {
    if (Mt || p() || ln) return Promise.resolve();
    if (ft) return ft;
    const k = xt,
      T = window.jac
        .account()
        .then((Y) => {
          !Mt && !ln && k === xt && cn(Y);
        })
        .finally(() => {
          ft === T && ((ft = void 0), Vt && ((Vt = !1), Kt().catch(() => {})));
        });
    return ((ft = T), T);
  }
  function Ur() {
    It({
      title: $.redeemTitle,
      detail: $.redeemDetail,
      label: $.redeem,
      action: async () => {
        await Ji();
      },
    });
  }
  async function Ji() {
    ((ln = !0), xt++, (ft = void 0), (Vt = !1));
    try {
      cn(await window.jac.redeemReset({ confirmed: !0 }));
    } finally {
      ln = !1;
    }
    (Kt().catch(() => {}), Fe({ text: $.resetRefreshed, error: !1 }));
  }
  async function je(k, T) {
    if (!(
      ue()[k] &&
      ![
        "load-chat",
        "recent",
        "refresh-chat",
        "after-run",
        "account",
        "update",
        "announcements",
        "launch",
      ].includes(k)
    )) {
      (on.set(k, (on.get(k) ?? 0) + 1), Ue((Y) => ({ ...Y, [k]: !0 })));
      try {
        return await T();
      } catch (Y) {
        (k === "auth" && ne({ message: Y instanceof Error ? Y.message : $.authFailed }),
          k !== "auth" && Fe({ text: Ke(Y instanceof Error ? Y.message : $.requestFailed), error: !0 }));
      } finally {
        (on.set(k, Math.max(0, (on.get(k) ?? 1) - 1)), Ue((Y) => ({ ...Y, [k]: (on.get(k) ?? 0) > 0 })));
      }
    }
  }
  function Sn(k) {
    const T = k.drafts
      ? {
          ...k,
          drafts: Object.fromEntries(
            Object.entries(k.drafts).filter(([, Q]) => Q.text.length > 0 || Q.attachments.length > 0),
          ),
        }
      : k;
    J((Q) => ({ ...Q, ...T }));
    const Y = window.jac.saveSettings(T);
    return (
      (er = Promise.all([er, Y])
        .then(() => {})
        .catch((Q) => {
          Fe({ text: Ke(Q instanceof Error ? Q.message : $.requestFailed), error: !0 });
        })),
      Y
    );
  }
  function Zt(k) {
    (J((T) => ({ ...T, drafts: { ...T.drafts, [kn()]: { ...Ne(), ...k } } })),
      Sn({ drafts: A().drafts }).catch(() => {}));
  }
  function jn(k) {
    (Zt({
      text: [Ne().text, k].filter(Boolean).join(`

`),
    }),
      queueMicrotask(() => {
        const T = document.querySelector(".composer textarea");
        T && (T.focus(), T.setSelectionRange(T.value.length, T.value.length), (T.scrollTop = T.scrollHeight));
      }));
  }
  async function Ut() {
    e() && (await Sn({ drafts: A().drafts }), await er);
  }
  function Gt(k) {
    je("settings", () => Sn(k));
  }
  function Bi(k) {
    return je("access", async () => {
      const T = _()?.chat,
        Y = await window.jac.setAccessMode({ mode: k, ...(T ? { id: T.id, directory: T.directory } : {}) });
      (J((Q) => ({ ...Q, accessMode: Y.mode })),
        T && R((Q) => (Q?.chat.id === T.id ? { ...Q, chat: { ...Q.chat, accessMode: Y.mode } } : Q)));
    });
  }
  function sr() {
    ue().tutorial ||
      je("tutorial", async () => {
        Vn("");
        try {
          await Sn({ tutorialVersion: 1 });
        } catch (k) {
          throw (Vn($.tutorialSaveFailed), k);
        }
        zt(void 0);
      });
  }
  Ie(() => {
    e() && !p() && A().tutorialVersion !== 1 && gt() === void 0 && !ae() && !Rr() && !kt() && zt(0);
  });
  async function Hi() {
    (te(!0), bt && (await je("launch", () => An(bt)), (bt = void 0)));
  }
  function Ft() {
    if ((yt(!1), p())) {
      (C("login"), te(!1));
      return;
    }
    (de("account"), je("account", Kt));
  }
  function Wi() {
    (xt++, (ft = void 0), yt(!1), de(void 0), ne(void 0), C("login"), te(!1), ee(!0));
  }
  function lr() {
    if (Gn()) {
      yt((k) => !k);
      return;
    }
    Gt({ sidebarCollapsed: !A().sidebarCollapsed });
  }
  const Fr = () => ((Gn() ? yn() : !A().sidebarCollapsed) ? $.hideSidebar : $.showSidebar);
  async function Tn(k = !1) {
    const T = pt.epoch;
    ar(Date.now());
    const Y = await window.jac.announcements();
    if (T !== pt.epoch || p()) return;
    const Q = pt.receive(Y);
    (bn(Q), k && Q.length === 0 && Fe({ text: $.noAnnouncements, error: !1 }));
  }
  function cn(k, T = !1) {
    (pt.setOwner(k ? (k.email ?? k.username).toLowerCase() : void 0) && (wn.clear(), bn([]), Yn(""), ar(0)),
      B(k?.admission.code === "free_plan_unavailable"),
      k?.admission.code !== "free_plan_unavailable" && V(!1),
      me(k),
      T && k?.announcements !== void 0 && (ar(Date.now()), bn(pt.receive(k.announcements))));
  }
  const Jr = () => E()?.plan.toLowerCase() === "free" && E()?.admission.code === "free_budget_exhausted";
  function Yi(k) {
    if (wn.has(k)) return;
    const T = pt.epoch;
    (wn.add(k),
      window.jac.announcementSeen({ id: k }).catch(() => {
        T === pt.epoch && wn.delete(k);
      }));
  }
  async function Vi(k) {
    if (dt()?.getAttribute("aria-label") !== $.announcement || document.visibilityState !== "visible") return;
    const T = pt.epoch;
    (Yn(""),
      await je("acknowledge", async () => {
        try {
          if ((await window.jac.acknowledge({ id: k }), T !== pt.epoch)) return;
          (pt.acknowledge(k), bn((Y) => Y.filter((Q) => Q.id !== k)));
        } catch {
          T === pt.epoch && Yn("Could not save your acknowledgement. Check your connection and try again.");
        }
      }));
  }
  function Br(k) {
    (xt++,
      (ft = void 0),
      a(k.version),
      d(k.projects),
      u(k.recent),
      J(k.settings),
      cn(k.account, !0),
      ee(k.authRequired),
      N(k.update),
      k.error && Fe({ text: Ke(k.error), error: !0 }),
      n(!0));
  }
  async function or() {
    if ((s(""), !window.jac)) {
      s($.bridgeMissing);
      return;
    }
    try {
      const k = await window.jac.bootstrap();
      if (Mt) return;
      if (k.error && !k.projects.length && !k.recent.length) {
        (n(!1), s(Ke(k.error)));
        return;
      }
      (Br(k), cr(), Qt(), je("recent", () => St()), (bt = k.launch));
      const T = Ve;
      (bt && !k.authRequired && (await An(bt, T), (bt = void 0)),
        !k.authRequired &&
          k.account?.announcements === void 0 &&
          ir() === 0 &&
          (await je("announcements", () => Tn())));
    } catch (k) {
      s(Ke(k instanceof Error ? k.message : $.connectionFailed));
    }
  }
  async function cr() {
    const k = ++Yt;
    await window.jac
      .connection()
      .then((T) => {
        !Mt && k === Yt && Re(T);
      })
      .catch(() => {
        !Mt && k === Yt && Re({ state: "stopped", since: Date.now(), attempt: 0 });
      });
  }
  async function Qt() {
    const k = ++rr;
    await window.jac
      .queueState()
      .then((T) => {
        !Mt && k === rr && st(T);
      })
      .catch(() => {});
  }
  async function dr(k, T, Y) {
    const Q = ++nr,
      he = { id: k.id, events: [] };
    Cn.add(he);
    try {
      const ye = await T();
      return !ye ||
        Mt ||
        Y !== Ve ||
        Q !== nr ||
        Lt?.id !== k.id ||
        Lt.directory !== k.directory ||
        ye.chat.id !== k.id ||
        ye.chat.directory !== k.directory
        ? void 0
        : (R(he.events.reduce(ei, ye)), ye);
    } finally {
      Cn.delete(he);
    }
  }
  async function ur() {
    await je("reconnect", async () => {
      const k = _()?.chat;
      (k && (await dr(k, () => window.jac.reconnect({ id: k.id, directory: k.directory }), Ve)),
        k || (await window.jac.reconnect()),
        await cr(),
        i() && (await or()),
        await Promise.all([St(), Qt()]));
    });
  }
  async function An(k, T) {
    if (!(T !== void 0 && T !== Ve)) {
      if (!k.directory && !k.sessionId && !k.prompt) {
        jt();
        return;
      }
      if (k.directory) {
        const Y = await window.jac.projects();
        if (T !== void 0 && T !== Ve) return;
        d(Y);
        const Q = Y.find((he) => he.directory === k.directory);
        (Q && O(Q),
          k.sessionId && (await Jt({ id: k.sessionId, directory: k.directory })),
          !k.sessionId && Q && jt(Q));
      }
      k.prompt &&
        Zt({
          text: [Ne().text, k.prompt].filter(Boolean).join(`

`),
        });
    }
  }
  async function Ct() {
    const k = _()?.chat;
    if (!k || Lt?.id !== k.id || Lt.directory !== k.directory) return;
    await dr(k, () => window.jac.loadChat({ id: k.id, directory: k.directory }), Ve);
  }
  async function St(k = !1) {
    const T = ++Qn,
      Y = await window.jac.chats({ search: y(), archived: j(), ...(k ? { cursor: h() } : {}) });
    T === Qn &&
      (u((Q) => (k ? [...Q, ...Y.items.filter((he) => !Q.some((ye) => ye.id === he.id))] : Y.items)),
      m(Y.cursor));
  }
  function Ki(k) {
    (b(k),
      Qn++,
      clearTimeout(Xn),
      (Xn = setTimeout(() => {
        je("recent", () => St());
      }, 250)));
  }
  async function Jt(k) {
    (de(void 0), yt(!1));
    const T = ++Ve;
    ((Lt = k),
      await je("load-chat", async () => {
        const Y = await dr(k, () => window.jac.loadChat({ id: k.id, directory: k.directory }), T);
        !Y || T !== Ve || (O(c().find((Q) => Q.directory === Y.chat.directory)), (tr = !0));
      }));
  }
  function jt(k) {
    (de(void 0), yt(!1), Ve++, (Lt = void 0), R(void 0), O(k));
  }
  async function Hr() {
    await je("project", async () => {
      const k = await window.jac.openProject();
      k && (d(await window.jac.projects()), jt(k));
    });
  }
  async function En(k = !1, T) {
    if (
      !Ot() ||
      kt() ||
      ue()["load-chat"] ||
      ue().send ||
      ue().access ||
      ue().attachments ||
      p() ||
      (M()?.required && M()?.status !== "current") ||
      (E() && (!E().admission.allowed || E().globalPaused))
    )
      return;
    const Y = A().model ?? tn,
      Q = T
        ? { text: T, attachments: [] }
        : k
          ? { text: Ws, attachments: [] }
          : { ...Ne(), attachments: [...Ne().attachments] };
    (k && !ni(_(), E())) ||
      (!Q.text.trim() && Q.attachments.length === 0) ||
      (await je("send", async () => {
        Zr(
          Y,
          Q.attachments.map((W) => W.mime),
        );
        const he = kn(),
          ye = Ve,
          Ce = _()?.chat,
          xe = Ce ?? (await window.jac.createChat(Ge() ? { directory: Ge() } : {}));
        if (ye !== Ve) {
          Fe({ text: $.sendNavigationChanged, error: !1 });
          return;
        }
        if (
          (Ce ||
            (Ve++,
            (Lt = xe),
            J((W) => ({ ...W, drafts: { ...W.drafts, [he]: { text: "", attachments: [] }, [xe.id]: Q } })),
            R({ chat: xe, messages: [], status: "idle", permissions: [], questions: [], children: [] }),
            await Ut()),
          Ve !== ye + (Ce ? 0 : 1))
        ) {
          Fe({ text: $.sendNavigationChanged, error: !1 });
          return;
        }
        (an((W) => ({ ...W, [xe.id]: !1 })),
          Nr(void 0),
          await window.jac.send({
            id: xe.id,
            directory: xe.directory,
            text: Q.text,
            attachments: Q.attachments,
            thinking: v(),
            model: Y,
          }),
          !k &&
            !T &&
            J((W) => ({
              ...W,
              drafts: {
                ...W.drafts,
                [he]: { text: "", attachments: [] },
                [xe.id]: { text: "", attachments: [] },
              },
            })),
          await Ut().catch(() => Fe({ text: $.sentDraftFailed, error: !0 })),
          (await Promise.allSettled([Ct(), St()])).some((W) => W.status === "rejected") &&
            Fe({ text: $.sentRefreshFailed, error: !0 }));
      }));
  }
  async function Zi() {
    const k = _()?.chat;
    if (
      !k ||
      !kt() ||
      !Ot() ||
      p() ||
      ue()["load-chat"] ||
      ue().send ||
      ue().attachments ||
      (M()?.required && M()?.status !== "current") ||
      (!Ne().text.trim() && !Ne().attachments.length)
    )
      return;
    const T = kn(),
      Y = { text: Ne().text, attachments: [...Ne().attachments] };
    await je("queue", async () => {
      (Zr(
        A().model ?? tn,
        Y.attachments.map((Q) => Q.mime),
      ),
        await window.jac.queuePrompt({
          id: k.id,
          directory: k.directory,
          ...Y,
          thinking: v(),
          model: A().model ?? tn,
        }),
        J((Q) => {
          const he = Q.drafts[T];
          return !he ||
            he.text !== Y.text ||
            he.attachments.length !== Y.attachments.length ||
            he.attachments.some((ye, Ce) => ye.id !== Y.attachments[Ce].id)
            ? Q
            : { ...Q, drafts: { ...Q.drafts, [T]: { text: "", attachments: [] } } };
        }),
        await Ut(),
        await Qt(),
        Fe({ text: "Request saved to the local queue.", error: !1 }));
    });
  }
  async function Gi() {
    const k = Ve;
    await je("attachments", async () => {
      const T = await window.jac.pickAttachments();
      if (k !== Ve) throw new qn("changed");
      if (T.length + Ne().attachments.length > pr.files) throw new qn("total");
      Zt({ attachments: [...Ne().attachments, ...T] });
    });
  }
  async function Qi() {
    const k = _()?.chat;
    k &&
      (an((T) => ({ ...T, [k.id]: !0 })),
      await je("cancel", async () => {
        try {
          await window.jac.cancel({ id: k.id, directory: k.directory });
        } catch (T) {
          throw (an((Y) => ({ ...Y, [k.id]: !1 })), T);
        }
        await Ct();
      }));
  }
  async function Xi(k) {
    (k.preventDefault(), Zn(!1));
    const T = Array.from(k.dataTransfer?.files ?? []);
    if (!T.length) return;
    const Y = Ve;
    await je("attachments", async () => {
      if (T.length + Ne().attachments.length > pr.files || T.some((he) => he.size > pr.fileBytes))
        throw new qn("size");
      const Q = [];
      for (const he of T)
        Q.push(
          await window.jac.addAttachment({
            filename: he.name,
            mime: he.type || "application/octet-stream",
            bytes: new Uint8Array(await he.arrayBuffer()),
          }),
        );
      if (Y !== Ve) throw new qn("changed");
      Zt({ attachments: [...Ne().attachments, ...Q] });
    });
  }
  function ea(k) {
    It({
      title: k.archivedAt ? $.unarchive : $.archiveTitle,
      detail: $.archiveDetail,
      label: k.archivedAt ? $.unarchive : $.archive,
      action: async () => {
        (await window.jac.archiveChat({ id: k.id, directory: k.directory, archived: !k.archivedAt }),
          _()?.chat.id === k.id && jt(),
          await St());
      },
    });
  }
  function hr() {
    je("window", async () => {
      (await Ut(), await window.jac.window("close"));
    });
  }
  (vn(() => {
    const k = window.matchMedia("(prefers-color-scheme: dark)");
    Lr(k.matches);
    const T = () => Lr(k.matches);
    k.addEventListener("change", T);
    const Y = window.matchMedia("(max-width: 1000px)");
    Mr(Y.matches);
    const Q = () => {
      (Mr(Y.matches), yt(!1));
    };
    Y.addEventListener("change", Q);
    const he = setInterval(() => Mi(Date.now()), 3e4),
      ye = { last: Date.now() },
      Ce = new Set(),
      xe = () => {
        e() && !p() && ((ye.last = Date.now()), Kt().catch(() => {}));
      },
      K = setInterval(() => {
        document.visibilityState === "visible" &&
          (kt() || Ce.size > 0 || Date.now() - ye.last >= 6e4) &&
          xe();
      }, 5e3),
      W = setInterval(() => {
        e() && !p() && document.visibilityState === "visible" && Qt();
      }, 5e3),
      q = () => {
        e() && !p() && !ue().announcements && Date.now() - ir() >= 6e4 && je("announcements", () => Tn());
      };
    Ie(() => {
      if (!e() || p()) return;
      const X = setTimeout(
        () => {
          document.visibilityState === "visible" && q();
        },
        Math.max(0, ir() + 6e4 - Date.now()),
      );
      Me(() => clearTimeout(X));
    });
    const fe = () => {
        (xe(), q(), e() && (cr(), p() || Qt()));
      },
      ge = () => {
        document.visibilityState === "visible" && fe();
      };
    (window.addEventListener("focus", fe), document.addEventListener("visibilitychange", ge));
    const oe = window.jac?.subscribe((X) => {
      if (
        (X.type === "status" && (X.status === "busy" ? Ce.add(X.sessionId) : Ce.delete(X.sessionId)),
        X.type === "connection")
      ) {
        (Yt++, Re(X.connection));
        return;
      }
      if (X.type === "account") {
        ln || (xt++, (ft = void 0), cn(X.account));
        return;
      }
      if (X.type === "update") {
        N(X.update);
        return;
      }
      if (X.type === "launch") {
        if (p()) {
          bt = X.launch;
          return;
        }
        je("launch", () => An(X.launch));
        return;
      }
      if (X.type === "error") {
        const Se = X.sessionId ?? (X.fatal ? _()?.chat.id : void 0);
        (Se && an((ze) => ({ ...ze, [Se]: !0 })),
          Se && Nr({ id: Se, message: Ke(X.message) }),
          X.fatal && (Yt++, Re({ state: "stopped", since: Date.now(), attempt: 0 })),
          Fe({ text: Ke(X.message), error: !0 }));
        return;
      }
      if (X.type === "refresh") {
        (!X.sessionId || X.sessionId === _()?.chat.id) &&
          je("refresh-chat", async () => {
            await Promise.all([Ct(), St()]);
          });
        return;
      }
      if ("sessionId" in X) for (const Se of Cn) Se.id === X.sessionId && Se.events.push(X);
      ("sessionId" in X &&
        (X.type === "message" ||
          X.type === "part" ||
          X.type === "delta" ||
          (X.type === "status" && X.status === "busy")) &&
        an((Se) => (Se[X.sessionId] ? { ...Se, [X.sessionId]: !1 } : Se)),
        R((Se) => Se && ei(Se, X)),
        X.type === "status" &&
          X.status === "idle" &&
          (xt++,
          ft && (Vt = !0),
          xe(),
          X.sessionId === _()?.chat.id &&
            je("after-run", async () => {
              await Promise.all([Ct(), St()]);
            })));
    });
    or();
    const Ae = (X) => {
      if (!re()) {
        if (X.key === "Escape" && !X.defaultPrevented && !dt()) {
          if (yn()) {
            yt(!1);
            return;
          }
          if (ae()) {
            (X.preventDefault(), de(void 0));
            return;
          }
        }
        ((X.ctrlKey || X.metaKey) &&
          X.key.toLowerCase() === "n" &&
          !p() &&
          !dt() &&
          (X.preventDefault(), jt()),
          (X.ctrlKey || X.metaKey) &&
            X.key.toLowerCase() === "b" &&
            !p() &&
            !dt() &&
            (X.preventDefault(), lr()));
      }
    };
    (window.addEventListener("keydown", Ae),
      Me(() => {
        ((Mt = !0),
          oe?.(),
          clearInterval(he),
          clearInterval(K),
          clearInterval(W),
          Cn.clear(),
          nr++,
          Yt++,
          rr++,
          xt++,
          window.removeEventListener("focus", fe),
          document.removeEventListener("visibilitychange", ge),
          clearTimeout(Xn),
          k.removeEventListener("change", T),
          Y.removeEventListener("change", Q),
          window.removeEventListener("keydown", Ae));
      }));
  }),
    Ie(() => {
      document.documentElement.dataset.theme =
        A().theme === "system"
          ? Ni()
            ? "ember"
            : "light"
          : A().theme === "light"
            ? "light"
            : A().theme === "charcoal"
              ? "charcoal"
              : "ember";
    }),
    Ie(() => {
      (_()?.messages,
        !ae() &&
          tr &&
          sn &&
          queueMicrotask(() => {
            ae() || sn?.scrollTo({ top: sn.scrollHeight });
          }));
    }),
    Ie(() => {
      (Ge(), be(!1));
    }));
  function ta() {
    return r(g, {
      get when() {
        return E();
      },
      children: (k) =>
        (() => {
          var T = Qd(),
            Y = T.firstChild,
            Q = Y.nextSibling,
            he = Q.firstChild,
            ye = he.nextSibling,
            Ce = ye.nextSibling;
          Ce.firstChild;
          var xe = Q.nextSibling,
            K = xe.firstChild;
          return (
            (T.$$click = Ft),
            t(
              T,
              r(g, {
                get when() {
                  return k().fiveHour;
                },
                children: (W) =>
                  (() => {
                    var q = Xd(),
                      fe = q.firstChild,
                      ge = fe.nextSibling,
                      oe = ge.nextSibling;
                    return (
                      oe.firstChild,
                      t(q, () => $.fiveHour, fe),
                      t(ge, () => Hn(W().remainingPercent)),
                      t(oe, () => $.remaining, null),
                      q
                    );
                  })(),
              }),
              Y,
            ),
            t(Q, () => $.weekly, he),
            t(ye, () => Hn(k().weekly.remainingPercent)),
            t(Ce, () => $.remaining, null),
            x(
              (W) => {
                var q = $.account,
                  fe = `${k().weekly.remainingPercent}%`;
                return (q !== W.e && z(T, "title", (W.e = q)), fe !== W.t && _i(K, "width", (W.t = fe)), W);
              },
              { e: void 0, t: void 0 },
            ),
            T
          );
        })(),
    });
  }
  function Wr() {
    return (() => {
      var k = eu(),
        T = k.firstChild,
        Y = T.nextSibling,
        Q = Y.nextSibling;
      return (
        (T.$$click = () => {
          je("window", () => window.jac.window("minimize"));
        }),
        t(T, r(Z, { name: "minimize", size: 15 })),
        (Y.$$click = () => {
          je("window", () => window.jac.window("maximize"));
        }),
        t(Y, r(Z, { name: "maximize", size: 13 })),
        (Q.$$click = hr),
        t(Q, r(Z, { name: "close", size: 17 })),
        x(
          (he) => {
            var ye = $.minimize,
              Ce = $.minimize,
              xe = $.maximize,
              K = $.maximize,
              W = $.close,
              q = $.close;
            return (
              ye !== he.e && z(T, "aria-label", (he.e = ye)),
              Ce !== he.t && z(T, "title", (he.t = Ce)),
              xe !== he.a && z(Y, "aria-label", (he.a = xe)),
              K !== he.o && z(Y, "title", (he.o = K)),
              W !== he.i && z(Q, "aria-label", (he.i = W)),
              q !== he.n && z(Q, "title", (he.n = q)),
              he
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0 },
        ),
        k
      );
    })();
  }
  function Yr(k) {
    return (() => {
      var T = lu(),
        Y = T.firstChild,
        Q = Y.nextSibling,
        he = Q.firstChild,
        ye = he.firstChild,
        Ce = ye.nextSibling,
        xe = he.nextSibling,
        K = xe.firstChild,
        W = K.firstChild;
      return (
        T.addEventListener("drop", Xi),
        T.addEventListener("dragleave", (q) => {
          q.currentTarget.contains(q.relatedTarget) || Zn(!1);
        }),
        T.addEventListener("dragover", (q) => {
          q.dataTransfer?.types.includes("Files") && (q.preventDefault(), Zn(!0));
        }),
        t(
          T,
          r(g, {
            get when() {
              return Ne().attachments.length;
            },
            get children() {
              return [
                (() => {
                  var q = tu();
                  return (
                    t(
                      q,
                      r(_e, {
                        get each() {
                          return Ne().attachments;
                        },
                        children: (fe) =>
                          (() => {
                            var ge = ou(),
                              oe = ge.firstChild;
                            return (
                              t(ge, r(Z, { name: "file", size: 15 }), oe),
                              t(oe, () => fe.filename),
                              t(
                                ge,
                                r(Xe, {
                                  name: "close",
                                  get label() {
                                    return `${$.removeAttachment}: ${fe.filename}`;
                                  },
                                  onClick: () =>
                                    Zt({ attachments: Ne().attachments.filter((Ae) => Ae.id !== fe.id) }),
                                }),
                                null,
                              ),
                              x(() => z(oe, "title", fe.filename)),
                              ge
                            );
                          })(),
                      }),
                    ),
                    q
                  );
                })(),
                (() => {
                  var q = nu();
                  return (t(q, () => $.attachmentHint), q);
                })(),
              ];
            },
          }),
          Y,
        ),
        t(
          T,
          r(g, {
            get when() {
              return Ne().attachments.length;
            },
            get children() {
              var q = ru();
              return (
                t(
                  q,
                  r(_e, {
                    get each() {
                      return Ne().attachments;
                    },
                    children: (fe) => r(Ri, { attachment: fe, onReference: jn }),
                  }),
                ),
                q
              );
            },
          }),
          Y,
        ),
        t(
          T,
          r(g, {
            get when() {
              return ue().attachments;
            },
            get children() {
              return iu();
            },
          }),
          Y,
        ),
        (Y.$$keydown = (q) => {
          q.key === "Enter" && !q.shiftKey && !q.isComposing && (q.preventDefault(), En());
        }),
        (Y.$$input = (q) => Zt({ text: q.currentTarget.value })),
        t(
          he,
          r(Xe, {
            get label() {
              return $.attach;
            },
            name: "attach",
            onClick: Gi,
            get disabled() {
              return ue().attachments || ue().send;
            },
          }),
          ye,
        ),
        t(
          he,
          r(un, {
            class: "model-control",
            label: "Model",
            compact: !0,
            get value() {
              return A().model ?? tn;
            },
            get disabled() {
              return ue().settings;
            },
            get options() {
              return Object.entries(ya).map(([q, fe]) => ({
                value: q,
                label: fe,
                detail:
                  q === "jcoder-5.6"
                    ? "New generation · More capable coding, images and PDFs"
                    : "Previous generation · Coding, images and PDFs",
              }));
            },
            onChange: (q) => Gt({ model: yi(q) }),
          }),
          Ce,
        ),
        t(
          he,
          r(un, {
            class: "thinking-control",
            get label() {
              return $.thinking;
            },
            get prefix() {
              return $.thinking;
            },
            compact: !0,
            get value() {
              return v();
            },
            get disabled() {
              return ue().settings;
            },
            get options() {
              return Object.entries($.thinkingOptions).map(([q, fe]) => ({
                value: q,
                label: fe,
                disabled: P() && q !== "off",
                detail:
                  P() && q !== "off"
                    ? "Available on Plus and Pro"
                    : q === "off" && (A().model ?? tn) === "jcoder-5.6"
                      ? "This model may still reason internally. All usage counts."
                      : $.thinkingDetails[q],
              }));
            },
            onChange: (q) => {
              (!P() || q === "off") && Gt({ thinking: q });
            },
          }),
          Ce,
        ),
        t(
          Ce,
          r(Z, {
            get name() {
              return xn() === "read" ? "eye" : "settings";
            },
            size: 14,
          }),
          null,
        ),
        t(
          Ce,
          r(un, {
            get label() {
              return $.access;
            },
            get value() {
              return xn();
            },
            get disabled() {
              return kt() || ue().send || ue().access;
            },
            get options() {
              return Object.entries($.accessModes).map(([q, fe]) => ({
                value: q,
                label: fe,
                detail: $.accessDetails[q],
              }));
            },
            onChange: (q) => {
              Bi(q);
            },
          }),
          null,
        ),
        t(
          xe,
          r(g, {
            get when() {
              return kt();
            },
            get children() {
              var q = au();
              return (
                (q.$$click = () => {
                  Zi();
                }),
                t(q, () => (ue().queue ? "Saving…" : "Queue request")),
                x(
                  () =>
                    (q.disabled =
                      !Ot() ||
                      ue()["load-chat"] ||
                      ue().queue ||
                      ue().send ||
                      ue().attachments ||
                      p() ||
                      (!!M()?.required && M()?.status !== "current") ||
                      (!Ne().text.trim() && !Ne().attachments.length)),
                ),
                q
              );
            },
          }),
          K,
        ),
        (W.$$click = () => (qt() ? void Qi() : void En())),
        t(
          W,
          r(g, {
            get when() {
              return G(() => !!qt())() ? ue().cancel : ue().send || ue().attachments;
            },
            get fallback() {
              return r(Z, {
                get name() {
                  return qt() ? "stop" : "arrow";
                },
                get size() {
                  return qt() ? 19 : 23;
                },
              });
            },
            get children() {
              return su();
            },
          }),
        ),
        x(
          (q) => {
            var fe = `composer ${k.home ? "composer-home" : ""} ${Di() ? "dragging" : ""}`,
              ge = k.home ? $.prompt : $.followUp,
              oe = k.home ? "Describe a task…" : $.followUp,
              Ae = ue().send,
              X = xn() === "full",
              Se = kt() ? $.accessBusy : $.accessDetails[xn()],
              ze = !!qt(),
              lt = qt() ? $.stop : $.send,
              He = qt() ? $.stop : $.send,
              tt = qt()
                ? ue().cancel
                : !Ot() ||
                  ue()["load-chat"] ||
                  ue().send ||
                  ue().access ||
                  ue().attachments ||
                  (!Ne().text.trim() && !Ne().attachments.length) ||
                  p() ||
                  (!!M()?.required && M()?.status !== "current") ||
                  (!!E() && (!E().admission.allowed || E().globalPaused));
            return (
              fe !== q.e && Be(T, (q.e = fe)),
              ge !== q.t && z(Y, "aria-label", (q.t = ge)),
              oe !== q.a && z(Y, "placeholder", (q.a = oe)),
              Ae !== q.o && (Y.disabled = q.o = Ae),
              X !== q.i && Ce.classList.toggle("access-full", (q.i = X)),
              Se !== q.n && z(Ce, "title", (q.n = Se)),
              ze !== q.s && W.classList.toggle("is-stopping", (q.s = ze)),
              lt !== q.h && z(W, "title", (q.h = lt)),
              He !== q.r && z(W, "aria-label", (q.r = He)),
              tt !== q.d && (W.disabled = q.d = tt),
              q
            );
          },
          {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0,
            i: void 0,
            n: void 0,
            s: void 0,
            h: void 0,
            r: void 0,
            d: void 0,
          },
        ),
        x(() => (Y.value = Ne().text)),
        T
      );
    })();
  }
  return (() => {
    var k = Au();
    return (
      t(
        k,
        r(g, {
          get when() {
            return !Or();
          },
          get children() {
            var T = cu(),
              Y = T.firstChild,
              Q = Y.firstChild,
              he = Q.nextSibling;
            return (t(he, () => $.app), t(T, r(Wr, {}), null), T);
          },
        }),
        null,
      ),
      t(
        k,
        r(g, {
          get when() {
            return !re();
          },
          get fallback() {
            return r(js, {
              get update() {
                return M();
              },
              get pending() {
                return !!ue().update;
              },
              close: hr,
              retry: () => {
                je("update", async () => {
                  N(await window.jac.checkUpdate());
                });
              },
            });
          },
          get children() {
            return [
              r(g, {
                get when() {
                  return !i();
                },
                get fallback() {
                  return (() => {
                    var T = Eu(),
                      Y = T.firstChild,
                      Q = Y.nextSibling,
                      he = Q.nextSibling,
                      ye = he.nextSibling,
                      Ce = ye.firstChild;
                    return (
                      t(Q, () => $.connectionFailed),
                      t(he, i),
                      (Ce.$$click = () => (window.jac ? void ur() : void or())),
                      t(Ce, () => (ue().reconnect ? "Reconnecting…" : "Reconnect")),
                      t(
                        ye,
                        r(g, {
                          get when() {
                            return window.jac;
                          },
                          get children() {
                            var xe = yr();
                            return ((xe.$$click = hr), t(xe, () => $.close), xe);
                          },
                        }),
                        null,
                      ),
                      x(() => (Ce.disabled = ue().reconnect)),
                      T
                    );
                  })();
                },
                get children() {
                  return r(g, {
                    get when() {
                      return e();
                    },
                    get fallback() {
                      return (() => {
                        var T = Pu(),
                          Y = T.firstChild,
                          Q = Y.nextSibling,
                          he = Q.nextSibling;
                        return (t(he, () => $.connecting), T);
                      })();
                    },
                    get children() {
                      return r(g, {
                        get when() {
                          return !p() || ie();
                        },
                        get fallback() {
                          return r(ph, {
                            get mode() {
                              return U();
                            },
                            get issue() {
                              return I();
                            },
                            setMode: (T) => {
                              (ne(void 0), C(T));
                            },
                            browse: Hi,
                            get busy() {
                              return !!ue().auth;
                            },
                            submit: async (T) => {
                              await je("auth", async () => {
                                ne(void 0);
                                const Y =
                                  U() === "password"
                                    ? await window.jac.changePassword({ password: T.password })
                                    : U() === "register"
                                      ? await window.jac.register(T)
                                      : await window.jac.login(T);
                                if (Y.passwordChangeRequired) {
                                  C("password");
                                  return;
                                }
                                if (!Y.ok && Y.retryAfter) {
                                  ne({
                                    message: Y.message ?? $.authFailed,
                                    retryAt: Date.now() + Math.min(3600, Math.max(1, Y.retryAfter)) * 1e3,
                                  });
                                  return;
                                }
                                if (!Y.ok) throw new Error(Y.message ?? $.authFailed);
                                if (U() === "password" || (U() === "register" && !Y.signedIn)) {
                                  (C("login"), Fe({ text: Y.message ?? "Sign in to continue.", error: !1 }));
                                  return;
                                }
                                const Q = await window.jac.bootstrap();
                                (Br(Q),
                                  te(!1),
                                  Q.authRequired || (await Tn(), bt && (await An(bt), (bt = void 0))));
                              });
                            },
                          });
                        },
                        get children() {
                          return [
                            (() => {
                              var T = uu(),
                                Y = T.firstChild,
                                Q = Y.firstChild,
                                he = Q.firstChild,
                                ye = he.nextSibling,
                                Ce = Y.nextSibling,
                                xe = Ce.firstChild,
                                K = Ce.nextSibling,
                                W = K.firstChild,
                                q = W.firstChild,
                                fe = W.nextSibling,
                                ge = fe.firstChild,
                                oe = ge.nextSibling,
                                Ae = oe.firstChild,
                                X = fe.nextSibling;
                              X.firstChild;
                              var Se = K.nextSibling,
                                ze = Se.firstChild,
                                lt = ze.firstChild,
                                He = lt.nextSibling,
                                tt = He.firstChild,
                                nt = tt.nextSibling;
                              return (
                                (Q.$$click = () => jt()),
                                t(ye, () => $.app),
                                t(
                                  Y,
                                  r(Xe, {
                                    class: "sidebar-collapse",
                                    name: "panel",
                                    get label() {
                                      return Fr();
                                    },
                                    get disabled() {
                                      return ue().settings;
                                    },
                                    onClick: lr,
                                  }),
                                  null,
                                ),
                                (Ce.$$click = () => jt()),
                                t(Ce, r(Z, { name: "plus", size: 21 }), xe),
                                t(xe, () => $.newChat),
                                t(W, r(Z, { name: "search", size: 17 }), q),
                                (q.$$input = (we) => Ki(we.currentTarget.value)),
                                (fe.$$focusout = (we) => {
                                  we.relatedTarget instanceof Node &&
                                    !we.currentTarget.contains(we.relatedTarget) &&
                                    (we.currentTarget.open = !1);
                                }),
                                (fe.$$keydown = (we) => {
                                  we.key === "Escape" &&
                                    we.currentTarget.open &&
                                    (we.preventDefault(),
                                    we.stopPropagation(),
                                    (we.currentTarget.open = !1),
                                    we.currentTarget.querySelector("summary")?.focus());
                                }),
                                t(ge, r(Z, { name: "more", size: 17 })),
                                Ae.addEventListener("change", (we) => {
                                  (w(we.currentTarget.checked), je("recent", () => St()));
                                }),
                                t(oe, () => $.showArchived, null),
                                t(
                                  K,
                                  r(el, {
                                    get projects() {
                                      return c();
                                    },
                                    get recent() {
                                      return f();
                                    },
                                    get settings() {
                                      return A();
                                    },
                                    get search() {
                                      return y();
                                    },
                                    get archived() {
                                      return j();
                                    },
                                    get activeId() {
                                      return _()?.chat.id;
                                    },
                                    get directory() {
                                      return Ge();
                                    },
                                    save: Gt,
                                    pick: () => {
                                      Hr();
                                    },
                                    open: (we) => {
                                      Jt(we);
                                    },
                                    create: jt,
                                  }),
                                  X,
                                ),
                                t(
                                  X,
                                  r(_e, {
                                    get each() {
                                      return f().filter((we) => !we.parentId && !Ci(we, c()));
                                    },
                                    fallback: void 0,
                                    children: (we) =>
                                      r(Si, {
                                        chat: we,
                                        get active() {
                                          return _()?.chat.id === we.id;
                                        },
                                        open: () => {
                                          Jt(we);
                                        },
                                      }),
                                  }),
                                  null,
                                ),
                                t(
                                  X,
                                  r(g, {
                                    get when() {
                                      return h();
                                    },
                                    get children() {
                                      var we = du();
                                      return (
                                        (we.$$click = () => {
                                          je("recent", () => St(!0));
                                        }),
                                        t(
                                          we,
                                          (() => {
                                            var rt = G(() => !!ue().recent);
                                            return () => (rt() ? $.loading : $.loadMore);
                                          })(),
                                        ),
                                        x(() => (we.disabled = ue().recent)),
                                        we
                                      );
                                    },
                                  }),
                                  null,
                                ),
                                (ze.$$click = Ft),
                                t(lt, () => E()?.username.slice(0, 1).toUpperCase() ?? "J"),
                                t(tt, () => E()?.username ?? (p() ? $.signIn : $.account)),
                                t(nt, () => E()?.plan ?? ""),
                                t(
                                  Se,
                                  r(Xe, {
                                    name: "settings",
                                    get label() {
                                      return $.settings;
                                    },
                                    onClick: () => {
                                      (yt(!1), de("settings"));
                                    },
                                  }),
                                  null,
                                ),
                                x(
                                  (we) => {
                                    var rt = $.newChat,
                                      Qe = $.search,
                                      Tt = p() ? $.signIn : $.account;
                                    return (
                                      rt !== we.e && z(Ce, "title", (we.e = rt)),
                                      Qe !== we.t && z(q, "aria-label", (we.t = Qe)),
                                      Tt !== we.a && z(ze, "title", (we.a = Tt)),
                                      we
                                    );
                                  },
                                  { e: void 0, t: void 0, a: void 0 },
                                ),
                                x(() => (q.value = y())),
                                x(() => (Ae.checked = j())),
                                T
                              );
                            })(),
                            r(g, {
                              get when() {
                                return G(() => !!Gn())() && yn();
                              },
                              get children() {
                                var T = hu();
                                return ((T.$$click = () => yt(!1)), T);
                              },
                            }),
                            (() => {
                              var T = Cu(),
                                Y = T.firstChild,
                                Q = Y.firstChild,
                                he = Q.nextSibling,
                                ye = he.firstChild,
                                Ce = ye.firstChild,
                                xe = Y.nextSibling;
                              return (
                                t(
                                  Q,
                                  r(Xe, {
                                    class: "mobile-sidebar-toggle",
                                    name: "panel",
                                    get label() {
                                      return Fr();
                                    },
                                    onClick: lr,
                                  }),
                                  null,
                                ),
                                t(
                                  Q,
                                  r(g, {
                                    get when() {
                                      return !ae();
                                    },
                                    get fallback() {
                                      return (() => {
                                        var K = wr();
                                        return (
                                          t(
                                            K,
                                            (() => {
                                              var W = G(() => ae() === "settings");
                                              return () => (W() ? $.settings : $.account);
                                            })(),
                                          ),
                                          K
                                        );
                                      })();
                                    },
                                    get children() {
                                      return r(g, {
                                        get when() {
                                          return zr();
                                        },
                                        get fallback() {
                                          return (() => {
                                            var K = wr();
                                            return (t(K, () => _()?.chat.title ?? "Workspace"), K);
                                          })();
                                        },
                                        get children() {
                                          return [
                                            (() => {
                                              var K = gu();
                                              return (t(K, zr), x(() => z(K, "title", Ge())), K);
                                            })(),
                                            fu(),
                                            (() => {
                                              var K = wr();
                                              return (t(K, () => _()?.chat.title ?? $.newChat), K);
                                            })(),
                                          ];
                                        },
                                      });
                                    },
                                  }),
                                  null,
                                ),
                                (ye.$$click = () => ke("search")),
                                t(ye, r(Z, { name: "search", size: 16 }), Ce),
                                t(
                                  ye,
                                  r(g, {
                                    get when() {
                                      return Fi();
                                    },
                                    children: (K) =>
                                      (() => {
                                        var W = Ru();
                                        return (
                                          t(W, K),
                                          x(() => z(W, "aria-label", `${K()} queued requests`)),
                                          W
                                        );
                                      })(),
                                  }),
                                  null,
                                ),
                                t(he, r(ta, {}), null),
                                t(
                                  he,
                                  r(g, {
                                    get when() {
                                      return !ae();
                                    },
                                    get children() {
                                      return r(mh, {
                                        label: "Task tools",
                                        get children() {
                                          return [
                                            (() => {
                                              var K = vu(),
                                                W = K.firstChild;
                                              return (
                                                (K.$$click = () =>
                                                  $e((q) => ({
                                                    kind: "inbox",
                                                    revision: (q?.revision ?? 0) + 1,
                                                  }))),
                                                t(K, r(Z, { name: "history", size: 16 }), W),
                                                K
                                              );
                                            })(),
                                            r(g, {
                                              get when() {
                                                return _();
                                              },
                                              get children() {
                                                var K = mu(),
                                                  W = K.firstChild;
                                                return (
                                                  (K.$$click = () =>
                                                    $e((q) => ({
                                                      kind: "report",
                                                      revision: (q?.revision ?? 0) + 1,
                                                    }))),
                                                  t(K, r(Z, { name: "check", size: 16 }), W),
                                                  K
                                                );
                                              },
                                            }),
                                            r(g, {
                                              get when() {
                                                return Ge();
                                              },
                                              get children() {
                                                var K = $u(),
                                                  W = K.firstChild;
                                                return (
                                                  (K.$$click = () =>
                                                    $e((q) => ({
                                                      kind: "context",
                                                      revision: (q?.revision ?? 0) + 1,
                                                    }))),
                                                  t(K, r(Z, { name: "file", size: 16 }), W),
                                                  K
                                                );
                                              },
                                            }),
                                            r(g, {
                                              get when() {
                                                return le();
                                              },
                                              get children() {
                                                var K = pu(),
                                                  W = K.firstChild;
                                                return (
                                                  (K.$$click = () =>
                                                    $e((q) => ({
                                                      kind: "preview",
                                                      revision: (q?.revision ?? 0) + 1,
                                                    }))),
                                                  t(K, r(Z, { name: "eye", size: 16 }), W),
                                                  K
                                                );
                                              },
                                            }),
                                            r(g, {
                                              get when() {
                                                return _();
                                              },
                                              get children() {
                                                return [
                                                  bu(),
                                                  (() => {
                                                    var K = si();
                                                    return (
                                                      (K.$$click = () => {
                                                        (_n(_().chat), qr(_().chat.title));
                                                      }),
                                                      t(K, r(Z, { name: "edit", size: 16 }), null),
                                                      t(K, () => $.rename, null),
                                                      K
                                                    );
                                                  })(),
                                                  (() => {
                                                    var K = si();
                                                    return (
                                                      (K.$$click = () => ea(_().chat)),
                                                      t(K, r(Z, { name: "archive", size: 16 }), null),
                                                      t(
                                                        K,
                                                        (() => {
                                                          var W = G(() => !!_()?.chat.archivedAt);
                                                          return () => (W() ? $.unarchive : $.archive);
                                                        })(),
                                                        null,
                                                      ),
                                                      K
                                                    );
                                                  })(),
                                                ];
                                              },
                                            }),
                                          ];
                                        },
                                      });
                                    },
                                  }),
                                  null,
                                ),
                                t(
                                  he,
                                  r(g, {
                                    get when() {
                                      return G(() => !!_())() && !ae();
                                    },
                                    get children() {
                                      return r(Xe, {
                                        name: "folder",
                                        get label() {
                                          return $.openChatFolder;
                                        },
                                        get disabled() {
                                          return ue()["open-chat-folder"];
                                        },
                                        onClick: () => {
                                          je("open-chat-folder", () =>
                                            window.jac.openChatFolder({ directory: Ge() }),
                                          );
                                        },
                                      });
                                    },
                                  }),
                                  null,
                                ),
                                t(he, r(Wr, {}), null),
                                t(
                                  T,
                                  r(g, {
                                    get when() {
                                      return Jr();
                                    },
                                    get children() {
                                      var K = wu(),
                                        W = K.firstChild,
                                        q = W.firstChild,
                                        fe = q.nextSibling;
                                      fe.firstChild;
                                      var ge = W.nextSibling;
                                      return (
                                        ge.firstChild,
                                        t(K, r(Z, { name: "info", size: 19 }), W),
                                        t(
                                          fe,
                                          r(g, {
                                            get when() {
                                              return !E()?.globalPaused;
                                            },
                                            children: " Paid plans are still available.",
                                          }),
                                          null,
                                        ),
                                        (ge.$$click = () => {
                                          je("plans", () => window.jac.openPlans());
                                        }),
                                        t(ge, r(Z, { name: "external", size: 15 }), null),
                                        x(() => (ge.disabled = ue().plans)),
                                        K
                                      );
                                    },
                                  }),
                                  xe,
                                ),
                                t(
                                  xe,
                                  r(g, {
                                    get when() {
                                      return G(() => !!p())() && ie();
                                    },
                                    get children() {
                                      var K = _r(),
                                        W = K.firstChild,
                                        q = W.nextSibling;
                                      return (
                                        t(K, r(Z, { name: "folder", size: 17 }), W),
                                        t(W, () => $.localMode),
                                        (q.$$click = Ft),
                                        t(q, () => $.signIn),
                                        K
                                      );
                                    },
                                  }),
                                  null,
                                ),
                                t(
                                  xe,
                                  r(g, {
                                    get when() {
                                      return G(() => !!M()?.required)() && M()?.status !== "current";
                                    },
                                    get children() {
                                      var K = _r(),
                                        W = K.firstChild,
                                        q = W.nextSibling;
                                      return (
                                        t(K, r(Z, { name: "download", size: 17 }), W),
                                        t(W, () => $.updateRequired),
                                        (q.$$click = () => {
                                          (yt(!1), ce("updates"), de("settings"));
                                        }),
                                        t(q, () => $.updates),
                                        K
                                      );
                                    },
                                  }),
                                  null,
                                ),
                                t(
                                  xe,
                                  r(g, {
                                    get when() {
                                      return (
                                        G(() => !!(!Jr() && E()))() &&
                                        (!E().admission.allowed || E().globalPaused)
                                      );
                                    },
                                    get children() {
                                      return r(g, {
                                        get when() {
                                          return Tr(E());
                                        },
                                        get fallback() {
                                          return (() => {
                                            var K = _r(),
                                              W = K.firstChild,
                                              q = W.nextSibling;
                                            return (
                                              t(K, r(Z, { name: "info", size: 17 }), W),
                                              t(W, () => E().admission.message ?? $.paused),
                                              (q.$$click = () => de("account")),
                                              t(q, () => $.account),
                                              K
                                            );
                                          })();
                                        },
                                        get children() {
                                          return r(g, {
                                            get when() {
                                              return !ae();
                                            },
                                            get children() {
                                              return r(ti, {
                                                get account() {
                                                  return E();
                                                },
                                                compact: !0,
                                                onAccount: Ft,
                                              });
                                            },
                                          });
                                        },
                                      });
                                    },
                                  }),
                                  null,
                                ),
                                t(
                                  xe,
                                  r(g, {
                                    get when() {
                                      return !Ot();
                                    },
                                    get children() {
                                      var K = _u(),
                                        W = K.firstChild,
                                        q = W.firstChild,
                                        fe = q.nextSibling,
                                        ge = W.nextSibling;
                                      return (
                                        t(K, r(Z, { name: "info", size: 18 }), W),
                                        t(
                                          q,
                                          (() => {
                                            var oe = G(() => pe()?.state === "stopped");
                                            return () =>
                                              oe()
                                                ? "The local engine stopped"
                                                : pe()?.state === "reconnecting"
                                                  ? "Reconnecting live output"
                                                  : "Checking the engine connection";
                                          })(),
                                        ),
                                        t(fe, () =>
                                          pe()?.state === "stopped"
                                            ? "Your draft is saved. Reconnect to inspect saved progress before continuing."
                                            : "Saved progress stays available. Reconnecting observes existing work without sending a request.",
                                        ),
                                        (ge.$$click = () => {
                                          ur();
                                        }),
                                        t(ge, () => (ue().reconnect ? "Reconnecting…" : "Reconnect")),
                                        x(() => (ge.disabled = ue().reconnect)),
                                        K
                                      );
                                    },
                                  }),
                                  null,
                                ),
                                t(
                                  xe,
                                  r(Wo, {
                                    hideToolbar: !0,
                                    get openPanel() {
                                      return Te();
                                    },
                                    onPreviewAvailable: be,
                                    usage: Ft,
                                    signIn: Wi,
                                    update: () => {
                                      (ce("updates"), de("settings"));
                                    },
                                    reconnect: ur,
                                    get state() {
                                      return _();
                                    },
                                    get directory() {
                                      return Ge();
                                    },
                                    get issue() {
                                      return G(() => Dr()?.id === _()?.chat.id)() ? Dr()?.message : void 0;
                                    },
                                    open: Jt,
                                    prompt: (K) => En(!1, K),
                                    draft: jn,
                                    confirm: It,
                                    refresh: Ct,
                                    get canSend() {
                                      return (
                                        G(
                                          () =>
                                            !!(
                                              Ot() &&
                                              !ue()["load-chat"] &&
                                              !kt() &&
                                              !ue().send &&
                                              !ue().access &&
                                              !p() &&
                                              !_()?.permissions.length &&
                                              !_()?.questions.length &&
                                              (!E() || (E().admission.allowed && !E().globalPaused))
                                            ),
                                        )() &&
                                        (!M()?.required || M()?.status === "current")
                                      );
                                    },
                                  }),
                                  null,
                                ),
                                t(
                                  xe,
                                  r(g, {
                                    get when() {
                                      return _();
                                    },
                                    get fallback() {
                                      return (() => {
                                        var K = Iu(),
                                          W = K.firstChild,
                                          q = W.firstChild,
                                          fe = q.nextSibling;
                                        return (
                                          t(W, r(Yr, { home: !0 }), fe),
                                          t(
                                            fe,
                                            r(g, {
                                              get when() {
                                                return L();
                                              },
                                              children: (ge) =>
                                                (() => {
                                                  var oe = qu(),
                                                    Ae = oe.firstChild;
                                                  return (
                                                    t(oe, r(Z, { name: "folder", size: 17 }), Ae),
                                                    t(
                                                      oe,
                                                      r(un, {
                                                        get label() {
                                                          return $.pickProject;
                                                        },
                                                        get value() {
                                                          return ge().directory;
                                                        },
                                                        get options() {
                                                          return (
                                                            c().some((X) => X.directory === ge().directory)
                                                              ? c()
                                                              : [...c(), ge()]
                                                          ).map((X) => ({
                                                            value: X.directory,
                                                            label: X.name,
                                                            detail: X.directory,
                                                          }));
                                                        },
                                                        onChange: (X) =>
                                                          jt(c().find((Se) => Se.directory === X) ?? ge()),
                                                      }),
                                                      Ae,
                                                    ),
                                                    (Ae.$$click = Hr),
                                                    t(Ae, r(Z, { name: "plus", size: 17 })),
                                                    x(() => z(Ae, "title", $.openProject)),
                                                    oe
                                                  );
                                                })(),
                                            }),
                                          ),
                                          K
                                        );
                                      })();
                                    },
                                    get children() {
                                      var K = xu(),
                                        W = K.firstChild,
                                        q = W.firstChild,
                                        fe = q.nextSibling;
                                      q.addEventListener("scroll", (oe) => {
                                        tr =
                                          oe.currentTarget.scrollHeight -
                                            oe.currentTarget.scrollTop -
                                            oe.currentTarget.clientHeight <
                                          90;
                                      });
                                      var ge = sn;
                                      return (
                                        typeof ge == "function" ? Rt(ge, q) : (sn = q),
                                        t(
                                          q,
                                          r(g, {
                                            get when() {
                                              return ue()["load-chat"];
                                            },
                                            get children() {
                                              var oe = li();
                                              return (oe.firstChild, t(oe, () => $.loading, null), oe);
                                            },
                                          }),
                                          null,
                                        ),
                                        t(
                                          q,
                                          r(g, {
                                            get when() {
                                              return _();
                                            },
                                            children: (oe) =>
                                              r(bs, {
                                                get state() {
                                                  return oe();
                                                },
                                                get thinking() {
                                                  return v();
                                                },
                                                get stopped() {
                                                  return zi()[oe().chat.id];
                                                },
                                                expanded: (Ae) => Oi()[Ae] ?? !1,
                                                setExpanded: (Ae, X) => Ui((Se) => ({ ...Se, [Ae]: X })),
                                                openChild: (Ae) => {
                                                  const X = oe().children.find((Se) => Se.id === Ae);
                                                  X && Jt(X);
                                                },
                                              }),
                                          }),
                                          null,
                                        ),
                                        t(
                                          q,
                                          r(_e, {
                                            get each() {
                                              return _()?.permissions;
                                            },
                                            children: (oe) =>
                                              (() => {
                                                var Ae = Lu(),
                                                  X = Ae.firstChild,
                                                  Se = X.firstChild,
                                                  ze = X.nextSibling,
                                                  lt = ze.nextSibling,
                                                  He = lt.firstChild,
                                                  tt = He.nextSibling,
                                                  nt = tt.nextSibling;
                                                return (
                                                  t(X, r(Z, { name: "shield" }), Se),
                                                  t(Se, () => $.permissionTitle),
                                                  t(ze, () => oe.description ?? oe.permission),
                                                  t(
                                                    Ae,
                                                    r(_e, {
                                                      get each() {
                                                        return oe.patterns;
                                                      },
                                                      children: (we) =>
                                                        (() => {
                                                          var rt = Mu();
                                                          return (t(rt, we), rt);
                                                        })(),
                                                    }),
                                                    lt,
                                                  ),
                                                  (He.$$click = () => {
                                                    je(oe.id, async () => {
                                                      (await window.jac.permission({
                                                        id: oe.id,
                                                        directory: Ge(),
                                                        reply: "reject",
                                                      }),
                                                        await Ct());
                                                    });
                                                  }),
                                                  t(He, () => $.deny),
                                                  (tt.$$click = () => {
                                                    je(oe.id, async () => {
                                                      (await window.jac.permission({
                                                        id: oe.id,
                                                        directory: Ge(),
                                                        reply: "always",
                                                      }),
                                                        await Ct());
                                                    });
                                                  }),
                                                  t(tt, () => $.allowAlways),
                                                  (nt.$$click = () => {
                                                    je(oe.id, async () => {
                                                      (await window.jac.permission({
                                                        id: oe.id,
                                                        directory: Ge(),
                                                        reply: "once",
                                                      }),
                                                        await Ct());
                                                    });
                                                  }),
                                                  t(nt, () => $.allowOnce),
                                                  x(
                                                    (we) => {
                                                      var rt = ue()[oe.id],
                                                        Qe = ue()[oe.id],
                                                        Tt = ue()[oe.id];
                                                      return (
                                                        rt !== we.e && (He.disabled = we.e = rt),
                                                        Qe !== we.t && (tt.disabled = we.t = Qe),
                                                        Tt !== we.a && (nt.disabled = we.a = Tt),
                                                        we
                                                      );
                                                    },
                                                    { e: void 0, t: void 0, a: void 0 },
                                                  ),
                                                  Ae
                                                );
                                              })(),
                                          }),
                                          null,
                                        ),
                                        t(
                                          q,
                                          r(_e, {
                                            get each() {
                                              return _()?.questions;
                                            },
                                            children: (oe) =>
                                              r(Va, {
                                                request: oe,
                                                get busy() {
                                                  return !!ue()[oe.id];
                                                },
                                                submit: (Ae, X) => {
                                                  je(oe.id, async () => {
                                                    (await window.jac.answer({
                                                      id: oe.id,
                                                      directory: Ge(),
                                                      answers: Ae,
                                                      reject: X,
                                                    }),
                                                      await Ct());
                                                  });
                                                },
                                              }),
                                          }),
                                          null,
                                        ),
                                        t(
                                          q,
                                          r(g, {
                                            get when() {
                                              return _()?.children.length;
                                            },
                                            get children() {
                                              var oe = yu(),
                                                Ae = oe.firstChild;
                                              return (
                                                t(Ae, () => $.children),
                                                t(
                                                  oe,
                                                  r(_e, {
                                                    get each() {
                                                      return _()?.children;
                                                    },
                                                    children: (X) =>
                                                      (() => {
                                                        var Se = Du();
                                                        return (
                                                          (Se.$$click = () => {
                                                            Jt(X);
                                                          }),
                                                          t(Se, r(Z, { name: "chat", size: 15 }), null),
                                                          t(Se, () => X.title, null),
                                                          t(Se, r(Z, { name: "chevron", size: 14 }), null),
                                                          Se
                                                        );
                                                      })(),
                                                  }),
                                                  null,
                                                ),
                                                oe
                                              );
                                            },
                                          }),
                                          null,
                                        ),
                                        t(
                                          fe,
                                          r(g, {
                                            get when() {
                                              return ni(_(), E());
                                            },
                                            get children() {
                                              var oe = ku(),
                                                Ae = oe.firstChild,
                                                X = Ae.nextSibling,
                                                Se = X.firstChild;
                                              return (
                                                (X.$$click = () => {
                                                  En(!0);
                                                }),
                                                t(X, r(Z, { name: "arrow", size: 16 }), Se),
                                                x(
                                                  () =>
                                                    (X.disabled =
                                                      !Ot() ||
                                                      ue().send ||
                                                      ue().access ||
                                                      (!!M()?.required && M()?.status !== "current")),
                                                ),
                                                oe
                                              );
                                            },
                                          }),
                                          null,
                                        ),
                                        t(fe, r(Yr, {}), null),
                                        K
                                      );
                                    },
                                  }),
                                  null,
                                ),
                                t(
                                  T,
                                  r(g, {
                                    get when() {
                                      return ae();
                                    },
                                    children: (K) =>
                                      r($h, {
                                        get title() {
                                          return G(() => K() === "settings")() ? $.settings : $.account;
                                        },
                                        back: () => de(void 0),
                                        get children() {
                                          return [
                                            r(g, {
                                              get when() {
                                                return !dt();
                                              },
                                              get children() {
                                                return r(Ar, {
                                                  get value() {
                                                    return $t();
                                                  },
                                                  dismiss: () => Fe(void 0),
                                                  inline: !0,
                                                });
                                              },
                                            }),
                                            r(g, {
                                              get when() {
                                                return K() === "settings";
                                              },
                                              get fallback() {
                                                return r(g, {
                                                  get when() {
                                                    return E();
                                                  },
                                                  get fallback() {
                                                    return r(g, {
                                                      get when() {
                                                        return !ue().account;
                                                      },
                                                      get fallback() {
                                                        return (() => {
                                                          var W = li();
                                                          return (
                                                            W.firstChild,
                                                            t(W, () => $.loading, null),
                                                            W
                                                          );
                                                        })();
                                                      },
                                                      get children() {
                                                        var W = Hu(),
                                                          q = W.firstChild,
                                                          fe = q.nextSibling;
                                                        return (
                                                          t(W, r(Z, { name: "info" }), q),
                                                          t(q, () => $.accountUnavailable),
                                                          (fe.$$click = Ft),
                                                          t(fe, () => $.retry),
                                                          W
                                                        );
                                                      },
                                                    });
                                                  },
                                                  children: (W) =>
                                                    (() => {
                                                      var q = Ku(),
                                                        fe = q.firstChild,
                                                        ge = fe.firstChild,
                                                        oe = ge.nextSibling,
                                                        Ae = oe.firstChild,
                                                        X = Ae.nextSibling,
                                                        Se = oe.nextSibling,
                                                        ze = fe.nextSibling,
                                                        lt = ze.nextSibling,
                                                        He = lt.firstChild,
                                                        tt = He.nextSibling,
                                                        nt = tt.nextSibling,
                                                        we = nt.nextSibling,
                                                        rt = we.nextSibling,
                                                        Qe = rt.nextSibling,
                                                        Tt = Qe.firstChild,
                                                        dn = Qe.nextSibling,
                                                        gr = dn.nextSibling,
                                                        Dt = lt.nextSibling,
                                                        vt = Dt.firstChild,
                                                        Ee = Dt.nextSibling,
                                                        wt = Ee.nextSibling,
                                                        ot = wt.nextSibling,
                                                        mt = ot.firstChild,
                                                        We = ot.nextSibling,
                                                        it = We.nextSibling;
                                                      return (
                                                        t(ge, () => W().username.slice(0, 1).toUpperCase()),
                                                        t(Ae, () => W().username),
                                                        t(X, () => W().email),
                                                        t(Se, () => W().plan),
                                                        t(
                                                          ze,
                                                          r(di, {
                                                            get label() {
                                                              return $.weekly;
                                                            },
                                                            get usage() {
                                                              return W().weekly;
                                                            },
                                                            get now() {
                                                              return Wt();
                                                            },
                                                          }),
                                                          null,
                                                        ),
                                                        t(
                                                          ze,
                                                          r(g, {
                                                            get when() {
                                                              return W().fiveHour;
                                                            },
                                                            children: (qe) =>
                                                              r(di, {
                                                                get label() {
                                                                  return $.fiveHour;
                                                                },
                                                                get usage() {
                                                                  return qe();
                                                                },
                                                                get now() {
                                                                  return Wt();
                                                                },
                                                              }),
                                                          }),
                                                          null,
                                                        ),
                                                        t(
                                                          q,
                                                          r(ti, {
                                                            get account() {
                                                              return W();
                                                            },
                                                            onReset: Ur,
                                                          }),
                                                          lt,
                                                        ),
                                                        t(He, () => $.plan),
                                                        t(tt, () => W().plan),
                                                        t(nt, () => $.expires),
                                                        t(
                                                          we,
                                                          (() => {
                                                            var qe = G(() => !!W().planExpiresAt);
                                                            return () =>
                                                              qe()
                                                                ? G(() => W().planExpiresAt <= Wt())()
                                                                  ? "Expired"
                                                                  : `In ${Bn(W().planExpiresAt, Wt())}`
                                                                : $.noExpiry;
                                                          })(),
                                                        ),
                                                        t(rt, () => $.activeTasks),
                                                        t(Qe, () => W().active, Tt),
                                                        t(Qe, () => W().concurrentLimit, null),
                                                        t(dn, () => $.banked),
                                                        t(gr, () => W().bankedResets),
                                                        t(
                                                          q,
                                                          r(g, {
                                                            get when() {
                                                              return W().resetCredits?.nextExpiresAt != null;
                                                            },
                                                            get children() {
                                                              var qe = Wu();
                                                              return (
                                                                qe.firstChild,
                                                                t(
                                                                  qe,
                                                                  (() => {
                                                                    var at = G(
                                                                      () =>
                                                                        W().resetCredits.nextExpiresAt <=
                                                                        Wt(),
                                                                    );
                                                                    return () =>
                                                                      at()
                                                                        ? "Expired"
                                                                        : `In ${Bn(W().resetCredits.nextExpiresAt, Wt())}`;
                                                                  })(),
                                                                  null,
                                                                ),
                                                                qe
                                                              );
                                                            },
                                                          }),
                                                          Dt,
                                                        ),
                                                        t(
                                                          q,
                                                          r(g, {
                                                            get when() {
                                                              return (
                                                                !W().admission.allowed || W().globalPaused
                                                              );
                                                            },
                                                            get children() {
                                                              var qe = Yu();
                                                              return (
                                                                t(
                                                                  qe,
                                                                  () => W().admission.message || $.paused,
                                                                ),
                                                                qe
                                                              );
                                                            },
                                                          }),
                                                          Dt,
                                                        ),
                                                        t(
                                                          q,
                                                          r(g, {
                                                            get when() {
                                                              return W().sharedFree;
                                                            },
                                                            get children() {
                                                              return Vu();
                                                            },
                                                          }),
                                                          Dt,
                                                        ),
                                                        t(
                                                          Dt,
                                                          r(g, {
                                                            get when() {
                                                              return !Tr(W());
                                                            },
                                                            get children() {
                                                              var qe = yr();
                                                              return (
                                                                (qe.$$click = Ur),
                                                                t(qe, () => $.redeem),
                                                                x(
                                                                  () =>
                                                                    (qe.disabled =
                                                                      ue().reset || W().bankedResets < 1),
                                                                ),
                                                                qe
                                                              );
                                                            },
                                                          }),
                                                          vt,
                                                        ),
                                                        (vt.$$click = () => {
                                                          je("account", Kt);
                                                        }),
                                                        t(vt, r(Z, { name: "refresh", size: 16 }), null),
                                                        t(vt, () => $.refresh, null),
                                                        t(
                                                          q,
                                                          r(Us, {
                                                            onClaimed: async () => {
                                                              (xt++, (ft = void 0), (Vt = !1), await Kt());
                                                            },
                                                          }),
                                                          wt,
                                                        ),
                                                        (ot.$$click = () => {
                                                          je("plans", () => window.jac.openPlans());
                                                        }),
                                                        t(ot, r(Z, { name: "external", size: 18 }), mt),
                                                        t(ot, r(Z, { name: "chevron", size: 16 }), null),
                                                        (We.$$click = () => {
                                                          je("announcements", () => Tn(!0));
                                                        }),
                                                        t(We, r(Z, { name: "bell", size: 18 }), null),
                                                        t(We, () => $.announcements, null),
                                                        t(We, r(Z, { name: "chevron", size: 16 }), null),
                                                        (it.$$click = () =>
                                                          It({
                                                            title: $.signOutTitle,
                                                            detail: $.signOutDetail,
                                                            label: $.signOut,
                                                            action: async () => {
                                                              (await Ut(),
                                                                await window.jac.logout(),
                                                                xt++,
                                                                (ft = void 0),
                                                                (Vt = !1),
                                                                de(void 0),
                                                                cn(void 0),
                                                                Ve++,
                                                                (Lt = void 0),
                                                                R(void 0),
                                                                C("login"),
                                                                ee(!0),
                                                                te(!1));
                                                            },
                                                          })),
                                                        t(it, r(Z, { name: "logout", size: 18 }), null),
                                                        t(it, () => $.signOut, null),
                                                        t(it, r(Z, { name: "chevron", size: 16 }), null),
                                                        x(
                                                          (qe) => {
                                                            var at = ue().account,
                                                              ut = ue().announcements;
                                                            return (
                                                              at !== qe.e && (vt.disabled = qe.e = at),
                                                              ut !== qe.t && (We.disabled = qe.t = ut),
                                                              qe
                                                            );
                                                          },
                                                          { e: void 0, t: void 0 },
                                                        ),
                                                        q
                                                      );
                                                    })(),
                                                });
                                              },
                                              get children() {
                                                var W = Bu(),
                                                  q = W.firstChild,
                                                  fe = q.firstChild,
                                                  ge = fe.firstChild,
                                                  oe = fe.nextSibling,
                                                  Ae = oe.firstChild,
                                                  X = oe.nextSibling,
                                                  Se = X.firstChild,
                                                  ze = X.nextSibling,
                                                  lt = ze.firstChild,
                                                  He = ze.nextSibling,
                                                  tt = He.firstChild,
                                                  nt = He.nextSibling,
                                                  we = nt.firstChild,
                                                  rt = nt.nextSibling,
                                                  Qe = rt.nextSibling,
                                                  Tt = Qe.firstChild,
                                                  dn = Qe.nextSibling,
                                                  gr = dn.firstChild,
                                                  Dt = gr.nextSibling;
                                                Dt.nextSibling;
                                                var vt = q.nextSibling;
                                                return (
                                                  (fe.$$click = () => ce("appearance")),
                                                  t(fe, r(Z, { name: "sun", size: 18 }), ge),
                                                  (oe.$$click = () => ce("general")),
                                                  t(oe, r(Z, { name: "settings", size: 18 }), Ae),
                                                  (X.$$click = () => ce("mcp")),
                                                  t(X, r(Z, { name: "changes", size: 18 }), Se),
                                                  (ze.$$click = () => ce("updates")),
                                                  t(ze, r(Z, { name: "download", size: 18 }), lt),
                                                  (He.$$click = () => ce("data")),
                                                  t(He, r(Z, { name: "history", size: 18 }), tt),
                                                  (nt.$$click = () => ce("support")),
                                                  t(nt, r(Z, { name: "info", size: 18 }), we),
                                                  (Qe.$$click = Ft),
                                                  t(Qe, r(Z, { name: "shield", size: 18 }), Tt),
                                                  t(Qe, r(Z, { name: "chevron", size: 14 }), null),
                                                  t(dn, l, null),
                                                  t(
                                                    vt,
                                                    r(g, {
                                                      get when() {
                                                        return se() === "appearance";
                                                      },
                                                      get children() {
                                                        var Ee = Nu(),
                                                          wt = Ee.firstChild,
                                                          ot = wt.nextSibling,
                                                          mt = ot.nextSibling,
                                                          We = mt.firstChild;
                                                        We.firstChild;
                                                        var it = We.nextSibling,
                                                          qe = it.firstChild,
                                                          at = qe.nextSibling,
                                                          ut = at.firstChild,
                                                          At = ut.nextSibling,
                                                          ct = At.firstChild,
                                                          Et = ct.nextSibling,
                                                          ht = mt.nextSibling,
                                                          Bt = ht.firstChild;
                                                        return (
                                                          t(
                                                            We,
                                                            r(un, {
                                                              get label() {
                                                                return $.theme;
                                                              },
                                                              get value() {
                                                                return G(() => A().theme in $.themes)()
                                                                  ? A().theme
                                                                  : "ember";
                                                              },
                                                              get disabled() {
                                                                return ue().settings;
                                                              },
                                                              get options() {
                                                                return Object.entries($.themes).map(
                                                                  ([Le, fr]) => ({ value: Le, label: fr }),
                                                                );
                                                              },
                                                              onChange: (Le) => Gt({ theme: Le }),
                                                            }),
                                                            null,
                                                          ),
                                                          t(Et, r(Z, { name: "arrow", size: 15 })),
                                                          t(ht, r(Z, { name: "sun", size: 15 }), Bt),
                                                          Ee
                                                        );
                                                      },
                                                    }),
                                                    null,
                                                  ),
                                                  t(
                                                    vt,
                                                    r(g, {
                                                      get when() {
                                                        return se() === "general";
                                                      },
                                                      get children() {
                                                        var Ee = zu(),
                                                          wt = Ee.firstChild,
                                                          ot = wt.nextSibling,
                                                          mt = ot.nextSibling,
                                                          We = mt.firstChild,
                                                          it = We.firstChild,
                                                          qe = it.firstChild,
                                                          at = qe.nextSibling,
                                                          ut = it.nextSibling,
                                                          At = mt.nextSibling,
                                                          ct = At.firstChild,
                                                          Et = ct.firstChild,
                                                          ht = Et.firstChild,
                                                          Bt = ht.nextSibling;
                                                        return (
                                                          t(qe, () => $.startup),
                                                          t(at, () => $.startupDetail),
                                                          ut.addEventListener("change", (Le) =>
                                                            Gt({ launchAtLogin: Le.currentTarget.checked }),
                                                          ),
                                                          (ct.$$click = () => {
                                                            (de(void 0), Vn(""), zt(0));
                                                          }),
                                                          t(ct, r(Z, { name: "chat", size: 20 }), Et),
                                                          t(ht, () => $.replayTutorial),
                                                          t(Bt, () => $.tutorialDetail),
                                                          t(ct, r(Z, { name: "chevron", size: 17 }), null),
                                                          x(() => (ut.disabled = ue().settings)),
                                                          x(() => (ut.checked = A().launchAtLogin)),
                                                          Ee
                                                        );
                                                      },
                                                    }),
                                                    null,
                                                  ),
                                                  t(
                                                    vt,
                                                    r(g, {
                                                      get when() {
                                                        return se() === "mcp";
                                                      },
                                                      get children() {
                                                        return r(pc, {
                                                          get directory() {
                                                            return Ge();
                                                          },
                                                          append: (Ee) => {
                                                            (jn(Ee), de(void 0));
                                                          },
                                                        });
                                                      },
                                                    }),
                                                    null,
                                                  ),
                                                  t(
                                                    vt,
                                                    r(g, {
                                                      get when() {
                                                        return se() === "data";
                                                      },
                                                      get children() {
                                                        return r(Gc, {});
                                                      },
                                                    }),
                                                    null,
                                                  ),
                                                  t(
                                                    vt,
                                                    r(g, {
                                                      get when() {
                                                        return se() === "support";
                                                      },
                                                      get children() {
                                                        return r(td, {});
                                                      },
                                                    }),
                                                    null,
                                                  ),
                                                  t(
                                                    vt,
                                                    r(g, {
                                                      get when() {
                                                        return se() === "updates";
                                                      },
                                                      get children() {
                                                        var Ee = Ju(),
                                                          wt = Ee.firstChild,
                                                          ot = wt.nextSibling,
                                                          mt = ot.nextSibling,
                                                          We = mt.firstChild,
                                                          it = We.firstChild,
                                                          qe = it.firstChild,
                                                          at = qe.nextSibling,
                                                          ut = at.firstChild,
                                                          At = We.nextSibling,
                                                          ct = At.firstChild,
                                                          Et = ct.firstChild,
                                                          ht = ct.nextSibling,
                                                          Bt = ht.firstChild;
                                                        return (
                                                          t(We, r(Z, { name: "download", size: 19 }), it),
                                                          t(qe, () => $.updates),
                                                          t(at, () => $.version, ut),
                                                          t(at, () => M()?.current ?? l(), null),
                                                          t(
                                                            Et,
                                                            (() => {
                                                              var Le = G(() => M()?.status === "available");
                                                              return () =>
                                                                Le()
                                                                  ? $.updateAvailable
                                                                  : G(() => M()?.status === "ready")()
                                                                    ? $.updateReady
                                                                    : G(() => M()?.status === "checking")()
                                                                      ? $.checkingUpdate
                                                                      : G(
                                                                            () =>
                                                                              M()?.status === "downloading",
                                                                          )()
                                                                        ? $.downloadingUpdate
                                                                        : G(() => M()?.status === "error")()
                                                                          ? $.updateError
                                                                          : $.currentVersion;
                                                            })(),
                                                          ),
                                                          t(
                                                            ct,
                                                            r(g, {
                                                              get when() {
                                                                return (
                                                                  G(() => !!M()?.latest)() &&
                                                                  M()?.latest !== M()?.current
                                                                );
                                                              },
                                                              get children() {
                                                                var Le = Ou(),
                                                                  fr = Le.firstChild;
                                                                return (
                                                                  t(Le, () => $.version, fr),
                                                                  t(Le, () => M()?.latest, null),
                                                                  Le
                                                                );
                                                              },
                                                            }),
                                                            null,
                                                          ),
                                                          t(
                                                            ct,
                                                            r(g, {
                                                              get when() {
                                                                return M()?.message;
                                                              },
                                                              get children() {
                                                                var Le = Uu();
                                                                return (t(Le, () => M()?.message), Le);
                                                              },
                                                            }),
                                                            null,
                                                          ),
                                                          t(
                                                            At,
                                                            r(g, {
                                                              get when() {
                                                                return M()?.status === "downloading";
                                                              },
                                                              get children() {
                                                                var Le = Fu();
                                                                return (
                                                                  x(() =>
                                                                    z(Le, "aria-label", $.downloadingUpdate),
                                                                  ),
                                                                  x(() => (Le.value = M()?.progress)),
                                                                  Le
                                                                );
                                                              },
                                                            }),
                                                            ht,
                                                          ),
                                                          (Bt.$$click = () => {
                                                            je("update", async () =>
                                                              N(await window.jac.checkUpdate()),
                                                            );
                                                          }),
                                                          t(
                                                            Bt,
                                                            (() => {
                                                              var Le = G(() => !!ue().update);
                                                              return () =>
                                                                Le() ? $.loading : $.checkUpdates;
                                                            })(),
                                                          ),
                                                          t(
                                                            ht,
                                                            r(g, {
                                                              get when() {
                                                                return M()?.status === "available";
                                                              },
                                                              get children() {
                                                                var Le = oi();
                                                                return (
                                                                  (Le.$$click = () => {
                                                                    je("install", async () => {
                                                                      (await Ut(),
                                                                        N(await window.jac.installUpdate()));
                                                                    });
                                                                  }),
                                                                  t(Le, () => $.downloadUpdate),
                                                                  x(() => (Le.disabled = ue().install)),
                                                                  Le
                                                                );
                                                              },
                                                            }),
                                                            null,
                                                          ),
                                                          t(
                                                            ht,
                                                            r(g, {
                                                              get when() {
                                                                return M()?.status === "ready";
                                                              },
                                                              get children() {
                                                                var Le = oi();
                                                                return (
                                                                  (Le.$$click = () =>
                                                                    It({
                                                                      title: $.updateRestartTitle,
                                                                      detail: $.updateRestartDetail,
                                                                      label: $.installUpdate,
                                                                      action: async () => {
                                                                        (await Ut(),
                                                                          N(
                                                                            await window.jac.installUpdate(),
                                                                          ));
                                                                      },
                                                                    })),
                                                                  t(Le, () => $.installUpdate),
                                                                  x(
                                                                    () =>
                                                                      (Le.disabled =
                                                                        kt() || (E()?.active ?? 0) > 0),
                                                                  ),
                                                                  Le
                                                                );
                                                              },
                                                            }),
                                                            null,
                                                          ),
                                                          x(
                                                            () =>
                                                              (Bt.disabled =
                                                                ue().update ||
                                                                M()?.status === "checking" ||
                                                                M()?.status === "downloading"),
                                                          ),
                                                          Ee
                                                        );
                                                      },
                                                    }),
                                                    null,
                                                  ),
                                                  x(
                                                    (Ee) => {
                                                      var wt = se() === "appearance" ? "page" : void 0,
                                                        ot = se() === "appearance",
                                                        mt = se() === "general" ? "page" : void 0,
                                                        We = se() === "general",
                                                        it = se() === "mcp" ? "page" : void 0,
                                                        qe = se() === "mcp",
                                                        at = se() === "updates" ? "page" : void 0,
                                                        ut = se() === "updates",
                                                        At = se() === "data" ? "page" : void 0,
                                                        ct = se() === "data",
                                                        Et = se() === "support" ? "page" : void 0,
                                                        ht = se() === "support";
                                                      return (
                                                        wt !== Ee.e && z(fe, "aria-current", (Ee.e = wt)),
                                                        ot !== Ee.t &&
                                                          fe.classList.toggle("active", (Ee.t = ot)),
                                                        mt !== Ee.a && z(oe, "aria-current", (Ee.a = mt)),
                                                        We !== Ee.o &&
                                                          oe.classList.toggle("active", (Ee.o = We)),
                                                        it !== Ee.i && z(X, "aria-current", (Ee.i = it)),
                                                        qe !== Ee.n &&
                                                          X.classList.toggle("active", (Ee.n = qe)),
                                                        at !== Ee.s && z(ze, "aria-current", (Ee.s = at)),
                                                        ut !== Ee.h &&
                                                          ze.classList.toggle("active", (Ee.h = ut)),
                                                        At !== Ee.r && z(He, "aria-current", (Ee.r = At)),
                                                        ct !== Ee.d &&
                                                          He.classList.toggle("active", (Ee.d = ct)),
                                                        Et !== Ee.l && z(nt, "aria-current", (Ee.l = Et)),
                                                        ht !== Ee.u &&
                                                          nt.classList.toggle("active", (Ee.u = ht)),
                                                        Ee
                                                      );
                                                    },
                                                    {
                                                      e: void 0,
                                                      t: void 0,
                                                      a: void 0,
                                                      o: void 0,
                                                      i: void 0,
                                                      n: void 0,
                                                      s: void 0,
                                                      h: void 0,
                                                      r: void 0,
                                                      d: void 0,
                                                      l: void 0,
                                                      u: void 0,
                                                    },
                                                  ),
                                                  W
                                                );
                                              },
                                            }),
                                          ];
                                        },
                                      }),
                                  }),
                                  null,
                                ),
                                x(
                                  (K) => {
                                    var W = !!ae(),
                                      q = !!_(),
                                      fe = !!ae(),
                                      ge = !!ae();
                                    return (
                                      W !== K.e && T.classList.toggle("preferences-open", (K.e = W)),
                                      q !== K.t && xe.classList.toggle("has-chat", (K.t = q)),
                                      fe !== K.a && (xe.hidden = K.a = fe),
                                      ge !== K.o && (xe.inert = K.o = ge),
                                      K
                                    );
                                  },
                                  { e: void 0, t: void 0, a: void 0, o: void 0 },
                                ),
                                T
                              );
                            })(),
                          ];
                        },
                      });
                    },
                  });
                },
              }),
              r(g, {
                get when() {
                  return G(() => !dt())() && !ae();
                },
                get children() {
                  return r(Ar, {
                    get value() {
                      return $t();
                    },
                    dismiss: () => Fe(void 0),
                  });
                },
              }),
              r(g, {
                get when() {
                  return ve();
                },
                children: (T) =>
                  r(en, {
                    get notice() {
                      return $t();
                    },
                    dismissNotice: () => Fe(void 0),
                    title: "Workspace tools",
                    close: () => ke(void 0),
                    wide: !0,
                    get children() {
                      return r(Gd, {
                        get tab() {
                          return T();
                        },
                        setTab: ke,
                        get directory() {
                          return Ge();
                        },
                        get sessionId() {
                          return _()?.chat.id;
                        },
                        draft: (Y) => {
                          (jn(Y), ke(void 0));
                        },
                        open: (Y, Q) => {
                          (ke(void 0), Jt({ id: Y, directory: Q }));
                        },
                        changed: () => {
                          Qt();
                        },
                      });
                    },
                  }),
              }),
              r(g, {
                get when() {
                  return G(() => !p() && !re() && gt() === void 0)() ? pn()[0] : void 0;
                },
                children: (T) =>
                  r(en, {
                    get title() {
                      return $.announcement;
                    },
                    close: () => {},
                    required: !0,
                    get shownKey() {
                      return T().id;
                    },
                    onShown: () => Yi(T().id),
                    get children() {
                      var Y = Gu(),
                        Q = Y.firstChild,
                        he = Q.firstChild,
                        ye = he.nextSibling,
                        Ce = ye.firstChild,
                        xe = Ce.nextSibling,
                        K = Q.nextSibling,
                        W = K.nextSibling,
                        q = W.firstChild,
                        fe = q.nextSibling;
                      return (
                        t(he, r(Z, { name: "bell", size: 23 })),
                        t(xe, () => ki(T().createdAt)),
                        t(K, () => T().text),
                        t(
                          Y,
                          r(g, {
                            get when() {
                              return Pr();
                            },
                            get children() {
                              var ge = Zu();
                              return (t(ge, r(Z, { name: "info", size: 16 }), null), t(ge, Pr, null), ge);
                            },
                          }),
                          W,
                        ),
                        t(
                          q,
                          (() => {
                            var ge = G(() => pn().length > 1);
                            return () =>
                              ge()
                                ? `${pn().length - 1} more update${pn().length > 2 ? "s" : ""} waiting`
                                : "Once acknowledged, this update won’t appear again.";
                          })(),
                        ),
                        (fe.$$click = () => {
                          Vi(T().id);
                        }),
                        t(
                          fe,
                          r(g, {
                            get when() {
                              return ue().acknowledge;
                            },
                            get fallback() {
                              return r(Z, { name: "check", size: 17 });
                            },
                            get children() {
                              return qi();
                            },
                          }),
                          null,
                        ),
                        t(
                          fe,
                          (() => {
                            var ge = G(() => !!ue().acknowledge);
                            return () => (ge() ? "Saving…" : $.acknowledge);
                          })(),
                          null,
                        ),
                        x(
                          () =>
                            (fe.disabled =
                              ue().acknowledge || dt()?.getAttribute("aria-label") !== $.announcement),
                        ),
                        Y
                      );
                    },
                  }),
              }),
              r(g, {
                get when() {
                  return G(() => gt() !== void 0)() && !re();
                },
                get children() {
                  return r(en, {
                    get notice() {
                      return $t();
                    },
                    dismissNotice: () => Fe(void 0),
                    get title() {
                      return $.tutorial;
                    },
                    close: sr,
                    get children() {
                      var T = Su(),
                        Y = T.firstChild,
                        Q = Y.firstChild,
                        he = Q.firstChild,
                        ye = Y.nextSibling,
                        Ce = ye.nextSibling,
                        xe = Ce.nextSibling,
                        K = xe.nextSibling,
                        W = K.firstChild,
                        q = W.nextSibling,
                        fe = q.firstChild;
                      return (
                        (T.$$keydown = (ge) => {
                          (ge.key === "ArrowRight" &&
                            (ge.preventDefault(), zt((oe) => Math.min(2, (oe ?? 0) + 1))),
                            ge.key === "ArrowLeft" &&
                              (ge.preventDefault(), zt((oe) => Math.max(0, (oe ?? 0) - 1))));
                        }),
                        t(
                          Y,
                          r(_e, {
                            each: [0, 1, 2],
                            children: (ge) =>
                              (() => {
                                var oe = Qu();
                                return (x(() => oe.classList.toggle("complete", ge <= (gt() ?? 0))), oe);
                              })(),
                          }),
                          Q,
                        ),
                        t(Q, () => (gt() ?? 0) + 1, he),
                        t(
                          ye,
                          r(Z, {
                            get name() {
                              return $.tutorialSteps[gt() ?? 0].icon;
                            },
                            size: 29,
                          }),
                        ),
                        t(Ce, () => $.tutorialSteps[gt() ?? 0].title),
                        t(xe, () => $.tutorialSteps[gt() ?? 0].text),
                        t(
                          T,
                          r(g, {
                            get when() {
                              return Ir();
                            },
                            get children() {
                              var ge = Ii();
                              return (t(ge, Ir), ge);
                            },
                          }),
                          K,
                        ),
                        (W.$$click = sr),
                        t(W, () => $.tutorialSkip),
                        t(
                          q,
                          r(g, {
                            get when() {
                              return (gt() ?? 0) > 0;
                            },
                            get children() {
                              var ge = yr();
                              return (
                                (ge.$$click = () => zt((oe) => Math.max(0, (oe ?? 0) - 1))),
                                t(ge, () => $.back),
                                x(() => (ge.disabled = ue().tutorial)),
                                ge
                              );
                            },
                          }),
                          fe,
                        ),
                        (fe.$$click = () => ((gt() ?? 0) < 2 ? zt((ge) => (ge ?? 0) + 1) : sr())),
                        t(
                          fe,
                          (() => {
                            var ge = G(() => !!ue().tutorial);
                            return () =>
                              ge() ? $.loading : G(() => gt() === 2)() ? $.tutorialDone : $.tutorialNext;
                          })(),
                        ),
                        x(
                          (ge) => {
                            var oe = `Step ${(gt() ?? 0) + 1} of 3`,
                              Ae = ue().tutorial,
                              X = ue().tutorial;
                            return (
                              oe !== ge.e && z(Y, "aria-label", (ge.e = oe)),
                              Ae !== ge.t && (W.disabled = ge.t = Ae),
                              X !== ge.a && (fe.disabled = ge.a = X),
                              ge
                            );
                          },
                          { e: void 0, t: void 0, a: void 0 },
                        ),
                        T
                      );
                    },
                  });
                },
              }),
              r(g, {
                get when() {
                  return Li();
                },
                children: (T) =>
                  r(en, {
                    get notice() {
                      return $t();
                    },
                    dismissNotice: () => Fe(void 0),
                    get title() {
                      return $.rename;
                    },
                    close: () => _n(void 0),
                    get children() {
                      var Y = Xu(),
                        Q = Y.firstChild,
                        he = Q.firstChild,
                        ye = Q.nextSibling,
                        Ce = ye.firstChild,
                        xe = Ce.nextSibling;
                      return (
                        Y.addEventListener("submit", (K) => {
                          (K.preventDefault(),
                            je("rename", async () => {
                              (await window.jac.renameChat({
                                id: T().id,
                                directory: T().directory,
                                title: Kn().trim(),
                              }),
                                _n(void 0),
                                await Promise.all([Ct(), St()]));
                            }));
                        }),
                        t(Q, () => $.renameLabel, he),
                        (he.$$input = (K) => qr(K.currentTarget.value)),
                        (Ce.$$click = () => _n(void 0)),
                        t(Ce, () => $.cancel),
                        t(
                          xe,
                          (() => {
                            var K = G(() => !!ue().rename);
                            return () => (K() ? $.loading : $.save);
                          })(),
                        ),
                        x(() => (xe.disabled = ue().rename || !Kn().trim())),
                        x(() => (he.value = Kn())),
                        Y
                      );
                    },
                  }),
              }),
              r(g, {
                get when() {
                  return G(() => !!D())() && !H();
                },
                get children() {
                  return r(en, {
                    title: "Free plan is temporarily unavailable",
                    close: () => V(!0),
                    required: !0,
                    get children() {
                      return [
                        ju(),
                        (() => {
                          var T = Tu(),
                            Y = T.firstChild;
                          return ((Y.$$click = () => V(!0)), T);
                        })(),
                      ];
                    },
                  });
                },
              }),
              r(g, {
                get when() {
                  return Rr();
                },
                children: (T) =>
                  r(en, {
                    get notice() {
                      return $t();
                    },
                    dismissNotice: () => Fe(void 0),
                    get title() {
                      return T().title;
                    },
                    close: () => {
                      ue().confirm || It(void 0);
                    },
                    get children() {
                      return [
                        (() => {
                          var Y = eh();
                          return (t(Y, () => T().detail), Y);
                        })(),
                        (() => {
                          var Y = th(),
                            Q = Y.firstChild,
                            he = Q.nextSibling;
                          return (
                            (Q.$$click = () => It(void 0)),
                            t(Q, () => $.cancel),
                            (he.$$click = () => {
                              je("confirm", async () => {
                                (await T().action(), It(void 0));
                              });
                            }),
                            t(
                              he,
                              (() => {
                                var ye = G(() => !!ue().confirm);
                                return () => (ye() ? $.loading : T().label);
                              })(),
                            ),
                            x(
                              (ye) => {
                                var Ce = ue().confirm,
                                  xe = `button ${T().danger ? "danger" : "primary"}`,
                                  K = ue().confirm;
                                return (
                                  Ce !== ye.e && (Q.disabled = ye.e = Ce),
                                  xe !== ye.t && Be(he, (ye.t = xe)),
                                  K !== ye.a && (he.disabled = ye.a = K),
                                  ye
                                );
                              },
                              { e: void 0, t: void 0, a: void 0 },
                            ),
                            Y
                          );
                        })(),
                      ];
                    },
                  }),
              }),
            ];
          },
        }),
        null,
      ),
      x(
        (T) => {
          var Y = !!A().sidebarCollapsed,
            Q = !!yn(),
            he = !!Or();
          return (
            Y !== T.e && k.classList.toggle("sidebar-collapsed", (T.e = Y)),
            Q !== T.t && k.classList.toggle("drawer-open", (T.t = Q)),
            he !== T.a && k.classList.toggle("workspace-visible", (T.a = he)),
            T
          );
        },
        { e: void 0, t: void 0, a: void 0 },
      ),
      k
    );
  })();
}