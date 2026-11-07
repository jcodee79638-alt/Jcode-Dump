
async function mvi(e) {
  (await pvi.write(e), (mX.value = structuredClone(e)), (mX.at = Date.now()));
}