
function nln({
  headers: e,
  onFile: t,
  onField: r,
  onError: s,
  onDone: a,
  isFile: H = mer,
  maxParts: u = 1 / 0,
  maxTotalSize: f = 1 / 0,
  maxPartSize: d = 1 / 0,
  maxFieldSize: _ = 1048576,
}) {
  let L = zRs(e);
  if (L === void 0) return (s({ _tag: "InvalidBoundary" }), { write: Mpt, end() {} });
  let I = {
    state: ZQ.headers,
    index: 0,
    parts: 0,
    onChunk: Mpt,
    info: void 0,
    headerSkip: 0,
    partSize: 0,
    totalSize: 0,
    isFile: !1,
    fieldChunks: [],
    fieldSize: 0,
  };
  function D() {
    ((I.state = ZQ.body), (I.isFile = !0), (I.onChunk = Mpt));
  }
  let S = Yun(),
    T = eln(
      `\r
--${L}`,
      function (C, O) {
        if (C === 0) {
          D();
          return;
        } else if (C !== I.index) {
          if (I.index > 0)
            if (I.isFile) (I.onChunk(null), (I.partSize = 0));
            else {
              if (I.fieldChunks.length === 1) r(I.info, I.fieldChunks[0]);
              else {
                let B = new Uint8Array(I.fieldSize),
                  V = 0;
                for (let q = 0; q < I.fieldChunks.length; q++) {
                  let Z = I.fieldChunks[q];
                  (B.set(Z, V), (V += Z.length));
                }
                r(I.info, B);
              }
              ((I.fieldSize = 0), (I.fieldChunks = []));
            }
          if (((I.state = ZQ.headers), (I.index = C), (I.headerSkip = 2), O[0] === 45 && O[1] === 45))
            return a();
          if ((I.parts++, I.parts > u)) s(GRs);
        }
        if ((I.partSize += O.length) > d) s(JRs);
        if (I.state === ZQ.headers) {
          let B = S(O, I.headerSkip);
          if (((I.headerSkip = 0), B._tag === "Continue")) return;
          else if (B._tag === "Failure") return (D(), s({ _tag: "BadHeaders", error: B }));
          let V = ypt(B.headers["content-type"]),
            q = ypt(B.headers["content-disposition"], !0);
          if (q.value === "form-data" && !("name" in q.parameters)) return (D(), s(VRs));
          let Z;
          if ("filename*" in q.parameters) {
            let se = q.parameters["filename*"].split("''");
            if (se.length === 2) Z = decodeURIComponent(se[1]);
          }
          if (
            ((I.info = {
              name: q.parameters.name ?? "",
              filename: Z ?? q.parameters.filename,
              contentType:
                V.value === ""
                  ? q.parameters.filename !== void 0
                    ? "application/octet-stream"
                    : "text/plain"
                  : V.value,
              contentTypeParameters: V.parameters,
              contentDisposition: q.value,
              contentDispositionParameters: q.parameters,
              headers: B.headers,
            }),
            (I.state = ZQ.body),
            (I.isFile = H(I.info)),
            I.isFile)
          )
            I.onChunk = t(I.info);
          if (B.endPosition < O.length)
            if (I.isFile) I.onChunk(O.subarray(B.endPosition));
            else {
              let se = O.subarray(B.endPosition);
              if ((I.fieldSize += se.length) > _) s(tln);
              I.fieldChunks.push(se);
            }
        } else if (I.isFile) I.onChunk(O);
        else {
          if ((I.fieldSize += O.length) > _) s(tln);
          I.fieldChunks.push(O);
        }
      },
      KRs,
    );
  return {
    write(C) {
      if ((I.totalSize += C.length) > f) return s(XRs);
      return T.write(C);
    },
    end() {
      if ((T.end(), I.state === ZQ.body)) s(qRs);
      ((I.state = ZQ.headers),
        (I.index = 0),
        (I.parts = 0),
        (I.onChunk = Mpt),
        (I.info = void 0),
        (I.totalSize = 0),
        (I.partSize = 0),
        (I.fieldChunks = []),
        (I.fieldSize = 0));
    },
  };
}