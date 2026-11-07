
function bZr(e) {
  if (Buffer.byteLength(JSON.stringify(e)) > 4000000)
    throw Error(
      "This draft collection exceeds the 4 MB save limit. Shorten or clear older drafts and retry; your previously saved drafts are kept.",
    );
}
jFe();
TFe();
MJt();