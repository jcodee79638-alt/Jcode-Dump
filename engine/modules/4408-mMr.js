
var mMr = ne(() => {
  W1();
  ((hb = VCi()
    .superRefine((e, t) => {
      if (!URL.canParse(e))
        return (t.addIssue({ code: ZCi.custom, message: "URL must be parseable", fatal: !0 }), tEr);
    })
    .refine(
      (e) => {
        let t = new URL(e);
        return t.protocol !== "javascript:" && t.protocol !== "data:" && t.protocol !== "vbscript:";
      },
      { message: "URL cannot use javascript:, data:, or vbscript: scheme" },
    )),
    (XBi = UD({
      resource: lr().url(),
      authorization_servers: Va(hb).optional(),
      jwks_uri: lr().url().optional(),
      scopes_supported: Va(lr()).optional(),
      bearer_methods_supported: Va(lr()).optional(),
      resource_signing_alg_values_supported: Va(lr()).optional(),
      resource_name: lr().optional(),
      resource_documentation: lr().optional(),
      resource_policy_uri: lr().url().optional(),
      resource_tos_uri: lr().url().optional(),
      tls_client_certificate_bound_access_tokens: ru().optional(),
      authorization_details_types_supported: Va(lr()).optional(),
      dpop_signing_alg_values_supported: Va(lr()).optional(),
      dpop_bound_access_tokens_required: ru().optional(),
    })),
    (dMr = UD({
      issuer: lr(),
      authorization_endpoint: hb,
      token_endpoint: hb,
      registration_endpoint: hb.optional(),
      scopes_supported: Va(lr()).optional(),
      response_types_supported: Va(lr()),
      response_modes_supported: Va(lr()).optional(),
      grant_types_supported: Va(lr()).optional(),
      token_endpoint_auth_methods_supported: Va(lr()).optional(),
      token_endpoint_auth_signing_alg_values_supported: Va(lr()).optional(),
      service_documentation: hb.optional(),
      revocation_endpoint: hb.optional(),
      revocation_endpoint_auth_methods_supported: Va(lr()).optional(),
      revocation_endpoint_auth_signing_alg_values_supported: Va(lr()).optional(),
      introspection_endpoint: lr().optional(),
      introspection_endpoint_auth_methods_supported: Va(lr()).optional(),
      introspection_endpoint_auth_signing_alg_values_supported: Va(lr()).optional(),
      code_challenge_methods_supported: Va(lr()).optional(),
      client_id_metadata_document_supported: ru().optional(),
    })),
    (N9a = UD({
      issuer: lr(),
      authorization_endpoint: hb,
      token_endpoint: hb,
      userinfo_endpoint: hb.optional(),
      jwks_uri: hb,
      registration_endpoint: hb.optional(),
      scopes_supported: Va(lr()).optional(),
      response_types_supported: Va(lr()),
      response_modes_supported: Va(lr()).optional(),
      grant_types_supported: Va(lr()).optional(),
      acr_values_supported: Va(lr()).optional(),
      subject_types_supported: Va(lr()),
      id_token_signing_alg_values_supported: Va(lr()),
      id_token_encryption_alg_values_supported: Va(lr()).optional(),
      id_token_encryption_enc_values_supported: Va(lr()).optional(),
      userinfo_signing_alg_values_supported: Va(lr()).optional(),
      userinfo_encryption_alg_values_supported: Va(lr()).optional(),
      userinfo_encryption_enc_values_supported: Va(lr()).optional(),
      request_object_signing_alg_values_supported: Va(lr()).optional(),
      request_object_encryption_alg_values_supported: Va(lr()).optional(),
      request_object_encryption_enc_values_supported: Va(lr()).optional(),
      token_endpoint_auth_methods_supported: Va(lr()).optional(),
      token_endpoint_auth_signing_alg_values_supported: Va(lr()).optional(),
      display_values_supported: Va(lr()).optional(),
      claim_types_supported: Va(lr()).optional(),
      claims_supported: Va(lr()).optional(),
      service_documentation: lr().optional(),
      claims_locales_supported: Va(lr()).optional(),
      ui_locales_supported: Va(lr()).optional(),
      claims_parameter_supported: ru().optional(),
      request_parameter_supported: ru().optional(),
      request_uri_parameter_supported: ru().optional(),
      require_request_uri_registration: ru().optional(),
      op_policy_uri: hb.optional(),
      op_tos_uri: hb.optional(),
      client_id_metadata_document_supported: ru().optional(),
    })),
    (JBi = os({ ...N9a.shape, ...dMr.pick({ code_challenge_methods_supported: !0 }).shape })),
    (KBi = os({
      access_token: lr(),
      id_token: lr().optional(),
      token_type: lr(),
      expires_in: r1a().optional(),
      scope: lr().optional(),
      refresh_token: lr().optional(),
      issuer: lr()
        .optional()
        .catch(void 0),
    }).strip()),
    (zBi = os({ error: lr(), error_description: lr().optional(), error_uri: lr().optional() })),
    (GBi = hb.optional().or(
      Fs("").transform(() => {
        return;
      }),
    )),
    (F9a = os({
      redirect_uris: Va(hb),
      token_endpoint_auth_method: lr().optional(),
      grant_types: Va(lr()).optional(),
      response_types: Va(lr()).optional(),
      client_name: lr().optional(),
      client_uri: hb.optional(),
      logo_uri: GBi,
      scope: lr().optional(),
      contacts: Va(lr()).optional(),
      tos_uri: GBi,
      policy_uri: lr().optional(),
      jwks_uri: hb.optional(),
      jwks: cTt().optional(),
      software_id: lr().optional(),
      software_version: lr().optional(),
      software_statement: lr().optional(),
    }).strip()),
    (B9a = os({
      client_id: lr(),
      client_secret: lr().optional(),
      client_id_issued_at: zu().optional(),
      client_secret_expires_at: zu().optional(),
      issuer: lr()
        .optional()
        .catch(void 0),
    }).strip()),
    (QBi = F9a.merge(B9a)),
    (AQc = os({ error: lr(), error_description: lr().optional() }).strip()),
    (uQc = os({ token: lr(), token_type_hint: lr().optional() }).strip()));
});