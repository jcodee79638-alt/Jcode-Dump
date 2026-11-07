
async function It(e) {
  if (
    !Ns({
      workspaceMutation: lt,
      changingAccess: dt,
      running: Y.size + Oe.size,
      admissions: Se,
      installing: Re,
      closing: Te,
    })
  )
    throw Error("Wait for current work to finish before changing this workspace.");
  lt = !0;
  try {
    if ((await A.activity()).busy || Se || Oe.size)
      throw Error("Wait for current work to finish before changing this workspace.");
    return await e();
  } finally {
    lt = !1;
  }
}