
var e_a = "question",
  t_a = `Use this tool when you need to ask the user questions during execution. This allows you to:
1. Gather user preferences or requirements
2. Clarify ambiguous instructions
3. Get decisions on implementation choices as you work
4. Offer choices to the user about what direction to take.

Usage notes:
- When \`custom\` is enabled (default), a "Type your own answer" option is added automatically; don't include "Other" or catch-all options
- Answers are returned as arrays of labels; set \`multiple: true\` to allow selecting more than one
- If you recommend a specific option, make that the first option in the list and add "(Recommended)" at the end of the label`,
  r_a,
  n_a,
  i_a = (e, t) =>
    `User has answered your questions: ${e.map((s, a) => `"${s.question}"="${t[a]?.length ? t[a].join(", ") : "Unanswered"}"`).join(", ")}. You can now continue with the user's answers in mind.`,
  s_a,
  o_a;