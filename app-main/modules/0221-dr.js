
async function dr() {
  if (Se || Y.size || Oe.size || Re || Te || dt || (await A.activity()).busy)
    throw Error("Wait for current work to finish before changing this workspace.");
}