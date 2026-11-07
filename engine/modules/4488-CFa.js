
async function CFa() {
  if (D7) (await new Promise((e) => D7.close(() => e())), (D7 = void 0));
  for (let [e, t] of Y8) (clearTimeout(t.timeout), t.reject(Error("OAuth callback server stopped")));
  (Y8.clear(), tLe.clear());
}