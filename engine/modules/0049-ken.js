
async function ken() {
  let e = (await wen("Email: ")).trim(),
    t = await wen("Password: ", !0);
  if (!e || !t || /[\u0000-\u001f\u007f]/.test(e)) throw new Sc();
  return { email: e, password: t };
}