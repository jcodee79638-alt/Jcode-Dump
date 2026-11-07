
async function JJt(e, t, r) {
  if ((await qJt(e), await p6(t), !uQ(r))) throw Ap();
  let s = await w8s(Pu.join(e.data, "opencode.db"), Pu.join(t, "database.sqlite")),
    a = [],
    H = async (q, Z) => {
      if (
        a.length >= Ch.files ||
        Z.length + a.reduce((se, ae) => se + ae.bytes, 0) + Ch.manifest > Ch.snapshot
      )
        throw Ap();
      (await Qne(Pu.join(t, ...q.split("/")), Z), a.push({ path: q, bytes: Z.length, sha256: CC(Z) }));
    },
    u = await dI(Pu.join(t, "database.sqlite"), Ch.database);
  a.push({ path: "database.sqlite", bytes: u.length, sha256: CC(u) });
  let f = Atn(await GJt(e));
  (await H("settings.json", Buffer.from(JSON.stringify(f))),
    await H("projects.json", Buffer.from(JSON.stringify(await ltn(e)))),
    await PAt(Pu.join(t, "attachments"), { mode: 448 }));
  let d = await XJt(Pu.join(e.userData, "attachments")),
    _ = await ftn(Pu.join(e.userData, "attachments")),
    L = Buffer.from(JSON.stringify(_)),
    I = new Set(d.files),
    D = [
      "Sign-in, credentials, sharing authorization, MCP authorization, legacy settings files and raw preservation backups are excluded.",
      "Current access, startup and security settings are retained during restore.",
      "Project working files, task checkpoints and project context files are outside this backup. Project registrations and conversation history are included.",
      "Pending desktop queue entries and local run-profile definitions are outside this backup.",
    ],
    S = d.files.filter((q) => !YDe(q)).length + Number(d.truncated),
    T = 0,
    C = 0,
    O = new Set();
  for (let q of d.files.filter(uQ).sort()) {
    let Z = [q, q + ".json", ...(I.has(q + ".prepared.json") ? [q + ".prepared.json"] : [])];
    if (!I.has(q + ".json")) {
      S++;
      continue;
    }
    try {
      let se = await Promise.all(
          Z.map((Ae) =>
            dI(Pu.join(e.userData, "attachments", Ae), Ae.endsWith(".json") ? 1048576 : Ch.attachment),
          ),
        ),
        ae = se.reduce((Ae, le) => Ae + le.length, 0);
      if (
        T + ae + L.length > Ch.attachments ||
        a.length + Z.length + 1 > Ch.files ||
        a.reduce((Ae, le) => Ae + le.bytes, 0) + ae + Ch.manifest > Ch.snapshot
      ) {
        S++;
        continue;
      }
      let z = JSON.parse(se[1].toString("utf8"));
      if (
        !NM(z) ||
        z.id !== q ||
        z.size !== se[0].length ||
        typeof z.filename !== "string" ||
        z.filename.length > 260 ||
        typeof z.mime !== "string" ||
        z.mime.length > 150 ||
        Object.keys(z).some(
          (Ae) => !["id", "size", "filename", "mime", "version", "originalHash", "preparedHash"].includes(Ae),
        ) ||
        (z.version === void 0
          ? z.originalHash !== void 0 || z.preparedHash !== void 0
          : z.version !== 1 ||
            z.originalHash !== CC(se[0]) ||
            se.length !== 3 ||
            z.preparedHash !== CC(se[2]))
      ) {
        S++;
        continue;
      }
      for (let [Ae, le] of Z.entries()) await H("attachments/" + le, se[Ae]);
      ((T += ae), C++, O.add(q));
    } catch {
      S++;
    }
  }
  ((S += d.files.filter(
    (q) => q !== ".references-v6.json" && YDe(q) && !uQ(q) && !I.has(q.split(".")[0]),
  ).length),
    await H("attachments/.references-v6.json", L));
  let B = new Set(
      NM(f.drafts)
        ? Object.values(f.drafts).flatMap((q) =>
            NM(q) && Array.isArray(q.attachments)
              ? q.attachments.flatMap((Z) => (NM(Z) && typeof Z.id === "string" ? [Z.id] : []))
              : [],
          )
        : [],
    ),
    V = [...new Set([...B, ..._.sessions.flatMap((q) => q.attachments)])].filter((q) => !O.has(q));
  if (((S += V.filter((q) => !I.has(q)).length), V.length))
    D.push(
      `${V.length} draft or conversation attachment references have no original in this copy. References are retained, but those files must be added again to view them.`,
    );
  if (S)
    D.push(
      "Some attachments or unsafe files were skipped because they were unavailable, changed, exceeded a limit or were outside the attachment scope. Draft references may need the original file again.",
    );
  if (d.truncated) D.push("The attachment scan reached its limit; the skipped count is a minimum.");
  if (s.pending)
    D.push(
      "Admitted inputs that had not run are preserved. Restoration pauses those sessions for inspection; no pending work is automatically replayed.",
    );
  await jAt(Pu.join(t, "manifest.json"), {
    version: 1,
    id: r,
    createdAt: Date.now(),
    conversations: s.conversations,
    attachments: C,
    partial: S > 0,
    skipped: S,
    scopes: [
      `Conversations and durable context: ${s.conversations} saved conversations`,
      "Safe application settings and drafts: included",
      `Attachment originals and prepared views: ${C} included${S ? " (partial)" : ""}`,
      "Project registrations: included; project working files: excluded",
      `Credential, account and permission tables: excluded (${s.skipped} tables outside history scope)`,
    ],
    warnings: D,
    files: a,
  });
}