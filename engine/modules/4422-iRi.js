
function iRi(e, t) {
  return Error(
    `OAuth client information is bound to authorization server ${e.issuer} and is not presented to ${t}. Clear the stored client information, or correct \`expectedIssuer\`, if the authorization server has moved.`,
  );
}