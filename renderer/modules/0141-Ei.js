
function Ei(e) {
  try {
    return JSON.parse(e);
  } catch {
    throw new Error("Enter valid JSON. Check the brackets, quotes, and commas.");
  }
}
Oe(["click", "input"]);