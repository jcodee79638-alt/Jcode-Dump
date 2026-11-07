
var Ehn = ne(() => {
  Lhn();
  J_();
  Lqs = {
    0: (e, t, r) => {
      let s = Zt`${Zt.identifier(e)}`,
        a = t.all(Zt`SELECT id, hash, created_at FROM ${s} ORDER BY id ASC`);
      r.sort((_, L) =>
        _.folderMillis !== L.folderMillis
          ? _.folderMillis - L.folderMillis
          : (_.name ?? "").localeCompare(L.name ?? ""),
      );
      let H = new Map(),
        u = new Map();
      for (let _ of r) {
        if (!H.has(_.folderMillis)) H.set(_.folderMillis, []);
        (H.get(_.folderMillis).push(_), u.set(_.hash, _));
      }
      let f = [],
        d = [];
      for (let _ of a) {
        let L = String(_.created_at),
          I = Number(L.substring(0, L.length - 3) + "000"),
          D = H.get(I),
          S,
          T = null;
        if (D && D.length === 1) ((S = D[0]), (T = "millis"));
        else if (D && D.length > 1) {
          if (((S = D.find((C) => C.hash && _.hash && C.hash === _.hash)), S)) T = "hash";
        } else if (((S = u.get(_.hash)), S)) T = "hash";
        if (S) f.push({ id: _.id, name: S.name, hash: _.hash, created_at: L, matchedBy: _.id ? "id" : T });
        else d.push(_);
      }
      if (d.length > 0)
        throw Error(
          `While upgrading your database migrations table we found ${d.length} (${d.map((_) => `[id: ${_.id}, created_at: ${_.created_at}]`).join(", ")}) migrations in the database that do not match any local migration. This means that some migrations were applied to the database but are missing from the local environment`,
        );
      t.transaction((_) => {
        (_.run(Zt`ALTER TABLE ${s} ADD COLUMN ${Zt.identifier("name")} text`),
          _.run(Zt`ALTER TABLE ${s} ADD COLUMN ${Zt.identifier("applied_at")} TEXT`));
        for (let L of f) {
          let I = Zt`UPDATE ${s} SET ${Zt.identifier("name")} = ${L.name}, ${Zt.identifier("applied_at")} = NULL WHERE`;
          if (L.id) I.append(Zt` ${Zt.identifier("id")} = ${L.id}`);
          else if (L.matchedBy === "millis") I.append(Zt` ${Zt.identifier("created_at")} = ${L.created_at}`);
          else I.append(Zt` ${Zt.identifier("hash")} = ${L.hash}`);
          _.run(I);
        }
      });
    },
  };
  $qs = {
    0: async (e, t, r) => {
      let s = Zt`${Zt.identifier(e)}`,
        a = await t.session.all(Zt`SELECT id, hash, created_at FROM ${s} ORDER BY id ASC`);
      r.sort((L, I) =>
        L.folderMillis !== I.folderMillis
          ? L.folderMillis - I.folderMillis
          : (L.name ?? "").localeCompare(I.name ?? ""),
      );
      let H = new Map(),
        u = new Map();
      for (let L of r) {
        if (!H.has(L.folderMillis)) H.set(L.folderMillis, []);
        (H.get(L.folderMillis).push(L), u.set(L.hash, L));
      }
      let f = [],
        d = [];
      for (let L of a) {
        let I = String(L.created_at),
          D = Number(I.substring(0, I.length - 3) + "000"),
          S = H.get(D),
          T,
          C = null;
        if (S && S.length === 1) ((T = S[0]), (C = "millis"));
        else if (S && S.length > 1) {
          if (((T = S.find((O) => O.hash && L.hash && O.hash === L.hash)), T)) C = "hash";
        } else if (((T = u.get(L.hash)), T)) C = "hash";
        if (T) f.push({ id: L.id, name: T.name, hash: L.hash, created_at: I, matchedBy: L.id ? "id" : C });
        else d.push(L);
      }
      if (d.length > 0)
        throw Error(
          `While upgrading your database migrations table we found ${d.length} (${d.map((L) => `[id: ${L.id}, created_at: ${L.created_at}]`).join(", ")}) migrations in the database that do not match any local migration. This means that some migrations were applied to the database but are missing from the local environment`,
        );
      let _ = [
        Zt`ALTER TABLE ${s} ADD COLUMN ${Zt.identifier("name")} text`,
        Zt`ALTER TABLE ${s} ADD COLUMN ${Zt.identifier("applied_at")} TEXT`,
      ];
      for (let L of f) {
        let I = Zt`UPDATE ${s} SET ${Zt.identifier("name")} = ${L.name}, ${Zt.identifier("applied_at")} = NULL WHERE`;
        if (L.id) I.append(Zt` ${Zt.identifier("id")} = ${L.id}`);
        else if (L.matchedBy === "millis") I.append(Zt` ${Zt.identifier("created_at")} = ${L.created_at}`);
        else I.append(Zt` ${Zt.identifier("hash")} = ${L.hash}`);
        _.push(I);
      }
      await t.transaction(async (L) => {
        for (let I of _) await L.run(I);
      });
    },
  };
});