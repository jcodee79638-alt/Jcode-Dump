
var ewr = ne(async () => {
  Gt();
  $H();
  xx();
  jT();
  yy();
  await Jn([DPe(), Vw(), bT(), Tx()]);
  yiH = Io([
    ri("BadRequest"),
    ri("ProviderAuthOauthMissing"),
    ri("ProviderAuthOauthCodeMissing"),
    ri("ProviderAuthOauthCallbackFailed"),
    ri("ProviderAuthValidationFailed"),
  ]);
  TJ = class TJ extends (
    $y("ProviderAuthError")(
      { name: yiH, data: nt({ providerID: be(Kp), field: be(re), message: be(re), kind: be(re) }) },
      { httpApiStatus: 400 },
    )
  ) {};
  Hts = kE("provider")
    .add(
      zd("provider")
        .add(
          MH("list", okt, { query: jo, success: zs(yxa, "List of providers") }).annotateMerge(
            Fn({
              identifier: "provider.list",
              summary: "List providers",
              description:
                "Get a list of all available AI providers, including both available and connected ones.",
            }),
          ),
          MH("auth", `${okt}/auth`, { query: jo, success: zs(T3i, "Provider auth methods") }).annotateMerge(
            Fn({
              identifier: "provider.auth",
              summary: "Get provider auth methods",
              description: "Retrieve available authentication methods for all AI providers.",
            }),
          ),
          sc("authorize", `${okt}/:providerID/oauth/authorize`, {
            params: { providerID: Kp },
            query: jo,
            payload: b3i,
            success: zs(XW(v3i), "Authorization URL and method"),
            error: TJ,
          }).annotateMerge(
            Fn({
              identifier: "provider.oauth.authorize",
              summary: "Start OAuth authorization",
              description: "Start the OAuth authorization flow for a provider.",
            }),
          ),
          sc("callback", `${okt}/:providerID/oauth/callback`, {
            params: { providerID: Kp },
            query: jo,
            payload: fBa,
            success: zs(Vi, "OAuth callback processed successfully"),
            error: TJ,
          }).annotateMerge(
            Fn({
              identifier: "provider.oauth.callback",
              summary: "Handle OAuth callback",
              description: "Handle the OAuth callback from a provider after user authorization.",
            }),
          ),
        )
        .annotateMerge(Fn({ title: "provider", description: "Experimental HttpApi provider routes." }))
        .middleware(Fm)
        .middleware(Nm)
        .middleware(tm),
    )
    .annotateMerge(
      Fn({
        title: "opencode experimental HttpApi",
        version: "0.0.1",
        description: "Experimental HttpApi surface for selected instance routes.",
      }),
    );
});