
function q2s(e) {
  let t = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return cRe(t, { expected: "a base64 encoded string", meta: { _tag: "isBase64", regExp: t }, ...e });
}