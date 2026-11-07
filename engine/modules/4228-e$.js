
var e$ = ne(async () => {
  au();
  VZ();
  mme();
  N2();
  YM();
  jX();
  uOi();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Ef();
  Kj();
  yY();
  Ql();
  vV();
  Gt();
  BA();
  Ry();
  yy();
  zM();
  SY();
  await Jn([qL(), ZL(), wX(), vHe(), kX(), JS(), jI(), um(), e$()]);
  ((TOi = nt({ additions: mo, deletions: mo, files: mo, diffs: Gn(On(DOi)) })),
    ($ja = nt({ input: mo, output: mo, reasoning: mo, cache: nt({ read: mo, write: mo }) })),
    (Ije = { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } }),
    (gja = nt({ url: re })),
    (dvt = mo),
    (Eja = nt({ created: Ko, updated: Ko, compacting: Gn(Ko), archived: Gn(dvt) })),
    (vOi = nt({ messageID: Td, partID: Gn(Zp), snapshot: Gn(re), diff: Gn(re) })),
    (bOi = nt({ id: WL, providerID: Kp, variant: Gn(re) })),
    (dXe = ks(re, e0)),
    (RB = nt({
      id: Ec,
      slug: re,
      projectID: z_,
      workspaceID: Gn(YS),
      directory: re,
      path: Gn(re),
      parentID: Gn(Ec),
      summary: Gn(TOi),
      cost: Gn(mo),
      tokens: Gn($ja),
      share: Gn(gja),
      title: re,
      agent: Gn(re),
      model: Gn(bOi),
      version: re,
      metadata: Gn(dXe),
      time: Eja,
      permission: Gn(Jde),
      revert: Gn(vOi),
    }).annotate({ identifier: "Session" })),
    (jOi = nt({ id: z_, name: Gn(re), worktree: re }).annotate({ identifier: "ProjectSummary" })),
    (POi = nt({ ...RB.fields, project: w6(jOi) }).annotate({ identifier: "GlobalSession" })),
    (lyr = be(
      nt({
        parentID: be(Ec),
        title: be(re),
        agent: be(re),
        model: be(bOi),
        metadata: be(dXe),
        permission: be(Jde),
        workspaceID: be(YS),
      }),
    )),
    (COi = nt({ sessionID: Ec, messageID: be(Td) })),
    (Ija = Ec),
    (Dja = Ec),
    (yja = Ec),
    (Mja = nt({ sessionID: Ec, title: re })),
    (xja = nt({ sessionID: Ec, time: be(dvt) })),
    (Sja = nt({ sessionID: Ec, metadata: dXe })),
    (Tja = nt({ sessionID: Ec, permission: Jde })),
    (vja = nt({ sessionID: Ec, revert: be(vOi), summary: be(TOi) })),
    (bja = nt({ sessionID: Ec, limit: be(Ko) })),
    (pb = { Created: XL.Created, Updated: XL.Updated, Deleted: XL.Deleted, Diff: XL.Diff, Error: XL.Error }));
  fyr = class fyr extends ki()("SessionBusyError", { sessionID: Ec }) {};
  Mg = class Mg extends _i()("@opencode/Session") {};
  ((jja = vm(Mg)),
    (Pja = Es(
      Mg,
      ft(function* () {
        let { db: e } = yield* Vd,
          t = yield* Vd,
          r = yield* VN,
          s = yield* B$,
          a = yield* NE,
          H = Ge("Session.createNext")(function* (ye) {
            let ot = yield* Jc,
              Ee = {
                id: Ec.descending(ye.id),
                slug: Yv.create(),
                version: VL,
                projectID: ot.project.id,
                directory: ye.directory,
                path: ye.path,
                workspaceID: ye.workspaceID,
                parentID: ye.parentID,
                title: ye.title ?? (ye.parentID ? xOi : MOi) + new Date().toISOString(),
                agent: ye.agent,
                model: ye.model,
                metadata: ye.metadata,
                permission: ye.permission ? [...ye.permission] : void 0,
                cost: 0,
                tokens: Ije,
                time: { created: Date.now(), updated: Date.now() },
              };
            return (
              yield* fH("created", Ee),
              yield* s.publish(XL.Created, { sessionID: Ee.id, info: Ee }),
              Ee
            );
          }),
          u = Ge("Session.get")(function* (ye) {
            let ot = yield* e.select().from(la).where(Pi(la.id, ye)).get().pipe(on);
            if (!ot) return yield* bn(new Xw({ message: `Session not found: ${ye}` }));
            return pXe(ot);
          }),
          f = Ge("Session.list")(function* (ye) {
            let ot = yield* Jc;
            return yield* wja(e, {
              projectID: ot.project.id,
              experimentalWorkspaces: a.experimentalWorkspaces,
              ...ye,
            });
          }),
          d = Ge("Session.listGlobal")(function* (ye) {
            let ot = [];
            if (ye?.directory) ot.push(Pi(la.directory, ye.directory));
            if (ye?.roots) ot.push(FS(la.parent_id));
            if (ye?.start) ot.push(aV(la.time_updated, ye.start));
            if (ye?.cursor) ot.push(cw(la.time_updated, ye.cursor));
            if (ye?.search) ot.push(g2(la.title, `%${ye.search}%`));
            if (!ye?.archived) ot.push(FS(la.time_archived));
            let Ve = yield* (
                ot.length > 0
                  ? e
                      .select()
                      .from(la)
                      .where(Gc(...ot))
                  : e.select().from(la)
              )
                .orderBy(TE(la.time_updated), TE(la.id))
                .limit(ye?.limit ?? 100)
                .all()
                .pipe(on),
              Fe = [...new Set(Ve.map((At) => At.project_id))],
              it = new Map();
            if (Fe.length > 0) {
              let At = yield* e
                .select({ id: If.id, name: If.name, worktree: If.worktree })
                .from(If)
                .where(Wv(If.id, Fe))
                .all()
                .pipe(on);
              for (let et of At) it.set(et.id, { id: et.id, name: et.name ?? void 0, worktree: et.worktree });
            }
            return Ve.map((At) => ({ ...pXe(At), project: it.get(At.project_id) ?? null }));
          }),
          _ = Ge("Session.children")(function* (ye) {
            return (yield* e
              .select()
              .from(la)
              .where(Gc(Pi(la.parent_id, ye)))
              .all()
              .pipe(on)).map(pXe);
          }),
          L = ni(function* (ye) {
            let ot = yield* u(ye);
            try {
              if (
                yield* xX.pipe(
                  eu(!0),
                  jf(() => Jt(!1)),
                )
              )
                yield* Cja(r, ye);
              let Ve = yield* _(ye);
              for (let Fe of Ve) yield* L(Fe.id);
              (yield* s.publish(XL.Deleted, { sessionID: ye, info: ot }), yield* s.remove(ye));
            } catch (Ee) {
              yield* cf("failed to remove session", { sessionID: ye, error: Ee });
            }
          }),
          I = (ye) =>
            ft(function* () {
              return (yield* s.publish(XL.MessageUpdated, { sessionID: ye.sessionID, info: ye }), ye);
            }).pipe(gI("Session.updateMessage")),
          D = (ye) =>
            ft(function* () {
              return (
                yield* s.publish(XL.PartUpdated, {
                  sessionID: ye.sessionID,
                  part: structuredClone(ye),
                  time: Date.now(),
                }),
                ye
              );
            }).pipe(gI("Session.updatePart")),
          S = Ge("Session.getPart")(function* (ye) {
            let ot = yield* e
              .select()
              .from(dg)
              .where(
                Gc(Pi(dg.session_id, ye.sessionID), Pi(dg.message_id, ye.messageID), Pi(dg.id, ye.partID)),
              )
              .get()
              .pipe(on);
            if (!ot) return;
            return { ...ot.data, id: ot.id, sessionID: ot.session_id, messageID: ot.message_id };
          }),
          T = Ge("Session.create")(function* (ye) {
            let ot = yield* Jc,
              Ee = yield* lje;
            return yield* H({
              parentID: ye?.parentID,
              directory: ot.directory,
              path: yOi(ot.worktree, ot.directory),
              title: ye?.title,
              agent: ye?.agent,
              model: ye?.model,
              metadata: ye?.metadata,
              permission: ye?.permission,
              workspaceID: ye?.workspaceID ?? Ee,
            });
          }),
          C = Ge("Session.fork")(function* (ye) {
            let ot = yield* Jc,
              Ee = yield* u(ye.sessionID),
              Ve = Lja(Ee.title),
              Fe = yield* H({
                directory: ot.directory,
                path: yOi(ot.worktree, ot.directory),
                workspaceID: Ee.workspaceID,
                title: Ve,
                metadata: structuredClone(Ee.metadata),
              }),
              it = yield* Ht({ sessionID: ye.sessionID }),
              At = new Map(),
              et = ye.messageID ? it.findIndex((ut) => ut.info.id === ye.messageID) : it.length;
            for (let ut of it.slice(0, et < 0 ? it.length : et)) {
              let ht = Td.ascending();
              At.set(ut.info.id, ht);
              let Et = ut.info.role === "assistant" && ut.info.parentID ? At.get(ut.info.parentID) : void 0,
                tr = yield* I({ ...ut.info, sessionID: Fe.id, id: ht, ...(Et && { parentID: Et }) });
              for (let Rr of ut.parts) {
                let Vt = { ...Rr, id: Zp.ascending(), messageID: tr.id, sessionID: Fe.id };
                if (Vt.type === "compaction" && Vt.tail_start_id) Vt.tail_start_id = At.get(Vt.tail_start_id);
                yield* D(Vt);
              }
            }
            return Fe;
          }),
          O = (ye, ot) =>
            ft(function* () {
              let Ee = yield* u(ye),
                Ve = {
                  ...Ee,
                  ...ot,
                  time: ot.time ? { ...Ee.time, ...ot.time } : Ee.time,
                  share: ot.share === null ? void 0 : ot.share ? { ...Ee.share, ...ot.share } : Ee.share,
                  summary: ot.summary === null ? void 0 : (ot.summary ?? Ee.summary),
                  revert: ot.revert === null ? void 0 : (ot.revert ?? Ee.revert),
                  permission: ot.permission === null ? void 0 : (ot.permission ?? Ee.permission),
                };
              yield* s.publish(XL.Updated, { sessionID: ye, info: Ve });
            }),
          B = Ge("Session.touch")(function* (ye) {
            yield* O(ye, { time: { updated: Date.now() } }).pipe(on);
          }),
          V = Ge("Session.setTitle")(function* (ye) {
            yield* O(ye.sessionID, { title: ye.title }).pipe(on);
          }),
          q = Ge("Session.setArchived")(function* (ye) {
            yield* O(ye.sessionID, { time: { archived: ye.time } }).pipe(on);
          }),
          Z = Ge("Session.setMetadata")(function* (ye) {
            yield* O(ye.sessionID, { metadata: ye.metadata, time: { updated: Date.now() } }).pipe(on);
          }),
          se = Ge("Session.setAgentModel")(function* (ye) {
            yield* O(ye.sessionID, { agent: ye.agent, model: ye.model, time: { updated: ye.time } }).pipe(on);
          }),
          ae = Ge("Session.setPermission")(function* (ye) {
            yield* O(ye.sessionID, { permission: [...ye.permission], time: { updated: Date.now() } }).pipe(
              on,
            );
          }),
          z = Ge("Session.setRevert")(function* (ye) {
            yield* O(ye.sessionID, {
              summary: ye.summary,
              time: { updated: Date.now() },
              revert: ye.revert,
            }).pipe(on);
          }),
          Ae = Ge("Session.clearRevert")(function* (ye) {
            yield* O(ye, { time: { updated: Date.now() }, revert: null }).pipe(on);
          }),
          le = Ge("Session.setSummary")(function* (ye) {
            yield* O(ye.sessionID, { time: { updated: Date.now() }, summary: ye.summary }).pipe(on);
          }),
          Be = Ge("Session.setShare")(function* (ye) {
            yield* O(ye.sessionID, { share: ye.share ?? null, time: { updated: Date.now() } }).pipe(on);
          }),
          Te = Ge("Session.setWorkspace")(function* (ye) {
            yield* O(ye.sessionID, { workspaceID: ye.workspaceID, time: { updated: Date.now() } }).pipe(on);
          }),
          Lt = Ge("Session.diff")(function* (ye) {
            return [];
          }),
          Ht = Ge("Session.messages")(function* (ye) {
            if (ye.limit)
              return (yield* lXe({ sessionID: ye.sessionID, limit: ye.limit }).pipe(IA(Vd, t))).items;
            let ot = 50,
              Ee = [],
              Ve;
            while (!0) {
              let Fe = yield* lXe({ sessionID: ye.sessionID, limit: ot, before: Ve }).pipe(IA(Vd, t));
              if (Fe.items.length === 0) break;
              for (let it = Fe.items.length - 1; it >= 0; it--) {
                let At = Fe.items[it];
                if (At) Ee.push(At);
              }
              if (!Fe.more || !Fe.cursor) break;
              Ve = Fe.cursor;
            }
            return Ee.reverse();
          }),
          Se = Ge("Session.removeMessage")(function* (ye) {
            return (
              yield* s.publish(XL.MessageRemoved, { sessionID: ye.sessionID, messageID: ye.messageID }),
              ye.messageID
            );
          }),
          _e = Ge("Session.removePart")(function* (ye) {
            return (
              yield* s.publish(XL.PartRemoved, {
                sessionID: ye.sessionID,
                messageID: ye.messageID,
                partID: ye.partID,
              }),
              ye.partID
            );
          }),
          we = ni(function* (ye) {
            yield* s.publish(aja.PartDelta, ye);
          }),
          Pe = Ge("Session.findMessage")(function* (ye, ot) {
            let Ve;
            while (!0) {
              let Fe = yield* lXe({ sessionID: ye, limit: 50, before: Ve }).pipe(IA(Vd, t));
              if (Fe.items.length === 0) break;
              for (let it = Fe.items.length - 1; it >= 0; it--) {
                let At = Fe.items[it];
                if (At && ot(At)) return Lo(At);
              }
              if (!Fe.more || !Fe.cursor) break;
              Ve = Fe.cursor;
            }
            return eH();
          });
        return Mg.of({
          list: f,
          listGlobal: d,
          create: T,
          fork: C,
          touch: B,
          get: u,
          setTitle: V,
          setArchived: q,
          setMetadata: Z,
          setAgentModel: se,
          setPermission: ae,
          setRevert: z,
          clearRevert: Ae,
          setSummary: le,
          setShare: Be,
          setWorkspace: Te,
          diff: Lt,
          messages: Ht,
          children: _,
          remove: L,
          updateMessage: I,
          removeMessage: Se,
          removePart: _e,
          updatePart: D,
          getPart: S,
          updatePartDelta: we,
          findMessage: Pe,
        });
      }),
    )),
    (Cja = Ge("Session.cancelBackgroundJobs")(function* (e, t) {
      let r = yield* e.list();
      yield* ja(
        r.filter((s) => {
          if (s.status !== "running") return !1;
          if (s.id === t) return !0;
          if (s.metadata?.sessionId === t) return !0;
          return s.metadata?.parentSessionId === t;
        }),
        (s) => e.cancel(s.id),
        { concurrency: "unbounded", discard: !0 },
      );
    })));
  WB = Ll({ service: Mg, layer: Pja, deps: [sXe, WN, DD, q1] });
});
import Dje from "path";