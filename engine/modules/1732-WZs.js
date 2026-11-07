
function WZs(e) {
  let t = e.enabled === void 0 ? void 0 : !e.enabled;
  if (e.type === "local")
    return {
      type: e.type,
      command: e.command,
      cwd: e.cwd,
      environment: e.environment,
      disabled: t,
      timeout: e.timeout === void 0 ? void 0 : { request: e.timeout },
    };
  return {
    type: e.type,
    url: e.url,
    headers: e.headers,
    oauth: e.oauth && {
      client_id: e.oauth.clientId,
      client_secret: e.oauth.clientSecret,
      scope: e.oauth.scope,
      callback_port: e.oauth.callbackPort,
      redirect_uri: e.oauth.redirectUri,
    },
    disabled: t,
    timeout: e.timeout === void 0 ? void 0 : { request: e.timeout },
  };
}