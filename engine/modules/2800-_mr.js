
var _mr = Ie(function (Vhc, Zdi) {
  var Kdi = cr("crypto"),
    mmr = fN(),
    rea = I7e(),
    Ive = BV(),
    zdi = ky(),
    Qdi = Xdi(),
    Vyt = w4e(),
    nea = r_e(),
    iea = k4e(),
    Jdi = bpr().version,
    sea = Tlr(),
    qyt = t_e();
  class Ydi extends nea {
    #e;
    constructor(e, t) {
      super(e, t);
      ((this.packumentCache = this.opts.packumentCache || null),
        (this.registry = Vyt.pickRegistry(e, t)),
        (this.packumentUrl = `${sea(this.registry)}/${this.spec.escapedName}`),
        (this.#e = `${this.fullMetadata ? "full" : "corgi"}:${this.packumentUrl}`));
      let r = new URL(this.registry),
        s = `//${r.host}${r.pathname}`;
      if (this.opts[`${s}:_keys`]) this.registryKeys = this.opts[`${s}:_keys`];
    }
    async resolve() {
      if ((await this.manifest(), !this.resolved))
        throw Object.assign(Error("Invalid package manifest: no `dist.tarball` field"), {
          package: this.spec.toString(),
        });
      return this.resolved;
    }
    #r() {
      return {
        "user-agent": this.opts.userAgent || `pacote/${Jdi} node/${process.version}`,
        ...(this.opts.headers || {}),
        "pacote-version": Jdi,
        "pacote-req-type": "packument",
        "pacote-pkg-id": `registry:${this.spec.name}`,
        accept: this.fullMetadata
          ? "application/json"
          : "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*",
      };
    }
    async packument() {
      if (this.packumentCache?.has(this.#e)) return this.packumentCache.get(this.#e);
      try {
        let e = await Vyt(this.packumentUrl, {
            ...this.opts,
            headers: this.#r(),
            spec: this.spec,
            integrity: null,
          }),
          t = await e.json(),
          r = e.headers.get("content-length");
        if (r) t._contentLength = Number(r);
        return (this.packumentCache?.set(this.#e, t), t);
      } catch (e) {
        if ((this.packumentCache?.delete(this.#e), e.code !== "E404" || this.fullMetadata)) throw e;
        return ((this.fullMetadata = !0), this.packument());
      }
    }
    async manifest() {
      if (this.package) return this.package;
      if (this.opts.verifySignatures) this.fullMetadata = !0;
      let e = await this.packument(),
        t = mmr.normalizeSteps.filter((H) => H !== "_attributes"),
        r = await new mmr()
          .fromContent(
            rea(e, this.spec.fetchSpec, { ...this.opts, defaultTag: this.defaultTag, before: this.before }),
          )
          .normalize({ steps: t })
          .then((H) => H.content),
        s = e.time?.[r.version];
      if (s) r._time = s;
      let { dist: a } = r;
      if (a) {
        ((this.resolved = r._resolved = a.tarball), (r._from = this.from));
        let H = a.integrity
          ? Ive.parse(a.integrity)
          : a.shasum
            ? Ive.fromHex(a.shasum, "sha1", { ...this.opts })
            : null;
        if (H) {
          if (this.integrity && !this.integrity.match(H)) {
            for (let u of Object.keys(this.integrity))
              if (H[u])
                throw Object.assign(
                  Error(`Integrity checksum failed when using ${u}: wanted ${this.integrity} but got ${H}.`),
                  { code: "EINTEGRITY" },
                );
          }
          this.integrity = H;
        }
      }
      if (this.integrity) {
        if (((r._integrity = String(this.integrity)), a.signatures))
          if (this.opts.verifySignatures) {
            let H = `${r._id}:${r._integrity}`;
            for (let u of a.signatures) {
              let f = this.registryKeys && this.registryKeys.filter((D) => D.keyid === u.keyid)[0];
              if (!f)
                throw Object.assign(
                  Error(
                    `${r._id} has a registry signature with keyid: ${u.keyid} but no corresponding public key can be found`,
                  ),
                  { code: "EMISSINGSIGNATUREKEY" },
                );
              let d = Date.parse(r._time || "2015-01-01T00:00:00.000Z");
              if (!(!f.expires || d < Date.parse(f.expires)))
                throw Object.assign(
                  Error(
                    `${r._id} has a registry signature with keyid: ${u.keyid} but the corresponding public key has expired ${f.expires}`,
                  ),
                  { code: "EEXPIREDSIGNATUREKEY" },
                );
              let L = Kdi.createVerify("SHA256");
              if ((L.write(H), L.end(), !L.verify(f.pemkey, u.sig, "base64")))
                throw Object.assign(
                  Error(
                    `${r._id} has an invalid registry signature with keyid: ${f.keyid} and signature: ${u.sig}`,
                  ),
                  {
                    code: "EINTEGRITYSIGNATURE",
                    keyid: f.keyid,
                    signature: u.sig,
                    resolved: r._resolved,
                    integrity: r._integrity,
                  },
                );
            }
            r._signatures = a.signatures;
          } else r._signatures = a.signatures;
        if (a.attestations)
          if (this.opts.verifyAttestations) {
            let H = new URL(a.attestations.url).pathname,
              u = new URL(H, this.registry).href,
              f = await Vyt(u, { ...this.opts, integrity: null }),
              { attestations: d } = await f.json(),
              _ = d.map(({ predicateType: D, bundle: S }) => {
                let T = JSON.parse(Buffer.from(S.dsseEnvelope.payload, "base64").toString("utf8")),
                  C = S.dsseEnvelope.signatures[0].keyid,
                  O = S.dsseEnvelope.signatures[0].sig;
                return { predicateType: D, bundle: S, statement: T, keyid: C, signature: O };
              }),
              L = _.map((D) => D.keyid).filter((D) => !!D),
              I = (this.registryKeys || []).filter((D) => L.includes(D.keyid));
            if (L.length > 0 && !I.length)
              throw Object.assign(
                Error(`${r._id} has attestations but no corresponding public key(s) can be found`),
                { code: "EMISSINGSIGNATUREKEY" },
              );
            for (let { predicateType: D, bundle: S, keyid: T, signature: C, statement: O } of _) {
              let B = I.find((se) => se.keyid === T);
              if (T) {
                if (!B)
                  throw Object.assign(
                    Error(
                      `${r._id} has attestations with keyid: ${T} but no corresponding public key can be found`,
                    ),
                    { code: "EMISSINGSIGNATUREKEY" },
                  );
                let se = new Date(Number(S.verificationMaterial.tlogEntries[0].integratedTime) * 1000);
                if (!(!B.expires || se < Date.parse(B.expires)))
                  throw Object.assign(
                    Error(
                      `${r._id} has attestations with keyid: ${T} but the corresponding public key has expired ${B.expires}`,
                    ),
                    { code: "EEXPIREDSIGNATUREKEY" },
                  );
              }
              let V = { name: O.subject[0].name, sha512: O.subject[0].digest.sha512 },
                q = this.spec.type === "version" ? zdi.toPurl(this.spec) : this.spec;
              if (V.name !== q)
                throw Object.assign(
                  Error(
                    `${r._id} package name and version (PURL): ${q} doesn't match what was signed: ${V.name}`,
                  ),
                  { code: "EATTESTATIONSUBJECT" },
                );
              let Z = Ive.parse(this.integrity).hexDigest();
              if (V.sha512 !== Z)
                throw Object.assign(
                  Error(
                    `${r._id} package integrity (hex digest): ${Z} doesn't match what was signed: ${V.sha512}`,
                  ),
                  { code: "EATTESTATIONSUBJECT" },
                );
              try {
                let se = {
                  tufCachePath: this.tufCache,
                  tufForceCache: !0,
                  keySelector: B ? () => B.pemkey : void 0,
                };
                await Qdi.verify(S, se);
              } catch (se) {
                throw Object.assign(Error(`${r._id} failed to verify attestation: ${se.message}`), {
                  code: "EATTESTATIONVERIFY",
                  predicateType: D,
                  keyid: T,
                  signature: C,
                  resolved: r._resolved,
                  integrity: r._integrity,
                });
              }
            }
            ((r._attestations = a.attestations), (r._attestationBundles = d));
          } else r._attestations = a.attestations;
      }
      return ((this.package = r), this.package);
    }
    [qyt.tarballFromResolved]() {
      return new iea(this.resolved, {
        ...this.opts,
        resolved: this.resolved,
        pkgid: `registry:${this.spec.name}@${this.resolved}`,
      })[qyt.tarballFromResolved]();
    }
    get types() {
      return ["tag", "version", "range"];
    }
  }
  Zdi.exports = Ydi;
});